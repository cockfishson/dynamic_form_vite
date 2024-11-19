import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { CreateEventPage } from "./create_event_page/create_event_page";
import { EditEventPage } from "./edit_event_page/edit_event_page";
import { EventListPage } from "./event_list_page/event_list_page";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EventListPage />} />
        <Route path="/create" element={<CreateEventPage />} />
        <Route path="/edit/:id" element={<EditEventPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
