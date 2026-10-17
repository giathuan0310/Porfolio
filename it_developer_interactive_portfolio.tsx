import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, Code2, Layers, Cpu, ExternalLink, Github, Linkedin, 
  Mail, Send, Sparkles, Download, CheckCircle2, X, Sliders, 
  Menu, Database, Cloud, Globe, ArrowRight, Eye, ShieldCheck, 
  Check, Copy, Monitor, Bot, Activity, Wifi, Facebook, Instagram
} from 'lucide-react';

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

const initialProjects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Full-Stack Web",
    tags: ["React", "Node.js", "MongoDB"],
    desc: "Nền tảng thương mại điện tử chuyên nghiệp với kiến trúc vi dịch vụ, cổng thanh toán tự động và hệ thống gợi ý sản phẩm theo thời gian thực.",
    stars: "1.4k",
    previewType: "ecommerce",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80",
    metrics: "Tốc độ tải trang 0.6s | 50k+ người dùng tích cực",
    features: ["Giỏ hàng & Đặt hàng Realtime", "Tích hợp Stripe / VNPay", "Admin Analytics Dashboard"]
  },
  {
    id: 2,
    title: "AI Chat Application",
    category: "AI & Natural Language",
    tags: ["React", "FastAPI", "OpenAI"],
    desc: "Ứng dụng tương tác đàm thoại AI thông minh thế hệ mới, hỗ trợ phân tích tài liệu PDF, lập trình tự động và tóm tắt ngữ cảnh chuyên sâu.",
    stars: "2.8k",
    previewType: "ai",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    metrics: "Độ trễ xử lý 180ms | 99.9% Uptime",
    features: ["Streaming Tokens phản hồi tức thì", "Vector DB (Pinecone) tìm kiếm ngữ nghĩa", "Quản lý ngữ cảnh đa phiên làm việc"]
  },
  {
    id: 3,
    title: "Smart IoT Dashboard",
    category: "IoT & Cloud Monitoring",
    tags: ["React", "Go/MQTT", "Docker"],
    desc: "Bảng điều khiển quản lý và đo lường cảm biến viễn thám công nghiệp thông minh với biểu đồ động 60FPS và cảnh báo sự cố tức thời.",
    stars: "980",
    previewType: "iot",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    metrics: "Xử lý 10,000+ tín hiệu MQTT / giây",
    features: ["WebSockets truyền dữ liệu không độ trễ", "Hệ thống cảnh báo Telegram & SMS", "Mô đun hoá bằng Docker container"]
  }
];

