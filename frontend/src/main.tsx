import React from 'react'
import ReactDOM from 'react-dom/client'
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ErrorPage from './ErrorPage.tsx'
import { Layout } from './Layout.tsx'
import { Home } from './pages/Home.tsx'
import { Login } from './pages/Login.tsx'
import { Register } from './pages/Register.tsx'
import { Profile } from './pages/Profile.tsx'
import Protected from './components/Protected.tsx'
import Redirect from './components/Redirect.tsx'

const routes = createBrowserRouter([

  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/login",
        element: <Redirect to="/" component={<Login/>}/>
      },
      {
        path: "/register",
        element: <Redirect to="/" component={<Register/>}/>
      },
      {
        path: "/profile",
        element: <Protected><Profile /></Protected>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>,
)
