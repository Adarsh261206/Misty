"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Temporary mock data for design preview
const MOCK_VILLAS = [
  {
    _id: "temp-villa-1",
    name: "Misty Cascades",
    location: "Sahyadri Hills, Lonavala",
    description: "Experience the epitome of luxury living nestled in the misty mountains of Lonavala. This stunning villa offers panoramic views, modern amenities, and complete privacy for your perfect getaway.",
    shortDescription: "Luxury mountain retreat with panoramic views",
    pricePerNight: 18000,
    guests: 10,
    bedrooms: 4,
    images: ["/hero2.png"],
    amenities: ["Private Pool", "WiFi", "Mountain View", "BBQ Area", "Parking"],
    highlights: ["Pet Friendly", "Caretaker Service", "Modern Kitchen"],
    whatsappNumber: "917304334609"
  },
  {
    _id: "temp-villa-2",
    name: "Misty Falls",
    location: "Sahyadri Hills, Karjat",
    description: "A pristine hillside retreat where luxury meets nature. Wake up to the sound of waterfalls and enjoy breathtaking sunsets from your private deck. Perfect for families and groups seeking mountain paradise.",
    shortDescription: "Waterfall view villa with luxury amenities",
    pricePerNight: 22000,
    guests: 12,
    bedrooms: 5,
    images: ["/hero.png"],
    amenities: ["Swimming Pool", "Waterfall View", "Garden", "Game Room", "WiFi"],
    highlights: ["Chef Available", "Bonfire Area", "Scenic Views"],
    whatsappNumber: "917304334609"
  }
];

// Fetch villas from API
async function fetchVillas() {
  try {
    const response = await fetch(`${API_URL}/villas`, {
      cache: 'no-store' // Always fetch fresh data
    });
    if (!response.ok) throw new Error('Failed to fetch villas');
    const data = await response.json();
    // Return API data if available, otherwise return mock data
    return data.data && data.data.length > 0 ? data.data : MOCK_VILLAS;
  } catch (error) {
    console.error('Error fetching villas:', error);
    // Return mock data on error for design preview
    return MOCK_VILLAS;
  }
}

