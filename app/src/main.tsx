import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { DataProvider } from './context/DataContext'
import { MessageProvider } from './context/MessageContext'
import { ToastProvider } from './context/ToastContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <MessageProvider>
            <ToastProvider>
              <App />
            </ToastProvider>
          </MessageProvider>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
