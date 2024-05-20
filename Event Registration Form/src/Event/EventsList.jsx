import { useEffect, useState } from "react"
import axiosInstance from "../Hellers/axiosinstance.js"
import toast from "react-hot-toast"

import { BsPersonCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import EventCard from "./EventCard.jsx";
             
function EventsList() {
  const navigate=useNavigate()

  const [Events, setEvents] = useState([])
  async function LoadEvents() {
     try {
        const res=await axiosInstance.get("/event/getalleventdetail") 
        setEvents(res?.data?.data)
     } catch (error) {
        console.log(error?.message);
     }
  }

  useEffect(()=>{
    LoadEvents()
  },[])

  return (
    <div className="min-h-[90vh] bg-black pt-12 pl-20 flex flex-col items-center gap-10 text-white">
          <div onClick={()=>navigate("/user/profile")} className="text-5xl cursor-pointer  absolute right-10">
              <BsPersonCircle/>
          </div>
         <h1 className="text-center text-3xl">
             Explore all upcoming Events, conducted by <span className="font-bold text-yellow-500">GFG Student Chapter</span>
         </h1>
         <div className="flex justify-center flex-wrap gap-4 p-10">
             {Events?.map((Event)=>{
                return <EventCard key={Event._id} data={Event}/>
             })}   
         </div>
    </div>
  )
}

export default EventsList