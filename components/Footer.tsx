"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const ctaSectionRef = useRef<HTMLElement>(null);
  const footerSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // CTA Section Animation
      gsap.fromTo(
        ".cta-headline",
        {
          opacity: 0,
          y: 80,
          filter: "blur(12px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.8,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".cta-headline",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".cta-subtext",
        {
          opacity: 0,
          y: 60,
          filter: "blur(12px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.6,
          ease: "power4.out",
          delay: 0.3,
          scrollTrigger: {
            trigger: ".cta-subtext",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      gsap.fromTo(
        ".cta-button",
        {
          opacity: 0,
          y: 40,
          filter: "blur(8px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.4,
          ease: "power4.out",
          delay: 0.6,
          scrollTrigger: {
            trigger: ".cta-button",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Trust statement animation
      gsap.fromTo(
        ".cta-trust-statement",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power4.out",
          delay: 0.9,
          scrollTrigger: {
            trigger: ".cta-trust-statement",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Footer Columns Stagger Animation
      gsap.fromTo(
        ".footer-column",
        {
          opacity: 0,
          y: 40,
          filter: "blur(6px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.0,
          ease: "power4.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".footer-grid",
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );

      // Bottom Bar Animation
      gsap.fromTo(
        ".footer-bottom",
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".footer-bottom",
            start: "top 95%",
            toggleActions: "play none none none",
          },
        }
      );
    }, [ctaSectionRef, footerSectionRef]);

    return () => ctx.kill();
  }, []);

  return (
    <>
      {/* SECTION 1: Luxury CTA */}
      <section ref={ctaSectionRef} className="luxury-cta-section">
        <style jsx>{`
          .luxury-cta-section {
            position: relative;
            width: 100%;
            min-height: 80vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 80px 48px 60px 48px;
            background: #0A0A0A;
            overflow: hidden;
          }

          .luxury-cta-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(ellipse at center, rgba(184, 154, 90, 0.04) 0%, transparent 60%);
            pointer-events: none;
          }

          .luxury-cta-section::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 100%;
            max-width: 1400px;
            height: 1px;
            background: rgba(184, 154, 90, 0.15);
          }

          .cta-content {
            position: relative;
            z-index: 10;
            text-align: center;
            max-width: 900px;
            margin: 0 auto;
          }

          .cta-headline {
            font-family: 'Playfair Display', serif;
            font-size: clamp(36px, 5.5vw, 64px);
            font-weight: 500;
            color: #FFFFFF;
            line-height: 1.2;
            margin: 0 0 32px 0;
            letter-spacing: -0.02em;
          }

          .cta-subtext {
            font-size: 18px;
            line-height: 1.8;
            color: rgba(255, 255, 255, 0.7);
            max-width: 650px;
            margin: 0 auto 48px auto;
          }

          .cta-button {
            display: inline-block;
            font-size: 15px;
            font-weight: 600;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            color: #B89A5A;
            background: transparent;
            border: 1.5px solid #B89A5A;
            padding: 18px 48px;
            border-radius: 40px;
            cursor: pointer;
            transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
            text-decoration: none;
          }

          .cta-button:hover {
            background: rgba(184, 154, 90, 0.1);
            border-color: rgba(184, 154, 90, 0.8);
            transform: translateY(-4px);
            box-shadow: 0 8px 24px rgba(184, 154, 90, 0.2);
          }

          .cta-trust-statement {
            font-size: 13px;
            line-height: 1.6;
            color: rgba(255, 255, 255, 0.4);
            margin-top: 24px;
            font-style: italic;
          }

          @media (max-width: 768px) {
            .luxury-cta-section {
              min-height: 70vh;
              padding: 60px 24px 48px 24px;
            }

            .cta-headline {
              font-size: 36px;
              margin-bottom: 24px;
            }

            .cta-subtext {
              font-size: 16px;
              margin-bottom: 40px;
            }

            .cta-button {
              font-size: 14px;
              padding: 16px 40px;
            }
          }
        `}</style>

        <div className="cta-content">
          <h2 className="cta-headline">Ready For Your Next Escape?</h2>
          <p className="cta-subtext">
            Escape the ordinary and discover private luxury retreats designed for unforgettable memories.
          </p>
          <a href="#" className="cta-button">
            Reserve Your Stay
          </a>
          <p className="cta-trust-statement">
            Trusted by families, corporate retreats and luxury travelers
          </p>
        </div>
      </section>

      {/* SECTION 2: Premium Footer */}
      <footer ref={footerSectionRef} className="premium-footer">
        <style jsx>{`
          .premium-footer {
            position: relative;
            width: 100%;
            background: #070707;
            padding: 48px 48px 0 48px;
          }

          .footer-container {
            max-width: 1400px;
            margin: 0 auto;
          }

          .footer-grid {
            display: grid;
            grid-template-columns: 35% 20% 25% 20%;
            gap: 48px;
            padding-bottom: 80px;
          }

          .footer-column {
            display: flex;
            flex-direction: column;
            gap: 24px;
          }

          .footer-logo {
            font-family: 'Playfair Display', serif;
            font-size: 28px;
            font-weight: 500;
            color: #FFFFFF;
            margin-bottom: 8px;
            letter-spacing: 0.02em;
          }

          .footer-brand-story {
            font-size: 14px;
            line-height: 1.8;
            color: rgba(255, 255, 255, 0.5);
            max-width: 320px;
          }

          .footer-column-title {
            font-size: 12px;
            font-weight: 600;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: rgba(255, 255, 255, 0.4);
            margin-bottom: 8px;
          }

          .footer-links {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }

          .footer-link {
            font-size: 15px;
            color: rgba(255, 255, 255, 0.7);
            text-decoration: none;
            position: relative;
            display: inline-block;
            width: fit-content;
            transition: color 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          }

          .footer-link::after {
            content: '';
            position: absolute;
            bottom: -2px;
            left: 0;
            width: 0;
            height: 1px;
            background: #B89A5A;
            transition: width 0.5s cubic-bezier(0.23, 1, 0.32, 1);
          }

          .footer-link:hover {
            color: #B89A5A;
          }

          .footer-link:hover::after {
            width: 100%;
          }

          .footer-divider {
            width: 100%;
            height: 1px;
            background: rgba(184, 154, 90, 0.15);
          }

          .footer-bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 32px 0;
            font-size: 13px;
            color: rgba(255, 255, 255, 0.4);
          }

          .footer-bottom-left {
            flex: 1;
          }

          .footer-bottom-center {
            flex: 1;
            text-align: center;
            font-style: italic;
            color: rgba(255, 255, 255, 0.5);
          }

          .footer-bottom-right {
            flex: 1;
            display: flex;
            justify-content: flex-end;
            gap: 32px;
          }

          .footer-bottom-link {
            color: rgba(255, 255, 255, 0.4);
            text-decoration: none;
            transition: color 0.3s ease;
          }

          .footer-bottom-link:hover {
            color: #B89A5A;
          }

          @media (max-width: 1024px) {
            .footer-grid {
              grid-template-columns: 1fr 1fr;
              gap: 60px;
            }
          }

          @media (max-width: 768px) {
            .premium-footer {
              padding: 40px 24px 0 24px;
            }

            .footer-grid {
              grid-template-columns: 1fr 1fr;
              gap: 40px 32px;
              padding-bottom: 60px;
            }

            .footer-bottom {
              flex-direction: column;
              gap: 16px;
              text-align: center;
              padding: 24px 0;
            }

            .footer-bottom-left,
            .footer-bottom-center,
            .footer-bottom-right {
              flex: none;
              width: 100%;
            }

            .footer-bottom-right {
              justify-content: center;
              gap: 24px;
            }
          }
        `}</style>

        <div className="footer-container">
          {/* Footer Grid */}
          <div className="footer-grid">
            {/* Column 1: Brand */}
            <div className="footer-column">
              <div className="footer-logo">Misty Villa's</div>
              <p className="footer-brand-story">
                Curated luxury villa experiences where comfort, privacy, and nature come together to create unforgettable escapes.
              </p>
            </div>

            {/* Column 2: Explore */}
            <div className="footer-column">
              <div className="footer-column-title">Explore</div>
              <div className="footer-links">
                <a href="#" className="footer-link">Home</a>
                <a href="#" className="footer-link">Villas</a>
                <a href="#" className="footer-link">Testimonials</a>
                <a href="#" className="footer-link">FAQ</a>
                <a href="#" className="footer-link">Contact</a>
              </div>
            </div>

            {/* Column 3: Contact */}
            <div className="footer-column">
              <div className="footer-column-title">Contact</div>
              <div className="footer-links">
                <a href="tel:+1234567890" className="footer-link">+1 (234) 567-890</a>
                <a href="mailto:stay@mistyvillas.com" className="footer-link">stay@mistyvillas.com</a>
                <a href="#" className="footer-link">Misty Falls, Nature Resort</a>
              </div>
            </div>

            {/* Column 4: Follow Us */}
            <div className="footer-column">
              <div className="footer-column-title">Follow Us</div>
              <div className="footer-links">
                <a href="#" className="footer-link">Instagram</a>
                <a href="#" className="footer-link">Facebook</a>
                <a href="#" className="footer-link">WhatsApp</a>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="footer-divider"></div>

          {/* Bottom Bar */}
          <div className="footer-bottom">
            <div className="footer-bottom-left">
              © 2026 Misty Villa's
            </div>
            <div className="footer-bottom-center">
              Crafted for unforgettable stays
            </div>
            <div className="footer-bottom-right">
              <a href="#" className="footer-bottom-link">Privacy Policy</a>
              <a href="#" className="footer-bottom-link">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
