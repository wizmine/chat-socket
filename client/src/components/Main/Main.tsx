import { useState } from "react";
import { Link } from "react-router-dom";
import "./main.scss";

const FIELDS = {
  NAME: "name",
  ROOM: "room",
};

interface ITarget {
  target: {
    value: string;
    name: string;
  };
}

const Main = () => {
  const { NAME, ROOM } = FIELDS;
  const [values, setValues] = useState({ [NAME]: "", [ROOM]: "" });

  const handleChange = ({ target: { value, name } }: ITarget) => {
    setValues({ ...values, [name]: value });
  };

  const handleClick = (event: React.FormEvent<HTMLInputElement>) => {
    const isDisabled = Object.values(values).some((value) => !value);

    if (isDisabled) event.preventDefault();
  };

  return (
    <div className="main-wrap">
        <h1 className="main-heading">Join</h1>
        <form className="main-form">
          <div className="main-group">
            <input
              type="text"
              name="name"
              value={values[NAME]}
              placeholder="Name"
              className="main-input"
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
          <div className="main-group">
            <input
              type="text"
              name="room"
              value={values[ROOM]}
              placeholder="Room"
              className="main-input"
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
          <Link className="main-link" onClick={() => handleClick} to={`/chat?name=${values[NAME]}&room=${values[ROOM]}`}>
            <button type="submit" className="main-button">
              Sign In
            </button>
          </Link>
        </form>
    </div>
  );
};

export default Main;
