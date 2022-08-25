const mongoose = require ("mongoose")

const UserSchema = new mongoose.Schema({
    isAdmin:{
        type:Boolean,
        default: false,
    },
    username:{
        type: String,
        required:true,
        unique:true
    },
    firstName:{
        type: String,
        required:true,
       
    },
    lastName:{
        type: String,
        required:true,
       
    },
    password:{
        type: String,
        required:true,
        select: true,
        min: 6 ,
    
    },
    email:{
        type: String,
        required:true,
        min: 6,
        unique: true
    
    },
    verificationToken:{
        type:String,
        default: null
    },
    profileImage:{
        type:String,
        default:"photoUploads\\1659816960302.png"
       
    },
    verified:{
        type:Boolean,
        default:false
    },
   
    date: {
        type: Date,
        default: Date.now
    }
},{timestamp:true})

module.exports =mongoose.model("User",UserSchema)
// module.exports= privateFields
