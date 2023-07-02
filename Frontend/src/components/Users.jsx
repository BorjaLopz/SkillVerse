const people = [
  {
    name: "Leslie Alexander",
    email: "leslie.alexander@example.com",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Michael Foster",
    email: "michael.foster@example.com",
    role: "Co-Founder / CTO",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Dries Vincent",
    email: "dries.vincent@example.com",
    role: "Business Relations",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: null,
  },
  {
    name: "Lindsay Walton",
    email: "lindsay.walton@example.com",
    role: "Front-end Developer",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Courtney Henry",
    email: "courtney.henry@example.com",
    role: "Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Tom Cook",
    email: "tom.cook@example.com",
    role: "Director of Product",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    lastSeen: null,
  },
];
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
              <p className="mt-1 truncate text-m leading-10 text-gray-500">
                {user.email}
              </p>
            </div>
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
