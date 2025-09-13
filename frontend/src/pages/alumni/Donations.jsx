import React, { useState } from "react";
import donationService from "../../services/donationService";

export default function Donations() {
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await donationService.createDonation({ amount: Number(amount), purpose });
      alert("Thank you for donating!");
      setAmount(""); setPurpose("");
    } catch {
      alert("Donation failed");
    }
  };

  return (
    <div>
      <h2 className="text-xl mb-4">Donate</h2>
      <form className="bg-white dark:bg-gray-800 p-4 rounded" onSubmit={submit}>
        <input className="w-full mb-2 p-2 border rounded" placeholder="Amount (INR)" value={amount} onChange={(e)=>setAmount(e.target.value)} />
        <input className="w-full mb-2 p-2 border rounded" placeholder="Purpose (e.g. Scholarship)" value={purpose} onChange={(e)=>setPurpose(e.target.value)} />
        <button className="px-4 py-2 bg-indigo-600 text-white rounded">Donate (Mock)</button>
      </form>
    </div>
  );
}
