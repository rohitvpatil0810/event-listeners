import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SyncLoader from "react-spinners/SyncLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function EventForm({ setToast }) {
  var today = new Date();
  var todaydate =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  console.log(todaydate);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [venue, setVenue] = useState("");
  const [nameerror, setNameerror] = useState("");
  const [dateerror, setDateerror] = useState("");
  const [descerror, setDescerror] = useState("");
  const [organizererror, setOrganizererror] = useState("");
  const [venueerror, setVenueerror] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/createevent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          date,
          desc,
          organizer,
          venue,
        }),
      });
      const data = await res.json();

      if (data.errors) {
        if (data.errors.error) {
          navigate("/");
        }

        setNameerror(data.errors.name);
        setDateerror(data.errors.date);
        setDescerror(data.errors.desc);
        setOrganizererror(data.errors.organizer);
        setVenueerror(data.errors.venue);
        setLoading(false);
      } else {
        setLoading(false);
        setToast(true);
        navigate("/dashboard");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong, please try again after some time!");
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkauth = async () => {
      const res = await fetch("/auth", {
        credentials: "include",
      });
      const data = await res.json();
      if (data.errors) {
        navigate("/");
      }
    };
    checkauth();
  }, [navigate]);

  return (
    <div className="w-screen h-screen bg-opal py-2 overflow-y-scroll">
      <div className="w-11/12 lg:w-1/2 h-fit mx-auto lg:mx-auto my-auto bg-white rounded py-6 px-5 lg:px-10">
        <h1 className="text-2xl font-righteous">Add details of Event</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col font-raleway font-semibold"
        >
          <label htmlFor="event" className="py-2">
            Event Name
          </label>
          <input
            type="text"
            name="event"
            id="event"
            className="bg-gray-100 px-2 py-2 rounded"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          />
          <span className="text-sm text-red-500 px-2 py-1">{nameerror}</span>
          <label htmlFor="date" className="py-2">
            Date
          </label>
          <input
            type="date"
            name="date"
            id="date"
            className="bg-gray-100 w-fit px-2 py-2 rounded"
            min={todaydate}
            max="2050-12-31"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
            required
          />
          <span className="text-sm text-red-500 px-2 py-1">{dateerror}</span>
          <label htmlFor="desc" className="py-2">
            Description
          </label>
          <textarea
            name="desc"
            id="desc"
            cols="30"
            rows="7"
            className="bg-gray-100 px-2 py-2 rounded"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          ></textarea>
          <span className="text-sm text-red-500 px-2 py-1">{descerror}</span>
          <label htmlFor="organizer" className="py-2">
            Organizer
          </label>
          <input
            type="text"
            name="organizer"
            id="organizer"
            className="bg-gray-100 px-2 py-2 rounded"
            value={organizer}
            onChange={(e) => {
              setOrganizer(e.target.value);
            }}
            required
          />
          <span className="text-sm text-red-500 px-2 py-1">
            {organizererror}
          </span>
          <label htmlFor="venue" className="py-2">
            Venue
          </label>
          <input
            type="text"
            id="venue"
            name="venue"
            className="bg-gray-100 px-2 py-2 rounded"
            value={venue}
            onChange={(e) => {
              setVenue(e.target.value);
            }}
            required
          />
          <span className="text-sm text-red-500 px-2 py-1">{venueerror}</span>
          {loading ? (
            <div className="flex justify-center items-center mt-4">
              <SyncLoader size={10}></SyncLoader>
            </div>
          ) : (
            <button
              type="submit"
              className="mt-4 bg-pacificBlue rounded py-2 font-bold shadow-md hover:shadow-none"
            >
              Add Event
            </button>
          )}
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
