"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Premium FAQ data
const faqs = [
  {
    id: 1,
    question: "How do I book a stay at Misty Villa?",
    answer: "Booking your retreat is effortless. Browse our collection of villas, select your preferred dates, and complete your reservation through our secure platform. Our concierge team is available 24/7 to assist with special requests, bespoke experiences, or tailored arrangements for your stay.",
  },
  {
    id: 2,
    question: "What are the check-in and check-out timings?",
    answer: "Check-in begins at 2:00 PM, allowing our team to ensure every detail is perfected for your arrival. Check-out is at 11:00 AM. Early check-in and late check-out are available upon request, subject to availability, to accommodate your travel schedule seamlessly.",
  },
  {
    id: 3,
    question: "Are the swimming pools private?",
    answer: "Absolutely. Each villa features its own private infinity pool, designed for your exclusive use. Surrounded by lush landscapes and complete privacy, your pool becomes a personal sanctuary where you can unwind without interruption, day or night.",
  },
  {
    id: 4,
    question: "Can I host events or celebrations at the villa?",
    answer: "Misty Villa is the ideal setting for intimate celebrations, whether it's a milestone birthday, anniversary, proposal, or family gathering. Our team can curate bespoke experiences including private chefs, décor, entertainment, and personalized touches to make your occasion unforgettable.",
  },
  {
    id: 5,
    question: "What is your cancellation policy?",
    answer: "We understand plans can change. Cancellations made 30 days or more before arrival receive a full refund. Cancellations within 15-29 days are subject to a 50% charge. Within 14 days, the full booking amount is retained. We recommend travel insurance for added peace of mind.",
  },
];

