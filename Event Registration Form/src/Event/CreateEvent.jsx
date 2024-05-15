import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import axiosInstance from "../Hellers/axiosinstance";




function CreateEvent() {
   const navigate =useNavigate()
 

const [inputData,setInputData]=useState({
   title:"",
   description:"",
   date:"",
   location:"",
   duration:"",  
   })

function handleInput(e) {
      const {name,value}=e.target
      console.log(name,value);
      setInputData({
        ...inputData,
        [name]:value
      })
   }

 async function onFormSubmit(e) {
  e.preventDefault()
  
  if (!inputData.date || !inputData.duration || !inputData.description  ||  !inputData.title || !inputData.location )  {
     toast.error("Every field is required")
  }

// const formData=new FormData()

// formData.append("title",inputData.title)
// formData.append("description",inputData.description)
// formData.append("date",inputData.date)
// formData.append("location",inputData.location)
// formData.append("duration",inputData.duration)
const formData={
   title:title, 
   description:description,
   date:date,
   location:location,
   duration:duration
}
console.log(formData);
  try {
     const response=await axiosInstance.post("/event/createevent",formData)
     console.log(response);
     if (response?.data?.success) {
      setInputData({
         title:"",
         description:"",
         date:"",
         location:"",
         duration:"",
        })
        navigate("/eventlist")
     }
  } catch (error) {
    console.log(error);
    console.log(error?.response?.data?.message);
  }
 
}

  return (
       <div className="h-screen bg-black flex items-center justify-center">
       <form 
          className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[700px] my-10 shadow-[0_0_10px_yellow] relative "
          onSubmit={onFormSubmit}
       >
           <h1 className="text-center font-bold text-2xl">Create new Event</h1> 
           <main className="grid grid-cols-2 gap-x-10 ">
              <div className="space-y-6">
                 <div className="flex flex-col gap-1">
                      <label htmlFor="title" className="text-lg font-semibold">
                         Event Title 
                      </label>
                      <input
                       type="text" 
                       className="bg-transparent px-2 py-1 border"
                       required
                       name="title"
                       id="title"
                       value={inputData.title}
                       onChange={handleInput}
                     />
                 </div>
              </div>
              
              
                 <div className="flex flex-col gap-1">
                      <label htmlFor="category" className="text-lg font-semibold">
                         Event duration 
                      </label>
                      <input
                       type="text" 
                       className="bg-transparent px-2 py-1 border"
                       required
                       name="duration"
                       id="duration"
                       value={inputData.duration}
                       onChange={handleInput}
                     />
                 </div>
                 <div className="flex flex-col gap-1">
                      <label htmlFor="createdBy" className="text-lg font-semibold">
                         Date 
                      </label>
                      <input
                       type="datetime-local" 
                       className="bg-transparent px-2 py-1 border"
                       required
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
                       required
                       name="location"
                       id="location"
                       value={inputData.location}
                       onChange={handleInput}
                     />
                 </div>
                 <div className="flex flex-col gap-1">
                      <label htmlFor="description" className="text-lg font-semibold">
                         Event description 
                      </label>
                      <textarea
                       type="text" 
                       className="bg-transparent h-24 overflow-y-scroll resize-none px-2 py-1 border"
                       required
                       name="description"
                       id="description"
                       value={inputData.description}
                       onChange={handleInput}
                     />
                 </div>
           </main>
           <button  className="w-full bg-yellow-600 border rounded-md hover:bg-yellow-500 font-bold text-white hover:text-black transition-all ease-out duration-300" onSubmit={onFormSubmit}>Create Event </button>

       </form>
       </div>
  )
}

export default CreateEvent