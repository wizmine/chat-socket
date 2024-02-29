import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as io from "socket.io-client";
import Messages from "../Messages/Messages";
import "./chat.scss";

const socket = io.connect("http://localhost:4200");

interface IParams {
  [key: string]: string;
}

interface IState {
  message: string;
  user: {
    name: string;
  };
}

const Chat = () => {
  const [state, setState] = useState<IState[]>([]);
  const [params, setParams] = useState<IParams>({ room: "", user: "" });
  const navigate = useNavigate();
  const { search } = useLocation();
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState(0);

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams);
    socket.emit("join", searchParams);
  }, [search]);

  useEffect(() => {
    socket.on("message", ({ data }: { data: IState }) => {
      setState((_state) => [..._state, data]);
    });
  }, []);

  useEffect(() => {
    socket.on("room", ({ data: { users } }) => {
      setUsers(users.length);
    });
  }, []);

  const leftRoom = () => {
    socket.emit("leftRoom", { params });
    navigate("/");
  };

  const handleChange = ({ target: { value } }: { target: { value: string } }) => setMessage(value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!message) return;

    socket.emit("sendMessage", { message, params });

    setMessage("");
  };

  return (
    <div className="chat-wrap">
      <div className="chat-header">
        <div className="chat-title">{params.room}</div>
        <div className="chat-users">{users} users in this room</div>
        <button className="chat-exit" onClick={leftRoom}>
          EXIT ROOM
        </button>
      </div>
      <div className="chat-messages">
        <Messages messages={state} name={params.name} />
      </div>
      <form className="chat-form" onSubmit={handleSubmit}>
        <div className="chat-group">
          <input
            type="text"
            name="message"
            placeholder="write something..."
            value={message}
            className="chat-input"
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </div>
        <div className="chat-submit">
          <input className="chat-submit-button" type="submit" value="Send a message" />
        </div>
      </form>
    </div>
  );
};

export default Chat;
