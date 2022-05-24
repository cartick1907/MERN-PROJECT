const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
//@desc Get Goals
//@Route GET /api/goals
//@access private
const getGoals = asyncHandler(async(req,res)=>{
    const goals = await Goal.find()
    res.status(200).json(goals)
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

    const goal = await Goal.create({
        text:req.body.text
    })

    res.status(200).json(goal)
})
//@desc Update Goals
//@Route PUT /api/goals/id
//@access private
const updateGoals = asyncHandler(async(req,res)=>{
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400);
        throw new Error('Please enter valid ID')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id,req.body,{new:true,})
    res.status(200).json(updatedGoal)
})
//@desc Delete Goals
//@Route Delete /api/goals/id
//@access private
const deleteGoals = asyncHandler(async(req,res)=>{
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400);
        throw new Error('Please enter valid ID')
    }
    await goal.remove()
    res.status(200).json({id:req.params.id})
})
module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals,
}