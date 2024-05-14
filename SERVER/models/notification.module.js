import mongoose from 'mongoose';
import User from "../models/user.model.js"


const NotificationSchema = new mongoose.Schema({
    userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: User, 
    required: true },
    message: { 
    type: String, 
    required: true },
    read: { 
    type: Boolean, 
    default: false },
    createdAt: { 
    type: Date, 
    default: Date.now },
});

const Notification = mongoose.model('notification', NotificationSchema);
 export default Notification;