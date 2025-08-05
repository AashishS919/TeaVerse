import React, { useState } from "react";
import toast from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch (err) {
      toast.error("Failed to send message.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-semibold mb-6 text-center">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Your Name"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Your Email"
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <textarea
          name="message"
          value={formData.message}
          placeholder="Your Message"
          onChange={handleChange}
          rows="5"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        ></textarea>
        <button
          type="submit"
          className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dull transition duration-200"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
