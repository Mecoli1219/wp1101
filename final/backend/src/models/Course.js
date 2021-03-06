import mongoose from "mongoose"

const Schema = mongoose.Schema
const courseSchema = new Schema({
    year: {
        type: Number,
        required: [true, "year field is required."]
    },
    semester: {
        type: String,
        required: [true, 'semester field is required.']
    },
    courseName: {
        type: String,
        required: [true, 'courseName field is required.']
    },
    instructors: {
        type: String,
        required: [true, 'instructor field is required.']
    },
    department: {
        type: String,
        default: "EE",
        required: [true, 'department field is required.']
    },
    courseType: {
        type: String,
        required: [true, 'courseType field is required.']
    },
    exams: [{
        type: mongoose.Types.ObjectId, 
        ref: "Exam"
    }],
    show: {
        type: Boolean,
        default: false
    },
})

const Course = mongoose.model('course', courseSchema)
export default Course
