import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import "./taskCard.css";

export default function TaskCard({ name, info, deadline }) {
  const [showMore, setShowMore] = useState(false);
  const isMobile = useMediaQuery({ query: "(max-width: 480px)" });

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  const TaskInfoButton = () => {
    return (
      <div className="task-info">
        <button className="task-info-btn" onClick={handleMoreClick}>
          <svg width="10" height="10" viewBox="0 0 19 19">
            <polygon points="0,0 19,0 9.5,19" />
          </svg>
          <span>{showMore ? "згорнути" : "розгорнути"} опис завдання</span>
          <svg width="10" height="10" viewBox="0 0 19 19">
            <polygon points="0,0 19,0 9.5,19" />
          </svg>
        </button>
      </div>
    );
  };

  return (
    <li className="homework-card">
      <h3>{name}</h3>

      {isMobile ? (
        <>
          <TaskInfoButton />
          {showMore && (
            <div className="homework-text">
              <span>{info}</span>
            </div>
          )}
        </>
      ) : (
        <div className="homework-text">
          <span>{info}</span>
        </div>
      )}

      <div className="homework-deadline">
        <span>Deadline: {deadline}</span>
      </div>
    </li>
  );
}
