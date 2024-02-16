// @generated by protoc-gen-es v1.7.2 with parameter "target=ts"
// @generated from file akash/provider/v1/status.proto (package akash.provider.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3, Timestamp } from "@bufbuild/protobuf";
import { Quantity } from "../../../k8s.io/apimachinery/pkg/api/resource/generated_pb";
import { Cluster } from "../../inventory/v1/cluster_pb";

/**
 * ResourceMetrics
 *
 * @generated from message akash.provider.v1.ResourcesMetric
 */
export class ResourcesMetric extends Message<ResourcesMetric> {
  /**
   * @generated from field: k8s.io.apimachinery.pkg.api.resource.Quantity cpu = 1;
   */
  cpu?: Quantity;

  /**
   * @generated from field: k8s.io.apimachinery.pkg.api.resource.Quantity memory = 2;
   */
  memory?: Quantity;

  /**
   * @generated from field: k8s.io.apimachinery.pkg.api.resource.Quantity gpu = 3;
   */
  gpu?: Quantity;

  /**
   * @generated from field: k8s.io.apimachinery.pkg.api.resource.Quantity ephemeral_storage = 4;
   */
  ephemeralStorage?: Quantity;

  /**
   * @generated from field: map<string, k8s.io.apimachinery.pkg.api.resource.Quantity> storage = 5;
   */
  storage: { [key: string]: Quantity } = {};

