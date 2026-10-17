import React, { useState, useEffect, useRef } from 'react';
import {
  Terminal, Code2, Layers, Cpu, ExternalLink, Github, Linkedin,
  Sparkles, Download, CheckCircle2, X,
  Menu, Database, Cloud, Globe, ArrowRight, Eye, ShieldCheck,
  Check, Copy, Monitor, Bot, Activity, Wifi, Facebook, Instagram
} from 'lucide-react';
import portfolioData from './data/sampleData.js';

// Helper to normalize public assets or URLs
const resolveAssetUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('public/')) return '/' + url.slice(7);
  return url;
};

const customStyles = `
@keyframes floatSlow {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(1.5deg); }
}
@keyframes floatOpposite {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(12px) rotate(-2deg); }
}
@keyframes pulseGlow {
  0%, 100% { opacity: 0.25; transform: scale(1); }
  50% { opacity: 0.45; transform: scale(1.08); }
}
.animate-float-slow {
  animation: floatSlow 5s ease-in-out infinite;
}
.animate-float-opposite {
  animation: floatOpposite 6s ease-in-out infinite;
}
.animate-pulse-glow {
  animation: pulseGlow 8s ease-in-out infinite;
}
`;

const InteractiveBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Responsive resize handler
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse tracking for interactive constellation effect
    const mouse = { x: -1000, y: -1000, radius: 140 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Particle nodes configuration
    const particleCount = Math.min(Math.floor((width * height) / 14000), 75);
    const particles = [];
    const colors = ['#00f2fe', '#05b6d4', '#10b981', '#3b82f6'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        baseAlpha: Math.random() * 0.5 + 0.3
      });
    }

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw and connect particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce at borders
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Repel slightly away from mouse cursor
        const dxMouse = mouse.x - p.x;
        const dyMouse = mouse.y - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < mouse.radius) {
          const force = (1 - distMouse / mouse.radius) * 1.5;
          p.x -= (dxMouse / distMouse) * force;
          p.y -= (dyMouse / distMouse) * force;
        }

        // Render point
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.baseAlpha;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = '#00f2fe';
            ctx.globalAlpha = (1 - dist / 110) * 0.18;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
    />
  );
};

