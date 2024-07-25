const studentModel = require("../model/studentModel");
const cloudinary = require("../helper/cloudinary");

exports.createStudent = async (req,res)=>{
    try {
        const createStudent = new studentModel(req.body);
        const file = req.files.profilePicture;
        const mimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];

        if (!mimeTypes.includes(file.mimetype)) {
            return res.status(400).json({
                message: 'Invalid file type. Only jpg, jpeg, and png files are allowed.'
            });
        }
        const cloudProfile = await cloudinary.uploader.upload(req.files.profilePicture.tempFilePath, { folder: "users_dp" }, (error, data) => {
            if (error) {
                return res.status(400).json({
                    message: error.message
                });
            } else {
                return res.status(200).json({
                    message: 'Upload successful',
                    data
                });
            }
        });

        createStudent.profilePicture.pictureUrl = cloudProfile.secure_url;
        createStudent.profilePicture.pictureId = cloudProfile.public_id;
        
        await createStudent.save();
        

        return res.status(200).json({
            message:`Student created successfully.`,
            data: createStudent
        })
        
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
        
    }
};


exports.deleteStudent = async (req,res)=>{
    try {
        const id = req.params.id;
        const deleteStudent = await studentModel.findByIdAndDelete(id);

        return res.status(200).json({
            message:`Student with ID:${id} has been deleted successfully.`
        })
        
    } catch (error) {
        return res.status(500).json({
            message:error.message
        })
        
        
    }
}