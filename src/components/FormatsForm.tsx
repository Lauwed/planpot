type FormatsFormProps = {
  register: any;
};

const FormatsForm = ({ register }: FormatsFormProps) => {
  return (
    <div className="plugin__formats">
      <h2>Formats</h2>
      <div className="form__row">
        <div className="form__col">
          <h3>Complete planning</h3>

          <div className="checkbox-container">
            <input
              className="checkbox-input"
              type="checkbox"
              id="slide"
              {...register(`slide`)}
            />
            <label htmlFor="slide">1920x1080</label>
          </div>
          <div className="checkbox-container">
            <input
              className="checkbox-input"
              type="checkbox"
              id="twitch"
              {...register(`twitch`)}
            />
            <label htmlFor="twitch">Twitch (1500x1500)</label>
          </div>
        </div>

        <div className="form__col">
          <h3>Separated days</h3>

          <div className="checkbox-container">
            <input
              className="checkbox-input"
              type="checkbox"
              id="insta-story"
              {...register(`instaStory`)}
            />
            <label htmlFor="insta-story">Story Insta (1080x1920)</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormatsForm;
