import { useEffect, useState } from "react"
import API from "../services/api"
import Navbar from "../components/Navbar"

function Admin() {

  const [complaints, setComplaints] = useState([])

  useEffect(() => {

    fetchComplaints()

  }, [])

  const fetchComplaints = async () => {

    try {

      const token = localStorage.getItem("token")

      const res = await API.get(
        "/api/complaints",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      console.log(res.data)
      setComplaints(res.data.complaints)

    } catch (error) {
      console.log(error)
    }
  }
  const updateStatus = async (id, status) => {

    try {
  
      const token = localStorage.getItem("token")
  
      await API.put(
        `/api/complaints/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
  
      fetchComplaints()
  
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Navbar />

      <div>

        <h2>All Complaints</h2>

        {
          complaints.map((complaint) => (

            <div
              key={complaint._id}
              style={{
                border: "1px solid black",
                padding: "10px",
                marginBottom: "10px"
              }}
            >

              <h3>{complaint.title}</h3>

              <p>{complaint.description}</p>

              <p>Category: {complaint.category}</p>

              <select
                value={complaint.status}
                onChange={(e) =>
                  updateStatus(complaint._id, e.target.value)
                }
              >

                <option value="Pending">
                  Pending
                </option>

                <option value="In Progress">
                  In Progress
                </option>

                <option value="Resolved">
                  Resolved
                </option>

              </select>

              <p>
                Student:
                {" "}
                {complaint.student?.name}
              </p>

            </div>
          ))
        }

      </div>
    </>
  )
}

export default Admin