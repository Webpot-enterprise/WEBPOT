import { useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { ServicesSection } from "./components/ServicesSection";
import { ProcessSection } from "./components/ProcessSection";
import { PortfolioSection } from "./components/PortfolioSection";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";

export default function App() {
  useEffect(() => {
    // Smooth scroll for anchor links
    document.documentElement.style.scrollBehavior = "smooth";
    document.body.style.background = "#06060c";
    document.body.style.margin = "0";
    document.body.style.overflowX = "hidden";

    // Scroll reveal: IntersectionObserver for fade-in
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.opacity = "1";
            (entry.target as HTMLElement).style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    const sections = document.querySelectorAll(".reveal-section");
    sections.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div
      style={{
        background: "#06060c",
        minHeight: "100vh",
        fontFamily: "'Space Grotesk', sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* Global styles */}
      <style>{`
        *, *::before, *::after {
          box-sizing: border-box;
        }

        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #06060c;
        }
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #4facfe, #a855f7);
          border-radius: 3px;
        }

        ::selection {
          background: rgba(79, 172, 254, 0.25);
          color: #ffffff;
        }

        .reveal-section {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1), transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }

        @media (max-width: 1024px) {
          [style*="grid-template-columns: 2fr 1fr 1fr 1fr"] {
            grid-template-columns: 1fr 1fr !important;
          }
        }

        @media (max-width: 640px) {
          [style*="grid-template-columns: 2fr 1fr 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          [style*="grid-template-columns: repeat(12, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
        }

        a { cursor: pointer; }

        /* Scrolling marquee for trusted brands */
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>

      <Navbar />

      <main>
        {/* Hero: no reveal, it's the entry point */}
        <HeroSection />

        <div className="reveal-section">
          <ServicesSection />
        </div>

        <div className="reveal-section">
          <ProcessSection />
        </div>

        <div className="reveal-section">
          <PortfolioSection />
        </div>

        <div className="reveal-section">
          <WhyChooseUs />
        </div>

        <div className="reveal-section">
          <CTASection />
        </div>
      </main>

      <Footer />
    </div>
  );
}
