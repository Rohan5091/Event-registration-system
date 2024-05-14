import { Schema, model } from "mongoose";

const eventSchema=new Schema(
 {
    title:{
      type: String,
      required: ["true", "Title must be required"],
      minlength: [3, "minimum length of name is 4"],
      maxlength: [20, "maximum length is 50"],
      lowercase: true,
      trim: true,
    },
    describe:{
      type:String,
      required :true,
      trim: true,
    },
    date:{
      type:Date,
      required :true,
      trim: true,
    },
    time:{
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