import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useServer from "../../hooks/useServer";
import "./style.css";
import koFiIcon from "/icons/ko-fi-icon.svg";

function Users() {
  const { get } = useServer();
  const [users, setUsers] = useState([]);

  const fetchAllUsers = async () => {
    try {
      const { data } = await get({ url: `/users` });
      setUsers(data.userData);
    } catch (e) {
      console.log("Error al obtener los usuarios:", e.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <ul role="list" className="users-list">
      {users.map((user) => (
        <li key={user.email}>
          <div className="users-list-info">
            <Link to={`/user/${user.nickname}`}>
              <img src={user.userPhoto} alt={`Foto de ${user.nickname}`} />
            </Link>
            <div className="users-list-data">
              <Link to={`/user/${user.nickname}`}>
                <p className="users-list-nickname">{user.nickname}</p>
              </Link>
              <Link
                to="#"
                onClick={() => {
                  window.location = `mailto: ${user.email}`;
                }}
              >
                <p className="users-list-email">{user.email}</p>
              </Link>
        {user.ko_fi && (
                <a href={user.ko_fi} target="_blank" rel="noopener noreferrer">
                  <div className="ko-fi-container">
                    <img
                      src="/icons/ko-fi-icon.svg"
                      alt="Ko-fi"
                      className="ko-fi-icon small"
                    />
                    </div>
          </a>
        )}

            </div>
          </div>
          <div className="users-list-role">
            {user.admin ? (
              <div className="role-container">
                <div className="role-admin-outside">
                  <div className="role-admin-inside" />
                </div>
                <p className="role-admin">Admin</p>
              </div>
            ) : (
              <div className="role-container">
                <div className="role-user-outside">
                  <div className="role-user-inside" />
                </div>
                <p className="role-user">Usuario</p>
              </div>
            )}
          </div>
          {/* <div className="hidden sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">{user.role}</p>
            {user.lastSeen ? (
              <p className="mt-1 text-xs leading-5 text-gray-500">
                Last seen{" "}
                <time dateTime={user.lastSeenDateTime}>{user.lastSeen}</time>
              </p>
            ) : (
              <div className="mt-1 flex items-center gap-x-1.5">
                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>
                <p className="text-xs leading-5 text-gray-500">Online</p>
              </div>
            )}
          </div> */}
          {}
        </li>
      ))}
    </ul>
  );
}

export default Users;
