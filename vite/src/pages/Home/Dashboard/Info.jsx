import * as React from "react";
import Typography from "@mui/material/Typography";
import Title from "../Title";
import axios from "axios"; // Import Axios

export default function Info() {
  const [userInfo, setUserInfo] = React.useState(null);

  React.useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`http://localhost:8080/currentUser/${userId}`, config)
      .then((response) => {
        setUserInfo(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <React.Fragment>
      <Title>Hi !!</Title>
      {userInfo ? (
        <React.Fragment>
          <Typography component="p" variant="h4">
            {userInfo.userFirstName} {userInfo.userLastName}
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            {userInfo.userEmail}
          </Typography>
        </React.Fragment>
      ) : (
        <Typography>Loading user information...</Typography>
      )}
    </React.Fragment>
  );
}
