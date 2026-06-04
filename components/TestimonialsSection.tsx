"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Premium testimonials data
const testimonials = [
  {
    id: 1,
    name: "Anay Shukla",
    villa: "MISTY CASCADES",
    groupImage: "/hero2.png",
    circularImage: "/hero.png",
    review: "Our stay at the villa was excellent. We were a group of 27 guests and the property comfortably accommodated everyone. The rooms were clean and well-maintained and thoughtfully equipped. The meals were well prepared and enjoyable, adding to the overall experience. We truly appreciate the warm hospitality extended to us which made our group stay both seamless and memorable.",
    rating: 5,
  },
  {
    id: 2,
    name: "Ramesh Mehta",
    villa: "MISTY FALLS",
    groupImage: "/hero.png",
    circularImage: "/hero2.png",
    review: "We had an excellent experience at the villa. The property was neat, clean, and well-maintained, meeting all our expectations. The surrounding area and the location itself was a highlight, adding to the charm of our stay. The food was well prepared and complemented by the excellent service provided by Cook Chotu, Shubhman, Kartina and the rest of the team always attentive, helpful, and ensuring it was truly a 10/10 experience.",
    rating: 5,
  },
  {
    id: 3,
    name: "Kinjal Shah",
    villa: "MISTY CASCADES",
    groupImage: "/hero2.png",
    circularImage: "/hero.png",
    review: "Our stay at Casa Tropica was truly memorable! The villa is spacious, clean, and beautifully designed with a perfect blend of comfort and luxury. The pool and outdoor areas were a hit, and the serene surroundings made our stay relaxing and enjoyable. The staff was friendly and attentive, ensuring everything was taken care of. Ideal for family getaways or group trips!",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      
      // Add GPU compositing hints
      gsap.set(".testimonials-banner", { force3D: true, willChange: "transform" });

      // Banner reveal - responsive motion values
      gsap.fromTo(
        ".testimonials-banner",
        {
          y: isMobile ? 20 : 40,
          filter: "blur(8px)",
        },
        {
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".testimonials-banner",
            start: "top 85%",
            toggleActions: "play none none none",
          },
          onComplete: () => {
            gsap.set(".testimonials-banner", { willChange: "auto" });
          }
        }
      );

      // Divider reveal
      gsap.fromTo(
        ".testimonials-divider",
        {
          scaleX: 0,
        },
        {
          scaleX: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".testimonials-divider",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Card reveals - consolidated with GPU optimization
      const cards = gsap.utils.toArray(".testimonial-card");
      
      // Add GPU hints to all cards
      gsap.set(cards, { force3D: true, willChange: "transform, opacity" });
      
      cards.forEach((card: any, index: number) => {
        let initialState;

        if (index === 0) {
          initialState = { x: isMobile ? -60 : -120, filter: "blur(8px)" };
        } else if (index === 1) {
          initialState = { y: isMobile ? 40 : 80, filter: "blur(8px)" };
        } else {
          initialState = { x: isMobile ? 60 : 120, filter: "blur(8px)" };
        }

        gsap.fromTo(
          card,
          initialState,
          {
            x: 0,
            y: 0,
            filter: "blur(0px)",
            duration: 1.4,
            ease: "power4.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            delay: index * 0.15,
            onComplete: () => {
              gsap.set(card, { willChange: "auto" });
            }
          }
        );

        // Star rating stagger with GPU optimization
        const stars = card.querySelectorAll(".star-icon");
        gsap.set(stars, { force3D: true });
        
        gsap.fromTo(
          stars,
          { scale: 0.5 },
          {
            scale: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
              toggleActions: "play none none none",
            },
            delay: index * 0.15 + 0.6,
          }
        );
      });
    }, sectionRef);

    return () => ctx.kill();
  }, []);

  return (
    <section ref={sectionRef} className="testimonials-section">
      <style jsx>{`
        .testimonials-section {
          position: relative;
          width: 100%;
          min-height: 100vh;
          padding: 80px 0 100px 0;
          background: #1A1A1A;
          overflow: hidden;
        }

        .testimonials-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url('/hero.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0.20;
          filter: brightness(0.45);
          z-index: 1;
        }

        .header-wrapper {
          position: relative;
          z-index: 10;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 48px;
        }

        .testimonials-banner {
          width: 80vw;
          background: rgba(184, 150, 62, 0.12);
          border: 1px solid rgba(184, 150, 62, 0.2);
          border-radius: 16px;
          padding: 8px 48px;
          margin: 0 0 20px 0;
        }

        .banner-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(24px, 3vw, 36px);
          font-weight: 500;
          color: #FFFFFF;
          margin: 0;
          text-align: center;
        }

        .testimonials-divider {
          width: 50px;
          height: 2px;
          background: rgba(184, 150, 62, 0.6);
          margin: 0;
          transform-origin: center center;
        }

        .testimonials-container {
          position: relative;
          z-index: 10;
          max-width: 1150px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }

        .testimonial-card {
          background: transparent;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          padding: 16px;
          border: 1px solid rgba(184, 150, 62, 0.2);
          border-radius: 12px;
        }

        .testimonial-card:hover {
          transform: translateY(-4px);
        }

        .card-image-wrapper {
          position: relative;
          width: 100%;
          height: 200px;
          overflow: visible;
          border-radius: 12px;
          margin-bottom: 80px;
        }

        .group-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
          border-radius: 12px;
        }

        .testimonial-card:hover .group-image {
          transform: scale(1.04);
        }

        .circular-image-wrapper {
          position: absolute;
          bottom: -75px;
          left: 50%;
          transform: translateX(-50%);
          width: 150px;
          height: 150px;
          border-radius: 50%;
          border: none;
          overflow: hidden;
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.7);
          z-index: 10;
          transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .testimonial-card:hover .circular-image-wrapper {
          transform: translateX(-50%) scale(1.05);
        }

        .circular-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card-content {
          text-align: center;
          padding: 0;
          padding-top: 12px;
        }

        .review-text {
          font-size: 12px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.9);
          margin: 0 auto 16px auto;
          max-width: 65ch;
          text-align: justify;
        }

        .rating-wrapper {
          display: flex;
          gap: 3px;
          margin-bottom: 12px;
          justify-content: center;
        }

        .star-icon {
          color: #b8963e;
          font-size: 14px;
        }

        .guest-name {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 600;
          color: #FFFFFF;
          margin-bottom: 6px;
        }

        .villa-name {
          font-size: 10px;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-weight: 600;
        }

        @media (max-width: 1024px) {
          .testimonials-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 56px;
          }
        }

        @media (max-width: 768px) {
          .testimonials-section {
            padding: 60px 0 80px 0;
          }

          .testimonials-container {
            padding: 0 24px;
          }

          .testimonials-banner {
            padding: 24px 32px;
            margin-bottom: 20px;
          }

          .testimonials-divider {
            margin-bottom: 48px;
          }

          .testimonials-grid {
            grid-template-columns: 1fr;
            gap: 72px;
          }

          .card-image-wrapper {
            height: 170px;
            margin-bottom: 75px;
          }

          .circular-image-wrapper {
            width: 130px;
            height: 130px;
            bottom: -65px;
            border: none;
          }

          .review-text {
            font-size: 13px;
            max-width: 100%;
          }
        }
      `}</style>

      <div className="header-wrapper">
        {/* Banner */}
        <div className="testimonials-banner">
          <h2 className="banner-title">What they're talking about us</h2>
        </div>

        {/* Decorative Divider */}
        <div className="testimonials-divider"></div>
      </div>

      <div className="testimonials-container">
        {/* Testimonials Grid */}
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              {/* Images */}
              <div className="card-image-wrapper">
                <img
                  src={testimonial.groupImage}
                  alt={`${testimonial.villa} experience`}
                  className="group-image"
                />
                <div className="circular-image-wrapper">
                  <img
                    src={testimonial.circularImage}
                    alt={testimonial.name}
                    className="circular-image"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="card-content">
                <p className="review-text">{testimonial.review}</p>

                {/* Rating */}
                <div className="rating-wrapper">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="star-icon">
                      ★
                    </span>
                  ))}
                </div>

                {/* Guest Info */}
                <div className="guest-name">{testimonial.name}</div>
                <div className="villa-name">{testimonial.villa}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
