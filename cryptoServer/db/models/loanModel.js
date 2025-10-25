import mongoose from "mongoose";

const loanSchema = new mongoose.Schema({
    userName: {
        type: String
    },
    userId: {
        type: String,
        required: true
    },
    loanAmount: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    interestRate: {
        type: Number,
        required: true
    },
    walletAddress: {
        type: String,
        required: true
    },
    colaterlType: {
        type: String,
    },
    borrower: {
        type: String,
        default: ""
    },
    borrowedDate: {
        type: String,
    },
    approved: {
        type: Boolean,
        default: false
    },
    loanId : {
        type:String,
        required:true
    }
}, { timestamps: true });

const LoanModel = mongoose.model("Loan", loanSchema);

export default LoanModel;