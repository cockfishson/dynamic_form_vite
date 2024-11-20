import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../../api.js";
import { EventForm } from "../../components/event_form/event_form.jsx";
import "./create_event_page.css";

export const CreateEventPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true);
    const formattedData = {
      ...data,
      date:
        data.date instanceof Date
          ? data.date.toISOString().substring(0, 10)
          : data.date,
    };
    try {
      await createEvent(formattedData);
      navigate("/");
    } catch (error) {
      console.error("Event update failed - ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form_container">
      <div className="form_wrapper">
        <h1 className="article">Create event</h1>
        <EventForm onSubmit={handleSubmit} defaultValues={{}} />
        {loading ? (
          <div className="loader">Creating event...</div>
        ) : (
          <button className="link" onClick={() => navigate("/")}>
            Back to event list
          </button>
        )}
      </div>
    </div>
  );
};
