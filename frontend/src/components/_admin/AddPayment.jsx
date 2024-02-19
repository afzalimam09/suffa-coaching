import { useState } from "react";
import { apiRequest } from "../../requestMethods";

const AddPayment = ({ student }) => {
    const [inputs, setInputs] = useState({
        studentId: student._id,
        dueBeforePayment: student.totalDues,
        amountPaid: 0,
        paymentDate: null,
        dueAfterPayment: student.totalDues,
        advanceAfterPayment: student.advanceAmount | 0,
    });
    const [clicked, setClicked] = useState(false);

    const handleAddPayment = async (e) => {
        e.preventDefault();
        console.log(inputs);
        if (!inputs.amountPaid || !inputs.paymentDate)
            return console.log("Enter all required value");
        if (!clicked) return console.log("Please click to caluculate dues");
        try {
            const { data } = await apiRequest.post("/payment", inputs);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };
    const handleChange = (e) => {
        setInputs((prev) => {
            return {
                ...prev,
                [e.target.name]: e.target.value,
            };
        });
        if (e.target.name === "amountPaid" && clicked) setClicked(false);
    };
    const handleRemainingDues = (e) => {
        e.preventDefault();
        const totalAmount =
            Number(inputs.amountPaid) + Number(student.advanceAmount | 0);
        let dueAfterPayment;
        let advanceAfterPayment;
        if (totalAmount > student.totalDues) {
            advanceAfterPayment = totalAmount - student.totalDues;
            dueAfterPayment = 0;
        } else {
            advanceAfterPayment = 0;
            dueAfterPayment = student.totalDues - totalAmount;
        }
        setInputs((prev) => {
            return { ...prev, dueAfterPayment, advanceAfterPayment };
        });
        setClicked(true);
    };
    return (
        <form>
            <h3>Add New Payment</h3>
            <div>
                <p>
                    <b>Reg No: </b>
                    {student.regNo}
                </p>
                <p>
                    <b>Name: </b>
                    {student.fullName}
                </p>
                <p>
                    <b>Father's Name: </b>
                    {student.fathersName}
                </p>
            </div>
            <hr />
            <div className="d-flex gap-4 form-res">
                <div className="mb-2">
                    <label className="form-label">Total Dues</label>
                    <input
                        disabled
                        value={student.totalDues}
                        type="number"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Amount Paid</label>
                    <input
                        onChange={handleChange}
                        name="amountPaid"
                        type="number"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Payment Date</label>
                    <input
                        onChange={handleChange}
                        type="date"
                        name="paymentDate"
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label onClick={handleRemainingDues} className="form-label">
                        Remaining Dues (Click)
                    </label>
                    <input
                        disabled
                        value={inputs.dueAfterPayment}
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Advance Amount</label>
                    <input
                        disabled
                        value={inputs.advanceAfterPayment}
                        className="form-control"
                    />
                </div>
            </div>
            <button onClick={handleAddPayment} className="btn btn-success">
                Submit
            </button>
        </form>
    );
};

export default AddPayment;
