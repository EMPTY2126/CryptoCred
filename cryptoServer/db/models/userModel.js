import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
    },
    userImage: String,

    balance: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Balance'
    },

    userPhone: {
        type: String
    },
    userEmail: {
        type: String,
        required: true
    },

    hash: String,
    salt: String,

    loanAmount: {
        type: Number,
        default: 0
    },

    approvedList :[
        {
            loanId: String,
            loanAmount: Number,
            dueDate:String,
            duration : Number,
            address : String
        }
    ],

    loanHistory: [
        {
            loanId: String,
            loanAmount: Number,
            dueDate:String,
            duration : Number,
            loanApproved: {
                type: Boolean,
                default: false
            },
        }
    ],

    history: [
        {
            invoice: String,
            name: { type: String, default: "" },
            date: String,
            desc: String,
            amount: String,
            via: String,
            category: String
        }
    ]

}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;