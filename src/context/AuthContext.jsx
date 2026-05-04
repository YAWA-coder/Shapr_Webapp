import React, { createContext, useContext, useState, useEffect } from "react";
import { getToken, clearToken, fetchProfile } from "../api/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]           = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (token) {
      fetchProfile()
        .then((profile) => setUser(profile))
        .catch(() => clearToken())
        .finally(() => setAuthReady(true));
    } else {
      setAuthReady(true);
    }
  }, []);

  const logout = () => { clearToken(); setUser(null); };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, authReady }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() { return useContext(AuthContext); }