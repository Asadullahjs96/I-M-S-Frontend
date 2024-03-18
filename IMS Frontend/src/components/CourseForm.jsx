import React, { useRef, useState } from "react";
import axios from "axios";
import { Button, TextField, Typography } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import CourseList from "./CourseList";

const CourseForm = () => {
  const course  = useRef();
  const [timing, settiming] = useState("");
  const [fetch, setFetch] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/v1/course", {
        courseName: course?.current?.value,
        timing: timing,
      });
      setFetch(true);
    } catch (error) {
      console.error("Error adding course:", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Typography sx={{ fontSize: "30px" }}>Add Course</Typography>
      <TextField
        fullWidth
        name="courseName"
        label="Course Name"
        inputRef={course}
        required
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={["MWF", "TTS"]}
        sx={{ width: 300 }}
        onChange={(e, value) => {
          settiming(value);
        }}
        required
        renderInput={(params) => (
          <TextField {...params} label="Timing" required />
        )}
      />
      <Button type="submit" variant="contained" color="primary">
        Add Course
      </Button>
      <CourseList fetch={fetch} setFetch={setFetch} />
    </form>
  );
};

export default CourseForm;
