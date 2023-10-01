import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function ChoseSubjectMenu({ setSelectedSubject, currentSubject, redirectTo }) {
    const [subjects, setSubjects] = useState([]);
    const [selected, setSelected] = useState(localStorage.getItem('selectedSubject') || currentSubject || "");
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const subjectsFromCookies = JSON.parse(Cookies.get('subjectNames') || "[]");
        setSubjects(subjectsFromCookies);

        if (!selected && subjectsFromCookies.length > 0) {
            const firstSubject = subjectsFromCookies[0];
            setSelected(firstSubject);
            setSelectedSubject(firstSubject);
            localStorage.setItem('selectedSubject', firstSubject);
        }
    }, []);

    useEffect(() => {
        if (selected) {
            localStorage.setItem('selectedSubject', selected);
            navigate(`${redirectTo}/${selected}`);
        }
    }, [selected, navigate, redirectTo]);

    const handleClick = (subject) => {
        setSelected(subject);
        setSelectedSubject(subject);
        setIsOpen(false);
    };

    return (
        <div className="dropdown-menu">
            <div className="dropdown-menu-btn" onClick={() => setIsOpen(!isOpen)}>
            <svg width="15" height="15" viewBox="0 0 19 19">
                    <polygon points="0,0 19,0 9.5,19" />
                </svg>
                <h2>{selected}</h2>
                <svg width="15" height="15" viewBox="0 0 19 19">
                    <polygon points="0,0 19,0 9.5,19" />
                </svg>
            </div>
            <div className="dropdown-menu-elements" style={{ display: isOpen ? 'block' : 'none' }}>
                <ul>
                    {subjects.map((subject, index) => (
                        <li key={index} onClick={() => handleClick(subject)}>
                            {subject}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ChoseSubjectMenu;
