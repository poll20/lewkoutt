import React, { createContext, useState, useEffect, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";

// Create AuthContext
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { user, loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const [userDetails, setUserDetails] = useState({});
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to register user
  const registerUser = async () => {
    try {
      if (user && !isRegistered) {
        setLoading(true);

        const response = await fetch(`${apiUrl}/user/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        if (!response.ok) {
          console.log(`Registration failed: ${response.statusText}`)
          throw new Error(`Registration failed: ${response.statusText}`);
          
        }

        setUserDetails(user);
        setIsRegistered(true);
      }
    } catch (e) {
      setError(`Registration error: ${e.message}`);
      console.log(`Registration error: ${e.message}`)
    } finally {
      setLoading(false);
    }
  };

  // Automatically register user when logged in
  useEffect(() => {
    if (user) {
      registerUser();
    }
  }, [user]);

  // Function to handle logout
  const handleLogout = async () => {
    try {
      setLoading(true);

      if (user) {
        const response = await fetch(`${apiUrl}/user/logout`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: user.email }),
        });

        if (!response.ok) {
          throw new Error(`Logout failed: ${response.statusText}`);
        }

        setIsRegistered(false);
      }

      logout();
    } catch (e) {
      setError(`Logout error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch user details
  const fetchUserDetails = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${apiUrl}/user/profile?email=${user.email}`)

      if (!response.ok) {
        throw new Error(`Failed to fetch user details: ${response.statusText}`);
      }

      const data = await response.json();
      setUserDetails(data);
      console.log("lund",data)
    } catch (e) {
      setError(`Fetch error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user details when authenticated and registered
  useEffect(() => {
    if (isAuthenticated && isRegistered) {
      fetchUserDetails();
    }
  }, [isAuthenticated, isRegistered]);

  // Provide context value
  return (
    <AuthContext.Provider
      value={{
        user,
        userDetails,
        isAuthenticated,
        isRegistered,
        loginWithRedirect,
        handleLogout,
        loading,
        error,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);
