import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Droplets,
  Calculator,
  FileText,
  Info,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate, Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import { getCurrentUser, logout } from "@/utils/authUtils";

interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const user = getCurrentUser();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navigation = [
    { name: "Home", href: "/", icon: Droplets },
    { name: "Dashboard", href: "/dashboard", icon: Calculator },
    { name: "Resources", href: "/resources", icon: FileText },
    { name: "About", href: "/about", icon: Info },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-water-50 via-background to-nature-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-water-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-water-500 to-water-600 rounded-lg flex items-center justify-center">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-water-600 to-water-700 bg-clip-text text-transparent">
                AquaHarvest
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      location.pathname === item.href
                        ? "bg-water-100 text-water-700"
                        : "text-gray-600 hover:text-water-600 hover:bg-water-50",
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* User Menu / Auth */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-sm text-gray-600">
                    Welcome, <span className="font-semibold">{user.name}</span>
                  </span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-water-600 hover:bg-water-50 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-3 py-2 rounded-lg text-sm font-medium text-white bg-water-600 hover:bg-water-700 transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-water-200">
              <div className="space-y-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={cn(
                        "flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        location.pathname === item.href
                          ? "bg-water-100 text-water-700"
                          : "text-gray-600 hover:text-water-600 hover:bg-water-50",
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">{children || <Outlet />}</main>

      {/* Footer */}
      <footer className="bg-white border-t border-water-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-6 h-6 bg-gradient-to-br from-water-500 to-water-600 rounded-lg flex items-center justify-center">
                  <Droplets className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-water-600 to-water-700 bg-clip-text text-transparent">
                  AquaHarvest
                </span>
              </div>
              <p className="text-gray-600 text-sm">
                Empowering communities with tools for sustainable water
                management and groundwater conservation through technology.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link to="/assessment" className="hover:text-water-600">
                    Start Assessment
                  </Link>
                </li>
                <li>
                  <Link to="/resources" className="hover:text-water-600">
                    Learn More
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-water-600">
                    About RTRWH
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
              <p className="text-sm text-gray-600">
                For technical support or inquiries about rainwater harvesting
                implementation.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm text-gray-500">
            © 2024 AquaHarvest. Promoting sustainable water conservation.
          </div>
        </div>
      </footer>
    </div>
  );
}
