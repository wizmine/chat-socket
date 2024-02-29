import "./messages.scss";

type Props = {
  messages: {
    user: {
      name: string;
    };
    message: string;
  }[];
  name: string;
};

const Messages = ({ messages, name }: Props) => {
  return (
    <>
      {messages.map(({ user, message }, i) => {
        const itsMe = user.name.trim().toLowerCase() === name.trim().toLowerCase();
        const className = itsMe ? "me" : "another";

        return (
          <div key={i} className={`message ${className}`}> 
            <span className="user">{user.name}</span>
            <div className={`text ${className}`}>{message}</div>
          </div>
        );
      })}
    </>
  );
};

export default Messages;
