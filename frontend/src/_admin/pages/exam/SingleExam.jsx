import { useEffect, useState } from "react";
import { apiRequest } from "../../../requestMethods";
import { useParams } from "react-router-dom";
import TopperTable from "../../../components/_admin/TopperTable";

const SingleExam = () => {
    const [examInfo, setExamInfo] = useState({});
    const [examStatics, setExamStatics] = useState({});
    const [classData, setClassData] = useState([]);
    const { examId } = useParams();
    const [selectedId, setSelectedId] = useState(null);
    const [toppers, setToppers] = useState([]);
    const [fetched, setFetched] = useState(false);

    const handleGetToppers = async (e) => {
        e.preventDefault();
        if (!selectedId) return console.log("Please select topper category");
        const classFilter =
            selectedId !== "school" ? `&classId=${selectedId}` : "";
        try {
            const { data } = await apiRequest.get(
                `/result?examId=${examId}&sort=-percentage&limit=3${classFilter}&populate=studentId`
            );
            setToppers(data.data);
            setFetched(true);
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message);
        }
    };

    const handleChange = (e) => {
        if (e.target.value === "NA") return;
        setSelectedId(e.target.value);
        setFetched(false);
    };

    useEffect(() => {
        const getExamData = async () => {
            try {
                const { data } = await apiRequest.get(`/exam/${examId}`);
                setExamInfo(data.data);
            } catch (error) {
                console.log(error);
                alert(error.response?.data?.message);
            }
        };
        getExamData();
    }, []);
    useEffect(() => {
        const getExamStatics = async () => {
            try {
                const { data } = await apiRequest.get(
                    `/exam/statics/${examId}`
                );
                setExamStatics(data.data);
            } catch (error) {
                console.log(error);
            }
        };
        getExamStatics();
    }, []);
    useEffect(() => {
        const getClassDate = async () => {
            try {
                const { data } = await apiRequest.get(`/class`);
                setClassData(data.data);
            } catch (error) {
                console.log(error);
            }
        };
        getClassDate();
    }, []);
    return (
        <div className="container">
            <div className="mt-3">
                <h5>{examInfo.title}</h5>
                <p>
                    <b>Exam Start Date: </b>
                    {examInfo.startDate?.split("T")[0]}
                </p>
                <p>
                    <b>Exam End Date: </b>
                    {examInfo.endDate?.split("T")[0]}
                </p>
                <p>
                    <b>Exam Type: </b>
                    {examInfo.examType}
                </p>
            </div>
            <hr />
            <div>
                <h5>Exam Statics!</h5>
                <p>
                    <b>Total Appeared Student: </b>
                    {examStatics.totalAppeared}
                </p>
                <p>
                    <b>Total Passed Students: </b>
                    {examStatics.totalPassed} (
                    {(
                        (examStatics.totalPassed / examStatics.totalAppeared) *
                        100
                    ).toFixed(2)}
                    %)
                </p>
                <p>
                    <b>Total Failed Student: </b>
                    {examStatics.totalFailed} (
                    {(
                        (examStatics.totalFailed / examStatics.totalAppeared) *
                        100
                    ).toFixed(2)}
                    %)
                </p>
                <p>
                    <b>Total Students Passed with First Division: </b>
                    {examStatics.firstGrade} (
                    {(
                        (examStatics.firstGrade / examStatics.totalAppeared) *
                        100
                    ).toFixed(2)}
                    %)
                </p>
                <p>
                    <b>Total Students Passed with Second Division: </b>
                    {examStatics.secondGrade} (
                    {(
                        (examStatics.secondGrade / examStatics.totalAppeared) *
                        100
                    ).toFixed(2)}
                    %)
                </p>
                <p>
                    <b>Total Students Passed with Third Division: </b>
                    {examStatics.thirdGrade} (
                    {(
                        (examStatics.thirdGrade / examStatics.totalAppeared) *
                        100
                    ).toFixed(2)}
                    %)
                </p>
            </div>
            <hr />
            <form className="mt-2 row gap-2">
                <div className="col-5">
                    <label className="form-label">Select Topper Category</label>
                    <select onChange={handleChange} className="form-select">
                        <option value={"NA"}>Select Topper Category</option>
                        <option value={"school"}>School Topper</option>
                        {classData.map((item) => (
                            <option key={item._id} value={item._id}>
                                Class {item.classNumber} Topper
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    onClick={handleGetToppers}
                    className="btn btn-primary"
                    style={{ width: "fit-content", marginTop: "auto" }}
                >
                    Go
                </button>
            </form>
            {fetched ? (
                <div className="mt-3">
                    {toppers.length > 0 ? (
                        <TopperTable
                            toppers={toppers}
                            selectedId={selectedId}
                        />
                    ) : (
                        <h5>No enough data</h5>
                    )}
                </div>
            ) : (
                ""
            )}
        </div>
    );
};

export default SingleExam;
