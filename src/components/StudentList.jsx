import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
} from "@mui/material";

const StudentList = ({ fetch, setFetch }) => {
  const [students, setStudents] = useState([]);
//   const URL = "http://localhost:3000";

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/students");
        setStudents(response.data.student);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
    setFetch(false);
  }, [fetch, setFetch]);

  const deleteStudent = async (id, index) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/students/${id}`);
      setFetch(true); // Set fetch to true to trigger re-fetching of students
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students?.length > 0 &&
            students.map((student, index) => (
              <TableRow key={student._id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.age}</TableCell>
                <TableCell>
                  <Button onClick={() => deleteStudent(student._id, index)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentList;
