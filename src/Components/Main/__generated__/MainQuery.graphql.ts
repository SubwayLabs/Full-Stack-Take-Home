/**
 * @generated SignedSource<<8810f6279ef1515908c0f494e2c96e08>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ChannelsChannelStatusChoices = "R" | "S" | "%future added value";
export type MainQuery$variables = Record<PropertyKey, never>;
export type MainQuery$data = {
  readonly channels: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly name: string;
        readonly status: ChannelsChannelStatusChoices;
      } | null | undefined;
    } | null | undefined>;
  } | null | undefined;
};
export type MainQuery = {
  response: MainQuery$data;
  variables: MainQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "ChannelNodeConnection",
    "kind": "LinkedField",
    "name": "channels",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "ChannelNodeEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ChannelNode",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "status",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MainQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MainQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "ae617c3050183b3ddf312792c0cfd84d",
    "id": null,
    "metadata": {},
    "name": "MainQuery",
    "operationKind": "query",
    "text": "query MainQuery {\n  channels {\n    edges {\n      node {\n        id\n        name\n        status\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "8788f80c5cd26ed7fb3e0ab67b1b85ff";

export default node;
