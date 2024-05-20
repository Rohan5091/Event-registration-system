import { useLocation, useNavigate } from "react-router-dom"

function AlreadyRegistered() {
  const attendee=useLocation()
  console.log(attendee);
  const navigate=useNavigate()
  return (
    <div className="h-screen gap-4 flex flex-col items-center justify-center relative bg-[#1A2238]">
        <h1 className="text-2xl text-white font-semibold">You are Already Registered for the event</h1>
        <h1 className="text-3xl text-yellow-500 font-semibold">Explore more Events</h1>
        <p className="bg-black text-white rotate-12 px-2 absolute"></p>
        <button onClick={()=>navigate("/eventlist")} className="border text-yellow-500 p-2 rounded-md">Go to Home</button>
    </div>
  )
}

export default AlreadyRegistered 