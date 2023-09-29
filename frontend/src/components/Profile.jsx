import axios from "axios";
import { useState, useEffect } from "react";
import "../styles/Profile.css";

function Profile() {
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState(""); // Added state for user email
  const userId = localStorage.getItem("userId");
  const storedToken = localStorage.getItem("token");

  useEffect(() => {
    if (!userId) {
      console.error("User ID not found in localStorage");
      return;
    }

    axios
      .get(`http://localhost:8080/currentUser/${userId}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        const { userFirstName, userLastName, userEmail } = response.data;

        setUserFirstName(userFirstName);
        setUserLastName(userLastName);
        setUserEmail(userEmail); // Set user email in state
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [userId, storedToken]);

  console.log(userFirstName + " " + userLastName);

  return (
    <div className="profile">
      <h2 className="first">{userFirstName}</h2>
      <h2 className="last">{userLastName}</h2>
      <p className="email">{userEmail}</p> {/* Display user email */}
    </div>
  );
}

export default Profile;
