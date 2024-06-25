import React from 'react'
import ReactDOM from 'react-dom/client'

import './styles.css'
import { TecfoodApp } from './TecfoodApp.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <TecfoodApp/>
    </BrowserRouter>
  </React.StrictMode>,
)
