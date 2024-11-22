import { useState } from "react";
import "./App.css";
import DayForm from "./components/DayForm";

import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  example: string;
  exampleRequired: string;
};

function App() {
  const url = new URL(window.location.href);
  const initialTheme = url.searchParams.get("theme");

  const [theme, setTheme] = useState(initialTheme || null);

  window.addEventListener("message", (event) => {
    if (event.data.type === "theme") {
      setTheme(event.data.content);
    }
  });

  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data, days);

    parent.postMessage({ type: "generate", data }, "*");
  };

  const days: { [key: string]: boolean } = {
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  };

  return (
    <form
      data-theme={theme}
      className="plugin form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="plugin__days">
        {Object.keys(days).map((day) => (
          <DayForm
            key={day}
            onVisibilityChange={() => {
              days[day] = !days[day];
            }}
            day={day}
            register={register}
          />
        ))}
      </div>

      <button className="form__submit" type="submit" data-appearance="primary">
        Generate the planning
      </button>
    </form>
  );
}

export default App;
