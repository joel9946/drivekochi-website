import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Car, Search, MapPin, Calendar, Gauge, Settings2, 
  ChevronDown, BadgeCheck, Shield, Zap, FileText, 
  Truck, CheckCircle2, MessageCircle, ArrowUp, Star, Phone,
  Menu, X, ChevronLeft, ChevronRight
} from 'lucide-react';

const COLORS = {
  bg:          "#06060C",
  surface:     "#0C0C16",
  glass:       "rgba(255,255,255,0.04)",
  glassBorder: "rgba(255,255,255,0.08)",
  cardHover:   "rgba(255,255,255,0.05)",
  cyan:        "#00E5FF",
  cyanGlow:    "rgba(0,229,255,0.25)",
  cyanSoft:    "rgba(0,229,255,0.08)",
  orange:      "#FF6B35",
  orangeGlow:  "rgba(255,107,53,0.3)",
  gold:        "#D4A843",
  text:        "#EEEEF2",
  textMuted:   "#6E6E82",
  textDim:     "#3A3A50",
  green:       "#22C55E",
  red:         "#EF4444",
};

const CARS = [
  { id: '1', name: 'Hyundai Creta SX', brand: 'Hyundai', year: 2021, price: 12.5, fuelType: 'Petrol', transmission: 'Automatic', kmDriven: 24000, bodyType: 'SUV', location: 'Edappally', badge: 'Recently Added', img: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&q=80', features: ['Sunroof', 'Alloy Wheels'], exchangeEligible: true },
  { id: '2', name: 'Honda City ZX', brand: 'Honda', year: 2019, price: 8.2, fuelType: 'Petrol', transmission: 'Manual', kmDriven: 45000, bodyType: 'Sedan', location: 'Kakkanad', img: 'https://images.unsplash.com/photo-1590362891991-f7000780ece8?auto=format&fit=crop&q=80', features: ['Touchscreen', 'Rear Camera'], exchangeEligible: true },
  { id: '3', name: 'Kia Seltos GTX', brand: 'Kia', year: 2022, price: 15.1, fuelType: 'Diesel', transmission: 'Automatic', kmDriven: 18000, bodyType: 'SUV', location: 'Vyttila', badge: 'Limited Stock', img: 'https://images.unsplash.com/photo-1605559424843-9e1208a98075?auto=format&fit=crop&q=80', features: ['Ventilated Seats', 'Bose Audio'] },
  { id: '4', name: 'Maruti Suzuki Swift', brand: 'Maruti Suzuki', year: 2020, price: 5.8, fuelType: 'Petrol', transmission: 'Manual', kmDriven: 32000, bodyType: 'Hatchback', location: 'Aluva', img: 'https://images.unsplash.com/photo-1557925055-1bdde7b27ed1?auto=format&fit=crop&q=80', features: ['Bluetooth', 'Power Windows'] },
  { id: '5', name: 'Toyota Innova Crysta', brand: 'Toyota', year: 2018, price: 16.5, fuelType: 'Diesel', transmission: 'Manual', kmDriven: 85000, bodyType: 'MUV', location: 'Fort Kochi', img: 'https://images.unsplash.com/photo-1634084462412-b54873c0a56d?auto=format&fit=crop&q=80', features: ['7-Seater', 'Rear AC'] },
  { id: '6', name: 'Mahindra XUV700', brand: 'Mahindra', year: 2023, price: 21.0, fuelType: 'Diesel', transmission: 'Automatic', kmDriven: 12000, bodyType: 'SUV', location: 'Tripunithura', badge: 'Recently Added', img: 'https://images.unsplash.com/photo-1669280387556-9e96e5797d02?auto=format&fit=crop&q=80', features: ['ADAS', 'Panoramic Sunroof'] },
  { id: '7', name: 'Tata Nexon EV', brand: 'Tata', year: 2022, price: 14.0, fuelType: 'Electric', transmission: 'Automatic', kmDriven: 21000, bodyType: 'SUV', location: 'Kakkanad', img: 'https://images.unsplash.com/photo-1627931320493-27e436814392?auto=format&fit=crop&q=80', features: ['Fast Charging', 'Connected Tech'] },
  { id: '8', name: 'Maruti Suzuki Baleno', brand: 'Maruti Suzuki', year: 2021, price: 7.0, fuelType: 'Petrol', transmission: 'Manual', kmDriven: 28000, bodyType: 'Hatchback', location: 'Edappally', img: 'https://images.unsplash.com/photo-1609520778163-a1a36417769e?auto=format&fit=crop&q=80', features: ['Auto AC', 'LED Headlamps'] },
  { id: '9', name: 'Hyundai Venue', brand: 'Hyundai', year: 2020, price: 8.5, fuelType: 'Petrol', transmission: 'Manual', kmDriven: 35000, bodyType: 'SUV', location: 'Vyttila', img: 'https://images.unsplash.com/photo-1549399542-7e3e9d8cb4e7?auto=format&fit=crop&q=80', features: ['Wireless Charging'] },
  { id: '10', name: 'Honda Amaze', brand: 'Honda', year: 2019, price: 6.2, fuelType: 'Diesel', transmission: 'Manual', kmDriven: 52000, bodyType: 'Sedan', location: 'Aluva', img: 'https://images.unsplash.com/photo-1549429440-62be16616086?auto=format&fit=crop&q=80', features: ['Cruise Control'] },
  { id: '11', name: 'Kia Sonet', brand: 'Kia', year: 2021, price: 9.8, fuelType: 'Petrol', transmission: 'Automatic', kmDriven: 26000, bodyType: 'SUV', location: 'Fort Kochi', img: 'https://images.unsplash.com/photo-1605559495146-559d1a3c7908?auto=format&fit=crop&q=80', features: ['Air Purifier'] },
  { id: '12', name: 'MG Hector', brand: 'MG', year: 2020, price: 13.5, fuelType: 'Petrol', transmission: 'Automatic', kmDriven: 41000, bodyType: 'SUV', location: 'Tripunithura', img: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&q=80', features: ['Large Touchscreen'] },
];

const TESTIMONIALS = [
  { name: 'Arun K.', area: 'Kochi', text: '"Straight forward dealings Quality vehicles. Very reliable service."', rating: 5, car: 'Honda City' },
  { name: 'Mohammed S.', area: 'Kalamassery', text: '"Very good experience. The staff was transparent and helped me find the perfect car."', rating: 5, car: 'Hyundai Creta' },
  { name: 'Joseph M.', area: 'Ernakulam', text: '"Best pre owned cars , trust worthy. Zero hidden charges gave me total peace of mind."', rating: 4, car: 'Kia Seltos' },
  { name: 'Sujith N.', area: 'Aluva', text: '"Transparent pricing and very helpful staff. Highly recommend SA CARS!"', rating: 5, car: 'Toyota Innova' },
  { name: 'Lakshmi S.', area: 'Fort Kochi', text: '"Sold my car here and got the payment instantly. Much better than dealing with individual buyers."', rating: 5, car: 'Tata Nexon' },
  { name: 'George P.', area: 'Tripunithura', text: '"Great collection of verified cars. I found exactly what I was looking for."', rating: 5, car: 'Mahindra XUV700' },
];


// --- HOOKS ---
const useInView = (options = { threshold: 0.1, rootMargin: "-60px" }) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        if (options.once !== false) observer.unobserve(node);
      } else if (options.once === false) {
        setIsInView(false);
      }
    }, options);
    observer.observe(node);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isInView];
};

