import React, { useEffect, useState } from "react";
import ClassCard from "../../../components/_admin/ClassCard";
import { apiRequest } from "../../../requestMethods";

const Class = () => {
    const [classNumber, setClassNumber] = useState(0);
    const [subjects, setSubject] = useState([]);
    const [fullMarks, setFullMarks] = useState(500);
    const [classData, setClassData] = useState([]);

    useEffect(() => {
        const getClasses = async () => {
            try {
                const { data } = await apiRequest.get(
                    "/class/class-with-student-count"
                );
                setClassData(data.data);
            } catch (error) {
                console.log(error);
            }
        };
        getClasses();
    }, []);

    const handleSubjectChange = (subject) => {
        const sub = subject.split(",");
        setSubject(sub);
    };
    const handleAddClass = async (e) => {
        e.preventDefault();
        const inputs = { classNumber, subjects, fullMarks };
        try {
            const { data } = apiRequest.post("/class", inputs);
            console.log(data.status);
            alert("Class added!");
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message);
        }
    };

    return (
        <div className="container mt-4">
            <div className="">
                <h5>Add/Edit a New Class</h5>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Class Number</label>
                        <input
                            type="number"
                            className="form-control"
                            onChange={(e) => setClassNumber(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            All subjects, Separated by ','
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={(e) =>
                                handleSubjectChange(e.target.value)
                            }
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Full Marks</label>
                        <input
                            type="number"
                            className="form-control"
                            onChange={(e) => setFullMarks(e.target.value)}
                        />
                    </div>

                    <button
                        onClick={handleAddClass}
                        className="btn btn-primary mb-3"
                    >
                        Add Class
                    </button>
                </form>
            </div>
            <div>
                <h5>All Classes</h5>
                <div className="row gap-2 mx-auto">
                    {classData.map((item) => (
                        <ClassCard key={item._id} item={item} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Class;
