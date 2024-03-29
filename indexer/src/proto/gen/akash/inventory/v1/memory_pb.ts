// @generated by protoc-gen-es v1.7.2 with parameter "target=ts"
// @generated from file akash/inventory/v1/memory.proto (package akash.inventory.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";
import { ResourcePair } from "./resourcepair_pb";

/**
 * MemoryInfo reports Memory details
 *
 * @generated from message akash.inventory.v1.MemoryInfo
 */
export class MemoryInfo extends Message<MemoryInfo> {
  /**
   * @generated from field: string vendor = 1;
   */
  vendor = "";

  /**
   * @generated from field: string type = 2;
   */
  type = "";

  /**
   * @generated from field: string total_size = 3;
   */
  totalSize = "";

  /**
   * @generated from field: string speed = 4;
   */
  speed = "";

  constructor(data?: PartialMessage<MemoryInfo>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "akash.inventory.v1.MemoryInfo";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "vendor", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "type", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 3, name: "total_size", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 4, name: "speed", kind: "scalar", T: 9 /* ScalarType.STRING */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): MemoryInfo {
    return new MemoryInfo().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): MemoryInfo {
    return new MemoryInfo().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): MemoryInfo {
    return new MemoryInfo().fromJsonString(jsonString, options);
  }

  static equals(a: MemoryInfo | PlainMessage<MemoryInfo> | undefined, b: MemoryInfo | PlainMessage<MemoryInfo> | undefined): boolean {
    return proto3.util.equals(MemoryInfo, a, b);
  }
}

/**
 * Memory reports Memory inventory details
 *
 * @generated from message akash.inventory.v1.Memory
 */
export class Memory extends Message<Memory> {
  /**
   * @generated from field: akash.inventory.v1.ResourcePair quantity = 1;
   */
  quantity?: ResourcePair;

  /**
   * @generated from field: repeated akash.inventory.v1.MemoryInfo info = 2;
   */
  info: MemoryInfo[] = [];

  constructor(data?: PartialMessage<Memory>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "akash.inventory.v1.Memory";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "quantity", kind: "message", T: ResourcePair },
    { no: 2, name: "info", kind: "message", T: MemoryInfo, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Memory {
    return new Memory().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Memory {
    return new Memory().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Memory {
    return new Memory().fromJsonString(jsonString, options);
  }

  static equals(a: Memory | PlainMessage<Memory> | undefined, b: Memory | PlainMessage<Memory> | undefined): boolean {
    return proto3.util.equals(Memory, a, b);
  }
}

