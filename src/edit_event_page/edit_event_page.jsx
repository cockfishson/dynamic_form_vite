import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventById, updateEvent } from "../api";
import { EventForm } from "../event_form/event_form";
import "./edit_event_page.css";

export const EditEventPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const handleSubmit = async (data) => {
    const formattedData = {
      ...data,
      date:
        data.date instanceof Date
          ? data.date.toISOString().substring(0, 10)
          : data.date,
    };

    try {
      await updateEvent(id, formattedData);
      navigate("/");
    } catch (error) {
      console.error("Event update failed - ", error);
    }
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
        <button onClick={() => navigate("/")} className="action_button">
          Back to List
        </button>
      </div>
    </div>
  );
};
