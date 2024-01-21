import { useState } from "react";
import "./guest.css";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export default function Guest() {
  const [action, setAction] = useState(null);
  const [groupName, setGroupName] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const jwtToken = localStorage.getItem("jwtToken");

  const navigate = useNavigate();

  const handleCreateGroup = async () => {
    axiosPrivate
      .post("api/group/create", { name: groupName })
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        console.error(error);
      });

    //   const requestBody = {
    //     name: groupName,
    //   };

    //   const response = await fetch(`${apiUrl}/group/create`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: "Bearer " + jwtToken,
    //     },
    //     body: JSON.stringify(requestBody),
    //   });

    //   if (response.ok) {
    //     navigate("/auth");
    //   } else {
    //     // Handle the error
    //   }
  };

  const handleJoinGroup = async () => {
    axiosPrivate
      .post("api/group/join", { inviteCode: inviteCode })
      .then(() => {
        navigate("/home");
      })
      .catch((error) => {
        console.error(error);
      });

    // const requestBody = {
    //   inviteCode: inviteCode,
    // };

    // const response = await fetch(`${apiUrl}/group/join`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: "Bearer " + jwtToken,
    //   },
    //   body: JSON.stringify(requestBody),
    // });

    // if (response.ok) {
    //   navigate("/auth");
    // } else {
    //   // Handle the error
    // }
  };

  return (
    <div className="main">
      <div className="create-group-form">
        <label>Виберіть групу:</label>
        <select onChange={(e) => setGroupName(e.target.value)}>
          <option value="КБІКС-21-1">КБІКС-21-1</option>
          <option value="КБІКС-21-2">КБІКС-21-2</option>
          <option value="КБІКС-21-3">КБІКС-21-3</option>
          <option value="КБІКС-21-4">КБІКС-21-4</option>
          <option value="КБІКС-21-5">КБІКС-21-5</option>
          <option value="КБІКС-21-6">КБІКС-21-6</option>
          {/* You can add other group options here */}
        </select>
        <button onClick={handleCreateGroup}>Створити</button>
      </div>
      <div className="join-group-form">
        <label>Введіть код групи:</label>
        <input
          type="text"
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
        />
        <button onClick={handleJoinGroup}>Приєднатись</button>
      </div>
    </div>
  );
}
