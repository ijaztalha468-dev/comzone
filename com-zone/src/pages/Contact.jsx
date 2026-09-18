import { useState } from "react";
import { sendContactMessage } from "../services/contactService";

const fieldClass =
  "w-full py-[15px] px-[18px] border border-[var(--border)] rounded-xl outline-none text-[15px] text-[var(--text)] [font-family:inherit] transition-colors duration-300 ease-in-out focus:border-[var(--red)] focus:shadow-[0_0_0_3px_var(--red-bg)]";

export default function Contact() {


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(""); // "success" | "error"
  const [statusMessage, setStatusMessage] = useState("");



  function handleChange(e) {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  }



  async function handleSubmit(e) {

    e.preventDefault();

    setLoading(true);
    setStatus("");
    setStatusMessage("");

    try {

      const result = await sendContactMessage(formData);

      setStatus("success");
      setStatusMessage(result.message || "Message bhej diya gaya, hum jald hi contact karenge.");

      setFormData({ name: "", email: "", phone: "", message: "" });

    } catch (error) {

      console.error("Contact Form Error:", error);

      setStatus("error");
      setStatusMessage(
        error.response?.data?.message || "Message bhejte waqt error hua, dobara try karein."
      );

    } finally {

      setLoading(false);

    }

  }



  return (
    <div className="w-[95%] min-[700px]:w-[90%] max-w-[1200px] mt-[60px] mx-auto mb-[90px]">


      <div className="text-center mb-[50px]">

        <h1 className="relative inline-block text-[30px] min-[700px]:text-[38px] font-extrabold text-[var(--text)] mb-3 after:content-[''] after:absolute after:w-[70px] after:h-1 after:bg-[var(--red)] after:-bottom-3 after:left-1/2 after:-translate-x-1/2 after:rounded-[10px]">
          Get In Touch
        </h1>

        <p className="text-[var(--text-muted)] text-base mt-5">
          Sawal ho ya order ka masla, hamari team aapki madad ke liye hazir hai.
        </p>

      </div>



      <div className="grid grid-cols-1 min-[900px]:grid-cols-[1.3fr_1fr] gap-[30px] items-start">


        {/* Contact Form */}

        <form
          className="bg-[var(--bg-card)] p-[25px] min-[700px]:p-10 rounded-[20px] flex flex-col gap-[18px] shadow-[0_15px_35px_rgba(0,0,0,0.12)]"
          onSubmit={handleSubmit}
        >

          <h2 className="text-xl mt-0 mx-0 mb-1.5 text-[var(--text)]">Send us a message</h2>

          <input
            className={fieldClass}
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            className={fieldClass}
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            className={fieldClass}
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />

          <textarea
            className={`${fieldClass} h-[150px] resize-none`}
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button
            className="bg-[var(--red)] text-white border-none py-[15px] rounded-[30px] text-base font-bold cursor-pointer transition-[background,box-shadow,transform] duration-300 ease-in-out enabled:hover:bg-[var(--red-hover)] enabled:hover:shadow-[var(--shadow-red)] enabled:hover:-translate-y-[3px] disabled:opacity-70 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {status === "success" && (
            <p className="py-3 px-4 rounded-[10px] text-sm text-center bg-[var(--success-bg)] text-[var(--success)]">{statusMessage}</p>
          )}

          {status === "error" && (
            <p className="py-3 px-4 rounded-[10px] text-sm text-center bg-[var(--red-bg)] text-[var(--red-dark)]">{statusMessage}</p>
          )}

        </form>


        {/* Contact Info */}

        <div className="p-[25px] min-[700px]:p-[35px] bg-[var(--bg-elevated)] text-[var(--text)] rounded-[20px] shadow-[0_10px_25px_rgba(0,0,0,0.2)] flex flex-col gap-[22px]">

          <h2 className="text-[var(--red)] text-[22px] mt-0 mx-0 mb-1.5">
            COM-ZONE Support
          </h2>

          <div className="flex gap-3.5 items-start">
            <span className="text-[22px]">📧</span>
            <div>
              <strong className="block text-sm text-[var(--warning)] mb-0.5">Email</strong>
              <p className="text-[var(--text-muted)] text-[15px] m-0">support@com-zone.com</p>
            </div>
          </div>

          <div className="flex gap-3.5 items-start">
            <span className="text-[22px]">📞</span>
            <div>
              <strong className="block text-sm text-[var(--warning)] mb-0.5">Phone</strong>
              <p className="text-[var(--text-muted)] text-[15px] m-0">+92 300 0000000</p>
            </div>
          </div>

          <div className="flex gap-3.5 items-start">
            <span className="text-[22px]">📍</span>
            <div>
              <strong className="block text-sm text-[var(--warning)] mb-0.5">Address</strong>
              <p className="text-[var(--text-muted)] text-[15px] m-0">Lahore, Punjab, Pakistan</p>
            </div>
          </div>

          <div className="flex gap-3.5 items-start">
            <span className="text-[22px]">🕐</span>
            <div>
              <strong className="block text-sm text-[var(--warning)] mb-0.5">Hours</strong>
              <p className="text-[var(--text-muted)] text-[15px] m-0">Mon - Sat: 10am - 8pm</p>
            </div>
          </div>

        </div>


      </div>


    </div>
  );
}
