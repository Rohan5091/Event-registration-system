import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../Hellers/axiosinstance";
import { useEffect, useState } from "react";

function EventDescription() {

  const [userData, setuserData] = useState({})
  const { state } = useLocation();
  const navigate = useNavigate();
  

  async function  Loaddata() {
    try {
       const userdata = await axiosInstance.get("/user/profile");
        setuserData({...userdata?.data?.data}) 
    } catch (error) {
       console.log(error.message);
    }
  } 
  
  async function DeleteEvent(eventId) {
    const formData = {
      eventId: eventId,
    };

     if ( window.confirm("Do you realy want to delete this event")) {
      try {
          const response=await axiosInstance.post("/event/removeevent",formData)
          if (response?.data?.success) {
            navigate("/eventlist")
          }
      } catch (error) {
          console.log(error?.response?.data?.message);
      }
     } 
  }

  async function onclicked(eventId) {
    const formData = {
      eventId: eventId,
    };
    try {
      const eventdata = await axiosInstance.post("/event/geteventdetail",formData);
      const attendees = eventdata?.data?.data?.attendees;
      const attendee = userData?._id;

      if (attendees.includes(attendee)) {
        navigate("/alreadyregistered");
      } else {
        try {
          const response = await axiosInstance.post(
            "/notify/registered_user",
            formData
          );
          if (response?.data?.success) {
            navigate("/Success");
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
    const date = new Date(dat);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let month = months[date.getMonth()];
    const day = date.getUTCDate();
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesStr = minutes < 10 ? "0" + minutes : minutes;
    return { 
       date:`${day} ${month} ${year}`,
       time:`${hours}:${minutesStr} ${ampm}`
    }

  }

  useEffect(()=>{
    Loaddata();
  },[])


  return (
    <div className=" flex  pt-2 bg-gradient-to-r from-cyan-500 to-blue-500 border-2 rounded-2xl border-gray-200 text-white flex-row justify-center items-center">
      <div className="grid grid-cols-1 gap-10 py-10 relative">
        <div className="space-y-5 mx-auto ">
          <div className="space-y-4">
            <div className="flex  flex-col justify-between items-center text-xl">
              <p className="font-semibold text-center  mb-4">
                <span className="text-yellow-500 font-bold">
                  {state?.title}
                </span>
              </p>
              <p className="font-semibold">
                <span className="text-yellow-500 font-bold">Date : </span>
                {formatDate(state?.date).date}
              </p>
              <p className="font-semibold">
                <span className="text-yellow-500 font-bold">Time : </span>
                {formatDate(state?.date).time}
              </p>
              <p className="font-semibold">
                <span className="text-yellow-500 font-bold">Duration: </span>
                {state?.duration} hours
              </p>
              <p className="font-semibold">
                <span className="text-yellow-500 font-bold">Location: </span>
                {state?.location}
              </p>
              <p className="px-60 my-8 ">
                {state?.description}
              </p>
              
              <button
                type="button"
                onClick={() => onclicked(state._id)}
                className="m-4 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              >
                Participate Now
              </button>

              {userData?.role == "ADMIN" && (
                 <button onClick={()=>navigate("/event/edit",{state:{...state}})}  className=" bg-red-500 border px-3 py-2 my-5 transition-all ease-in-out duration-300 rounded-lg hover:bg-red-600">
                 Edit Event
                 </button>
              )}

              {userData?.role == "ADMIN" && (
                 <button onClick={() => DeleteEvent(state._id)}  className=" bg-red-500 border px-2 py-1 transition-all ease-in-out duration-300 rounded-lg hover:bg-red-600">
                 {" "}
                 Delete Event
                 </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EventDescription;
