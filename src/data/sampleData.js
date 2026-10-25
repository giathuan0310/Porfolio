/**
 * ==============================================================================
 * 📁 FILE DỮ LIỆU MẪU PORTFOLIO (SAMPLE DATA)
 * ==============================================================================
 * Bạn chỉ cần chỉnh sửa các thông tin trong file này. 
 * Website sẽ tự động cập nhật ngay lập tức mà không cần chỉnh sửa code giao diện!
 * ==============================================================================
 */

export const portfolioData = {
  // --- 1. THÔNG TIN CÁ NHÂN & HERO BANNER ---
  personal: {
    // Tên hiển thị trên thanh điều hướng và lời chào
    name: "LƯƠNG HOÀNG GIA THUẬN",

    // Logo ở góc trên bên trái header (có thể đổi thành tên bạn hoặc thương hiệu)
    logoText: "Za_Thuwn",

    // Chức danh nghề nghiệp chính (hiển thị chữ lớn)
    role: "SOFTWARE ENGINEER & FULL-STACK DEVELOPER",

    // Giới thiệu ngắn ở đầu trang (Bio)
    bio: "Xin chào mọi người, mình là Lương Hoàng Gia Thuận, đến từ TP. Hồ Chí Minh, Việt Nam. Hiện tại, mình là một lập trình viên web app đang theo đuổi đam mê phát triển các hệ thống ứng dụng hiện đại và hữu ích.",

    // Đường dẫn ảnh đại diện (có thể dùng link ảnh online hoặc đường dẫn file nội bộ)
    avatarUrl: "public/avatar.png",

    // Trạng thái làm việc hiển thị trên ảnh đại diện
    workStatus: {
      text: "Open for Work",
      techStack: "Java / JavaScript"
    },

    // Thẻ chứng nhận / điểm mạnh (huy hiệu góc dưới avatar)
    badge: {
      title: "Junior Verified",
      subtitle: "Clean Architecture"
    },

    // Cửa sổ code mô phỏng góc trên avatar
    floatingCode: {
      filename: "app.tsx",
      tag: "<Developer />",
      status: 'status="Online"',
      focus: 'focus="Scale"'
    },

    // Link tải file CV (PDF) - có thể để link Google Drive hoặc file trong public/cv.pdf
    cvUrl: "public/JavaDeveloper_LUONG_HOANG_GIA_THUAN.pdf",

    // Email nhận liên hệ
    email: "luonggiathuan2019.gr@gmail.com",

    // Số điện thoại (nếu muốn)
    phone: "0942.192.110"
  },

  // --- 2. CÁC CHỈ SỐ THỐNG KÊ (STATS BADGES) ---
  stats: {
    experienceYears: "1+",          // Số năm kinh nghiệm
    completedProjects: "10+",        // Số dự án đã hoàn thành
    clientSatisfaction: "100%"       // Tỷ lệ hài lòng của khách hàng
  },

  // --- 3. LIÊN KẾT MẠNG XÃ HỘI (SOCIAL LINKS) ---
  socialLinks: {
    github: "https://github.com/giathuan0310",
    facebook: "https://www.facebook.com/gia.thuan.302008/",
    linkedin: "https://www.linkedin.com/in/gia-thuận-lương-3407b12b4",
    instagram: "https://www.instagram.com/lhgthuan0/"
  },

  // --- 4. GIỚI THIỆU & KỸ NĂNG (ABOUT & SKILLS) ---
  about: {
    title: "Về tôi & Kỹ năng",
    description: "Tôi đã phải lòng lập trình và ít nhất tôi đã học được một vài điều, tôi nghĩ vậy… 🤷‍♂️"
  },

  skills: [
    {
      id: "frontend",
      categoryNumber: "01 // UI & Client",
      title: "Frontend",
      accentColor: "cyan", // 'cyan' | 'emerald' | 'blue'
      description: "Xây dựng giao diện mượt mà, chuẩn Reactive, chuẩn Responsive và tốc độ tải tối ưu.",
      technologies: [
        { name: "React.js", icon: "⚛️", color: "text-cyan-300" },
        { name: "TypeScript", icon: "🔹", color: "text-blue-400" },
        { name: "React Native", icon: "📱", color: "text-blue-400" },
        { name: "Vue.js", icon: "🟢", color: "text-emerald-400" },
        { name: "HTML5 / CSS3", icon: "🌐", color: "text-orange-400" },
        { name: "Tailwind CSS", icon: "🎨", color: "text-sky-400" },
        { name: "PrimeFace", icon: "🔵", color: "text-cyan-300" },
        { name: "Bootstrap", icon: "🟦", color: "text-blue-400" }
      ]
    },
    {
      id: "backend",
      categoryNumber: "02 // Server & Core",
      title: "Backend",
      accentColor: "emerald",
      description: "Thiết kế RESTful & GraphQL APIs, microservices phân tán và xử lý nghiệp vụ chịu tải.",
      technologies: [
        { name: "Node.js", icon: "🟩", color: "text-green-400" },
        { name: "Java", icon: "☕", color: "text-yellow-300" },
        { name: "PostgreSQL", icon: "🐘", color: "text-blue-400" },
        { name: "MongoDB", icon: "🍃", color: "text-emerald-300" },
        { name: "MySQL", icon: "🔹", color: "text-blue-400" },
        { name: "MariaDB", icon: "🔹", color: "text-blue-400" },
        { name: "GraphQL", icon: "💜", color: "text-cyan-300" }
      ]
    },
    {
      id: "devops",
      categoryNumber: "03 // Cloud & Ops",
      title: "DevOps & Tools",
      accentColor: "cyan",
      description: "Tự động hóa chu trình CI/CD, Container hóa ứng dụng và giám sát hạ tầng điện toán đám mây.",
      technologies: [
        { name: "Gitlab / Github", icon: "🐙", color: "text-orange-400" },
        { name: "Docker", icon: "🐳", color: "text-blue-300" },
        { name: "AWS Cloud", icon: "☁️", color: "text-amber-300" },
        { name: "Redis", icon: "⚡", color: "text-purple-300" },
        { name: "Jira", icon: "🐧", color: "text-blue-400" },

      ]
    }
  ],

  // --- 5. CÁC DỰ ÁN NỔI BẬT (FEATURED PROJECTS) ---
  projects: [
    {
      id: 5,
      title: "Digital Banking & Payment Processing System",
      category: "Digital Banking & Payment Processing",
      tags: ["Java 21", "Spring Boot 3", "Spring Security", "PostgreSQL", "Redis", "Apache Kafka", "React & TypeScript", "Docker", "Testcontainers"],
      desc: "Hệ thống mô phỏng ngân hàng số và xử lý thanh toán, hỗ trợ quản lý khách hàng, tài khoản, chuyển khoản nội bộ, hạch toán kép, thanh toán ngoài giả lập, thông báo bất đồng bộ, đối soát giao dịch và audit vận hành.",
      stars: "1k+",
      image: "public/Digital.jpg",
      features: [
        "Xác thực JWT, refresh token, thu hồi phiên và phân quyền RBAC cho CUSTOMER, STAFF, ADMIN",
        "Quản lý khách hàng, tài khoản thanh toán, số dư khả dụng và danh sách người thụ hưởng",
        "Xử lý chuyển khoản nội bộ trong một transaction atomic, chống overspending và request trùng bằng idempotency key",
        "Hạch toán kép với journal entry, các dòng Nợ/Có cân bằng và bút toán đảo khi cần điều chỉnh",
        "Phát sự kiện sau commit bằng Transactional Outbox và xử lý thông báo bất đồng bộ qua Apache Kafka",
        "Ứng dụng Redis cho cache-aside, rate limiting, OTP mô phỏng và quản lý session",
        "Mô phỏng cổng thanh toán ngoài với timeout, retry an toàn và các trạng thái PENDING, SUCCESS, FAILED, UNKNOWN",
        "Đối soát giao dịch, phát hiện chênh lệch, lưu audit log và cung cấp dashboard giám sát vận hành"
      ],
      githubUrl: "",
      backendGithubUrl: "",
      liveDemoUrl: ""
    },

    {
      id: 1,
      title: "Testifyed - Quiz & Examination Management System",
      category: "Education & Examination Platform",
      tags: ["React JS", "Node.js", "Express JS", "MongoDB", "Cloudinary", "JWT", "Bcrypt", "Gemini API"],
      desc: "Hệ thống quản lý ngân hàng câu hỏi, tạo đề thi, tổ chức thi trực tuyến và phân tích kết quả dành cho giảng viên, sinh viên và quản trị viên.",
      stars: "30k+",
      previewType: "education",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      metrics: "Tự động sinh đề theo ma trận, lưu bài theo thời gian thực và chấm điểm tự động",
      features: [
        "CRUD ngân hàng câu hỏi và nhập hàng loạt từ Excel hoặc Word",
        "Phân loại câu hỏi theo môn học, chương, chủ đề và mức độ nhận thức",
        "Thiết lập kỳ thi linh hoạt theo thời lượng, số lượng câu hỏi và ma trận đề",
        "Tự động sinh đề ngẫu nhiên theo ma trận và xáo trộn riêng cho từng sinh viên",
        "Giao diện làm bài có đồng hồ đếm ngược và tự động lưu tiến độ theo thời gian thực",
        "Khôi phục phiên làm bài khi mất kết nối hoặc đóng trình duyệt",
        "Chấm điểm tự động, xuất báo cáo Excel và trực quan hóa phân bố điểm, tỷ lệ hoàn thành",
        "Quản lý tài khoản giảng viên, sinh viên và nhập danh sách từ Excel",
        "Giới hạn một tài khoản trên mỗi thiết bị và cấu hình dải IP được phép dự thi"
      ],
      githubUrl: "https://github.com/giathuan0310/FE_Testifyed.git",
      backendGithubUrl: "https://github.com/giathuan0310/BE_Testifyed.git",
      liveDemoUrl: "https://testifyed.lhgt.id.vn/"
    },
    {
      id: 2,
      title: "Chat App HHDTT - Realtime Messaging Platform",
      category: "Full-Stack Web",
      tags: ["React JS", "Node.js(Express)", "MongoDB", "React Native", "Socket.io", "AWS S3,", "Cloudinary", "JWT"],
      desc: "ChatHHDTT là hệ thống trò chuyện được phát triển trên 2 nền tảng web và mobile cho phép người dùng có thể trò chuyện với nhau theo thời gian thực.",
      stars: "10.4k+",
      previewType: "ecommerce",
      image: "public/ChatHHDTT.jpg",
      metrics: "Tốc độ tải trang 0.6s | 50k+ người dùng tích cực",
      features: [
        "Hỗ trợ 2 nền tảng (Web & Mobile)",
        "Trò chuyện Real-Time qua WebSockets",
        "Upload ảnh và Video lên đến 100MB",
        "Cơ chế xác thực & phân quyền an toàn JWT",
        "Lưu trữ dữ liệu trên AWS S3",
        "React Native cho iOS & Android",
        "Thiết kế giao diện hiện đại, thân thiện với người dùng",
        "Tối ưu hiệu năng cho ứng dụng chat",
        "Backend Express tốc độ cao",
        "Cơ sở dữ liệu MongoDB",
      ],
      githubUrl: "https://github.com/giathuan0310/FE_CHAT_HHDTT.git",
      backendGithubUrl: "https://github.com/giathuan0310/BE_CHAT_HHDTT.git",
      liveDemoUrl: "https://youtu.be/cRGXNnpGr34"
    },
    {
      id: 3,
      title: "Book Store - E-Commerce Website",
      category: "E-Commerce & Management System",
      tags: ["Java", "Spring Boot", "React JS", "MySQL", "JWT", "Spring Security", "Spring Data JPA"],
      desc: "Nền tảng nhà sách trực tuyến full-stack cho phép khách hàng tìm kiếm, xem chi tiết và mua sách; đồng thời cung cấp hệ thống quản trị người dùng, sách, thể loại và đơn hàng.",
      stars: "5k+",
      previewType: "ecommerce",
      image: "public/BookStore.jpg",
      metrics: "Hoàn thiện luồng mua sắm từ tìm kiếm sản phẩm đến thanh toán và tạo hóa đơn",
      features: [
        "Duyệt, tìm kiếm và lọc sách theo tên hoặc thể loại",
        "Hiển thị thông tin chi tiết cho từng sản phẩm",
        "Quản lý giỏ hàng và danh sách yêu thích",
        "Đăng ký, đăng nhập và khôi phục mật khẩu",
        "Cập nhật hồ sơ cá nhân và quản lý tài khoản an toàn",
        "Hoàn tất mua hàng và tự động tạo hóa đơn",
        "CRUD sách, thể loại, người dùng và đơn hàng dành cho quản trị viên",
        "Xác thực và phân quyền bằng Spring Security kết hợp JWT"
      ],
      githubUrl: "https://github.com/giathuan0310/webbansach_frontend.git",
      backendGithubUrl: "https://github.com/giathuan0310/webbansach_backend.git",
      liveDemoUrl: "https://youtu.be/B34Ev1mykh8"
    },
    {
      id: 4,
      title: "T-Five WatchShop",
      category: "E-Commerce & Microservices",
      tags: ["React JS", "Tailwind CSS", "Node.js", "Express JS", "MongoDB", "Docker", "JWT", "MoMo API", "Gemini API", "Cloudinary", "Bcrypt"],
      desc: "Website thương mại điện tử bán đồng hồ được xây dựng theo kiến trúc microservices, hỗ trợ đầy đủ hành trình mua sắm, thanh toán trực tuyến và các công cụ quản trị hệ thống.",
      stars: "6k+",
      previewType: "ecommerce",
      image: "public/WatchShop.jpg",
      role: "Full-stack Developer",
      metrics: "Kiến trúc microservices, thanh toán trực tuyến MoMo, chatbot hỗ trợ khách hàng và quản lý sản phẩm",
      features: [
        "Lọc sản phẩm theo danh mục và xem thông tin chi tiết đồng hồ",
        "Đánh giá, nhận xét sản phẩm và quản lý giỏ hàng",
        "Thanh toán trực tuyến thông qua ví điện tử MoMo",
        "Quản lý sản phẩm, thương hiệu, người dùng và hóa đơn",
        "Chatbot hỗ trợ khách hàng tích hợp Gemini API",
        "Xác thực và phân quyền người dùng bằng JWT",
        "Lưu trữ và quản lý hình ảnh sản phẩm với Cloudinary",
        "Triển khai các dịch vụ độc lập bằng Docker theo kiến trúc microservices"
      ],
      githubUrl: "https://github.com/nhuttanqst/fe-t-five-watch-online",
      backendGithubUrl: "https://github.com/giathuan0310/be-website-watch-online",
      liveDemoUrl: ""
    }

  ],

  // --- 6. PHẦN LIÊN HỆ (CONTACT SECTION) ---
  contact: {
    title: "Liên hệ",
    description: "Bạn có một dự án mới cần hiện thực hóa hoặc muốn tuyển dụng kỹ sư phần mềm cho tổ chức của mình? Hãy để lại tin nhắn hoặc kết nối trực tiếp qua các kênh sau.",
    emailLabel: "Email chính thức"
  },

  // --- 7. FOOTER BẢN QUYỀN ---
  footer: {
    systemStatus: "All Systems Operational"
  }
};

export default portfolioData;
