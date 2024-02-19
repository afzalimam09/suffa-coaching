import React, { useEffect, useState } from "react";
import { apiRequest } from "../../../requestMethods";

const NewStudent = () => {
    const [classData, setClassData] = useState([]);
    const [inputData, setInputData] = useState({});

    const handleChange = (e) => {
        setInputData((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        console.log(inputData);
        try {
            const { data } = await apiRequest.post("/student", inputData);
            console.log(data.status);
            alert("Student added!");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const getClass = async () => {
            try {
                const { data } = await apiRequest.get("/class");
                setClassData(data.data);
            } catch (error) {
                console.log(error);
            }
        };
        getClass();
    }, []);
    return (
        <div className="container">
            <div className="mt-3 mx-auto" style={{ maxWidth: "25rem" }}>
                <h4>Add a new Student</h4>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Full Name</label>
                        <input
                            onChange={handleChange}
                            name="fullName"
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Father's Name</label>
                        <input
                            onChange={handleChange}
                            name="fathersName"
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Mobile Number</label>
                        <input
                            onChange={handleChange}
                            name="mobile"
                            type="number"
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Total Dues</label>
                        <input
                            onChange={handleChange}
                            name="totalDues"
                            type="number"
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">AdvanceAmount</label>
                        <input
                            onChange={handleChange}
                            name="advanceAmount"
                            type="number"
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Select Class</label>
                        <select
                            className="form-select"
                            name="class"
                            onChange={handleChange}
                        >
                            <option>Select Class</option>
                            {classData.map((item) => (
                                <option key={item._id} value={item._id}>
                                    Class {item.classNumber}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button onClick={handleAddUser} className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewStudent;
