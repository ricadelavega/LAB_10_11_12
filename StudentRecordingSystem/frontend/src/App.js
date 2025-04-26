import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";
import ptcLogo from "./assets/ptc-logo.png"; // Logo image
import "./App.css"; // Custom styles

const App = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const addStudent = async (formData) => {
    try {
      await axios.post("http://127.0.0.1:5000/api/students", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchStudents();
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/api/students/${id}`);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <div className="app-container">
      <div className="top-logo-banner text-center">
        <img src={ptcLogo} alt="PTC Logo" className="top-logo" />
        <h2 className="school-name">Pateros Technological College</h2>
      </div>

      <header className="app-header text-center">
        <h1>Student Recording System</h1>
      </header>

      <div className="main-content container">
        <StudentForm addStudent={addStudent} />
        <StudentList students={students} deleteStudent={deleteStudent} />
      </div>
    </div>
  );
};

export default App;