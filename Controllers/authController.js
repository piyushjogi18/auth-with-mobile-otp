import userModel from "../Models/userModel.js";
import twilio from 'twilio';
import Env from 'dotenv'
Env.config();
const accountSid = process.env.SID; 
const authToken = process.env.TOKEN; 
const client = new twilio(accountSid, authToken);

class AuthController {
    static myAccount = async (req,res) => {
        try{
            let mobile = req.body.mobile;
            if(mobile && (/^[6-9]\d{9}$/.test(mobile))){
                let send_this_otp = generateOTP();
                let user = await userModel.findOne({mobile:mobile});
                    if(user && user.account_created){
                        if(user.otp_used<20){
                            //send otp here
                            let msg_sent = await client.messages
                            .create({
                                body: send_this_otp,
                                to: '+919518072845', // Text this number
                                from: '+15617695860', // From a valid Twilio number
                            })
                            user.otp = send_this_otp;
                            user.timestamp = new Date();
                            user.otp_used = user.otp_used+1;
                            user.otp_attempts = 0;
                            await user.save();
                            res.status(200).json({
                                status : "success",
                                message : "OTP has been sent to your mobile number for login."
                            });
                        }else{
                            res.status(400).json({
                                status : "fail",
                                message : "You have used your otp limits."
                            });                                         
                        }
                    }else{
                        //send otp here
                        let msg_sent = await client.messages
                            .create({
                                body: send_this_otp,
                                to: '+919518072845', // Text this number
                                from: '+15617695860', // From a valid Twilio number
                            })
                        userModel.create({
                            mobile:mobile,
                            otp : send_this_otp,
                            otp_used : 1
                        });
                        res.status(200).json({
                            status : "success",
                            message : "OTP has been sent to your mobile number for account creation."
                        });
                    }
            }else{
                res.status(400).json({
                    status : "fail",
                    message : "Please enter valid mobile number"
                });
            }
        }catch(err){
            res.status(400).json({
                status : "fail",
                message : err
            });
        }

    }

    static verifyOtp =async (req,res)=>{
        try{
            let mobile = req.body.mobile;
            let otp = req.body.otp;
            if(mobile && otp && (/^[6-9]\d{9}$/.test(mobile))){
                let user = await userModel.findOne({mobile:mobile});
                    if(user && user.otp){
                        if(user.otp_attempts<5){
                            if(otp == user.otp && (new Date()-user.timestamp)/1000/60<3){
                                let msg;
                                user.otp_attempts=0;
                                if(user.account_created){
                                    msg = "OTP has been verfied.Login Successfully";
                                }else{
                                    user.account_created=1;
                                    msg = "OTP has been verfied.New account created successfully.";
                                }
                                user.otp = 100001;
                                await user.save();
                                res.status(200).json({
                                    status : "success",
                                    message : msg
                                });

                            }else{
                                user.otp_attempts = user.otp_attempts+1;
                                await user.save();
                                res.status(400).json({
                                    status : "fail",
                                    message : "Invalid OTP"
                                });
                            }
                           
                        }else{
                            res.status(400).json({
                                status : "fail",
                                message : "You have exceed the limit of incorrect attempts"
                            });                                         
                        }
                    }else{
                        res.status(400).json({
                            status : "fail",
                            message : "Please send otp for this number first using /my-account route"
                        });
                    }
            }else{
                res.status(400).json({
                    status : "fail",
                    message : "Please provide valid mobile number and OTP"
                });
            }
        }catch(err){
            res.status(400).json({
                status : "fail",
                message : err
            });
        }
    }
}

function generateOTP(){
    var digits = '123456789';

    var otpLength = 6;

    var otp = '';

    for(let i=1; i<=otpLength; i++)

    {

        var index = Math.floor(Math.random()*(digits.length));

        otp = otp + digits[index];

    }

    return otp;
}
export default AuthController;