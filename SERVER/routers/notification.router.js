
import { Router } from "express";
import { authrizedRoll, isLoggedIn } from "../middlewares/userAuth.js";
import { SendMailtoRegisteteruser, SendOTP, updateEventDetail } from "../controllers/notification.cotroller.js";

const notificationRouter=Router()

notificationRouter.post("/registered_user",isLoggedIn,SendMailtoRegisteteruser)
notificationRouter.post("/sendotp",SendOTP)
notificationRouter.post("/updateevent",isLoggedIn,updateEventDetail)
notificationRouter.post("/sendmessage",isLoggedIn,authrizedRoll("ADMIN"),SendmessageToUser)


export default notificationRouter;