const StudentTable = ({ studentData }) => {
    return (
        <div className="my-3">
            <div className="d-flex justify-content-between">
                {/* <h5>Total Number of Students : {studentData.length}</h5> */}
                {/* <h5>print/share/edit</h5> */}
            </div>
            {studentData.length > 0 && (
                <div className="table-responsive">
                    <table className="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th>SN</th>
                                <th>Reg No.</th>
                                <th>Name</th>
                                <th>Father's Name</th>
                                <th>Total Dues</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {studentData.map((item, index) => (
                                <tr key={item._id}>
                                    <td>{index + 1}</td>
                                    <td>{item.regNo}</td>
                                    <td>{item.fullName}</td>
                                    <td>{item.fathersName}</td>
                                    <td>{item.totalDues}</td>
                                    <td>Edit/Delete/View</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default StudentTable;