export default function VillasSection() {
  const [villas, setVillas] = useState<any[]>([]);
  const [openVilla, setOpenVilla] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Fetch villas on mount
    fetchVillas()
      .then((data) => {
        setVillas(data);
        setLoading(false);
        // Set Misty Cascades as initially open
        const mistyCascades = data.find((villa: any) => villa.name === "Misty Cascades");
        if (mistyCascades) {
          setOpenVilla(mistyCascades._id);
        }
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (loading || villas.length === 0) return;

    const ctx = gsap.context(() => {
      // ===================================
      // OPTIMIZED SECTION HEADER ANIMATIONS
      // Simplified timelines, blur only on entry, GPU-accelerated
      // ===================================

      const isMobile = window.innerWidth < 768;

      // Add GPU compositing hints to header elements
      gsap.set([".section-chip", ".section-title", ".header-description"], {
        force3D: true,
        willChange: "transform, opacity"
      });

      // Consolidated header timeline - one ScrollTrigger for all elements
      const headerTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".villas-header",
          start: "top 85%",
          toggleActions: "play none none none",
        }
      });

      // 1. Badge - Entry animation only (blur only at entry)
      headerTimeline.fromTo(".section-chip",
        {
          opacity: 0,
          x: isMobile ? -40 : -60,
          filter: "blur(8px)"
        },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power4.out",
          onComplete: () => {
            gsap.set(".section-chip", { willChange: "auto" });
          }
        },
        0
      );

      // 2. Heading - Entry animation only (no scale/blur during scrub)
      headerTimeline.fromTo(".section-title",
        {
          opacity: 0,
          y: isMobile ? 40 : 80,
          filter: "blur(12px)"
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.4,
          ease: "power4.out",
          onComplete: () => {
            gsap.set(".section-title", { willChange: "auto" });
          }
        },
        0.15
      );

      // 3. Description - Entry animation only
      headerTimeline.fromTo(".header-description",
        {
          opacity: 0,
          x: isMobile ? 40 : 80,
          filter: "blur(8px)"
        },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power4.out",
          onComplete: () => {
            gsap.set(".header-description", { willChange: "auto" });
          }
        },
        0.25
      );

      // Clean premium reveal animation for villa cards
      // GPU-optimized with responsive motion values
      gsap.utils.toArray(".villa-item").forEach((item: any, index: number) => {
        const isEven = index % 2 === 1;
        
        // Add GPU compositing hint
        gsap.set(item, { force3D: true, willChange: "transform, opacity" });
        
        // Responsive motion values
        const slideDistance = isMobile ? (isEven ? 60 : -60) : (isEven ? 120 : -120);
        const rotateAmount = isMobile ? (isEven ? 4 : -4) : (isEven ? 8 : -8);
        
        // Clean reveal: slide in from left/right with blur (entry only)
        gsap.fromTo(item,
          { 
            opacity: 0,
            x: slideDistance,
            rotateY: rotateAmount,
            filter: "blur(8px)"
          },
          {
            opacity: 1,
            x: 0,
            rotateY: 0,
            filter: "blur(0px)",
            duration: 1.4,
            ease: "power4.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            onComplete: () => {
              gsap.set(item, { willChange: "auto" });
            }
          }
        );

        // Optimized subtle parallax for villa images
        const villaImage = item.querySelector('.villa-image');
        if (villaImage) {
          gsap.set(villaImage, { force3D: true });
          gsap.to(villaImage, {
            y: isMobile ? "-5%" : "-8%",  // Smaller movement on mobile
            ease: "none",
            scrollTrigger: {
              trigger: item,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }

        // Luxury count-up effect for villa numbers
        const villaNumber = item.querySelector('.villa-number');
        if (villaNumber) {
          const targetNumber = index + 1;
          const numberObj = { value: 0 };
          
          gsap.to(numberObj, {
            value: targetNumber,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            onUpdate: () => {
              const currentVal = Math.floor(numberObj.value);
              villaNumber.textContent = String(currentVal).padStart(2, '0');
            }
          });
        }
      });
    }, sectionRef);

    return () => ctx.kill();
  }, [loading, villas]);

  // Premium GSAP animation for accordion expand/collapse
  useEffect(() => {
    if (loading || villas.length === 0) return;

    villas.forEach((villa) => {
      const villaBody = document.querySelector(`#${villa._id} .villa-body`);
      const villaImage = document.querySelector(`#${villa._id} .villa-mockup`);
      const villaDescription = document.querySelector(`#${villa._id} .villa-description`);
      const villaFeatures = document.querySelector(`#${villa._id} .villa-features`);
      const villaButton = document.querySelector(`#${villa._id} .view-details-button`);
      const mockupDetails = document.querySelector(`#${villa._id} .mockup-details`);
      
      if (villaBody) {
        if (openVilla === villa._id) {
          // Premium layered expansion timeline
          const expandTimeline = gsap.timeline({
            defaults: {
              ease: "power3.out"
            }
          });

          // 1. Expand height smoothly
          expandTimeline.to(villaBody, {
            height: "auto",
            duration: 0.7,
            ease: "power3.inOut",
            onStart: () => {
              (villaBody as HTMLElement).style.overflow = "hidden";
            },
            onComplete: () => {
              (villaBody as HTMLElement).style.overflow = "visible";
            }
          }, 0);

          // 2. Description fades in early
          if (villaDescription) {
            expandTimeline.fromTo(
              villaDescription,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.6 },
              0.1
            );
          }

          // 3. Image/mockup fades in with zoom-out effect
          if (villaImage) {
            const villaImageElement = villaImage.querySelector('.villa-image');
            
            expandTimeline.fromTo(
              villaImage,
              { opacity: 0, scale: 0.95, y: 20 },
              { opacity: 1, scale: 1, y: 0, duration: 0.7 },
              0.15
            );

            // Premium zoom-out reveal for the actual image
            if (villaImageElement) {
              expandTimeline.fromTo(
                villaImageElement,
                { scale: 1.15, opacity: 0 },
                { scale: 1, opacity: 1, duration: 1.8, ease: "power3.out" },
                0.15
              );
            }
          }

          // 4. Amenities/features stagger reveal
          if (villaFeatures) {
            const featureItems = villaFeatures.querySelectorAll('.feature-item');
            expandTimeline.fromTo(
              featureItems,
              { opacity: 0, x: -20 },
              { opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: "power3.out" },
              0.25
            );
          }

          // 5. Mockup details (price, etc.) reveal last
          if (mockupDetails) {
            const detailRows = mockupDetails.querySelectorAll('.mockup-row');
            expandTimeline.fromTo(
              detailRows,
              { opacity: 0, y: 10 },
              { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 },
              0.35
            );
          }

          // 6. Button appears last
          if (villaButton) {
            expandTimeline.fromTo(
              villaButton,
              { opacity: 0, y: 15, scale: 0.95 },
              { opacity: 1, y: 0, scale: 1, duration: 0.6 },
              0.45
            );
          }
          
        } else {
          // Collapse with smooth animation
          gsap.to(villaBody, {
            height: 0,
            duration: 0.5,
            ease: "power3.inOut",
            onStart: () => {
              (villaBody as HTMLElement).style.overflow = "hidden";
            }
          });
        }
      }
    });
  }, [openVilla, loading, villas]);

  const toggleVilla = (id: string) => {
    setOpenVilla(openVilla === id ? "" : id);
  };

  const handleVillaHover = (id: string) => {
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    // Set 100ms delay before opening
    hoverTimeoutRef.current = setTimeout(() => {
      setOpenVilla(id);
    }, 100);
  };

  const handleVillaLeave = () => {
    // Clear timeout if user leaves before 1 second
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const getVillaImage = (villa: any) => {
    if (villa.images && villa.images.length > 0) {
      // Handle both absolute and relative paths
      const imagePath = villa.images[0];
      if (imagePath.startsWith('http')) {
        return imagePath;
      }
      return `${API_BASE_URL}${imagePath.startsWith('/') ? imagePath : '/' + imagePath}`;
    }
    return '/hero2.png'; // fallback
  };

  const getVillaPrice = (villa: any) => {
    // Try to get nearest upcoming price from pricing array
    if (villa.pricing && villa.pricing.length > 0) {
      const today = new Date().toISOString().split('T')[0];
      const futurePrice = villa.pricing.find((p: any) => p.date >= today);
      if (futurePrice && futurePrice.price) {
        return `₹${futurePrice.price.toLocaleString('en-IN')}`;
      }
    }
    // Fallback to base price
    if (villa.pricePerNight) {
      return `₹${villa.pricePerNight.toLocaleString('en-IN')}`;
    }
    return 'Price on request';
  };

  const getVillaFeatures = (villa: any) => {
    const features: string[] = [];
    
    // Add basic info
    if (villa.bedrooms) {
      features.push(`${villa.bedrooms} ${villa.bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}`);
    }
    if (villa.guests) {
      features.push(`Accommodates ${villa.guests} Guests`);
    }
    
    // Add amenities (top 3)
    if (villa.amenities && Array.isArray(villa.amenities)) {
      villa.amenities.slice(0, 3).forEach((amenity: string) => {
        if (amenity && amenity.trim()) features.push(amenity.trim());
      });
    }
    
    // Add highlights if we need more
    if (features.length < 5 && villa.highlights && Array.isArray(villa.highlights)) {
      villa.highlights.slice(0, 5 - features.length).forEach((highlight: string) => {
        if (highlight && highlight.trim()) features.push(highlight.trim());
      });
    }
    
    return features.slice(0, 5); // Max 5 features
  };

  const getVillaTags = (villa: any) => {
    const tags: string[] = [];
    
    // Try to get meaningful tags from amenities/highlights
    if (villa.amenities && Array.isArray(villa.amenities) && villa.amenities.length > 0) {
      tags.push(villa.amenities[0]);
    }
    if (villa.highlights && Array.isArray(villa.highlights) && villa.highlights.length > 0) {
      tags.push(villa.highlights[0]);
    }
    
    // Fallback tags
    if (tags.length === 0) {
      tags.push('Premium', 'Luxury');
    }
    
    return tags.slice(0, 2); // Max 2 tags
  };

  if (loading) {
    return (
      <section className="villas-section loading-state" ref={sectionRef}>
        <style jsx>{`
          .villas-section {
            min-height: 100vh;
            background: #F8F7F4;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .loading-content {
            text-align: center;
            padding: 40px;
          }
          .spinner {
            width: 48px;
            height: 48px;
            border: 4px solid rgba(184, 150, 62, 0.2);
            border-top-color: #b8963e;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
            margin: 0 auto 20px;
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          .loading-text {
            font-family: 'Inter', sans-serif;
            font-size: 16px;
            color: #6A6675;
          }
        `}</style>
        <div className="loading-content">
          <div className="spinner"></div>
          <p className="loading-text">Loading our beautiful villas...</p>
        </div>
      </section>
    );
  }

  if (error || villas.length === 0) {
    return (
      <section className="villas-section empty-state" ref={sectionRef}>
        <style jsx>{`
          .villas-section {
            min-height: 100vh;
            background: #F8F7F4;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .empty-content {
            text-align: center;
            padding: 40px;
          }
          .empty-icon {
            font-size: 64px;
            margin-bottom: 20px;
          }
          .empty-text {
            font-family: 'Inter', sans-serif;
            font-size: 18px;
            color: #6A6675;
            margin-bottom: 12px;
          }
          .empty-subtext {
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            color: #9A9AA5;
          }
        `}</style>
        <div className="empty-content">
          <div className="empty-icon">🏡</div>
          <p className="empty-text">
            {error ? 'Unable to load villas at the moment' : 'No villas available right now'}
          </p>
          <p className="empty-subtext">Please check back later or contact us directly</p>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="villas-section">
      <style jsx>{`
        .villas-section {
          position: relative;
          width: 100%;
          min-height: 100vh;
          padding: 100px 0;
          background: #F8F7F4;
          overflow: hidden;
        }

        .section-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .bg-gradient {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 100% 80% at 50% 20%,
            rgba(184, 150, 62, 0.06) 0%,
            transparent 60%
          );
          animation: bgPulse 10s ease-in-out infinite alternate;
        }

        @keyframes bgPulse {
          0% {
            opacity: 0.8;
            transform: scale(1);
          }
          100% {
            opacity: 1;
            transform: scale(1.05);
          }
        }

        .bg-pattern {
          position: absolute;
          inset: 0;
          background-image: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.02) 2px,
            rgba(0, 0, 0, 0.02) 4px
          );
          opacity: 0.3;
        }

        .villas-container {
          position: relative;
          z-index: 10;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 48px;
        }

        .villas-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 64px;
          padding-bottom: 32px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        }

        .header-left {
          flex: 1;
        }

        .section-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          background: rgba(184, 150, 62, 0.08);
          border: 1px solid rgba(184, 150, 62, 0.25);
          border-radius: 100px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #b8963e;
          margin-bottom: 16px;
        }

        .section-chip::before {
          content: '';
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #b8963e;
          box-shadow: 0 0 8px #b8963e;
        }

        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(42px, 5vw, 72px);
          font-weight: 400;
          line-height: 0.95;
          letter-spacing: -0.03em;
          color: #0A0A0C;
        }

        .section-title em {
          font-style: italic;
          color: #3A3845;
        }

        .header-description {
          font-size: 16px;
          line-height: 1.7;
          color: #3A3845;
          max-width: 420px;
        }

        .villas-accordion-list {
          display: flex;
          flex-direction: column;
          gap: 0;
          background: rgba(0, 0, 0, 0.08);
          border-radius: 16px;
          overflow: hidden;
          perspective: 1000px;
        }

        .villa-item {
          background: #F8F7F4;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
          transform-style: preserve-3d;
        }

        .villa-item:last-child {
          border-bottom: none;
        }

        .villa-item:hover {
          background: #EEECEA;
        }

        .villa-item.open {
          background: #F8F7F4;
        }

        .villa-row {
          display: grid;
          grid-template-columns: 60px 1fr auto auto;
          align-items: center;
          gap: 24px;
          padding: 32px;
          cursor: pointer;
          transition: all 0.3s;
          user-select: none;
        }

        .villa-row:hover {
          padding-left: 40px;
        }

        .villa-number {
          font-size: 14px;
          font-weight: 700;
          font-family: 'JetBrains Mono', monospace;
          color: #6A6675;
          transition: color 0.3s;
        }

        .villa-item.open .villa-number {
          color: #b8963e;
        }

        .villa-name {
          font-size: clamp(20px, 2.5vw, 28px);
          font-weight: 700;
          font-family: 'Playfair Display', serif;
          color: #0A0A0C;
          transition: color 0.3s;
        }

        .villa-item.open .villa-name {
          color: #b8963e;
        }

        .villa-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .villa-tag {
          padding: 6px 14px;
          background: rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 100px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #6A6675;
          transition: all 0.3s;
        }

        .villa-item.open .villa-tag {
          background: rgba(184, 150, 62, 0.08);
          border-color: rgba(184, 150, 62, 0.25);
          color: #b8963e;
        }

        .villa-toggle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1.5px solid rgba(0, 0, 0, 0.08);
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: 300;
          color: #6A6675;
          transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .villa-item.open .villa-toggle {
          transform: rotate(45deg);
          background: rgba(184, 150, 62, 0.1);
          border-color: rgba(184, 150, 62, 0.4);
          color: #b8963e;
        }

        .villa-body {
          height: 0;
          overflow: hidden;
        }

        .villa-item.open .villa-body {
          height: auto;
        }

        .villa-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          padding: 0 32px 48px 32px;
        }

        .content-left {
          display: flex;
          flex-direction: column;
          gap: 24px;
          padding-top: 24px;
        }

        .villa-description {
          font-size: 16px;
          line-height: 1.8;
          color: #3A3845;
        }

        .villa-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 0;
          margin: 0;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
          color: #3A3845;
        }

        .feature-check {
          width: 24px;
          height: 24px;
          border-radius: 8px;
          background: rgba(184, 150, 62, 0.1);
          border: 1px solid rgba(184, 150, 62, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #b8963e;
          font-size: 12px;
          font-weight: 700;
          flex-shrink: 0;
        }

        .villa-info {
          display: flex;
          gap: 24px;
          align-items: center;
          padding-top: 16px;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
        }

        .info-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .info-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #6A6675;
        }

        .info-value {
          font-size: 20px;
          font-weight: 700;
          color: #b8963e;
        }

        .book-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: #b8963e;
          color: white;
          border: none;
          border-radius: 100px;
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: all 0.3s;
          text-decoration: none;
        }

        .book-btn:hover {
          background: #a68535;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(184, 150, 62, 0.3);
        }

        .view-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: transparent;
          color: #b8963e;
          border: 1.5px solid #b8963e;
          border-radius: 100px;
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: all 0.3s;
          text-decoration: none;
        }

        .view-btn:hover {
          background: #b8963e;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(184, 150, 62, 0.2);
        }

        .buttons-wrapper {
          display: flex;
          gap: 12px;
          margin-top: 16px;
          flex-wrap: wrap;
        }

        @media (max-width: 640px) {
          .buttons-wrapper {
            flex-direction: column;
          }
          
          .view-btn,
          .book-btn {
            width: 100%;
            justify-content: center;
          }
        }

        .content-right {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .villa-mockup {
          width: 100%;
          max-width: 400px;
          background: #EEECEA;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
        }

        .villa-image {
          width: 100%;
          height: 240px;
          object-fit: cover;
        }

        .villa-mockup {
          overflow: hidden;
        }

        .villa-image-placeholder {
          width: 100%;
          height: 240px;
          background: linear-gradient(135deg, #1a1a48 0%, #0e0e28 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 48px;
        }

        .mockup-details {
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .mockup-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .mockup-label {
          font-size: 12px;
          color: #6A6675;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .mockup-value {
          font-size: 16px;
          font-weight: 700;
          color: #0A0A0C;
        }

        .mockup-badge {
          display: inline-flex;
          padding: 6px 12px;
          background: rgba(184, 150, 62, 0.1);
          border: 1px solid rgba(184, 150, 62, 0.25);
          border-radius: 100px;
          font-size: 11px;
          font-weight: 600;
          color: #b8963e;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        @media (max-width: 1024px) {
          .villa-content {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .content-right {
            order: -1;
          }
        }

        @media (max-width: 768px) {
          .villas-section {
            padding: 60px 0;
          }

          .villas-container {
            padding: 0 24px;
          }

          .villas-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
            margin-bottom: 40px;
          }

          .section-title {
            font-size: clamp(32px, 8vw, 48px);
          }

          .villa-row {
            grid-template-columns: 40px 1fr auto;
            gap: 16px;
            padding: 24px 20px;
          }

          .villa-tags {
            display: none;
          }

          .villa-name {
            font-size: clamp(18px, 4vw, 22px);
          }

          .villa-content {
            padding: 0 20px 32px 20px;
          }

          .villa-mockup {
            max-width: 100%;
          }
        }
      `}</style>

      {/* Background */}
      <div className="section-bg">
        <div className="bg-gradient" />
        <div className="bg-pattern" />
      </div>

      <div className="villas-container">
        {/* Header */}
        <div className="villas-header">
          <div className="header-left">
            <div className="section-chip">Our Properties</div>
            <h2 className="section-title">
              Our <em>villas.</em>
            </h2>
          </div>
          <p className="header-description">
            Handpicked luxury villas in serene locations — where comfort meets nature for your perfect getaway.
          </p>
        </div>

        {/* Accordion Items */}
        <div className="villas-accordion-list">
          {villas.map((villa, index) => {
            const villaNumber = String(index + 1).padStart(2, '0');
            const villaPrice = getVillaPrice(villa);
            const villaImage = getVillaImage(villa);
            const tags = getVillaTags(villa);
            const features = getVillaFeatures(villa);

            return (
              <div
                key={villa._id}
                className={`villa-item ${openVilla === villa._id ? "open" : ""}`}
                id={villa._id}
              >
                <div className="villa-row" onClick={() => toggleVilla(villa._id)} onMouseEnter={() => handleVillaHover(villa._id)} onMouseLeave={handleVillaLeave}>
                  <div className="villa-number">{villaNumber}</div>
                  <div className="villa-name">{villa.name}</div>
                  <div className="villa-tags">
                    {tags.map((tag, i) => (
                      <span key={i} className="villa-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="villa-toggle">+</div>
                </div>

                <div className="villa-body">
                  <div className="villa-content">
                    {/* Left: Description */}
                    <div className="content-left">
                      <p className="villa-description">
                        {villa.description || villa.shortDescription || 'Experience luxury living in this beautiful villa with premium amenities and stunning views.'}
                      </p>
                      
                      {features.length > 0 && (
                        <ul className="villa-features">
                          {features.map((feature, idx) => (
                            <li key={idx} className="feature-item">
                              <span className="feature-check">✓</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      
                      <Link
                        href={`/villa/${villa._id}`}
                        className="view-details-button"
                        style={{
                          fontFamily: "Inter, -apple-system, sans-serif",
                          fontSize: "13px",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          padding: "12px 28px",
                          borderRadius: "999px",
                          background: "rgba(40, 40, 40, 0.75)",
                          color: "#ffffff",
                          border: "1.5px solid rgba(255, 255, 255, 0.15)",
                          textDecoration: "none",
                          transition: "all 0.3s ease",
                          letterSpacing: "0.05em",
                          whiteSpace: "nowrap",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          cursor: "pointer",
                          marginTop: "20px",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                          backdropFilter: "blur(24px)",
                          WebkitBackdropFilter: "blur(24px)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "rgba(255, 255, 255, 0.95)";
                          e.currentTarget.style.color = "#1a1a1a";
                          e.currentTarget.style.transform = "scale(1.05)";
                          e.currentTarget.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.2)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "rgba(40, 40, 40, 0.75)";
                          e.currentTarget.style.color = "#ffffff";
                          e.currentTarget.style.transform = "scale(1)";
                          e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.15)";
                        }}
                      >
                        👁️ View Details
                      </Link>
                    </div>

                    {/* Right: Visual */}
                    <div className="content-right">
                      <div className="villa-mockup">
                        <img
                          src={villaImage}
                          alt={villa.name}
                          className="villa-image"
                          onError={(e) => {
                            // Fallback image on error
                            (e.target as HTMLImageElement).src = '/hero2.png';
                          }}
                        />
                        <div className="mockup-details">
                          <div className="mockup-row">
                            <span className="mockup-label">Property Type</span>
                            <span className="mockup-badge">Premium Villa</span>
                          </div>
                          <div className="mockup-row">
                            <span className="mockup-label">Starting From</span>
                            <span className="mockup-value">{villaPrice}/night</span>
                          </div>
                          <div className="mockup-row">
                            <span className="mockup-label">Bedrooms</span>
                            <span className="mockup-value">{villa.bedrooms || '-'}</span>
                          </div>
                          <div className="mockup-row">
                            <span className="mockup-label">Location</span>
                            <span className="mockup-value">{villa.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
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
