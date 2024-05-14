
import Event from "../models/event.module.js";
import ApiError from "../utills/error.utills.js";

const createEvent = async function (req, res, next) {
  const { title, description, date,location,duration} = req.body;

  if (!title, !description, !date, !location) {
    return next(new ApiError(409, "Every field is required"));
  }

  const event = await Event.create({
    title,
    description, 
    date,
    location,
    duration
  }); 

  if (!event) {
    return next(new ApiError(409, "event is not created"));
  }
  await event.save();
  return res.status(202).json({
    success: true,
    message: "Event is created sucessfully ",
    data: event,
  });
};

const getEvent = async function (req, res, next) {
  const { eventid } = req.body;
  if(!eventid){
    return next(new ApiError(409, "Event id required"));
  }
  const event = await Event.findById(eventid);

  return res.status(202).json({
    success: true,
    message: "this is event Details ",
    data:event
  });
};

const getAllEvent = async function (req, res, next) {
  const events = await Event.find({})

  return res.status(202).json({
    success: true,
    message: "this are events Details",
    data:events
  });
};


const modifyEvent = async function (req, res, next) {
  const { newtitle, newdescription, newdate, newlocation,newduration} = req.body;
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
  const { eventid } = req.body;
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
  getEvent,
  getAllEvent
}