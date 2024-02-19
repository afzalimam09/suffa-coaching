const ResultTable = ({ result, selectedClass }) => {
    return (
        <div className="my-3">
            <div className="d-flex justify-content-between">
                <h5>Result of Class : {selectedClass?.classNumber}</h5>
                <h5>print/share/edit</h5>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th>SN</th>
                            <th>Reg No.</th>
                            <th>Name</th>
                            {result[0].subjectMarks?.map((subject, index) => (
                                <th key={index}>{subject.key}</th>
                            ))}
                            <th>Total Marks</th>
                            <th>Percentage</th>
                            <th>Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.studentId.regNo}</td>
                                <td>{item.studentId.fullName}</td>
                                {item.subjectMarks?.map((subject, index) => (
                                    <td key={index}>{subject.value}</td>
                                ))}
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

export default ResultTable;
