import type { EncodeObject } from "@cosmjs/proto-signing";
import { PromisePool } from "@supercharge/promise-pool";
import pick from "lodash/pick";
import { singleton } from "tsyringe";

import type { WalletOutput } from "@src/billing/http-schemas/wallet.schema";
import { UserWalletRepository } from "@src/billing/repositories";
import type { CreateWalletInput, SignTxInput, SignTxOutput } from "@src/billing/routes";
import { GetWalletQuery } from "@src/billing/routes/get-wallet/get-wallet.router";
import { ManagedUserWalletService, WalletInitializerService } from "@src/billing/services";
import { TxSignerService } from "@src/billing/services/tx-signer/tx-signer.service";
import { WithTransaction } from "@src/core/services";

@singleton()
export class WalletController {
  constructor(
    private readonly walletManager: ManagedUserWalletService,
    private readonly userWalletRepository: UserWalletRepository,
    private readonly walletInitializer: WalletInitializerService,
    private readonly signerService: TxSignerService
  ) {}

  @WithTransaction()
  async create({ userId }: CreateWalletInput): Promise<WalletOutput> {
    try {
      return await this.walletInitializer.initialize(userId);
    } catch (error) {
      console.log("DEBUG WalletController error", error);
      throw error;
    }
  }

  async getWallets(query: GetWalletQuery): Promise<WalletOutput[]> {
    const wallets = await this.userWalletRepository.find(query);
    return wallets.map(wallet => pick(wallet, ["id", "userId", "address", "creditAmount"]));
  }

  async signTx({ userId, messages }: SignTxInput): Promise<SignTxOutput> {
    return await this.signerService.signAndBroadcast(userId, messages as EncodeObject[]);
  }

  async refillAll() {
    const wallets = await this.userWalletRepository.find();
    const { results, errors } = await PromisePool.withConcurrency(2)
      .for(wallets)
      .process(async wallet => {
        const refilled = await this.walletManager.refill(wallet);
        console.log("DEBUG refilled", refilled);
        return refilled;
      });

    if (errors) {
      console.log("DEBUG errors", errors);
    }

    console.log("DEBUG results", results);
  }
}
