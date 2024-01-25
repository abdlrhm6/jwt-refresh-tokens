import { userContext } from "../context/userContext"
import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { refreshInstance } from "../utils/axios.js"

export const Profile = () => {
  const { register, handleSubmit, formState: { errors } ,setValue} = useForm()
  const [msg, setmsg] = useState("")
  const { state } = useContext(userContext)

  const save = async (formData) => {

    const cookies = document.cookie.split("; ")
    const accessCookie = cookies.find((cookie) => cookie.startsWith("token=")).split("=")[1]

    const authHeader = `Bearer ${accessCookie}`

    const { data } = await refreshInstance.post("/profile", { email: formData.email }, {
      headers: {
        authorization: authHeader
      }
    })

   if(data.success){
    setmsg("Email changed successfully")
    setValue("email","")
   }

  }
  return (
    <div className="h-screen flex bg-slate-800 flex-col text-white items-center justify-center">
      <h1 className="text-4xl text-center font-bold max-w-3xl">Welcome {state.user.email} to your Personal Space</h1>
      <form className="max-w-md mx-auto mt-24" noValidate onSubmit={handleSubmit(save)}>
        <h1 className='text-white text-5xl font-bold mb-9'>Change My Email</h1>
       {msg && ( <div className="bg-green-500 py-4 px-5 text-green-900 rounded-md my-4">{msg}</div>)}
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New email</label>
          <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="example@xyz.com"
            {...register("email", {
              required: true, pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Invalid email address',
              }
            })}
          />

          {errors.email && errors.email.type === "required" && (
            <p className="text-red-500 my-3">Email is required.</p>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <p className="text-red-500 my-3">Email is in a wrong format.</p>
          )}
        </div>

        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save </button>
      </form>
    </div>
  )
}
