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
                    Biểu hiện mới về tích tụ và tập trung tư bản
                  </h3>
                </div>

                <div className="space-y-6">
                  <p className="text-gray-200 text-base leading-relaxed">
                    <strong className="text-blue-300">
                      Xuất hiện các tập đoàn xuyên quốc gia (TNCs)
                    </strong>
                    , hoạt động đa ngành, đa quốc gia.
                  </p>

                  <p className="text-gray-200 text-base leading-relaxed">
                    <strong className="text-blue-300">
                      Liên kết chiều ngang, chiều dọc
                    </strong>
                    , các tập đoàn công nghệ nắm giữ nhiều lĩnh vực (Apple,
                    Samsung).
                  </p>

                  <div className="bg-blue-500/10 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30 group-hover:border-blue-400/50 transition-all duration-500">
                    <h4 className="text-lg font-bold text-blue-300 mb-6 flex items-center">
                      <Sparkles className="w-6 h-6 mr-3" />
                      Các hình thức tổ chức mới:
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-4 p-4 bg-blue-400/10 rounded-xl hover:bg-blue-400/20 transition-all duration-300">
                        <div className="w-3 h-3 bg-blue-400 rounded-full mt-2"></div>
                        <div>
                          <p className="text-blue-300 font-semibold text-lg">
                            Concern:
                          </p>
                          <p className="text-gray-300 text-sm">
                            Độc quyền đa ngành, nhiều xí nghiệp khác nhau.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-4 p-4 bg-blue-400/10 rounded-xl hover:bg-blue-400/20 transition-all duration-300">
                        <div className="w-3 h-3 bg-blue-400 rounded-full mt-2"></div>
                        <div>
                          <p className="text-blue-300 font-semibold text-lg">
                            Conglomerate:
                          </p>
                          <p className="text-gray-300 text-sm">
                            Hợp nhất nhiều công ty nhỏ, không liên quan trực
                            tiếp nhưng cùng mục tiêu lợi nhuận.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={600}>
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
                    <span className="text-white font-bold text-2xl">2️⃣</span>
                  </div>
                  <Cpu className="w-10 h-10 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300" />
                  <h3 className="text-2xl md:text-3xl font-bold text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300">
                    Độc quyền kỹ thuật số (Digital Monopoly)
                  </h3>
                </div>

                <div className="space-y-6">
                  <p className="text-gray-200 text-base leading-relaxed">
                    Gắn liền với{" "}
                    <strong className="text-yellow-300">
                      cách mạng công nghiệp 4.0, AI, Big Data, Blockchain
                    </strong>
                    .
                  </p>

                  <div className="bg-yellow-500/10 backdrop-blur-sm rounded-2xl p-8 border border-yellow-500/30 group-hover:border-yellow-400/50 transition-all duration-500">
                    <h4 className="text-xl font-bold text-yellow-300 mb-6 flex items-center">
                      <Star className="w-6 h-6 mr-3" />
                      Các tập đoàn công nghệ lớn trở thành "gã khổng lồ":
                    </h4>
                    <div className="grid md:grid-cols-5 gap-4 mb-6">
                      {[
                        {
                          icon: SiGoogle,
                          name: "Google",
                          color: "text-red-400",
                        },
                        {
                          icon: SiAmazon,
                          name: "Amazon",
                          color: "text-orange-400",
                        },
                        {
                          icon: SiApple,
                          name: "Apple",
                          color: "text-gray-400",
                        },
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
                          <div className="p-4 bg-yellow-400/10 rounded-xl hover:bg-yellow-400/20 transition-all duration-300 hover:transform hover:scale-110">
                            <company.icon
                              className={`w-12 h-12 mx-auto mb-2 ${company.color}`}
                            />
                            <p className="text-yellow-300 font-bold text-sm">
                              {company.name}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="bg-yellow-400/20 rounded-xl p-4 hover:bg-yellow-400/30 transition-all duration-300">
                        <h5 className="font-bold text-yellow-300 mb-2 flex items-center">
                          <Users className="w-5 h-5 mr-2" />
                          Dữ liệu người dùng
                        </h5>
                        <p className="text-gray-200 text-sm">
                          Kiểm soát thông tin cá nhân
                        </p>
                      </div>
                      <div className="bg-yellow-400/20 rounded-xl p-4 hover:bg-yellow-400/30 transition-all duration-300">
                        <h5 className="font-bold text-yellow-300 mb-2 flex items-center">
                          <Zap className="w-5 h-5 mr-2" />
                          Hệ sinh thái khép kín
                        </h5>
                        <p className="text-gray-200 text-sm">
                          Sản phẩm liên kết chặt chẽ
                        </p>
                      </div>
                      <div className="bg-yellow-400/20 rounded-xl p-4 hover:bg-yellow-400/30 transition-all duration-300">
                        <h5 className="font-bold text-yellow-300 mb-2 flex items-center">
                          <Building className="w-5 h-5 mr-2" />
                          Rào cản gia nhập
                        </h5>
                        <p className="text-gray-200 text-sm">
                          Hiệu ứng mạng khó thay thế
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={800}>
              <div
                data-card-id="card-doc-quyen-tai-chinh"
                className={`group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-10 border transition-all duration-500 cursor-pointer ${
                  focusedCard === "card-doc-quyen-tai-chinh"
                    ? "border-green-400 transform scale-105 shadow-2xl shadow-green-500/50 ring-2 ring-green-400/50"
                    : "border-white/20 hover:border-green-400/50 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25"
                }`}
                onMouseEnter={() => setFocusedCard("card-doc-quyen-tai-chinh")}
                onMouseLeave={() => setFocusedCard(null)}
              >
                <div className="flex items-center space-x-6 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-green-500/50 transition-all duration-500">
                    <span className="text-white font-bold text-2xl">3️⃣</span>
                  </div>
                  <DollarSign className="w-10 h-10 text-green-400 group-hover:text-green-300 transition-colors duration-300" />
                  <h3 className="text-2xl md:text-3xl font-bold text-green-400 group-hover:text-green-300 transition-colors duration-300">
                    Độc quyền tài chính toàn cầu
                  </h3>
                </div>

                <div className="space-y-6">
                  <p className="text-gray-200 text-base leading-relaxed">
                    <strong className="text-green-300">
                      BlackRock, Vanguard, State Street
                    </strong>{" "}
                    nắm{" "}
                    <strong className="text-green-300">20,000 tỷ USD</strong>{" "}
                    tài sản, kiểm soát cổ phần tại hàng loạt công ty lớn.
                  </p>

                  <div className="bg-green-500/10 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30">
                    <p className="text-gray-200 text-base leading-relaxed">
                      Hiện tượng{" "}
                      <strong className="text-green-300">
                        "quá lớn để sụp đổ"
                      </strong>
                      , được nhà nước bảo hộ.
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={1000}>
              <div
                data-card-id="card-doc-quyen-truyen-thong"
                className={`group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-10 border transition-all duration-500 cursor-pointer ${
                  focusedCard === "card-doc-quyen-truyen-thong"
                    ? "border-purple-400 transform scale-105 shadow-2xl shadow-purple-500/50 ring-2 ring-purple-400/50"
                    : "border-white/20 hover:border-purple-400/50 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
                }`}
                onMouseEnter={() =>
                  setFocusedCard("card-doc-quyen-truyen-thong")
                }
                onMouseLeave={() => setFocusedCard(null)}
              >
                <div className="flex items-center space-x-6 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/50 transition-all duration-500">
                    <span className="text-white font-bold text-2xl">4️⃣</span>
                  </div>
                  <Briefcase className="w-10 h-10 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
                  <h3 className="text-2xl md:text-3xl font-bold text-purple-400 group-hover:text-purple-300 transition-colors duration-300">
                    Độc quyền trong ngành truyền thống
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-purple-500/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                    <h4 className="text-lg font-bold text-purple-300 mb-4">
                      Ngành dược:
                    </h4>
                    <p className="text-gray-200 text-sm">
                      Pfizer, Johnson & Johnson, Roche... chi phối thị trường
                      dược phẩm toàn cầu.
                    </p>
                  </div>
                  <div className="bg-purple-500/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                    <h4 className="text-lg font-bold text-purple-300 mb-4">
                      Ngành năng lượng:
                    </h4>
                    <p className="text-gray-200 text-sm">
                      ExxonMobil, BP, Shell, Chevron.
                    </p>
                  </div>
                  <div className="bg-purple-500/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                    <h4 className="text-lg font-bold text-purple-300 mb-4">
                      Các ngành khác:
                    </h4>
                    <p className="text-gray-200 text-sm">
                      Kính mắt (Luxottica), khóa kéo (YKK), kim cương (De
                      Beers).
                    </p>
                  </div>
                  <div className="bg-purple-500/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                    <h4 className="text-lg font-bold text-purple-300 mb-4">
                      Đặc điểm:
                    </h4>
                    <p className="text-gray-200 text-sm">
                      Từng/đang chiếm tỷ trọng lớn toàn cầu.
                    </p>
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
                <div className="flex items-center space-x-6 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-2xl">1️⃣</span>
                  </div>
                  <Building className="w-10 h-10 text-red-400 mr-4" />
                  <h3 className="text-2xl font-bold text-red-400">
                    CNTB độc quyền nhà nước kiểu mới
                  </h3>
                </div>

                <div className="space-y-6">
                  <p className="text-gray-200 text-base leading-relaxed">
                    Nhà nước{" "}
                    <strong className="text-red-300">
                      kết hợp lợi ích với tập đoàn tư bản lớn
                    </strong>
                    , tham gia sở hữu và quản lý trực tiếp các lĩnh vực chiến
                    lược.
                  </p>
                  <p className="text-gray-200 text-base leading-relaxed">
                    Sử dụng{" "}
                    <strong className="text-red-300">
                      chính sách công nghiệp, trợ cấp, chính sách thuế
                    </strong>{" "}
                    để bảo hộ độc quyền.
                  </p>
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard delay={600}>
              <div
                data-card-id="card-vi-du-doc-quyen-nha-nuoc"
                className={`group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-10 border transition-all duration-500 cursor-pointer ${
                  focusedCard === "card-vi-du-doc-quyen-nha-nuoc"
                    ? "border-orange-400 transform scale-105 shadow-2xl shadow-orange-500/50 ring-2 ring-orange-400/50"
                    : "border-white/20 hover:border-orange-400/50 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25"
                }`}
                onMouseEnter={() =>
                  setFocusedCard("card-vi-du-doc-quyen-nha-nuoc")
                }
                onMouseLeave={() => setFocusedCard(null)}
              >
                <div className="flex items-center space-x-6 mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-2xl">2️⃣</span>
                  </div>
                  <Globe2 className="w-10 h-10 text-orange-400 mr-4" />
                  <h3 className="text-2xl font-bold text-orange-400">
                    Ví dụ thực tế
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="bg-orange-500/10 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/30">
                      <h4 className="text-lg font-bold text-orange-300 mb-4 flex items-center">
                        🇺🇸 Mỹ:
                      </h4>
                      <p className="text-gray-200 text-sm leading-relaxed">
                        Chính phủ bảo hộ các tập đoàn Big Tech, ngân hàng{" "}
                        <strong className="text-orange-300">
                          "quá lớn để sụp đổ"
                        </strong>
                        .
                      </p>
                    </div>

                    <div className="bg-orange-500/10 backdrop-blur-sm rounded-2xl p-6 border border-orange-500/30">
                      <h4 className="text-lg font-bold text-orange-300 mb-4 flex items-center">
                        🇷🇺 Nga, 🇸🇦 Ả Rập Saudi, 🇦🇪 UAE:
                      </h4>
                      <p className="text-gray-200 text-sm leading-relaxed">
                        Nhà nước sở hữu tài nguyên{" "}
                        <strong className="text-orange-300">
                          dầu mỏ, khí đốt
                        </strong>
                        .
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-red-500/10 backdrop-blur-sm rounded-2xl p-6 border border-red-500/30">
                      <h4 className="text-lg font-bold text-red-300 mb-4 flex items-center">
                        🇨🇳 Trung Quốc:
                      </h4>
                      <ul className="space-y-2 text-gray-200 text-sm">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>
                            <strong className="text-red-300">
                              Doanh nghiệp nhà nước (SOEs)
                            </strong>{" "}
                            chiếm lĩnh các ngành chiến lược.
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>
                            Công ty công nghệ như{" "}
                            <strong className="text-red-300">
                              Tencent, Alibaba
                            </strong>{" "}
                            bị yêu cầu chia sẻ quyền kiểm soát dữ liệu.
                          </span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>
                            Chính sách{" "}
                            <strong className="text-red-300">
                              "Made in China 2025"
                            </strong>{" "}
                            hỗ trợ phát triển ngành công nghệ cao.
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-green-500/10 backdrop-blur-sm rounded-2xl p-6 border border-green-500/30">
                      <h4 className="text-lg font-bold text-green-300 mb-4 flex items-center">
                        🇻🇳 Việt Nam:
                      </h4>
                      <p className="text-gray-200 text-sm leading-relaxed">
                        Nhà nước độc quyền với{" "}
                        <strong className="text-green-300">
                          20 mặt hàng, dịch vụ quan trọng
                        </strong>{" "}
                        (điện, xăng dầu, vàng miếng, xổ số...).
                      </p>
                    </div>
                  </div>
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
                    <span className="text-white font-bold text-2xl">1️⃣</span>
                  </div>
                  <CheckCircle2 className="w-10 h-10 text-green-400" />
                  <h3 className="text-2xl font-bold text-green-400">
                    Vai trò tích cực
                  </h3>
                </div>

                <div className="space-y-6">
                  <p className="text-gray-200 text-base leading-relaxed">
                    <strong className="text-green-300">
                      Thúc đẩy lực lượng sản xuất, kỹ thuật công nghệ, xã hội
                      hóa sản xuất.
                    </strong>
                  </p>
                  <p className="text-gray-200 text-base leading-relaxed">
                    <strong className="text-green-300">
                      Tạo khối lượng của cải xã hội lớn
                    </strong>
                    , phát triển thương mại, kết nối toàn cầu.
                  </p>
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
                    <span className="text-white font-bold text-2xl">2️⃣</span>
                  </div>
                  <span className="text-4xl">⚠️</span>
                  <h3 className="text-2xl font-bold text-red-400">
                    Mặt hạn chế
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      icon: "📉",
                      text: "Khủng hoảng chu kỳ, bóc lột giá trị thặng dư",
                    },
                    { icon: "⚖️", text: "Tăng bất bình đẳng xã hội" },
                    {
                      icon: "🎭",
                      text: "Độc quyền dẫn đến hạn chế cạnh tranh, thao túng giá cả",
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
                icon: "✅",
                title: "Biểu hiện mới của độc quyền và độc quyền nhà nước",
                desc: "cho thấy sự thích nghi của CNTB trong thời đại toàn cầu hóa và cách mạng công nghiệp 4.0.",
                color: "blue",
              },
              {
                icon: "✅",
                title: "Độc quyền không triệt tiêu cạnh tranh",
                desc: "nhưng sử dụng cạnh tranh để củng cố vị thế.",
                color: "purple",
              },
              {
                icon: "✅",
                title: "CNTB vẫn có vai trò phát triển lực lượng sản xuất",
                desc: "nhưng tạo ra bất công xã hội.",
                color: "green",
              },
              {
                icon: "✅",
                title: "Nghiên cứu nội dung này",
                desc: "giúp hiểu bản chất của CNTB hiện đại và định hướng phát triển bền vững.",
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
