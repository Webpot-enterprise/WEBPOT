import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = ["Services", "Process", "Portfolio", "About"];

  return (
    <nav
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "all 0.4s ease",
        background: scrolled
          ? "rgba(6, 6, 15, 0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.06)"
          : "1px solid transparent",
      }}
    >
      <div
        style={{
          maxWidth: "1320px",
          margin: "0 auto",
          padding: "0 40px",
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "34px",
              height: "34px",
              borderRadius: "8px",
              background: "linear-gradient(135deg, #4facfe 0%, #a855f7 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px rgba(79, 172, 254, 0.4)",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 5L7 9L3 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 13H15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <span
            style={{
              fontSize: "20px",
              fontWeight: 700,
              letterSpacing: "-0.5px",
              background: "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Webpot
          </span>
        </div>

        {/* Desktop Nav */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
          className="hidden md:flex"
        >
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "14px",
                fontWeight: 500,
                letterSpacing: "0.02em",
                padding: "8px 16px",
                borderRadius: "8px",
                transition: "all 0.2s ease",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = "rgba(255,255,255,1)";
                (e.target as HTMLElement).style.background = "rgba(255,255,255,0.06)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = "rgba(255,255,255,0.6)";
                (e.target as HTMLElement).style.background = "transparent";
              }}
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <a
            href="#contact"
            style={{
              background: "linear-gradient(135deg, #4facfe 0%, #a855f7 100%)",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 600,
              padding: "10px 24px",
              borderRadius: "100px",
              textDecoration: "none",
              letterSpacing: "0.02em",
              boxShadow: "0 0 24px rgba(79, 172, 254, 0.3)",
              transition: "all 0.3s ease",
            }}
            className="hidden md:block"
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.boxShadow = "0 0 40px rgba(79, 172, 254, 0.55)";
              (e.target as HTMLElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.boxShadow = "0 0 24px rgba(79, 172, 254, 0.3)";
              (e.target as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            Start a Project
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              color: "white",
              cursor: "pointer",
              padding: "4px",
            }}
            className="md:hidden"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            background: "rgba(6, 6, 15, 0.97)",
            backdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            padding: "24px 40px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "16px",
                fontWeight: 500,
                padding: "12px 0",
                textDecoration: "none",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {link}
            </a>
          ))}
          <a
            href="#contact"
            style={{
              background: "linear-gradient(135deg, #4facfe 0%, #a855f7 100%)",
              color: "#fff",
              fontSize: "15px",
              fontWeight: 600,
              padding: "14px 24px",
              borderRadius: "12px",
              textDecoration: "none",
              textAlign: "center",
              marginTop: "16px",
            }}
          >
            Start a Project
          </a>
        </div>
      )}
    </nav>
  );
}
