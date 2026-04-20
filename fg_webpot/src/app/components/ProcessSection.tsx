import { useState } from "react";
import { Code2, Layers, Palette, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Code2,
    title: "Code",
    subtitle: "Foundation",
    description:
      "We architect robust, scalable code systems. Clean architecture, component-driven development, and performance-first thinking form the bedrock of every project.",
    color: "#4facfe",
    glow: "rgba(79,172,254,0.3)",
    tags: ["React", "TypeScript", "API Design"],
  },
  {
    number: "02",
    icon: Layers,
    title: "Wireframe",
    subtitle: "Structure",
    description:
      "From architecture to blueprint. We map out every interaction, user flow, and layout decision before a single pixel is painted — eliminating surprises.",
    color: "#818cf8",
    glow: "rgba(129,140,248,0.3)",
    tags: ["UX Flow", "Prototyping", "Testing"],
  },
  {
    number: "03",
    icon: Palette,
    title: "Design",
    subtitle: "Craft",
    description:
      "Where function becomes form. We apply visual systems, motion design, and brand language to create interfaces that feel as good as they look.",
    color: "#a855f7",
    glow: "rgba(168,85,247,0.3)",
    tags: ["Figma", "Motion", "Brand"],
  },
  {
    number: "04",
    icon: Rocket,
    title: "Launch",
    subtitle: "Delivery",
    description:
      "Zero-friction deployment with continuous monitoring. We optimize, test across all devices, and hand over a product that's ready to make an impact.",
    color: "#f472b6",
    glow: "rgba(244,114,182,0.3)",
    tags: ["CI/CD", "SEO", "Analytics"],
  },
];

