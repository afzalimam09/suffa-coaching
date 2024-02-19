import React, { useEffect, useState } from "react";
import { apiRequest } from "../../requestMethods";

const AdminHome = () => {
    const [noticeInput, setNoticeInput] = useState("");
    const [noticeData, setNoticeData] = useState([]);
    const handleNoticeSubmit = async (e) => {
        e.preventDefault();
        console.log(noticeInput);
        try {
            const { data } = await apiRequest.post("/notice", {
                content: noticeInput,
            });
            console.log(data);
            setNoticeData((prev) => [data.data, ...prev]);
            alert("Notice added!");
        } catch (error) {
            console.log(error);
            alert(error.response?.data?.message);
        }
    };
    useEffect(() => {
        const getNotice = async () => {
            try {
                const { data } = await apiRequest.get("/notice");
                setNoticeData(data.data);
            } catch (error) {
                console.log(error);
            }
        };
        getNotice();
    }, []);
    return (
        <div className="container mt-2">
            <h4 className="text-center mt-2">Add/Update a Notice</h4>
            <div className="d-flex gap-4">
                <textarea
                    onChange={(e) => setNoticeInput(e.target.value)}
                    className="form-control"
                    cols="30"
                    rows="1"
                ></textarea>
                <button
                    onClick={handleNoticeSubmit}
                    className="btn btn-primary"
                >
                    Go
                </button>
            </div>

            <div className="mt-4">
                <h5>Recent Notices</h5>
                {noticeData.length > 0 ? (
                    <div className="table-responsive">
                        <table className="table table-striped table-sm">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Content</th>
                                    {/* <th>Action</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {noticeData.map((item) => (
                                    <tr key={item._id}>
                                        <td>{item.createdAt?.split("T")[0]}</td>
                                        <td>{item.content}</td>
                                        {/* <td>Edit/Delete</td> */}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div>
                        <p>No notice found!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminHome;
