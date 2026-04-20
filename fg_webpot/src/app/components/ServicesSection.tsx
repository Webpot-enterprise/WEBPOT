import { useState } from "react";
import { Check, Zap, Star, Crown } from "lucide-react";

const plans = [
  {
    id: "basic",
    icon: Zap,
    label: "Basic",
    price: "$2,400",
    period: "/ project",
    tagline: "Perfect start",
    description: "Clean, functional websites for startups and small businesses ready to establish their digital presence.",
    features: [
      "5-page responsive website",
      "Mobile-first design",
      "Basic SEO setup",
      "Contact form integration",
      "Performance optimization",
      "2 rounds of revisions",
    ],
    accent: "rgba(79,172,254,0.7)",
    gradient: "linear-gradient(135deg, rgba(79,172,254,0.12) 0%, rgba(79,172,254,0.04) 100%)",
    borderGlow: "rgba(79,172,254,0.2)",
    highlighted: false,
  },
  {
    id: "starter",
    icon: Star,
    label: "Starter",
    price: "$5,800",
    period: "/ project",
    tagline: "Most popular",
    description: "Advanced web solutions with custom animations and integrations for growing brands that demand excellence.",
    features: [
      "Up to 15-page website",
      "Custom micro-animations",
      "CMS integration",
      "E-commerce ready",
      "Advanced SEO strategy",
      "Analytics dashboard",
      "4 rounds of revisions",
      "3-month support",
    ],
    accent: "rgba(168,85,247,0.9)",
    gradient: "linear-gradient(135deg, rgba(79,172,254,0.18) 0%, rgba(168,85,247,0.15) 100%)",
    borderGlow: "rgba(168,85,247,0.35)",
    highlighted: true,
  },
  {
    id: "premium",
    icon: Crown,
    label: "Premium",
    price: "$12,000+",
    period: "/ project",
    tagline: "Enterprise grade",
    description: "Full-scale digital products and award-level web experiences built for industry leaders and ambitious brands.",
    features: [
      "Unlimited pages",
      "Custom web application",
      "3D / WebGL animations",
      "Full brand system",
      "API & backend dev",
      "Priority deployment",
      "Unlimited revisions",
      "12-month support",
      "Dedicated team",
    ],
    accent: "rgba(244,114,182,0.8)",
    gradient: "linear-gradient(135deg, rgba(168,85,247,0.12) 0%, rgba(244,114,182,0.08) 100%)",
    borderGlow: "rgba(244,114,182,0.2)",
    highlighted: false,
  },
];

