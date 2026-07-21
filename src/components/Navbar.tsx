import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingBag } from "lucide-react";
import peremogaLogo from "@/assets/peremoga-logo.jpg.asset.json";

const bakeryInfo = [
  { label: "Адреса", value: "вул. Григоровича-Барського, 1, Київ" },
  { label: "Графік", value: "Пн — Сб · 08:00 — 20:00" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      role="navigation"
      aria-label="Головна навігація Peremoga Bakery"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background ${
        scrolled ? "border-b border-border py-3" : "py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        {/* Wordmark left */}
        <Link to="/" className="flex items-center" aria-label="Peremoga Bakery">
          <img
            src={peremogaLogo.url}
            alt="Peremoga Bakery"
            className="h-12 md:h-14 w-auto object-contain mix-blend-multiply rounded-full"
          />
        </Link>

        {/* Center city tag */}
        <div className="hidden md:flex flex-1 justify-center">
          <span className="font-body text-[11px] uppercase tracking-[0.4em] text-foreground">
            Kyiv
          </span>
        </div>

        {/* Right cluster — bakery info */}
        <div className="hidden md:flex items-center gap-6">
          {bakeryInfo.map((item) => (
            <div key={item.label} className="flex flex-col leading-tight text-right">
              <span className="font-body text-[9px] uppercase tracking-[0.3em] text-foreground/60">
                {item.label}
              </span>
              <span className="font-body text-[11px] uppercase tracking-[0.18em] text-foreground">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-foreground"
          aria-label="Меню"
        >
          {mobileOpen ? <X className="w-5 h-5" strokeWidth={1.5} /> : <Menu className="w-5 h-5" strokeWidth={1.5} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
            {bakeryInfo.map((item) => (
              <div key={item.label} className="flex flex-col leading-tight">
                <span className="font-body text-[9px] uppercase tracking-[0.3em] text-foreground/60">
                  {item.label}
                </span>
                <span className="font-body text-[12px] uppercase tracking-[0.18em] text-foreground">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
