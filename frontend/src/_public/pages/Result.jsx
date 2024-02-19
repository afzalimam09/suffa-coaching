import React, { useEffect, useState } from "react";
import { apiRequest } from "../../requestMethods";

const Result = () => {
    const [examData, setExamData] = useState([]);
    const [resultData, setResultData] = useState(null);
    const [examId, setExamId] = useState("");
    const [regNo, setRegNo] = useState("");

    useEffect(() => {
        const getExamData = async () => {
            const { data } = await apiRequest.get("/exam");
            setExamData(data.data);
        };
        getExamData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!examId || !regNo) return console.log("Please enter details");
        try {
            const { data } = await apiRequest.get(
                `/result/single?examId=${examId}&regNo=${regNo}`
            );
            if (data.data?.length === 0) {
                alert("No data found!");
                return console.log("No data found for this exam!");
            }
            setResultData(data.data[0]);
        } catch (error) {
            console.log(error.response?.data?.message);
            alert(error.response?.data?.message);
        }
    };

    return (
        <div className="container mt-3">
            {!resultData ? (
                <form>
                    <h2>Get Your Result</h2>

                    <div className="mb-3">
                        <label className="form-label">Select Exam</label>
                        <select
                            onChange={(e) => setExamId(e.target.value)}
                            className="form-select"
                        >
                            <option>Select</option>
                            {examData.map((exam) => (
                                <option key={exam._id} value={exam._id}>
                                    {exam.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Reg No.</label>
                        <input
                            type="number"
                            className="form-control"
                            onChange={(e) => setRegNo(e.target.value)}
                        />
                    </div>

                    <button onClick={handleSubmit} className="btn btn-primary">
                        Submit
                    </button>
                </form>
            ) : (
                <div>
                    <h5>Result Available</h5>
                    <p>
                        <b>Name</b>: {resultData.studentId.fullName}
                    </p>
                    <p>
                        <b>Father's Name</b>: {resultData.studentId.fathersName}
                    </p>
                    <p>
                        <b>Total Obtained Marks: </b>: {resultData.totalMarks}
                    </p>
                    <p>
                        <b>Division: </b> {resultData.grade},{" "}
                        <b>Percentage: </b>
                        {resultData.percentage}%
                    </p>

                    <div className="my-3">
                        <h5>Subject Wise Result</h5>
                        <div className="table-responsive">
                            <table className="table table-striped table-sm">
                                <thead>
                                    <tr>
                                        <th>Subject</th>
                                        <th>Marks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {resultData.subjectMarks?.map(
                                        (subject, index) => (
                                            <tr key={index}>
                                                <td>{subject.key}</td>
                                                <td>{subject.value}</td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <button
                        onClick={() => setResultData(null)}
                        className="btn btn-primary"
                    >
                        Check Other Result
                    </button>
                </div>
            )}
        </div>
    );
};

export default Result;