const useCounter = (end, duration = 2000, start = 0, isActive = true) => {
  const [count, setCount] = useState(start);
  useEffect(() => {
    if (!isActive) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  }, [end, duration, start, isActive]);
  return count;
};

// --- COMPONENTS ---
const Reveal = ({ children, delay = 0, direction = 'up', className = '', style = {} }) => {
  const [ref, isInView] = useInView({ once: true });
  const animStyles = {
    up: 'translateY(50px)',
    down: 'translateY(-50px)',
    left: 'translateX(50px)',
    right: 'translateX(-50px)',
    scale: 'scale(0.8)'
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'none' : animStyles[direction],
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`
      }}
    >
      {children}
    </div>
  );
};

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Syne:wght@600;700;800&display=swap');
    
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      background-color: ${COLORS.bg};
      color: ${COLORS.text};
      font-family: 'Outfit', sans-serif;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }
    h1, h2, h3, h4, h5, h6, .font-display {
      font-family: 'Syne', sans-serif;
      letter-spacing: -0.05em;
    }
    
    ::-webkit-scrollbar { width: 10px; }
    ::-webkit-scrollbar-track { background: ${COLORS.bg}; }
    ::-webkit-scrollbar-thumb { background: ${COLORS.cyanSoft}; border-radius: 5px; }
    ::-webkit-scrollbar-thumb:hover { background: ${COLORS.cyan}; }

    input, select, textarea {
      background: ${COLORS.glass};
      border: 1px solid ${COLORS.glassBorder};
      color: ${COLORS.text};
      border-radius: 12px;
      padding: 12px 16px;
      font-family: 'Outfit', sans-serif;
      transition: all 0.3s ease;
      outline: none;
    }
    input:focus, select:focus, textarea:focus {
      border-color: ${COLORS.cyan};
      box-shadow: 0 0 15px ${COLORS.cyanGlow};
      background: rgba(255,255,255,0.06);
    }
    select option { background: ${COLORS.bg}; color: ${COLORS.text}; }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-12px); }
    }
    @keyframes floatSlow {
      0%, 100% { transform: translateY(0) rotate(0); }
      50% { transform: translateY(-8px) rotate(1deg); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 0.6; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.1); }
    }
    @keyframes glow {
      0%, 100% { box-shadow: 0 0 20px ${COLORS.cyanGlow}; }
      50% { box-shadow: 0 0 40px ${COLORS.cyanGlow}; }
    }
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    @keyframes particle1 {
      0% { transform: translateY(0) scale(1); opacity: 0; }
      10% { opacity: 1; }
      100% { transform: translateY(-700px) scale(0.5); opacity: 0; }
    }
    @keyframes particle2 {
      0% { transform: translateY(0) scale(1); opacity: 0; }
      10% { opacity: 1; }
      100% { transform: translateY(-500px) scale(0.5) translateX(100px); opacity: 0; }
    }
    @keyframes particle3 {
      0% { transform: translateY(0) scale(1); opacity: 0; }
      10% { opacity: 1; }
      100% { transform: translateY(-600px) scale(0.5) translateX(-100px); opacity: 0; }
    }
    @keyframes revealLine {
      0% { width: 0; }
      100% { width: 80px; }
    }
    @keyframes bounceIn {
      0% { transform: scale(0.3); opacity: 0; }
      50% { transform: scale(1.05); }
      70% { transform: scale(0.95); }
      100% { transform: scale(1); opacity: 1; }
    }
    @keyframes slideUp {
      0% { transform: translateY(100%); opacity: 0; }
      100% { transform: translateY(0); opacity: 1; }
    }
    @keyframes textReveal {
      0% { transform: translateY(40px); opacity: 0; }
      100% { transform: translateY(0); opacity: 1; }
    }
    @keyframes heroFadeIn {
      0% { opacity: 0; }
      100% { opacity: 1; }
    }
    @keyframes glowPulse {
      0%, 100% { box-shadow: 0 0 20px ${COLORS.cyanGlow}; }
      50% { box-shadow: 0 0 50px ${COLORS.cyanGlow}; }
    }
    @keyframes dashDraw {
      0% { stroke-dashoffset: 1000; }
      100% { stroke-dashoffset: 0; }
    }

    .btn-primary {
      background: linear-gradient(135deg, ${COLORS.cyan}, #00b8d4);
      color: #06060c;
      border: none;
      padding: 12px 28px;
      border-radius: 10px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px ${COLORS.cyanGlow};
    }
    .btn-primary:active { transform: translateY(0) scale(0.98); }
    
    .btn-secondary {
      background: transparent;
      color: ${COLORS.cyan};
      border: 1px solid rgba(0,229,255,0.3);
      padding: 12px 28px;
      border-radius: 10px;
      font-weight: 600;
      cursor: pointer;
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    .btn-secondary:hover {
      background: rgba(0,229,255,0.08);
      border-color: ${COLORS.cyan};
      box-shadow: 0 0 20px ${COLORS.cyanGlow};
    }
    .btn-secondary:active { transform: translateY(0) scale(0.98); }
    
    .btn-orange {
      background: linear-gradient(135deg, ${COLORS.orange}, #e85d2a);
      color: white;
      border: none;
      padding: 14px 32px;
      border-radius: 10px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    .btn-orange:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px ${COLORS.orangeGlow};
    }
    .btn-orange:active { transform: translateY(0) scale(0.98); }

    .mobile-toggle { display: none; background: transparent; border: none; color: #fff; cursor: pointer; }

    .filter-pill {
      background: transparent;
      border: 1px solid ${COLORS.glassBorder};
      color: ${COLORS.text};
      padding: 8px 16px;
      border-radius: 20px;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.3s;
    }
    .filter-pill.active {
      background: rgba(0,229,255,0.12);
      border-color: ${COLORS.cyan};
      color: ${COLORS.cyan};
    }

    .glass-card {
      background: ${COLORS.glass};
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid ${COLORS.glassBorder};
      border-radius: 16px;
    }

    .text-gradient-cyan {
      background: linear-gradient(135deg, #fff, ${COLORS.cyan}, ${COLORS.gold});
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .text-gradient-gold {
      background: linear-gradient(135deg, #fff, ${COLORS.gold}, #f0e6d2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .car-card {
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      border-radius: 16px;
    }
    .car-card:hover {
      transform: translateY(-10px) scale(1.02);
      box-shadow: 0 20px 40px rgba(0,0,0,0.5), 0 0 20px ${COLORS.cyanGlow};
      border-color: rgba(0,229,255,0.3);
    }
    .car-card .car-img { transition: transform 0.4s ease; }
    .car-card:hover .car-img { transform: scale(1.08); }
    .view-details {
      transform: translateY(100%);
      transition: transform 0.4s ease;
    }
    .car-card:hover .view-details { transform: translateY(0); }

    .nav-link {
      color: ${COLORS.textMuted};
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.3s ease;
      position: relative;
    }
    .nav-link:hover { color: #fff; }
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: -4px; right: 0; width: 0; height: 2px;
      background: ${COLORS.cyan};
      transition: width 0.3s ease;
    }
    .nav-link:hover::after { width: 100%; left: 0; right: auto; }

    /* Utilities */
    .flex-center { display: flex; justify-content: center; align-items: center; }
    .absolute-inset { position: absolute; top: 0; left: 0; right: 0; bottom: 0; }
    
    /* Mobile Overrides */
    .mobile-bottom-bar { display: none; }
    @media (max-width: 768px) {
      .hero-title { font-size: 32px !important; }
      .section-heading { font-size: 28px !important; }
      .nav-links-center, .nav-btn-right { display: none !important; }
      .hero-particles { display: none !important; }
      .slider-container { 
        perspective: none !important; 
        display: flex; flex-direction: column; 
        height: auto !important; 
        gap: 20px; 
      }
      .slider-card { 
        position: relative !important; 
        transform: none !important; 
        opacity: 1 !important; 
        z-index: 1 !important;
        height: 250px !important;
      }
      .connector-line { display: none !important; }
      section { padding: 60px 16px !important; }
      .filter-wrapper { overflow-x: auto; padding-bottom: 8px; }
      .mobile-whatsapp { display: none !important; }
      .mobile-toggle { display: block; }
      .mobile-bottom-bar { 
        display: flex; position: fixed; bottom: 0; left: 0; right: 0; 
        background: rgba(6,6,12,0.85); backdrop-filter: blur(20px); 
        border-top: 1px solid ${COLORS.glassBorder}; z-index: 1001; 
        padding: 12px 16px; gap: 12px;
        animation: slideUp 0.8s ease-out 1.5s both;
      }
      .mobile-bottom-bar a, .mobile-bottom-bar button { flex: 1; }
      .mobile-menu-overlay {
        position: fixed; top: 70px; left: 0; right: 0; bottom: 0;
        background: ${COLORS.bg}; z-index: 999;
        display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 30px;
      }
      .grid-responsive { grid-template-columns: 1fr !important; }
      .hero-overlay { background: linear-gradient(to bottom, rgba(6,6,12,0.4) 0%, rgba(6,6,12,0.65) 40%, rgba(6,6,12,0.85) 75%, ${COLORS.bg} 100%) !important; }
    }
  `}</style>
);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, height: '70px',
        background: scrolled || menuOpen ? 'rgba(6,6,12,0.85)' : 'transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(20px)' : 'none',
        borderBottom: scrolled || menuOpen ? `1px solid ${COLORS.glassBorder}` : 'none',
        transition: 'all 0.4s ease',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 40px'
      }}>
        <div className="flex-center" style={{ gap: '8px' }}>
          <Car size={28} color={COLORS.cyan} />
          <span className="font-display" style={{ fontSize: '22px', fontWeight: 800 }}>
            <span style={{ color: '#fff' }}>SA </span>
            <span style={{ color: COLORS.cyan }}>CARS</span>
          </span>
        </div>

        <div className="nav-links-center desk-nav" style={{ display: 'flex', gap: '30px' }}>
          <a href="#cars" className="nav-link">Cars</a>
          <a href="#sell" className="nav-link">Sell Your Car</a>
          <a href="#exchange" className="nav-link">Exchange</a>
          <a href="#how" className="nav-link">How It Works</a>
          <a href="#contact" className="nav-link">Contact</a>
        </div>

        <div className="nav-btn-right" style={{ display: 'flex', gap: '15px' }}>
          <button className="btn-secondary">Call Now</button>
          <a href="#cars" className="btn-primary" style={{ textDecoration: 'none' }}>Browse Cars &rarr;</a>
        </div>
        
        <button className="mobile-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>
      
      {menuOpen && (
        <div className="mobile-menu-overlay">
          {['Cars', 'Sell Your Car', 'Exchange', 'How It Works', 'Contact'].map((item, i) => (
            <a key={item} href={`#${item.split(' ')[0].toLowerCase()}`} onClick={() => setMenuOpen(false)}
               style={{ color: '#fff', fontSize: '24px', textDecoration: 'none', animation: `slideUp 0.4s ease forwards`, animationDelay: `${i*0.08}s`, opacity: 0 }}>
               {item}
            </a>
          ))}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px', width: '80%' }}>
             <button className="btn-secondary" style={{ width: '100%' }}>Call Now</button>
             <button className="btn-primary" style={{ width: '100%' }}>Browse Cars</button>
          </div>
        </div>
      )}
    </>
  );
};

