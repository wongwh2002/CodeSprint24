import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom'
import StartPage from './pages/StartPage'
import AdminPage from './pages/AdminPage'
import './index.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route index element={<StartPage />}/>
      <Route path='/admin' element={<AdminPage />}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
