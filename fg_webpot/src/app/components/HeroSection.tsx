import { useEffect, useRef, useState } from "react";
import { ArrowRight, Play } from "lucide-react";

const codeLines = [
  { indent: 0, tokens: [{ text: "const ", color: "#a855f7" }, { text: "app", color: "#4facfe" }, { text: " = () => {", color: "#fff" }] },
  { indent: 1, tokens: [{ text: "return", color: "#a855f7" }, { text: " (", color: "#fff" }] },
  { indent: 2, tokens: [{ text: "<", color: "#4facfe" }, { text: "Layout", color: "#34d399" }, { text: ">", color: "#4facfe" }] },
  { indent: 3, tokens: [{ text: "<", color: "#4facfe" }, { text: "Hero", color: "#34d399" }, { text: " glow", color: "#f59e0b" }, { text: " />", color: "#4facfe" }] },
  { indent: 3, tokens: [{ text: "<", color: "#4facfe" }, { text: "Grid", color: "#34d399" }, { text: " cols", color: "#f59e0b" }, { text: "=", color: "#fff" }, { text: "{3}", color: "#4facfe" }, { text: " />", color: "#4facfe" }] },
  { indent: 2, tokens: [{ text: "</", color: "#4facfe" }, { text: "Layout", color: "#34d399" }, { text: ">", color: "#4facfe" }] },
  { indent: 1, tokens: [{ text: ")", color: "#fff" }] },
  { indent: 0, tokens: [{ text: "}", color: "#fff" }] },
];

function FloatingParticle({ style }: { style: React.CSSProperties }) {
  return (
    <div
      style={{
        position: "absolute",
        width: "4px",
        height: "4px",
        borderRadius: "50%",
        background: "linear-gradient(135deg, #4facfe, #a855f7)",
        opacity: 0.6,
        ...style,
      }}
    />
  );
}

