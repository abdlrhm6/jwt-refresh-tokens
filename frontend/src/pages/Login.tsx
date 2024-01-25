import { useForm } from "react-hook-form"
import { instance } from "../utils/axios.js"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { userContext } from "../context/userContext.js"
export const Login = () => {
  const {state,dispatch} = useContext(userContext)
  const [error, setError] = useState()
  const navigate = useNavigate()


  const { register, handleSubmit, formState: { errors }, getValues } = useForm()
  const loginUser = async (formData: any) => {
    const { data } = await instance.post("login", { ...formData })
    if (data.errors) {
      setError(data.errors)
    } else {
      dispatch({type:"SET_USER" , payload : data.user})
      navigate("/")
    }
  }
  return (
    <div className='bg-slate-900 h-screen flex items-center justify-center'>

      <form className="max-w-md mx-auto" noValidate onSubmit={handleSubmit(loginUser)}>
        <h1 className='text-white text-5xl font-bold mb-9'>Login</h1>
        {error && <p className="text-red-500 my-3">{error}</p>}
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
          <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="example@xyz.com"

            {...register("email", {
              required: true, pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Invalid email address',
              },
            })} />
          {errors.email && errors.email.type === "required" && (
            <p className="text-red-500 my-3">Email is required.</p>
          )}
          {errors.email && errors.email.type === "pattern" && (
            <p className="text-red-500 my-3">Email is in a wrong format.</p>
          )}
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
          <input type="password" id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"

            {...register("password", {
              required: true,
              minLength: 6
            })}
          />
          {errors.password && errors.password.type === "required" && (
            <p className="text-red-500 my-3">Password is required.</p>
          )}
          {errors.password && errors.password.type === "minLength" && (
            <p className="text-red-500 my-3">Atleast 6 chracters are required.</p>
          )}
        </div>

        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login </button>
      </form>

    </div>
  )
}
