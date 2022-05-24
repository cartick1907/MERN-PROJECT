const asyncHandler = require('express-async-handler')
//@desc Get Goals
//@Route GET /api/goals
//@access private
const getGoals = asyncHandler(async(req,res)=>{
    res.status(200).json({mes:'get goals'})
}
)
//@desc Set Goals
//@Route POST /api/goals
//@access private
const setGoals = asyncHandler(async(req,res)=>{
    
    if(!req.body.text){
        res.status(400);
        throw new Error('please add text feild');
    }

    res.status(200).json({mes:'set goal'})
})
//@desc Update Goals
//@Route PUT /api/goals/id
//@access private
const updateGoals = asyncHandler(async(req,res)=>{
    res.status(200).json({mes:`updated goal ${req.params.id}`})
})
//@desc Delete Goals
//@Route Delete /api/goals/id
//@access private
const deleteGoals = asyncHandler(async(req,res)=>{
    res.status(200).json({mes:`deleted goal ${req.params.id}`})
})
module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals,
}