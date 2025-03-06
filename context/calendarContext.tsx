// context/CalendarContext.tsx
import { createContext, useContext, useState } from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";

type CalendarContextType = {
  date: Date;
  setDate: (date: Date) => void;
};

const CalendarContext = createContext<CalendarContextType | undefined>(undefined);

export const CalendarProvider = ({ children }: { children: React.ReactNode }) => {
  const [date, setDate] = useState<Date>(new Date());

  return (
    <CalendarContext.Provider value={{ date, setDate }}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }
  return context;
};
