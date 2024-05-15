
import React from 'react'
import { useLocation } from 'react-router-dom'

function EventDescription() {
  const {data} =useLocation()
  console.log(data);

  return (
    <div>EventDescription</div>
  )
}

export default EventDescription