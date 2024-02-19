import React, { useEffect, useState } from "react";
import { apiRequest } from "../../../requestMethods";
import AddPayment from "../../../components/_admin/AddPayment";
import PaymentsTable from "../../../components/_admin/PaymentsTable";

const Payment = () => {
    const [classData, setClassData] = useState([]);
    const [studentData, setStudentData] = useState([]);
    const [paymentData, setPaymentData] = useState([]);
    const [selected, setSelected] = useState({
        class: null,
        student: null,
        payment: null,
    });
    const handleChange = (e) => {
        setSelected((prev) => {
            return { ...prev, [e.target.name]: JSON.parse(e.target.value) };
        });
    };

    useEffect(() => {
        const getClasses = async () => {
            const { data } = await apiRequest.get("/class");
            setClassData(data.data);
        };
        getClasses();
    }, []);
    useEffect(() => {
        const getStudents = async () => {
            if (!selected.class) return;
            const { data } = await apiRequest.get(
                `/student?class=${selected.class._id}`
            );
            setStudentData(data.data);
        };
        getStudents();
    }, [selected.class]);
    useEffect(() => {
        const getPayments = async () => {
            if (!selected.class || !selected.student) return;
            const { data } = await apiRequest.get(
                `/payment?studentId=${selected.student._id}`
            );
            setPaymentData(data.data);
        };
        getPayments();
    }, [selected.class, selected.student]);
    useEffect(() => {
        setSelected((prev) => {
            return { ...prev, student: null, payment: null };
        });
    }, [selected.class]);
    useEffect(() => {
        setSelected((prev) => {
            return { ...prev, payment: null };
        });
    }, [selected.student]);

    return (
        <div className="container">
            <h4 className="text-center mt-2">Add Payment</h4>

            <form className="mt-3 row gap-2 form-res">
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
                <div className="col-4">
                    <label className="form-label">Select Payment</label>
                    <select
                        onChange={handleChange}
                        name="payment"
                        className="form-select"
                    >
                        <option value={JSON.stringify(null)}>
                            Select Payment
                        </option>
                        {selected.student && (
                            <option value={JSON.stringify({ type: "new" })}>
                                + New Payment
                            </option>
                        )}
                        {paymentData.map((item) => (
                            <option key={item._id} value={JSON.stringify(item)}>
                                {item.amountPaid} Paid-on{" "}
                                {item.paymentDate?.split("T")[0]}
                            </option>
                        ))}
                    </select>
                </div>
            </form>
            <hr />
            {/* payment form  */}
            {selected.payment && <AddPayment student={selected.student} />}
            <hr />
            <PaymentsTable />
        </div>
    );
};

export default Payment;