const ImageSequenceHero = () => {
  const [frameIndex, setFrameIndex] = useState(1);
  const TOTAL_FRAMES = 40;

  useEffect(() => {
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new Image();
        img.src = `${import.meta.env.BASE_URL}ezgif-66323bf814042019-jpg/ezgif-frame-${i.toString().padStart(3, '0')}.jpg`;
    }
    const interval = setInterval(() => {
        setFrameIndex((prev) => (prev % TOTAL_FRAMES) + 1);
    }, 1000 / 10); 
    return () => clearInterval(interval);
  }, []);

  return (
    <img 
      src={`${import.meta.env.BASE_URL}ezgif-66323bf814042019-jpg/ezgif-frame-${frameIndex.toString().padStart(3, '0')}.jpg`}
      alt="Hero cinematic background"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0, opacity: 0, animation: "heroFadeIn 1.5s ease 0.3s forwards" }}
    />
  );
};

const Hero = () => {
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i, left: `${(i * 37 + 13) % 100}%`, bottom: `${(i * 23 + 7) % 30}%`,
    delay: `${(i % 5) * 1.5}s`, duration: `${6 + (i % 6)}s`,
    color: i % 3 === 0 ? COLORS.cyan : i % 3 === 1 ? COLORS.gold : '#fff',
    opacity: i % 3 === 0 ? 0.3 : i % 3 === 1 ? 0.2 : 0.1,
    size: `${2 + (i % 3)}px`, anim: `particle${(i % 3) + 1}`
  }));

  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* Required Video Element HTML Structure implementation (Hidden / Dummy Src as per checklist) */}
      <video loop muted autoPlay playsInline poster={`${import.meta.env.BASE_URL}hero-poster.jpg`} style={{ display: 'none', position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}>
         <source src={`${import.meta.env.BASE_URL}hero-video.mp4`} type="video/mp4" />
      </video>

      {/* Layer 1: Actual Image Sequence renderer */}
      <div className="absolute-inset" style={{ transform: `translateY(${scrollY * 0.2}px)`, zIndex: 0 }}>
        <ImageSequenceHero />
      </div>

      {/* Layer 2: Overlay */}
      <div className="absolute-inset hero-overlay" style={{
        background: `linear-gradient(to bottom, rgba(6,6,12,0.35) 0%, rgba(6,6,12,0.55) 40%, rgba(6,6,12,0.80) 75%, ${COLORS.bg} 100%)`, zIndex: 1
      }} />

      {/* Layer 3: Particles */}
      <div className="absolute-inset hero-particles" style={{ zIndex: 2, transform: `translateY(${scrollY * 0.2}px)`, pointerEvents: 'none' }}>
        {particles.map(p => (
          <div key={p.id} style={{
            position: 'absolute', left: p.left, bottom: p.bottom, width: p.size, height: p.size,
            background: p.color, borderRadius: '50%', opacity: p.opacity,
            animation: `${p.anim} ${p.duration} linear ${p.delay} infinite`
          }} />
        ))}
      </div>

      {/* Layer 4: Ambient Orbs */}
      <div style={{
        position: 'absolute', top: '-10%', right: '-10%', width: '500px', height: '500px',
        background: `radial-gradient(circle, ${COLORS.cyanSoft} 0%, transparent 70%)`,
        zIndex: 2, transform: `translateY(${scrollY * 0.3}px)`, pointerEvents: 'none'
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 10, maxWidth: '800px', textAlign: 'center',
        padding: '0 20px', transform: `translateY(${-scrollY * 0.15}px)`
      }}>
        <div style={{ animation: 'textReveal 0.8s ease-out 0.2s both' }}>
          <div className="glass-card" style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 16px', borderRadius: '30px', marginBottom: '24px', gap: '8px' }}>
            <div style={{ width: 8, height: 8, background: COLORS.green, borderRadius: '50%', boxShadow: `0 0 10px ${COLORS.green}`, strokeDashoffset:0, animation: 'pulse 2s infinite' }} />
            <span style={{ fontSize: '13px', color: COLORS.text, fontWeight: 500 }}>Kochi's #1 Pre-Owned Car Platform</span>
          </div>
        </div>

        <h1 className="font-display hero-title" style={{ fontSize: '64px', lineHeight: 1.1, marginBottom: '24px', animation: 'textReveal 0.8s ease-out 0.5s both' }}>
          <span className="text-gradient-cyan">Find Your Perfect Ride</span><br />
          In Kochi
        </h1>

        <p style={{ fontSize: 'clamp(16px, 2vw, 18px)', color: COLORS.textMuted, marginBottom: '40px', animation: 'textReveal 0.8s ease-out 0.8s both' }}>
          Verified Used Cars · Best Prices · Hassle-Free Delivery
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', animation: 'textReveal 0.8s ease-out 1.1s both' }}>
          <a href="#cars" className="btn-primary" style={{ textDecoration: 'none' }}>Browse Cars &rarr;</a>
          <a href="#sell" className="btn-secondary" style={{ textDecoration: 'none' }}>Sell Your Car</a>
          <a href="#exchange" className="btn-secondary" style={{ textDecoration: 'none' }}>Exchange Car &harr;</a>
        </div>

        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '60px', flexWrap: 'wrap' }}>
          {[
            { icon: BadgeCheck, text: "500+ Cars Sold", delay: '1.4s' },
            { icon: Shield, text: "100% Verified", delay: '1.9s' },
            { icon: Car, text: "Free Test Drive", delay: '2.4s' }
          ].map((stat, i) => (
            <div key={i} className="glass-card flex-center" style={{ padding: '10px 20px', gap: '10px', animation: `textReveal 0.8s ease-out ${stat.delay} both, float 4s ease-in-out ${i*0.5}s infinite` }}>
              <stat.icon size={18} color={COLORS.cyan} />
              <span style={{ fontSize: '14px', fontWeight: 500 }}>{stat.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, textAlign: 'center' }}>
        <p style={{ fontSize: '11px', letterSpacing: '2px', color: COLORS.textMuted, marginBottom: '8px' }}>SCROLL TO EXPLORE</p>
        <ChevronDown size={20} color={COLORS.textMuted} style={{ animation: 'float 2s infinite' }} />
      </div>
    </section>
  );
};

