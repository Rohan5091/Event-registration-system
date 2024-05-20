import React from "react";
import { useNavigate } from "react-router-dom";

function EventCard({data}) {
  const navigate=useNavigate()
  return (
    <div className="max-w-sm p-6 bg-white border w-96  border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h1 href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {data.title}
        </h5>
      </h1>
      <p className="mb-3 line-clamp-3 font-normal text-gray-700 dark:text-gray-400">
         {data.description}
      </p>
      <p
        onClick={()=>{navigate(`/eventDescription/${data._id}`,{state:{...data}})}}
        className="inline-flex cursor-pointer items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700        rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Read more
      </p>
    </div>
  );
}

export default EventCard;
