import { Outlet } from "react-router-dom"
import UserContext from "./context/userContext"
import Navbar from "./components/Navbar"

export const Layout = () => {
  return (
    <>
      <UserContext>
      <Navbar/>
      <Outlet />
      </UserContext>
    </>
  )
}