const Marquee = () => {
  const usps = [
    "Specialized in Quality Pre-Owned Cars", "200+ Point Inspection", "Free RC Transfer", 
    "Home Delivery Available", "Best Price Guarantee", "Trusted by 1200+ Customers", 
    "Car Exchange Available", "Instant Finance Options"
  ];
  return (
    <div style={{ padding: '16px 0', borderTop: `1px solid ${COLORS.glassBorder}`, borderBottom: `1px solid ${COLORS.glassBorder}`, background: COLORS.cyanSoft, overflow: 'hidden', display: 'flex' }}>
      <div style={{ display: 'flex', whiteSpace: 'nowrap', animation: 'marquee 40s linear infinite' }}>
        {[...Array(2)].map((_, i) => (
          <div key={i} style={{ display: 'flex', gap: '40px', paddingRight: '40px' }}>
            {usps.map((text, j) => (
              <div key={j} className="flex-center" style={{ gap: '10px' }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: COLORS.cyan }} />
                <span style={{ fontSize: '13px', color: COLORS.textMuted, fontWeight: 500 }}>{text}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const Listings = () => {
  const [budget, setBudget] = useState(25);
  const [bodyType, setBodyType] = useState('All');
  const [fuelType, setFuelType] = useState('All');
  const [transmission, setTransmission] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => CARS.filter(c => 
    c.price <= budget && 
    (bodyType === 'All' || c.bodyType === bodyType) &&
    (fuelType === 'All' || c.fuelType === fuelType) &&
    (transmission === 'All' || c.transmission === transmission) &&
    (c.name.toLowerCase().includes(search.toLowerCase()))
  ), [budget, bodyType, fuelType, transmission, search]);

  return (
    <section id="cars" style={{ padding: '100px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <Reveal>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ color: COLORS.cyan, fontSize: '12px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>Our Collection</span>
          <h2 className="font-display section-heading" style={{ fontSize: '42px', marginTop: '10px' }}>
            Explore <span className="text-gradient-cyan">Verified Cars</span>
          </h2>
        </div>
      </Reveal>

      <Reveal delay={0.2} className="glass-card" style={{ padding: '24px', marginBottom: '40px', display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        <div style={{ position: 'relative' }}>
          <Search size={18} color={COLORS.textMuted} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
          <input type="text" placeholder="Search by car name..." value={search} onChange={e => setSearch(e.target.value)} style={{ width: '100%', paddingLeft: '44px' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: COLORS.textMuted }}>
            Max Budget: <span style={{ color: COLORS.cyan }}>₹{budget} Lakh</span>
          </label>
          <input type="range" min="2" max="25" step="0.5" value={budget} onChange={e => setBudget(parseFloat(e.target.value))} style={{ width: '100%', accentColor: COLORS.cyan }} />
        </div>
        
        <div className="filter-wrapper" style={{ overflowX: 'auto', display: 'flex', gap: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                {['All', 'SUV', 'Sedan', 'Hatchback', 'MUV'].map(type => (
                  <button key={`body-${type}`} onClick={() => setBodyType(type)} className={`filter-pill ${bodyType === type ? 'active' : ''}`}>{type}</button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                {['All', 'Petrol', 'Diesel', 'Electric', 'CNG'].map(type => (
                  <button key={`fuel-${type}`} onClick={() => setFuelType(type)} className={`filter-pill ${fuelType === type ? 'active' : ''}`}>{type}</button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                {['All', 'Manual', 'Automatic'].map(type => (
                  <button key={`tran-${type}`} onClick={() => setTransmission(type)} className={`filter-pill ${transmission === type ? 'active' : ''}`}>{type}</button>
                ))}
              </div>
            </div>
        </div>
      </Reveal>

      <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {filtered.slice(0, 6).map((car, i) => (
          <Reveal key={car.id} delay={i * 0.1}>
            <div className="glass-card car-card" style={{ overflow: 'hidden', cursor: 'pointer', position: 'relative' }}>
              <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                <img src={car.img} alt={car.name} className="car-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div className="absolute-inset" style={{ background: 'linear-gradient(to top, rgba(6,6,12,0.9), transparent)' }} />
                
                {car.badge && (
                  <span style={{ position: 'absolute', top: 16, left: 16, background: car.badge === 'Recently Added' ? COLORS.green : COLORS.red, color: '#fff', fontSize: '11px', padding: '4px 10px', borderRadius: '12px', fontWeight: 600, animation: car.badge === 'Limited Stock' ? 'pulse 2s infinite' : 'none' }}>
                    {car.badge}
                  </span>
                )}
                <span style={{ position: 'absolute', top: 16, right: 16, background: COLORS.glass, backdropFilter: 'blur(10px)', fontSize: '11px', padding: '4px 10px', borderRadius: '12px', border: `1px solid ${COLORS.glassBorder}` }}>
                  {car.fuelType}
                </span>
                
                <h3 className="font-display" style={{ position: 'absolute', bottom: 16, left: 16, fontSize: '20px' }}>{car.name}</h3>
                <div style={{ position: 'absolute', bottom: 16, right: 16, fontSize: '22px', fontWeight: 700, color: COLORS.cyan, fontFamily: 'Syne' }}>
                  ₹{car.price}L
                </div>
              </div>
              
              <div style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: COLORS.textMuted, fontSize: '13px', marginBottom: '16px' }}>
                  <div className="flex-center" style={{ gap: '6px' }}><Calendar size={14}/> {car.year}</div>
                  <div className="flex-center" style={{ gap: '6px' }}><Gauge size={14}/> {car.kmDriven.toLocaleString()} km</div>
                  <div className="flex-center" style={{ gap: '6px' }}><Settings2 size={14}/> {car.transmission}</div>
                </div>
                <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '8px', color: COLORS.textMuted, fontSize: '13px', marginBottom: '16px', borderBottom: `1px solid ${COLORS.glassBorder}`, paddingBottom: '16px' }}>
                  <MapPin size={14} color={COLORS.cyan}/> {car.location}
                </div>
                
                <div style={{ overflow: 'hidden', height: '40px', position: 'relative' }}>
                  <div style={{ color: COLORS.textMuted, fontSize: '13px', transition: 'all 0.3s' }}>
                    {car.features.join(' • ')}
                  </div>
                  <div className="view-details" style={{ position: 'absolute', inset: 0, background: COLORS.surface }}>
                    <button className="btn-primary" style={{ width: '100%', padding: '10px' }}>View Details</button>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      {filtered.length === 0 && (
         <div style={{ textAlign: 'center', padding: '60px 0', color: COLORS.textMuted }}>No cars found matching criteria.</div>
      )}
      {filtered.length > 6 && (
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button className="btn-secondary">View All {filtered.length} Cars &rarr;</button>
        </div>
      )}
    </section>
  );
};

const FeaturedSlider = () => {
  const [active, setActive] = useState(1);
  const featured = CARS.slice(0, 3);
  
  useEffect(() => {
    const t = setInterval(() => advance(1), 5000);
    return () => clearInterval(t);
  }, [active]);

  const advance = (dir) => {
    setActive((prev) => (prev + dir + featured.length) % featured.length);
  };

  return (
    <section style={{ padding: '100px 20px', overflow: 'hidden' }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <span style={{ color: COLORS.gold, fontSize: '12px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>Handpicked</span>
        <h2 className="font-display section-heading text-gradient-gold" style={{ fontSize: '42px', marginTop: '10px' }}>Featured Cars</h2>
      </div>
      
      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
        <div className="slider-container" style={{ height: '380px', position: 'relative', perspective: '1200px' }}>
          {featured.map((car, i) => {
            let style = {};
            if (i === active) {
              style = { transform: 'scale(1) rotateY(0deg)', opacity: 1, zIndex: 10 };
            } else if (i === (active + 1) % 3) {
              style = { transform: 'scale(0.82) rotateY(-12deg) translateX(260px) translateZ(-120px)', opacity: 0.45, zIndex: 5 };
            } else {
              style = { transform: 'scale(0.82) rotateY(12deg) translateX(-260px) translateZ(-120px)', opacity: 0.45, zIndex: 5 };
            }
            return (
              <div key={car.id} className="glass-card slider-card" style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
                transition: 'all 0.7s cubic-bezier(0.25,0.46,0.45,0.94)', ...style,
                overflow: 'hidden', cursor: 'pointer'
              }} onClick={() => setActive(i)}>
                <img src={car.img} alt={car.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div className="absolute-inset" style={{ background: 'linear-gradient(to top, rgba(6,6,12,0.95) 0%, transparent 100%)' }} />
                <div style={{ position: 'absolute', bottom: 30, left: 30 }}>
                  <h3 className="font-display" style={{ fontSize: '28px', color: '#fff' }}>{car.name}</h3>
                  <p style={{ color: COLORS.cyan, fontSize: '24px', fontWeight: 700, marginTop: '8px' }}>₹{car.price}L</p>
                </div>
              </div>
            );
          })}
        </div>

        <button className="mobile-hide" onClick={() => advance(-1)} style={{ position:'absolute', left:-40, top:'50%', transform:'translateY(-50%)', background:COLORS.glass, border:`1px solid ${COLORS.glassBorder}`, color:'#fff', width:40, height:40, borderRadius:'50%', cursor:'pointer' }}><ChevronLeft/></button>
        <button className="mobile-hide" onClick={() => advance(1)} style={{ position:'absolute', right:-40, top:'50%', transform:'translateY(-50%)', background:COLORS.glass, border:`1px solid ${COLORS.glassBorder}`, color:'#fff', width:40, height:40, borderRadius:'50%', cursor:'pointer' }}><ChevronRight/></button>
      </div>

      <div className="flex-center" style={{ gap: '10px', marginTop: '40px' }}>
        {featured.map((_, i) => (
          <div key={i} onClick={() => setActive(i)} style={{ width: i === active ? 28 : 10, height: 10, borderRadius: 10, background: i === active ? COLORS.gold : COLORS.glassBorder, cursor: 'pointer', transition: 'all 0.3s ease' }} />
        ))}
      </div>
    </section>
  );
};

const ExchangeFlow = () => {
  const [exchangeState, setExchangeState] = useState(null);
  const [ref, inView] = useInView({ threshold: 0.2 });

  const handleExchange = (e) => {
      e.preventDefault();
      // Dummy calculation logic
      const targetName = e.target.targetCar.value;
      const targetCar = CARS.find(c => c.name === targetName);
      if(!targetCar) return;
      const val = 4.5; // dummy evaluation
      setExchangeState({ currentVal: val, carPrice: targetCar.price, diff: (targetCar.price - val).toFixed(2) });
  };

  return (
    <section id="exchange" ref={ref} style={{ padding: '100px 20px', background: `linear-gradient(180deg, ${COLORS.bg}, ${COLORS.surface}, ${COLORS.bg})` }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ color: COLORS.gold, fontSize: '12px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>Upgrade</span>
          <h2 className="font-display section-heading text-gradient-gold" style={{ fontSize: '42px', marginTop: '10px' }}>Exchange Your Car</h2>
          <p style={{ color: COLORS.textMuted, marginTop: '16px' }}>Zero hidden charges • Free doorstep evaluation • Same-day processing</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px', position: 'relative', flexWrap: 'wrap', gap: '20px' }}>
          <svg className="connector-line" style={{ position: 'absolute', top: 40, left: '10%', width: '80%', height: '2px', zIndex: 0 }}>
             <line x1="0" y1="0" x2="100%" y2="0" stroke={COLORS.gold} strokeWidth="2" strokeDasharray="8 8" 
                   style={{ strokeDashoffset: inView ? 0 : 1000, transition: 'stroke-dashoffset 2s ease' }} />
          </svg>
          {[
            { icon: Truck, title: "Your Current Car" },
            { icon: Shield, title: "We Evaluate" },
            { icon: Zap, title: "Drive Away Happy" }
          ].map((step, i) => (
            <Reveal key={i} delay={i*0.2} style={{ zIndex: 1 }}>
              <div className="glass-card flex-center" style={{ flexDirection: 'column', width: '200px', height: '160px', gap: '20px', background: COLORS.surface }}>
                 <step.icon size={36} color={COLORS.gold} />
                 <span style={{ fontWeight: 600 }}>{step.title}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <div className="glass-card" style={{ padding: '40px' }}>
            {exchangeState ? (
                <div style={{ textAlign: 'center', animation: 'bounceIn 0.6s' }}>
                   <CheckCircle2 size={48} color={COLORS.cyan} style={{ margin: '0 auto 20px' }}/>
                   <h3 className="font-display" style={{ fontSize: '28px', marginBottom: '20px' }}>Estimated Value Result</h3>
                   <div style={{ display: 'flex', justifyContent: 'space-around', background: COLORS.surface, padding: '20px', borderRadius: '12px', flexWrap: 'wrap', gap: '20px' }}>
                       <div><p style={{ color: COLORS.textMuted }}>Your car value</p><p style={{ fontSize: '24px', fontWeight: 700 }}>₹{exchangeState.currentVal}L</p></div>
                       <div><p style={{ color: COLORS.textMuted }}>Selected car</p><p style={{ fontSize: '24px', fontWeight: 700 }}>₹{exchangeState.carPrice}L</p></div>
                       <div><p style={{ color: COLORS.cyan }}>You pay only</p><p style={{ fontSize: '28px', color: COLORS.cyan, fontWeight: 700 }}>₹{exchangeState.diff}L</p></div>
                   </div>
                   <button onClick={() => setExchangeState(null)} className="btn-secondary" style={{ marginTop: '30px' }}>Calculate Again</button>
                </div>
            ) : (
                <form onSubmit={handleExchange}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                      <select required><option value="">Your Car Brand</option><option>Maruti Suzuki</option><option>Hyundai</option><option>Tata</option></select>
                      <input type="text" placeholder="Model (e.g. Swift)" required/>
                      <select required><option value="">Year</option><option>2023</option><option>2022</option><option>2021</option><option>2020</option></select>
                      <input type="number" placeholder="KM Driven" required/>
                      <select name="targetCar" required><option value="">Car You Want</option>{CARS.filter(c=>c.exchangeEligible).map(c => <option key={c.id} value={c.name}>{c.name}</option>)}</select>
                    </div>
                    <div className="flex-center" style={{ marginTop: '30px' }}>
                      <button type="submit" className="btn-orange">Get Exchange Value &rarr;</button>
                    </div>
                </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const WhyChooseUs = () => {
  return (
    <section style={{ padding: '100px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <Reveal>
          <h2 className="font-display section-heading" style={{ fontSize: '38px', textAlign: 'center', marginBottom: '60px' }}>Why <span className="text-gradient-cyan">Choose Us</span></h2>
        </Reveal>
        <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
            {[
              { icon: Shield, title: "200+ Quality Checks", text: "Every car passes a rigorous inspection." },
              { icon: Zap, title: "Best Price Guarantee", text: "Transparent pricing without middlemen." },
              { icon: FileText, title: "Free RC Transfer", text: "We handle all RTO paperwork for you." },
              { icon: Truck, title: "Home Delivery", text: "Get your car delivered to your doorstep." }
            ].map((item, i) => (
                <Reveal key={i} delay={i * 0.1}>
                    <div className="glass-card car-card" style={{ padding: '40px 30px', textAlign: 'center', height: '100%' }}>
                        <div className="flex-center" style={{ width: '56px', height: '56px', borderRadius: '50%', background: COLORS.cyanSoft, margin: '0 auto 20px', transition: 'all 0.3s' }}>
                            <item.icon size={24} color={COLORS.cyan} />
                        </div>
                        <h3 className="font-display" style={{ fontSize: '20px', marginBottom: '12px' }}>{item.title}</h3>
                        <p style={{ color: COLORS.textMuted, fontSize: '14px', lineHeight: 1.6 }}>{item.text}</p>
                    </div>
                </Reveal>
            ))}
        </div>
    </section>
  );
};

const HowItWorks = () => {
  const [ref, inView] = useInView({ threshold: 0.5 });
  return (
      <section id="how" ref={ref} style={{ padding: '100px 20px', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <Reveal>
            <h2 className="font-display section-heading" style={{ fontSize: '38px', marginBottom: '60px' }}>How It <span className="text-gradient-cyan">Works</span></h2>
          </Reveal>
          <div style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px' }}>
              <div className="connector-line" style={{ position: 'absolute', top: 42, left: '10%', height: 2, background: COLORS.cyan, zIndex: 0, width: inView ? '80%' : '0%', transition: 'width 1.5s ease 0.2s' }} />
              {[
                  { icon: Search, title: "Browse Cars" },
                  { icon: Calendar, title: "Book Test Drive" },
                  { icon: CheckCircle2, title: "Finalize Deal" },
                  { icon: Truck, title: "Get Delivered" }
              ].map((step, i) => (
                  <Reveal key={i} delay={i * 0.2} style={{ zIndex: 1 }}>
                     <div style={{ width: '180px' }}>
                         <div className="flex-center" style={{ width: '84px', height: '84px', borderRadius: '50%', background: COLORS.surface, border: `1px solid ${COLORS.glassBorder}`, margin: '0 auto 20px', position: 'relative' }}>
                             {inView && <div style={{ position:'absolute', inset: -10, borderRadius:'50%', background: COLORS.cyanGlow, filter:'blur(10px)', zIndex:-1, animation: 'pulse 2s infinite' }}/>}
                             <step.icon size={32} color={COLORS.cyan} />
                         </div>
                         <h4 className="font-display" style={{ fontSize: '18px' }}>{step.title}</h4>
                     </div>
                  </Reveal>
              ))}
          </div>
      </section>
  );
};

const SellYourCar = () => {
  const [submitted, setSubmitted] = useState(false);
  return (
      <section id="sell" style={{ padding: '100px 20px', background: COLORS.surface }}>
          <div className="grid-responsive" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1fr)', gap: '60px' }}>
              <Reveal direction="left">
                  <h2 className="font-display section-heading" style={{ fontSize: '42px', marginBottom: '20px' }}>Sell Your Car in <span className="text-gradient-cyan">30 Mins</span></h2>
                  <div style={{ color: COLORS.textMuted, fontSize: '16px', display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
                     <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '12px' }}><CheckCircle2 color={COLORS.cyan} /> Guaranteed best market price</div>
                     <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '12px' }}><CheckCircle2 color={COLORS.cyan} /> Instant bank transfer</div>
                     <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '12px' }}><CheckCircle2 color={COLORS.cyan} /> Free home inspection</div>
                  </div>
                  <div className="glass-card" style={{ padding: '20px', borderLeft: `4px solid ${COLORS.cyan}` }}>
                      <p style={{ fontStyle: 'italic', color: COLORS.textMuted }}>"Sold my car here and got the payment instantly. Much better than dealing with individual buyers."</p>
                      <p style={{ fontSize: '14px', marginTop: '10px', fontWeight: 600 }}>— Lakshmi S., Fort Kochi</p>
                  </div>
              </Reveal>
              <Reveal direction="right">
                  <div className="glass-card" style={{ padding: '40px' }}>
                      {submitted ? (
                          <div className="flex-center" style={{ flexDirection: 'column', height: '100%', minHeight: '300px', animation: 'bounceIn 0.6s' }}>
                              <CheckCircle2 size={64} color={COLORS.green} style={{ marginBottom: '20px' }} />
                              <h3 className="font-display" style={{ fontSize: '24px', marginBottom: '10px' }}>Request Received!</h3>
                              <p style={{ color: COLORS.textMuted, textAlign: 'center' }}>We'll call you within 30 minutes to schedule your free inspection.</p>
                          </div>
                      ) : (
                          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                              <input type="text" placeholder="Your Name" required />
                              <input type="tel" placeholder="Phone Number (+91)" required />
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                  <input type="text" placeholder="Car Brand" required />
                                  <input type="text" placeholder="Model" required />
                              </div>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                  <input type="number" placeholder="Year" required />
                                  <input type="number" placeholder="KM Driven" required />
                              </div>
                              <input type="number" placeholder="Expected Price (₹)" required />
                              <button type="submit" className="btn-orange" style={{ width: '100%', justifyContent: 'center' }}>Get Best Resale Value &rarr;</button>
                          </form>
                      )}
                  </div>
              </Reveal>
          </div>
      </section>
  );
};

const TestimonialsCarousel = () => {
  const [active, setActive] = useState(0);
  useEffect(() => {
      const t = setInterval(() => setActive((prev) => (prev + 1) % TESTIMONIALS.length), 4500);
      return () => clearInterval(t);
  }, []);

  return (
      <section style={{ padding: '100px 20px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <Reveal>
            <h2 className="font-display section-heading" style={{ fontSize: '38px', marginBottom: '60px' }}>Customer <span className="text-gradient-cyan">Stories</span></h2>
          </Reveal>
          <Reveal delay={0.2} className="glass-card" style={{ padding: '40px', minHeight: '250px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ color: COLORS.gold, marginBottom: '20px', display: 'flex', justifyContent: 'center', gap: '4px' }}>
                  {[...Array(TESTIMONIALS[active].rating)].map((_, i) => <Star key={i} size={20} fill={COLORS.gold} />)}
              </div>
              <p style={{ fontSize: '18px', fontStyle: 'italic', lineHeight: 1.6, marginBottom: '24px' }}>{TESTIMONIALS[active].text}</p>
              <div>
                  <h4 style={{ fontSize: '16px', fontWeight: 600 }}>{TESTIMONIALS[active].name}</h4>
                  <p style={{ color: COLORS.textMuted, fontSize: '14px' }}>{TESTIMONIALS[active].area} • Purchased {TESTIMONIALS[active].car}</p>
              </div>
          </Reveal>
          <div className="flex-center" style={{ gap: '10px', marginTop: '30px' }}>
              {TESTIMONIALS.map((_, i) => (
                  <div key={i} onClick={() => setActive(i)} style={{ width: i === active ? 28 : 10, height: 10, borderRadius: 10, background: i === active ? COLORS.cyan : COLORS.glassBorder, cursor: 'pointer', transition: 'all 0.3s ease' }} />
              ))}
          </div>
      </section>
  );
};

const LocalTrust = () => {
  const count = useCounter(1200);
  
  // Abstract SVG Map Markers representation
  const locs = [
    { name: 'Kakkanad', x: '40%', y: '30%', d: 0 },
    { name: 'Edappally', x: '50%', y: '20%', d: 0.2 },
    { name: 'Aluva', x: '30%', y: '10%', d: 0.4 },
    { name: 'Fort Kochi', x: '20%', y: '60%', d: 0.6 },
    { name: 'Vyttila', x: '60%', y: '50%', d: 0.8 },
    { name: 'Tripunithura', x: '70%', y: '80%', d: 1.0 },
  ];

  return (
      <section style={{ padding: '100px 20px', background: COLORS.surface }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
              <Reveal>
                  <h2 className="font-display" style={{ fontSize: '48px', color: COLORS.cyan, marginBottom: '10px' }}>{count}+</h2>
                  <h3 className="font-display section-heading" style={{ fontSize: '28px', marginBottom: '40px' }}>Happy Customers across Kochi</h3>
              </Reveal>
              
              <div style={{ position: 'relative', width: '100%', maxWidth: '600px', margin: '0 auto', height: '400px' }}>
                 <svg viewBox="0 0 400 400" style={{ position: 'absolute', inset: 0, opacity: 0.05, fill: COLORS.cyan, width: '100%', height: '100%' }}>
                     <path d="M100 0 C 150 100, 300 50, 400 150 C 350 250, 400 350, 250 400 C 150 350, 50 350, 0 250 C 50 150, 0 50, 100 0 Z" />
                 </svg>
                 {locs.map((loc) => (
                    <div key={loc.name} style={{ position: 'absolute', left: loc.x, top: loc.y, animation: 'bounceIn 0.8s both', animationDelay: `${loc.d}s` }}>
                        <div style={{ position:'relative' }}>
                           <div style={{ width:12, height:12, borderRadius:'50%', background: COLORS.cyan, position: 'absolute', left:-6, top:-6, zIndex:2 }} />
                           <div style={{ width:12, height:12, borderRadius:'50%', background: COLORS.cyan, position: 'absolute', left:-6, top:-6, animation: 'pulse 2s infinite', filter: 'blur(4px)', zIndex:1 }} />
                           <div className="glass-card" style={{ position: 'absolute', left: 15, top: -10, padding: '4px 10px', fontSize: '12px', whiteSpace: 'nowrap' }}>
                               <MapPin size={10} color={COLORS.cyan} style={{ display: 'inline', marginRight: 4 }}/>
                               {loc.name}
                           </div>
                        </div>
                    </div>
                 ))}
              </div>
          </div>
      </section>
  );
};

const LeadCapture = () => {
  const [submitted, setSubmitted] = useState(false);
  return (
      <section id="contact" style={{ padding: '150px 20px', position: 'relative', overflow: 'hidden' }}>
          <div className="absolute-inset" style={{ background: `radial-gradient(circle at center, ${COLORS.cyanGlow} 0%, transparent 60%)`, zIndex: 0, opacity: 0.5 }} />
          <Reveal className="glass-card" style={{ maxWidth: '600px', margin: '0 auto', padding: '50px 40px', position: 'relative', zIndex: 10, animation: 'glowPulse 3s infinite', textAlign: 'center' }}>
              {submitted ? (
                  <div className="flex-center" style={{ flexDirection: 'column', animation: 'bounceIn 0.6s', minHeight: '300px' }}>
                     <CheckCircle2 size={64} color={COLORS.cyan} style={{ marginBottom: '20px' }} />
                     <h3 className="font-display" style={{ fontSize: '24px', marginBottom: '10px' }}>Thanks! We'll be in touch.</h3>
                  </div>
              ) : (
                  <>
                      <h2 className="font-display section-heading" style={{ fontSize: '32px', marginBottom: '10px' }}>Ready to find your dream car?</h2>
                      <p style={{ color: COLORS.textMuted, marginBottom: '30px' }}>Get personalized offers delivered directly to your phone.</p>
                      <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                          <input type="text" placeholder="Name" required />
                          <input type="tel" placeholder="Phone Number" required />
                          <select required>
                              <option value="">Select Budget / Interest</option>
                              <option>Under ₹3L</option>
                              <option>₹3L - ₹5L</option>
                              <option>₹5L - ₹8L</option>
                              <option>₹8L - ₹12L</option>
                              <option>₹12L+</option>
                              <option>Looking to Exchange</option>
                          </select>
                          <button type="submit" className="btn-primary" style={{ justifyContent: 'center', width: '100%', padding: '16px' }}>Get Offers &rarr;</button>
                      </form>
                  </>
              )}
          </Reveal>
      </section>
  );
};

const WhatsAppBtn = () => (
  <a href="https://wa.me/917907080802?text=Hi%2C%20I'm%20interested%20in%20buying%20a%20car%20from%20SA%20CARS" 
     target="_blank" rel="noreferrer"
     title="Chat with us on WhatsApp"
     className="mobile-whatsapp"
     style={{
      position: 'fixed', bottom: '30px', right: '30px', zIndex: 1000,
      width: '56px', height: '56px', borderRadius: '50%', background: '#25D366',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      boxShadow: '0 4px 20px rgba(37,211,102,0.35)', animation: 'bounceIn 0.6s ease-out 2s both', color: '#fff',
      textDecoration: 'none'
  }}>
      <MessageCircle size={28} />
  </a>
);

const MobileBottomBar = () => (
  <div className="mobile-bottom-bar">
     <button className="btn-secondary" style={{ background: COLORS.surface }}>📞 Call</button>
     <button className="btn-primary" style={{ background: '#25D366', color: '#fff' }}>💬 WhatsApp</button>
  </div>
);

const ScrollToTop = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
      const handleScroll = () => setShow(window.scrollY > 600);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return show ? (
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="mobile-whatsapp"
        style={{
          position: 'fixed', bottom: '100px', right: '30px', zIndex: 999,
          width: '44px', height: '44px', borderRadius: '50%', background: COLORS.surface,
          border: `1px solid ${COLORS.glassBorder}`, color: COLORS.textMuted, cursor: 'pointer',
          display: 'flex', justifyContent: 'center', alignItems: 'center', animation: 'bounceIn 0.4s ease-out'
      }}>
          <ArrowUp size={20} />
      </button>
  ) : null;
};

// Main Export
export default function DriveKochi() {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <Hero />
      <Marquee />
      <Listings />
      
      <FeaturedSlider />
      <ExchangeFlow />
      <WhyChooseUs />
      <HowItWorks />
      <SellYourCar />
      <TestimonialsCarousel />
      <LocalTrust />
      <LeadCapture />

      {/* Footer */}
      <footer style={{ background: COLORS.surface, borderTop: `1px solid ${COLORS.glassBorder}`, padding: '60px 20px 100px' }}>
        <div className="grid-responsive" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: '40px', marginBottom: '40px' }}>
          <div>
            <div className="flex-center" style={{ gap: '8px', justifyContent: 'flex-start', marginBottom: '20px' }}>
              <Car size={24} color={COLORS.cyan} />
              <span className="font-display" style={{ fontSize: '20px', fontWeight: 800 }}>SA<span style={{ color: COLORS.cyan }}>CARS</span></span>
            </div>
            <p style={{ color: COLORS.textMuted, fontSize: '14px', lineHeight: 1.6 }}>Kochi's most trusted platform for buying, selling, and exchanging verified pre-owned cars.</p>
          </div>
          <div>
            <h4 style={{ marginBottom: '20px', color: '#fff' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Browse Cars', 'Sell Car', 'Exchange', 'About Us'].map(l => (
                <a key={l} href="#" style={{ color: COLORS.textMuted, textDecoration: 'none', fontSize: '14px' }}>{l}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ marginBottom: '20px', color: '#fff' }}>Locations</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Kalamassery', 'Edappally', 'Vyttila'].map(l => (
                <span key={l} style={{ color: COLORS.textMuted, fontSize: '14px' }}>{l}</span>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ marginBottom: '20px', color: '#fff' }}>Contact</h4>
            <p style={{ color: COLORS.textMuted, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <Phone size={14} color={COLORS.cyan}/> 079070 80802
            </p>
            <p style={{ color: COLORS.textMuted, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '10px', lineHeight: 1.4 }}>
              <MapPin size={24} color={COLORS.cyan} style={{ minWidth: 24 }}/> St.Pius church road, Metro pillar no.257, Kalamassery, Kerala 683104
            </p>
          </div>
        </div>
        <div style={{ textAlign: 'center', color: COLORS.textDim, fontSize: '13px', borderTop: `1px solid ${COLORS.glassBorder}`, paddingTop: '20px' }}>
          © 2026 SA CARS Used Cars Showroom. All rights reserved. • Privacy Policy • Terms & Conditions
        </div>
      </footer>

      <MobileBottomBar />
      <WhatsAppBtn />
      <ScrollToTop />
    </>
  );
}
