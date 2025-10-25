import { Schema, model } from 'mongoose';

const balanceSchema = new Schema({
    id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    userEmail : {type: String, required: true},
    balance: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: Date.now },
    history: [
        {
          transactionId: { type: String },
          amount: { type: Number },             
          status: { type: Boolean },               
          date: { type: Date, default: Date.now }, 
          description: { type: String },
          invoice:{type:String}
        }
      ]
});

const BalanceModel = model('Balance', balanceSchema);

export default BalanceModel;
