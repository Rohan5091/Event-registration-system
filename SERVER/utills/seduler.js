import Event from "../models/event.module";
import cron from ('node-cron');
import sendMail from "./sendMail.utills";
import User from "../models/user.model";


// Schedule a cron job to run every minute (for testing purposes, change to hourly in production)
cron.schedule('* * * * *', async () => {
    try {
        const events = await Event.find({ date: { $gte: new Date() } });

        events.forEach(async (event) => {
            const eventDateTime = new Date(`${event.date.toISOString().split('T')[0]}T${event.time}:00Z`);
            const reminderTime = new Date(eventDateTime.getTime() - 60 * 60 * 1000); // 1 hour before the event

            if (new Date() >= reminderTime && new Date() < eventDateTime) {
                for (const attendeeId of event.attendees) {
                    const user = await User.findById(attendeeId);

                    if (user) {
                        const message = `Dear ${user.email},\n\nThis is a reminder for the event: ${event.title} which will start in 1 hour.\n\nEvent Details:\nTitle: ${event.title}\nDescription: ${event.description}\nDate: ${event.date}\nTime: ${event.time}\nLocation: ${event.location}\nDuration: ${event.duration} hours\n\nThank you!`;

                        await sendMail(user.email, 'Event Reminder', message);
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error sending reminder emails:', error);
    }
});
