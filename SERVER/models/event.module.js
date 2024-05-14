import  { Schema, model } from "mongoose";

const eventSchema=new Schema(
 {
    title:{
      type: String,
      required: ["true", "Title must be required"],
      trim: true,
    },
    description:{
      type:String,
      required :true,
      trim: true,
    },
    attendees: [{ 
      type: Schema.Types.ObjectId, 
      ref: 'User' 
     }],
    date:{
      type:Date,
      required :true,
      trim: true,
    },
    duration:{
      type:Number,
    },
     location:{
      type:String,
      required :true,
      trim: true,
    }
 },{
  timestamps:true,
 }
)
const Event = model("event", eventSchema);
export default Event;