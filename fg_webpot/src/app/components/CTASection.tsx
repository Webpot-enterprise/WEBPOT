import { ArrowRight, Mail } from "lucide-react";

export function CTASection() {
  return (
    <section
      id="contact"
      style={{
        background: "#06060c",
        padding: "0 0 120px",
        fontFamily: "'Space Grotesk', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 40px" }}>
        <div
          style={{
            borderRadius: "32px",
            position: "relative",
            overflow: "hidden",
            padding: "clamp(60px, 8vw, 120px) clamp(32px, 6vw, 100px)",
            background: "linear-gradient(135deg, rgba(79,172,254,0.08) 0%, rgba(168,85,247,0.08) 50%, rgba(244,114,182,0.06) 100%)",
            border: "1px solid rgba(255,255,255,0.07)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Background orbs */}
          <div
            style={{
              position: "absolute",
              top: "-80px",
              left: "-80px",
              width: "400px",
              height: "400px",
              background: "radial-gradient(ellipse, rgba(79,172,254,0.15) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "-80px",
              right: "-80px",
              width: "400px",
              height: "400px",
              background: "radial-gradient(ellipse, rgba(168,85,247,0.15) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />
          {/* Center glow */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "600px",
              height: "300px",
              background: "radial-gradient(ellipse, rgba(79,172,254,0.06) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Grid overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `linear-gradient(rgba(79,172,254,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(79,172,254,0.04) 1px, transparent 1px)`,
              backgroundSize: "48px 48px",
              pointerEvents: "none",
              opacity: 0.5,
            }}
          />

          {/* Content */}
          <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
            {/* Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(79,172,254,0.1)",
                border: "1px solid rgba(79,172,254,0.25)",
                borderRadius: "100px",
                padding: "6px 20px",
                marginBottom: "32px",
              }}
            >
              <div
                style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: "#4facfe",
                  boxShadow: "0 0 8px rgba(79,172,254,0.8)",
                  animation: "pulse-dot 2s ease-in-out infinite",
                }}
              />
              <span style={{ color: "#4facfe", fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Available for New Projects
              </span>
            </div>

            {/* Headline */}
            <h2
              style={{
                fontSize: "clamp(40px, 7vw, 96px)",
                fontWeight: 900,
                letterSpacing: "-3px",
                lineHeight: 1.0,
                marginBottom: "28px",
              }}
            >
              <span
                style={{
                  background: "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.85) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "block",
                }}
              >
                Ready to Build
              </span>
              <span
                style={{
                  background: "linear-gradient(135deg, #4facfe 0%, #a855f7 50%, #f472b6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "block",
                }}
              >
                Something Legendary?
              </span>
            </h2>

            <p
              style={{
                color: "rgba(255,255,255,0.45)",
                fontSize: "clamp(15px, 2vw, 18px)",
                lineHeight: 1.7,
                maxWidth: "520px",
                margin: "0 auto 56px",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              Let's turn your vision into a digital masterpiece. Tell us about your project and we'll respond within 24 hours.
            </p>

            {/* CTA Buttons */}
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href="mailto:hello@webpot.studio"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "12px",
                  background: "linear-gradient(135deg, #4facfe 0%, #a855f7 100%)",
                  color: "#fff",
                  fontSize: "16px",
                  fontWeight: 700,
                  padding: "18px 40px",
                  borderRadius: "100px",
                  textDecoration: "none",
                  letterSpacing: "0.01em",
                  boxShadow: "0 8px 50px rgba(79, 172, 254, 0.4), 0 0 0 1px rgba(255,255,255,0.1) inset",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 12px 70px rgba(79, 172, 254, 0.6), 0 0 0 1px rgba(255,255,255,0.15) inset";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 8px 50px rgba(79, 172, 254, 0.4), 0 0 0 1px rgba(255,255,255,0.1) inset";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <Mail size={18} />
                Start Your Project
                <ArrowRight size={18} />
              </a>

              <a
                href="#portfolio"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  background: "rgba(255,255,255,0.05)",
                  color: "rgba(255,255,255,0.8)",
                  fontSize: "15px",
                  fontWeight: 600,
                  padding: "18px 36px",
                  borderRadius: "100px",
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.09)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                View Case Studies
              </a>
            </div>

            {/* Contact info */}
            <div
              style={{
                marginTop: "56px",
                display: "flex",
                gap: "40px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              {[
                { label: "Response time", value: "< 24 hours" },
                { label: "Free consultation", value: "30-min call" },
                { label: "Project start", value: "Within 1 week" },
              ].map((info, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ color: "rgba(255,255,255,0.25)", fontSize: "11px", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "4px", fontFamily: "'Inter', sans-serif" }}>
                    {info.label}
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "15px", fontWeight: 600 }}>
                    {info.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.8); }
        }
      `}</style>
    </section>
  );
}
