import { Link, useNavigate } from "react-router-dom"

function Navbar() {

  const navigate = useNavigate()

  const handleLogout = () => {

    localStorage.removeItem("token")

    navigate("/")
  }

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        padding: "10px",
        borderBottom: "1px solid black",
        marginBottom: "20px"
      }}
    >

      <Link to="/dashboard">
        Dashboard
      </Link>
      <Link to="/admin">
        Admin
      </Link>
      <Link to="/complaint">
        Complaint
      </Link>

      <button onClick={handleLogout}>
        Logout
      </button>

    </div>
  )
}

export default Navbar