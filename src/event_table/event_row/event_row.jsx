import { useNavigate } from "react-router-dom";
import "../event_table.css";

export const EventRow = ({ event }) => {
  const navigate = useNavigate();

  return (
    <tr className="tbody_tr">
      <td className="td">{event.title || "Untitled Event"}</td>
      <td className="td">{event.category || "Uncategorized"}</td>
      <td className="td">{event.date || "Date not specified"}</td>
      <td className="td">${event.budget ?? "N/A"}</td>
      <td className="td">{event.capacity ?? "Capacity not set"}</td>
      <td className="td">{event.organizer || "Organizer not listed"}</td>
      <td className="td">{event.speakers || "No speakers assigned"}</td>
      <td className="td">
        {event.logistics && event.logistics.length > 0 ? (
          <ul>
            {event.logistics.map((logistic, index) => (
              <li key={index}>{`${logistic.item || "Item"} - ${
                logistic.status || "Status unknown"
              }`}</li>
            ))}
          </ul>
        ) : (
          <p>No logistics available</p>
        )}
      </td>
      <td className="td">
        <button
          onClick={() => navigate(`/edit/${event.id || ""}`)}
          className="link"
        >
          Edit
        </button>
      </td>
    </tr>
  );
};
