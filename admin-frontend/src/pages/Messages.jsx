import { useEffect, useState } from "react";
import { getMessages, deleteMessage } from "../services/messageService";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadMessages() {
    try {
      setLoading(true);
      const data = await getMessages();
      setMessages(data);
    } catch (err) {
      console.error("Admin Messages Error:", err);
      setError("Messages load nahi ho sake.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMessages();
  }, []);

  async function handleDelete(id) {
    const confirmDelete = window.confirm("Ye message delete karna hai?");
    if (!confirmDelete) return;
    try {
      await deleteMessage(id);
      loadMessages();
    } catch (err) {
      console.error("Delete Message Error:", err);
      alert("Delete nahi ho saka.");
    }
  }

  return (
    <div>
      <h1>Contact Messages</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((m) => (
              <tr key={m.Id}>
                <td>{m.Name}</td>
                <td>{m.Email}</td>
                <td>{m.Phone}</td>
                <td style={{ maxWidth: 300 }}>{m.Message}</td>
                <td>{new Date(m.CreatedAt).toLocaleDateString()}</td>
                <td><button className="bg-red-500" onClick={() => handleDelete(m.Id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
