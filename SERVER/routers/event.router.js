import { Router } from "express";
import { authrizedRoll, isLoggedIn } from "../middlewares/userAuth.js";
import { createEvent, deleteEvent, getAllEvent, getEvent, modifyEvent } from "../controllers/event.controllers.js";

const eventRouter=Router()

eventRouter.post("/geteventdetail",isLoggedIn,authrizedRoll('ADMIN',"USER"),getEvent)
eventRouter.get("/getalleventdetail",isLoggedIn,authrizedRoll('ADMIN',"USER"),getAllEvent)
eventRouter.post("/createevent",isLoggedIn,authrizedRoll('ADMIN'),createEvent)
eventRouter.put("/updateevent",isLoggedIn,authrizedRoll("ADMIN"),modifyEvent)
eventRouter.post("/removeevent",isLoggedIn,authrizedRoll('ADMIN'),deleteEvent)

export default eventRouter;