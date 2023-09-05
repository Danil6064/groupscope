import React from 'react';

function HaderTableSG({ students }) {

    // Функція для укорочення назв завдань
    const abbreviateTaskName = (name) => {
        if (name.includes("Практичне Завдання")) return "ПЗ";
        if (name.includes("Лабораторна робота")) return "ЛБ";
        return name;
    }

    // Отримуємо усі унікальні назви завдань з усіх студентів
    const taskNames = [...new Set(students.flatMap(student => student.grades.map(grade => grade.taskName)))];

    return (
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
                        <li key={index} className={`table-header-row__task-type ${index % 2 === 0 ? 'table__odd-column' : 'table__even-column'}`}>
                            <span>{abbreviateTaskName(taskName.split(' №')[0])}</span>
                            <span>№{taskName.split(' №')[1]}</span>
                        </li>
                    ))}
                    <li className="table-header-row__conclusion table__even-column">
                        <span>Висновок</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default HaderTableSG;


{/* <div className="table__header-row">

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
    <li className="table-header-row__task-type table__odd-column">
        <span>пз</span>
        <span>№1</span>
    </li>

    <li className="table-header-row__task-type table__even-column">
        <span>пз</span>
        <span>№2</span>
    </li>

    <li className="table-header-row__conclusion table__even-column">
        <span>Висновок</span>
    </li>
</ul>

</div> */}