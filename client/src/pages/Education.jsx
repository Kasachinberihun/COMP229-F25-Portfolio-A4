// src/pages/Education.jsx
import { useState } from "react";

const emptyForm = {
  title: "",
  firstName: "",
  lastName: "",
  email: "",
  date: "",
  description: "",
};

export default function Education() {
  const [form, setForm] = useState(emptyForm);
  const [items, setItems] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Very simple validation
    if (!form.title.trim()) {
      alert("Please enter a title.");
      return;
    }

    setItems((prev) => [
      ...prev,
      {
        ...form,
        id: Date.now(),
      },
    ]);

    setForm(emptyForm);
  };

  return (
    <div style={{ maxWidth: 900, margin: "20px auto" }}>
      <h1>Education / Qualification</h1>

      {/* 👇 CI/CD demo text added for Assignment 4 */}
      <p
        style={{
          textAlign: "center",
          marginTop: 8,
          marginBottom: 20,
          fontStyle: "italic",
        }}
      >
        This page was updated as part of the CI/CD demonstration (December
        2025).
      </p>

      {/* Form section */}
      <form onSubmit={handleSubmit}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #ccc", textAlign: "left" }}>
                Title
              </th>
              <th style={{ borderBottom: "1px solid #ccc", textAlign: "left" }}>
                Firstname
              </th>
              <th style={{ borderBottom: "1px solid #ccc", textAlign: "left" }}>
                Lastname
              </th>
              <th style={{ borderBottom: "1px solid #ccc", textAlign: "left" }}>
                Email
              </th>
              <th style={{ borderBottom: "1px solid #ccc", textAlign: "left" }}>
                Date
              </th>
              <th style={{ borderBottom: "1px solid #ccc", textAlign: "left" }}>
                Description
              </th>
              <th />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                />
              </td>
              <td>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                />
              </td>
              <td>
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                />
              </td>
              <td>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                />
              </td>
              <td>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                />
              </td>
              <td>
                <input
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                />
              </td>
              <td>
                <button type="submit">Add Education</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>

      {/* List section */}
      <h2 style={{ marginTop: 24 }}>All Educations</h2>

      {items.length === 0 ? (
        <p>No education records added yet.</p>
      ) : (
        <ul style={{ paddingLeft: 20 }}>
          {items.map((edu) => (
            <li key={edu.id} style={{ marginBottom: 8 }}>
              <strong>{edu.title}</strong> – {edu.firstName} {edu.lastName},{" "}
              {edu.email}, {edu.date || "no date"} – {edu.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

