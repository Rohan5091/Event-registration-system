import { useDispzatch, useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"
import { useEffect } from "react"


// THIS COMPONENT IS REQUIRED US TO AUTHANTICATE THE USER IS ADMIN OR OTHER IF ADMIN THAN WE EXICUTE THE OUTLATE COMPONENT WHICH EXICUTE THE COMPONET WHICH IS PASSED BY US IN ROUTING 



function RequireAuth({allowedRoles}) {
  async function setData() {
     await dispatch(GetUserProfile())
  }
 useEffect(()=>{
  setData()
 },[])
  return  isLoggedIn && allowedRoles.find((ele)=>ele==role) ?(
     <Outlet/>
  ):isLoggedIn ?( <Navigate to={"/dinied"}/> ):(<Navigate to={"/login"}/>)
}
export default RequireAuth