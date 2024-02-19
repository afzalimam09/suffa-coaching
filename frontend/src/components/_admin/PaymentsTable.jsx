import React, { useEffect, useState } from "react";
import { apiRequest } from "../../requestMethods";

const PaymentsTable = () => {
    const [payments, setPayments] = useState([]);
    useEffect(() => {
        const getPayments = async () => {
            try {
                const { data } = await apiRequest.get(
                    "/payment?populate=studentId"
                );
                setPayments(data.data);
            } catch (error) {
                console.log(error);
            }
        };
        getPayments();
    }, []);
    return (
        <div className="my-3">
            <h5>Recent Payments</h5>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>SN</th>
                            <th>Payment Date</th>
                            <th>Amount</th>
                            <th>Name</th>
                            <th>Father's Name</th>
                            <th>Remaining Dues</th>
                            <th>Advance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.paymentDate?.split("T")[0]}</td>
                                <td>{item.amountPaid}</td>
                                <td>{item.studentId.fullName}</td>
                                <td>{item.studentId.fathersName}</td>
                                <td>{item.dueAfterPayment}</td>
                                <td>{item.advanceAfterPayment}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentsTable;
