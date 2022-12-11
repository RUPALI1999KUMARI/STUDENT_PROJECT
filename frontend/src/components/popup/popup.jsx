import React, { useEffect, useState } from "react";
import axios from "axios";
import "./popup.css";

export const Popup = ({
  editStudentDetails,
  closePopup,
  buttonName,
  token,
  refreshlist
}) => {
  const [values, setValues] = useState({
    name: "",
    subject: "",
    marks: "",
  });
  const [editStatus, setEditStatus] = useState(false);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const createStudent = async (data) => {
    try {
      let create = await axios.post(`http://localhost:3001/student`, data);
        refreshlist()
      console.log(create);
    } catch (err) {
      console.log(err);
    }
  };

  let updateStudent = async (data, id) => {
    try {
      let update = await axios.put(
        `http://localhost:3001/student/${id}`,
        data,
        {
          headers: {
            Authorization: `${token.token}`,
          },
        }
      );
    
        refreshlist()
      
      console.log(update);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (editStatus) {
      updateStudent(values, editStudentDetails._id);
    } else {
      createStudent(values);
    }
    closePopup(false);
  };

  useEffect(() => {
    if (
      editStudentDetails.name ||
      editStudentDetails.subject ||
      editStudentDetails.marks
    ) {
      setValues(editStudentDetails);
      setEditStatus(true);
    }
  }, []);

  return (
    <>
      <div className="popup-container">
        <div className="popup-body">
          <div className="buttonarea">
            <h3> {buttonName} Student</h3>
            <button className="closeButton" onClick={closePopup}>
              X
            </button>
          </div>
          <div className="form-div">
            <form className="from-wrapper">
              <div className="inputbox">
                <label>Name</label>
                <input
                  className="input"
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                />
              </div>

              <div className="inputbox">
                <label className="label">Subject</label>
                <input
                  className="input"
                  type="text"
                  name="subject"
                  value={values.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="inputbox">
                <label className="label">Marks</label>
                <input
                  className="input"
                  type="number"
                  name="marks"
                  value={values.marks}
                  onChange={handleChange}
                />
              </div>
              <div>
                <button className="submitStudent" onClick={handleFormSubmit}>
                  {buttonName}
                </button>
              </div>
              <br />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
