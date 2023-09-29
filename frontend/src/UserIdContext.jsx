import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

const UserIdContext = createContext();

export const useUserId = () => {
  return useContext(UserIdContext);
};

export const UserIdProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  return (
    <UserIdContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserIdContext.Provider>
  );
};

// Add PropTypes validation for children
UserIdProvider.propTypes = {
  children: PropTypes.node,
};
