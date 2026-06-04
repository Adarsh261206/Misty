"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Premium Master Timeline - Cinematic luxury sequencing
      const masterTl = gsap.timeline({
        defaults: {
          ease: "power2.out",
        }
      });

      // 1. Hero Image Reveal - Cinematic opening with GPU optimization
      if (imageRef.current) {
        // Add GPU compositing hint
        gsap.set(imageRef.current, { force3D: true, willChange: "transform" });
        
        masterTl.fromTo(imageRef.current, {
          scale: 1.12,
          opacity: 0.7,
        }, {
          scale: 1,
          opacity: 1,
          duration: 2.5,
          ease: "power2.out",
          onComplete: () => {
            // Optimized Ken Burns - GPU-accelerated, smaller range for mobile
            const isMobile = window.innerWidth < 768;
            gsap.to(imageRef.current, {
              scale: isMobile ? 1.03 : 1.08,
              duration: 25,
              ease: "none",
              repeat: -1,
              yoyo: true,
            });
          }
        }, 0);
      }

      // 2. Navbar Reveal - Sophisticated entrance
      masterTl.fromTo(".hero-logo", {
        opacity: 0,
        x: -50,
      }, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
      }, 0.8)
      .fromTo(".nav-container", {
        opacity: 0,
        y: -30,
      }, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      }, 1.1)
      .fromTo(".cta-btn", {
        opacity: 0,
        x: 50,
      }, {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
      }, 1.4);

      // 3. Luxury Badge Reveal - Elegant appearance with GPU optimization
      if (badgeRef.current) {
        // Add GPU compositing hint
        gsap.set(badgeRef.current, { force3D: true, willChange: "transform" });
        
        masterTl.fromTo(
          badgeRef.current,
          {
            opacity: 0,
            scale: 0.85,
            y: 30,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.2,
            ease: "expo.out",
            onComplete: () => {
              // Optimized floating effect - smaller movement on mobile
              const isMobile = window.innerWidth < 768;
              gsap.to(badgeRef.current, {
                y: isMobile ? -3 : -5,
                duration: 3,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
              });
            },
          },
          1.8
        );
      }

      // 4. Hero Heading Reveal - Dramatic entrance with GPU optimization
      if (headlineRef.current) {
        const headlineSpans = headlineRef.current.querySelectorAll("span");
        
        // Add GPU compositing hints
        gsap.set(headlineSpans, { force3D: true, willChange: "transform, opacity" });
        
        // Responsive motion values
        const isMobile = window.innerWidth < 768;
        
        masterTl.fromTo(
          headlineSpans,
          {
            opacity: 0,
            y: isMobile ? 40 : 80,
            filter: "blur(10px)",
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.6,
            ease: "power4.out",
            stagger: 0.2,
            onComplete: () => {
              // Clear will-change after animation
              gsap.set(headlineSpans, { willChange: "auto" });
            }
          },
          2.2
        );
      }

      // 5. Stats Cards Reveal - Premium 3D entrance with GPU optimization
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".stat-card");
        
        // Add GPU compositing hints
        gsap.set(cards, { force3D: true, willChange: "transform, opacity" });
        
        // Responsive motion values
        const isMobile = window.innerWidth < 768;
        
        masterTl.fromTo(
          cards,
          {
            opacity: 0,
            x: isMobile ? 60 : 120,
            rotateY: isMobile ? 8 : 15,
          },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            duration: 1.4,
            ease: "power4.out",
            stagger: 0.25,
            onComplete: () => {
              // Clear will-change after animation
              gsap.set(cards, { willChange: "auto" });
            }
          },
          3.2
        );
      }

      // PREMIUM PARALLAX EFFECT - Optimized for mobile performance
      // Uses translate3d instead of scale during scrub (GPU-accelerated)
      
      if (imageRef.current) {
        const isMobile = window.innerWidth < 768;
        
        gsap.to(imageRef.current, {
          y: isMobile ? "-5%" : "-8%",  // Smaller movement on mobile
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // OPTIMIZED SCROLL-DRIVEN FADE APART ANIMATION
      // Removed continuous blur during scrub for mobile performance
      // Uses translate3d for GPU acceleration
      
      const isMobile = window.innerWidth < 768;
      
      // Badge animation - moves LEFT with delayed fade (blur only at entry)
      if (badgeRef.current) {
        const badgeTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        badgeTl.to(badgeRef.current, {
          x: isMobile ? -10 : -20,
          opacity: 1,
          duration: 0.2,
          ease: "none",
        })
        .to(badgeRef.current, {
          x: isMobile ? -60 : -100,
          opacity: 0,
          duration: 0.8,
          ease: "none",
        });
      }

      // Heading animation - moves LEFT with fade (no scale/blur during scrub)
      if (headlineRef.current) {
        gsap.to(headlineRef.current, {
          x: isMobile ? -100 : -200,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Stats cards animation - moves RIGHT with fade (no scale/blur during scrub)
      if (cardsRef.current) {
        gsap.to(cardsRef.current, {
          x: isMobile ? 100 : 200,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // ScrollTrigger animations for when elements re-enter viewport
      // (All duplicate re-entry animations removed to avoid conflicts)
    }, containerRef);

    return () => {
      ctx.kill();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* BACKGROUND IMAGE - FULL VISIBLE */}
      <div 
        ref={imageRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/hero2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          filter: "brightness(0.82) contrast(1.18) saturate(0.88)",
        }}
      >
        {/* Subtle atmospheric haze */}
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(0,0,0,0.05) 100%)",
          }}
        />

        {/* Subtle vignette */}
        <div 
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, rgba(0,0,0,0) 25%, rgba(0,0,0,0.12) 65%, rgba(0,0,0,0.32) 100%)",
          }}
        />
        
        {/* Left-side readability gradient - enhanced */}
        <div 
          className="absolute inset-0"
          style={{
            background: "linear-gradient(90deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.38) 35%, rgba(0,0,0,0.10) 65%, rgba(0,0,0,0) 80%)",
          }}
        />
      </div>

      {/* CONTENT CONTAINER */}
      <div 
        className="relative h-full flex flex-col"
        style={{
          maxWidth: "1920px",
          margin: "0 auto",
          padding: "0 min(80px, 5vw)",
        }}
      >
        {/* FLOATING NAVBAR */}
        <nav 
          className="relative flex items-center justify-between flex-wrap"
          style={{
            paddingTop: "clamp(30px, 5vh, 50px)",
            zIndex: 100,
            gap: "clamp(10px, 2vw, 20px)",
          }}
        >
          {/* Logo */}
          <div 
            className="hero-logo"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(14px, 1.6vw, 16px)",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              padding: "clamp(8px, 1vw, 10px) clamp(14px, 2vw, 20px)",
              border: "1.5px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "999px",
              background: "rgba(40, 40, 40, 0.55)",
              backdropFilter: "blur(32px)",
              WebkitBackdropFilter: "blur(32px)",
            }}
          >
            <span
              style={{
                background: "linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "brightness(1.2) contrast(1.1)",
              }}
            >
              MISTY VILLA'S
            </span>
          </div>

          {/* Navigation */}
          <div 
            className="nav-container"
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%) scale(clamp(0.7, 0.85vw, 0.85))",
              background: "rgba(40, 40, 40, 0.55)",
              backdropFilter: "blur(32px)",
              WebkitBackdropFilter: "blur(32px)",
              border: "1.5px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "999px",
              height: "clamp(40px, 5vh, 48px)",
              padding: "0 clamp(4px, 0.8vw, 8px)",
              display: "flex",
              alignItems: "center",
              gap: "clamp(2px, 0.4vw, 4px)",
            }}
          >
            {["Home", "Villas", "Experience", "About"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="nav-link"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "clamp(11px, 1.4vw, 14px)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  padding: "0 clamp(12px, 2.4vw, 24px)",
                  height: "clamp(30px, 3.6vh, 36px)",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "999px",
                  background: "linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  textDecoration: "none",
                  transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                  letterSpacing: "-0.02em",
                  filter: "brightness(1.2) contrast(1.1)",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.95)";
                  e.currentTarget.style.webkitBackgroundClip = "border-box";
                  e.currentTarget.style.webkitTextFillColor = "#1a1a1a";
                  e.currentTarget.style.filter = "none";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%)";
                  e.currentTarget.style.webkitBackgroundClip = "text";
                  e.currentTarget.style.webkitTextFillColor = "transparent";
                  e.currentTarget.style.filter = "brightness(1.2) contrast(1.1)";
                }}
              >
                {item}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="https://wa.me/917304334609?text=Hi, I want to book a villa"
            target="_blank"
            rel="noreferrer"
            className="cta-btn"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(11px, 1.3vw, 13px)",
              fontWeight: 700,
              textTransform: "uppercase",
              padding: "clamp(10px, 1.3vh, 13px) clamp(18px, 2.8vw, 28px)",
              borderRadius: "999px",
              background: "rgba(40, 40, 40, 0.55)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1.5px solid rgba(255, 255, 255, 0.15)",
              textDecoration: "none",
              transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
              letterSpacing: "-0.02em",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                background: "rgba(255, 255, 255, 0.95)",
                scale: 1.03,
                duration: 0.35,
              });
              e.currentTarget.style.color = "#1a1a1a";
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                background: "rgba(40, 40, 40, 0.55)",
                scale: 1,
                duration: 0.35,
              });
            }}
          >
            <span
              style={{
                background: "linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "brightness(1.2) contrast(1.1)",
              }}
            >
              Reserve Now
            </span>
          </a>
        </nav>

        {/* HERO CONTENT */}
        <div 
          className="flex-1 flex items-end"
          style={{
            paddingBottom: "clamp(40px, 9vh, 90px)",
          }}
        >
          <div className="w-full flex flex-col md:flex-row justify-between items-end gap-8">
            
            {/* LEFT: Headline */}
            <div style={{ maxWidth: "min(750px, 100%)", textAlign: "left", marginRight: "auto", marginBottom: "-120px" }}>
              {/* Eyebrow */}
              <div 
                ref={badgeRef}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "clamp(9px, 1.1vw, 11px)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "-0.02em",
                  marginBottom: "clamp(20px, 3.6vh, 36px)",
                  display: "inline-block",
                  padding: "clamp(8px, 1vw, 10px) clamp(12px, 1.8vw, 18px)",
                  borderRadius: "999px",
                  background: "rgba(40, 40, 40, 0.55)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  border: "1.5px solid rgba(255, 255, 255, 0.15)",
                }}
              >
                <span
                  style={{
                    background: "linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "brightness(1.2) contrast(1.1)",
                  }}
                >
                  LUXURY PRIVATE RETREATS
                </span>
              </div>

              {/* Headline */}
              <h1 
                ref={headlineRef}
                className="hero-headline"
                style={{
                  fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
                  color: "#FFFFFF",
                  marginBottom: "clamp(24px, 4.8vh, 48px)",
                  textAlign: "left",
                  textRendering: "optimizeLegibility",
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontSize: "clamp(3rem, 6vw, 7.5rem)",
                    fontWeight: 700,
                    fontStyle: "italic",
                    lineHeight: "0.95",
                    letterSpacing: "-0.03em",
                    color: "#FFFFFF",
                    textShadow: "0 4px 20px rgba(0, 0, 0, 0.35)",
                    marginBottom: "0.05em",
                  }}
                >
                  Where Nature
                </span>
                <span
                  style={{
                    display: "block",
                    fontSize: "clamp(3rem, 6vw, 7.5rem)",
                    fontWeight: 800,
                    fontStyle: "normal",
                    lineHeight: "0.95",
                    letterSpacing: "-0.03em",
                    color: "#FFFFFF",
                    textShadow: "0 4px 20px rgba(0, 0, 0, 0.35)",
                  }}
                >
                  Meets Luxury
                </span>
              </h1>
            </div>

            {/* RIGHT: Small Floating Cards */}
            <div 
              ref={cardsRef}
              style={{
                display: "flex",
                gap: "clamp(12px, 1.8vw, 18px)",
                flexWrap: "wrap",
                justifyContent: "flex-end",
                marginLeft: "auto",
                perspective: "1000px",
              }}
            >
              {[
                { num: "180°", text: "Panoramic views" },
                { num: "100%", text: "Private retreats" },
              ].map((item, i) => (
                <div 
                  key={i}
                  className="stat-card"
                  style={{
                    width: "clamp(140px, 17vw, 170px)",
                    height: "clamp(100px, 11vh, 110px)",
                    background: "rgba(255, 255, 255, 0.18)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    border: "1.5px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "clamp(16px, 2vw, 20px)",
                    padding: "clamp(16px, 2vw, 20px)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    boxShadow: "0 20px 60px rgba(0, 0, 0, 0.25)",
                    transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, {
                      y: -8,
                      boxShadow: "0 28px 80px rgba(0, 0, 0, 0.35)",
                      duration: 0.4,
                      ease: "power2.out",
                    });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                      y: 0,
                      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.25)",
                      duration: 0.4,
                      ease: "power2.out",
                    });
                  }}
                >
                  <div 
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "clamp(28px, 3.8vw, 38px)",
                      fontWeight: 700,
                      lineHeight: 1,
                      textTransform: "uppercase",
                      background: "linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      marginBottom: "clamp(4px, 0.6vh, 6px)",
                      letterSpacing: "-0.03em",
                      filter: "drop-shadow(0 2px 6px rgba(0, 0, 0, 0.3)) brightness(1.3) contrast(1.15)",
                    }}
                  >
                    {item.num}
                  </div>
                  <div 
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "clamp(8px, 1vw, 10px)",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      background: "linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      lineHeight: 1.3,
                      letterSpacing: "-0.02em",
                      filter: "brightness(1.2) contrast(1.1)",
                    }}
                  >
                    {item.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 767px) {
          nav {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          
          .nav-container {
            position: relative !important;
            left: auto !important;
            transform: scale(1) !important;
            width: 100% !important;
            justify-content: space-evenly !important;
            order: 2;
          }
          
          .hero-logo {
            order: 1;
            width: fit-content;
            align-self: flex-start;
          }
          
          .cta-btn {
            order: 3;
            width: fit-content;
            align-self: flex-end;
          }
          
          .hero-headline {
            margin-bottom: 0 !important;
            padding-bottom: 150px !important;
          }
          
          .flex-1 {
            padding-bottom: 30px !important;
          }
        }

        @media (min-width: 768px) and (max-width: 1023px) {
          .nav-container {
            transform: translateX(-50%) scale(0.75) !important;
          }
        }

        @media (min-width: 1024px) {
          .hero-logo {
            font-size: 16px !important;
            padding: 10px 20px !important;
          }
          
          nav {
            padding-top: 50px !important;
            gap: 20px !important;
          }
          
          .nav-container {
            height: 48px !important;
            padding: 0 8px !important;
            gap: 4px !important;
            transform: translateX(-50%) scale(0.85) !important;
          }
          
          .nav-link {
            font-size: 14px !important;
            padding: 0 24px !important;
            height: 36px !important;
          }
          
          .cta-btn {
            font-size: 13px !important;
            padding: 13px 28px !important;
          }
          
          .hero-headline span {
            font-size: clamp(64px, 6vw, 92px) !important;
            line-height: 0.9 !important;
          }
          
          .stat-card {
            width: 170px !important;
            height: 110px !important;
            padding: 20px !important;
            border-radius: 20px !important;
          }
          
          .stat-card > div:first-child {
            font-size: 38px !important;
            margin-bottom: 6px !important;
          }
          
          .stat-card > div:last-child {
            font-size: 10px !important;
          }
        }
      `}</style>
    </div>
  );
}
