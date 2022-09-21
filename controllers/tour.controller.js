const { query } = require("express")
const { getTourService, 
        createTourService, 
        updateTourByIdService,
        getTourByIdService,
        getTourByViewService,
        getTourByPriceService
        
        } = require("../models/Services/tour.service")

exports.getTours=async(req,res,next)=>{
    try {

        const queries={}
        
       let filters={...req.query}
      //sort,page,limit->exclude
        const excludeFields=['sort','page','limit']
       excludeFields.forEach(field=> delete filters[field])
       
      const filterString=JSON.stringify(filters)
      const filterstring= filterString.replace(/\b(gt | gte | lt | lte)\b/g,match=>
                   `$${match}`)
     
      filters=JSON.parse(filterstring)
     

      if(req.query.sort){
        //price, name -> 'name price'
        const sortBy=req.query.sort.split(',').join(' ')
         queries.sortBy=sortBy
    }

    if(req.query.field){
        const fields=req.query.field.split(',').join(' ')
        queries.fields=fields
    }

    if(req.query.page){
        const {page=1,limit=2}=req.query
        const skip=(page-1)*parseInt(limit)
        queries.skip=skip
        queries.limit=parseInt(limit)
    }
      const tour=await getTourService(queries,filters)
      
       res.status(200).json({
        status:'success',
        message:'Data inserted successfully',
        data:tour
    })

    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:'Data not found',
            error:error.message
        
    })
    }
}

exports.createTour=async(req,res)=>{
    //save or create
    try {
         const result= await createTourService(req.body)
         result.logger()
        
        res.status(200).json({
        status:'success',
        message:'Data found successfully',
        data:result
    })
        
    } 
    catch (error) {
        res.status(400).json({
            status:'fail',
            message:'Data not found ',
            error:error.message
        
    })
    
 }
}

exports.getTourById=async(req,res)=>{
    
    try {
        const {id}=req.params
         const result= await getTourByIdService(id)
         
        
        res.status(200).json({
        status:'success',
        message:'Data found successfully',
        data:result
    })
        
    } 
    catch (error) {
        res.status(400).json({
            status:'fail',
            message:'Data not found ',
            error:error.message
        
    })
    
 }
}

exports.updateTourById=async(req,res,next)=>{
  
    try {
        const {id}=req.params
         const result= await updateTourByIdService(id,req.body)
         
        
        res.status(200).json({
        status:'success',
        message:'Data updated successfully',
        data:result
    })
        
    } 
    catch (error) {
        res.status(400).json({
            status:'fail',
            message:'Data not update ',
            error:error.message
        
    })
    
 }
}


    
exports.getTourById=async(req,res,next)=>{
    //save or create
    try {
        const {id}=req.params
         const result= await getTourByIdService(id)
         
        
        res.status(200).json({
        status:'success',
        message:'Data found successfully',
        data:result
    })
        
    } 
    catch (error) {
        res.status(400).json({
            status:'fail',
            message:'Data not found ',
            error:error.message
        
    })
    
 }
}

exports.getTopViewedTour=async(req,res,next)=>{

    try {
        
         const result= await getTourByViewService()
         
        res.status(200).json({
        status:'success',
        message:'Data found successfully',
        data:result
    })
        
    } 
    catch (error) {
        res.status(400).json({
            status:'fail',
            message:'Data not found ',
            error:error.message
        
    })
    
 }
}

exports.getTopCheapestTour=async(req,res,next)=>{

    try {
        
         const result= await getTourByPriceService()
         
        res.status(200).json({
        status:'success',
        message:'Data found successfully',
        data:result
    })
        
    } 
    catch (error) {
        res.status(400).json({
            status:'fail',
            message:'Data not found ',
            error:error.message
        
    })
    
 }
}


