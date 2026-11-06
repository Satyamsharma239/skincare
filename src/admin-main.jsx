import React from 'react'
import ReactDOM from 'react-dom/client'
import { StoreProvider } from './context/StoreContext'
import { AdminPortal } from './components/admin/AdminPortal'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StoreProvider isDedicatedAdmin={true}>
      <AdminPortal />
    </StoreProvider>
  </React.StrictMode>
)