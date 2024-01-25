import { useContext } from "react"
import { Link } from "react-router-dom"
import { userContext } from "../context/userContext"

function Navbar() {

    const { state, dispatch } = useContext(userContext)
   
    return (
        <nav className="flex items-center justify-between py-4 px-24 bg-slate-900 text-white">
            <h1 className="font-bold text-3xl">Auth</h1>

            <ul className="flex gap-5">
                <li><Link to="/">Home</Link></li>
                {state?.user ? (
                    <>
                        <li><Link to="/profile">My Profile ({state.user.email})</Link></li>
                        <li className="cursor-pointer" onClick={()=>dispatch({type:"LOGOUT_USER"})}>Logout</li>
                    </>) : (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>)}


            </ul>
        </nav>
    )
}

export default Navbar