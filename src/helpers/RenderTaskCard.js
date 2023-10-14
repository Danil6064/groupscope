// RenderTaskCard.js
import { useState, useEffect } from "react";
import TaskCard from "../components/taskCard/TaskCard";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

function RenderTaskCard({ subjectName, currentTaskType }) {
  const [taskList, setTaskList] = useState([]);
  const axiosPrivate = useAxiosPrivate();


  useEffect(() => {
    axiosPrivate
      .get(`/api/subject/${encodeURIComponent(subjectName)}/task/all`)
      .then((responce) => {
        setTaskList(responce.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [subjectName]);

  const filteredTaskList = taskList.filter((task) =>
    currentTaskType === "ALL" ? true : task.type === currentTaskType
  );

  return (
    <>
      {filteredTaskList.map((task) => {
        return (
          <TaskCard
            key={task.id}
            name={task.name}
            info={task.info}
            deadline={task.deadline}
          />
        );
      })}
    </>
  );
}

export default RenderTaskCard;
