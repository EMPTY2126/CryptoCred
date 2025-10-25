import Notification from "../db/models/notificationModel.js"
import { v4 as uuid } from "uuid";

const getNotifications = async (req, res) => {
    const { userId } = req.params;

    try {
        const notification = await Notification.findOne({ userId });
        if (!notification) res.json({ message: "No notifications found", ntype : "success" });
        else res.status(200).json(notification.notifi);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

const addNotification = async (req, res) => {
    const { userId } = req.params;
    const { ntype, message } = req.body;
    const id = uuid();
    try {
        let notification = await Notification.findOne({ userId });

        if (!notification) {
            notification = new Notification({
                userId,
                notifi: [{ ntype, message, id }]
            });

            await notification.save();
        } else {
            notification = await Notification.findOneAndUpdate(
                { userId },
                { $push: { notifi: { ntype, message, id } } },
                { new: true }
            );
        }

        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
const deleteNotification = async (req, res) => {
    const { userId } = req.params;
    const { id } = req.body;  

    try {
        const notification = await Notification.findOneAndUpdate(
            { userId },
            { $pull: { notifi: { id } } },
            { new: true }
        );

        if (!notification) {
            return res.status(404).json({ message: "No notifications found" });
        }

        res.status(200).json(notification);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

const clearAllNotifications = async (req, res) => {
    const { userId } = req.params;

    try {
        const notification = await Notification.findOneAndUpdate(
            { userId },
            { $set: { notifi: [] } },
            { new: true }
        );

        res.status(200).json({ message: "All notifications cleared", notification });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

export default {
    clearAllNotifications,
    getNotifications,
    deleteNotification,
    addNotification
}



