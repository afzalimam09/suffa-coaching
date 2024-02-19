import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../../../requestMethods";
import ResultTable from "../../../components/_admin/ResultTable";

const AdminResult = () => {
    const [inputs, setInputs] = useState({
        exam: {},
        class: {},
    });
    const [examData, setExamData] = useState([]);
    const [classData, setClassData] = useState([]);
    const [fetchedResult, setFetchedResult] = useState([]);

    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: JSON.parse(e.target.value) };
        });
    };

    useEffect(() => {
        const getExamData = async () => {
            const { data } = await apiRequest.get("/exam");
            setExamData(data.data);
        };
        getExamData();
    }, []);
    useEffect(() => {
        const getClassData = async () => {
            const { data } = await apiRequest.get("/class");
            setClassData(data.data);
        };
        getClassData();
    }, []);

    const handleGetResult = async (e) => {
        e.preventDefault();
        if (!inputs.exam._id || !inputs.class._id)
            return console.log("Please select exam and class");

        try {
            const { data } = await apiRequest.get(
                `/result?examId=${inputs.exam._id}&classId=${inputs.class._id}&populate=studentId&sort=-percentage`
            );
            setFetchedResult(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container mt-2">
            <div className="d-flex justify-content-between">
                <h4 className="text-center mt-2">Class Wise Results</h4>
                <Link to="new">Add New Result</Link>
            </div>
            <form className="mt-2 row gap-2">
                <div className="col-6">
                    <label className="form-label">Select Exam</label>
                    <select
                        onChange={handleChange}
                        name="exam"
                        className="form-select"
                    >
                        <option>Select Exam</option>
                        {examData.map((item) => (
                            <option key={item._id} value={JSON.stringify(item)}>
                                {item.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-5">
                    <label className="form-label">Select Class</label>
                    <select
                        onChange={handleChange}
                        name="class"
                        className="form-select"
                    >
                        <option>Select Class</option>
                        {classData.map((item) => (
                            <option key={item._id} value={JSON.stringify(item)}>
                                Class {item.classNumber}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    onClick={handleGetResult}
                    className="btn btn-primary"
                    style={{ width: "fit-content", marginTop: "auto" }}
                >
                    Go
                </button>
            </form>

            <div>
                {fetchedResult.length !== 0 && (
                    <ResultTable
                        result={fetchedResult}
                        selectedClass={inputs.class}
                    />
                )}
            </div>
        </div>
    );
};

export default AdminResult;
