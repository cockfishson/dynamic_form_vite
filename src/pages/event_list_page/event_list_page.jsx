import { useEffect, useState } from "react";
import { fetchEvents } from "../../api/events.api.js";
import { EventTable } from "../../components/event_table/event_table.jsx";
import { useHandleNavigation } from "../../helpers/click_handlers/handle_navigation";
import "./event_list_page.css";

export const EventListPage = () => {
  const [events, setEvents] = useState([]);
  const handleNavigation = useHandleNavigation();

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
      <button className="link" onClick={() => handleNavigation("/create")}>
        Create new event
      </button>
    </div>
  );
};
