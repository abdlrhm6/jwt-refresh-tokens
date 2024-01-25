import { createContext, useReducer } from "react"


const Initialstate = {
    user:  JSON.parse(localStorage.getItem("user")) || null
}

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
        localStorage.setItem("user" , JSON.stringify(action.payload))
        return {...state, user : action.payload}
        break
        case "LOGOUT_USER":
        localStorage.removeItem("user")
        //delete the cookie
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "refresh-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        return {...state,user :  null}
        break
        default :
        return {...state}
    }

}
export const userContext = createContext(null)


export default function UserContext({ children }) {
    const [state, dispatch] = useReducer<any>(reducer, Initialstate)

    return (
        <userContext.Provider value={{ state, dispatch }}>
            {children}
        </userContext.Provider>
    )
}
