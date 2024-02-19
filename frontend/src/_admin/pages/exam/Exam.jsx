import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../../../requestMethods";

const Exam = () => {
    const [inputs, setInputs] = useState({});
    const [examData, setExamData] = useState([]);

    useEffect(() => {
        const getExamData = async () => {
            const { data } = await apiRequest.get("/exam");
            setExamData(data.data);
        };
        getExamData();
    }, []);

    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleAddExam = async (e) => {
        e.preventDefault();
        try {
            const { data } = await apiRequest.post("/exam", inputs);
            setExamData((prev) => [data.data, ...prev]);
            alert("Exam added successfully!");
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message);
        }
    };

    return (
        <div className="container mt-3">
            <h5 className="text-center">Create a new Exam</h5>
            <form className="mt-2 row gap-2 form-res">
                <div className="col-4">
                    <label className="form-label">Exam Title</label>
                    <input
                        onChange={handleChange}
                        name="title"
                        type="text"
                        className="form-control"
                    />
                </div>
                <div className="col-2">
                    <label className="form-label">Start Date</label>
                    <input
                        onChange={handleChange}
                        name="startDate"
                        type="date"
                        className="form-control"
                    />
                </div>
                <div className="col-2">
                    <label className="form-label">End Date</label>
                    <input
                        onChange={handleChange}
                        name="endDate"
                        type="date"
                        className="form-control"
                    />
                </div>
                <div className="col-2">
                    <label className="form-label">Exam Type</label>
                    <select
                        onChange={handleChange}
                        name="examType"
                        className="form-select"
                    >
                        <option>Select</option>
                        <option value="Half Yearly">Half Yearly</option>
                        <option value="Annual">Annual</option>
                    </select>
                </div>
                <button
                    onClick={handleAddExam}
                    className="btn btn-primary"
                    style={{ width: "fit-content", marginTop: "auto" }}
                >
                    Submit
                </button>
            </form>

            <hr />

            <div className="mt-3">
                <h5 className="mb-2">Recent Exams</h5>
                <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>State Date</th>
                                <th>End Date</th>
                                <th>Exam Type</th>
                                <th>Result</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {examData.map((item) => (
                                <tr key={item._id}>
                                    <td>
                                        <Link to={item._id}>{item.title}</Link>
                                    </td>
                                    <td>{item.startDate?.split("T")[0]}</td>
                                    <td>{item.endDate?.split("T")[0]}</td>
                                    <td>{item.examType}</td>
                                    <td>View</td>
                                    <td>Edit/Delete</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Exam;
