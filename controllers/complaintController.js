const Complaint = require("../models/Complaint");


// FILE COMPLAINT
const createComplaint = async (req,res) => {

    try{

        const {  title, category,description } = req.body;

        const complaint = await Complaint.create({
            title,
            student:req.user.id,
            category,
            description

        });

        res.status(201).json({
            success:true,
            complaint
        });

    }
    catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }
};

const getComplaintStats = async (req, res) => {

    try {

        const totalComplaints = await Complaint.countDocuments();

        const pendingComplaints = await Complaint.countDocuments({
            status: "Pending"
        });

        const resolvedComplaints = await Complaint.countDocuments({
            status: "Resolved"
        });

        const inProgressComplaints = await Complaint.countDocuments({
            status: "In Progress"
        });

        res.status(200).json({
            success: true,
            stats: {
                totalComplaints,
                pendingComplaints,
                resolvedComplaints,
                inProgressComplaints
            }
        });

    }
    catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
const getCategoryStats = async (req, res) => {

    try {

        const stats = await Complaint.aggregate([

            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            }

        ]);

        res.status(200).json({
            success: true,
            stats
        });

    }
    catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
const getMonthlyTrends = async (req, res) => {

    try {

        const trends = await Complaint.aggregate([

            {
                $group: {

                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" }
                    },

                    count: { $sum: 1 }

                }
            },

            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1
                }
            }

        ]);

        res.status(200).json({
            success: true,
            trends
        });

    }
    catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
const getComplaints = async (req, res) => {

    try {

        const filter = {};

        // filter by status
        if (req.query.status) {
            filter.status = req.query.status;
        }

        // filter by category
        if (req.query.category) {
            filter.category = req.query.category;
        }

        // search by title or description
        if (req.query.search) {

            filter.$or = [

                {
                    title: {
                        $regex: req.query.search,
                        $options: "i"
                    }
                },

                {
                    description: {
                        $regex: req.query.search,
                        $options: "i"
                    }
                }

            ];
        }

        // pagination
        const page = Number(req.query.page) || 1;

        const limit = Number(req.query.limit) || 5;

        const skip = (page - 1) * limit;

        const complaints = await Complaint.find(filter)
            .populate("student", "name email")
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        // total complaints count
        const total = await Complaint.countDocuments(filter);

        res.status(200).json({
            success: true,
            total,
            page,
            pages: Math.ceil(total / limit),
            complaints
        });

    }
    catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
const getMyComplaints = async (req, res) => {

    try {

        const complaints = await Complaint.find({
            student: req.user.id
        });

        res.status(200).json({
            success: true,
            complaints
        });

    }
    catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
const updateComplaintStatus = async (req,res) => {

    try{

        const complaint = await Complaint.findById(req.params.id);

        if(!complaint){

            return res.status(404).json({
                success:false,
                message:"Complaint not found"
            });

        }

        complaint.status = req.body.status;

        await complaint.save();

        res.status(200).json({
            success:true,
            complaint
        });

    }
    catch(error){

        res.status(500).json({
            success:false,
            message:error.message
        });

    }
};
module.exports = {
    createComplaint,
    getComplaints,
    getMyComplaints,
    getCategoryStats,
    updateComplaintStatus,
    getComplaintStats,
    getMonthlyTrends
};