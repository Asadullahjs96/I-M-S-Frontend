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

const CourseList = ({ fetch, setFetch }) => {
  const [courses, setCourses] = useState([]);
//   const URL = "http://localhost:3000";
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/course");
        setCourses(response.data.course);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
    setFetch(false);
  }, [fetch]); // Empty dependency array ensures useEffect runs only once]

  const deleteCourse = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/v1/course/${id}`);
      setFetch(true);
    } catch (error) {
      console.error("Error deleting courses:", error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Course Name</TableCell>
            <TableCell>Timing</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses?.length > 0 &&
            courses.map((course) => (
              <TableRow key={course._id}>
                <TableCell>{course.courseName}</TableCell>
                <TableCell>{course.timing}</TableCell>
                <TableCell>
                  <Button onClick={() => deleteCourse(course._id)}>
                    delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CourseList;
