import { Link } from 'wouter';
import { Menu, X, Zap, Compass, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/_core/hooks/useAuth';
import { Button } from './ui/button';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const mainLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/marketplace', label: 'Marketplace', icon: '🛒' },
    { href: '/trading', label: 'Trading', icon: '💰' },
    { href: '/gaming', label: 'Gaming', icon: '🎮' },
    { href: '/learning', label: 'Learning', icon: '📚' },
    { href: '/governance', label: 'Governance', icon: '🏛️' },
    { href: '/leaderboard', label: 'Leaderboard', icon: '🏆' },
  ];

  const exploreLinks = [
    { href: '/gallery', label: '966 UI Screens', icon: '🎨' },
    { href: '/api-explorer', label: 'API Explorer', icon: '⚡' },
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Premium Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-cyan-500/20 shadow-2xl">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              href="/"
              onClick={closeMenu}
              className="group flex items-center gap-2 font-bold text-xl md:text-2xl hover:opacity-80 transition-all duration-300"
            >
              <div className="relative">
                <Zap className="w-6 h-6 md:w-8 md:h-8 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-lg group-hover:blur-xl transition-all" />
              </div>
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                SKYCOIN4444
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {mainLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/10 transition-all duration-200 group flex items-center gap-1"
                >
                  <span className="text-lg group-hover:scale-110 transition-transform">{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>

            {/* Explore Dropdown (Desktop) */}
            <div className="hidden lg:flex items-center gap-4 ml-4 pl-4 border-l border-slate-700/50">
              <div className="group relative">
                <button className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/10 transition-all duration-200">
                  <Compass className="w-4 h-4" />
                  Explore
                </button>
                <div className="absolute right-0 mt-0 w-48 bg-slate-900 border border-cyan-500/20 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                  {exploreLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMenu}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/10 transition-all"
                    >
                      <span>{link.icon}</span>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Auth Button */}
              {user ? (
                <Link href="/profile">
                  <Button
                    variant="outline"
                    className="border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-500/60 transition-all"
                  >
                    <Sparkles className="w-4 h-4 mr-2" />
                    {user.name || 'Profile'}
                  </Button>
                </Link>
              ) : (
                <Link href="/login">
                  <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0 shadow-lg hover:shadow-cyan-500/50 transition-all">
                    Launch App
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-cyan-400" />
              ) : (
                <Menu className="w-6 h-6 text-cyan-400" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-slate-700/50 bg-gradient-to-b from-slate-900 to-slate-950 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="container mx-auto px-4 py-4 space-y-2">
              {/* Main Links */}
              {mainLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/10 transition-all"
                >
                  <span className="text-lg">{link.icon}</span>
                  {link.label}
                </Link>
              ))}

              {/* Divider */}
              <div className="my-2 h-px bg-slate-700/30" />

              {/* Explore Links */}
              {exploreLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-400 hover:text-cyan-300 hover:bg-cyan-500/10 transition-all"
                >
                  <span>{link.icon}</span>
                  {link.label}
                </Link>
              ))}

              {/* Divider */}
              <div className="my-2 h-px bg-slate-700/30" />

              {/* Auth Button */}
              <div className="pt-2">
                {user ? (
                  <Link href="/profile" onClick={closeMenu}>
                    <Button
                      variant="outline"
                      className="w-full border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      {user.name || 'Profile'}
                    </Button>
                  </Link>
                ) : (
                  <Link href="/login" onClick={closeMenu}>
                    <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
                      Launch App
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Animated Background Accent */}
      <div className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent pointer-events-none" />
    </>
  );
}
