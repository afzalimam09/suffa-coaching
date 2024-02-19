import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StudentTable from "../../../components/_admin/StudentTable";
import { apiRequest } from "../../../requestMethods";

const Student = () => {
    const [classData, setClassData] = useState([]);
    const [selectedClass, setSelectedClass] = useState("");
    const [studentData, setStudentData] = useState([]);
    const [totalStudent, setTotalStudent] = useState();

    const handleGetStudent = async (e) => {
        e.preventDefault();
        if (!selectedClass) return;
        try {
            const { data } = await apiRequest.get(
                `/student?class=${selectedClass}`
            );
            setStudentData(data.data);
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message);
        }
    };

    useEffect(() => {
        const getTotalStudents = async () => {
            try {
                const { data } = await apiRequest.get("/student");
                setTotalStudent(data.data?.length);
            } catch (error) {
                console.log(error);
            }
        };
        getTotalStudents();
    }, []);
    useEffect(() => {
        const getClassData = async () => {
            try {
                const { data } = await apiRequest.get("/class");
                setClassData(data.data);
            } catch (error) {
                console.log(error);
            }
        };
        getClassData();
    }, []);
    return (
        <div className="container mt-2">
            <div className="d-flex justify-content-between">
                <h4>Total Students: {totalStudent}</h4>
                <Link to="new">Add New Student</Link>
            </div>
            <h4 className="text-center mt-2">Class Wise Students</h4>
            <div className="d-flex gap-4">
                <select
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="form-select"
                    aria-label="Default select example"
                >
                    <option>Select Class</option>
                    {classData.map((item) => (
                        <option key={item._id} value={item._id}>
                            Class {item.classNumber}
                        </option>
                    ))}
                </select>

                <button onClick={handleGetStudent} className="btn btn-primary">
                    Go
                </button>
            </div>

            <div>
                <StudentTable studentData={studentData} />
            </div>
        </div>
    );
};

export default Student;
