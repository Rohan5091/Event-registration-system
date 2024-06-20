import Event from "../models/event.module.js";
import User from "../models/user.model.js";
import sendMail from "../utills/sendMail.utills.js";

const SendMailtoRegisteteruser=async function (req, res, next) {
  try {
    const userId=req.user.id;
    const { eventId} = req.body;
    const event = await Event.findById(eventId);
    const user = await User.findById(userId);

    if (!event || !user) {
        return res.status(404).send('Event or User not found');
    }
    event.attendees.push(user._id);
    await event.save();

    const message = `Dear ${user.fullName},\n\nYou have successfully registered for the event: ${event.title}.\n\nEvent Details:\nTitle: ${event.title}\nDescription: ${event.description}\nDate: ${event.date}\nTime: ${event.time}\nLocation: ${event.location}\nDuration: ${event.duration} hours\n\nThank you for registering!`;

    await sendMail(user.email, 'Event Registration Confirmation', message);

    res.status(200).json({
        success: true,
        message: "Your request has been submitted successfully",
      });
} catch (error) {
    res.status(500).send('Server error');
}
}


const SendOTP=async function (req, res, next) {
  try {
   
    const {otp,email} = req.body;
    if (
      !otp || !email
    ) {
      res.status(500).send('otp or email not found');
    }
    const message = `\nYour One Time Password is\n\n\n ${otp} \n\n\n `;

    await sendMail(email, 'Verify OTP', message);

    res.status(200).json({
        success: true,
        message: "Your request has been submitted successfully",
      });
} catch (error) {
    res.status(500).send('Server error');
}
}

const updateEventDetail=async function (req, res, next) {
  try {
    const { eventId} = req.body;
    const event = await Event.findById(eventId);
    if (!event ) {
        return res.status(404).send('Event or User not found');
    }
   event.attendees.forEach( async (userId)=>{
     const user = await User.findById(userId);
     if (user) {
       const message = `Dear ${user.fullName},\n\nSorry for the inconvenience We are updated our event details due to some Reason our event : ${event.title}.\n\nNow it is conducted at \nDate: ${event.date}\nTime: ${event.time}\nLocation: ${event.location}\n\nThank you And ones again sorry from our side!`;
       
       await sendMail(user.email, 'Event Updation Details', message);
     }
   })

    res.status(200).json({
        success: true,
        message: "Event updation details are successfully send",
      });
} catch (error) {
    res.status(500).send('Server error');
}
}

export  {SendMailtoRegisteteruser,updateEventDetail,SendOTP}