import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Building,
  TrendingUp,
  Globe2,
  Factory,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  DollarSign,
  Users2,
  Zap,
  Target,
  Brain,
  BookOpen,
  Lightbulb,
} from "lucide-react";

interface Section {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  bgGradient: string;
}

const sections: Section[] = [
  {
    id: "intro",
    title: "Sơ lược về độc quyền",
    icon: <BookOpen className="w-8 h-8" />,
    color: "text-amber-400",
    bgGradient: "from-amber-900/20 to-orange-900/20",
  },
  {
    id: "new-expressions",
    title: "Biểu hiện mới của độc quyền",
    icon: <TrendingUp className="w-8 h-8" />,
    color: "text-blue-400",
    bgGradient: "from-blue-900/20 to-indigo-900/20",
  },
  {
    id: "state-monopoly",
    title: "Độc quyền nhà nước",
    icon: <Building className="w-8 h-8" />,
    color: "text-red-400",
    bgGradient: "from-red-900/20 to-pink-900/20",
  },
  {
    id: "historical-role",
    title: "Vai trò lịch sử",
    icon: <Globe2 className="w-8 h-8" />,
    color: "text-green-400",
    bgGradient: "from-green-900/20 to-emerald-900/20",
  },
  {
    id: "conclusion",
    title: "Kết luận",
    icon: <CheckCircle2 className="w-8 h-8" />,
    color: "text-purple-400",
    bgGradient: "from-purple-900/20 to-violet-900/20",
  },
];

