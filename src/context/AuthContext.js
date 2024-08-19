"use client";
import apiService from "@/lib/apiService";
import { useRouter } from "next/navigation";
// import axiosInstance from "@/lib/axios";
// import { createContext, useEffect, useState } from "react";

// // Create the AuthContext with default values
// export const AuthContext = createContext({
//   currentUser: null,
//   login: () => {},
//   logout: () => {},
// });

// // Create the AuthContextProvider component
// export const AuthContextProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);

//   const logout = async () => {
//     try {
//       await axiosInstance.get("/api/auth/logout");
//       localStorage.removeItem("user");
//       setCurrentUser(null);
//     } catch (error) {
//       console.error("Failed to log out:", error);
//     }
//   };

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");

//     if (storedUser) {
//       setCurrentUser(JSON.parse(storedUser));
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ currentUser, logout, setCurrentUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import { createContext, useEffect, useState } from "react";

// Create the AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  // Function to fetch user data
  const fetchUser = async () => {
    try {
      const response = await apiService.getData("/api/auth/me");

      if (response.status === 201) {
        setCurrentUser(response.user);
      } else {
        setCurrentUser(null);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  // On component mount, fetch user data
  useEffect(() => {
    fetchUser();
  }, []);

  // Login function

  // Logout function
  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setCurrentUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, fetchUser, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Export the AuthContext
export default AuthContext;
