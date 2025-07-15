import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Building,
  TrendingUp,
  Globe2,
  CheckCircle2,
  ArrowRight,
  Brain,
  Smartphone,
  Monitor,
  Zap,
  DollarSign,
  Users,
  Briefcase,
  Factory,
  Cpu,
  Star,
  Sparkles,
} from "lucide-react";

// Import logo thật từ react-icons
import {
  SiGoogle,
  SiApple,
  SiMeta,
  SiAmazon,
  SiSamsung,
  SiToyota,
} from "react-icons/si";

interface Section {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  bgGradient: string;
}

const sections: Section[] = [
  {
    id: "new-expressions",
    title: "Biểu hiện mới của độc quyền",
    icon: <TrendingUp className="w-8 h-8" />,
    color: "text-blue-400",
    bgGradient: "from-blue-900/20 to-indigo-900/20",
  },
  {
    id: "state-monopoly",
    title: "Biểu hiện mới của độc quyền nhà nước",
    icon: <Building className="w-8 h-8" />,
    color: "text-red-400",
    bgGradient: "from-red-900/20 to-pink-900/20",
  },
  {
    id: "historical-role",
    title: "Vai trò lịch sử của CNTB",
    icon: <Globe2 className="w-8 h-8" />,
    color: "text-green-400",
    bgGradient: "from-green-900/20 to-emerald-900/20",
  },
  {
    id: "conclusion",
    title: "Tổng kết",
    icon: <CheckCircle2 className="w-8 h-8" />,
    color: "text-purple-400",
    bgGradient: "from-purple-900/20 to-violet-900/20",
  },
];

