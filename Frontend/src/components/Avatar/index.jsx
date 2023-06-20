import "./avatar.css";

//getUserPhoto desde backend
const Avatar = ({ avatar, username }) => {
  return (
    <>
      <img className="avatar" src={avatarURL(avatar)} alt={username} />
    </>
  );
};

export default Avatar;
