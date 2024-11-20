import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHandleNavigation } from "../../helpers/click_handlers/handle_navigation";
import { handleEventSubmit } from "../../helpers/click_handlers/handle_submit";
import { getEventById, updateEvent } from "../../api/events.api.js";
import { EventForm } from "../../components/event_form/event_form";
import "./edit_event_page.css";

export const EditEventPage = () => {
  const { id } = useParams();
  const handleNavigation = useHandleNavigation();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEvent = async () => {
      try {
        const response = await getEventById(id);
        setEvent(response);
      } catch (error) {
        console.error("Event fetch failed - ", error);
      } finally {
        setLoading(false);
      }
    };

    getEvent();
  }, [id]);

  const handleSubmit = (data) => {
    handleEventSubmit({
      id,
      data,
      apiFunction: updateEvent,
      handleNavigation,
    });
  };

  return (
    <div className="form_container">
      <div className="form_wrapper">
        <h1 className="title">Edit Item</h1>
        {loading ? (
          <div className="loader">Loading...</div>
        ) : (
          event && (
            <EventForm
              onSubmit={handleSubmit}
              defaultValues={event}
              inputClassName="input_field"
            />
          )
        )}
        <button onClick={() => handleNavigation("/")} className="action_button">
          Back to List
        </button>
      </div>
    </div>
  );
};
