import NavBar from "../NavBar";
// import "style.css";

function Header() {
  return (
    <header
      className="sticky top-0 z-50"
      style={{ backgroundColor: "#827799" }}
    >
      <NavBar />
    </header>
  );
}

export default Header;