export default function App() {
  // Developer Profile State (Bạn có thể thay đổi trực tiếp tại đây hoặc qua nút Edit trên web)
  const [profile, setProfile] = useState({
    name: "ALEX NGUYEN",
    role: "SOFTWARE ENGINEER & FULL-STACK DEVELOPER",
    bio: "I build scalable web applications and solve complex problems with clean, maintainable code. Sẵn sàng mang đến các giải pháp phần mềm tối ưu và thẩm mỹ.",
    experienceYears: "4+",
    completedProjects: "30+",
    email: "contact.alexdev@gmail.com",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    socialLinks: {
      github: "https://github.com",
      facebook: "https://facebook.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com"
    }
  });

  // UI Interactive States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({ ...profile });
  const [activeProjectModal, setActiveProjectModal] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Form contact state
  const [contactForm, setContactForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  // Helper trigger notification toast
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  // Profile update handler
  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfile({ ...editFormData });
    setIsEditModalOpen(false);
    triggerToast("Đã cập nhật thông tin Portfolio thành công!");
  };

  // Mock CV Download
  const handleDownloadCV = () => {
    triggerToast("Đang chuẩn bị file CV (PDF) của " + profile.name + "...");
    setTimeout(() => {
      triggerToast("Tải CV hoàn tất!");
    }, 1200);
  };

  // Copy tech spec snippet
  const handleCopySnippet = () => {
    const snippet = `const developer = {\n  name: "${profile.name}",\n  role: "${profile.role}",\n  status: "Available for Hire",\n  skills: ["React", "TypeScript", "Node.js", "Docker"]\n};`;
    navigator.clipboard?.writeText(snippet);
    setCopiedCode(true);
    triggerToast("Đã sao chép cấu hình nhà phát triển vào Clipboard!");
    setTimeout(() => setCopiedCode(false), 2500);
  };

  // Contact form submit
  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.email || !contactForm.message) {
      triggerToast("Vui lòng điền đủ thông tin liên hệ!");
      return;
    }
    triggerToast(`Cảm ơn bạn! Lời nhắn của bạn đã được gửi tới ${profile.email}`);
    setContactForm({ firstName: '', lastName: '', email: '', message: '' });
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

      {}
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
              Logo
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

          {/* Controls & Quick Info Customizer Button */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                setEditFormData({ ...profile });
                setIsEditModalOpen(true);
              }}
              className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-gray-900 border border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400 transition-all flex items-center gap-1.5 shadow-sm"
              title="Tùy chỉnh nội dung profile của bạn"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Chỉnh sửa thông tin</span>
            </button>

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

      {}
      <section id="home" className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Greeting, Big Headlines & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-block">
                <span className="text-sm font-bold tracking-wider text-emerald-400 uppercase bg-emerald-950/70 border border-emerald-500/30 px-3.5 py-1 rounded-full flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  HELLO, I'M [{profile.name}]
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
                  <div className="text-2xl font-black text-yellow-400 font-mono">100%</div>
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
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80"
                    alt="Developer 3D Portrait"
                    className="w-full h-full object-cover object-center filter saturate-110 group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Futuristic Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-80"></div>
                  
                  {/* Status Indicator */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-gray-700/60 text-xs">
                    <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      Open for Work
                    </span>
                    <span className="text-gray-400 font-mono text-[11px]">TS / React / Py</span>
                  </div>
                </div>

                {/* Floating Widget 1: Top Right - Code Terminal Card */}
                <div className="absolute -top-6 -right-6 bg-gray-900/90 border border-cyan-500/40 rounded-xl p-3 shadow-xl backdrop-blur-md animate-float-slow hidden sm:block max-w-[170px]">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500/80"></span>
                    <span className="w-2 h-2 rounded-full bg-yellow-500/80"></span>
                    <span className="w-2 h-2 rounded-full bg-green-500/80"></span>
                    <span className="text-[10px] text-gray-400 font-mono ml-1">app.tsx</span>
                  </div>
                  <div className="font-mono text-[10px] text-gray-300 space-y-0.5 leading-tight">
                    <p className="text-cyan-300">{'<Developer />'}</p>
                    <p className="text-emerald-400 pl-2">status="Online"</p>
                    <p className="text-gray-400 pl-2">focus="Scale"</p>
                  </div>
                </div>

                {/* Floating Widget 2: Bottom Left - Face/Profile ID Badge */}
                <div className="absolute -bottom-5 -left-6 bg-gray-900/90 border border-emerald-500/40 rounded-xl p-2.5 shadow-xl backdrop-blur-md animate-float-opposite hidden sm:flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <div className="text-[11px] font-bold text-white leading-tight">Senior Verified</div>
                    <div className="text-[9px] text-gray-400 font-mono">Clean Architecture</div>
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

      {}
      <section id="about" className="py-20 bg-[#0a0f1d]/50 border-t border-gray-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Về tôi & Kỹ năng
            </h2>
            <p className="text-gray-400 text-sm max-w-xl mt-2 leading-relaxed">
              Giới thiệu ngắn về bản thân: Lập trình viên đam mê web hiện đại, kiến trúc vi dịch vụ & trí tuệ nhân tạo, tối ưu hoá trải nghiệm người dùng cùng tư duy giải quyết bài toán kỹ thuật cao.
            </p>
          </div>

          {/* Skills Grid Matching Mockup Layout */}
          <div id="skills" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Frontend Skills Box */}
            <div className="bg-gray-900/70 border border-gray-800 hover:border-cyan-500/50 rounded-2xl p-6 transition-all duration-300 group hover:-translate-y-1 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase font-bold tracking-wider text-cyan-400 font-mono">01 // UI & Client</span>
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Frontend</h3>
              <p className="text-xs text-gray-400 mb-5 leading-relaxed">
                Xây dựng giao diện mượt mà, chuẩn Reactive, chuẩn Responsive và tốc độ tải tối ưu.
              </p>

              {/* Tech Badges with Visual Icons */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800/90 border border-gray-700 text-cyan-300 text-xs font-semibold">
                  <span className="text-base">⚛️</span> React.js
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800/90 border border-gray-700 text-emerald-400 text-xs font-semibold">
                  <span className="text-base">🟢</span> Vue.js
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800/90 border border-gray-700 text-orange-400 text-xs font-semibold">
                  <span className="text-base">🌐</span> HTML5 / CSS3
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800/90 border border-gray-700 text-sky-400 text-xs font-semibold">
                  <span>🎨</span> Tailwind CSS
                </div>
              </div>
            </div>

            {/* Backend Skills Box */}
            <div className="bg-gray-900/70 border border-gray-800 hover:border-emerald-500/50 rounded-2xl p-6 transition-all duration-300 group hover:-translate-y-1 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase font-bold tracking-wider text-emerald-400 font-mono">02 // Server & Core</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Backend</h3>
              <p className="text-xs text-gray-400 mb-5 leading-relaxed">
                Thiết kế RESTful & GraphQL APIs, microservices phân tán và xử lý nghiệp vụ chịu tải.
              </p>

              {/* Tech Badges */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800/90 border border-gray-700 text-green-400 text-xs font-semibold">
                  <span className="text-base">🟩</span> Node.js
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800/90 border border-gray-700 text-yellow-300 text-xs font-semibold">
                  <span className="text-base">🐍</span> Python
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800/90 border border-gray-700 text-blue-400 text-xs font-semibold">
                  <Database className="w-3.5 h-3.5" /> PostgreSQL
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800/90 border border-gray-700 text-emerald-300 text-xs font-semibold">
                  <span className="text-base">🍃</span> MongoDB
                </div>
              </div>
            </div>

            {/* DevOps & Tools Skills Box */}
            <div className="bg-gray-900/70 border border-gray-800 hover:border-cyan-400/50 rounded-2xl p-6 transition-all duration-300 group hover:-translate-y-1 shadow-lg md:col-span-2 lg:col-span-1">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase font-bold tracking-wider text-cyan-300 font-mono">03 // Cloud & Ops</span>
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-300"></span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">DevOps & Tools</h3>
              <p className="text-xs text-gray-400 mb-5 leading-relaxed">
                Tự động hóa chu trình CI/CD, Container hóa ứng dụng và giám sát hạ tầng điện toán đám mây.
              </p>

              {/* Tech Badges */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800/90 border border-gray-700 text-orange-400 text-xs font-semibold">
                  <span className="text-base">🐙</span> Git / CI
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800/90 border border-gray-700 text-blue-300 text-xs font-semibold">
                  <span className="text-base">🐳</span> Docker
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800/90 border border-gray-700 text-amber-300 text-xs font-semibold">
                  <Cloud className="w-3.5 h-3.5" /> AWS Cloud
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800/90 border border-gray-700 text-purple-300 text-xs font-semibold">
                  <span className="text-base">⚡</span> Redis
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {}
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

          {/* 3 Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {initialProjects.map((proj) => (
              <div 
                key={proj.id}
                className="bg-gray-900/80 border border-gray-800 rounded-2xl overflow-hidden hover:border-cyan-500/50 transition-all duration-300 flex flex-col group hover:-translate-y-2 shadow-xl"
              >
                {/* Visual Preview Container */}
                <div className="relative h-48 bg-gray-950 overflow-hidden border-b border-gray-800/80">
                  <img 
                    src={proj.image} 
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/40 to-transparent"></div>
                  
                  {/* Category Pill Tag */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-mono font-bold uppercase rounded-md bg-black/70 backdrop-blur-md border border-gray-700 text-cyan-300">
                    {proj.category}
                  </span>

                  {/* Stars / Likes badge */}
                  <span className="absolute top-3 right-3 px-2 py-0.5 text-[11px] rounded bg-black/60 backdrop-blur-md text-yellow-300 border border-gray-800 flex items-center gap-1 font-mono">
                    ★ {proj.stars}
                  </span>
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
                      {proj.tags.map((tag, idx) => (
                        <span 
                          key={idx}
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
                          triggerToast(`Mở kho mã nguồn (GitHub) cho: ${proj.title}`);
                        }}
                        className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-black font-extrabold text-xs hover:opacity-90 transition-all flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>View Code</span>
                      </button>

                      <button 
                        onClick={() => setActiveProjectModal(proj)}
                        className="py-2.5 px-3 rounded-xl border border-gray-700 bg-gray-800/90 hover:bg-gray-800 text-gray-200 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Live Demo</span>
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {}
      <section id="contact" className="py-20 bg-[#080d18]/60 border-t border-gray-800/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left: Contact Intro & Social Links */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Liên hệ
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Bạn có một dự án mới cần hiện thực hóa hoặc muốn tuyển dụng kỹ sư phần mềm cho tổ chức của mình? Hãy để lại tin nhắn hoặc kết nối trực tiếp qua các kênh sau.
              </p>

              {/* Direct email info */}
              <div className="pt-2">
                <div className="text-xs uppercase font-mono text-gray-400 tracking-wider">Email chính thức</div>
                <a href={`mailto:${profile.email}`} className="text-cyan-400 font-mono text-sm hover:underline">
                  {profile.email}
                </a>
              </div>

              {/* Social icons row */}
              <div className="pt-2 flex items-center gap-3">
                <a 
                  href={profile.socialLinks?.github || "https://github.com"} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-300 hover:text-white hover:border-cyan-400 hover:scale-105 transition-all shadow-md"
                  title="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a 
                  href={profile.socialLinks?.linkedin || "https://linkedin.com"} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-300 hover:text-white hover:border-cyan-400 hover:scale-105 transition-all shadow-md"
                  title="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href={`mailto:${profile.email}`}
                  className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-300 hover:text-white hover:border-emerald-400 hover:scale-105 transition-all shadow-md"
                  title="Gửi Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Right: Contact Form matching screenshot design */}
            <div className="lg:col-span-7 bg-gray-900/90 border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
              <form onSubmit={handleContactSubmit} className="space-y-4">
                
                {/* Two column Name input */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <input 
                      type="text" 
                      placeholder="Name" 
                      value={contactForm.firstName}
                      onChange={(e) => setContactForm({ ...contactForm, firstName: e.target.value })}
                      className="w-full bg-[#0a0f1d] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                  <div>
                    <input 
                      type="text" 
                      placeholder="Last" 
                      value={contactForm.lastName}
                      onChange={(e) => setContactForm({ ...contactForm, lastName: e.target.value })}
                      className="w-full bg-[#0a0f1d] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                {/* Email input */}
                <div>
                  <input 
                    type="email" 
                    required
                    placeholder="Email" 
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full bg-[#0a0f1d] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                {/* Message input */}
                <div>
                  <textarea 
                    rows={4}
                    required
                    placeholder="Message" 
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full bg-[#0a0f1d] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 transition-colors resize-none"
                  ></textarea>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,242,254,0.3)] cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>

          </div>

        </div>
      </section>

      {}
      <section className="py-24 relative overflow-hidden bg-gradient-to-b from-[#080d18]/90 via-[#0a0718]/90 to-[#070b12] text-center border-t border-purple-900/30">
        {/* Subtle purple-indigo glow spots and stars effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute top-10 left-1/4 w-1 h-1 bg-white/40 rounded-full shadow-[0_0_6px_#fff]" />
        <div className="absolute bottom-12 right-1/4 w-1.5 h-1.5 bg-purple-300/50 rounded-full shadow-[0_0_8px_#c084fc]" />
        <div className="absolute top-1/3 right-1/6 w-1 h-1 bg-cyan-300/40 rounded-full shadow-[0_0_6px_#67e8f9]" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Main Title matching image */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white mb-3">
            TÌM TÔI TRÊN
          </h2>
          
          {/* Subtitle with highlighted keyword */}
          <p className="text-gray-300 text-base sm:text-lg mb-10 font-normal">
            Đừng ngần ngại <span className="text-[#a855f7] font-semibold hover:text-[#c084fc] transition-colors">kết nối</span> với tôi nhé
          </p>

          {/* Social Icons row matching circular buttons in image */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
            {/* GitHub */}
            <a 
              href={profile.socialLinks?.github || "https://github.com"} 
              target="_blank" 
              rel="noreferrer"
              aria-label="GitHub"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-[#581c87] hover:text-[#7e22ce] flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:shadow-[0_0_28px_rgba(168,85,247,0.7)] hover:scale-110 active:scale-95 transition-all duration-300 group"
            >
              <Github className="w-6 h-6 group-hover:scale-105 transition-transform" />
            </a>

            {/* Facebook */}
            <a 
              href={profile.socialLinks?.facebook || "https://facebook.com"} 
              target="_blank" 
              rel="noreferrer"
              aria-label="Facebook"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-[#581c87] hover:text-[#7e22ce] flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:shadow-[0_0_28px_rgba(168,85,247,0.7)] hover:scale-110 active:scale-95 transition-all duration-300 group"
            >
              <Facebook className="w-6 h-6 group-hover:scale-105 transition-transform" />
            </a>

            {/* LinkedIn */}
            <a 
              href={profile.socialLinks?.linkedin || "https://linkedin.com"} 
              target="_blank" 
              rel="noreferrer"
              aria-label="LinkedIn"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-[#581c87] hover:text-[#7e22ce] flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:shadow-[0_0_28px_rgba(168,85,247,0.7)] hover:scale-110 active:scale-95 transition-all duration-300 group"
            >
              <Linkedin className="w-6 h-6 group-hover:scale-105 transition-transform" />
            </a>

            {/* Instagram */}
            <a 
              href={profile.socialLinks?.instagram || "https://instagram.com"} 
              target="_blank" 
              rel="noreferrer"
              aria-label="Instagram"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white text-[#581c87] hover:text-[#7e22ce] flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:shadow-[0_0_28px_rgba(168,85,247,0.7)] hover:scale-110 active:scale-95 transition-all duration-300 group"
            >
              <Instagram className="w-6 h-6 group-hover:scale-105 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {}
      <footer className="py-8 border-t border-gray-800/80 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 {profile.name} • IT Developer Portfolio. Powered by React & Modern Web Tech.</p>
          <div className="flex items-center gap-2 text-gray-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>All Systems Operational</span>
          </div>
        </div>
      </footer>

      {}
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
                  src={activeProjectModal.image} 
                  alt={activeProjectModal.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h4 className="text-xs uppercase font-mono tracking-wider text-gray-400 mb-1">Mô tả chi tiết</h4>
                <p className="text-sm text-gray-200 leading-relaxed">{activeProjectModal.desc}</p>
              </div>

              <div>
                <h4 className="text-xs uppercase font-mono tracking-wider text-gray-400 mb-2">Tính năng cốt lõi</h4>
                <ul className="space-y-1.5 text-xs text-gray-300">
                  {activeProjectModal.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-950/80 p-3.5 rounded-xl border border-gray-800">
                <span className="text-xs text-cyan-300 font-mono">Hiệu năng & Metrics: </span>
                <span className="text-xs text-gray-300">{activeProjectModal.metrics}</span>
              </div>
            </div>

            <div className="p-4 bg-gray-950/60 border-t border-gray-800 flex gap-3">
              <button 
                onClick={() => {
                  triggerToast("Khởi tạo Sandbox Demo môi trường Test...");
                  setActiveProjectModal(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-bold text-xs hover:opacity-95 flex items-center justify-center gap-2"
              >
                <ExternalLink className="w-4 h-4" /> Mở Phiên Bản Demo Thực Tế
              </button>
              <button 
                onClick={() => setActiveProjectModal(null)}
                className="px-4 py-2.5 rounded-xl bg-gray-800 text-gray-300 text-xs font-semibold hover:bg-gray-700"
              >
                Đóng
              </button>
            </div>

          </div>
        </div>
      )}

      {}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 w-full max-w-lg rounded-2xl p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-gray-800">
              <div className="flex items-center gap-2 text-cyan-400">
                <Sliders className="w-5 h-5" />
                <h3 className="font-bold text-white text-base">Tùy biến thông tin Portfolio</h3>
              </div>
              <button 
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4 py-4 text-xs sm:text-sm">
              <div>
                <label className="block text-gray-300 mb-1">Tên hiển thị (Name)</label>
                <input 
                  type="text" 
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Chức danh (Role)</label>
                <input 
                  type="text" 
                  value={editFormData.role}
                  onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value })}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Email liên hệ</label>
                <input 
                  type="email" 
                  value={editFormData.email}
                  onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Mô tả ngắn (Bio)</label>
                <textarea 
                  rows={3}
                  value={editFormData.bio}
                  onChange={(e) => setEditFormData({ ...editFormData, bio: e.target.value })}
                  className="w-full bg-gray-950 border border-gray-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              {/* Social links customizer */}
              <div className="pt-2 border-t border-gray-800 space-y-2">
                <span className="block text-xs font-semibold text-cyan-400">Liên kết mạng xã hội (TÌM TÔI TRÊN)</span>
                <div className="grid grid-cols-2 gap-2">
                  <input 
                    type="text"
                    placeholder="Link GitHub"
                    value={editFormData.socialLinks?.github || ''}
                    onChange={(e) => setEditFormData({
                      ...editFormData,
                      socialLinks: { ...editFormData.socialLinks, github: e.target.value }
                    })}
                    className="w-full bg-gray-950 border border-gray-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                  <input 
                    type="text"
                    placeholder="Link Facebook"
                    value={editFormData.socialLinks?.facebook || ''}
                    onChange={(e) => setEditFormData({
                      ...editFormData,
                      socialLinks: { ...editFormData.socialLinks, facebook: e.target.value }
                    })}
                    className="w-full bg-gray-950 border border-gray-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                  <input 
                    type="text"
                    placeholder="Link LinkedIn"
                    value={editFormData.socialLinks?.linkedin || ''}
                    onChange={(e) => setEditFormData({
                      ...editFormData,
                      socialLinks: { ...editFormData.socialLinks, linkedin: e.target.value }
                    })}
                    className="w-full bg-gray-950 border border-gray-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                  <input 
                    type="text"
                    placeholder="Link Instagram"
                    value={editFormData.socialLinks?.instagram || ''}
                    onChange={(e) => setEditFormData({
                      ...editFormData,
                      socialLinks: { ...editFormData.socialLinks, instagram: e.target.value }
                    })}
                    className="w-full bg-gray-950 border border-gray-800 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-bold text-xs uppercase cursor-pointer"
                >
                  Lưu thay đổi
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2.5 rounded-lg bg-gray-800 text-gray-300 text-xs font-semibold hover:bg-gray-700 cursor-pointer"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 border border-cyan-400/60 text-white px-5 py-3.5 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.8)] flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <Sparkles className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
        </div>
      )}

    </div>
  );
}