  constructor(data?: PartialMessage<ResourcesMetric>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "akash.provider.v1.ResourcesMetric";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "cpu", kind: "message", T: Quantity },
    { no: 2, name: "memory", kind: "message", T: Quantity },
    { no: 3, name: "gpu", kind: "message", T: Quantity },
    { no: 4, name: "ephemeral_storage", kind: "message", T: Quantity },
    { no: 5, name: "storage", kind: "map", K: 9 /* ScalarType.STRING */, V: {kind: "message", T: Quantity} },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ResourcesMetric {
    return new ResourcesMetric().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ResourcesMetric {
    return new ResourcesMetric().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ResourcesMetric {
    return new ResourcesMetric().fromJsonString(jsonString, options);
  }

  static equals(a: ResourcesMetric | PlainMessage<ResourcesMetric> | undefined, b: ResourcesMetric | PlainMessage<ResourcesMetric> | undefined): boolean {
    return proto3.util.equals(ResourcesMetric, a, b);
  }
}

/**
 * Leases
 *
 * @generated from message akash.provider.v1.Leases
 */
export class Leases extends Message<Leases> {
  /**
   * @generated from field: uint32 active = 1;
   */
  active = 0;

  constructor(data?: PartialMessage<Leases>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "akash.provider.v1.Leases";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "active", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Leases {
    return new Leases().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Leases {
    return new Leases().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Leases {
    return new Leases().fromJsonString(jsonString, options);
  }

  static equals(a: Leases | PlainMessage<Leases> | undefined, b: Leases | PlainMessage<Leases> | undefined): boolean {
    return proto3.util.equals(Leases, a, b);
  }
}

/**
 * ReservationsMetric
 *
 * @generated from message akash.provider.v1.ReservationsMetric
 */
export class ReservationsMetric extends Message<ReservationsMetric> {
  /**
   * @generated from field: uint32 count = 1;
   */
  count = 0;

  /**
   * @generated from field: akash.provider.v1.ResourcesMetric resources = 2;
   */
  resources?: ResourcesMetric;

  constructor(data?: PartialMessage<ReservationsMetric>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "akash.provider.v1.ReservationsMetric";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "count", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
    { no: 2, name: "resources", kind: "message", T: ResourcesMetric },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ReservationsMetric {
    return new ReservationsMetric().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ReservationsMetric {
    return new ReservationsMetric().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ReservationsMetric {
    return new ReservationsMetric().fromJsonString(jsonString, options);
  }

  static equals(a: ReservationsMetric | PlainMessage<ReservationsMetric> | undefined, b: ReservationsMetric | PlainMessage<ReservationsMetric> | undefined): boolean {
    return proto3.util.equals(ReservationsMetric, a, b);
  }
}

/**
 * Reservations
 *
 * @generated from message akash.provider.v1.Reservations
 */
export class Reservations extends Message<Reservations> {
  /**
   * @generated from field: akash.provider.v1.ReservationsMetric pending = 1;
   */
  pending?: ReservationsMetric;

  /**
   * @generated from field: akash.provider.v1.ReservationsMetric active = 2;
   */
  active?: ReservationsMetric;

  constructor(data?: PartialMessage<Reservations>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "akash.provider.v1.Reservations";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "pending", kind: "message", T: ReservationsMetric },
    { no: 2, name: "active", kind: "message", T: ReservationsMetric },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Reservations {
    return new Reservations().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Reservations {
    return new Reservations().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Reservations {
    return new Reservations().fromJsonString(jsonString, options);
  }

  static equals(a: Reservations | PlainMessage<Reservations> | undefined, b: Reservations | PlainMessage<Reservations> | undefined): boolean {
    return proto3.util.equals(Reservations, a, b);
  }
}

/**
 * Inventory
 *
 * @generated from message akash.provider.v1.Inventory
 */
export class Inventory extends Message<Inventory> {
  /**
   * @generated from field: akash.inventory.v1.Cluster cluster = 1;
   */
  cluster?: Cluster;

  /**
   * @generated from field: akash.provider.v1.Reservations reservations = 2;
   */
  reservations?: Reservations;

  constructor(data?: PartialMessage<Inventory>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "akash.provider.v1.Inventory";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "cluster", kind: "message", T: Cluster },
    { no: 2, name: "reservations", kind: "message", T: Reservations },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Inventory {
    return new Inventory().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Inventory {
    return new Inventory().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Inventory {
    return new Inventory().fromJsonString(jsonString, options);
  }

  static equals(a: Inventory | PlainMessage<Inventory> | undefined, b: Inventory | PlainMessage<Inventory> | undefined): boolean {
    return proto3.util.equals(Inventory, a, b);
  }
}

/**
 * ClusterStatus
 *
 * @generated from message akash.provider.v1.ClusterStatus
 */
export class ClusterStatus extends Message<ClusterStatus> {
  /**
   * @generated from field: akash.provider.v1.Leases leases = 1;
   */
  leases?: Leases;

  /**
   * @generated from field: akash.provider.v1.Inventory inventory = 2;
   */
  inventory?: Inventory;

  constructor(data?: PartialMessage<ClusterStatus>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "akash.provider.v1.ClusterStatus";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "leases", kind: "message", T: Leases },
    { no: 2, name: "inventory", kind: "message", T: Inventory },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ClusterStatus {
    return new ClusterStatus().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ClusterStatus {
    return new ClusterStatus().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ClusterStatus {
    return new ClusterStatus().fromJsonString(jsonString, options);
  }

  static equals(a: ClusterStatus | PlainMessage<ClusterStatus> | undefined, b: ClusterStatus | PlainMessage<ClusterStatus> | undefined): boolean {
    return proto3.util.equals(ClusterStatus, a, b);
  }
}

/**
 * BidEngineStatus
 *
 * @generated from message akash.provider.v1.BidEngineStatus
 */
export class BidEngineStatus extends Message<BidEngineStatus> {
  /**
   * @generated from field: uint32 orders = 1;
   */
  orders = 0;

  constructor(data?: PartialMessage<BidEngineStatus>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "akash.provider.v1.BidEngineStatus";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "orders", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): BidEngineStatus {
    return new BidEngineStatus().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): BidEngineStatus {
    return new BidEngineStatus().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): BidEngineStatus {
    return new BidEngineStatus().fromJsonString(jsonString, options);
  }

  static equals(a: BidEngineStatus | PlainMessage<BidEngineStatus> | undefined, b: BidEngineStatus | PlainMessage<BidEngineStatus> | undefined): boolean {
    return proto3.util.equals(BidEngineStatus, a, b);
  }
}

/**
 * ManifestStatus
 *
 * @generated from message akash.provider.v1.ManifestStatus
 */
export class ManifestStatus extends Message<ManifestStatus> {
  /**
   * @generated from field: uint32 deployments = 1;
   */
  deployments = 0;

  constructor(data?: PartialMessage<ManifestStatus>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "akash.provider.v1.ManifestStatus";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "deployments", kind: "scalar", T: 13 /* ScalarType.UINT32 */ },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): ManifestStatus {
    return new ManifestStatus().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): ManifestStatus {
    return new ManifestStatus().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): ManifestStatus {
    return new ManifestStatus().fromJsonString(jsonString, options);
  }

  static equals(a: ManifestStatus | PlainMessage<ManifestStatus> | undefined, b: ManifestStatus | PlainMessage<ManifestStatus> | undefined): boolean {
    return proto3.util.equals(ManifestStatus, a, b);
  }
}

/**
 * Status
 *
 * @generated from message akash.provider.v1.Status
 */
export class Status extends Message<Status> {
  /**
   * @generated from field: repeated string errors = 1;
   */
  errors: string[] = [];

  /**
   * @generated from field: akash.provider.v1.ClusterStatus cluster = 2;
   */
  cluster?: ClusterStatus;

  /**
   * @generated from field: akash.provider.v1.BidEngineStatus bid_engine = 3;
   */
  bidEngine?: BidEngineStatus;

  /**
   * @generated from field: akash.provider.v1.ManifestStatus manifest = 4;
   */
  manifest?: ManifestStatus;

  /**
   * @generated from field: repeated string public_hostnames = 5;
   */
  publicHostnames: string[] = [];

  /**
   * @generated from field: google.protobuf.Timestamp timestamp = 6;
   */
  timestamp?: Timestamp;

  constructor(data?: PartialMessage<Status>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "akash.provider.v1.Status";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "errors", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 2, name: "cluster", kind: "message", T: ClusterStatus },
    { no: 3, name: "bid_engine", kind: "message", T: BidEngineStatus },
    { no: 4, name: "manifest", kind: "message", T: ManifestStatus },
    { no: 5, name: "public_hostnames", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
    { no: 6, name: "timestamp", kind: "message", T: Timestamp },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Status {
    return new Status().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Status {
    return new Status().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Status {
    return new Status().fromJsonString(jsonString, options);
  }

  static equals(a: Status | PlainMessage<Status> | undefined, b: Status | PlainMessage<Status> | undefined): boolean {
    return proto3.util.equals(Status, a, b);
  }
}

