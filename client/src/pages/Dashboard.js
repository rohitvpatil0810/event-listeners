import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import EventCard from "../components/EventCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Dashboard() {
  const [Events, setEvents] = useState([]);
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await fetch("/logout", {
        credentials: "include",
      });
      navigator("/");
    } catch (err) {
      toast.error("Something went wrong, please try again after some time!");
    }
  };

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/getevent", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.errors) {
        navigate("/");
      }
      setEvents(data.events);
    }
    try {
      fetchData();
    } catch (err) {
      toast.error("Something went wrong, please try again after some time!");
    }
  }, [Events, navigate]);

  return (
    <div className="bg-opal h-screen overflow-y-scroll">
      <div className="flex justify-between w-11/12 lg:w-1/2 mx-auto lg:px-2  pt-4">
        <h1 className="text-2xl font-righteous text-darkSlateGray">
          EventListeners
        </h1>
        <button
          onClick={logout}
          className="bg-flurescentBlue py-2 px-2 rounded shadow hover:shadow-none flex justify-center items-center"
        >
          <span className="material-icons ">logout</span>
        </button>
      </div>
      <div className="flex justify-between w-11/12 lg:w-1/2 mx-auto lg:px-2  py-4">
        <h1 className=" text-2xl font-righteous text-darkSlateGray">
          Event List
        </h1>
        <Link to="/eventform">
          <button className="bg-flurescentBlue py-2 px-4 font-semibold rounded shadow hover:shadow-none">
            Add New Event
          </button>
        </Link>
      </div>
      {Events.length > 0 ? (
        Events.map((event) => {
          return <EventCard event={event} key={event._id} />;
        })
      ) : (
        <div className="py-16 text-xl font-bold text-head flex flex-col justify-center items-center">
          <span class="material-icons text-6xl py-4 items-center">info</span>
          <div>Nothing to Show</div>
          <Link to="/eventform">
            <button className="text-head bg-white rounded-full w-44 text-base px-2 py-2 flex items-center  my-3 mx-4">
              <span className="material-icons pr-2">add_circle_outline</span>Add
              New Event
            </button>
          </Link>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
