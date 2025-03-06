import { useState, useEffect } from "react";
import { format } from "date-fns";

interface Meeting {
  date: string;
  time: string;
  type: string;
  agenda: string;
  person: string;
  link?: string;
}

const Calendar = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  useEffect(() => {
    fetch("/meetings.json")
      .then((response) => response.json())
      .then((data) => setMeetings(data))
      .catch((error) => console.error("Error loading meetings:", error));
  }, []);

  return (
    <div style={{ padding: "16px", maxWidth: "600px", margin: "auto" }}>
      <h2 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "16px" }}>Upcoming Meetings</h2>
      {meetings.length === 0 ? (
        <p>No upcoming meetings.</p>
      ) : (
        meetings.map((meeting, index) => (
          <div key={index} style={{ marginBottom: "16px", padding: "16px", border: "1px solid #ccc", borderRadius: "8px", boxShadow: "2px 2px 6px rgba(0,0,0,0.1)" }}>
            <p style={{ fontSize: "16px", fontWeight: "bold" }}>{meeting.agenda}</p>
            <p style={{ fontSize: "14px", color: "#666" }}>
              {format(new Date(meeting.date + " " + meeting.time), "PPpp")} - {meeting.type}
            </p>
            <p style={{ fontSize: "14px" }}>With: {meeting.person}</p>
            {meeting.link && (
              <a href={meeting.link} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: "8px", padding: "8px 12px", backgroundColor: "#007bff", color: "white", textDecoration: "none", borderRadius: "4px" }}>
                Join VC
              </a>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Calendar;
