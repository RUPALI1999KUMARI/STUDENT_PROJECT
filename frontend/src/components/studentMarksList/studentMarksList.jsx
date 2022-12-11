import React, { useEffect, useState } from "react";
import "./studentMarksList.css";
import axios from "axios";
import { Popup } from "../popup/popup";

const StudentMarksList = (token) => {
  const [studentData, setStudentData] = useState([]);
  const [commonData, setCommonData] = useState([]);
  const [open, setOpen] = useState(false);
  const [editStudentDetails, setEditStudentDetails] = useState({});
  const [buttonName, setButtonName] = useState({});


  const getAllStudentData = async () => {
    try {
      const res = await axios.get("http://localhost:3001/student");
      setStudentData(res.data.data);
      setCommonData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    getAllStudentData();
  }, []);


  let deleteStudent = async (elem) => {
    try {
      console.log(token);
      const res = await axios.delete(
        `http://localhost:3001/student/${elem._id}`,
        { headers: { Authorization: `${token.token}` } }
      );
      if (res.data.status == true) {
        getAllStudentData();
      }
    } catch (err) {
      console.log(err);
    }
  };


  let filter = (event, key) => {
    let str = event.target.value.toLowerCase();
    let data = commonData;
    let filteredData = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].name.toLowerCase().includes(str) && key == "name") {
        filteredData.push(data[i]);
      } else if (
        data[i].subject.toLowerCase().includes(str) &&
        key == "subject"
      ) {
        filteredData.push(data[i]);
      }
    }
    setStudentData(filteredData);
  };

  
  return (
    <>
      <div className="dashboard">
        <div className="listbar">
          <h2> Student List</h2>
          <button
            className="viewButton"
            onClick={() => {
              setOpen(true);
              setEditStudentDetails({});
              setButtonName("Create");
            }}
          >
            <i className="zmdi zmdi-plus"></i> Add New Student
          </button>
          {open ? (
            <Popup
              closePopup={() => setOpen(false)}
              editStudentDetails={editStudentDetails}
              buttonName={buttonName}
              token={token}
              refreshlist={getAllStudentData}
            />
          ) : null}
        </div>
        <div className="table-cover">
          <table className="output-table">
            <thead>
              <tr>
                <th>
                  <div className="filterBox">
                    Name
                    <input
                      onChange={(event) => {
                        filter(event, "name");
                      }}
                    />
                  </div>
                </th>
                <th>
                  <div className="filterBox">
                    Subject
                    <input
                      onChange={(event) => {
                        filter(event, "subject");
                      }}
                    />
                  </div>
                </th>
                <th>Marks</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {studentData.map(
                (elem, i) =>
                  elem && (
                    <tr key={i}>
                      <td>{elem.name}</td>
                      <td>{elem.subject}</td>
                      <td>{elem.marks}</td>
                      <td>
                        <i
                          className="zmdi zmdi-delete zmdi-hc-lg icon"
                          onClick={() => deleteStudent(elem)}
                        >
                          &nbsp;&nbsp;&nbsp;{" "}
                        </i>
                        <i
                          className="zmdi zmdi-edit zmdi-hc-lg icon"
                          onClick={() => {
                            setOpen(true);
                            setEditStudentDetails(elem);
                            setButtonName("Update");
                          }}
                        >
                          &nbsp;&nbsp;&nbsp;{" "}
                        </i>
                        <i className="zmdi zmdi-eye zmdi-hc-lg icon">
                          &nbsp;&nbsp;&nbsp;{" "}
                        </i>
                      </td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};


export default StudentMarksList;