import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    notifi: [
        {
            id : String,
            ntype: String,
            message: String,
        }
    ]
})

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
