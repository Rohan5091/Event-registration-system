import { Router } from "express";
import { authrizedRoll } from "../middlewares/userAuth";
import { createEvent, deleteEvent, getEvent, modifyEvent } from "../controllers/event.controllers";

const eventRouter=Router()

eventRouter.get("/geteventdetail",getEvent)
eventRouter.post("/createevent",authrizedRoll("ADMIN"),createEvent)
eventRouter.put("/updateevent",authrizedRoll("ADMIN"),modifyEvent)
eventRouter.delete("/createevent",authrizedRoll("ADMIN"),deleteEvent)