

import Event from "../models/event.module";
import ApiError from "../utills/error.utills.js";

const createEvent = async function (req, res, next) {
  const { title, description, date,time,location,duration} = req.body;

  if (!title, !description, !date, !time, !location) {
    return next(new ApiError(409, "Every field is required"));
  }

  const event = await Event.create({
    title,
    description, 
    date,
    time,
    location,
    duration
  }); 

  if (!event) {
    return next(new ApiError(409, "event is not created"));
  }
  await user.save();
  return res.status(202).json({
    success: true,
    message: "Event is created sucessfully ",
    data: event,
  });
};

const getEvent = async function (req, res, next) {
  const { eventid } = req.params;
  if(!eventid){
    return next(new ApiError(409, "Event id required"));
  }
  const event = await Event.findById(eventid);

  return res.status(202).json({
    success: true,
    message: "Event is deleted sucessfully ",
    data:eventid
  });
};


const modifyEvent = async function (req, res, next) {
  const { newtitle, newdescription, newdate, newtime, newlocation,newduration} = req.body;
  const { eventid } = req.params;

  if(!eventid){
    return next(new ApiError(409, "Event id required"));
  }
  
  const event = await Event.findById(eventid);
  
  if(!event){
    return next(new ApiError(409, "Does not have any event please provide correct event id"));  
  }
  if (newtitle) {
     event.title=newtitle;
  }
  if (newdescription) {
     event.description=newdescription;
  }
  if (newdate) {
     event.date=newdate;
  }
  if (newtime) {
     event.time=newtime;
  }
  if (newlocation) {
     event.location=newlocation;
  }
  if (newduration) {
     event.duration=newduration;
  }
  
  await user.save();
  return res.status(202).json({
    success: true,
    message: "Event is created sucessfully ",
    data: event,
  });
};


const deleteEvent = async function (req, res, next) {
  const { eventid } = req.params;
  if(!eventid){
    return next(new ApiError(409, "Event id required"));
  }
 await Event.findByIdAndDelete(eventid)
  return res.status(202).json({
    success: true,
    message: "Event is deleted sucessfully ",
  });
};

export {
  deleteEvent,
  modifyEvent,
  createEvent,
  getEvent
}