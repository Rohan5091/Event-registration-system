import { Router } from "express";
import { authrizedRoll } from "../middlewares/userAuth.js";
import { createEvent, deleteEvent, getAllEvent, getEvent, modifyEvent } from "../controllers/event.controllers.js";

const eventRouter=Router()

eventRouter.get("/geteventdetail",getEvent)
eventRouter.get("/getalleventdetail",getAllEvent)
eventRouter.post("/createevent",createEvent)
eventRouter.put("/updateevent",authrizedRoll("ADMIN"),modifyEvent)
eventRouter.delete("/removeevent",deleteEvent)

export default eventRouter;