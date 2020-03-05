import React from 'react';
import { ConnectedRouter } from 'connected-react-router';

import { Provider } from "react-redux";
import LoadingIndicator from 'views/shared/LoadingIndicator';
import RoutesComponent from 'views/shared/routes/RoutesComponent';
import { configureStore, getHistory } from 'modules/store';

const store = configureStore();

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ConnectedRouter history={getHistory()}>
          <React.Suspense fallback={<LoadingIndicator />}>
            <RoutesComponent />
          </React.Suspense>
        </ConnectedRouter>
      </Provider>

    </div>
  );
}

export default App;
