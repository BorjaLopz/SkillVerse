// import "./style.css";
// import { Link } from "react-router-dom";
// import { useUserTokenContext } from "../../contexts/UserTokenContext";
// import Button from "../Button";
// import HeaderAvatar from "../HeaderAvatar";
// import NavBar from "./components/NavBar/index.jsx";

// const Header = ({ user }) => {
//   const { token, setToken } = useUserTokenContext();

//   return (
//     <header className="header">
//       <Link to="/">
//         <h1>Freelance Services Platform</h1>
//         <p>Get your stuff done! 👀 </p>
//       </Link>
//       <nav>
//         <>
//           {" "}
//           {token && (
//             <li>
//               <Link to="/myservices">Check my services</Link>
//             </li>
//           )}
//           {token && <Link to="/services">Register a new service</Link>}
//         </>
//       </nav>
//       <nav>
//         <ul>
//           {!token && (
//             <>
//               <li>
//                 <Link to="/users">Register</Link>
//               </li>
//               <li>
//                 <Link to="/login">Login</Link>
//               </li>
//             </>
//           )}

//           {token && (
//             <li>
//               <Button
//                 onClick={() => {
//                   setToken("");
//                 }}
//               >
//                 <Link to="/">Log out</Link>
//               </Button>
//             </li>
//           )}

//           {token && (
//             <li className="li_avatar">
//               <Link to="/user">
//                 <HeaderAvatar user={user} />
//               </Link>
//             </li>
//           )}
//         </ul>
//       </nav>
//     </header>
//   );
// };

// export default Header;
