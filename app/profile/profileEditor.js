"use client";
import { useState } from "react";
import useProfileEditor from "./hooks/useProfileEditor";

export default function ProfileEditor({ currentUser }) {
  const [name, setName] = useState(currentUser?.user_metadata?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [password, setPassword] = useState("");
  const { updateProfile, loading, message } = useProfileEditor();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateProfile({ name, email, password });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-lg text-white">
      <h2 className="text-xl mb-4">Edit Profile</h2>
      {message && <div className={message.type === 'error' ? "text-red-500" : "text-green-500"}>{message.text}</div>}
      
      <div className="mb-4">
        <label>Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 bg-gray-800 text-white rounded" />
      </div>
      <div className="mb-4">
        <label>New Password (leave blank to keep current)</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 bg-gray-800 text-white rounded" />
      </div>
      
      <button type="submit" disabled={loading} className="bg-blue-600 px-4 py-2 rounded">
        {loading ? "Updating..." : "Save Changes"}
      </button>
    </form>
  );
}