import { Link, useNavigate } from "react-router-dom";

function Navbar({ dark, setDark }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.nav}>
      <h2>💰 Expense Manager</h2>

      <div>
        <button onClick={() => setDark(!dark)} style={styles.btn}>
          {dark ? "☀️" : "🌙"}
        </button>

        {!token ? (
          <>
            <Link to="/">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 20px",
    background: "#333",
    color: "#fff"
  },
  btn: {
    marginRight: "10px"
  }
};

export default Navbar;