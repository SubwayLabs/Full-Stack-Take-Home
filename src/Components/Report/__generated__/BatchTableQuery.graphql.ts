/**
 * @generated SignedSource<<10b418753770a9a2501dccf7e6d7fa22>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type BatchTableQuery$variables = {
  channels: ReadonlyArray<string>;
  end: any;
  passCapacity: number;
  start: any;
};
export type BatchTableQuery$data = {
  readonly reports: ReadonlyArray<{
    readonly batch: {
      readonly date: any;
    } | null | undefined;
    readonly channel: {
      readonly id: string;
      readonly name: string;
    } | null | undefined;
    readonly passRate: number | null | undefined;
  } | null | undefined> | null | undefined;
};
export type BatchTableQuery = {
  response: BatchTableQuery$data;
  variables: BatchTableQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "channels"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "end"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "passCapacity"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "start"
},
v4 = [
  {
    "kind": "Variable",
    "name": "channels",
    "variableName": "channels"
  },
  {
    "kind": "Variable",
    "name": "end",
    "variableName": "end"
  },
  {
    "kind": "Variable",
    "name": "passCapacity",
    "variableName": "passCapacity"
  },
  {
    "kind": "Variable",
    "name": "start",
    "variableName": "start"
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "ChannelNode",
  "kind": "LinkedField",
  "name": "channel",
  "plural": false,
  "selections": [
    (v5/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "date",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "passRate",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "BatchTableQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "ReportType",
        "kind": "LinkedField",
        "name": "reports",
        "plural": true,
        "selections": [
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "BatchNode",
            "kind": "LinkedField",
            "name": "batch",
            "plural": false,
            "selections": [
              (v7/*: any*/)
            ],
            "storageKey": null
          },
          (v8/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v3/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "BatchTableQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "ReportType",
        "kind": "LinkedField",
        "name": "reports",
        "plural": true,
        "selections": [
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "BatchNode",
            "kind": "LinkedField",
            "name": "batch",
            "plural": false,
            "selections": [
              (v7/*: any*/),
              (v5/*: any*/)
            ],
            "storageKey": null
          },
          (v8/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6a1bb3e5ce04ad54408f7e9c263651ae",
    "id": null,
    "metadata": {},
    "name": "BatchTableQuery",
    "operationKind": "query",
    "text": "query BatchTableQuery(\n  $channels: [ID!]!\n  $start: Date!\n  $end: Date!\n  $passCapacity: Float!\n) {\n  reports(channels: $channels, start: $start, end: $end, passCapacity: $passCapacity) {\n    channel {\n      id\n      name\n    }\n    batch {\n      date\n      id\n    }\n    passRate\n  }\n}\n"
  }
};
})();

(node as any).hash = "c6613a672a7a90fc5c7c6545df9b8174";

export default node;
