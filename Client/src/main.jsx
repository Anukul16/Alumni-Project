import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {store} from './redux/store/Store.js'
import { Provider } from 'react-redux'
import { NextUIProvider } from '@nextui-org/react'


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <StrictMode>
        <NextUIProvider>
            <App />
        </NextUIProvider>
      </StrictMode>
  </Provider>
  
)
