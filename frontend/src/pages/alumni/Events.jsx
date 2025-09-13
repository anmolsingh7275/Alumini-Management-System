import React, { useEffect, useState } from "react";
import eventService from "../../services/eventService";
import { useAuth } from "../../context/AuthContext";

export default function Events() {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  useEffect(()=> {
    eventService.getEvents().then(r=>{
      // filter: if alumni show all; if student show only open
      const list = (r.data || []).filter(ev => user.role === 'alumni' ? true : ev.type === 'open');
      setEvents(list);
    }).catch(()=>{});
  }, [user]);
  return (
    <div>
      <h2 className="text-xl mb-4">Events</h2>
      <div className="space-y-3">
        {events.map(ev => (
          <div key={ev._id} className="p-3 bg-white dark:bg-gray-800 rounded">
            <div className="font-semibold">{ev.title}</div>
            <div className="text-sm text-gray-500">{ev.date} — {ev.venue} ({ev.type})</div>
          </div>
        ))}
      </div>
    </div>
  );
}
