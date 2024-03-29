// @generated by protoc-gen-es v1.7.2 with parameter "target=ts"
// @generated from file akash/inventory/v1/node.proto (package akash.inventory.v1, syntax proto3)
/* eslint-disable */
// @ts-nocheck

import type { BinaryReadOptions, FieldList, JsonReadOptions, JsonValue, PartialMessage, PlainMessage } from "@bufbuild/protobuf";
import { Message, proto3 } from "@bufbuild/protobuf";
import { NodeResources } from "./resources_pb";

/**
 * NodeCapabilities extended list of node capabilities
 *
 * @generated from message akash.inventory.v1.NodeCapabilities
 */
export class NodeCapabilities extends Message<NodeCapabilities> {
  /**
   * @generated from field: repeated string storage_classes = 1;
   */
  storageClasses: string[] = [];

  constructor(data?: PartialMessage<NodeCapabilities>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "akash.inventory.v1.NodeCapabilities";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "storage_classes", kind: "scalar", T: 9 /* ScalarType.STRING */, repeated: true },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): NodeCapabilities {
    return new NodeCapabilities().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): NodeCapabilities {
    return new NodeCapabilities().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): NodeCapabilities {
    return new NodeCapabilities().fromJsonString(jsonString, options);
  }

  static equals(a: NodeCapabilities | PlainMessage<NodeCapabilities> | undefined, b: NodeCapabilities | PlainMessage<NodeCapabilities> | undefined): boolean {
    return proto3.util.equals(NodeCapabilities, a, b);
  }
}

/**
 * Node reports node inventory details
 *
 * @generated from message akash.inventory.v1.Node
 */
export class Node extends Message<Node> {
  /**
   * @generated from field: string name = 1;
   */
  name = "";

  /**
   * @generated from field: akash.inventory.v1.NodeResources resources = 2;
   */
  resources?: NodeResources;

  /**
   * @generated from field: akash.inventory.v1.NodeCapabilities capabilities = 3;
   */
  capabilities?: NodeCapabilities;

  constructor(data?: PartialMessage<Node>) {
    super();
    proto3.util.initPartial(data, this);
  }

  static readonly runtime: typeof proto3 = proto3;
  static readonly typeName = "akash.inventory.v1.Node";
  static readonly fields: FieldList = proto3.util.newFieldList(() => [
    { no: 1, name: "name", kind: "scalar", T: 9 /* ScalarType.STRING */ },
    { no: 2, name: "resources", kind: "message", T: NodeResources },
    { no: 3, name: "capabilities", kind: "message", T: NodeCapabilities },
  ]);

  static fromBinary(bytes: Uint8Array, options?: Partial<BinaryReadOptions>): Node {
    return new Node().fromBinary(bytes, options);
  }

  static fromJson(jsonValue: JsonValue, options?: Partial<JsonReadOptions>): Node {
    return new Node().fromJson(jsonValue, options);
  }

  static fromJsonString(jsonString: string, options?: Partial<JsonReadOptions>): Node {
    return new Node().fromJsonString(jsonString, options);
  }

  static equals(a: Node | PlainMessage<Node> | undefined, b: Node | PlainMessage<Node> | undefined): boolean {
    return proto3.util.equals(Node, a, b);
  }
}

