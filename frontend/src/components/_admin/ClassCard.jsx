import React from "react";

const ClassCard = ({ item }) => {
    return (
        <div class="card" style={{ minWidth: "13rem", maxWidth: "15rem" }}>
            <div class="card-body">
                <h5 class="card-title">Class {item.classNumber}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">
                    Total Students: {item.totalStudents}
                </h6>
                <p class="card-text">Full Marks: {item.fullMarks}</p>
                <p class="card-text">Subjects: {item.subjects?.join(", ")}</p>
                <a href="#" class="card-link">
                    Edit
                </a>
                <a href="#" class="card-link">
                    Delete
                </a>
            </div>
        </div>
    );
};

export default ClassCard;
