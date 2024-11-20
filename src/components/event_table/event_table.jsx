import { EventRow } from "./event_row/event_row";
import "./event_table.css";

export const EventTable = ({ events = [] }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th className="th">Title</th>
          <th className="th">Category</th>
          <th className="th">Date</th>
          <th className="th">Budget</th>
          <th className="th">Capacity</th>
          <th className="th">Organizer</th>
          <th className="th">Speakers</th>
          <th className="th">Logistics</th>
          <th className="th">Actions</th>
        </tr>
      </thead>
      <tbody>
        {events.length > 0 ? (
          events.map((event) => <EventRow key={event.id} event={event} />)
        ) : (
          <tr>
            <td colSpan="9" className="no_items">
              No events available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
