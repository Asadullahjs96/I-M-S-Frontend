import React from 'react'
import StudentForm from './components/StudentForm'
import CourseForm from "./components/CourseForm";
import StudentList from "./components/StudentList";
import CourseList from "./components/CourseList";
import { Container, Grid } from '@mui/material';

const App=() => {
  return (
    <>
    <div style={{display: 'flex',justifyContent:'center',flexWrap:'wrap',gap:'100px '}}>
      <StudentForm />
      <CourseForm />
    </div>
    </>
    
  );
};

export default App
