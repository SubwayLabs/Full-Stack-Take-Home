import * as React from "react";
import RelayEnvironment from "../relay/RelayEnvironment";

import Home from './Home'

export default function App(): React.ReactElement {
  return (
    <RelayEnvironment>
      <React.Suspense fallback={<div />}>
        <div className="app">
          <Home />
        </div>
      </React.Suspense>
    </RelayEnvironment>
  );
}