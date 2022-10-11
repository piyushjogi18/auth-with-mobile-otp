import mongoose from 'mongoose';
const dbConnection = async (db_url) => {

    try{       
        let connection = await  mongoose.connect('mongodb+srv://piyush_jogi1810:piyush_jogi1810@cluster0.nzs28.mongodb.net/?retryWrites=true&w=majority',{
                            dbName:'auth-with-otp', useNewUrlParser: true, useUnifiedTopology: true
                            })
                            .then((db)=>{console.log('db connected')})
                            .catch((e)=>{ console.log('error in connecting db',e); })
                                            
    } catch(err){ 
      console.log(err);
    }
}

export default dbConnection;