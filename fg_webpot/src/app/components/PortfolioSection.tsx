import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const projects = [
  {
    id: 1,
    title: "Luminary Dashboard",
    category: "Web Application",
    tag: "UI/UX + Dev",
    image: "https://images.unsplash.com/photo-1634084462412-b54873c0a56d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBhcHBsaWNhdGlvbiUyMGRhc2hib2FyZCUyMFVJJTIwZGVzaWdufGVufDF8fHx8MTc3NjI1MTMzNnww&ixlib=rb-4.1.0&q=80&w=1080",
    accentColor: "#4facfe",
    size: "large",
    year: "2024",
  },
  {
    id: 2,
    title: "Noir Commerce",
    category: "E-Commerce",
    tag: "Full Stack",
    image: "https://images.unsplash.com/photo-1622212993957-6d4631a0ba8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlJTIwZGVzaWduJTIwZGFyayUyMG1pbmltYWx8ZW58MXx8fHwxNzc2MjUxMzM2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    accentColor: "#a855f7",
    size: "medium",
    year: "2024",
  },
  {
    id: 3,
    title: "Pulse Mobile",
    category: "Mobile App",
    tag: "React Native",
    image: "https://images.unsplash.com/photo-1632156574595-58294ad57a7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ24lMjBwb3J0Zm9saW8lMjBkYXJrJTIwdGhlbWV8ZW58MXx8fHwxNzc2MjUxMzM4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    accentColor: "#f472b6",
    size: "medium",
    year: "2025",
  },
  {
    id: 4,
    title: "Studio Agency",
    category: "Agency Website",
    tag: "WebGL + Animations",
    image: "https://images.unsplash.com/photo-1672957581665-bdc4a16b8347?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwbW9kZXJuJTIwd2ViJTIwZGVzaWduJTIwYWdlbmN5JTIwd29ya3NwYWNlfGVufDF8fHx8MTc3NjI1MTMzM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    accentColor: "#34d399",
    size: "large",
    year: "2025",
  },
];

const filters = ["All", "Web App", "E-Commerce", "Mobile", "Agency"];

export function PortfolioSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <section
      id="portfolio"
      style={{
        background: "#06060c",
        padding: "140px 0",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      {/* BG accent */}
      <div style={{
        position: "absolute",
        right: "-200px",
        top: "50%",
        transform: "translateY(-50%)",
        width: "600px",
        height: "600px",
        background: "radial-gradient(ellipse, rgba(79,172,254,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 40px" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "64px", flexWrap: "wrap", gap: "32px" }}>
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "rgba(52,211,153,0.08)",
                border: "1px solid rgba(52,211,153,0.2)",
                borderRadius: "100px",
                padding: "6px 20px",
                marginBottom: "24px",
              }}
            >
              <span style={{ color: "#34d399", fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                Selected Work
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
                maxWidth: "480px",
              }}
            >
              Our Best<br />Projects
            </h2>
          </div>
          <a
            href="#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "rgba(255,255,255,0.5)",
              fontSize: "14px",
              fontWeight: 500,
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.1)",
              padding: "12px 24px",
              borderRadius: "100px",
              transition: "all 0.3s ease",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "white";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(255,255,255,0.5)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            View All Projects
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "48px", flexWrap: "wrap" }}>
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              style={{
                padding: "8px 20px",
                borderRadius: "100px",
                border: `1px solid ${activeFilter === filter ? "rgba(79,172,254,0.4)" : "rgba(255,255,255,0.08)"}`,
                background: activeFilter === filter
                  ? "rgba(79,172,254,0.1)"
                  : "rgba(255,255,255,0.03)",
                color: activeFilter === filter ? "#4facfe" : "rgba(255,255,255,0.45)",
                fontSize: "13px",
                fontWeight: 500,
                cursor: "pointer",
                fontFamily: "'Space Grotesk', sans-serif",
                transition: "all 0.3s ease",
              }}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gridTemplateRows: "auto",
            gap: "20px",
          }}
        >
          {projects.map((project, i) => {
            const isHovered = hovered === project.id;
            // Layout pattern: large, medium+medium, large
            const gridColumn = i === 0
              ? "1 / 8"
              : i === 1
              ? "8 / 13"
              : i === 2
              ? "1 / 6"
              : "6 / 13";

            return (
              <div
                key={project.id}
                onMouseEnter={() => setHovered(project.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  gridColumn,
                  borderRadius: "20px",
                  overflow: "hidden",
                  position: "relative",
                  cursor: "pointer",
                  height: i === 0 || i === 3 ? "380px" : "300px",
                  transition: "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.5s ease",
                  transform: isHovered ? "scale(1.01)" : "scale(1)",
                  boxShadow: isHovered
                    ? `0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px ${project.accentColor}33`
                    : "0 4px 20px rgba(0,0,0,0.3)",
                }}
                className="portfolio-card"
              >
                {/* Image */}
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.7s cubic-bezier(0.23, 1, 0.32, 1), filter 0.5s ease",
                    transform: isHovered ? "scale(1.06)" : "scale(1)",
                    filter: isHovered ? "brightness(0.7) saturate(1.1)" : "brightness(0.5) saturate(0.8)",
                  }}
                />

                {/* Overlay gradient */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: isHovered
                      ? `linear-gradient(to top, rgba(6,6,12,0.95) 0%, rgba(6,6,12,0.3) 60%, transparent 100%)`
                      : `linear-gradient(to top, rgba(6,6,12,0.85) 0%, rgba(6,6,12,0.2) 50%, transparent 100%)`,
                    transition: "all 0.5s ease",
                  }}
                />

                {/* Accent top border */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: `linear-gradient(90deg, transparent, ${project.accentColor}, transparent)`,
                    opacity: isHovered ? 1 : 0,
                    transition: "opacity 0.4s ease",
                  }}
                />

                {/* Tag top right */}
                <div
                  style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    background: "rgba(0,0,0,0.6)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "100px",
                    padding: "6px 14px",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.7)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {project.tag}
                </div>

                {/* Content bottom */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "28px",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: project.accentColor,
                        marginBottom: "6px",
                        opacity: isHovered ? 1 : 0.8,
                        transition: "opacity 0.3s ease",
                      }}
                    >
                      {project.category} · {project.year}
                    </div>
                    <h3
                      style={{
                        fontSize: "clamp(18px, 2vw, 24px)",
                        fontWeight: 800,
                        color: "white",
                        letterSpacing: "-0.5px",
                        lineHeight: 1.2,
                      }}
                    >
                      {project.title}
                    </h3>
                  </div>

                  {/* Arrow button */}
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      background: isHovered
                        ? project.accentColor
                        : "rgba(255,255,255,0.08)",
                      border: `1px solid ${isHovered ? "transparent" : "rgba(255,255,255,0.1)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
                      transform: isHovered ? "scale(1.1) rotate(-10deg)" : "scale(1) rotate(0deg)",
                      flexShrink: 0,
                      boxShadow: isHovered ? `0 0 20px ${project.accentColor}60` : "none",
                    }}
                  >
                    <ArrowUpRight
                      size={18}
                      style={{ color: "white" }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile: stack all cards */}
      <style>{`
        @media (max-width: 1024px) {
          .portfolio-card {
            grid-column: 1 / -1 !important;
            height: 280px !important;
          }
        }
      `}</style>
    </section>
  );
}
