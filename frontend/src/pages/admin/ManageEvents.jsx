import React, { useEffect, useState } from "react";
import eventService from "../../services/eventService";

export default function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ title: "", date: "", venue: "", type: "alumni" });

  useEffect(()=> {
    eventService.getEvents().then(r=>setEvents(r.data)).catch(()=>{});
  }, []);

  const create = async (e) => {
    e.preventDefault();
    const res = await eventService.createEvent(form);
    setEvents([res.data, ...events]);
    setForm({ title: "", date: "", venue: "", type: "alumni" });
  };

  return (
    <div>
      <h2 className="text-xl mb-4">Manage Events</h2>
      <form onSubmit={create} className="mb-4 bg-white dark:bg-gray-800 p-4 rounded">
        <input className="w-full mb-2 p-2 border rounded" placeholder="Title" value={form.title} onChange={(e)=>setForm({...form, title:e.target.value})} />
        <input type="date" className="w-full mb-2 p-2 border rounded" value={form.date} onChange={(e)=>setForm({...form, date:e.target.value})}/>
        <input className="w-full mb-2 p-2 border rounded" placeholder="Venue" value={form.venue} onChange={(e)=>setForm({...form, venue:e.target.value})}/>
        <select className="w-full mb-2 p-2 border rounded" value={form.type} onChange={(e)=>setForm({...form, type:e.target.value})}>
          <option value="alumni">Alumni Only</option>
          <option value="open">Alumni + Students</option>
        </select>
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Create Event</button>
      </form>
      <div className="space-y-3">
        {events.map(ev=>(
          <div key={ev._id} className="p-3 bg-white dark:bg-gray-800 rounded">
            <div className="font-semibold">{ev.title}</div>
            <div className="text-sm text-gray-500">{ev.date} — {ev.venue} ({ev.type})</div>
          </div>
        ))}
      </div>
    </div>
  );
}
