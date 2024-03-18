import axios from 'axios';
import React, { useState } from 'react';
import StudentList from './StudentList';
import { Button, TextField, Typography } from "@mui/material";

const StudentForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        age: "",
    });
    const [fetch, setFetch] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/api/v1/students", formData);
            setFetch(true);
        } catch (error) {
            console.log(error); // Change from 'err' to 'error'
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: "20px",
        }}>
            <Typography sx={{ fontSize: "30px" }}>Add Student</Typography>
            <TextField
                name="name"
                label="Name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
            />
            <TextField
                fullWidth
                name="email"
                label="Email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <TextField
                fullWidth
                name="age"
                label="Age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                required
            />
            <Button type="submit" variant="contained" color="primary">
                Add Student
            </Button>
            <StudentList fetch={fetch} setFetch={setFetch} /> {/* Fix prop name 'setfetch' to 'setFetch' */}
        </form>
    )
}

export default StudentForm;
