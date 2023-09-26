import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './successfulGroup.css';
import ChoseSubjectMenu from '../../components/choseSubject/ChoseSubjectMenu';

function SuccessfulGroup() {
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(localStorage.getItem('selectedSubject') || "");
    const [studentsData, setStudentsData] = useState([]);

    useEffect(() => {
        const fetchSubjects = async () => {
            const subjectsFromCookies = JSON.parse(Cookies.get('subjectNames') || "[]");
            setSubjects(subjectsFromCookies);
            if (!selectedSubject && subjectsFromCookies.length > 0) {
                setSelectedSubject(subjectsFromCookies[0]);
                localStorage.setItem('selectedSubject', subjectsFromCookies[0]);
            }
        };
        
        fetchSubjects();
    }, [selectedSubject]);

    useEffect(() => {
        const fetchStudentsData = async () => {
            const jwtToken = localStorage.getItem('jwtToken');
            const response = await fetch(`http://localhost:8080/api/group/${selectedSubject}/grade/all`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache',
                    'Authorization': 'Bearer ' + jwtToken
                }
            });
            const data = await response.json();
            setStudentsData(data);
        };

        if (selectedSubject) {
            fetchStudentsData();
        }
    }, [selectedSubject]);

    const abbreviateTaskName = (name) => {
        if (name.includes("Практичне Завдання")) return "ПЗ";
        if (name.includes("Лабораторна робота")) return "ЛБ";
        return name;
    }

    const taskNames = [...new Set(studentsData.flatMap(student => student.grades.map(grade => grade.taskName)))];
    const conclusionClass = taskNames.length % 2 === 0 ? 'table__odd-column' : 'table__even-column';

    const studentRows = studentsData.map(student => (
        <div className="table__row" key={student.id}>
            <div className="table-row__student-name">
                {student.name + " " + student.lastname}
            </div>
            <ul className="table-row__marks">
                {taskNames.map((task, taskIndex) => {
                    const grade = student.grades.find(g => g.taskName === task);
                    const columnClass = taskIndex % 2 === 0 ? 'table__odd-column' : 'table__even-column';
                    return (
                        <li className={`table-row__mark ${columnClass}`} key={task + student.id}>
                            {grade ? 
                                (grade.completion ? 
                                    (grade.mark ? grade.mark : <div className="table__yellow-circle"></div>) :
                                    <div className="table__red-circle"></div>
                                ) : 
                                null
                            }
                        </li>
                    );
                })}
                <li className={`table-row__conclusion ${conclusionClass}`}>
                    <div className="table__gradient-conclusion"></div>
                </li>
            </ul>
        </div>
    ));

    return (
        <main className="main_successfulGroup">
            <div className="container_successfulGroup">
                <ChoseSubjectMenu 
                    subjects={subjects} 
                    setSelectedSubject={setSelectedSubject} 
                    currentSubject={selectedSubject} 
                    redirectTo="/successfulGroup" 
                />
                <div className="table">
                    <div className="table__header-row">
                        <div className="table-header-row__designation">
                            <div className="table__center-container">
                                <div className="table__red-circle"></div>
                                <span>Не зроблено</span>
                            </div>
                            <div className="table__center-container">
                                <div className="table__yellow-circle"></div>
                                <span>Зроблено</span>
                            </div>
                        </div>
                        <ul className="table-header-row__headings">
                            {taskNames.map((taskName, index) => (
                                <li key={taskName} className={`table-header-row__task-type ${index % 2 === 0 ? 'table__odd-column' : 'table__even-column'}`}>
                                    <span>{abbreviateTaskName(taskName.split(' №')[0])}</span>
                                    <span>№{taskName.split(' №')[1]}</span>
                                </li>
                            ))}
                            <li className={`table-header-row__conclusion ${conclusionClass}`}>
                                <span>Висновок</span>
                            </li>
                        </ul>
                    </div>
                    {studentRows}
                </div>
            </div>
        </main>
    );
}

export default SuccessfulGroup;





// import React, { useState, useEffect } from 'react';
// import './successfulGroup.css';
// import ChoseSubjectMenu from '../../components/choseSubject/ChoseSubjectMenu';

// function SuccessfulGroup() {
//     const [selectedSubject, setSelectedSubject] = useState(localStorage.getItem('selectedSubject') || "");
//     const [studentsData, setStudentsData] = useState([]);

//     useEffect(() => {
//         const fetchStudentsData = async () => {
//             const jwtToken = localStorage.getItem('jwtToken');
//             const response = await fetch(`http://localhost:8080/api/group/${selectedSubject}/grade/all`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Cache-Control': 'no-cache',
//                     'Authorization': 'Bearer ' + jwtToken
//                 }
//             });
            
//             const data = await response.json();
//             setStudentsData(data);
//         };
        
//         fetchStudentsData();
//     }, [selectedSubject]);

//     const abbreviateTaskName = (name) => {
//         if (name.includes("Практичне Завдання")) return "ПЗ";
//         if (name.includes("Лабораторна робота")) return "ЛБ";
//         return name;
//     }

//     const taskNames = [...new Set(studentsData.flatMap(student => student.grades.map(grade => grade.taskName)))];
//     const conclusionClass = taskNames.length % 2 === 0 ? 'table__odd-column' : 'table__even-column';

