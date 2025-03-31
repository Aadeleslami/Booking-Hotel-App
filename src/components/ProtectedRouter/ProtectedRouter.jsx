import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthProvider"
import { useEffect } from "react"

function ProtectedRouter({children}) {
     const{isAuthentication}=useAuth()
     const navigate =useNavigate()
     useEffect(()=>{
        if(!isAuthentication) navigate("/login")
     },[isAuthentication,navigate])
  return (
    <div>
        {isAuthentication ? children : null}
    </div>
  )
}

export default ProtectedRouter