import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import TopTicker from "./TopTicker";
import { clinic } from "../config";

const links = [
  { href: "#top", label: "Home" },
  { href: "#assessments", label: "Assessments" },
  { href: "#diagnostics", label: "Diagnostics" },
  { href: "#doctor", label: "Doctor" },
  { href: "#book", label: "Book" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="site-header">
      <TopTicker />

      <div className="top-bar">
        <div className="container top-bar-inner">
          <span><Phone size={14} /> {clinic.phone} · {clinic.hours}</span>
          <span>{clinic.location.city} · Walk-ins welcome</span>
        </div>
      </div>

      <header className={`nav ${open ? "open" : ""}`}>
        <div className="nav-inner">
          <a href="#top" className="brand" onClick={() => setOpen(false)}>
            <img src={clinic.logo} alt="KVR Hospital" className="brand-logo" width={44} height={44} />
            <div className="brand-text">
              <strong>{clinic.name}</strong>
              <span>{clinic.careBrand}</span>
            </div>
          </a>

          <ul className="nav-links">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={() => setOpen(false)}>{link.label}</a>
              </li>
            ))}
          </ul>

          <div className="nav-cta">
            <a className="btn btn-outline" href={`tel:${clinic.phoneRaw}`}>Call</a>
            <a className="btn btn-primary" href="#assessments">Book Assessment</a>
          </div>

          <button className="nav-toggle" aria-label="Toggle menu" onClick={() => setOpen((v) => !v)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>
    </div>
  );
}
