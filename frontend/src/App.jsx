import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [dark, setDark] = useState(false);

  return (
    <div style={{
      background: dark ? "#121212" : "#f5f7fa",
      color: dark ? "#fff" : "#000",
      minHeight: "100vh"
    }}>
      <Router>
        <Navbar dark={dark} setDark={setDark} />

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard dark={dark} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;