export function ServicesSection() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      id="services"
      style={{
        background: "#06060c",
        padding: "140px 0",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      {/* Subtle background gradient */}
      <div
        style={{
          position: "absolute",
          top: "0",
          left: "50%",
          transform: "translateX(-50%)",
          width: "800px",
          height: "400px",
          background: "radial-gradient(ellipse at center top, rgba(168,85,247,0.06) 0%, transparent 70%)",
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
              background: "rgba(168,85,247,0.08)",
              border: "1px solid rgba(168,85,247,0.2)",
              borderRadius: "100px",
              padding: "6px 20px",
              marginBottom: "24px",
            }}
          >
            <span style={{ color: "#a855f7", fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Services & Pricing
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
            Choose Your Plan
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
            From lean MVPs to full-scale digital platforms — every tier is crafted for impact.
          </p>
        </div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
            alignItems: "start",
          }}
        >
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isHovered = hovered === plan.id;
            const isHighlighted = plan.highlighted;

            return (
              <div
                key={plan.id}
                onMouseEnter={() => setHovered(plan.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: isHovered || isHighlighted
                    ? plan.gradient
                    : "rgba(255,255,255,0.025)",
                  border: `1px solid ${isHovered || isHighlighted ? plan.borderGlow : "rgba(255,255,255,0.07)"}`,
                  borderRadius: "24px",
                  padding: "40px 36px",
                  position: "relative",
                  backdropFilter: "blur(20px)",
                  transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
                  transform: isHighlighted
                    ? "translateY(-8px)"
                    : isHovered ? "translateY(-4px)" : "translateY(0)",
                  boxShadow: isHighlighted
                    ? `0 20px 80px rgba(168,85,247,0.2), 0 4px 20px rgba(0,0,0,0.4)`
                    : isHovered
                    ? `0 16px 60px rgba(0,0,0,0.3), 0 0 0 1px ${plan.borderGlow} inset`
                    : "0 4px 20px rgba(0,0,0,0.2)",
                  cursor: "default",
                  overflow: "hidden",
                }}
              >
                {/* Most popular badge */}
                {isHighlighted && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-1px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "linear-gradient(135deg, #4facfe 0%, #a855f7 100%)",
                      color: "white",
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      padding: "6px 20px",
                      borderRadius: "0 0 12px 12px",
                      boxShadow: "0 4px 20px rgba(168,85,247,0.4)",
                    }}
                  >
                    Most Popular
                  </div>
                )}

                {/* Glow top-right corner */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "180px",
                    height: "180px",
                    background: `radial-gradient(ellipse at top right, ${plan.accent.replace(")", ", 0.15)")} 0%, transparent 70%)`,
                    pointerEvents: "none",
                    transition: "opacity 0.4s ease",
                    opacity: isHovered || isHighlighted ? 1 : 0,
                  }}
                />

                {/* Icon */}
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "14px",
                    background: `${plan.accent.replace(")", ", 0.12)")}`,
                    border: `1px solid ${plan.accent.replace(")", ", 0.25)")}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "28px",
                    transition: "all 0.3s ease",
                    boxShadow: isHovered || isHighlighted ? `0 0 20px ${plan.accent.replace(")", ", 0.2)")}` : "none",
                  }}
                >
                  <Icon size={22} style={{ color: plan.accent }} />
                </div>

                {/* Label + tagline */}
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                  <span style={{ fontSize: "20px", fontWeight: 700, color: "rgba(255,255,255,0.95)", letterSpacing: "-0.5px" }}>
                    {plan.label}
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: plan.accent,
                      background: `${plan.accent.replace(")", ", 0.1)")}`,
                      border: `1px solid ${plan.accent.replace(")", ", 0.2)")}`,
                      padding: "3px 10px",
                      borderRadius: "100px",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {plan.tagline}
                  </span>
                </div>

                {/* Description */}
                <p
                  style={{
                    color: "rgba(255,255,255,0.45)",
                    fontSize: "14px",
                    lineHeight: 1.7,
                    marginBottom: "32px",
                    fontFamily: "'Inter', sans-serif",
                    minHeight: "56px",
                  }}
                >
                  {plan.description}
                </p>

                {/* Price */}
                <div style={{ marginBottom: "32px" }}>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: "4px" }}>
                    <span
                      style={{
                        fontSize: "clamp(36px, 4vw, 48px)",
                        fontWeight: 800,
                        letterSpacing: "-2px",
                        color: "#fff",
                        lineHeight: 1,
                      }}
                    >
                      {plan.price}
                    </span>
                    <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "14px", marginBottom: "6px" }}>
                      {plan.period}
                    </span>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  style={{
                    width: "100%",
                    padding: "14px 24px",
                    borderRadius: "100px",
                    border: isHighlighted ? "none" : `1px solid ${plan.borderGlow}`,
                    background: isHighlighted
                      ? "linear-gradient(135deg, #4facfe 0%, #a855f7 100%)"
                      : isHovered
                      ? `${plan.accent.replace(")", ", 0.15)")}`
                      : "rgba(255,255,255,0.04)",
                    color: isHighlighted ? "#fff" : "rgba(255,255,255,0.8)",
                    fontSize: "14px",
                    fontWeight: 600,
                    letterSpacing: "0.03em",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    fontFamily: "'Space Grotesk', sans-serif",
                    boxShadow: isHighlighted ? "0 8px 30px rgba(168,85,247,0.35)" : "none",
                    marginBottom: "32px",
                  }}
                >
                  Get Started
                </button>

                {/* Divider */}
                <div style={{ height: "1px", background: "rgba(255,255,255,0.07)", marginBottom: "28px" }} />

                {/* Features */}
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                  {plan.features.map((feature, i) => (
                    <li key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div
                        style={{
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          background: `${plan.accent.replace(")", ", 0.12)")}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Check size={10} style={{ color: plan.accent }} strokeWidth={3} />
                      </div>
                      <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", fontFamily: "'Inter', sans-serif" }}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.25)", fontSize: "13px", marginTop: "48px", fontFamily: "'Inter', sans-serif" }}>
          All plans include NDAs, milestone-based billing & dedicated Slack channel. Custom enterprise plans available.
        </p>
      </div>
    </section>
  );
}
