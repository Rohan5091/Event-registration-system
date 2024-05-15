import { useNavigate, useParams } from "react-router-dom"
import EventDescription from "./EventDescription";
import axiosInstance from "../Hellers/axiosinstance";


function EventCard({data}) {
  
  const navigate=useNavigate()
   async function onclicked(eventId) {
        
      const formData={
         eventId:eventId
        }

        try {
           const eventdata=await axiosInstance.post("/event/geteventdetail",formData)
           const userdata=await axiosInstance.get("/user/profile")

           const attendees=eventdata?.data?.data?.attendees
           const attendee=userdata?.data?.data?._id

           if (attendees.includes(attendee)) {
             navigate("/alreadyregistered")
           } else{
            try {
               const response=await axiosInstance.post("/notify/registered_user",formData)
               console.log(response);
               if (response?.data?.success) {
                   navigate("/Success")
               }
            } catch (error) {
               console.log(error?.response?.data?.message); 
            }  
           }
        } catch (error) {
           console.log(error.message);
        }

      
  }
  function formatDate(dat) {
   const date=new Date(dat)
   const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let month = months[date.getMonth()];
   const day = date.getUTCDate();
   const year = date.getFullYear();
   let hours = date.getHours();
   const minutes = date.getMinutes();
   const ampm = hours >= 12 ? 'PM' : 'AM';
   hours = hours % 12;
   hours = hours ? hours : 12; // the hour '0' should be '12'
   const minutesStr = minutes < 10 ? '0' + minutes : minutes;

   return `${day} ${month} ${year} ${hours}:${minutesStr} ${ampm}`;
}
  return (
    <div className=" flex pt-12 px-20 border-2 rounded-2xl border-gray-200 text-white flex-row justify-center items-center">
       <div className="grid grid-cols-1 gap-10 py-10 relative">
          <div className="space-y-5 mx-auto ">
              <div className="space-y-4">
                 <div className="flex  flex-col justify-between items-center text-xl">
                    <p className="font-semibold text-center max-w-80 mb-4">
                        <span className="text-yellow-500 font-bold"> 
                          {data?.title}
                        </span>
                    </p>
                    <p className="font-semibold">
                        <span className="text-yellow-500 font-bold">
                          Date : {" "}
                        </span>
                        { formatDate(data?.date)}
                    </p>
                    <p className="font-semibold">
                        <span className="text-yellow-500 font-bold"> 
                        Duration:{" "}
                        </span>
                          {data?.duration} {" "} hours
                    </p>
                    <p className="font-semibold">
                        <span className="text-yellow-500 font-bold"> 
                        Location:{" "}
                        </span>
                          {data?.location}
                    </p>
                    <p className="text-xs my-8 max-w-80">
                          {data?.description}
                    </p>
                    <button type="button" onClick={()=>onclicked(data._id)} className="m-4 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Participate Now</button>
                 </div>
              </div> 
          </div>
       </div>
    </div>
  )
}

export default EventCard;