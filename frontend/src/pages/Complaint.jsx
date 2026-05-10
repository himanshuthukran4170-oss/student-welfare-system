import { useState } from "react"
import API from "../services/api"
import Navbar from "../components/Navbar"
function Complaint() {

  const [formData, setFormData] = useState({
    title: "",
    description: ""
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

      const token = localStorage.getItem("token")

      const res = await API.post(
        "/complaints/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      alert(res.data.message)

      setFormData({
        title: "",
        description: ""
      })

    } catch (error) {console.log(error)

      alert(
        error?.response?.data?.message ||
        error.message ||
        "Something went wrong"
      )
    }
  }

  return (
    <div>
      <Navbar/>
      <h2>Submit Complaint</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="title"
          placeholder="Complaint Title"
          value={formData.title}
          onChange={handleChange}
        />

        <br /><br />

        <textarea
          name="description"
          placeholder="Enter Complaint"
          value={formData.description}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">
          Submit
        </button>

      </form>

    </div>
  )
}

export default Complaint