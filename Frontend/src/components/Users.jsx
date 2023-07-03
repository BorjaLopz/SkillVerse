import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useServer from "../hooks/useServer";

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
    <ul role="list" className="divide-y divide-gray-100">
      {users.map((user) => (
        <li key={user.email} className="flex justify-between gap-x-6 py-5">
          <div className="flex gap-x-8">
            <Link to={`/user/${user.nickname}`}>
              <img
                className="h-20 w-20 flex-none rounded-full bg-gray-50"
                src={user.userPhoto}
                alt=""
              />
            </Link>
            <div className="min-w-0 flex-auto">
              <Link to={`/user/${user.nickname}`}>
                <p className="text-xl font-semibold leading-6 text-gray-900">
                  {user.nickname}
                </p>
              </Link>
              <Link
                to="#"
                onClick={() => {
                  window.location = `mailto: ${user.email}`;
                }}
              >
                <p className="mt-1 truncate text-m leading-10 text-gray-500">
                  {user.email}
                </p>
              </Link>
            </div>
          </div>
          <div className="hidden sm:flex sm:flex-col sm:items-end">
            {user.admin ? (
              <div className="mt-1 flex items-center gap-x-1.5">
                <div className="flex-none rounded-full bg-emerald-600/20 p-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                </div>
                <p className="text-xs leading-5 text-gray-500">Admin</p>
              </div>
            ) : (
              <div className="mt-1 flex items-center gap-x-1.5">
                <div className="flex-none rounded-full bg-zinc-500/20 p-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-zinc-500" />
                </div>
                <p className="text-xs leading-5 text-gray-500">Usuario</p>
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
