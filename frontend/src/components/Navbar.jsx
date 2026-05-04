import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.nav}>
      <h2 style={{ margin: 0 }}>💰 Expense Manager</h2>

      <div>
        {!token ? (
          <>
            <Link to="/" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" style={styles.link}>Dashboard</Link>
            <button onClick={handleLogout} style={styles.btn}>
              Logout
            </button>
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
    alignItems: "center",
    padding: "15px 30px",
    background: "#111",
    color: "#fff",
  },
  link: {
    color: "#fff",
    marginRight: "15px",
    textDecoration: "none",
    fontWeight: "bold",
  },
  btn: {
    padding: "6px 12px",
    border: "none",
    background: "red",
    color: "#fff",
    cursor: "pointer",
  },
};

export default Navbar;