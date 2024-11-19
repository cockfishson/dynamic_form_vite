import { useEffect, useState } from "react";
import { fetchEvents } from "../api.js";
import { EventTable } from "../event_table/event_table.jsx";
import { useNavigate } from "react-router-dom";
import "./event_list_page.css";

export const EventListPage = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (error) {
        console.error("Fetch events failed - ", error);
      }
    };

    getEvents();
  }, []);

  return (
    <div>
      <h1>Events:</h1>
      <EventTable events={events} />
      <button className="link" onClick={() => navigate("/create")}>
        Create new event
      </button>
    </div>
  );
};
