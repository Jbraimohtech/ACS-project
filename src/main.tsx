import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './global.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Helmet>
        <title>Ambassadors Chaplain Corps</title>
        <meta name="description" content="Welcome to the Ambassadors Chaplain Corps" />
        <meta name="keywords" content="ambassadors, chaplain, corps, faith, community" />
      </Helmet>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
