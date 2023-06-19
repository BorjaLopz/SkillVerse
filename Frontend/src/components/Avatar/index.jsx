import "./avatar.css";

//getUserPhoto desde backend
const Avatar = ({ avatar, username }) => {
  // if (!avatar) avatar = "default_avatar.png";

  return (
    <>
      <img className="avatar" src={avatarURL(avatar)} alt={username} />
    </>
  );
};

export default Avatar;
