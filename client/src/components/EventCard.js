import React from "react";

export default function EventCard(props) {
  const { name, date, desc, organizer, venue } = props.event;
  const newdate = new Date(date);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year = newdate.getFullYear();
  var month = months[newdate.getMonth()];
  var date1 = newdate.getDate();
  return (
    <div className="w-11/12 my-3 lg:w-1/2 rounded-md bg-white mx-auto px-6 py-4 font-raleway shadow">
      <div className="flex justify-between py-2">
        <h1 className="text-xl font-bold">{name}</h1>
        <h1 className="font-semibold">
          Date: {date1} {month}, {year}
        </h1>
      </div>
      <p className="py-2 font-semibold">{desc}</p>
      <div className="flex justify-between py-2 font-semibold">
        <h1>Organizer: {organizer}</h1>
        <h1>Venue: {venue}</h1>
      </div>
    </div>
  );
}
