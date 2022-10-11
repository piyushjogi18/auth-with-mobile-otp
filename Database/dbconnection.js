import mongoose from 'mongoose';
const dbConnection = async (db_url) => {

    try{       
        let connection = await  mongoose.connect(db_url,{
                            dbName:'auth-with-otp', useNewUrlParser: true, useUnifiedTopology: true
                            })
                            .then((db)=>{console.log('db connected')})
                            .catch((e)=>{ console.log('error in connecting db',e); })
                                            
    } catch(err){ 
      console.log(err);
    }
}

export default dbConnection;