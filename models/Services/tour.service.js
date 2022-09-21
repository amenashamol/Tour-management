const { promises } = require('stream')
const Tour=require('../tour.model')


exports.getTourService=async(filters,queries)=>{
    const tours=await Tour
          .find(filters)
          .sort(queries.sortBy)
          .skip(queries.skip)
          .limit(queries.limit)
          .select(queries.fields)
          const total=await Tour.countDocuments(filters)
          const page=Math.ceil(total/queries.limit)
    return {total,page,tours}
    
}

exports.createTourService=async(data)=>{
    const tour=await Tour.create(data)
    return tour
}
exports.getTourByIdService=async(tourId)=>{
    const tours=await Tour.findOneAndUpdate({_id:tourId},{$inc:{view:1}},{new:true})
    return tours
}
exports.updateTourByIdService=async(tourId,data)=>{
    const result= await Tour.updateOne({_id:tourId},{$set:data},{
        runValidators:true
        })

    
    return result
}



exports.getTourByViewService=async()=>{
    const tours=[]
     tours.push(Tour.find().sort({view:-1}).limit(3))
     const result= await Promise.all(tours)
    return result
}

exports.getTourByPriceService=async()=>{
    const tours=[]
     tours.push(Tour.find().sort({price:1}).limit(3))
     const result= await Promise.all(tours)
    return result
}