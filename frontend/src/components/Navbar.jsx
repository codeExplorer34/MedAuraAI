import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo Section - Enhanced */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <img
            src="/MedAuraAI Logo.png"
            alt="MedAura Logo"
            style={{
              height: "36px",
              width: "auto",
              filter: "drop-shadow(0 0 8px rgba(56, 189, 248, 0.3))"
            }}
          />
          <span style={{
            fontSize: "1.3rem",
            fontWeight: "700",
            color: "#ffffff",
            letterSpacing: "-0.03em"
          }}>
            MedAura AI
          </span>
        </Link>

        {/* Navigation Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
          <Link
            to="/"
            className={`nav-link ${isActive("/") ? "active" : ""}`}
            style={{ fontSize: "0.95rem" }}
          >
            Home
          </Link>
          <Link
            to="/er-copilot"
            className={`nav-link ${isActive("/er-copilot") ? "active" : ""}`}
            style={{ fontSize: "0.95rem" }}
          >
            Emergency Care
          </Link>
          <Link
            to="/mdt-review"
            className={`nav-link ${isActive("/mdt-review") ? "active" : ""}`}
            style={{ fontSize: "0.95rem" }}
          >
            Team Coordination
          </Link>
          <Link
            to="/pricing"
            className={`nav-link ${isActive("/pricing") ? "active" : ""}`}
            style={{ fontSize: "0.95rem" }}
          >
            Pricing
          </Link>
          <Link
            to="/about"
            className={`nav-link ${isActive("/about") ? "active" : ""}`}
            style={{ fontSize: "0.95rem" }}
          >
            About
          </Link>
        </div>

        {/* CTA Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Link
            to="/login"
            className="btn btn-sm"
            style={{
              background: "transparent",
              border: "1px solid rgba(56, 189, 248, 0.5)",
              color: "#38bdf8",
              padding: "8px 16px",
              borderRadius: "8px",
              fontSize: "0.9rem",
              fontWeight: "500",
              transition: "all 0.2s ease"
            }}
          >
            Doctor Portal
          </Link>
          <Link to="/er-copilot" className="btn btn-primary btn-sm">
            Try Emergency Care
          </Link>
        </div>
      </div>
    </nav>
  );
}
