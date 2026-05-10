import { useState } from "react"
import API from "../services/api"
import { useNavigate, Link } from "react-router-dom"

function Login() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      const res = await API.post("/api/auth/login", formData)

      localStorage.setItem("token", res.data.token)

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      )

      alert("Login Successful")

      navigate("/dashboard")

    } catch (error) {
      console.log(error)

alert(
  error?.response?.data?.message ||
  error.message ||
  "Something went wrong"
)
    }
  }

  return (
    <div>

      <h2>Login</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Login
        </button>

      </form>

      <br />

      <Link to="/register">
        Create New Account
      </Link>

    </div>
  )
}

export default Login