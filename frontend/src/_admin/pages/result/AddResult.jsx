import React, { useEffect, useState } from "react";
import { apiRequest } from "../../../requestMethods";
import {
    calculatePercentageAndGrade,
    getDefaultCaluculatedResult,
} from "../../../utils";
import UpdateResult from "../../../components/_admin/UpdateResult";

const AddResult = () => {
    const [selected, setSelected] = useState({
        exam: null,
        class: null,
        student: null,
    });
    const [examData, setExamData] = useState([]);
    const [classData, setClassData] = useState([]);
    const [studentData, setStudentData] = useState([]);
    const [inputMarks, setInputMarks] = useState([]);
    const [calculatedResult, setCalculatedResult] = useState(
        getDefaultCaluculatedResult("", "", "")
    );
    const [fetchedResult, setFetchedResult] = useState(null);
    const [clicked, setClicked] = useState(false);

    const handleChange = (e) => {
        setSelected((prev) => {
            return { ...prev, [e.target.name]: JSON.parse(e.target.value) };
        });
    };

    const handleMarksChange = (e, index) => {
        const { name, value } = e.target;
        setInputMarks((prev) => {
            const newData = [...prev];
            newData[index] = { key: name, value: Number(value) };
            return newData;
        });
    };

    const handleCalculateResult = (e) => {
        e.preventDefault();
        const data = calculatePercentageAndGrade(inputMarks, selected.class);
        if (data.status === "fail") {
            return alert(data.message);
        }
        setCalculatedResult(data);
    };
    const handleGetResult = async (e) => {
        e.preventDefault();
        if (!selected.exam || !selected.class || !selected.student) return;
        try {
            const { data } = await apiRequest.get(
                `/result/in-detail?examId=${selected.exam._id}&classId=${selected.class._id}&studentId=${selected.student._id}`
            );
            setFetchedResult(data.data[0]);
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message);
        }
        setClicked(true);
    };

    const handleAddNewStudentResult = async (e) => {
        e.preventDefault();
        if (
            !selected.exam ||
            !selected.class ||
            !selected.student ||
            !calculatedResult
        )
            return;
        const dataToAdd = {
            examId: selected.exam._id,
            classId: selected.class._id,
            studentId: selected.student._id,
            subjectMarks: inputMarks,
            totalMarks: calculatedResult[0].value,
            percentage: calculatedResult[1].value,
            grade: calculatedResult[2].value,
        };
        try {
            const { data } = await apiRequest.post("/result", dataToAdd);
            console.log(data.data, data.status);
            alert("Result added!");
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message);
        }
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
    useEffect(() => {
        const getStudentData = async () => {
            if (!selected.class || !selected.exam) return;
            const { data } = await apiRequest.get(
                `/student?class=${selected.class._id}`
            );
            setStudentData(data.data);
        };
        getStudentData();
    }, [selected.exam, selected.class]);
    useEffect(() => {
        setClicked(false);
        setInputMarks([]);
        setCalculatedResult(getDefaultCaluculatedResult("", "", ""));
    }, [selected.exam, selected.class, selected.student]);

    return (
        <div className="container mt-2">
            <h4 className="text-center mt-2">Add/Update a new Results</h4>

            <form className="mt-3 row gap-2 form-res">
                <div className="col-4">
                    <label className="form-label">Select Exam</label>
                    <select
                        onChange={handleChange}
                        name="exam"
                        className="form-select"
                    >
                        <option value={JSON.stringify(null)}>
                            Select Exam
                        </option>
                        {examData.map((item) => (
                            <option key={item._id} value={JSON.stringify(item)}>
                                {item.title}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-3">
                    <label className="form-label">Select Class</label>
                    <select
                        onChange={handleChange}
                        name="class"
                        className="form-select"
                    >
                        <option value={JSON.stringify(null)}>
                            Select Class
                        </option>
                        {classData.map((item) => (
                            <option key={item._id} value={JSON.stringify(item)}>
                                Class {item.classNumber}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="col-4">
                    <label className="form-label">Select Student</label>
                    <select
                        onChange={handleChange}
                        name="student"
                        className="form-select"
                    >
                        <option value={JSON.stringify(null)}>
                            Select Student
                        </option>
                        {studentData.map((item) => (
                            <option key={item._id} value={JSON.stringify(item)}>
                                {item.regNo}-{item.fullName}
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
            <hr />

            {/* if result is not available  */}
            {clicked && !fetchedResult ? (
                <div>
                    <div className="mt-3">
                        <p className="text-danger">
                            <b>Status:</b> Result Not Available
                        </p>
                        <p>
                            <b>Name:</b> {selected.student?.fullName}
                        </p>
                        <p>
                            <b>Reg No: </b> {selected.student?.regNo}
                        </p>
                        <p>
                            <b>Father's Name: </b>{" "}
                            {selected.student?.fathersName}
                        </p>
                        <p>
                            Note: Please check student details before update the
                            result.
                        </p>
                    </div>
                    <hr />
                    <form>
                        <h5>Subject wise marks</h5>
                        <div className="d-flex gap-2 result-res">
                            {selected.class?.subjects?.map((subject, index) => (
                                <div key={index} className="mb-3">
                                    <label className="form-label">
                                        {subject}
                                    </label>
                                    <input
                                        onChange={(e) =>
                                            handleMarksChange(e, index)
                                        }
                                        name={subject}
                                        type="number"
                                        className="form-control"
                                    />
                                </div>
                            ))}
                        </div>

                        <hr />

                        <h5>Total/Percentage/Grade</h5>
                        <div className="d-flex gap-4 result-res">
                            <div className="mb-3">
                                <label className="form-label">Full Marks</label>
                                <input
                                    disabled
                                    value={selected.class?.fullMarks}
                                    type="text"
                                    className="form-control"
                                />
                            </div>
                            {calculatedResult.map((item, index) => (
                                <div key={index} className="mb-3">
                                    <label className="form-label">
                                        {item.title}
                                    </label>
                                    <input
                                        disabled
                                        value={item.value}
                                        type={item.type}
                                        className="form-control"
                                    />
                                </div>
                            ))}

                            <button
                                onClick={handleCalculateResult}
                                className="btn btn-primary mb-3"
                                style={{
                                    width: "fit-content",
                                    marginTop: "auto",
                                }}
                            >
                                Calculate
                            </button>
                        </div>
                        <button
                            onClick={handleAddNewStudentResult}
                            className="btn btn-danger"
                        >
                            Add Result
                        </button>
                    </form>
                </div>
            ) : (
                ""
            )}

            {/* if result is available  */}
            {clicked && fetchedResult ? (
                <UpdateResult
                    fetchedResult={fetchedResult}
                    selectedClass={selected.class}
                />
            ) : (
                ""
            )}
        </div>
    );
};

export default AddResult;
