import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Office Bearers", href: "/office-bearers" },
    { name: "AGM Reports", href: "/agm-reports" },
    { name: "Namadhu Vanam E-Magazine", href: "/e-magazines" },
    { name: "Members", href: "/members" },
    {
      name: "2024 - TASPEF Directory",
      href: encodeURI("/assets/IFS new directory - final - 30-04-24 (1).pdf"),
      external: true, // mark as external
    },
  ];

  const isActive = (href) => location.pathname === href;

  return (
    <header className="bg-primary-500 text-white shadow-lg sticky top-0 z-30">
      <div className="container">
        <div className="flex items-center justify-between h-16 md:h-20 gap-60">
          {/* Logo and Title */}
          <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center">
              <span className="text-primary-500 font-bold text-xl md:text-2xl">
                T
              </span>
            </div>
            <div className="hidden lg:block">
              <h1 className="text-sm md:text-base font-bold leading-tight">
                Tamil Nadu Association of Senior Professionals
                <br />
                <span className="text-xs md:text-sm font-normal">
                  of Environment and Forests
                </span>
              </h1>
            </div>
            <div className="lg:hidden">
              <h1 className="text-base md:text-lg font-bold">TASPEF</h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-12 whitespace-nowrap">
            {navigation.map((item) =>
              item.external ? (
                // 🟢 External PDF link
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="px-3 py-2 rounded-lg text-sm lg:text-base font-medium transition-all duration-200 text-white hover:bg-primary-600"
                >
                  {item.name}
                </a>
              ) : (
                // 🔵 Internal routes
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-lg text-sm lg:text-base font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? "bg-white text-primary-500"
                      : "text-white hover:bg-primary-600"
                  }`}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.name}
                </Link>
              )
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {/* Hamburger Icon */}
            <svg
              className={`${mobileMenuOpen ? "hidden" : "block"} h-6 w-6`}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            {/* Close Icon */}
            <svg
              className={`${mobileMenuOpen ? "block" : "hidden"} h-6 w-6`}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4" aria-label="Mobile navigation">
            <div className="space-y-1">
              {navigation.map((item) =>
                item.external ? (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 text-white hover:bg-primary-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-3 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
                      isActive(item.href)
                        ? "bg-white text-primary-500"
                        : "text-white hover:bg-primary-600"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                )
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