export function HeroSection() {
  const [typed, setTyped] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTyped((t) => {
        if (t >= codeLines.length) {
          clearInterval(intervalRef.current!);
          return t;
        }
        return t + 1;
      });
    }, 180);
    return () => clearInterval(intervalRef.current!);
  }, []);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        background: "#06060c",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      {/* Background radial glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -55%)",
          width: "900px",
          height: "900px",
          background: "radial-gradient(ellipse at center, rgba(79,172,254,0.08) 0%, rgba(168,85,247,0.06) 40%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      {/* Top left glow */}
      <div
        style={{
          position: "absolute",
          top: "-100px",
          left: "-100px",
          width: "500px",
          height: "500px",
          background: "radial-gradient(ellipse, rgba(79,172,254,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      {/* Bottom right glow */}
      <div
        style={{
          position: "absolute",
          bottom: "-100px",
          right: "-100px",
          width: "500px",
          height: "500px",
          background: "radial-gradient(ellipse, rgba(168,85,247,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Floating particles */}
      <FloatingParticle style={{ top: "20%", left: "15%", animation: "float1 6s ease-in-out infinite" }} />
      <FloatingParticle style={{ top: "35%", left: "8%", animation: "float2 8s ease-in-out infinite", width: "6px", height: "6px" }} />
      <FloatingParticle style={{ top: "70%", left: "20%", animation: "float1 7s ease-in-out infinite reverse" }} />
      <FloatingParticle style={{ top: "15%", right: "18%", animation: "float2 5s ease-in-out infinite", width: "3px", height: "3px" }} />
      <FloatingParticle style={{ top: "60%", right: "12%", animation: "float1 9s ease-in-out infinite" }} />
      <FloatingParticle style={{ top: "80%", right: "25%", animation: "float2 6s ease-in-out infinite reverse", width: "5px", height: "5px" }} />

      {/* Grid lines overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(rgba(79,172,254,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(79,172,254,0.03) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1320px",
          width: "100%",
          margin: "0 auto",
          padding: "120px 40px 80px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(79, 172, 254, 0.08)",
            border: "1px solid rgba(79, 172, 254, 0.2)",
            borderRadius: "100px",
            padding: "6px 16px 6px 8px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #4facfe, #a855f7)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "white" }} />
          </div>
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px", fontWeight: 500, letterSpacing: "0.04em" }}>
            Award-Winning Web Development Studio
          </span>
        </div>

        {/* Main headline */}
        <h1
          style={{
            fontSize: "clamp(48px, 8vw, 112px)",
            fontWeight: 800,
            letterSpacing: "-3px",
            lineHeight: 1.0,
            textAlign: "center",
            marginBottom: "32px",
            maxWidth: "960px",
          }}
        >
          <span
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,0.85) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Where Design
          </span>
          <br />
          <span
            style={{
              background: "linear-gradient(135deg, #4facfe 0%, #a855f7 60%, #f472b6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "block",
              paddingBottom: "8px",
            }}
          >
            Meets Code
          </span>
        </h1>

        {/* Sub text */}
        <p
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "clamp(16px, 2vw, 20px)",
            lineHeight: 1.7,
            textAlign: "center",
            maxWidth: "560px",
            marginBottom: "56px",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
          }}
        >
          We craft digital experiences that transform complex code into
          breathtaking interfaces. Premium web development, pixel-perfect design.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center", marginBottom: "96px" }}>
          <a
            href="#services"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: "linear-gradient(135deg, #4facfe 0%, #a855f7 100%)",
              color: "#fff",
              fontSize: "15px",
              fontWeight: 600,
              padding: "16px 32px",
              borderRadius: "100px",
              textDecoration: "none",
              letterSpacing: "0.02em",
              boxShadow: "0 8px 40px rgba(79, 172, 254, 0.35), 0 0 0 1px rgba(255,255,255,0.1) inset",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.boxShadow = "0 12px 60px rgba(79, 172, 254, 0.55), 0 0 0 1px rgba(255,255,255,0.15) inset";
              el.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.boxShadow = "0 8px 40px rgba(79, 172, 254, 0.35), 0 0 0 1px rgba(255,255,255,0.1) inset";
              el.style.transform = "translateY(0)";
            }}
          >
            View Our Work
            <ArrowRight size={16} />
          </a>
          <a
            href="#process"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              background: "rgba(255,255,255,0.04)",
              color: "rgba(255,255,255,0.8)",
              fontSize: "15px",
              fontWeight: 600,
              padding: "16px 32px",
              borderRadius: "100px",
              textDecoration: "none",
              letterSpacing: "0.02em",
              border: "1px solid rgba(255,255,255,0.1)",
              backdropFilter: "blur(8px)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.background = "rgba(255,255,255,0.08)";
              el.style.borderColor = "rgba(255,255,255,0.2)";
              el.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.background = "rgba(255,255,255,0.04)";
              el.style.borderColor = "rgba(255,255,255,0.1)";
              el.style.transform = "translateY(0)";
            }}
          >
            <Play size={15} fill="currentColor" />
            See Our Process
          </a>
        </div>

        {/* Code → UI Visual */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(16px, 3vw, 48px)",
            width: "100%",
            maxWidth: "960px",
            position: "relative",
          }}
          className="flex-col md:flex-row"
        >
          {/* Code Card */}
          <div
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "20px",
              padding: "24px",
              backdropFilter: "blur(20px)",
              boxShadow: "0 4px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(79,172,254,0.1) inset",
              minWidth: 0,
            }}
          >
            {/* Terminal bar */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "20px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f57" }} />
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ffbd2e" }} />
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#28ca40" }} />
              <span style={{ marginLeft: "auto", color: "rgba(255,255,255,0.25)", fontSize: "11px", fontFamily: "'JetBrains Mono', monospace" }}>app.tsx</span>
            </div>
            {/* Code lines */}
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(10px, 1.2vw, 13px)", lineHeight: "1.9" }}>
              {codeLines.map((line, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    opacity: i < typed ? 1 : 0,
                    transform: i < typed ? "translateX(0)" : "translateX(-8px)",
                    transition: "all 0.3s ease",
                    paddingLeft: `${line.indent * 16}px`,
                  }}
                >
                  <span style={{ color: "rgba(255,255,255,0.2)", marginRight: "16px", minWidth: "20px", fontSize: "11px" }}>{i + 1}</span>
                  {line.tokens.map((token, j) => (
                    <span key={j} style={{ color: token.color }}>{token.text}</span>
                  ))}
                </div>
              ))}
              {/* Cursor */}
              <div style={{ display: "flex", alignItems: "center", paddingLeft: "36px" }}>
                <span
                  style={{
                    width: "2px",
                    height: "16px",
                    background: "#4facfe",
                    display: "inline-block",
                    animation: "blink 1s step-end infinite",
                    boxShadow: "0 0 8px rgba(79,172,254,0.8)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Center Glow Connector */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #4facfe 0%, #a855f7 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 40px rgba(79, 172, 254, 0.5), 0 0 80px rgba(168,85,247,0.3)",
                animation: "pulse-glow 3s ease-in-out infinite",
                position: "relative",
              }}
            >
              {/* Rings */}
              <div style={{
                position: "absolute",
                width: "90px", height: "90px",
                borderRadius: "50%",
                border: "1px solid rgba(79,172,254,0.3)",
                animation: "ring-expand 3s ease-in-out infinite",
              }} />
              <div style={{
                position: "absolute",
                width: "120px", height: "120px",
                borderRadius: "50%",
                border: "1px solid rgba(168,85,247,0.15)",
                animation: "ring-expand 3s ease-in-out infinite 0.5s",
              }} />
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M6 10L10 14L6 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 18H22" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M14 10H22" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.5"/>
              </svg>
            </div>
            {/* Horizontal connectors */}
            <div style={{ display: "none" }} className="hidden md:block" />
          </div>

          {/* UI Card */}
          <div
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "20px",
              padding: "24px",
              backdropFilter: "blur(20px)",
              boxShadow: "0 4px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(168,85,247,0.1) inset",
              minWidth: 0,
            }}
          >
            {/* Browser bar */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
              <div style={{ display: "flex", gap: "6px" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
              </div>
              <div style={{ flex: 1, height: "24px", background: "rgba(255,255,255,0.05)", borderRadius: "6px", display: "flex", alignItems: "center", padding: "0 10px" }}>
                <span style={{ color: "rgba(255,255,255,0.3)", fontSize: "10px", fontFamily: "'Inter', sans-serif" }}>webpot.studio</span>
              </div>
            </div>
            {/* UI Elements */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {/* Hero bar */}
              <div style={{ height: "48px", borderRadius: "10px", background: "linear-gradient(135deg, rgba(79,172,254,0.15) 0%, rgba(168,85,247,0.1) 100%)", border: "1px solid rgba(79,172,254,0.15)", display: "flex", alignItems: "center", padding: "0 16px", gap: "8px" }}>
                <div style={{ width: "24px", height: "24px", borderRadius: "50%", background: "linear-gradient(135deg, #4facfe, #a855f7)", boxShadow: "0 0 12px rgba(79,172,254,0.4)" }} />
                <div style={{ flex: 1 }}>
                  <div style={{ width: "60%", height: "6px", borderRadius: "3px", background: "rgba(255,255,255,0.2)", marginBottom: "4px" }} />
                  <div style={{ width: "40%", height: "4px", borderRadius: "2px", background: "rgba(255,255,255,0.1)" }} />
                </div>
                <div style={{ width: "60px", height: "24px", borderRadius: "12px", background: "linear-gradient(135deg, #4facfe, #a855f7)", boxShadow: "0 0 12px rgba(79,172,254,0.3)" }} />
              </div>
              {/* Cards row */}
              <div style={{ display: "flex", gap: "8px" }}>
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: "60px",
                      borderRadius: "8px",
                      background: i === 0
                        ? "linear-gradient(135deg, rgba(79,172,254,0.12), rgba(168,85,247,0.08))"
                        : "rgba(255,255,255,0.03)",
                      border: i === 0 ? "1px solid rgba(79,172,254,0.2)" : "1px solid rgba(255,255,255,0.06)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      padding: "8px",
                      gap: "4px",
                    }}
                  >
                    <div style={{ width: "70%", height: "5px", borderRadius: "2px", background: i === 0 ? "rgba(79,172,254,0.4)" : "rgba(255,255,255,0.15)" }} />
                    <div style={{ width: "50%", height: "4px", borderRadius: "2px", background: "rgba(255,255,255,0.08)" }} />
                    <div style={{ width: "80%", height: "4px", borderRadius: "2px", background: "rgba(255,255,255,0.06)" }} />
                  </div>
                ))}
              </div>
              {/* Image placeholder */}
              <div style={{ height: "48px", borderRadius: "8px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", padding: "0 12px", gap: "10px" }}>
                <div style={{ width: "32px", height: "32px", borderRadius: "6px", background: "linear-gradient(135deg, rgba(168,85,247,0.3), rgba(79,172,254,0.2))" }} />
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
                  <div style={{ width: "55%", height: "5px", borderRadius: "2px", background: "rgba(255,255,255,0.15)" }} />
                  <div style={{ width: "35%", height: "4px", borderRadius: "2px", background: "rgba(255,255,255,0.07)" }} />
                </div>
                <div style={{ width: "40px", height: "20px", borderRadius: "10px", background: "rgba(79,172,254,0.2)", border: "1px solid rgba(79,172,254,0.3)" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: "0",
            marginTop: "80px",
            width: "100%",
            maxWidth: "700px",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          {[
            { value: "150+", label: "Projects Delivered" },
            { value: "98%", label: "Client Satisfaction" },
            { value: "8yr", label: "Industry Experience" },
            { value: "40+", label: "Awards Won" },
          ].map((stat, i) => (
            <div
              key={i}
              style={{
                textAlign: "center",
                padding: "16px 24px",
                position: "relative",
              }}
            >
              {i > 0 && (
                <div style={{ position: "absolute", left: 0, top: "25%", height: "50%", width: "1px", background: "rgba(255,255,255,0.08)" }} />
              )}
              <div
                style={{
                  fontSize: "clamp(28px, 4vw, 40px)",
                  fontWeight: 800,
                  letterSpacing: "-1px",
                  background: "linear-gradient(135deg, #4facfe 0%, #a855f7 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: 1.1,
                  marginBottom: "6px",
                }}
              >
                {stat.value}
              </div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "12px", fontFamily: "'Inter', sans-serif", letterSpacing: "0.04em" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-12px) translateX(6px); }
          66% { transform: translateY(6px) translateX(-4px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-18px) translateX(8px); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 40px rgba(79, 172, 254, 0.5), 0 0 80px rgba(168,85,247,0.3); }
          50% { box-shadow: 0 0 60px rgba(79, 172, 254, 0.7), 0 0 100px rgba(168,85,247,0.5); }
        }
        @keyframes ring-expand {
          0% { transform: scale(0.95); opacity: 0.6; }
          50% { transform: scale(1.05); opacity: 0.3; }
          100% { transform: scale(0.95); opacity: 0.6; }
        }
      `}</style>
    </section>
  );
}