import { useRef, useEffect, useState, type FC, type ReactNode } from "react";
import { CalendarDays, Clock, Globe, Instagram, Mail, MapPin, Phone, Facebook, Ticket } from "lucide-react";
import { ThreeBackground } from "./src/ThreeBackground";

const openingLogo = new URL("./src/WhatsApp Image 2026-04-15 at 22.41.08.jpeg", import.meta.url).href;

interface PosterLocandinaProps {
  venueName?:     string;
  bgImage?:       string;
  eventType?:     string;
  eventDate?:     string;
  eventTime?:     string;
  ticketInfo?:    string;
  description?:   string;
  lineup?:        string[];
  website?:       string;
  email?:         string;
  instagramLabel?: string;
  instagramUrl?:  string;
  note?:          string;
  title?:         string[];
  subtitle?:      string;
  tagline?:       string;
  features?:      string[];
  badgeText?:     string;
  city?:          string;
  address?:       string;
  phone?:         string;
  phoneHref?:     string;
  facebookLabel?: string;
  facebookUrl?:   string;
  fileName?:      string;
}

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Outfit:wght@300;400;500;600;700&display=swap');

  .pl-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 56px 16px;
    background: radial-gradient(ellipse at 50% 0%, rgba(20,40,20,0.8) 0%, #060906 60%);
    font-family: 'Outfit', sans-serif;
    -webkit-font-smoothing: antialiased;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
  }

  .pl-poster {
    position: relative;
    width: 100%;
    max-width: 800px;
    aspect-ratio: 2 / 3;
    overflow: hidden;
    background: #050d08;
    border: 1px solid rgba(212, 175, 55, 0.22);
    border-radius: 24px;
    box-shadow:
      0 0 0 1px rgba(212,175,55,0.05),
      0 0 80px rgba(212,175,55,0.14),
      0 32px 80px rgba(0,0,0,0.55),
      0 64px 160px rgba(0,0,0,0.45);
  }

  .pl-poster::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 10;
    pointer-events: none;
    opacity: 0.05;
    mix-blend-mode: overlay;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 220px;
  }

  .pl-poster::after {
    content: '';
    position: absolute;
    inset: 0;
    border: 1px solid rgba(212, 175, 55, 0.08);
    box-shadow: inset 0 0 80px rgba(212, 175, 55, 0.05);
    pointer-events: none;
    z-index: 11;
  }

  .pl-bg {
    position: absolute;
    inset: 0;
    overflow: hidden;
    z-index: 0;
    background: radial-gradient(circle at top center, rgba(212,175,55,0.12), transparent 28%),
                linear-gradient(135deg, #11210f, #1c2d18 45%, #0b1009 100%);
  }

  .pl-bg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transform: scale(1.08);
    filter: saturate(1.15) contrast(1.05) brightness(0.82);
    transition: transform 8s ease;
    mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0.2) 65%, rgba(0,0,0,0) 100%);
    -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.85) 35%, rgba(0,0,0,0.2) 65%, rgba(0,0,0,0) 100%);
  }

  .pl-bg-fallback {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at top center, rgba(212,175,55,0.18), transparent 24%),
                linear-gradient(135deg, #0d130c, #152717 32%, #09100b 100%);
  }

  .pl-event-chip {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 8px 22px;
    border: 1px solid rgba(212, 175, 55, 0.45);
    border-radius: 999px;
    font-size: 0.72rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #D4AF37;
    margin-bottom: 18px;
    background: rgba(212,175,55,0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: 0 0 28px rgba(212,175,55,0.18), inset 0 1px 0 rgba(212,175,55,0.15);
  }

  .pl-logo-top {
    display: block;
    width: 92px;
    height: 92px;
    margin: 0 auto 16px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow:
      0 0 0 2px rgba(212,175,55,0.5),
      0 0 28px rgba(212,175,55,0.3),
      0 18px 48px rgba(0,0,0,0.4);
    border: 2px solid rgba(212,175,55,0.25);
  }

  .pl-event-chip {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 7px 22px;
    border: 1px solid rgba(212, 175, 55, 0.5);
    border-radius: 999px;
    font-size: 0.68rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: #D4AF37;
    margin-bottom: 12px;
    background: rgba(212,175,55,0.08);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 0 32px rgba(212,175,55,0.22), inset 0 1px 0 rgba(212,175,55,0.18);
  }

  .pl-event-chip span {
    display: inline-block;
    transform: translateY(-1px);
  }

  .pl-event-meta {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
    margin-bottom: 18px;
  }

  .pl-event-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border: 1px solid rgba(212, 175, 55, 0.22);
    border-radius: 999px;
    font-size: 0.68rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #F4EFE6;
    background: rgba(5,13,8,0.5);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.06);
  }

  .pl-description {
    max-width: 520px;
    margin: 16px auto 0;
    font-size: clamp(0.75rem, 1.2vw, 0.95rem);
    line-height: 1.65;
    color: #F4EFE6;
    opacity: 0.75;
  }

  .pl-lineup {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
  }

  .pl-footer-links {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 16px;
    margin-top: 16px;
  }

  .pl-footer-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 7px 16px;
    border: 1px solid rgba(212,175,55,0.2);
    border-radius: 999px;
    color: rgba(244,239,230,0.7);
    font-size: 0.62rem;
    letter-spacing: 0.12em;
    text-decoration: none;
    background: rgba(212,175,55,0.06);
    backdrop-filter: blur(8px);
    transition: all 0.2s ease;
  }
  .pl-footer-link:hover {
    opacity: 1;
    color: #D4AF37;
    border-color: rgba(212,175,55,0.5);
    background: rgba(212,175,55,0.12);
  }

  .pl-lineup span {
    display: inline-flex;
    align-items: center;
    padding: 8px 14px;
    border: 1px solid rgba(212,175,55,0.2);
    border-radius: 999px;
    font-size: 0.7rem;
    color: #F4EFE6;
    background: rgba(5,13,8,0.55);
    letter-spacing: 0.12em;
  }

  .pl-note {
    margin-top: 14px;
    font-size: 0.66rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #F4EFE6;
    opacity: 0.55;
  }

  .pl-bg::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse at top, rgba(212,175,55,0.08) 0%, transparent 55%),
      linear-gradient(
        to bottom,
        rgba(5,13,8,0.2)  0%,
        rgba(5,13,8,0.08) 20%,
        rgba(5,13,8,0.35) 50%,
        rgba(5,13,8,0.82) 68%,
        rgba(5,13,8,0.97) 82%,
        #050d08            100%
      );
  }

  .pl-corner {
    position: absolute;
    width: 40px;
    height: 40px;
    border-color: rgba(212, 175, 55, 0.15);
    pointer-events: none;
    z-index: 3;
  }
  .pl-corner.tl { top: 4%;    left: 5%;  border-top:    1px solid; border-left:   1px solid; }
  .pl-corner.tr { top: 4%;    right: 5%; border-top:    1px solid; border-right:  1px solid; }
  .pl-corner.bl { bottom: 4%; left: 5%;  border-bottom: 1px solid; border-left:   1px solid; }
  .pl-corner.br { bottom: 4%; right: 5%; border-bottom: 1px solid; border-right:  1px solid; }

  .pl-content {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 8% 8% 6%;
    color: #F4EFE6;
  }

  .pl-top { text-align: center; }

  .pl-shamrock {
    width: 36px;
    height: 36px;
    margin: 0 auto 12px;
    opacity: 0.9;
  }

  .pl-venue-name {
    font-size: 0.55rem;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: #D4AF37;
    font-weight: 600;
  }

  .pl-center {
    text-align: center;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .pl-title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 700;
    font-size: clamp(3.2rem, 10vw, 7rem);
    line-height: 0.85;
    letter-spacing: -0.03em;
    color: #F4EFE6;
    filter: drop-shadow(0 4px 18px rgba(0,0,0,0.85)) drop-shadow(0 2px 6px rgba(0,0,0,0.7));
    background: linear-gradient(180deg, #FFFFFF 0%, #F9E6AB 30%, #F4EFE6 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .pl-subtitle {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 300;
    font-style: italic;
    font-size: clamp(1.1rem, 3vw, 2rem);
    color: #f5db8d;
    letter-spacing: 0.06em;
    margin-top: 8px;
    text-shadow: 0 1px 20px rgba(0,0,0,0.15);
  }

  .pl-deco-line {
    height: 1px;
    background: linear-gradient(90deg, transparent, #D4AF37, transparent);
    margin: 18px auto;
    opacity: 0.7;
    width: 80px;
  }

  .pl-tagline {
    font-size: clamp(0.68rem, 1.5vw, 0.88rem);
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #D4AF37;
    opacity: 0.85;
    font-weight: 500;
  }

  .pl-features {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    margin-top: 24px;
    flex-wrap: wrap;
  }

  .pl-pill {
    font-size: 0.57rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(244,239,230,0.9);
    border: 1px solid rgba(212, 175, 55, 0.28);
    background: rgba(212,175,55,0.07);
    padding: 7px 16px;
    font-weight: 500;
    border-radius: 999px;
    box-shadow: 0 2px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.07);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    transition: background 0.2s ease, border-color 0.2s ease;
  }
  .pl-pill:hover {
    background: rgba(212,175,55,0.15);
    border-color: rgba(212,175,55,0.5);
  }

  .pl-dot {
    width: 3px;
    height: 3px;
    background: #D4AF37;
    border-radius: 50%;
    opacity: 0.4;
  }

  .pl-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 10px;
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(0.85rem, 1.5vw, 1.05rem);
    font-style: italic;
    font-weight: 600;
    color: #F4EFE6;
    opacity: 0.9;
    text-shadow: 0 2px 16px rgba(0, 0, 0, 0.5);
  }

  .pl-bottom {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
  }

  .pl-city {
    font-size: clamp(0.6rem, 1.2vw, 0.75rem);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #F4EFE6;
    opacity: 0.6;
  }

  .pl-address {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(0.85rem, 2vw, 1.15rem);
    color: #F4EFE6;
    opacity: 0.8;
    margin-top: 4px;
  }

  .pl-contacts {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
    margin-top: 16px;
    flex-wrap: wrap;
  }

  .pl-contact-link {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.6rem;
    letter-spacing: 0.1em;
    color: #F4EFE6;
    opacity: 0.5;
    text-decoration: none;
    transition: opacity 0.3s ease, color 0.3s ease;
  }
  .pl-contact-link:hover { opacity: 0.9; color: #D4AF37; }

  .pl-contact-group {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }

  .pl-booking {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-top: 12px;
    width: 100%;
  }

  .pl-call-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-width: 180px;
    padding: 13px 28px;
    border-radius: 999px;
    background: linear-gradient(135deg, #c9a227 0%, #f4efe6 60%, #c9a227 100%);
    background-size: 200% auto;
    color: #08120a;
    font-size: 0.88rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-decoration: none;
    box-shadow:
      0 0 0 1px rgba(212,175,55,0.3),
      0 8px 32px rgba(212,175,55,0.25),
      0 16px 48px rgba(0,0,0,0.3);
    border: none;
    animation: btnShimmer 3s linear infinite;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .pl-call-button:hover {
    transform: translateY(-2px) scale(1.03);
    box-shadow:
      0 0 0 1px rgba(212,175,55,0.5),
      0 12px 40px rgba(212,175,55,0.35),
      0 20px 56px rgba(0,0,0,0.4);
  }

  .pl-powered {
    align-self: flex-end;
    margin-top: -2px;
    font-size: 0.58rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(212,175,55,0.6);
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes expandLine {
    from { width: 0; }
    to   { width: 80px; }
  }
  @keyframes btnShimmer {
    0%   { background-position: 0% center; }
    100% { background-position: 200% center; }
  }

  .anim-up   { animation: fadeInUp   1s   ease forwards; opacity: 0; }
  .anim-fade { animation: fadeIn     1.2s ease forwards; opacity: 0; }
  .anim-line { animation: expandLine 1s   ease forwards; width: 0;   }

  .d1 { animation-delay: 0.2s; }
  .d2 { animation-delay: 0.4s; }
  .d3 { animation-delay: 0.6s; }
  .d4 { animation-delay: 0.8s; }
  .d5 { animation-delay: 1.0s; }
  .d6 { animation-delay: 1.2s; }
  .d7 { animation-delay: 1.4s; }
  .d8 { animation-delay: 1.6s; }

  @media print {
    .pl-download-btn { display: none !important; }
    .pl-poster {
      width: 100% !important;
      max-width: none !important;
      border: none !important;
      box-shadow: none !important;
      aspect-ratio: auto !important;
      height: 100vh !important;
    }
    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      animation: none !important;
    }
    .pl-poster::before { display: none !important; }
  }

  /* ── Protezione anti-download immagini ── */
  .pl-bg img,
  .pl-bg canvas,
  .pl-logo-top {
    pointer-events: none;
    -webkit-user-drag: none;
    user-drag: none;
  }

  /* ── Responsive mobile ── */
  @media (max-width: 768px) {
    .pl-wrapper {
      padding: 0;
      min-height: 100dvh;
      align-items: flex-start;
    }

    /* Il poster non ha più aspect-ratio fissa: cresce quanto serve */
    .pl-poster {
      aspect-ratio: unset;
      width: 100%;
      max-width: 100%;
      min-height: 100dvh;
      overflow: visible;
      border-radius: 0;
      border-left: none;
      border-right: none;
    }

    /* Il bg resta fisso e copre tutto il poster */
    .pl-bg {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      z-index: 0;
    }

    /* Il contenuto scorre normalmente */
    .pl-content {
      position: relative;
      height: auto;
      min-height: 100dvh;
      padding: 48px 24px 48px;
      justify-content: flex-start;
      gap: 0;
    }

    .pl-top {
      padding-top: 8px;
      margin-bottom: 24px;
    }

    .pl-logo-top {
      width: 80px;
      height: 80px;
      margin-bottom: 12px;
    }

    .pl-center {
      flex: unset;
      justify-content: flex-start;
      margin-bottom: 32px;
    }

    .pl-title {
      font-size: clamp(3rem, 18vw, 5rem);
      line-height: 0.88;
    }

    .pl-subtitle {
      font-size: clamp(1rem, 5vw, 1.6rem);
      margin-top: 10px;
    }

    .pl-tagline {
      font-size: clamp(0.62rem, 2.8vw, 0.82rem);
      letter-spacing: 0.18em;
    }

    .pl-description {
      font-size: clamp(0.78rem, 3vw, 0.95rem);
      margin-top: 14px;
      max-width: 100%;
    }

    .pl-deco-line { margin: 14px auto; }

    .pl-features { gap: 8px; margin-top: 16px; flex-wrap: wrap; }
    .pl-lineup   { gap: 8px; margin-top: 14px; flex-wrap: wrap; }

    .pl-pill {
      font-size: clamp(0.48rem, 2vw, 0.58rem);
      padding: 6px 13px;
    }

    .pl-badge {
      font-size: clamp(0.8rem, 3.5vw, 1rem);
      margin-top: 14px;
      text-align: center;
    }

    .pl-bottom {
      gap: 8px;
      align-items: center;
    }

    .pl-call-button {
      font-size: 0.9rem;
      padding: 13px 30px;
      min-width: 160px;
    }

    .pl-footer-links { margin-top: 12px; gap: 10px; }
    .pl-footer-link  { font-size: 0.6rem; padding: 7px 14px; }
    .pl-note         { font-size: 0.6rem; margin-top: 10px; }

    .pl-corner.tl, .pl-corner.tr { top: 12px; }
    .pl-corner.bl, .pl-corner.br { bottom: 12px; }
    .pl-corner.tl, .pl-corner.bl { left: 12px; }
    .pl-corner.tr, .pl-corner.br { right: 12px; }
    .pl-corner { width: 28px; height: 28px; }
  }

  @media (max-width: 400px) {
    .pl-content { padding: 40px 18px 40px; }
    .pl-logo-top { width: 64px; height: 64px; }
    .pl-title { font-size: clamp(2.6rem, 20vw, 4rem); }
    .pl-call-button { font-size: 0.82rem; padding: 11px 24px; }
  }
`;


const ShamrockSVG: FC = () => (
  <svg
    className="pl-shamrock"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M50 45c-3-12-15-22-25-18s-8 18 2 26c6 5 15 6 23 4v0
         c-8 2-17 1-23 4-10 8-12 22-2 26s22-6 25-18v0
         c3 12 15 22 25 18s8-18-2-26c-6-3-15-2-23-4v0
         c8-2 17-1 23-4 10-8 12-22 2-26s-22 6-25 18z"
      fill="#D4AF37"
      opacity="0.85"
    />
    <rect x="48.5" y="58" width="3" height="22" rx="1.5" fill="#D4AF37" opacity="0.6" />
  </svg>
);

const defaultPosterProps = {
  venueName: "Urban Garden",
  bgImage: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=85",
  eventType: "Nuova Apertura",
  eventDate: "",
  eventTime: "",
  ticketInfo: "",
  description: "Colazioni, aperitivi, Work&Coffe area e buona musica in un'atmosfera urbana nel cuore di Caltagirone.",
  lineup: ["Band dal vivo", "DJ set after-hours", "Aperitivo speciale"],
  title: ["Giardino", "Spadaro"],
  subtitle: " Urban Garden",
  tagline: "Bistrot  ·  Lounge  ·  Work&Coffe area",
  features: ["Eventi Live", "Aperitivo", "Work&Coffe area", "Colazione"],
  badgeText: "Ai piedi della Scalinata di Santa Maria del Monte",
  city: "Caltagirone, Sicilia",
  address: "Via San Giuseppe",
  phone: "+39 3520039563",
  phoneHref: "tel:+393520039563",
  website: "",
  email: "",
  instagramLabel: "@giardino_spadaro",
  instagramUrl: "https://www.instagram.com/giardino_spadaro/",
  note: "Prenota il tavolo in anticipo per assicurarti il posto migliore.",
  facebookLabel: "",
  facebookUrl: "",
  fileName: "spadaro-locandina.png",
};

const PosterLocandina: FC<PosterLocandinaProps> = (props) => {
  const {
    venueName = defaultPosterProps.venueName,
    bgImage = defaultPosterProps.bgImage,
    eventType = defaultPosterProps.eventType,
    eventDate = defaultPosterProps.eventDate,
    eventTime = defaultPosterProps.eventTime,
    ticketInfo = defaultPosterProps.ticketInfo,
    description = defaultPosterProps.description,
    lineup = defaultPosterProps.lineup,
    website = defaultPosterProps.website,
    email = defaultPosterProps.email,
    instagramLabel = defaultPosterProps.instagramLabel,
    instagramUrl = defaultPosterProps.instagramUrl,
    note = defaultPosterProps.note,
    title = defaultPosterProps.title,
    subtitle = defaultPosterProps.subtitle,
    tagline = defaultPosterProps.tagline,
    features = defaultPosterProps.features,
    badgeText = defaultPosterProps.badgeText,
    city = defaultPosterProps.city,
    address = defaultPosterProps.address,
    phone = defaultPosterProps.phone,
    phoneHref = defaultPosterProps.phoneHref,
    facebookLabel = defaultPosterProps.facebookLabel,
    facebookUrl = defaultPosterProps.facebookUrl,
    fileName = defaultPosterProps.fileName,
  } = props;
  const posterRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(true);

  useEffect(() => {
    const STYLE_ID = "pl-styles";
    if (document.getElementById(STYLE_ID)) return;
    const tag = document.createElement("style");
    tag.id = STYLE_ID;
    tag.textContent = STYLES;
    document.head.appendChild(tag);
    return () => { tag.remove(); };
  }, []);

  const titleLines = title ?? [];
  const posterFeatures = features ?? [];
  const pillsWithDots = posterFeatures.reduce<ReactNode[]>((acc, pill, i) => {
    acc.push(<span key={`pill-${i}`} className="pl-pill">{pill}</span>);
    if (i < posterFeatures.length - 1) {
      acc.push(<span key={`dot-${i}`} className="pl-dot" />);
    }
    return acc;
  }, []);

  return (
    <div className="pl-wrapper" onContextMenu={(e) => e.preventDefault()}>
      <div className="pl-poster" ref={posterRef}>
        <div className="pl-bg">
          <ThreeBackground />
          {imageLoaded && bgImage ? (
            <img
              src={bgImage}
              alt=""
              draggable={false}
              onError={() => setImageLoaded(false)}
              style={{ display: imageLoaded ? "block" : "none" }}
            />
          ) : null}
        </div>

        <div className="pl-corner tl" />
        <div className="pl-corner tr" />
        <div className="pl-corner bl" />
        <div className="pl-corner br" />

        <div className="pl-content">
          <div className="pl-top anim-fade d1">
            <img className="pl-logo-top" src={openingLogo} alt="Logo nuovo apertura" draggable={false} />
            <div className="pl-event-chip">
              <span>{eventType}</span>
            </div>
            <p className="pl-venue-name">{venueName}</p>
          </div>

          <div className="pl-center">
            {(eventDate || eventTime || ticketInfo) ? (
              <div className="pl-event-meta anim-fade d2">
                {eventDate ? <span className="pl-event-pill"><CalendarDays size={12} /> {eventDate}</span> : null}
                {eventTime ? <span className="pl-event-pill"><Clock size={12} /> {eventTime}</span> : null}
                {ticketInfo ? (
                  <span className="pl-event-pill"><Ticket size={12} /> {ticketInfo}</span>
                ) : null}
              </div>
            ) : null}
            <h1 className="pl-title anim-up d3">
              {titleLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < titleLines.length - 1 && <br />}
                </span>
              ))}
            </h1>

            <p className="pl-subtitle anim-up d3">{subtitle}</p>

            <div className="pl-deco-line anim-line d4" />

            <p className="pl-tagline anim-fade d5">{tagline}</p>

            <p className="pl-description anim-fade d6">{description}</p>

            <div className="pl-lineup anim-fade d7">
              {lineup.map((item, i) => (
                <span key={i} className="pl-pill">{item}</span>
              ))}
            </div>

            <div className="pl-features anim-fade d8">
              {pillsWithDots}
            </div>

            <p className="pl-badge anim-fade d9">
              <MapPin size={12} />
              {badgeText}
            </p>
          </div>

          <div className="pl-bottom anim-fade d8">
            <p className="pl-city">{city}</p>
            <p className="pl-address">{address}</p>

            <div className="pl-booking">
              <a href={phoneHref} className="pl-call-button">
                📞 Prenota
              </a>
              <span className="pl-powered">Powered by D.B</span>
            </div>

            <div className="pl-footer-links">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="pl-footer-link"
              >
                <Instagram size={13} />
                {instagramLabel}
              </a>
            </div>
            <p className="pl-note">{note}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PosterLocandina;