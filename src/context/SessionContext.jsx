import React, { createContext, useContext, useState, useCallback } from "react";
import { fetchHistory } from "../api/api";

const SessionContext = createContext();

export function SessionProvider({ children }) {
  const [sessions, setSessions]           = useState([]);
  const [activeSession, setActiveSession] = useState(null);

  const refreshSessions = useCallback(async () => {
    try {
      const data = await fetchHistory();
      const mapped = data.map((s) => ({
        id:       s.id,
        date:     s.start_time?.split("T")[0] ?? "",
        startTime:s.start_time?.split("T")[1]?.slice(0, 5) ?? "",
        subject:  s.subject,
        duration: s.duration != null ? `${s.duration} mins` : "In progress",
        result:   s.productivity_rating >= 3 ? "Productive" : "Not Productive",
        mood:     "—",
        sleep:    "—",
        period:   "—",
        taskName: s.subject,
      }));
      setSessions(mapped);
    } catch (err) {
      console.error("Failed to fetch sessions:", err.message);
    }
  }, []);

  return (
    <SessionContext.Provider value={{ sessions, setSessions, activeSession, setActiveSession, refreshSessions }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() { return useContext(SessionContext); }