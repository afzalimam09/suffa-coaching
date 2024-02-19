import { useState } from "react";
import {
    calculatePercentageAndGrade,
    getDefaultCaluculatedResult,
} from "../../utils";
import { apiRequest } from "../../requestMethods";

const UpdateResult = ({ fetchedResult, selectedClass }) => {
    const [subjectMarks, setSubjectMarks] = useState(
        fetchedResult?.subjectMarks
    );
    const [calculatedResult, setCalculatedResult] = useState(
        getDefaultCaluculatedResult(
            fetchedResult.totalMarks,
            fetchedResult.percentage,
            fetchedResult.grade
        )
    );
    const [isReCalculated, setIsReCalculated] = useState(false);
    const [isSomethingChanged, setIsSomethingChanged] = useState(false);
    const handleMarksChange = (e, index) => {
        const { name, value } = e.target;
        setSubjectMarks((prev) => {
            const newData = [...prev];
            newData[index] = { key: name, value: Number(value) };
            return newData;
        });
        setIsSomethingChanged(true);
        if (isReCalculated) setIsReCalculated(false);
    };

    const handleCalculateResult = (e) => {
        e.preventDefault();
        if (!isSomethingChanged) return console.log("nothing changed!");
        const data = calculatePercentageAndGrade(subjectMarks, selectedClass);
        if (data.status === "fail") {
            return console.log(data.message);
        }
        setCalculatedResult(data);
        setIsReCalculated(true);
    };

    const handleUpdateResult = async (e) => {
        e.preventDefault();
        if (!isSomethingChanged) {
            return console.log("Nothing changed!");
        } else if (!isReCalculated) {
            return console.log("Please calculate!");
        }
        const dataToUpdate = {
            subjectMarks,
            totalMarks: calculatedResult[0].value,
            percentage: calculatedResult[1].value,
            grade: calculatedResult[2].value,
        };
        try {
            const { data } = await apiRequest.patch(
                `/result/${fetchedResult._id}`,
                dataToUpdate
            );
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <div className="mt-3">
                <p className="text-success">
                    <b>Status:</b> Result Available
                </p>
                <p>
                    <b>Name:</b> {fetchedResult.studentId.fullName}
                </p>
                <p>
                    <b>Reg No: </b> {fetchedResult.studentId.regNo}
                </p>
                <p>
                    <b>Father's Name: </b> {fetchedResult.studentId.fathersName}
                </p>
                <p>
                    <b>Current Class: </b>{" "}
                    {fetchedResult.studentId?.class?.classNumber}
                </p>
                <p>
                    Note: Please check student details before update the result.
                </p>
            </div>
            <hr />
            <form>
                <h5>Subject wise marks</h5>
                <div className="d-flex gap-2 result-res">
                    {subjectMarks.map((subject, index) => (
                        <div key={index} className="mb-3">
                            <label className="form-label">{subject.key}</label>
                            <input
                                onChange={(e) => handleMarksChange(e, index)}
                                defaultValue={subject.value}
                                name={subject.key}
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
                            value={selectedClass?.fullMarks}
                            type="number"
                            className="form-control"
                        />
                    </div>
                    {calculatedResult.map((item, index) => (
                        <div key={index} className="mb-3">
                            <label className="form-label">{item.title}</label>
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
                <button onClick={handleUpdateResult} className="btn btn-danger">
                    Update Result
                </button>
            </form>
        </div>
    );
};

export default UpdateResult;
