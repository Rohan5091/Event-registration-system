import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axiosInstance from "../Hellers/axiosinstance";

function Profile() {
   const [userData, setuserData] = useState({})
   const navigate=useNavigate()
  async function DownloadData() {
    try {
      const response=await axiosInstance.get("/user/profile")
      if (response?.data?.success) {
        setuserData(response?.data?.data)
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  }
 

  useEffect(() => {
    DownloadData();
  }, []);

  return (
      <div className="min-w-[90vw] flex items-center justify-center">
        <div className="my-10 flex flex-col items-center gap-4 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_yellow]">
          <img
            className="w-40 h-40 border border-black rounded-full "
            src={userData?.avatar?.secure_url}
            alt="avatar"
          />
          <h3 className="text-3xl font-bold capitalize text-yellow-500">
            {userData?.fullName}
          </h3>
          {userData?.role == "ADMIN" && (
            <button onClick={()=>navigate("/event/create")}  className="w-full bg-red-500 border px-2 py-1 transition-all ease-in-out duration-300 rounded-lg hover:bg-red-600">
              {" "}
              Create New Event
            </button>
          )}    
              
        </div>
      </div>
  );
}

export default Profile;
