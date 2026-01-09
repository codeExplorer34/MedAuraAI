import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{
      background: "var(--bg-secondary)",
      borderTop: "1px solid var(--border-subtle)",
      padding: "64px 0 32px"
    }}>
      <div className="container">
        <div style={{
          display: "flex", flexWrap: "wrap", gap: "48px",
          justifyContent: "space-between", marginBottom: "48px"
        }}>
          {/* Brand Column */}
          <div style={{ maxWidth: "300px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <img
                src="/MedAuraAI Logo.png"
                alt="MedAura Logo"
                style={{ height: "24px", width: "auto", filter: "grayscale(100%) opacity(0.8)" }}
              />
              <span style={{ fontSize: "1.1rem", fontWeight: "700", color: "var(--text-primary)" }}>
                MedAura AI
              </span>
            </div>
            <p style={{ fontSize: "0.9rem", lineHeight: "1.6" }}>
              Clinical decision-support for ER and follow-up. No diagnoses. No prescriptions.
            </p>
          </div>

          {/* Links Column */}
          <div>
            <h4 style={{ marginBottom: "16px", color: "var(--text-primary)" }}>Quick Links</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <Link to="/" className="nav-link" style={{ margin: 0 }}>Home</Link>
              <Link to="/er-copilot" className="nav-link" style={{ margin: 0 }}>Emergency Care</Link>
              <Link to="/mdt-review" className="nav-link" style={{ margin: 0 }}>Team Coordination</Link>
              <a
                href="/#pricing"
                className="nav-link"
                style={{ margin: 0 }}
                onClick={(e) => {
                  e.preventDefault();
                  const pricingSection = document.querySelector('#pricing-section');
                  if (pricingSection) {
                    pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  } else {
                    window.location.href = '/#pricing';
                  }
                }}
              >
                Pricing
              </a>
              <Link to="/about" className="nav-link" style={{ margin: 0 }}>About</Link>
            </div>
          </div>

          {/* Tech Stack Column */}
          <div>
            <h4 style={{ marginBottom: "16px", color: "var(--text-primary)" }}>Powered By</h4>
            <div style={{ display: "flex", gap: "16px", color: "var(--text-secondary)", fontSize: "1.2rem" }}>
              <span title="React">⚛️</span>
              <span title="Node.js">🟢</span>
              <span title="Python">🐍</span>
              <span title="FastAPI">⚡</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: "1px solid var(--border-subtle)",
          paddingTop: "32px",
          textAlign: "center",
          fontSize: "0.85rem",
          color: "var(--text-muted)"
        }}>
          © {new Date().getFullYear()} MedAura AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