//     const studentRows = studentsData.map(student => (
//         <div className="table__row" key={student.id}>
//             <div className="table-row__student-name">
//                 {student.name}
//             </div>
//             <ul className="table-row__marks">
//                 {taskNames.map((task, taskIndex) => {
//                     const grade = student.grades.find(g => g.taskName === task);
//                     const columnClass = taskIndex % 2 === 0 ? 'table__odd-column' : 'table__even-column';
//                     return (
//                         <li className={`table-row__mark ${columnClass}`} key={task + student.id}>
//                             {grade ? 
//                                 (grade.completion ? 
//                                     (grade.mark ? grade.mark : <div className="table__yellow-circle"></div>) :
//                                     <div className="table__red-circle"></div>
//                                 ) : 
//                                 null
//                             }
//                         </li>
//                     );
//                 })}
//                 <li className={`table-row__conclusion ${conclusionClass}`}>
//                     {/* Тут можна додати логіку для висновку */}
//                     <div className="table__gradient-conclusion"></div>
//                 </li>
//             </ul>
//         </div>
//     ));

//     return (
//         <main className="main_successfulGroup">
//             <div className="container_successfulGroup">
//                 <ChoseSubjectMenu setSelectedSubject={setSelectedSubject} currentSubject={selectedSubject} redirectTo="/successfulGroup" />

//                 <div className="table">
//                     <div className="table__header-row">
//                         <div className="table-header-row__designation">
//                             <div className="table__center-container">
//                                 <div className="table__red-circle"></div>
//                                 <span>Не зроблено</span>
//                             </div>
//                             <div className="table__center-container">
//                                 <div className="table__yellow-circle"></div>
//                                 <span>Зроблено</span>
//                             </div>
//                         </div>
//                         <ul className="table-header-row__headings">
//                             {taskNames.map((taskName, index) => (
//                                 <li key={taskName} className={`table-header-row__task-type ${index % 2 === 0 ? 'table__odd-column' : 'table__even-column'}`}>
//                                     <span>{abbreviateTaskName(taskName.split(' №')[0])}</span>
//                                     <span>№{taskName.split(' №')[1]}</span>
//                                 </li>
//                             ))}
//                             <li className={`table-header-row__conclusion ${conclusionClass}`}>
//                                 <span>Висновок</span>
//                             </li>
//                         </ul>
//                     </div>
//                     {studentRows}
//                 </div>
//             </div>
//         </main>
//     );
// }

// export default SuccessfulGroup;











// import React, { useState, useEffect } from 'react';
// import './successfulGroup.css';
// import ChoseSubjectMenu from '../../components/choseSubject/ChoseSubjectMenu';

// function SuccessfulGroup() {
//     const [selectedSubject, setSelectedSubject] = useState(localStorage.getItem('selectedSubject') || "");
//     const [studentsData, setStudentsData] = useState([]);

//     useEffect(() => {
//         const fetchStudentsData = async () => {
//             const jwtToken = localStorage.getItem('jwtToken');
//             const response = await fetch(`http://localhost:8080/api/group/${selectedSubject}/grade/all`, {
//                 method: 'GET',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Cache-Control': 'no-cache',
//                     'Authorization': 'Bearer ' + jwtToken
//                 }
//             });
            
//             const data = await response.json();
//             setStudentsData(data);
//         };
        
//         fetchStudentsData();
//     }, [selectedSubject]);

//     const abbreviateTaskName = (name) => {
//         if (name.includes("Практичне Завдання")) return "ПЗ";
//         if (name.includes("Лабораторна робота")) return "ЛБ";
//         return name;
//     }

//     const taskNames = [...new Set(studentsData.flatMap(student => student.grades.map(grade => grade.taskName)))];
//     const conclusionClass = taskNames.length % 2 === 0 ? 'table__odd-column' : 'table__even-column';

//     const studentRows = studentsData.map(student => (
//         <div className="table__row">
//             <div className="table-row__student-name">
//                 {student.name}
//             </div>
//             <ul className="table-row__marks">
//     {taskNames.map((task, taskIndex) => {
//         const grade = student.grades.find(g => g.taskName === task);
//         const columnClass = taskIndex % 2 === 0 ? 'table__odd-column' : 'table__even-column';
//         return (
//             <li className={`table-row__mark ${columnClass}`}>
//                 {grade ? 
//                     (grade.completion ? 
//                         (grade.mark ? grade.mark : <div className="table__yellow-circle"></div>) :
//                         <div className="table__red-circle"></div>
//                     ) : 
//                     null
//                 }
//             </li>
//         );
//     })}
//     <li className={`table-row__conclusion ${conclusionClass}`}>
//         {/* Тут можна додати логіку для висновку */}
//         <div className="table__gradient-conclusion"></div>
//     </li>
// </ul>

//         </div>
//     ));

//     return (
//         <main className="main_successfulGroup">
//             <div className="container_successfulGroup">
//                 <ChoseSubjectMenu setSelectedSubject={setSelectedSubject} currentSubject={selectedSubject} redirectTo="/successfulGroup" />

//                 <div className="table">
//                     <div className="table__header-row">
//                         <div className="table-header-row__designation">
//                             <div className="table__center-container">
//                                 <div className="table__red-circle"></div>
//                                 <span>Не зроблено</span>
//                             </div>
//                             <div className="table__center-container">
//                                 <div className="table__yellow-circle"></div>
//                                 <span>Зроблено</span>
//                             </div>
//                         </div>
//                         <ul className="table-header-row__headings">
//                             {taskNames.map((taskName, index) => (
//                                 <li key={index} className={`table-header-row__task-type ${index % 2 === 0 ? 'table__odd-column' : 'table__even-column'}`}>
//                                     <span>{abbreviateTaskName(taskName.split(' №')[0])}</span>
//                                     <span>№{taskName.split(' №')[1]}</span>
//                                 </li>
//                             ))}
//                             <li className={`table-header-row__conclusion ${conclusionClass}`}>
//                                 <span>Висновок</span>
//                             </li>
//                         </ul>
//                     </div>
//                     {studentRows}
//                 </div>
//             </div>
//         </main>
//     );
// }

// export default SuccessfulGroup;
