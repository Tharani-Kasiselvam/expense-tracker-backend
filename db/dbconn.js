const mongoose = require('mongoose')

const dbconn = async () => {
    try{
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB Connected successfully")
    }
    catch(error){
        console.log("DB connectivity Error")
    }
}
module.exports = dbconn