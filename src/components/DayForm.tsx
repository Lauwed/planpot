import { useState } from "react";

type DayFormProps = {
  day: string;
  register: any;
  onVisibilityChange: () => void;
};

const DayForm = ({ day, register, onVisibilityChange }: DayFormProps) => {
  const [visible, setVisible] = useState(false);

  const handleVisibilityChange = () => {
    setVisible(!visible);
    onVisibilityChange();
  };

  return (
    <section className="day">
      <div className="day__header">
        <label htmlFor={day} className="day__title">
          <h2>{day.charAt(0).toUpperCase() + day.slice(1)}</h2>
        </label>

        <input
          className="checkbox-input"
          type="checkbox"
          id={day}
          checked={visible}
          onChange={handleVisibilityChange}
        />
      </div>

      {visible ? (
        <div className="day__body">
          <div className="form__row">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                className="input"
                type="text"
                id="title"
                {...register(`${day}-title`)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                className="input"
                type="text"
                id="description"
                {...register(`${day}-description`)}
              />
            </div>
          </div>

          <div className="form__row">
            <div className="form-group">
              <label htmlFor="begin-hour">Begin hour</label>
              <input
                className="input"
                type="text"
                id="begin-hour"
                {...register(`${day}-begin-hour`, {
                  required: true,
                })}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="end-hour">End hour</label>
              <input
                className="input"
                type="text"
                id="end-hour"
                {...register(`${day}-end-hour`)}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
              className="input"
              type="file"
              id="image"
              {...register(`${day}-image`)}
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </section>
  );
};

export default DayForm;
