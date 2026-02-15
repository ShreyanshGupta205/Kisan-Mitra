import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sprout, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { to: "/crops", label: "Crop Library" },
  { to: "/mandi-rates", label: "Mandi Rates" },
  { to: "/community", label: "Community" },
  { to: "/transport", label: "Transport" },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Sprout className="h-7 w-7 text-primary" />
          <span className="font-serif text-xl font-bold text-foreground">KisanMitra</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname.startsWith(link.to)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link to="/auth">Log In</Link>
          </Button>
          <Button asChild>
            <Link to="/auth?tab=signup">Sign Up</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-background p-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-2 rounded-md text-sm font-medium ${
                location.pathname.startsWith(link.to)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-2 pt-2">
            <Button variant="outline" asChild className="flex-1">
              <Link to="/auth" onClick={() => setMobileOpen(false)}>Log In</Link>
            </Button>
            <Button asChild className="flex-1">
              <Link to="/auth?tab=signup" onClick={() => setMobileOpen(false)}>Sign Up</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
