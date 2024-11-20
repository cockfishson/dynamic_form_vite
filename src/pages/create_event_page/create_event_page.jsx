import { useState } from "react";
import { useHandleNavigation } from "../../helpers/click_handlers/handle_navigation";
import { handleEventSubmit } from "../../helpers/click_handlers/handle_submit.js";
import { createEvent } from "../../api/events.api.js";
import { EventForm } from "../../components/event_form/event_form.jsx";
import "./create_event_page.css";

export const CreateEventPage = () => {
  const handleNavigation = useHandleNavigation();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (data) => {
    handleEventSubmit({
      data,
      apiFunction: createEvent,
      handleNavigation,
      setLoading,
    });
  };

  return (
    <div className="form_container">
      <div className="form_wrapper">
        <h1 className="article">Create event</h1>
        <EventForm onSubmit={handleSubmit} defaultValues={{}} />
        {loading ? (
          <div className="loader">Creating event...</div>
        ) : (
          <button className="link" onClick={() => handleNavigation("/")}>
            Back to event list
          </button>
        )}
      </div>
    </div>
  );
};
