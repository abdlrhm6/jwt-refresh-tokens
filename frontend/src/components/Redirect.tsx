import { Navigate } from "react-router-dom"
import { userContext } from "../context/userContext"
import { useContext } from "react"

function Redirect( {to ,component}) {

    const { state, dispatch } = useContext(userContext)
    if(state.user) return <Navigate to={to}/>
    return (
        <>{component}</>
    )
}

export default Redirect