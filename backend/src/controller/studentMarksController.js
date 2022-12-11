const studentMarksModel = require("../model/studentMarksModel");

const uploadStudentData = async (req, res) => {
  try {
    let { name, subject, marks } = req.body;
    let findExisting = await studentMarksModel.findOne({ name, subject })
    if (findExisting) {
      const details = await studentMarksModel.findOneAndUpdate({ _id: findExisting._id }, { marks: findExisting.marks + Number(marks) },{new:true});
      return res.status(200).send({ status: true, data: details });
    }
    const uploadData = await studentMarksModel.create(req.body);
    return res.status(201).send({ status: true, data: uploadData });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const getAllStudentData = async (req, res) => {
  try {
    const details = await studentMarksModel.find({});
    return res.status(200).send({ status: true, msg: "successful", data: details.reverse() });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const editStudentData = async (req, res) => {
  try {
    let userId = req.params.id
    let { name, subject, marks } = req.body
    const details = await studentMarksModel.findOneAndUpdate({ _id: userId }, { name, subject, marks },{new:true});
    if(details){
      return res.status(200).send({ status: true, msg: "successful", data: details });
    } 
    return res.status(400).send({ status: false, msg: "user not exist" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteStudentData = async (req, res) => {
  try {
    let userId = req.params.id
    const details = await studentMarksModel.findOneAndDelete({ _id: userId });
    if(details){
      return res.status(200).send({ status: true, msg: "successful", data: details });
    } 
    return res.status(400).send({ status: false, msg: "user not exist" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { uploadStudentData, getAllStudentData, editStudentData, deleteStudentData };