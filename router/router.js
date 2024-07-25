const router = require("express").Router();

const {createStudent, deleteStudent} = require("../controller/studentController");

router.post("/createstudent",createStudent);
router.delete("/deletestudent/:id",deleteStudent)

module.exports = router;