import { useEffect, useState } from "react"
import API from "../services/api"
import Navbar from "../components/Navbar"
function Dashboard() {

  const [complaints, setComplaints] = useState([])

  useEffect(() => {

    fetchComplaints()

  }, [])

  const fetchComplaints = async () => {

    try {

      const token = localStorage.getItem("token")

      const res = await API.get(
        "/api/complaints/my",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setComplaints(res.data.complaints)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    
    <div>
      <Navbar/>
      <h2>My Complaints</h2>

      {
        complaints.length === 0
        ?
        <p>No Complaints Found</p>
        :
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

            <p>Status: {complaint.status}</p>

          </div>
        ))
      }

    </div>
  )
}

export default Dashboard