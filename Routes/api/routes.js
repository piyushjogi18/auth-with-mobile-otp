import express from "express";
import AuthController from "../../Controllers/authController.js";

const apiRouter = express.Router();

//employee routes
apiRouter.post('/my-account',AuthController.myAccount);
apiRouter.post('/verify-otp',AuthController.verifyOtp);


export default apiRouter;