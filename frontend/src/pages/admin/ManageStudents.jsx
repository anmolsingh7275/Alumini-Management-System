import React, { useEffect, useState } from "react";
import donationService from "../../services/donationService";

export default function ManageDonations() {
  const [donations, setDonations] = useState([]);
  useEffect(()=> {
    donationService.getDonations().then(r=>setDonations(r.data)).catch(()=>{});
  }, []);
  return (
    <div>
      <h2 className="text-xl mb-4">Donations</h2>
      <div className="space-y-3">
        {donations.map(d => (
          <div key={d._id} className="p-3 bg-white dark:bg-gray-800 rounded flex justify-between">
            <div>
              <div className="font-semibold">{d.amount} ({d.currency || 'INR'})</div>
              <div className="text-sm text-gray-500">{d.purpose} — {new Date(d.date).toLocaleDateString()}</div>
            </div>
            <div className="text-sm text-gray-500">{d.alumniName || 'Anonymous'}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
