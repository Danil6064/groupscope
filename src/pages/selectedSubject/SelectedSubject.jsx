import useAuth from "../../hooks/useAuth";
import { ReactComponent as TaskDeadlineIcon } from "../../components/icons/taskDeadline.svg";
import { ReactComponent as TaskInfoIcon } from "../../components/icons/taskInfo.svg";
import "./selectedSubject.css";

export default function SelectedSubject() {
  const { auth } = useAuth();
  // let auth = {role: "HEADMAN"} // Test role

  return (
    <main className="main">
      <div className="subject container">
        {auth.role === "HEADMAN" && (
          <button
            className="subject-btn"
            // onClick={() => setIsPopupOpen(true)}
          >
            <span>Додати завдання</span>
          </button>

          /* {auth.role === "HEADMAN" && isPopupOpen && (
              <AddTaskPopup
                handleOpenState={() => setIsPopupOpen(!isPopupOpen)}
                taskInfo={{ subjectName: subjectName }}
                isNewTask={true} */
        )}

        <button className="subject-btn">
          <span>Всі роботи</span>
        </button>

        <div className="tasks">
          <section className="task-section">
            <h2>Практичні роботи</h2>
            <ul className="subject-task-list">
              <li className="task-list-item">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    flexGrow: "1",
                  }}
                >
                  <div className="task-card">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexGrow: "1",
                        margin: "0 16px",
                      }}
                    >
                      <h3>Практичне заняття №1</h3>
                      <div style={{ display: "flex", gap: "10px" }}>
                        <TaskDeadlineIcon />
                        <span className="task-card__deadline">01.01.2024</span>
                      </div>
                    </div>
                    <TaskInfoIcon />
                  </div>
                  <button className="task-card__show-more-btn">
                    <span className="left-bar"></span>
                    <span className="right-bar"></span>
                  </button>
                </div>
                <input className="task-done-cb" type="checkbox" />
                <input
                  className="task-mark-input"
                  type="number"
                  min={0}
                  max={100}
                  step={1}
                  placeholder="Введіть оцінку"
                />
              </li>
            </ul>
          </section>

          <section className="task-section">
            <h2>Лабораторні роботи</h2>
          </section>
        </div>
      </div>
    </main>
  );
}
