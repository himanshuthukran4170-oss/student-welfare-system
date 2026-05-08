const Student=require("../models/Student");
const createStudent=async(req,res)=>{
    try {
        const student=await Student.create(req.body);
        res.status(201).json({
            success:true,
            student
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};
const getAllStudents=async(req,res)=>{
    try {
        const students=await Student.find();
        res.status(200).json({
            success:true,
            students
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

const deleteStudent=async(req,res)=>{
    try {
        const student=await Student.findByIdAndDelete(req.params.id);

        if(!student){
            return res.status(404).json({
                success:false,
                message:"Student not found"
            });
        }
        res.status(200).json({
            success:true,
            message:"Student deleted successfully"
        });
    } catch (error) {
        req.status(500).json({
            success:false,
            message:error.message
        });
    }
};

const updateStudent = async (req,res) => {
    try{

        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true,
                runValidators:true
            }
        );

        if(!student){
            return res.status(404).json({
                success:false,
                message:"Student not found"
            });
        }

        res.status(200).json({
            success:true,
            student
        });

    }
    catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};
module.exports={createStudent,getAllStudents,updateStudent,deleteStudent};