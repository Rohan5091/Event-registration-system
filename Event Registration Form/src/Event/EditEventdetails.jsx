import { useState } from "react"
import toast from "react-hot-toast"
import { useLocation, useNavigate } from "react-router-dom"
import axiosInstance from "../Hellers/axiosinstance";




function EditEvent() {

   const navigate =useNavigate()
   const {state}=useLocation()
const [inputData,setInputData]=useState({
   date:"",
   location:"", 
   })

function handleInput(e) {
      const {name,value}=e.target

      setInputData({
        ...inputData,
        [name]:value
      })
   }

 async function onFormSubmit(e) {
  e.preventDefault()
  

const formData={
   newdate:inputData.date,
   newlocation:inputData.location,
   eventId:state._id
}

  try {
     const response=await axiosInstance.put("/event/updateevent",formData)
     
     if (response?.data?.success) {
      setInputData({
         date:"",
         location:"",
        })
        navigate("/eventlist")
        try {
           const response=axiosInstance.post("/notify/updateevent",formData)
        } catch (error) {
           console.log(error?.response?.data?.message);
        }
     }
  } catch (error) {
    console.log(error?.response?.data?.message);
  }
 
}

  return (
       <div className="h-screen bg-black flex items-center justify-center">
       <form 
          className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[700px] my-10 shadow-[0_0_10px_yellow] relative "
          onSubmit={onFormSubmit}
       >
           <h1 className="text-center font-bold text-2xl">Edit Event</h1> 
           <main className="grid grid-cols-2 gap-x-10 ">
              
                 <div className="flex flex-col gap-1">
                      <label htmlFor="createdBy" className="text-lg font-semibold">
                         Date 
                      </label>
                      <input
                       type="datetime-local" 
                       className="bg-transparent px-2 py-1 border"
                       name="date"
                       id="date"
                       value={inputData.date}
                       onChange={handleInput}
                     />
                 </div>
                 <div className="flex flex-col gap-1">
                      <label htmlFor="description" className="text-lg font-semibold">
                         Event location 
                      </label>
                      <textarea
                       type="text" 
                       className="bg-transparent h-24 overflow-y-scroll resize-none px-2 py-1 border"
                       name="location"
                       id="location"
                       value={inputData.location}
                       onChange={handleInput}
                     />
                 </div>
                 
           </main>
           <button  className="w-full bg-yellow-600 border rounded-md hover:bg-yellow-500 font-bold text-white hover:text-black transition-all ease-out duration-300" onSubmit={onFormSubmit}>Edit Event </button>
       </form>
       </div>
  )
}

export default EditEvent