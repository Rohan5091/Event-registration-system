import { Router } from "express";
import { authrizedRoll } from "../middlewares/userAuth.js";
import { createEvent, deleteEvent, getEvent, modifyEvent } from "../controllers/event.controllers.js";

const eventRouter=Router()

eventRouter.get("/geteventdetail",getEvent)
eventRouter.post("/createevent",createEvent)
eventRouter.put("/updateevent",authrizedRoll("ADMIN"),modifyEvent)
eventRouter.delete("/createevent",authrizedRoll("ADMIN"),deleteEvent)

export default eventRouter;