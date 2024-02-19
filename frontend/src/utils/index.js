export const calculatePercentageAndGrade = (inputMarks, selectedClass) => {
    const { subjects, fullMarks } = selectedClass;
    let totalMarks = 0;
    let grade = "";
    console.log(subjects, fullMarks);

    if (inputMarks.length < subjects?.length) {
        return { message: "Please enter all subject marks!", status: "fail" };
    }

    for (const subject of inputMarks) {
        if (!subject || !subject.value) {
            return {
                message: "Please enter all subject marks!",
                status: "fail",
            };
        }
        if (subject.value < 33) {
            grade = "Fail";
        }
        totalMarks += Number(subject.value);
    }
    const percentage = Number(((totalMarks * 100) / fullMarks).toFixed(2));
    if (!grade) {
        grade =
            percentage >= 60 ? "First" : percentage >= 45 ? "Second" : "Third";
    }

    return [
        { title: "Total Obtained Marks", value: totalMarks, type: "number" },
        { title: "Percentage", value: percentage, type: "number" },
        { title: "Grade", value: grade, type: "text" },
    ];
};

export const getDefaultCaluculatedResult = (total, percentage, grade) => {
    return [
        { title: "Total Obtained Marks", value: total, type: "number" },
        { title: "Percentage", value: percentage, type: "number" },
        { title: "Grade", value: grade, type: "text" },
    ];
};