function App() {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const currentSection = Math.round(scrollPosition / windowHeight);
      setActiveSection(Math.min(currentSection, sections.length));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    const targetY = index * window.innerHeight;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  const nextSection = () => {
    if (activeSection < sections.length) {
      scrollToSection(activeSection + 1);
    }
  };

  return (
    <div className="bg-slate-900 text-white overflow-x-hidden">
      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 space-y-4">
        <div
          className={`w-4 h-4 rounded-full border-2 cursor-pointer transition-all duration-300 ${
            activeSection === 0
              ? "bg-white border-white"
              : "border-white/50 hover:border-white"
          }`}
          onClick={() => scrollToSection(0)}
        />
        {sections.map((section, index) => (
          <div
            key={section.id}
            className={`w-4 h-4 rounded-full border-2 cursor-pointer transition-all duration-300 ${
              activeSection === index + 1
                ? "bg-white border-white"
                : "border-white/50 hover:border-white"
            }`}
            onClick={() => scrollToSection(index + 1)}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10" />
        <div className="relative z-10 text-center max-w-6xl mx-auto px-8">
          <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-2xl">
            <Brain className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Biểu hiện mới
            </span>
            <br />
            <span className="text-white">của độc quyền và</span>
            <br />
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              độc quyền nhà nước
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-4xl mx-auto">
            trong điều kiện ngày nay
          </p>
          <div className="text-lg text-gray-400 mb-12">
            Nghiên cứu triết học về sự phát triển của chủ nghĩa tư bản độc quyền
          </div>

          <button
            onClick={nextSection}
            className="group flex items-center space-x-3 mx-auto px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
          >
            <span className="text-lg">Bắt đầu</span>
            <ChevronDown className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Section I: Sơ lược về độc quyền */}
      <section className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-slate-900 to-gray-900 py-16">
        <div
          className={`absolute inset-0 bg-gradient-to-r ${sections[0].bgGradient}`}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <div
              className={`w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl`}
            >
              {sections[0].icon}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              I. Sơ lược về độc quyền và độc quyền nhà nước
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mx-auto" />
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Khái niệm độc quyền */}
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <Factory className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-amber-400">
                  Khái niệm độc quyền
                </h3>
              </div>

              <p className="text-lg md:text-xl text-gray-200 mb-6 leading-relaxed">
                <strong className="text-amber-300">Độc quyền TBCN:</strong> Sự
                thống trị của các tổ chức độc quyền trong nền kinh tế, hình
                thành từ tập trung sản xuất và tập trung tư bản cao độ.
              </p>

              <div className="bg-amber-500/10 rounded-2xl p-6 border border-amber-500/20">
                <h4 className="text-lg md:text-xl font-bold text-amber-300 mb-4">
                  Theo Lênin, CNTB độc quyền có 5 đặc điểm:
                </h4>
                <div className="space-y-3">
                  {[
                    "Tập trung sản xuất và tư bản cao độ",
                    "Hình thành tư bản tài chính (kết hợp tư bản ngân hàng và công nghiệp)",
                    "Xuất khẩu tư bản",
                    "Phân chia thị trường thế giới",
                    "Hình thành tài phiệt tài chính",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-sm font-bold">
                          {index + 1}
                        </span>
                      </div>
                      <span className="text-gray-200 text-base md:text-lg">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Khái niệm độc quyền nhà nước */}
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Building className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-green-400">
                  Độc quyền nhà nước
                </h3>
              </div>

              <p className="text-lg md:text-xl text-gray-200 mb-6 leading-relaxed">
                <strong className="text-green-300">
                  CNTB độc quyền nhà nước:
                </strong>{" "}
                Sự kết hợp sức mạnh của các tổ chức độc quyền tư nhân với nhà
                nước tư sản thành một thiết chế thống nhất, phục vụ lợi ích giai
                cấp tư sản.
              </p>

              <div className="bg-green-500/10 rounded-2xl p-6 border border-green-500/20 mb-6">
                <p className="text-gray-200 text-base md:text-lg leading-relaxed">
                  Nhà nước trở thành{" "}
                  <strong className="text-green-300">"tư bản tập thể"</strong>,
                  tham gia sâu vào sản xuất, chi phối nền kinh tế thông qua luật
                  pháp, thuế, quản lý doanh nghiệp, bảo hộ các tập đoàn tư bản.
                </p>
              </div>

              <div className="bg-yellow-500/10 rounded-2xl p-6 border border-yellow-500/20">
                <div className="flex items-center space-x-3 mb-4">
                  <Zap className="w-6 h-6 text-yellow-400" />
                  <h4 className="text-lg md:text-xl font-bold text-yellow-300">
                    Mối quan hệ cạnh tranh – độc quyền
                  </h4>
                </div>
                <p className="text-gray-200 text-base md:text-lg leading-relaxed">
                  Trong giai đoạn CNTB độc quyền, cạnh tranh không bị triệt tiêu
                  hoàn toàn mà tồn tại dưới sự chi phối của độc quyền. Độc quyền
                  sử dụng cạnh tranh như công cụ loại bỏ đối thủ, củng cố vị thế
                  trên thị trường.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section II: Biểu hiện mới của độc quyền */}
      <section className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-slate-900 to-gray-900 py-16">
        <div
          className={`absolute inset-0 bg-gradient-to-r ${sections[1].bgGradient}`}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-xl">
              {sections[1].icon}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              II. Biểu hiện mới của độc quyền trong điều kiện ngày nay
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto" />
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Tích tụ và tập trung tư bản */}
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-purple-400">
                  Tích tụ và tập trung tư bản
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <ArrowRight className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-200 text-base md:text-lg">
                    Xuất hiện các tập đoàn xuyên quốc gia (TNCs), hoạt động đa
                    ngành, đa quốc gia
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <ArrowRight className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-200 text-base md:text-lg">
                    Liên kết chiều ngang, chiều dọc, các tập đoàn công nghệ
                    (Apple, Samsung)
                  </p>
                </div>
                <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/20">
                  <p className="font-semibold text-purple-300 mb-3">
                    Các hình thức tổ chức mới:
                  </p>
                  <div className="space-y-2">
                    <p className="text-gray-200 text-sm md:text-base">
                      <strong className="text-purple-300">Concern:</strong> Độc
                      quyền đa ngành, nhiều xí nghiệp khác nhau
                    </p>
                    <p className="text-gray-200 text-sm md:text-base">
                      <strong className="text-purple-300">Conglomerate:</strong>{" "}
                      Hợp nhất nhiều công ty nhỏ, không liên quan trực tiếp
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Độc quyền kỹ thuật số */}
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-blue-400">
                  Độc quyền kỹ thuật số
                </h3>
              </div>
              <p className="text-gray-200 text-base md:text-lg mb-4">
                Gắn liền với cách mạng công nghiệp 4.0, AI, Big Data, Blockchain
              </p>
              <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/20 mb-4">
                <p className="font-semibold text-blue-300 mb-3">
                  Các tập đoàn công nghệ lớn kiểm soát:
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-200 text-sm md:text-base">
                      Dữ liệu người dùng
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-200 text-sm md:text-base">
                      Hệ sinh thái sản phẩm khép kín
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-200 text-sm md:text-base">
                      Tạo rào cản gia nhập nhờ hiệu ứng mạng
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Google", "Amazon", "Apple", "Meta", "Microsoft"].map(
                  (company) => (
                    <span
                      key={company}
                      className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30"
                    >
                      {company}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Độc quyền tài chính toàn cầu */}
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-green-400">
                  Độc quyền tài chính toàn cầu
                </h3>
              </div>
              <div className="space-y-4">
                <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/20">
                  <p className="text-gray-200 mb-2 text-sm md:text-base">
                    <strong className="text-green-300">
                      BlackRock, Vanguard, State Street
                    </strong>{" "}
                    nắm 20,000 tỷ USD tài sản
                  </p>
                  <p className="text-gray-300 text-sm">
                    Kiểm soát cổ phần tại hàng loạt công ty lớn
                  </p>
                </div>
                <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/20">
                  <p className="text-red-300 font-semibold text-sm md:text-base">
                    "Quá lớn để sụp đổ" - được nhà nước bảo hộ
                  </p>
                </div>
              </div>
            </div>

            {/* Độc quyền ngành truyền thống */}
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-orange-400">
                  Độc quyền ngành truyền thống
                </h3>
              </div>
              <div className="space-y-3">
                <div className="bg-orange-500/10 rounded-lg p-3 border border-orange-500/20">
                  <p className="text-gray-200 text-sm md:text-base">
                    <strong className="text-orange-300">Dược:</strong> Pfizer,
                    Johnson & Johnson, Roche
                  </p>
                </div>
                <div className="bg-orange-500/10 rounded-lg p-3 border border-orange-500/20">
                  <p className="text-gray-200 text-sm md:text-base">
                    <strong className="text-orange-300">Năng lượng:</strong>{" "}
                    ExxonMobil, BP, Shell, Chevron
                  </p>
                </div>
                <div className="bg-orange-500/10 rounded-lg p-3 border border-orange-500/20">
                  <p className="text-gray-200 text-sm md:text-base">
                    <strong className="text-orange-300">Khác:</strong> Luxottica
                    (kính), YKK (khóa kéo), De Beers (kim cương)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section III: Độc quyền nhà nước */}
      <section className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-slate-900 to-gray-900 py-16">
        <div
          className={`absolute inset-0 bg-gradient-to-r ${sections[2].bgGradient}`}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl">
              {sections[2].icon}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              III. Biểu hiện mới của độc quyền nhà nước
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mx-auto" />
          </div>

          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <h3 className="text-2xl md:text-3xl font-bold text-red-400 mb-6 text-center">
                CNTB độc quyền nhà nước kiểu mới
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
                  Nhà nước kết hợp lợi ích với tập đoàn tư bản lớn, tham gia sở
                  hữu và quản lý trực tiếp các lĩnh vực chiến lược.
                </p>
                <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
                  Sử dụng chính sách công nghiệp, trợ cấp, chính sách thuế để
                  bảo hộ độc quyền.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl">🇺🇸</span>
                  <h4 className="text-xl md:text-2xl font-bold text-blue-400">
                    Mỹ
                  </h4>
                </div>
                <p className="text-gray-200 text-base md:text-lg leading-relaxed">
                  Chính phủ bảo hộ các tập đoàn Big Tech, ngân hàng "quá lớn để
                  sụp đổ"
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl">🇨🇳</span>
                  <h4 className="text-xl md:text-2xl font-bold text-red-400">
                    Trung Quốc
                  </h4>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-200 text-sm md:text-base">
                      Doanh nghiệp nhà nước (SOEs) chiếm lĩnh các ngành chiến
                      lược
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-200 text-sm md:text-base">
                      Tencent, Alibaba bị yêu cầu chia sẻ quyền kiểm soát dữ
                      liệu
                    </span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-200 text-sm md:text-base">
                      "Made in China 2025" hỗ trợ công nghệ cao
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl">🇻🇳</span>
                  <h4 className="text-xl md:text-2xl font-bold text-green-400">
                    Việt Nam
                  </h4>
                </div>
                <p className="text-gray-200 text-base md:text-lg leading-relaxed">
                  Nhà nước độc quyền với 20 mặt hàng, dịch vụ quan trọng (điện,
                  xăng dầu, vàng miếng, xổ số...)
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl">🇷🇺</span>
                  <h4 className="text-xl md:text-2xl font-bold text-purple-400">
                    Nga
                  </h4>
                </div>
                <p className="text-gray-200 text-base md:text-lg leading-relaxed">
                  Nhà nước sở hữu tài nguyên dầu mỏ, khí đốt thông qua Gazprom,
                  Rosneft
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl">🇸🇦</span>
                  <h4 className="text-xl md:text-2xl font-bold text-yellow-400">
                    Ả Rập Saudi
                  </h4>
                </div>
                <p className="text-gray-200 text-base md:text-lg leading-relaxed">
                  Saudi Aramco - công ty dầu mỏ lớn nhất thế giới thuộc sở hữu
                  nhà nước
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl">🇦🇪</span>
                  <h4 className="text-xl md:text-2xl font-bold text-teal-400">
                    UAE
                  </h4>
                </div>
                <p className="text-gray-200 text-base md:text-lg leading-relaxed">
                  Nhà nước kiểm soát các ngành dầu khí, hàng không, viễn thông
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section IV: Vai trò lịch sử */}
      <section className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-slate-900 to-gray-900 py-16">
        <div
          className={`absolute inset-0 bg-gradient-to-r ${sections[3].bgGradient}`}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-xl">
              {sections[3].icon}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              IV. Vai trò lịch sử của chủ nghĩa tư bản
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto" />
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-green-400">
                  Vai trò tích cực
                </h3>
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle2 className="w-8 h-8 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-200 text-lg md:text-xl">
                    Thúc đẩy lực lượng sản xuất, kỹ thuật công nghệ
                  </span>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle2 className="w-8 h-8 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-200 text-lg md:text-xl">
                    Xã hội hóa sản xuất
                  </span>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle2 className="w-8 h-8 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-200 text-lg md:text-xl">
                    Tạo khối lượng của cải xã hội lớn
                  </span>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle2 className="w-8 h-8 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-200 text-lg md:text-xl">
                    Phát triển thương mại, kết nối toàn cầu
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">✕</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-red-400">
                  Mặt hạn chế
                </h3>
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <span className="text-white text-lg">✕</span>
                  </div>
                  <span className="text-gray-200 text-lg md:text-xl">
                    Khủng hoảng chu kỳ
                  </span>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <span className="text-white text-lg">✕</span>
                  </div>
                  <span className="text-gray-200 text-lg md:text-xl">
                    Bóc lột giá trị thặng dư
                  </span>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <span className="text-white text-lg">✕</span>
                  </div>
                  <span className="text-gray-200 text-lg md:text-xl">
                    Tăng bất bình đẳng xã hội
                  </span>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <span className="text-white text-lg">✕</span>
                  </div>
                  <span className="text-gray-200 text-lg md:text-xl">
                    Hạn chế cạnh tranh, thao túng giá cả
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section V: Kết luận */}
      <section className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-slate-900 to-gray-900 py-16">
        <div
          className={`absolute inset-0 bg-gradient-to-r ${sections[4].bgGradient}`}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-8">
          <div className="text-center mb-12">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-purple-500 to-violet-500 rounded-2xl flex items-center justify-center shadow-xl">
              {sections[4].icon}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">V. Kết luận</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-violet-500 rounded-full mx-auto" />
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-6 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <CheckCircle2 className="w-10 h-10 text-green-400 mt-2 flex-shrink-0" />
              <p className="text-gray-100 text-xl md:text-2xl leading-relaxed">
                Biểu hiện mới của độc quyền và độc quyền nhà nước cho thấy sự
                thích nghi của CNTB trong thời đại toàn cầu hóa và cách mạng
                công nghiệp 4.0.
              </p>
            </div>
            <div className="flex items-start space-x-6 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <CheckCircle2 className="w-10 h-10 text-green-400 mt-2 flex-shrink-0" />
              <p className="text-gray-100 text-xl md:text-2xl leading-relaxed">
                Độc quyền không triệt tiêu cạnh tranh nhưng sử dụng cạnh tranh
                để củng cố vị thế.
              </p>
            </div>
            <div className="flex items-start space-x-6 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <CheckCircle2 className="w-10 h-10 text-green-400 mt-2 flex-shrink-0" />
              <p className="text-gray-100 text-xl md:text-2xl leading-relaxed">
                CNTB vẫn có vai trò phát triển lực lượng sản xuất nhưng tạo ra
                bất công xã hội.
              </p>
            </div>
            <div className="flex items-start space-x-6 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
              <CheckCircle2 className="w-10 h-10 text-green-400 mt-2 flex-shrink-0" />
              <p className="text-gray-100 text-xl md:text-2xl leading-relaxed">
                Nghiên cứu nội dung này giúp hiểu bản chất của CNTB hiện đại và
                định hướng phát triển bền vững.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-4 px-10 py-6 bg-gradient-to-r from-purple-500 to-violet-500 rounded-2xl shadow-2xl">
              <Brain className="w-8 h-8 text-white" />
              <span className="text-white font-bold text-2xl">
                Cảm ơn bạn đã theo dõi
              </span>
            </div>
            <p className="text-gray-400 text-lg mt-6">
              © 2025 Nghiên cứu Triết học Kinh tế Chính trị
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
