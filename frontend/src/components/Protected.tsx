import { useNavigate, Navigate } from "react-router-dom"
import { userContext } from "../context/userContext"
import { useContext } from "react"


function Protected({ children }) {
    const { state ,sidpatch } = useContext(userContext)


    if(!state.user) return <Navigate to="/login" />

    return (

        <> {children}</>
    )

}

export default Protected