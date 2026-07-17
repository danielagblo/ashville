"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const LOGO_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuAC-iX_yK2jPPxT5nvwM7V5W26IvBUffKdIDnkKSv-m8vgMSin29WaMFr0naqgCZTXqBItBJLo3ugQtuOiNWyz59aYqLCA4xo44E9JmCxRd1vSBTGoWGfDPZ-Ny3xS4NOaXNEkRAMdDxn5cYULRMG-MsOjaHfrXTzHMDIWUVL88wbPndRqQafv1S7lFGL9cJY_5y0COJaHywJ_QSsIQqaHU1cl8MgVvgX7IohZoDuqRhsdmEe24edAAiK6cZtn8SA1Ud5go4OI4MIeN";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/ashville-admin');
  if (isAdminPage) return null;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";
  const navBg = isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5';
  const textColor = isScrolled ? 'text-dark/70' : 'text-white/90';
  const logoTextColor = (isScrolled || mobileMenuOpen) ? 'text-primary' : 'text-white';
  const menuBtnColor = (isScrolled || mobileMenuOpen) ? 'text-primary' : 'text-white';

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Programs", path: "/programs" },
    { name: "Gallery", path: "/gallery" },
    { name: "Admissions", path: "/admissions" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-500 ${navBg}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 overflow-hidden rounded-full shadow-lg transition-transform group-hover:scale-105">
              <Image
                src={LOGO_URL}
                alt="Ashville Logo"
                fill
                sizes="48px"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className={`font-heading font-bold text-lg md:text-xl tracking-tight leading-none ${logoTextColor}`}>
                Ashville
              </span>
              <span className={`font-heading font-medium text-[10px] md:text-[12px] uppercase tracking-[0.2em] text-primary`}>
                School
              </span>
            </div>
          </Link>

          <div className={`hidden md:flex gap-8 font-medium text-sm tracking-wide ${textColor}`}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`hover:text-primary transition-colors relative group ${pathname === link.path ? `${isScrolled ? "text-primary" : "text-white"} font-semibold` : ""}`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${isScrolled ? "bg-primary" : "bg-white"} transition-all duration-300 group-hover:w-full ${pathname === link.path ? "w-full" : ""}`}></span>
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Link href="/admissions" className="bg-primary hover:bg-primary/90 text-white px-7 py-2.5 rounded-full font-bold transition-all shadow-lg hover:shadow-primary/30 active:scale-95">
              Enroll Now
            </Link>
          </div>

          <button
            className={`md:hidden p-2 rounded-lg ${menuBtnColor}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-24 px-6 flex flex-col gap-6 md:hidden animate-in fade-in slide-in-from-top duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-2xl font-heading font-bold border-b border-slate-100 pb-4 ${pathname === link.path ? "text-primary" : "text-dark"}`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/admissions"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-4 bg-primary text-white text-center py-4 rounded-2xl font-bold text-xl shadow-xl active:scale-95 transition-transform"
          >
            Enroll Now
          </Link>
        </div>
      )}
    </>
  );
}
