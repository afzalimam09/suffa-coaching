const TopperTable = ({ toppers, selectedId }) => {
    return (
        <div className="my-3">
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Reg No.</th>
                            <th>Name</th>
                            <th>Father's Name</th>
                            <th>Total Marks</th>
                            <th>Percentage</th>
                            <th>Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {toppers.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.studentId.regNo}</td>
                                <td>{item.studentId.fullName}</td>
                                <td>{item.studentId.fathersName}</td>
                                <td>{item.totalMarks}</td>
                                <td>{item.percentage}</td>
                                <td>{item.grade}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TopperTable;
