import { useNavigate, useParams } from "react-router-dom"
import EventDescription from "./EventDescription";


function EventCard({data}) {
  
  const navigate=useNavigate()

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
    <div className=" flex pt-12 px-20 border-2 border-gray-200 text-white flex-row justify-center items-center">
       <div className="grid grid-cols-1 gap-10 py-10 relative">
          <div className="space-y-5 mx-auto ">
              <div className="space-y-4">
                 <div className="flex  flex-col justify-between items-center text-xl">
                    <p className="font-semibold mb-4">
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
                    <p className="">
                          {data?.description}
                    </p>
                    <button type="button" class="m-4 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Participate Now</button>
                 </div>
              </div> 

          </div>
          
       </div>
    </div>
  )
}

export default EventCard;