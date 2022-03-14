import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EventForm from "./pages/EventForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
function App() {
  const [Toast, setToast] = useState(false);

  if (Toast) {
    toast.success("Event added Successfully");
    setToast(false);
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="loginuser" element={<Login />} />
        <Route path="signupuser" element={<Signup />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="eventform" element={<EventForm setToast={setToast} />} />
      </Routes>
      <ToastContainer></ToastContainer>
    </>
  );
}

export default App;
