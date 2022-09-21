const mongoose=require("mongoose")

// schema design 
const tourSchema=mongoose.Schema({
    name:{
        type: String,
        required:[true, "please provide a name for this tour."],
        trim:true,
        unique:[true,"name must be unique"],
        minLength:[3, "Name must be  at least 3 charecter"],
        maxLength:[100, "name is too larger"]
    },
    
    description:{
        type:String,
        required:true
    },
    image: {
        type: String,
      },
    price:{
        type:Number,
        required:true,
        min:[0,"price can't be negative"]
    },
    view:{
        type:Number,
        required:true
    },  
    

    status:{
        type:String,
        required:true,
        enum:{
            values:['available', 'not-available'],
            message:"status can't be {VALUE}"
        }
    },
    
  }, {
    timestamps:true,
  })

  tourSchema.methods.logger=function(){
    console.log(`data save for ${this.name}`)
}

  //SCHEMA -> MODEL -> QUERY

  const Tour=mongoose.model('Tour', tourSchema)

  module.exports=Tour