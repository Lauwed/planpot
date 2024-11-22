import { useState } from "react";

type DayFormProps = {
  day: string;
};

const DayForm = ({ day }: DayFormProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <section className="day">
      <div className="day__header">
        <label htmlFor={day.toLowerCase()} className="day__title">
          <h2>{day}</h2>
        </label>

        <input
          className="checkbox-input"
          type="checkbox"
          id={day.toLowerCase()}
          checked={visible}
          onChange={() => setVisible(!visible)}
        />
      </div>

      {visible ? (
        <div>
          <div className="form__row">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input className="input" type="text" id="title" />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input className="input" type="text" id="description" />
            </div>
          </div>

          <div className="form__row">
            <div className="form-group">
              <label htmlFor="begin-hour">Begin hour</label>
              <input className="input" type="text" id="begin-hour" />
            </div>
            <div className="form-group">
              <label htmlFor="end-hour">End hour</label>
              <input className="input" type="text" id="end-hour" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input className="input" type="file" id="image" />
          </div>
        </div>
      ) : (
        <></>
      )}
    </section>
  );
};

export default DayForm;
