import Event from "../models/event.module.js";
import User from "../models/user.model.js";
import sendMail from "../utills/sendMail.utills.js";

const SendMailtoRegisteteruser=async function (req, res, next) {
  try {
    const { eventId, userId } = req.body;
    const event = await Event.findById(eventId);
    const user = await User.findById(userId);

    if (!event || !user) {
        return res.status(404).send('Event or User not found');
    }

    event.attendees.push(user._id);
    await event.save();

    const message = `Dear ${user.email},\n\nYou have successfully registered for the event: ${event.title}.\n\nEvent Details:\nTitle: ${event.title}\nDescription: ${event.description}\nDate: ${event.date}\nTime: ${event.time}\nLocation: ${event.location}\nDuration: ${event.duration} hours\n\nThank you for registering!`;

    await sendMail(user.email, 'Event Registration Confirmation', message);

    res.status(200).send('User registered for the event and email sent.');
} catch (error) {
    res.status(500).send('Server error');
}

}



export  {SendMailtoRegisteteruser}