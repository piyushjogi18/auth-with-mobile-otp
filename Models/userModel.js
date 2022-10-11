import mongoose from "mongoose";
let userSchema = mongoose.Schema({
    mobile : {
        type : String,
        required : [true, 'User phone number required'],
        validate: {
            validator: function(v) {
                return /^[6-9]\d{9}$/.test(v);
              },
              message: props => `${props.value} is not a valid phone number!`
        } 
    },
    otp : {
        type : Number,
        required : true,
        validate: {
            validator: function(v) {
                return /^\d{6}$/.test(v);
              },
              message: props => `${props.value} is not a valid OTP!`
        } 
    },
    otp_used : {
        type : Number,
        required : true,
        default : 0
    },
    otp_attempts : {
        type : Number,
        required : true,
        default : 0
    },
    timestamp: {
        type : Date,
        required : true,
        default : new Date()
    },
    account_created :{
        type : Boolean,
        required : true,
        default : 0
    }
});

let userModel = mongoose.model('users',userSchema);
export default userModel;