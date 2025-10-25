import { Router } from "express";
import loanController from "../controllers/loanController.js"

export const router = Router();

router.post('/requestloan', loanController.loanRequest);
router.get('/getloans/:userId', loanController.getLoans);
router.get('/userhistory/:userId', loanController.getHistory);
router.get('/loanstatus/:loanId', loanController.loanStatus);
router.get('/loanhistory/:userId', loanController.getLoanHistory);
router.post('/updateloan', loanController.updateLoan);
router.get('/getloan/:loanId', loanController.getLoan);
router.delete('/deleteloan/:loanId/:userId', loanController.deleteLoan);
router.post('/userhistory', loanController.addHistory);
router.get('/userapproved/:userId', loanController.getApproved)
router.delete('/deleteloanonly/:loanId/:userId', loanController.deleteLoanNoNotification);
