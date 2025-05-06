import { useState } from "react";

const CreateSchedule = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
  });

  const [participants, setParticipants] = useState([""]);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleParticipantChange = (index, value) => {
    const updated = [...participants];
    updated[index] = value;
    setParticipants(updated);
  };

  const addParticipantField = () => {
    setParticipants([...participants, ""]);
  };

  const removeParticipantField = (index) => {
    const updated = participants.filter((_, i) => i !== index);
    setParticipants(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    const payload = {
      ...formData,
      participants: participants.filter((email) => email.trim() !== ""),
    };

    try {
      const res = await fetch("http://localhost:5000/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create schedule");

      await res.json();
      setSuccessMsg("✅ Schedule created and invitations sent!");
      setFormData({ title: "", description: "", startTime: "", endTime: "" });
      setParticipants([""]);
    } catch (err) {
      setErrorMsg("❌ Failed to create schedule. Try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Create New Schedule</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <div className="flex gap-4">
          <input
            type="datetime-local"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="datetime-local"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Participants</label>
          {participants.map((email, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              <input
                type="email"
                value={email}
                onChange={(e) => handleParticipantChange(idx, e.target.value)}
                placeholder={`Participant #${idx + 1} Email`}
                className="w-full p-2 border rounded"
                required
              />
              {participants.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeParticipantField(idx)}
                  className="text-red-600 hover:text-red-800"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addParticipantField}
            className="text-blue-600 hover:underline mt-2"
          >
            + Add another participant
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Create Schedule
        </button>
      </form>

      {successMsg && <p className="text-green-600 mt-4 text-center">{successMsg}</p>}
      {errorMsg && <p className="text-red-600 mt-4 text-center">{errorMsg}</p>}
    </div>
  );
};

export default CreateSchedule;
