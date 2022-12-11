const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')
const studentMarksController = require('../controller/studentMarksController')
const authenticator = require('../authentication/auth')

router.post("/user", userController.registerUser)
router.post("/user/login", userController.userLogin)
router.get("/user", userController.getUser)
router.post("/student", studentMarksController.uploadStudentData)
router.get("/student", studentMarksController.getAllStudentData)
router.put("/student/:id", authenticator.authenticator, studentMarksController.editStudentData)
router.delete("/student/:id", authenticator.authenticator, studentMarksController.deleteStudentData)

module.exports = router;