export default function App() {
  // Sync initial state from portfolioData (sampleData.js)
  const [profile, setProfile] = useState({
    name: portfolioData.personal?.name || "LƯƠNG HOÀNG GIA THUẬN",
    role: portfolioData.personal?.role || "SOFTWARE ENGINEER & FULL-STACK DEVELOPER",
    bio: portfolioData.personal?.bio || "",
    avatarUrl: portfolioData.personal?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80",
    cvUrl: portfolioData.personal?.cvUrl || "public/JavaDeveloper_LUONG_HOANG_GIA_THUAN.pdf",
    email: portfolioData.personal?.email || "luonggiathuan2019.gr@gmail.com",
    phone: portfolioData.personal?.phone || "",
    logoText: portfolioData.personal?.logoText || "Za_Thuwn",
    workStatus: portfolioData.personal?.workStatus || {
      text: "Open for Work",
      techStack: "Java / JavaScript"
    },
    badge: portfolioData.personal?.badge || {
      title: "Junior Verified",
      subtitle: "Clean Architecture"
    },
    floatingCode: portfolioData.personal?.floatingCode || {
      filename: "app.tsx",
      tag: "<Developer />",
      status: 'status="Online"',
      focus: 'focus="Scale"'
    },
    experienceYears: portfolioData.stats?.experienceYears || "1+",
    completedProjects: portfolioData.stats?.completedProjects || "10+",
    clientSatisfaction: portfolioData.stats?.clientSatisfaction || "100%",
    socialLinks: portfolioData.socialLinks || {
      github: "https://github.com",
      facebook: "https://facebook.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com"
    }
  });

  // Hot reload sync whenever sampleData.js changes
  useEffect(() => {
    setProfile(prev => ({
      ...prev,
      name: portfolioData.personal?.name || prev.name,
      role: portfolioData.personal?.role || prev.role,
      bio: portfolioData.personal?.bio || prev.bio,
      avatarUrl: portfolioData.personal?.avatarUrl || prev.avatarUrl,
      cvUrl: portfolioData.personal?.cvUrl || prev.cvUrl,
      email: portfolioData.personal?.email || prev.email,
      phone: portfolioData.personal?.phone || prev.phone,
      logoText: portfolioData.personal?.logoText || prev.logoText,
      workStatus: portfolioData.personal?.workStatus || prev.workStatus,
      badge: portfolioData.personal?.badge || prev.badge,
      floatingCode: portfolioData.personal?.floatingCode || prev.floatingCode,
      experienceYears: portfolioData.stats?.experienceYears || prev.experienceYears,
      completedProjects: portfolioData.stats?.completedProjects || prev.completedProjects,
      clientSatisfaction: portfolioData.stats?.clientSatisfaction || prev.clientSatisfaction,
      socialLinks: portfolioData.socialLinks || prev.socialLinks
    }));
  }, [portfolioData]);

  // UI Interactive States
  const [activeProjectModal, setActiveProjectModal] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Helper trigger notification toast
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  // Download CV handler
  const handleDownloadCV = () => {
    const rawUrl = profile.cvUrl || portfolioData.personal?.cvUrl;
    const url = resolveAssetUrl(rawUrl);
    if (url) {
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', url.split('/').pop() || 'CV.pdf');
      link.setAttribute('target', '_blank');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      triggerToast("Đang tải file CV của " + profile.name + "...");
    } else {
      triggerToast("Chưa cấu hình đường dẫn file CV!");
    }
  };

  // Copy tech spec snippet
  const handleCopySnippet = () => {
    const snippet = `const developer = {\n  name: "${profile.name}",\n  role: "${profile.role}",\n  status: "Available for Hire",\n  skills: ["React", "TypeScript", "Node.js", "Docker"]\n};`;
    navigator.clipboard?.writeText(snippet);
    setCopiedCode(true);
    triggerToast("Đã sao chép cấu hình nhà phát triển vào Clipboard!");
    setTimeout(() => setCopiedCode(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#070b12] text-gray-100 font-sans relative selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      {/* Inject custom animation keyframes */}
      <style>{customStyles}</style>

      {/* Dynamic Animated Particles Background */}
      <InteractiveBackground />

      {/* Ambient Radial Lights */}
      <div className="fixed top-20 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse-glow" />
      <div className="fixed bottom-20 right-10 w-[450px] h-[450px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse-glow" />

      { }
      <header className="sticky top-0 z-40 bg-[#070b12]/85 backdrop-blur-md border-b border-gray-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

          {/* Logo matching mockup */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-400 via-teal-400 to-emerald-400 p-[2px] flex items-center justify-center">
                <div className="w-full h-full bg-[#0b101c] rounded-full flex items-center justify-center overflow-hidden">
                  <span className="text-sm font-bold text-cyan-300 group-hover:scale-110 transition-transform">
                    👨‍💻
                  </span>
                </div>
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#070b12]"></span>
            </div>
            <span className="font-extrabold text-lg tracking-wider text-white">
              {profile.logoText || portfolioData.personal?.logoText || "GT"}
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <a href="#home" className="text-cyan-400 hover:text-cyan-300 transition-colors">Home</a>
            <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
            <a href="#skills" className="hover:text-cyan-400 transition-colors">Skills</a>
            <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
          </nav>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden lg:inline-flex px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg bg-gradient-to-r from-cyan-400 to-emerald-400 text-black hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(0,242,254,0.3)]"
            >
              Hire Me
            </a>

            {/* Mobile menu toggle button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-400 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-gray-800 bg-[#070b12]/95 px-6 py-4 space-y-3">
            <a href="#home" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-cyan-400">Home</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-gray-300 hover:text-white">About</a>
            <a href="#skills" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-gray-300 hover:text-white">Skills</a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-gray-300 hover:text-white">Projects</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-gray-300 hover:text-white">Contact</a>
          </div>
        )}
      </header>

      { }
      <section id="home" className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* Left Column: Greeting, Big Headlines & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-block">
                <span className="text-sm font-bold tracking-wider text-emerald-400 uppercase bg-emerald-950/70 border border-emerald-500/30 px-3.5 py-1 rounded-full flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  HELLO, I'M {profile.name}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black tracking-tight text-white leading-tight uppercase">
                {profile.role}
              </h1>

              <p className="text-gray-400 text-base sm:text-lg max-w-xl leading-relaxed">
                {profile.bio}
              </p>

              {/* Action Buttons as in screenshot */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#projects"
                  className="px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-extrabold text-sm hover:opacity-95 transition-all shadow-[0_0_25px_rgba(0,242,254,0.3)] flex items-center gap-2 active:scale-95"
                >
                  <span>View My Work</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  onClick={handleDownloadCV}
                  className="px-6 py-3 rounded-xl border border-gray-700 bg-gray-900/80 hover:bg-gray-800 text-gray-200 font-semibold text-sm transition-all flex items-center gap-2 active:scale-95 hover:border-gray-500"
                >
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>Download CV</span>
                </button>
              </div>

              {/* Stats badges */}
              <div className="pt-6 border-t border-gray-800/80 flex items-center gap-8">
                <div>
                  <div className="text-2xl font-black text-cyan-400 font-mono">{profile.experienceYears}</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">Years Experience</div>
                </div>
                <div className="w-[1px] h-8 bg-gray-800"></div>
                <div>
                  <div className="text-2xl font-black text-emerald-400 font-mono">{profile.completedProjects}</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">Projects Built</div>
                </div>
                <div className="w-[1px] h-8 bg-gray-800"></div>
                <div>
                  <div className="text-2xl font-black text-yellow-400 font-mono">{profile.clientSatisfaction || portfolioData.stats?.clientSatisfaction || "100%"}</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">Client Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Right Column: 3D Developer Avatar + Orbiting Tech Badges */}
            <div className="lg:col-span-5 relative flex items-center justify-center">

              {/* Background glowing rings */}
              <div className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full border border-cyan-500/20 animate-spin" style={{ animationDuration: '30s' }}></div>
              <div className="absolute w-96 h-96 rounded-full border border-emerald-500/10"></div>

              {/* Central 3D Avatar Card */}
              <div className="relative z-10 w-72 sm:w-80 rounded-3xl bg-gradient-to-b from-gray-800/60 to-gray-950/90 border border-gray-700/60 p-4 shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-xl">

                {/* Avatar Visual with 3D style frame */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-tr from-cyan-900/40 via-gray-900 to-emerald-950/40 border border-gray-700/50 flex items-center justify-center group">
                  <img
                    src={resolveAssetUrl(profile.avatarUrl)}
                    alt={profile.name}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80";
                    }}
                    className="w-full h-full object-cover object-center filter saturate-110 group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Futuristic Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-80"></div>

                  {/* Status Indicator */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-gray-700/60 text-xs">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      {profile.workStatus?.text || "Open for Work"}
                    </span>
                    <span className="text-gray-400 font-mono text-[11px]">{profile.workStatus?.techStack || "Java / JavaScript"}</span>
                  </div>
                </div>

                {/* Floating Widget 1: Top Right - Code Terminal Card */}
                <div className="absolute -top-6 -right-6 bg-gray-900/90 border border-cyan-500/40 rounded-xl p-3 shadow-xl backdrop-blur-md animate-float-slow hidden sm:block max-w-[170px]">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500/80"></span>
                    <span className="w-2 h-2 rounded-full bg-yellow-500/80"></span>
                    <span className="w-2 h-2 rounded-full bg-green-500/80"></span>
                    <span className="text-[10px] text-gray-400 font-mono ml-1">{profile.floatingCode?.filename || "app.tsx"}</span>
                  </div>
                  <div className="font-mono text-[10px] text-gray-300 space-y-0.5 leading-tight">
                    <p className="text-cyan-300">{profile.floatingCode?.tag || '<Developer />'}</p>
                    <p className="text-emerald-400 pl-2">{profile.floatingCode?.status || 'status="Online"'}</p>
                    <p className="text-gray-400 pl-2">{profile.floatingCode?.focus || 'focus="Scale"'}</p>
                  </div>
                </div>

                {/* Floating Widget 2: Bottom Left - Face/Profile ID Badge */}
                <div className="absolute -bottom-5 -left-6 bg-gray-900/90 border border-emerald-500/40 rounded-xl p-2.5 shadow-xl backdrop-blur-md animate-float-opposite hidden sm:flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-[11px] font-bold text-white leading-tight">{profile.badge?.title || "Junior Verified"}</div>
                    <div className="text-[9px] text-gray-400 font-mono">{profile.badge?.subtitle || "Clean Architecture"}</div>
                  </div>
                </div>

                {/* Floating Widget 3: Top Left - Floating React Atom */}
                <div className="absolute top-1/4 -left-7 bg-cyan-950/80 border border-cyan-500/40 p-2.5 rounded-2xl shadow-xl backdrop-blur-md animate-bounce hidden sm:flex items-center justify-center text-cyan-400" style={{ animationDuration: '4s' }}>
                  <Code2 className="w-5 h-5" />
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      { }
      <section id="about" className="py-20 bg-[#0a0f1d]/50 border-t border-gray-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section Header */}
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {portfolioData.about?.title || "Về tôi & Kỹ năng"}
            </h2>
            <p className="text-gray-400 text-sm max-w-xl mt-2 leading-relaxed">
              {portfolioData.about?.description || "Giới thiệu ngắn về bản thân..."}
            </p>
          </div>

          {/* Skills Grid Matching Mockup Layout */}
          <div id="skills" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(portfolioData.skills || []).map((skillGroup, sIdx) => {
              const isEmerald = skillGroup.accentColor === 'emerald';
              const borderColor = isEmerald ? 'hover:border-emerald-500/50' : 'hover:border-cyan-500/50';
              const tagColor = isEmerald ? 'text-emerald-400' : 'text-cyan-400';
              const dotColor = isEmerald ? 'bg-emerald-400' : 'bg-cyan-400';

              return (
                <div
                  key={skillGroup.id || sIdx}
                  className={`bg-gray-900/70 border border-gray-800 ${borderColor} rounded-2xl p-6 transition-all duration-300 group hover:-translate-y-1 shadow-lg ${sIdx === 2 ? 'md:col-span-2 lg:col-span-1' : ''}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-xs uppercase font-bold tracking-wider ${tagColor} font-mono`}>
                      {skillGroup.categoryNumber || `0${sIdx + 1} // Tech`}
                    </span>
                    <span className={`w-2.5 h-2.5 rounded-full ${dotColor}`}></span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{skillGroup.title}</h3>
                  <p className="text-xs text-gray-400 mb-5 leading-relaxed">
                    {skillGroup.description}
                  </p>

                  {/* Tech Badges with Visual Icons */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    {skillGroup.technologies?.map((tech, tIdx) => (
                      <div
                        key={tIdx}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800/90 border border-gray-700 text-xs font-semibold ${tech.color || 'text-cyan-300'}`}
                      >
                        {tech.icon && <span className="text-base">{tech.icon}</span>}
                        <span>{tech.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      { }
      <section id="projects" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Các dự án nổi bật
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Các giải pháp thực tế đã triển khai với kiến trúc linh hoạt và mã nguồn chuẩn chỉnh.
              </p>
            </div>
            <button
              onClick={handleCopySnippet}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 bg-gray-900 border border-gray-800 px-3 py-2 rounded-lg self-start sm:self-auto transition-colors"
            >
              {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? "Đã copy Spec!" : "Sao chép cấu hình IT"}</span>
            </button>
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(portfolioData.projects || []).map((proj, idx) => (
              <div
                key={proj.id ? `${proj.id}-${idx}` : idx}
                className="bg-gray-900/80 border border-gray-800 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 flex flex-col group hover:-translate-y-2 shadow-xl"
              >
                {/* Visual Preview Container */}
                <div className="relative h-48 bg-gray-950 overflow-hidden border-b border-gray-800/80">
                  <img
                    src={resolveAssetUrl(proj.image)}
                    alt={proj.title}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80";
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent"></div>

                  {/* Category Pill Tag */}
                  {proj.category && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded-md bg-black/70 backdrop-blur-md border border-gray-700 text-cyan-300">
                      {proj.category}
                    </span>
                  )}

                  {/* Stars / Likes badge */}
                  {proj.stars && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 text-[11px] rounded bg-black/60 backdrop-blur-md text-yellow-300 border border-gray-800 flex items-center gap-1 font-mono">
                      ★ {proj.stars}
                    </span>
                  )}
                </div>

                {/* Card Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-2 line-clamp-3 leading-relaxed">
                      {proj.desc}
                    </p>
                  </div>

                  <div>
                    {/* Tags Pills as in Mockup */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {proj.tags?.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-1 text-xs font-mono rounded bg-gray-800/90 text-cyan-300 border border-gray-700/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Dual Action Buttons (View Code & Live Demo) matching mockup */}
                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-800">
                      <button
                        onClick={() => {
                          if (proj.githubUrl && proj.githubUrl !== '#' && !proj.githubUrl.endsWith('github.com/')) {
                            window.open(proj.githubUrl, '_blank');
                          } else if (proj.githubUrl && proj.githubUrl.startsWith('http')) {
                            window.open(proj.githubUrl, '_blank');
                          } else {
                            triggerToast(`Mã nguồn (GitHub) cho "${proj.title}" đang được cập nhật!`);
                          }
                        }}
                        className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-extrabold text-xs hover:opacity-90 transition-all flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.2)] cursor-pointer"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>View Code</span>
                      </button>

                      <button
                        onClick={() => setActiveProjectModal(proj)}
                        className="py-2.5 px-3 rounded-xl border border-gray-700 bg-gray-800/90 hover:bg-gray-800 text-gray-200 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Chi tiết</span>
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      { }
      <section id="contact" className="py-20 bg-[#080d18]/60 border-t border-gray-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                {portfolioData.contact?.title || "Liên hệ"}
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mt-5 max-w-2xl">
                {portfolioData.contact?.description || "Bạn có một dự án mới cần hiện thực hóa hoặc muốn tuyển dụng kỹ sư phần mềm cho tổ chức của mình? Hãy để lại tin nhắn hoặc kết nối trực tiếp qua các kênh sau."}
              </p>
            </div>

            {/* Direct email info */}
            <div className="pt-2">
              <div className="text-xs uppercase font-mono text-gray-400 tracking-wider">
                {portfolioData.contact?.emailLabel || "Email chính thức"}
              </div>
              <a href={`mailto:${profile.email}`} className="text-cyan-400 font-mono text-sm hover:underline">
                {profile.email}
              </a>
            </div>

            {/* Social icons row */}
            <div className="pt-2 flex items-center gap-3 flex-wrap">
              <a
                href={profile.socialLinks?.github || "https://github.com"}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-300 hover:text-white hover:border-cyan-400 hover:scale-105 transition-all shadow-md"
                title="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href={profile.socialLinks?.linkedin || "https://linkedin.com"}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-300 hover:text-white hover:border-cyan-400 hover:scale-105 transition-all shadow-md"
                title="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={profile.socialLinks?.facebook || "https://facebook.com"}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-300 hover:text-white hover:border-blue-400 hover:scale-105 transition-all shadow-md"
                title="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={profile.socialLinks?.instagram || "https://instagram.com"}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-300 hover:text-white hover:border-pink-400 hover:scale-105 transition-all shadow-md"
                title="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      { }
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">

            <div className="p-5 border-b border-gray-800 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono text-cyan-400 uppercase">{activeProjectModal.category}</span>
                <h3 className="text-xl font-bold text-white">{activeProjectModal.title}</h3>
              </div>
              <button
                onClick={() => setActiveProjectModal(null)}
                className="text-gray-400 hover:text-white p-1 rounded-lg hover:bg-gray-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
              <div className="rounded-xl overflow-hidden h-52 bg-gray-950">
                <img
                  src={resolveAssetUrl(activeProjectModal.image)}
                  alt={activeProjectModal.title}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80";
                  }}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h4 className="text-xs uppercase font-mono tracking-wider text-gray-400 mb-1">Mô tả chi tiết</h4>
                <p className="text-sm text-gray-200 leading-relaxed">{activeProjectModal.desc}</p>
              </div>

              {activeProjectModal.features?.filter(Boolean).length > 0 && (
                <div>
                  <h4 className="text-xs uppercase font-mono tracking-wider text-gray-400 mb-2">Tính năng cốt lõi</h4>
                  <ul className="space-y-1.5 text-xs text-gray-300">
                    {activeProjectModal.features.filter(Boolean).map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeProjectModal.backendGithubUrl && (
                <div>
                  <h4 className="text-xs uppercase font-mono tracking-wider text-gray-400 mb-2">Git Repositories</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <a
                      href={activeProjectModal.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-2.5 rounded-xl bg-gray-950/80 border border-gray-800 text-xs text-gray-200 hover:text-cyan-300 hover:border-cyan-500/60 transition-colors flex items-center justify-center gap-2"
                    >
                      <Github className="w-4 h-4" /> Frontend Repository
                    </a>
                    <a
                      href={activeProjectModal.backendGithubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-2.5 rounded-xl bg-gray-950/80 border border-gray-800 text-xs text-gray-200 hover:text-emerald-300 hover:border-emerald-500/60 transition-colors flex items-center justify-center gap-2"
                    >
                      <Github className="w-4 h-4" /> Backend Repository
                    </a>
                  </div>
                </div>
              )}

              {activeProjectModal.metrics && (
                <div className="bg-gray-950/80 p-3.5 rounded-xl border border-gray-800">
                  <span className="text-xs text-cyan-300 font-mono">Hiệu năng & Metrics: </span>
                  <span className="text-xs text-gray-300">{activeProjectModal.metrics}</span>
                </div>
              )}
            </div>

            <div className="p-4 bg-gray-950/60 border-t border-gray-800 flex gap-3">
              <button
                onClick={() => {
                  if (activeProjectModal.liveDemoUrl && activeProjectModal.liveDemoUrl.startsWith('http')) {
                    window.open(activeProjectModal.liveDemoUrl, '_blank');
                  } else {
                    triggerToast("Mở phiên bản Demo hoặc Video trình diễn...");
                  }
                }}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-bold text-xs hover:opacity-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ExternalLink className="w-4 h-4" /> Mở Phiên Bản Demo Thực Tế
              </button>
              <button
                onClick={() => setActiveProjectModal(null)}
                className="px-4 py-2.5 rounded-xl bg-gray-800 text-gray-300 text-xs font-semibold hover:bg-gray-700 cursor-pointer"
              >
                Đóng
              </button>
            </div>

          </div>
        </div>
      )}

      { }
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 border border-cyan-400/60 text-white px-5 py-3.5 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.8)] flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <Sparkles className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
