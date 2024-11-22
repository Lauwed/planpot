import { useState } from "react";
import "./App.css";
import DayForm from "./components/DayForm";

function App() {
  const url = new URL(window.location.href);
  const initialTheme = url.searchParams.get("theme");

  const [theme, setTheme] = useState(initialTheme || null);

  window.addEventListener("message", (event) => {
    if (event.data.type === "theme") {
      setTheme(event.data.content);
    }
  });

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <form data-theme={theme} className="plugin form">
      <div className="plugin__days">
        {days.map((day) => (
          <DayForm key={day} day={day} />
        ))}
      </div>

      <button className="form__submit" type="submit" data-appearance="primary">
        Generate the planning
      </button>
    </form>
  );
}

export default App;
