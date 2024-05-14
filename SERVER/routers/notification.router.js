
import { Router } from "express";
import { isLoggedIn } from "../middlewares/userAuth.js";
import { SendMailtoRegisteteruser } from "../controllers/notification.cotroller.js";

const notificationRouter=Router()


notificationRouter.post("/registered_user",isLoggedIn,SendMailtoRegisteteruser)


export default notificationRouter;