import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { store, persistor, history } from './app/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react'
import { ConnectedRouter } from 'connected-react-router'
import 'bootstrap/dist/css/bootstrap.min.css'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