export default function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openId, setOpenId] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Badge animation
      gsap.fromTo(
        ".faq-badge",
        {
          opacity: 0,
          x: -60,
          filter: "blur(8px)",
        },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".faq-badge",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Heading animation
      gsap.fromTo(
        ".faq-heading",
        {
          opacity: 0,
          y: 80,
          filter: "blur(12px)",
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          scale: 1,
          duration: 1.4,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".faq-heading",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Description animation
      gsap.fromTo(
        ".faq-description",
        {
          opacity: 0,
          y: 40,
          filter: "blur(8px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".faq-description",
            start: "top 85%",
            toggleActions: "play none none none",
          },
          delay: 0.2,
        }
      );

      // FAQ items alternating animation
      gsap.utils.toArray(".faq-item").forEach((item: any, index: number) => {
        const direction = index % 2 === 0 ? -120 : 120;

        gsap.fromTo(
          item,
          {
            opacity: 0,
            x: direction,
            filter: "blur(12px)",
          },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 1.4,
            ease: "power4.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.kill();
  }, []);

  const toggleFAQ = (id: number) => {
    if (openId === id) {
      // Close animation
      const answerEl = document.getElementById(`answer-${id}`);
      const questionEl = document.getElementById(`question-${id}`);
      
      if (answerEl) {
        gsap.to(answerEl, {
          height: 0,
          opacity: 0,
          filter: "blur(8px)",
          duration: 0.8,
          ease: "power4.out",
        });
      }
      
      if (questionEl) {
        gsap.to(questionEl, {
          color: "#FFFFFF",
          duration: 0.6,
          ease: "power4.out",
        });
      }
      
      setOpenId(null);
    } else {
      // Close previous
      if (openId !== null) {
        const prevAnswerEl = document.getElementById(`answer-${openId}`);
        const prevQuestionEl = document.getElementById(`question-${openId}`);
        
        if (prevAnswerEl) {
          gsap.to(prevAnswerEl, {
            height: 0,
            opacity: 0,
            filter: "blur(8px)",
            duration: 0.8,
            ease: "power4.out",
          });
        }
        
        if (prevQuestionEl) {
          gsap.to(prevQuestionEl, {
            color: "#FFFFFF",
            duration: 0.6,
            ease: "power4.out",
          });
        }
      }

      // Open new
      setOpenId(id);
      
      // Animate question to gold
      const questionEl = document.getElementById(`question-${id}`);
      if (questionEl) {
        gsap.to(questionEl, {
          color: "rgba(184, 150, 62, 1)",
          duration: 0.6,
          ease: "power4.out",
        });
      }
      
      // Animate answer with blur fade-up
      setTimeout(() => {
        const answerEl = document.getElementById(`answer-${id}`);
        if (answerEl) {
          gsap.fromTo(
            answerEl,
            { 
              height: 0, 
              opacity: 0,
              filter: "blur(8px)",
              y: 20
            },
            {
              height: "auto",
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
              duration: 0.8,
              ease: "power4.out",
            }
          );
        }
      }, 50);
    }
  };

  return (
    <section ref={sectionRef} className="faq-section">
      <style jsx>{`
        .faq-section {
          position: relative;
          width: 100%;
          min-height: 100vh;
          padding: 80px 0 100px 0;
          background: #F7F4EE;
          overflow: hidden;
        }

        .faq-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(184, 154, 122, 0.02) 0%, transparent 50%, rgba(184, 154, 122, 0.015) 100%);
          pointer-events: none;
        }

        .faq-container {
          position: relative;
          z-index: 10;
          max-width: 850px;
          margin: 0 auto;
          padding: 0 48px;
        }

        .faq-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .faq-badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #B89A5A;
          background: rgba(184, 154, 90, 0.08);
          border: 1px solid rgba(184, 154, 90, 0.15);
          padding: 8px 20px;
          border-radius: 24px;
          margin-bottom: 32px;
        }

        .faq-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 500;
          color: #181818;
          margin: 0 0 32px 0;
          line-height: 1.3;
        }

        .faq-description {
          font-size: 16px;
          line-height: 1.8;
          color: #4A4A4A;
          max-width: 600px;
          margin: 0 auto;
        }

        .faq-list {
          margin-top: 40px;
        }

        .faq-item {
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          padding: 40px 0;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          position: relative;
        }

        .faq-item::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, #B89A5A 0%, rgba(184, 154, 90, 0) 100%);
          transition: width 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          z-index: 1;
        }

        .faq-item:hover::after {
          width: 100%;
        }

        .faq-item:hover .plus-icon {
          transform: rotate(45deg);
          color: #B89A5A;
          filter: none;
        }

        .gold-accent {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 0;
          height: 1px;
          background: #B89A5A;
          opacity: 0;
          transition: all 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .faq-question-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 32px;
        }

        .faq-question {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          font-weight: 500;
          color: #1F1F1F;
          margin: 0;
          flex: 1;
          transition: color 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          letter-spacing: -0.01em;
        }

        .faq-item:hover .faq-question {
          color: #181818;
        }

        .faq-question.open {
          color: #B89A5A;
        }

        .plus-icon {
          font-size: 32px;
          color: rgba(184, 154, 90, 0.5);
          transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
          flex-shrink: 0;
          font-weight: 300;
        }

        .plus-icon.open {
          transform: rotate(45deg);
          color: #B89A5A;
        }

        .faq-answer {
          height: 0;
          opacity: 0;
          overflow: hidden;
          margin-top: 0;
        }

        .faq-answer-content {
          padding-top: 28px;
          font-size: 16px;
          line-height: 1.9;
          color: #4A4A4A;
          max-width: 90%;
        }

        @media (max-width: 768px) {
          .faq-section {
            padding: 60px 0 80px 0;
          }

          .faq-container {
            padding: 0 24px;
          }

          .faq-header {
            margin-bottom: 40px;
          }

          .faq-heading {
            font-size: 36px;
          }

          .faq-description {
            font-size: 15px;
          }

          .faq-item {
            padding: 32px 0;
          }

          .faq-question {
            font-size: 20px;
          }

          .faq-answer-content {
            font-size: 15px;
            max-width: 100%;
          }
        }
      `}</style>

      <div className="faq-container">
        {/* Header */}
        <div className="faq-header">
          <div className="faq-badge">FAQ</div>
          <h2 className="faq-heading">Everything You Need To Know</h2>
          <p className="faq-description">
            Discover answers about booking your stay, villa amenities, experiences, policies, and everything that makes Misty Villa an exceptional retreat.
          </p>
        </div>

        {/* FAQ List */}
        <div className="faq-list">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="faq-item"
              onClick={() => toggleFAQ(faq.id)}
            >
              <div className="gold-accent"></div>
              <div className="faq-question-row">
                <h3 
                  id={`question-${faq.id}`}
                  className={`faq-question ${openId === faq.id ? "open" : ""}`}
                >
                  {faq.question}
                </h3>
                <span className={`plus-icon ${openId === faq.id ? "open" : ""}`}>
                  +
                </span>
              </div>
              <div id={`answer-${faq.id}`} className="faq-answer">
                <div className="faq-answer-content">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
