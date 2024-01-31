import { useEffect } from "react";
import { useState } from "react";

const BASE_URL = "http://localhost:8081/users";

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await fetch(BASE_URL);
        if (!response.ok)
          throw new Error(`Error: ${response.status} - ${response.statusText}`);

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        if (error.message.includes("404")) {
          console.error("Not Found: The requested resource was not found.");
        } else {
          console.error("Error:", error.message);
        }
      }
    };

    fetchUsersData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        React, Node, Express and MySQL
      </h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
