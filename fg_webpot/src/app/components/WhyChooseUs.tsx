import { useState } from "react";
import { Award, Zap, Shield, Users, LineChart, Sparkles } from "lucide-react";

const highlights = [
  {
    icon: Award,
    title: "Award-Winning Design",
    description:
      "Our interfaces have earned recognition at CSSDA, Awwwards, and FWA. Design excellence isn't a bonus — it's our baseline.",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.2)",
  },
  {
    icon: Zap,
    title: "Blazing Performance",
    description:
      "Every project ships with 95+ Lighthouse scores. We obsess over Core Web Vitals because speed is a feature, not a detail.",
    color: "#4facfe",
    glow: "rgba(79,172,254,0.2)",
  },
  {
    icon: Shield,
    title: "Secure by Default",
    description:
      "Security-first architecture with OWASP compliance, encrypted communications, and enterprise-grade protection built in from day one.",
    color: "#34d399",
    glow: "rgba(52,211,153,0.2)",
  },
  {
    icon: Users,
    title: "Collaborative Process",
    description:
      "You get a dedicated Slack channel, weekly demos, and direct access to the team. No middlemen, no guesswork — just transparency.",
    color: "#a855f7",
    glow: "rgba(168,85,247,0.2)",
  },
  {
    icon: LineChart,
    title: "Data-Driven Decisions",
    description:
      "Every design choice is backed by user research and analytics. We build what works, not what trends, for measurable growth.",
    color: "#f472b6",
    glow: "rgba(244,114,182,0.2)",
  },
  {
    icon: Sparkles,
    title: "Pixel-Perfect Output",
    description:
      "We follow an exact design-to-code process ensuring every margin, spacing unit, and interaction matches the original vision.",
    color: "#818cf8",
    glow: "rgba(129,140,248,0.2)",
  },
];

const testimonial = {
  quote:
    "Webpot didn't just build our website — they crafted an experience. The final product was so far beyond our expectations, we had to pause and appreciate it before launching.",
  author: "Marcus Chen",
  title: "CEO, Luminary Labs",
  avatar: "MC",
};

export function WhyChooseUs() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="about"
      style={{
        background: "linear-gradient(180deg, #06060c 0%, #09090f 100%)",
        padding: "140px 0",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      {/* BG decoration */}
      <div style={{
        position: "absolute",
        left: "-200px",
        top: "50%",
        transform: "translateY(-50%)",
        width: "700px",
        height: "700px",
        background: "radial-gradient(ellipse, rgba(168,85,247,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 40px" }}>
        {/* Header */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center", marginBottom: "96px" }} className="flex flex-col gap-10 lg:grid why-header-grid">
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "rgba(245,158,11,0.08)",
                border: "1px solid rgba(245,158,11,0.2)",
                borderRadius: "100px",
                padding: "6px 20px",
                marginBottom: "24px",
              }}
            >
              <span style={{ color: "#f59e0b", fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Why Webpot
              </span>
            </div>
            <h2
              style={{
                fontSize: "clamp(36px, 5vw, 64px)",
                fontWeight: 800,
                letterSpacing: "-2px",
                lineHeight: 1.1,
                background: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.75) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: "24px",
              }}
            >
              Built Different.<br />By Design.
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.45)",
                fontSize: "16px",
                lineHeight: 1.8,
                fontFamily: "'Inter', sans-serif",
                maxWidth: "400px",
              }}
            >
              We merge engineering precision with artistic vision. The result? Digital products that perform, convert, and leave an impression that lasts.
            </p>
          </div>

          {/* Testimonial card */}
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "24px",
              padding: "40px",
              backdropFilter: "blur(20px)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Quote mark */}
            <div
              style={{
                position: "absolute",
                top: "20px",
                right: "28px",
                fontSize: "80px",
                fontWeight: 900,
                color: "rgba(168,85,247,0.15)",
                lineHeight: 1,
                fontFamily: "Georgia, serif",
                userSelect: "none",
              }}
            >
              "
            </div>
            {/* Glow */}
            <div style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "200px",
              height: "200px",
              background: "radial-gradient(ellipse at top left, rgba(168,85,247,0.08) 0%, transparent 70%)",
              pointerEvents: "none",
            }} />
            <p
              style={{
                color: "rgba(255,255,255,0.75)",
                fontSize: "16px",
                lineHeight: 1.8,
                fontFamily: "'Inter', sans-serif",
                fontStyle: "italic",
                marginBottom: "32px",
                position: "relative",
                zIndex: 1,
              }}
            >
              "{testimonial.quote}"
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #4facfe 0%, #a855f7 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "white",
                  flexShrink: 0,
                }}
              >
                {testimonial.avatar}
              </div>
              <div>
                <div style={{ color: "white", fontSize: "15px", fontWeight: 600 }}>{testimonial.author}</div>
                <div style={{ color: "rgba(255,255,255,0.35)", fontSize: "13px", fontFamily: "'Inter', sans-serif" }}>{testimonial.title}</div>
              </div>
              {/* 5 stars */}
              <div style={{ marginLeft: "auto", display: "flex", gap: "3px" }}>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#f59e0b">
                    <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.4l-3.7 1.9.7-4.1-3-2.9 4.2-.7z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Highlights grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "20px",
          }}
        >
          {highlights.map((item, i) => {
            const Icon = item.icon;
            const isHovered = hovered === i;

            return (
              <div
                key={i}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: isHovered
                    ? `linear-gradient(135deg, ${item.color}0D 0%, rgba(255,255,255,0.02) 100%)`
                    : "rgba(255,255,255,0.025)",
                  border: `1px solid ${isHovered ? item.color + "30" : "rgba(255,255,255,0.06)"}`,
                  borderRadius: "20px",
                  padding: "32px",
                  display: "flex",
                  gap: "20px",
                  transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
                  transform: isHovered ? "translateY(-3px)" : "translateY(0)",
                  boxShadow: isHovered ? `0 12px 40px rgba(0,0,0,0.3), 0 0 20px ${item.glow}` : "none",
                  cursor: "default",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* BG glow */}
                {isHovered && (
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "160px",
                    height: "160px",
                    background: `radial-gradient(ellipse at top left, ${item.glow} 0%, transparent 70%)`,
                    pointerEvents: "none",
                  }} />
                )}

                {/* Icon */}
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "14px",
                    background: `${item.color}15`,
                    border: `1px solid ${item.color}25`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "all 0.3s ease",
                    boxShadow: isHovered ? `0 0 20px ${item.glow}` : "none",
                  }}
                >
                  <Icon size={22} style={{ color: item.color }} />
                </div>

                <div>
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      color: isHovered ? "#fff" : "rgba(255,255,255,0.85)",
                      marginBottom: "8px",
                      letterSpacing: "-0.3px",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      fontSize: "13px",
                      lineHeight: 1.8,
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust logos row */}
        <div style={{ marginTop: "80px", textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "32px" }}>
            Trusted by companies worldwide
          </p>
          <div style={{ display: "flex", gap: "48px", justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
            {["Luminary", "NovaCorp", "Helix AI", "Meridian", "Vaultify", "Orbis"].map((name, i) => (
              <span
                key={i}
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                  letterSpacing: "-0.5px",
                  color: "rgba(255,255,255,0.12)",
                  transition: "color 0.3s ease",
                  cursor: "default",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.12)")}
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 1024px) {
            .why-header-grid {
              grid-template-columns: 1fr !important;
              gap: 48px !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}