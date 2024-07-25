const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true
    },
    studentClass: {
        type: String,
        required: true
    },
    department: {
        type: String,
        enum: {
            values: ["Science", "Commercial", "Art"],
            message: "Department must be either Science, Art, or Commercial."
        },
        required: true
    },
    gender: {
        type: String,
        enum: {
            values: ["Male", "Female"],
            message: "Gender can only be either Male or Female."
        },
        required: true
    },

    profilePicture: {
        pictureId: { type: String },
        pictureUrl: { type: String},
    }
}, { timestamps: true });

studentSchema.set('toJSON', {
    transform: (doc, ret) => {
      delete ret.__v;
      return ret;
    }
  });

const studentModel = mongoose.model("student", studentSchema);

module.exports = studentModel;