// Animation component for cards
const AnimatedCard = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`transform transition-all duration-1000 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
};

// Floating particles background
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-blue-400/20 rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
};

function App() {
  const [activeSection, setActiveSection] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [focusedCard, setFocusedCard] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const currentSection = Math.round(scrollPosition / windowHeight);
      setActiveSection(Math.min(currentSection, sections.length));
      setScrollY(scrollPosition);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard navigation for cards
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const cards = document.querySelectorAll("[data-card-id]");
      const cardIds = Array.from(cards)
        .map((card) => card.getAttribute("data-card-id"))
        .filter(Boolean);

      if (cardIds.length === 0) return;

      let currentIndex = focusedCard ? cardIds.indexOf(focusedCard) : -1;

      switch (event.key) {
        case "ArrowDown":
        case "ArrowRight":
          event.preventDefault();
          currentIndex = (currentIndex + 1) % cardIds.length;
          break;
        case "ArrowUp":
        case "ArrowLeft":
          event.preventDefault();
          currentIndex =
            currentIndex <= 0 ? cardIds.length - 1 : currentIndex - 1;
          break;
        case "Enter":
          if (focusedCard) {
            const focusedElement = document.querySelector(
              `[data-card-id="${focusedCard}"]`
            );
            if (focusedElement) {
              focusedElement.scrollIntoView({
                behavior: "smooth",
                block: "center",
              });
            }
          }
          return;
        default:
          return;
      }

      const newFocusedCard = cardIds[currentIndex];
      setFocusedCard(newFocusedCard);

      // Auto scroll to focused card
      const focusedElement = document.querySelector(
        `[data-card-id="${newFocusedCard}"]`
      );
      if (focusedElement) {
        focusedElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [focusedCard]);

  const scrollToSection = (index: number) => {
    console.log("scrollToSection called with index:", index);
    const targetY = index * window.innerHeight;
    console.log("Scrolling to targetY:", targetY);
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  const nextSection = () => {
    if (activeSection < sections.length) {
      scrollToSection(activeSection + 1);
    }
  };

  return (
    <div className="bg-slate-900 text-white overflow-x-hidden relative">
      {/* Compact Navigation Dots */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 space-y-3">
        <div
          className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
            activeSection === 0
              ? "bg-blue-400 scale-125 shadow-sm shadow-blue-400/50"
              : "bg-white/30 hover:bg-white/60 hover:scale-110"
          }`}
          onClick={() => scrollToSection(0)}
        />
        {sections.map((section, index) => (
          <div
            key={section.id}
            className={`w-2 h-2 rounded-full cursor-pointer transition-all duration-300 ${
              activeSection === index + 1
                ? "bg-blue-400 scale-125 shadow-sm shadow-blue-400/50"
                : "bg-white/30 hover:bg-white/60 hover:scale-110"
            }`}
            onClick={() => scrollToSection(index + 1)}
          />
        ))}
      </div>

      {/* Hero Section with Parallax */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated Background */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20" />
        <FloatingParticles />

        <div className="relative z-10 text-center max-w-6xl mx-auto px-8">
          <AnimatedCard delay={200}>
            <div className="w-32 h-32 mx-auto mb-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse relative">
              <Brain className="w-16 h-16 text-white" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-75 animate-ping" />
            </div>
          </AnimatedCard>

          <AnimatedCard delay={400}>
            <h1 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                Chương 4.3
              </span>
              <br />
              <span className="text-white hover:text-gray-200 transition-colors duration-500">
                Biểu hiện mới của độc quyền,
              </span>
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                độc quyền nhà nước
              </span>
            </h1>
          </AnimatedCard>

          <AnimatedCard delay={600}>
            <p className="text-lg text-gray-300 mb-10 leading-relaxed max-w-4xl mx-auto">
              trong điều kiện ngày nay; Vai trò lịch sử của chủ nghĩa tư bản
            </p>
          </AnimatedCard>

          <AnimatedCard delay={800}>
            <div className="text-base text-gray-400 mb-16 font-light">
              Chương 4: Cạnh tranh và độc quyền trong nền kinh tế thị trường
            </div>
          </AnimatedCard>

          <AnimatedCard delay={1000}>
            <button
              onClick={nextSection}
              className="group relative px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full border border-white/20 hover:from-blue-500 hover:to-purple-500 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
            >
              <span className="text-lg font-medium">Bắt đầu khám phá</span>
              <ChevronDown className="w-6 h-6 ml-3 inline-block group-hover:translate-y-1 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </button>
          </AnimatedCard>
        </div>
      </section>

      {/* Section I: Enhanced with animations */}
      <section className="min-h-screen flex items-center justify-center relative py-20 overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-br from-slate-900 to-gray-900`}
          style={{
            transform: `translateY(${(scrollY - window.innerHeight) * 0.3}px)`,
          }}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-r ${sections[0].bgGradient}`}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-8">
          <AnimatedCard delay={200}>
            <div className="text-center mb-16">
              <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl flex items-center justify-center shadow-2xl transform hover:rotate-3 hover:scale-110 transition-all duration-500">
                {sections[0].icon}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                4.3.1. Biểu hiện mới của độc quyền
              </h2>
              <div className="w-40 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto" />
            </div>
          </AnimatedCard>

          <div className="grid gap-12">
            {/* Enhanced cards with better animations */}
            <AnimatedCard delay={400}>
              <div
                data-card-id="card-tich-tu-tu-ban"
                className={`group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-10 border transition-all duration-500 cursor-pointer ${
                  focusedCard === "card-tich-tu-tu-ban"
                    ? "border-blue-400 transform scale-105 shadow-2xl shadow-blue-500/50 ring-2 ring-blue-400/50"
                    : "border-white/20 hover:border-blue-400/50 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
                }`}
                onMouseEnter={() => setFocusedCard("card-tich-tu-tu-ban")}
                onMouseLeave={() => setFocusedCard(null)}
                onClick={() => {
                  const element = document.querySelector(
                    '[data-card-id="card-tich-tu-tu-ban"]'
                  );
                  if (element) {
                    element.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                  }
                }}
              >
                <div className="flex items-center space-x-6 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/50 transition-all duration-500">
                    <span className="text-white font-bold text-2xl">1️⃣</span>
                  </div>
                  <Factory className="w-10 h-10 text-blue-400 group-hover:text-blue-300 transition-colors duration-300" />
                  <h3 className="text-2xl md:text-3xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                    Tích tụ và tập trung tư bản
                  </h3>
                </div>

                <p className="text-gray-200 text-base mb-8 leading-relaxed">
                  Biểu hiện đầu tiên của độc quyền ngày nay chính là sự tích tụ
                  và tập trung tư bản. Điều này nghĩa là các công ty lớn dần
                  thâu tóm các công ty nhỏ, hoặc mua lại những đối thủ cạnh
                  tranh, dẫn đến việc thị trường chỉ còn một vài "ông lớn" chi
                  phối.
                </p>

                <div className="bg-blue-500/10 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30 group-hover:border-blue-400/50 transition-all duration-500">
                  <h4 className="text-lg font-bold text-blue-300 mb-6 flex items-center">
                    <Sparkles className="w-6 h-6 mr-3" />
                    Ví dụ điển hình:
                  </h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-4 p-4 bg-blue-400/10 rounded-xl hover:bg-blue-400/20 transition-all duration-300">
                      <SiGoogle className="w-12 h-12 text-blue-400" />
                      <div>
                        <p className="text-blue-300 font-semibold text-lg">
                          Google
                        </p>
                        <p className="text-gray-300 text-sm">
                          YouTube, Android, +100 công ty
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-blue-400/10 rounded-xl hover:bg-blue-400/20 transition-all duration-300">
                      <SiMeta className="w-12 h-12 text-blue-400" />
                      <div>
                        <p className="text-blue-300 font-semibold text-lg">
                          Meta
                        </p>
                        <p className="text-gray-300 text-sm">
                          Instagram, WhatsApp
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={600}>
              <div
                data-card-id="card-tap-doan-xuyen-quoc-gia"
                className={`group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-10 border transition-all duration-500 cursor-pointer ${
                  focusedCard === "card-tap-doan-xuyen-quoc-gia"
                    ? "border-purple-400 transform scale-105 shadow-2xl shadow-purple-500/50 ring-2 ring-purple-400/50"
                    : "border-white/20 hover:border-purple-400/50 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
                }`}
                onMouseEnter={() =>
                  setFocusedCard("card-tap-doan-xuyen-quoc-gia")
                }
                onMouseLeave={() => setFocusedCard(null)}
                onClick={() => {
                  const element = document.querySelector(
                    '[data-card-id="card-tap-doan-xuyen-quoc-gia"]'
                  );
                  if (element) {
                    element.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                  }
                }}
              >
                <div className="flex items-center space-x-6 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/50 transition-all duration-500">
                    <span className="text-white font-bold text-2xl">2️⃣</span>
                  </div>
                  <Globe2 className="w-10 h-10 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
                  <h3 className="text-2xl md:text-3xl font-bold text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
                    Tập đoàn xuyên quốc gia (TNCs)
                  </h3>
                </div>

                <p className="text-gray-200 text-base mb-8 leading-relaxed">
                  Tiếp theo là sự xuất hiện ngày càng nhiều của các tập đoàn
                  xuyên quốc gia. Đây là những công ty có hoạt động kinh doanh
                  tại nhiều quốc gia, sở hữu nhiều nhà máy, chi nhánh trên toàn
                  thế giới.
                </p>

                <div className="bg-purple-500/10 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30 group-hover:border-purple-400/50 transition-all duration-500">
                  <h4 className="text-xl font-bold text-purple-300 mb-6 flex items-center">
                    <Star className="w-6 h-6 mr-3" />
                    Các tập đoàn hàng đầu:
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-6 bg-purple-400/10 rounded-xl hover:bg-purple-400/20 transition-all duration-300 hover:transform hover:scale-105">
                      <SiApple className="w-16 h-16 mx-auto mb-4 text-purple-400" />
                      <p className="text-purple-300 font-bold text-lg">Apple</p>
                      <p className="text-gray-300 text-sm mt-2">
                        Sản xuất toàn cầu
                      </p>
                    </div>
                    <div className="text-center p-6 bg-purple-400/10 rounded-xl hover:bg-purple-400/20 transition-all duration-300 hover:transform hover:scale-105">
                      <SiSamsung className="w-16 h-16 mx-auto mb-4 text-purple-400" />
                      <p className="text-purple-300 font-bold text-lg">
                        Samsung
                      </p>
                      <p className="text-gray-300 text-sm mt-2">
                        Đa ngành, đa quốc gia
                      </p>
                    </div>
                    <div className="text-center p-6 bg-purple-400/10 rounded-xl hover:bg-purple-400/20 transition-all duration-300 hover:transform hover:scale-105">
                      <SiToyota className="w-16 h-16 mx-auto mb-4 text-purple-400" />
                      <p className="text-purple-300 font-bold text-lg">
                        Toyota
                      </p>
                      <p className="text-gray-300 text-sm mt-2">
                        Ô tô toàn cầu
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedCard>

            {/* Big Tech Showcase with enhanced design */}
            <AnimatedCard delay={800}>
              <div
                data-card-id="card-doc-quyen-ky-thuat-so"
                className={`group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-10 border transition-all duration-500 cursor-pointer ${
                  focusedCard === "card-doc-quyen-ky-thuat-so"
                    ? "border-yellow-400 transform scale-105 shadow-2xl shadow-yellow-500/50 ring-2 ring-yellow-400/50"
                    : "border-white/20 hover:border-yellow-400/50 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/25"
                }`}
                onMouseEnter={() =>
                  setFocusedCard("card-doc-quyen-ky-thuat-so")
                }
                onMouseLeave={() => setFocusedCard(null)}
                onClick={() => {
                  const element = document.querySelector(
                    '[data-card-id="card-doc-quyen-ky-thuat-so"]'
                  );
                  if (element) {
                    element.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                  }
                }}
              >
                <div className="flex items-center space-x-6 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-yellow-500/50 transition-all duration-500">
                    <span className="text-white font-bold text-2xl">5️⃣</span>
                  </div>
                  <Cpu className="w-10 h-10 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300" />
                  <h3 className="text-2xl md:text-3xl font-bold text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300">
                    Độc quyền kỹ thuật số
                  </h3>
                </div>

                <p className="text-gray-200 text-base mb-8 leading-relaxed">
                  Một biểu hiện rất đặc trưng ngày nay là độc quyền kỹ thuật số,
                  gắn liền với cách mạng công nghiệp 4.0, với các công nghệ như
                  AI, Big Data, Blockchain.
                </p>

                <div className="bg-yellow-500/10 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/30 group-hover:border-yellow-400/50 transition-all duration-500">
                  <h4 className="text-xl font-bold text-yellow-300 mb-8 text-center">
                    🏆 Big Tech Giants
                  </h4>
                  <div className="grid md:grid-cols-5 gap-6">
                    {[
                      { icon: SiGoogle, name: "Google", color: "text-red-400" },
                      {
                        icon: SiAmazon,
                        name: "Amazon",
                        color: "text-orange-400",
                      },
                      { icon: SiApple, name: "Apple", color: "text-gray-400" },
                      { icon: SiMeta, name: "Meta", color: "text-blue-400" },
                      {
                        icon: Monitor,
                        name: "Microsoft",
                        color: "text-green-400",
                      },
                    ].map((company, index) => (
                      <div
                        key={company.name}
                        className="text-center group/card"
                      >
                        <div className="p-6 bg-yellow-400/10 rounded-xl hover:bg-yellow-400/20 transition-all duration-300 hover:transform hover:scale-110 hover:shadow-lg">
                          <company.icon
                            className={`w-16 h-16 mx-auto mb-4 ${company.color} group-hover/card:scale-110 transition-transform duration-300`}
                          />
                          <p className="text-yellow-300 font-bold text-lg">
                            {company.name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mt-8">
                    <div className="bg-yellow-400/20 rounded-xl p-6 hover:bg-yellow-400/30 transition-all duration-300">
                      <h5 className="font-bold text-yellow-300 mb-3 flex items-center">
                        <Users className="w-5 h-5 mr-2" />
                        Dữ liệu người dùng
                      </h5>
                      <p className="text-gray-200">
                        Nắm được hành vi, sở thích của hàng tỷ người
                      </p>
                    </div>
                    <div className="bg-yellow-400/20 rounded-xl p-6 hover:bg-yellow-400/30 transition-all duration-300">
                      <h5 className="font-bold text-yellow-300 mb-3 flex items-center">
                        <Zap className="w-5 h-5 mr-2" />
                        Hệ sinh thái khép kín
                      </h5>
                      <p className="text-gray-200">
                        Cuốn người dùng vào toàn bộ hệ sinh thái
                      </p>
                    </div>
                    <div className="bg-yellow-400/20 rounded-xl p-6 hover:bg-yellow-400/30 transition-all duration-300">
                      <h5 className="font-bold text-yellow-300 mb-3 flex items-center">
                        <Building className="w-5 h-5 mr-2" />
                        Rào cản gia nhập
                      </h5>
                      <p className="text-gray-200">
                        Hiệu ứng mạng khó bị thay thế
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Section II: State Monopoly - Enhanced */}
      <section className="min-h-screen flex items-center justify-center relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-slate-900 to-gray-900"
          style={{
            transform: `translateY(${
              (scrollY - window.innerHeight * 2) * 0.3
            }px)`,
          }}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-r ${sections[1].bgGradient}`}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-8">
          <AnimatedCard delay={200}>
            <div className="text-center mb-16">
              <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl transform hover:rotate-3 hover:scale-110 transition-all duration-500">
                {sections[1].icon}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                4.3.2. Biểu hiện mới của độc quyền nhà nước
              </h2>
              <div className="w-40 h-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mx-auto" />
            </div>
          </AnimatedCard>

          <div className="space-y-12">
            <AnimatedCard delay={400}>
              <div className="group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-10 border border-white/20 hover:border-red-400/50 transition-all duration-500">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-red-500/10 backdrop-blur-sm rounded-2xl p-8 border border-red-500/30 hover:border-red-400/50 transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <Building className="w-8 h-8 text-red-400 mr-4" />
                      <h3 className="text-lg font-bold text-red-300">
                        Khái niệm
                      </h3>
                    </div>
                    <p className="text-gray-200 text-base leading-relaxed">
                      <strong className="text-red-300">
                        CNTB độc quyền nhà nước
                      </strong>{" "}
                      là sự kết hợp sức mạnh của các tổ chức độc quyền tư nhân
                      với nhà nước tư sản.
                    </p>
                  </div>
                  <div className="bg-red-500/10 backdrop-blur-sm rounded-2xl p-8 border border-red-500/30 hover:border-red-400/50 transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <Users className="w-8 h-8 text-red-400 mr-4" />
                      <h3 className="text-lg font-bold text-red-300">
                        Vai trò
                      </h3>
                    </div>
                    <p className="text-gray-200 text-base leading-relaxed">
                      Nhà nước đóng vai trò{" "}
                      <strong className="text-red-300">
                        công cụ của giai cấp tư sản
                      </strong>
                      , can thiệp vào nền kinh tế để bảo vệ lợi ích tư bản độc
                      quyền.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={600}>
              <div
                data-card-id="card-5-bieu-hien-moi"
                className={`group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-10 border transition-all duration-500 cursor-pointer ${
                  focusedCard === "card-5-bieu-hien-moi"
                    ? "border-blue-400 transform scale-105 shadow-2xl shadow-blue-500/50 ring-2 ring-blue-400/50"
                    : "border-white/20 hover:border-blue-400/50 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
                }`}
                onMouseEnter={() => setFocusedCard("card-5-bieu-hien-moi")}
                onMouseLeave={() => setFocusedCard(null)}
                onClick={() => {
                  const element = document.querySelector(
                    '[data-card-id="card-5-bieu-hien-moi"]'
                  );
                  if (element) {
                    element.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                  }
                }}
              >
                <h3 className="text-2xl font-bold text-blue-400 mb-8 text-center flex items-center justify-center">
                  <Zap className="w-8 h-8 mr-4" />5 Biểu hiện mới
                </h3>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      icon: <Building className="w-8 h-8" />,
                      title: "Can thiệp sâu hơn",
                      desc: 'Cứu trợ tập đoàn "quá lớn để sụp đổ"',
                      color: "green",
                    },
                    {
                      icon: <Globe2 className="w-8 h-8" />,
                      title: "Bảo hộ mậu dịch",
                      desc: "Thuế quan, chiến tranh thương mại",
                      color: "blue",
                    },
                    {
                      icon: <Briefcase className="w-8 h-8" />,
                      title: "Sở hữu doanh nghiệp",
                      desc: "Cổ phần hóa, quỹ nhà nước",
                      color: "purple",
                    },
                    {
                      icon: <Monitor className="w-8 h-8" />,
                      title: "Kiểm soát dữ liệu",
                      desc: "Quản lý không gian mạng",
                      color: "orange",
                    },
                    {
                      icon: <Factory className="w-8 h-8" />,
                      title: "Tập đoàn siêu lớn",
                      desc: "Hỗ trợ công nghệ, năng lượng",
                      color: "yellow",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className={`bg-${item.color}-500/10 backdrop-blur-sm rounded-2xl p-6 border border-${item.color}-500/30 hover:border-${item.color}-400/50 transition-all duration-300 hover:transform hover:scale-105`}
                    >
                      <div className={`text-${item.color}-400 mb-4`}>
                        {item.icon}
                      </div>
                      <h4
                        className={`text-lg font-bold text-${item.color}-300 mb-2`}
                      >
                        {item.title}
                      </h4>
                      <p className="text-gray-200 text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Section III: Historical Role - Enhanced */}
      <section className="min-h-screen flex items-center justify-center relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-slate-900 to-gray-900"
          style={{
            transform: `translateY(${
              (scrollY - window.innerHeight * 3) * 0.3
            }px)`,
          }}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-r ${sections[2].bgGradient}`}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-8">
          <AnimatedCard delay={200}>
            <div className="text-center mb-16">
              <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl flex items-center justify-center shadow-2xl transform hover:rotate-3 hover:scale-110 transition-all duration-500">
                {sections[2].icon}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                4.3.3. Vai trò lịch sử của CNTB
              </h2>
              <div className="w-40 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto" />
            </div>
          </AnimatedCard>

          <div className="space-y-12">
            {/* Positive Role */}
            <AnimatedCard delay={400}>
              <div
                data-card-id="card-vai-tro-tich-cuc"
                className={`group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-10 border transition-all duration-500 cursor-pointer ${
                  focusedCard === "card-vai-tro-tich-cuc"
                    ? "border-green-400 transform scale-105 shadow-2xl shadow-green-500/50 ring-2 ring-green-400/50"
                    : "border-white/20 hover:border-green-400/50 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25"
                }`}
                onMouseEnter={() => setFocusedCard("card-vai-tro-tich-cuc")}
                onMouseLeave={() => setFocusedCard(null)}
                onClick={() => {
                  const element = document.querySelector(
                    '[data-card-id="card-vai-tro-tich-cuc"]'
                  );
                  if (element) {
                    element.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                  }
                }}
              >
                <div className="flex items-center space-x-6 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-400">
                    Vai trò tích cực
                  </h3>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      icon: <Factory className="w-8 h-8" />,
                      title: "Phát triển lực lượng sản xuất",
                      points: [
                        "Năng suất lao động cao",
                        "Cơ khí hóa, tự động hóa",
                      ],
                    },
                    {
                      icon: <Users className="w-8 h-8" />,
                      title: "Xã hội hóa sản xuất",
                      points: ["Phân công lao động", "Hợp tác quốc tế"],
                    },
                    {
                      icon: <Building className="w-8 h-8" />,
                      title: "Tiền đề cho CNXH",
                      points: ["Tích lũy tư bản", "Đội ngũ công nhân"],
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-green-500/10 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30 hover:border-green-400/50 transition-all duration-300"
                    >
                      <div className="text-green-400 mb-4">{item.icon}</div>
                      <h4 className="text-lg font-bold text-green-300 mb-4">
                        {item.title}
                      </h4>
                      <ul className="space-y-2">
                        {item.points.map((point, i) => (
                          <li
                            key={i}
                            className="flex items-center text-gray-200"
                          >
                            <Sparkles className="w-4 h-4 text-green-400 mr-2" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedCard>

            {/* Negative aspects */}
            <AnimatedCard delay={600}>
              <div
                data-card-id="card-han-che-mau-thuan"
                className={`group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-10 border transition-all duration-500 cursor-pointer ${
                  focusedCard === "card-han-che-mau-thuan"
                    ? "border-red-400 transform scale-105 shadow-2xl shadow-red-500/50 ring-2 ring-red-400/50"
                    : "border-white/20 hover:border-red-400/50 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25"
                }`}
                onMouseEnter={() => setFocusedCard("card-han-che-mau-thuan")}
                onMouseLeave={() => setFocusedCard(null)}
                onClick={() => {
                  const element = document.querySelector(
                    '[data-card-id="card-han-che-mau-thuan"]'
                  );
                  if (element) {
                    element.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                  }
                }}
              >
                <div className="flex items-center space-x-6 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-4xl">⚠️</span>
                  </div>
                  <h3 className="text-2xl font-bold text-red-400">
                    Hạn chế, mâu thuẫn
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    {
                      icon: "📉",
                      text: "Khủng hoảng kinh tế chu kỳ, thất nghiệp",
                    },
                    { icon: "💸", text: "Bóc lột giá trị thặng dư" },
                    { icon: "⚖️", text: "Bất bình đẳng xã hội" },
                    {
                      icon: "🎭",
                      text: "Thao túng thị trường, méo mó giá trị",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-red-500/10 backdrop-blur-sm rounded-xl p-6 border border-red-500/30 hover:border-red-400/50 transition-all duration-300 hover:transform hover:scale-105"
                    >
                      <div className="flex items-center space-x-4">
                        <span className="text-2xl">{item.icon}</span>
                        <p className="text-gray-200 font-medium">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Section IV: Conclusion - Enhanced */}
      <section className="min-h-screen flex items-center justify-center relative py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-slate-900 to-gray-900"
          style={{
            transform: `translateY(${
              (scrollY - window.innerHeight * 4) * 0.3
            }px)`,
          }}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-r ${sections[3].bgGradient}`}
        />
        <FloatingParticles />

        <div className="relative z-10 max-w-6xl mx-auto px-8">
          <AnimatedCard delay={200}>
            <div className="text-center mb-16">
              <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-purple-500 to-violet-500 rounded-3xl flex items-center justify-center shadow-2xl transform hover:rotate-3 hover:scale-110 transition-all duration-500">
                {sections[3].icon}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                Tổng kết nội dung 4.3
              </h2>
              <div className="w-40 h-2 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full mx-auto" />
            </div>
          </AnimatedCard>

          <div className="space-y-8">
            {[
              {
                icon: "🔄",
                title: "Biểu hiện mới của độc quyền và độc quyền nhà nước",
                desc: "phản ánh sự phát triển tất yếu của CNTB trong giai đoạn hiện đại, gắn liền với toàn cầu hóa và CMCN 4.0.",
                color: "purple",
              },
              {
                icon: "⚔️",
                title: "Độc quyền không xóa bỏ cạnh tranh",
                desc: "mà biến cạnh tranh thành công cụ củng cố vị thế, chi phối thị trường.",
                color: "blue",
              },
              {
                icon: "🏛️",
                title: "Vai trò lịch sử của CNTB",
                desc: "thể hiện tính tiến bộ, nhưng đồng thời bộc lộ các hạn chế nội tại, mâu thuẫn không thể khắc phục trong lòng nó.",
                color: "amber",
              },
            ].map((item, index) => (
              <AnimatedCard key={index} delay={400 + index * 200}>
                <div
                  className={`group flex items-start space-x-8 p-8 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl border border-white/20 hover:border-${item.color}-400/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-${item.color}-500/25`}
                >
                  <span className="text-5xl mt-2">{item.icon}</span>
                  <div>
                    <h3
                      className={`text-xl font-bold text-${item.color}-300 mb-4`}
                    >
                      {item.title}
                    </h3>
                    <p className="text-gray-100 text-base leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </AnimatedCard>
            ))}
          </div>

          <AnimatedCard delay={1000}>
            <div className="mt-20 text-center">
              <div className="inline-flex items-center space-x-6 px-12 py-8 bg-gradient-to-r from-purple-600 via-violet-600 to-pink-600 rounded-3xl shadow-2xl hover:shadow-purple-500/50 transition-all duration-500 transform hover:scale-105">
                <span className="text-5xl">🎓</span>
                <span className="text-white font-bold text-xl">
                  Cảm ơn bạn đã theo dõi
                </span>
              </div>
              <p className="text-gray-400 text-base mt-8 font-light">
                © 2025 Chương 4: Cạnh tranh và độc quyền trong nền kinh tế thị
                trường
              </p>
            </div>
          </AnimatedCard>
        </div>
      </section>
    </div>
  );
}

export default App;
