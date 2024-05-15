import { useEffect, useState } from "react"
import axiosInstance from "../Hellers/axiosinstance.js"
import toast from "react-hot-toast"
import EventCard from "./EventCard.jsx"


function EventsList() {
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
         <h1 className="text-center text-3xl">
             Explore all upcoming Events that are conducted by <span className="font-bold text-yellow-500">GFG Student Chapter</span>
         </h1>
         <div className="flex flex-wrap gap-4 p-10">
             {Events?.map((Event)=>{
                return <EventCard key={Event._id} data={Event}/>
             })}   
         </div>
    </div>
  )
}

export default EventsList