export function ProcessSection() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section
      id="process"
      style={{
        background: "linear-gradient(180deg, #06060c 0%, #080810 50%, #06060c 100%)",
        padding: "140px 0",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "900px",
          height: "500px",
          background: "radial-gradient(ellipse at bottom, rgba(79,172,254,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 40px" }}>
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "80px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(79,172,254,0.08)",
              border: "1px solid rgba(79,172,254,0.2)",
              borderRadius: "100px",
              padding: "6px 20px",
              marginBottom: "24px",
            }}
          >
            <span style={{ color: "#4facfe", fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              How We Work
            </span>
          </div>
          <h2
            style={{
              fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 800,
              letterSpacing: "-2px",
              lineHeight: 1.1,
              marginBottom: "20px",
              background: "linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.75) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Our Process
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: "17px",
              maxWidth: "480px",
              margin: "0 auto",
              lineHeight: 1.7,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Four deliberate phases that transform your vision into a market-ready digital product.
          </p>
        </div>

        {/* Steps — desktop horizontal */}
        <div
          style={{
            position: "relative",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "0",
          }}
          className="hidden lg:grid"
        >
          {/* Connecting line */}
          <div
            style={{
              position: "absolute",
              top: "52px",
              left: "calc(12.5% + 24px)",
              right: "calc(12.5% + 24px)",
              height: "1px",
              background: "linear-gradient(90deg, rgba(79,172,254,0.4), rgba(129,140,248,0.4), rgba(168,85,247,0.4), rgba(244,114,182,0.4))",
              zIndex: 0,
            }}
          />

          {steps.map((step, i) => {
            const Icon = step.icon;
            const isActive = activeStep === i;

            return (
              <div
                key={i}
                onMouseEnter={() => setActiveStep(i)}
                onMouseLeave={() => setActiveStep(null)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "0 24px",
                  cursor: "default",
                }}
              >
                {/* Step icon circle */}
                <div
                  style={{
                    width: "104px",
                    height: "104px",
                    borderRadius: "50%",
                    background: isActive
                      ? `linear-gradient(135deg, ${step.color}22 0%, ${step.color}11 100%)`
                      : "rgba(255,255,255,0.03)",
                    border: `1px solid ${isActive ? step.color + "55" : "rgba(255,255,255,0.08)"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "32px",
                    position: "relative",
                    zIndex: 1,
                    transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
                    boxShadow: isActive ? `0 0 40px ${step.glow}, 0 0 80px ${step.glow}` : "0 4px 20px rgba(0,0,0,0.3)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  {/* Number badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: "-6px",
                      right: "-6px",
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: isActive
                        ? `linear-gradient(135deg, ${step.color} 0%, ${step.color}cc 100%)`
                        : "rgba(255,255,255,0.06)",
                      border: `1px solid ${isActive ? step.color : "rgba(255,255,255,0.1)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "10px",
                      fontWeight: 700,
                      color: isActive ? "white" : "rgba(255,255,255,0.4)",
                      transition: "all 0.4s ease",
                      boxShadow: isActive ? `0 0 12px ${step.glow}` : "none",
                    }}
                  >
                    {step.number}
                  </div>
                  <Icon
                    size={32}
                    style={{
                      color: isActive ? step.color : "rgba(255,255,255,0.3)",
                      transition: "all 0.4s ease",
                      filter: isActive ? `drop-shadow(0 0 8px ${step.color}88)` : "none",
                    }}
                  />
                </div>

                {/* Title */}
                <div style={{ marginBottom: "12px" }}>
                  <span
                    style={{
                      display: "block",
                      fontSize: "10px",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: isActive ? step.color : "rgba(255,255,255,0.25)",
                      marginBottom: "6px",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {step.subtitle}
                  </span>
                  <span
                    style={{
                      fontSize: "26px",
                      fontWeight: 800,
                      letterSpacing: "-0.5px",
                      color: isActive ? "#fff" : "rgba(255,255,255,0.8)",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {step.title}
                  </span>
                </div>

                {/* Description */}
                <p
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    fontSize: "13px",
                    lineHeight: 1.8,
                    fontFamily: "'Inter', sans-serif",
                    marginBottom: "20px",
                    minHeight: "96px",
                  }}
                >
                  {step.description}
                </p>

                {/* Tags */}
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "center" }}>
                  {step.tags.map((tag, j) => (
                    <span
                      key={j}
                      style={{
                        fontSize: "11px",
                        fontWeight: 500,
                        color: isActive ? step.color : "rgba(255,255,255,0.3)",
                        background: isActive ? `${step.color}12` : "rgba(255,255,255,0.04)",
                        border: `1px solid ${isActive ? step.color + "30" : "rgba(255,255,255,0.07)"}`,
                        padding: "4px 10px",
                        borderRadius: "100px",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile vertical layout */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }} className="lg:hidden">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: "24px",
                  position: "relative",
                  paddingBottom: "40px",
                }}
              >
                {/* Left: Line + Icon */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "50%",
                      background: `${step.color}18`,
                      border: `1px solid ${step.color}40`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: `0 0 20px ${step.glow}`,
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={22} style={{ color: step.color }} />
                  </div>
                  {i < steps.length - 1 && (
                    <div style={{ width: "1px", flex: 1, background: `linear-gradient(to bottom, ${step.color}40, transparent)`, marginTop: "8px" }} />
                  )}
                </div>

                {/* Right: Content */}
                <div style={{ paddingTop: "12px" }}>
                  <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: step.color, display: "block", marginBottom: "4px" }}>
                    {step.number} — {step.subtitle}
                  </span>
                  <h3 style={{ fontSize: "22px", fontWeight: 800, color: "white", marginBottom: "10px", letterSpacing: "-0.5px" }}>
                    {step.title}
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "14px", lineHeight: 1.7, fontFamily: "'Inter', sans-serif", marginBottom: "14px" }}>
                    {step.description}
                  </p>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {step.tags.map((tag, j) => (
                      <span
                        key={j}
                        style={{
                          fontSize: "11px",
                          fontWeight: 500,
                          color: step.color,
                          background: `${step.color}12`,
                          border: `1px solid ${step.color}30`,
                          padding: "4px 10px",
                          borderRadius: "100px",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
