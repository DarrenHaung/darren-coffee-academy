import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Video,
  FileText,
  Menu,
  Coffee,
  ZoomIn,
  ZoomOut,
  Maximize2, Award, Compass, BookOpen, Layers, 
  Clock, Thermometer, Droplet, Download, 
  ExternalLink, ChevronRight, ChevronLeft, CheckCircle2, 
  X, Sparkles, Filter, Eye, Play, Pause, RotateCcw
} from 'lucide-react';
import './App.css';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [lightboxState, setLightboxState] = useState({
    isOpen: false,
    items: [],
    currentIndex: 0,
    unitTitle: ''
  });
  const [isZoomed, setIsZoomed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openLightbox = (items, index = 0, unitTitle = '') => {
    let list = [];
    if (Array.isArray(items)) {
      list = items;
    } else if (items && typeof items === 'object') {
      list = [items];
    }
    setLightboxState({
      isOpen: true,
      items: list,
      currentIndex: index,
      unitTitle: unitTitle || list[index]?.badge || ''
    });
    setIsZoomed(false);
  };

  const closeLightbox = () => {
    setLightboxState(prev => ({ ...prev, isOpen: false }));
    setIsZoomed(false);
  };

  const nextLightboxImage = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setLightboxState(prev => {
      if (prev.items.length <= 1) return prev;
      const nextIdx = (prev.currentIndex + 1) % prev.items.length;
      setIsZoomed(false);
      return { ...prev, currentIndex: nextIdx };
    });
  };

  const prevLightboxImage = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    setLightboxState(prev => {
      if (prev.items.length <= 1) return prev;
      const prevIdx = (prev.currentIndex - 1 + prev.items.length) % prev.items.length;
      setIsZoomed(false);
      return { ...prev, currentIndex: prevIdx };
    });
  };

  const navItems = [
    { id: 'home', label: '首頁與理念', icon: Compass },
    { id: 'courses', label: '手沖課程', icon: BookOpen },
    { id: 'sensory', label: '感官風味庫', icon: Award },
    { id: 'science', label: '沖煮科學', icon: Filter },
    { id: 'origins', label: '產區與品種', icon: Layers },
    { id: 'calculator', label: '沖煮計算機', icon: Coffee },
    { id: 'videos', label: '影音專區', icon: Video },
    { id: 'downloads', label: '下載專區', icon: Download },
  ];
  const [bookingModal, setBookingModal] = useState(false);
  const [bookedSuccess, setBookedSuccess] = useState(false);
  const [bookingData, setBookingData] = useState({ name: '', phone: '', people: '1', date: '' });

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxState.isOpen) return;
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        nextLightboxImage();
      } else if (e.key === 'ArrowLeft') {
        prevLightboxImage();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxState.isOpen, lightboxState.items.length, lightboxState.currentIndex]);

  // Calculator State
  const [grams, setGrams] = useState(10);
  const [ratio, setRatio] = useState(18);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [activeVideoIdx, setActiveVideoIdx] = useState(0);

  // Dripper Selection
  const [activeDripper, setActiveDripper] = useState('v60');

  // Sensory Hub Selection
  const [sensoryTab, setSensoryTab] = useState('scaa');

  // Timer Effect
  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookedSuccess(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    setTimeout(() => {
      setBookedSuccess(false);
      setBookingModal(false);
    }, 2500);
  };

  const waterTotal = Math.round(grams * ratio);
  const bloomWater = Math.round(grams * 2.5);
  const secondPour = Math.round(waterTotal * 0.55);
  const finalPour = waterTotal;

  const dripperDetails = {
    v60: {
      name: 'Hario V60 錐形濾杯',
      badge: '流速最快・明亮俐落',
      flow: '★★★★★ (最快)',
      structure: '60° 錐角、高深螺旋肋骨延伸至大圓單孔',
      flavor: '酸甜感強烈、花果香氣清晰突出、口感輕盈乾淨',
      method: 'の 字中心由內向外均勻注水，可採較快水流節奏',
      img: '/coffee_assets/04_沖煮科學與器材/四大主流濾杯官方圖/dripper_hario_v60.jpg'
    },
    kono: {
      name: 'Kono 名門流錐形濾杯',
      badge: '中速流速・極致甘醇',
      flow: '★★★☆☆ (中速偏慢)',
      structure: '錐形設計，肋骨僅分佈於濾杯下半段，上半部與濾紙高度貼合真空密封',
      flavor: '甜感濃郁、醇厚度 (Body) 飽滿紮實、餘韻綿長不絕',
      method: '適合前段「點滴滴漏法」萃取高濃度芳香物質，中後段細水柱注水',
      img: '/coffee_assets/04_沖煮科學與器材/四大主流濾杯官方圖/dripper_kono_meimon.jpg'
    },
    kalita: {
      name: 'Kalita / 三洋 扇形濾杯',
      badge: '穩定流速・經典平衡',
      flow: '★★☆☆☆ (受控浸潤)',
      structure: '梯形平底設計、三小孔或單孔、垂直導流溝槽',
      flavor: '風味均衡圓潤、酸甜苦融合度高、萃取容錯率極佳',
      method: '多次分段注水，保持粉層充分浸潤與排氣',
      img: '/coffee_assets/04_沖煮科學與器材/四大主流濾杯官方圖/dripper_kalita_102.jpg'
    },
    wave: {
      name: 'Kalita Wave 波浪蛋糕濾杯',
      badge: '均勻萃取・高容錯率',
      flow: '★★★★☆ (均勻穩定)',
      structure: '平底三孔設計，搭配 20 折波浪專用濾紙，使粉層與杯壁分離隔熱',
      flavor: '萃取極為均勻、甜感突出、口感純淨無雜味',
      method: '中心定點或小幅繞圈給水，水流均勻平穩穿透粉層',
      img: '/coffee_assets/04_沖煮科學與器材/四大主流濾杯官方圖/dripper_kalita_wave.jpg'
    }
  };


  const scaaAromaItems = [
    {
      title: 'SCAA 36味之一：酵素作用 (花果花香)',
      badge: '1-9 號香氣瓶',
      desc: '淺焙至中焙咖啡中源於咖啡果實原生風味分子（酵素轉化）。',
      file: '/coffee_assets/03_感官與風味庫/SCAA_36味聞香瓶/scaa_36_aromas_01_酵素作用_花果花香.jpg'
    },
    {
      title: 'SCAA 36味之二：焦糖化與梅納反應 (堅果甜香)',
      badge: '10-18 號香氣瓶',
      desc: '烘焙過程中碳水化合物與胺基酸熱反應形成的焦糖、烤堅果、巧克力香。',
      file: '/coffee_assets/03_感官與風味庫/SCAA_36味聞香瓶/scaa_36_aromas_02_焦糖化反應_堅果甜香.jpg'
    },
    {
      title: 'SCAA 36味之三：乾餾反應 (香料樹脂)',
      badge: '19-27 號香氣瓶',
      desc: '高溫烘焙下木質素裂解形成的香料、丁香、松木與煙燻氣息。',
      file: '/coffee_assets/03_感官與風味庫/SCAA_36味聞香瓶/scaa_36_aromas_03_乾餾反應_香料樹脂.jpg'
    },
    {
      title: 'SCAA 36味之四：芳香瑕疵與化學物',
      badge: '28-36 號香氣瓶',
      desc: '泥土、皮革、橡膠、藥水等非精品咖啡之瑕疵風味。',
      file: '/coffee_assets/03_感官與風味庫/SCAA_36味聞香瓶/scaa_36_aromas_04_芳香瑕疵與化學物.jpg'
    },
    {
      title: '咖啡香氣與味覺感知對應表',
      badge: '味覺與嗅覺連動',
      desc: '鼻前嗅覺、鼻後嗅覺與舌頭味覺連動圖解。',
      file: '/coffee_assets/03_感官與風味庫/aroma_taste_mapping_咖啡香氣與味覺對應表.jpg'
    }
  ];

  const goldCupImages = [
    { title: '濃度與萃取率基準', file: '/coffee_assets/04_沖煮科學與器材/金杯萃取與濃度/gold_cup_extraction_01_濃度與萃取率基準.jpg' },
    { title: '金杯控制圖解', file: '/coffee_assets/04_沖煮科學與器材/金杯萃取與濃度/gold_cup_extraction_02_控制圖解.jpg' },
    { title: '萃取率計算模型', file: '/coffee_assets/04_沖煮科學與器材/金杯萃取與濃度/gold_cup_extraction_03_萃取率計算.jpg' },
    { title: '金杯準則目標落點', file: '/coffee_assets/04_沖煮科學與器材/金杯萃取與濃度/gold_cup_extraction_04_金杯準則落點.jpg' }
  ];

  const microscopeImages = [
    { title: '細胞壁孔隙結構', file: '/coffee_assets/04_沖煮科學與器材/咖啡顯微鏡微觀/microscope_bean_cell_01_細胞壁孔隙.jpg' },
    { title: '孔徑毛細現象', file: '/coffee_assets/04_沖煮科學與器材/咖啡顯微鏡微觀/microscope_bean_cell_02_孔徑毛細現象.jpg' },
    { title: '研磨顆粒橫截面', file: '/coffee_assets/04_沖煮科學與器材/咖啡顯微鏡微觀/microscope_bean_cell_04_顆粒橫截面.jpg' },
    { title: '內部通道放大觀測', file: '/coffee_assets/04_沖煮科學與器材/咖啡顯微鏡微觀/microscope_bean_cell_05_通道放大.jpg' },
    { title: '微細咖啡粉末特寫', file: '/coffee_assets/04_沖煮科學與器材/咖啡顯微鏡微觀/microscope_bean_cell_06_咖啡粉末特寫.jpg' }
  ];

  const brewingVariableSections = [
    {
      category: '磨豆機與咖啡顆粒粗細關係',
      icon: '⚙️',
      items: [
        { title: '磨豆機刀盤與顆粒分佈', file: '/coffee_assets/04_沖煮科學與器材/沖煮變因與器材/磨豆機與咖啡顆粒粗細關係/grinder_01_磨豆機刀盤與顆粒分佈.jpg' },
        { title: '研磨均勻度解析', file: '/coffee_assets/04_沖煮科學與器材/沖煮變因與器材/磨豆機與咖啡顆粒粗細關係/grinder_02_研磨均勻度解析.jpg' }
      ]
    },
    {
      category: '濾紙的秘密',
      icon: '📄',
      items: [
        { title: '濾紙的小秘密', file: '/coffee_assets/04_沖煮科學與器材/沖煮變因與器材/濾紙的秘密/濾紙的小秘密.jpg' }
      ]
    },
    {
      category: '咖啡與水溫的關係',
      icon: '🌡️',
      items: [
        { title: '咖啡與水溫的關係', file: '/coffee_assets/04_沖煮科學與器材/沖煮變因與器材/咖啡與水溫的關係/咖啡與水溫的關係.jpg' }
      ]
    },
    {
      category: '烘培對咖啡沖煮的影響',
      icon: '🔥',
      items: [
        { title: '烘焙度與細胞膨脹', file: '/coffee_assets/04_沖煮科學與器材/沖煮變因與器材/烘培對咖啡沖煮的影響/roast_degree_01_烘焙度與細胞膨脹.jpg' },
        { title: '烘焙萃取變化', file: '/coffee_assets/04_沖煮科學與器材/沖煮變因與器材/烘培對咖啡沖煮的影響/roast_degree_02_烘焙萃取變化.jpg' },
        { title: '烘焙失重率', file: '/coffee_assets/04_沖煮科學與器材/沖煮變因與器材/烘培對咖啡沖煮的影響/roast_degree_03_烘焙失重率.jpg' }
      ]
    },
    {
      category: '沖煮咖啡的水',
      icon: '💧',
      items: [
        { title: '水質硬度與萃取關係', file: '/coffee_assets/04_沖煮科學與器材/沖煮變因與器材/沖煮咖啡的水/water_quality_01_水質硬度與萃取關係.jpg' },
        { title: '水質實驗說明', file: '/coffee_assets/04_沖煮科學與器材/沖煮變因與器材/沖煮咖啡的水/water_quality_02_水質實驗說明.jpg' }
      ]
    },
    {
      category: '咖啡的泡沫',
      icon: '🫧',
      items: [
        { title: '沖煮悶蒸泡沫觀察', file: '/coffee_assets/04_沖煮科學與器材/沖煮變因與器材/咖啡的泡沫/bloom_degas_01_沖煮悶蒸泡沫觀察.jpg' },
        { title: '排氣狀態觀察', file: '/coffee_assets/04_沖煮科學與器材/沖煮變因與器材/咖啡的泡沫/bloom_degas_02_排氣狀態觀察.jpg' }
      ]
    }
  ];

  const originItems = [
    {
      title: '世界咖啡產區分佈地圖 (The Coffee Belt)',
      badge: '全球咖啡帶',
      desc: '非洲、中南美洲、亞洲各大精品咖啡產國緯度與地形分佈。',
      file: '/coffee_assets/05_產區與品種圖鑑/世界產區地圖/map_world_coffee_origins_世界咖啡產區分佈圖.jpg'
    },
    {
      title: '全球主要咖啡生產國萬國旗',
      badge: '產國圖鑑',
      desc: '全球主要咖啡出口國國旗與產地識別速查。',
      file: '/coffee_assets/05_產區與品種圖鑑/世界產區地圖/flags_coffee_countries_咖啡產國萬國旗.jpg'
    },
    {
      title: '阿拉比卡品種演化樹狀圖 (CI版本)',
      badge: '品種系譜',
      desc: 'Typica、Bourbon、Geisha、Caturra、SL28 等精品品種演化樹。',
      file: '/coffee_assets/05_產區與品種圖鑑/咖啡品種系譜/tree_coffee_varieties_阿拉比卡品種樹狀圖_CI.jpg'
    },
    {
      title: '經典咖啡調飲品項解構圖 (Pop Chart)',
      badge: '經典配方圖解',
      desc: '濃縮 Espresso、美式、卡布奇諾、拿鐵與摩卡之液體比例解析。',
      file: '/coffee_assets/05_產區與品種圖鑑/咖啡種類圖解/chart_coffee_drinks_經典咖啡品項大圖解.jpg'
    }
  ];


  const videoList = [
    {
      title: '如何沖出酸甜均衡的手沖咖啡',
      tag: '核心萃取心法',
      duration: '精華講義',
      desc: '掌握咖啡三大主軸：酸甜苦平衡且不帶澀韻的注水心法與流速控制。',
      file: '/coffee_assets/07_影音資料/如何沖出酸甜均衡的手沖咖啡.mp4'
    },
    {
      title: '手沖咖啡不苦澀的關鍵：過濾層',
      tag: '粉層結構學',
      duration: '萃取力學',
      desc: '深入剖析手沖咖啡過濾層的建立歷程，預防粉層塌陷與微細粉末堵塞。',
      file: '/coffee_assets/07_影音資料/手沖咖啡不苦澀的關鍵：過濾層.mp4'
    },
    {
      title: '手沖咖啡如何用四大變因控制萃取',
      tag: '四大沖煮變因',
      duration: '參數掌控',
      desc: '研磨顆粒、水溫、粉水比例與給水時間四維度聯動調校指南。',
      file: '/coffee_assets/07_影音資料/手沖咖啡如何用四大變因控制萃取.mp4'
    },
    {
      title: '手沖壺造型背後的流體力學',
      tag: '器具力學解析',
      duration: '注水器具',
      desc: '壺嘴弧度、出水管徑與落水重力衝擊對粉層翻滾擾動的實測對比。',
      file: '/coffee_assets/07_影音資料/手沖壺造型背後的流體力學.mp4'
    },
    {
      title: '換個手沖濾杯咖啡風味全變了',
      tag: '四大濾杯流速',
      duration: '濾杯對決',
      desc: 'V60、KONO、Kalita 與蛋糕濾杯在同參數下的流速與感官風味盲測對比。',
      file: '/coffee_assets/07_影音資料/換個手沖濾杯咖啡風味全變了.mp4'
    }
  ];

  const downloadList = [
    {
      title: '手沖咖啡萃取藍圖 (Extraction Blueprint)',
      badge: '大倫核心講義',
      size: '9.7 MB',
      format: 'PDF 高畫質教材',
      desc: '大倫咖啡講堂手沖核心架構完整教案：涵蓋三段式給水法、良好過濾層建立與萃取參數配置。',
      file: '/coffee_assets/08_下載專區/手沖咖啡萃取藍圖.pdf'
    },
    {
      title: 'SCAA 官方杯測風味輪 (Official Vector PDF)',
      badge: '國際標準圖鑑',
      size: '677 KB',
      format: 'PDF 向量原版',
      desc: 'SCAA 與世界咖啡研究組織 (WCR) 聯合制定之世界標準杯測風味輪，可無損向量放大列印。',
      file: '/coffee_assets/08_下載專區/scaa_flavor_wheel_official_vector.pdf'
    },
    {
      title: 'SCAA 風味輪科學研究背景白皮書 (Scientific Background)',
      badge: '感官學術論文',
      size: '32.7 MB',
      format: 'PDF 完整學術報告',
      desc: '全球咖啡感官詞庫標準化研究報告：包含感知圖譜建構、感官描述詞彙標準化實驗與數據分析。',
      file: '/coffee_assets/08_下載專區/scaa_flavor_wheel_scientific_background_2016.pdf'
    },
    {
      title: 'Counter Culture 咖啡瑕疵風味輪 (Faults Wheel)',
      badge: '瑕疵辨識手冊',
      size: '3.3 MB',
      format: 'PDF 11x17 大幅規格',
      desc: '反文化咖啡專用瑕疵氣味識別圖解：欠萃草腥味、過萃乾澀味、陳豆木質味與生豆發酵瑕疵速查。',
      file: '/coffee_assets/08_下載專區/counter_culture_faults_wheel_11x17.pdf'
    }
  ];

  return (
    <div className="app-wrapper">
      {/* 導覽列 Navbar */}
      <header className="navbar">
        <div className="container nav-container">
          <div className="brand-badge" onClick={() => setCurrentTab('home')}>
            <img 
              src="/coffee_assets/01_品牌與識別/brand_logo_大倫咖啡.jpg" 
              alt="大倫咖啡 Logo" 
              className="brand-logo-img" 
            />
            <div className="brand-text">
              <h1>大倫咖啡講堂 <Sparkles size={16} color="var(--accent-gold)" /></h1>
              <p>DARREN COFFEE ACADEMY</p>
            </div>
          </div>

          {/* 桌面版導覽列 */}
          <nav className="nav-links desktop-nav">
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <button 
                  key={item.id}
                  id={`nav-${item.id}`} 
                  className={`nav-item ${currentTab === item.id ? 'active' : ''}`}
                  onClick={() => setCurrentTab(item.id)}
                >
                  <Icon size={16} /> {item.label}
                </button>
              );
            })}
          </nav>

          <button 
            id="btn-book-top" 
            className="nav-cta-btn desktop-cta" 
            onClick={() => setBookingModal(true)}
          >
            預約手沖課
          </button>

          {/* 手機版漢堡切換按鈕 */}
          <button
            id="btn-hamburger"
            className="hamburger-btn"
            aria-label="開啟選單"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      {/* 手機版優雅深色毛玻璃抽屜選單 (Mobile Drawer) */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-drawer glass-panel" onClick={e => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <div className="brand-badge" onClick={() => { setCurrentTab('home'); setMobileMenuOpen(false); }}>
                <img 
                  src="/coffee_assets/01_品牌與識別/brand_logo_大倫咖啡.jpg" 
                  alt="大倫咖啡 Logo" 
                  className="brand-logo-img" 
                />
                <div className="brand-text">
                  <h1>大倫咖啡講堂</h1>
                  <p>選單導覽</p>
                </div>
              </div>
              <button 
                id="btn-close-drawer"
                className="mobile-drawer-close" 
                onClick={() => setMobileMenuOpen(false)}
                aria-label="關閉選單"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="mobile-nav-list">
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-${item.id}`}
                    className={`mobile-nav-item ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      setCurrentTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                  >
                    <div className="mobile-nav-item-left">
                      <div className="mobile-nav-icon-box">
                        <Icon size={18} />
                      </div>
                      <span className="mobile-nav-label">{item.label}</span>
                    </div>
                    <ChevronRight size={18} className="mobile-nav-arrow" />
                  </button>
                );
              })}
            </nav>

            <div className="mobile-drawer-footer">
              <button 
                id="btn-mobile-book"
                className="nav-cta-btn" 
                style={{ width: '100%', padding: '14px', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  setBookingModal(true);
                }}
              >
                <Sparkles size={18} /> 立即預約手沖體驗課
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 模組一：首頁與核心理念 */}
      {currentTab === 'home' && (
        <main className="container animate-fade-in">
          <section className="hero-section">
            <div className="hero-tag">
              <Sparkles size={14} /> 大倫老師 (Darren) 專業手沖咖啡系統化講堂
            </div>
            <h2 className="hero-title">一杯好咖啡<br/>酸甜苦均衡且不帶澀韻</h2>
            <p className="hero-subtitle">
              透過手沖器具的幾何奧秘、注水動力學與感官味覺校正，帶您掌握水與咖啡粉的完美對話。
              從初學者到專業咖啡師，探索每一杯單品咖啡的極致可能。
            </p>

            <div className="hero-grid">
              <div className="hero-card glass-panel" onClick={() => setCurrentTab('courses')}>
                <div className="hero-card-icon"><BookOpen size={24} /></div>
                <h3>手沖咖啡體驗班</h3>
                <p>2 小時小班實戰指導，掌握 90°C、1:18 黃金粉水比與の字注水核心。單堂 NT$ 800 元。</p>
              </div>

              <div className="hero-card glass-panel" onClick={() => setCurrentTab('sensory')}>
                <div className="hero-card-icon"><Award size={24} /></div>
                <h3>SCAA 官方風味輪</h3>
                <p>收錄 2016 SCAA 繁中官方最新風味輪、反文化咖啡瑕疵味輪與 36 味聞香瓶解析。</p>
              </div>

              <div className="hero-card glass-panel" onClick={() => setCurrentTab('science')}>
                <div className="hero-card-icon"><Filter size={24} /></div>
                <h3>金杯萃取與顯微鏡</h3>
                <p>TDS 濃度與萃取率座標圖解，高倍電子顯微鏡下觀測咖啡豆多孔細胞壁與毛細吸收通道。</p>
              </div>
            </div>
          </section>

          {/* 兩大核心鐵則 */}
          <section className="section-header">
            <span className="section-tag">CORE PHILOSOPHY</span>
            <h3 className="section-title">手沖咖啡兩大核心鐵則</h3>
            <p className="section-desc">大倫老師多年淬煉的注水原則，也是沖煮不失敗的根本核心：</p>
          </section>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', margin: '30px 0 60px' }}>
            <div className="glass-panel" style={{ padding: '32px' }}>
              <div style={{ color: 'var(--accent-gold)', fontSize: '2rem', fontWeight: '800', marginBottom: '12px' }}>01</div>
              <h4 style={{ fontSize: '1.3rem', marginBottom: '12px' }}>給水量不可大於咖啡顆粒吸收極限</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                過大或過急的水流會使水柱直接衝破粉層形成旁路通道，導致咖啡萃取不均勻並產生單薄的水感。唯有穩定的供水與合適的流速，才能讓顆粒均勻釋放芳香物質。
              </p>
            </div>

            <div className="glass-panel" style={{ padding: '32px' }}>
              <div style={{ color: 'var(--accent-gold)', fontSize: '2rem', fontWeight: '800', marginBottom: '12px' }}>02</div>
              <h4 style={{ fontSize: '1.3rem', marginBottom: '12px' }}>良好過濾層的建立與維持</h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                當濾杯中心水位下降即將成「凹狀」時，為最佳續水時機點。逐步漸進墊高水位，維持良好過濾層厚度，避免咖啡粉因吃水變重後沉積於濾杯底形成死層堵塞。
              </p>
            </div>
          </div>
        </main>
      )}

      {/* 模組二：手沖課程專區 */}
      {currentTab === 'courses' && (
        <main className="container animate-fade-in" style={{ padding: '30px 0 60px' }}>
          <div className="section-header">
            <span className="section-tag">HAND DRIP ACADEMY</span>
            <h2 className="section-title">大倫咖啡講堂 專業課程</h2>
            <p className="section-desc">小班精緻教學，從味覺校正開始，親自手把手引導您掌握一杯好咖啡。</p>
          </div>

          <div className="glass-panel" style={{ padding: '36px', maxWidth: '880px', margin: '0 auto 40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '20px', marginBottom: '24px' }}>
              <div>
                <span style={{ background: 'var(--accent-amber)', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '700' }}>熱門招生中</span>
                <h3 style={{ fontSize: '1.8rem', marginTop: '10px' }}>手沖咖啡體驗班</h3>
                <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>講師：大倫 (Darren) ｜ 2-3 人小班制 (最多 5 位)</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--accent-gold)' }}>NT$ 800</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}> / 單堂 2 小時</span>
              </div>
            </div>

            <h4 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--accent-gold-light)' }}>課程大綱與學習重點：</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '32px' }}>
              {[
                '定義何謂好咖啡：酸、甜、苦平衡且不帶澀味',
                '味覺校正品飲實驗：比較三種不同手法風味表現',
                '手沖沖煮示範與分解：90°C、10g粉、180ml萃取',
                '變因實測：改變水溫、粗細與水柱強弱的影響',
                '四大濾杯流速比較：V60、Kono、扇形、波浪',
                '手沖壺操作心法：握壺、提壺、手腕繞圈節奏'
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px' }}>
                  <CheckCircle2 size={18} color="var(--accent-gold)" />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{item}</span>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center' }}>
              <button 
                id="btn-book-course-card"
                className="nav-cta-btn" 
                style={{ padding: '14px 40px', fontSize: '1.05rem' }}
                onClick={() => setBookingModal(true)}
              >
                立即報名預約體驗班
              </button>
            </div>
          </div>

          {/* 濾杯流速切換器 */}
          <div className="section-header">
            <span className="section-tag">EQUIPMENT LAB</span>
            <h3 className="section-title">四大主流濾杯設計與流速對比</h3>
            <p className="section-desc">不同肋骨深度與幾何角度，造就截然不同的流速與萃取厚度：</p>
          </div>

          <div className="dripper-tabs">
            {Object.keys(dripperDetails).map(key => (
              <button 
                key={key}
                id={`dripper-tab-${key}`}
                className={`dripper-tab ${activeDripper === key ? 'active' : ''}`}
                onClick={() => setActiveDripper(key)}
              >
                {dripperDetails[key].name}
              </button>
            ))}
          </div>

          <div className="glass-panel" style={{ padding: '32px', maxWidth: '880px', margin: '0 auto' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px', alignItems: 'center' }}>
              <div>
                <span style={{ background: 'rgba(229, 169, 93, 0.15)', color: 'var(--accent-gold)', padding: '4px 12px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: '600' }}>
                  {dripperDetails[activeDripper].badge}
                </span>
                <h4 style={{ fontSize: '1.6rem', margin: '14px 0 10px' }}>{dripperDetails[activeDripper].name}</h4>
                <div style={{ marginBottom: '16px' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>相對下水流速：</p>
                  <p style={{ color: 'var(--accent-gold-light)', fontWeight: '700' }}>{dripperDetails[activeDripper].flow}</p>
                </div>
                <div style={{ marginBottom: '14px' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>結構特點：</p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{dripperDetails[activeDripper].structure}</p>
                </div>
                <div style={{ marginBottom: '14px' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>風味表現：</p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{dripperDetails[activeDripper].flavor}</p>
                </div>
                <div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>建議注水手法：</p>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{dripperDetails[activeDripper].method}</p>
                </div>
              </div>
              <div className="dripper-img-showcase" onClick={() => openLightbox([{ title: dripperDetails[activeDripper].name, file: dripperDetails[activeDripper].img, desc: dripperDetails[activeDripper].structure }], 0, '四大主流濾杯設計') }>
                <img 
                  src={dripperDetails[activeDripper].img} 
                  alt={dripperDetails[activeDripper].name}
                  className="dripper-display-img"
                  title="點擊放大檢視濾杯細節"
                />
                <span className="dripper-img-tip">🔍 點擊全螢幕放大</span>
              </div>
            </div>
          </div>
        </main>
      )}


      {/* 模組四：感官與風味庫 */}
      {currentTab === 'sensory' && (
        <main className="container animate-fade-in" style={{ padding: '30px 0 60px' }}>
          <div className="section-header">
            <span className="section-tag">SENSORY & FLAVORS</span>
            <h2 className="section-title">精品咖啡感官與風味庫</h2>
            <p className="section-desc">收錄世界標準 SCAA 英文官方風味輪、反文化咖啡 (Counter Culture) 英文風味輪與 36 味聞香瓶解析。</p>
          </div>

          <div className="dripper-tabs">
            <button 
              id="sensory-tab-scaa"
              className={`dripper-tab ${sensoryTab === 'scaa' ? 'active' : ''}`}
              onClick={() => setSensoryTab('scaa')}
            >
              SCAA 官方風味輪 (English)
            </button>
            <button 
              id="sensory-tab-cc"
              className={`dripper-tab ${sensoryTab === 'cc' ? 'active' : ''}`}
              onClick={() => setSensoryTab('cc')}
            >
              反文化咖啡 (Counter Culture English)
            </button>
            <button 
              id="sensory-tab-36"
              className={`dripper-tab ${sensoryTab === '36' ? 'active' : ''}`}
              onClick={() => setSensoryTab('36')}
            >
              SCAA 36味聞香瓶與味覺對應
            </button>
          </div>

          {/* SCAA 官方英文版風味輪 - 直接大圖展示 */}
          {sensoryTab === 'scaa' && (
            <div className="glass-panel" style={{ padding: '28px', maxWidth: '960px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '14px' }}>
                <div>
                  <span style={{ background: 'var(--accent-amber)', color: '#fff', padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '700' }}>
                    SCAA & WCR Official (English)
                  </span>
                  <h3 style={{ fontSize: '1.6rem', marginTop: '8px' }}>SCAA Coffee Taster's Flavor Wheel</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                    SCAA 與世界咖啡研究組織 (WCR) 聯合制定之世界標準杯測風味輪（官方英文高清原版）。
                  </p>
                </div>
                <button 
                  id="btn-scaa-fullscreen"
                  className="nav-cta-btn" 
                  style={{ padding: '9px 20px', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                  onClick={() => openLightbox([{
                    title: "SCAA Coffee Taster's Flavor Wheel (Official English)",
                    badge: "Official High-Res",
                    desc: "Official SCAA and World Coffee Research flavor vocabulary sensory wheel.",
                    file: "/coffee_assets/03_感官與風味庫/SCAA官方風味輪/scaa_flavor_wheel_2016_英文原版.jpg"
                  }], 0, 'SCAA 官方風味輪')}
                >
                  <Eye size={16} /> 全螢幕放大檢視
                </button>
              </div>

              <div 
                style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-subtle)', background: '#100d0a', cursor: 'zoom-in', textAlign: 'center', padding: '16px' }}
                onClick={() => setLightboxAsset({
                  title: "SCAA Coffee Taster's Flavor Wheel (Official English)",
                  badge: "Official High-Res",
                  desc: "Official SCAA and World Coffee Research flavor vocabulary sensory wheel.",
                  file: "/coffee_assets/03_感官與風味庫/SCAA官方風味輪/scaa_flavor_wheel_2016_英文原版.jpg"
                })}
              >
                <img 
                  src="/coffee_assets/03_感官與風味庫/SCAA官方風味輪/scaa_flavor_wheel_2016_英文原版.jpg" 
                  alt="SCAA Coffee Taster's Flavor Wheel" 
                  style={{ width: '100%', maxHeight: '760px', objectFit: 'contain' }}
                />
              </div>
            </div>
          )}

          {/* 反文化咖啡英文版風味輪 - 直接大圖展示 */}
          {sensoryTab === 'cc' && (
            <div className="glass-panel" style={{ padding: '28px', maxWidth: '960px', margin: '0 auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '14px' }}>
                <div>
                  <span style={{ background: 'var(--accent-amber)', color: '#fff', padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '700' }}>
                    Counter Culture Coffee (English)
                  </span>
                  <h3 style={{ fontSize: '1.6rem', marginTop: '8px' }}>Counter Culture Coffee Flavor Wheel</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                    Counter Culture Coffee 獨創現代感官風味光譜（官方英文高解析原版）。
                  </p>
                </div>
                <button 
                  id="btn-cc-fullscreen"
                  className="nav-cta-btn" 
                  style={{ padding: '9px 20px', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                  onClick={() => openLightbox([{
                    title: "Counter Culture Coffee Flavor Wheel (English)",
                    badge: "Official High-Res",
                    desc: "Counter Culture Coffee standard flavor spectrum in high definition.",
                    file: "/coffee_assets/03_感官與風味庫/反文化咖啡風味輪/cc_flavor_wheel_english_original.png"
                  }], 0, '反文化咖啡風味輪')}
                >
                  <Eye size={16} /> 全螢幕放大檢視
                </button>
              </div>

              <div 
                style={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-subtle)', background: '#100d0a', cursor: 'zoom-in', textAlign: 'center', padding: '16px' }}
                onClick={() => setLightboxAsset({
                  title: "Counter Culture Coffee Flavor Wheel (English)",
                  badge: "Official High-Res",
                  desc: "Counter Culture Coffee standard flavor spectrum in high definition.",
                  file: "/coffee_assets/03_感官與風味庫/反文化咖啡風味輪/cc_flavor_wheel_english_original.png"
                })}
              >
                <img 
                  src="/coffee_assets/03_感官與風味庫/反文化咖啡風味輪/cc_flavor_wheel_english_original.png" 
                  alt="Counter Culture Coffee Flavor Wheel" 
                  style={{ width: '100%', maxHeight: '760px', objectFit: 'contain' }}
                />
              </div>
            </div>
          )}

          {/* SCAA 36味聞香瓶與味覺對應 */}
          {sensoryTab === '36' && (
            <div className="gallery-grid">
              {scaaAromaItems.map((item, idx) => (
                <div key={idx} className="gallery-card" onClick={() => openLightbox(scaaAromaItems, idx, 'SCAA 36味聞香瓶')}>
                  <div className="gallery-card-thumb">
                    <span className="badge">{item.badge}</span>
                    <img src={item.file} alt={item.title} />
                  </div>
                  <div className="gallery-card-info">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                    <span style={{ color: 'var(--accent-gold)', fontSize: '0.85rem', marginTop: '10px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Eye size={14} /> 點擊放大檢視
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      )}

      {/* 模組五：沖煮科學與顯微鏡 */}
      {currentTab === 'science' && (
        <main className="container animate-fade-in" style={{ padding: '30px 0 60px' }}>
          <div className="section-header">
            <span className="section-tag">EXTRACTION SCIENCE</span>
            <h2 className="section-title">沖煮科學與器材實驗室</h2>
            <p className="section-desc">包含金杯準則濃度與萃取率、電子顯微鏡下咖啡豆微觀細胞壁，以及手沖沖煮關鍵變因實務資料。</p>
          </div>

          {/* 1. 金杯萃取與濃度 (4張圖，說明濃度與萃取率，點擊看大圖) */}
          <div style={{ marginBottom: '50px' }}>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--accent-gold)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              ⚖️ 金杯萃取與濃度 (TDS & Extraction Yield)
            </h3>
            <div className="gallery-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
              {goldCupImages.map((item, idx) => (
                <div key={idx} className="gallery-card" onClick={() => openLightbox(goldCupImages, idx, '金杯萃取與濃度')}>
                  <div className="gallery-card-thumb" style={{ height: '240px' }}>
                    <img src={item.file} alt={item.title} />
                  </div>
                  <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>{item.title}</h4>
                    <span style={{ color: 'var(--accent-gold)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Eye size={13} /> 放大
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 2. 咖啡顯微鏡微觀 (5張圖全部放上，點擊看大圖) */}
          <div style={{ marginBottom: '50px' }}>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--accent-gold)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              🔬 咖啡顯微鏡微觀 (Microscopic Structure)
            </h3>
            <div className="gallery-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))' }}>
              {microscopeImages.map((item, idx) => (
                <div key={idx} className="gallery-card" onClick={() => openLightbox(microscopeImages, idx, '咖啡顯微鏡微觀')}>
                  <div className="gallery-card-thumb" style={{ height: '210px' }}>
                    <img src={item.file} alt={item.title} />
                  </div>
                  <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}>{item.title}</h4>
                    <span style={{ color: 'var(--accent-gold)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Eye size={13} /> 放大
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. 沖煮變因與器材 (依照使用者資料夾分類精準呈現) */}
          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '40px' }}>
            <div className="section-header" style={{ margin: '0 0 32px' }}>
              <span className="section-tag">BREWING VARIABLES & EQUIPMENT</span>
              <h3 className="section-title">⚙️ 沖煮變因與器材分類</h3>
            </div>

            {brewingVariableSections.map((section, sIdx) => (
              <div key={sIdx} className="glass-panel" style={{ padding: '24px', marginBottom: '28px' }}>
                <h4 style={{ fontSize: '1.2rem', color: 'var(--accent-gold)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>{section.icon}</span> {section.category}
                </h4>
                <div className="gallery-grid" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${section.items.length === 1 ? '320px' : '260px'}, 1fr))`, margin: 0 }}>
                  {section.items.map((item, iIdx) => (
                    <div key={iIdx} className="gallery-card" onClick={() => openLightbox(section.items, iIdx, section.category)}>
                      <div className="gallery-card-thumb" style={{ height: '240px' }}>
                        <img src={item.file} alt={item.title} />
                      </div>
                      <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h5 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', fontWeight: '600' }}>{item.title}</h5>
                        <span style={{ color: 'var(--accent-gold)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Eye size={13} /> 放大
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* 模組六：產區與品種 */}
      {currentTab === 'origins' && (
        <main className="container animate-fade-in" style={{ padding: '30px 0 60px' }}>
          <div className="section-header">
            <span className="section-tag">COFFEE ENCYCLOPEDIA</span>
            <h2 className="section-title">世界產區與生豆品種圖鑑</h2>
            <p className="section-desc">探索南北回歸線間的全球咖啡帶、主要產國萬國旗與阿拉比卡品種基因系譜。</p>
          </div>

          <div className="gallery-grid">
            {originItems.map((item, idx) => (
              <div key={idx} className="gallery-card" onClick={() => openLightbox(originItems, idx, '世界產區與生豆品種圖鑑')}>
                <div className="gallery-card-thumb">
                  <span className="badge">{item.badge}</span>
                  <img src={item.file} alt={item.title} />
                </div>
                <div className="gallery-card-info">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

{/* 模組三：即時手沖計算機 */}
      {currentTab === 'calculator' && (
        <main className="container animate-fade-in" style={{ padding: '30px 0 60px' }}>
          <div className="section-header">
            <span className="section-tag">INTERACTIVE TOOLS</span>
            <h2 className="section-title">手沖黃金萃取計算機</h2>
            <p className="section-desc">依據大倫老師沖煮標準：90°C 水溫、刻度 3.5、三段式注水水量即時配比。</p>
          </div>

          <div className="calc-card glass-panel">
            <div className="calc-grid">
              <div className="calc-controls">
                <div className="control-group">
                  <label>咖啡粉重 (Coffee Grounds)</label>
                  <div className="preset-buttons">
                    {[10, 15, 18, 20].map(val => (
                      <button 
                        key={val} 
                        id={`btn-gram-${val}`}
                        className={`preset-btn ${grams === val ? 'active' : ''}`}
                        onClick={() => setGrams(val)}
                      >
                        {val}g {val === 10 ? '(大倫標準)' : ''}
                      </button>
                    ))}
                  </div>
                  <input 
                    type="range" 
                    min="8" 
                    max="30" 
                    value={grams} 
                    onChange={e => setGrams(Number(e.target.value))}
                    style={{ width: '100%', marginTop: '12px', accentColor: 'var(--accent-gold)' }}
                  />
                  <div style={{ textAlign: 'right', fontSize: '0.9rem', color: 'var(--accent-gold)' }}>目前設定：{grams} 克</div>
                </div>

                <div className="control-group">
                  <label>粉水比 (Ratio)</label>
                  <div className="ratio-selector">
                    {[15, 16, 18].map(r => (
                      <button 
                        key={r}
                        id={`btn-ratio-${r}`}
                        className={`preset-btn ${ratio === r ? 'active' : ''}`}
                        onClick={() => setRatio(r)}
                      >
                        1 : {r} {r === 18 ? '(建議)' : ''}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="brew-timer-box">
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>沖煮碼表計時器</span>
                  <div className="timer-digits">{formatTimer(timerSeconds)}</div>
                  <div className="timer-action-btns">
                    <button 
                      id="btn-timer-toggle"
                      className={`timer-btn ${isTimerRunning ? 'reset' : 'start'}`}
                      onClick={() => setIsTimerRunning(!isTimerRunning)}
                    >
                      {isTimerRunning ? <Pause size={14} /> : <Play size={14} />} {isTimerRunning ? '暫停' : '開始計時'}
                    </button>
                    <button 
                      id="btn-timer-reset"
                      className="timer-btn reset"
                      onClick={() => { setIsTimerRunning(false); setTimerSeconds(0); }}
                    >
                      <RotateCcw size={14} /> 重置
                    </button>
                  </div>
                  <div style={{ marginTop: '10px', fontSize: '0.8rem', color: 'var(--accent-gold-light)' }}>
                    {timerSeconds < 35 && '🔹 階段一：悶蒸預浸中 (觀察膨脹排氣)'}
                    {timerSeconds >= 35 && timerSeconds < 75 && '🔸 階段二：の字飽和注水 (水位不高過粉頂)'}
                    {timerSeconds >= 75 && timerSeconds < 135 && '🔹 階段三：漸進墊高注水 (中心凹狀給水)'}
                    {timerSeconds >= 135 && '✅ 達到萃取量，準備移開濾杯！'}
                  </div>
                </div>
              </div>

              <div className="calc-results">
                <h4 style={{ fontSize: '1.2rem', color: 'var(--accent-gold)', marginBottom: '8px' }}>三階段注水參數配置</h4>

                <div className="result-row">
                  <span className="result-label">建議水溫</span>
                  <span className="result-val">90 °C</span>
                </div>
                <div className="result-row">
                  <span className="result-label">研磨粗細</span>
                  <span className="result-val">刻度 3.5 (粗砂糖)</span>
                </div>
                <div className="result-row">
                  <span className="result-label">第一階段：悶蒸鋪水 (預浸)</span>
                  <span className="result-val">約 {bloomWater} ml</span>
                </div>
                <div className="result-row">
                  <span className="result-label">第二階段：の 字飽和注水</span>
                  <span className="result-val">累計至 {secondPour} ml</span>
                </div>
                <div className="result-row">
                  <span className="result-label">第三階段：漸進墊高注水</span>
                  <span className="result-val">累計至 {finalPour} ml</span>
                </div>
                <div className="result-row" style={{ background: 'rgba(229,169,93,0.1)', padding: '12px', borderRadius: '8px' }}>
                  <span className="result-label" style={{ fontWeight: '700', color: 'var(--text-primary)' }}>總目標萃取液重</span>
                  <span className="result-val" style={{ color: 'var(--accent-gold)', fontSize: '1.5rem' }}>{waterTotal} ml</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* 模組七：影音專區 */}
      {currentTab === 'videos' && (
        <main className="container animate-fade-in" style={{ padding: '30px 0 60px' }}>
          <div className="section-header">
            <span className="section-tag">COFFEE VIDEO MASTERCLASS</span>
            <h2 className="section-title">手沖實戰影音教學專區</h2>
            <p className="section-desc">收錄大倫老師核心精華影音：酸甜均衡心法、過濾層結構、四大變因調校、手沖壺流體力學與主流濾杯對決實測。</p>
          </div>

          {/* 影院級主播放器 */}
          <div className="video-theater-card">
            <video 
              key={videoList[activeVideoIdx].file}
              className="video-theater-player"
              controls
              playsInline
              preload="metadata"
            >
              <source src={videoList[activeVideoIdx].file} type="video/mp4" />
              您的瀏覽器不支援 HTML5 影片播放。
            </video>
            <div className="video-theater-info">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
                <span className="badge" style={{ background: 'var(--accent-gold)', color: '#120e0a', fontWeight: '700' }}>
                  {videoList[activeVideoIdx].tag}
                </span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  單元 {activeVideoIdx + 1} / {videoList.length}
                </span>
              </div>
              <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '8px' }}>
                {videoList[activeVideoIdx].title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                {videoList[activeVideoIdx].desc}
              </p>
            </div>
          </div>

          {/* 影片播放清單列表 */}
          <div className="section-header" style={{ margin: '0 0 20px', textAlign: 'left' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--accent-gold)' }}>🎬 所有影音單元清單</h3>
          </div>
          <div className="video-grid">
            {videoList.map((item, idx) => (
              <div 
                key={idx}
                className={`video-card ${activeVideoIdx === idx ? 'active' : ''}`}
                onClick={() => {
                  setActiveVideoIdx(idx);
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
              >
                <div>
                  <div className="video-card-thumb-mock">
                    <div className="video-play-badge">
                      <Play size={20} fill="#120e0a" />
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span className="badge" style={{ fontSize: '0.75rem' }}>{item.tag}</span>
                    {activeVideoIdx === idx && (
                      <span style={{ color: 'var(--accent-gold)', fontSize: '0.75rem', fontWeight: '700' }}>
                        ● 播放中
                      </span>
                    )}
                  </div>
                  <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '8px', lineHeight: '1.4' }}>
                    {item.title}
                  </h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                    {item.desc}
                  </p>
                </div>
                <div style={{ marginTop: '16px', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)', textAlign: 'right' }}>
                  <span style={{ color: 'var(--accent-gold-light)', fontSize: '0.82rem', fontWeight: '600' }}>
                    {activeVideoIdx === idx ? '正在觀看 ↑' : '點擊切換播放 ▶'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* 模組八：下載專區 */}
      {currentTab === 'downloads' && (
        <main className="container animate-fade-in" style={{ padding: '30px 0 60px' }}>
          <div className="section-header">
            <span className="section-tag">RESOURCE ARCHIVE</span>
            <h2 className="section-title">講義與原廠檔案下載專區</h2>
            <p className="section-desc">包含大倫手沖咖啡萃取藍圖核心講義、SCAA 官方向量風味輪、感官詞庫科學研究白皮書與反文化瑕疵風味輪。</p>
          </div>

          <div className="download-grid">
            {downloadList.map((item, idx) => (
              <div key={idx} className="download-card">
                <div>
                  <div className="download-card-header">
                    <div className="download-icon-box">
                      <FileText size={24} />
                    </div>
                    <span className="badge" style={{ background: 'var(--accent-amber)', color: '#fff' }}>
                      {item.badge}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '10px', lineHeight: '1.4' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    {item.desc}
                  </p>
                  <div className="download-meta-row">
                    <span className="download-meta-pill">{item.format}</span>
                    <span className="download-meta-pill">檔案大小：{item.size}</span>
                  </div>
                </div>

                <div className="download-action-btns">
                  <a 
                    href={item.file} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="download-btn-preview"
                    title="在新分頁開啟 PDF 預覽"
                  >
                    <ExternalLink size={16} /> 線上預覽
                  </a>
                  <a 
                    href={item.file} 
                    download 
                    className="download-btn-save"
                    title="直接下載 PDF 至電腦"
                  >
                    <Download size={16} /> 下載檔案
                  </a>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* 圖片 True Fullscreen Lightbox Modal */}
      {/* 圖片 True Fullscreen Lightbox Modal (支援單元內多張左右切換) */}
      {lightboxState.isOpen && (() => {
        const currentAsset = lightboxState.items[lightboxState.currentIndex] || {};
        const hasMultiple = lightboxState.items.length > 1;

        return (
          <div 
            className="fullscreen-lightbox-overlay" 
            onClick={closeLightbox}
          >
            {/* 頂部操作控制列 */}
            <div className="fullscreen-lightbox-bar" onClick={e => e.stopPropagation()}>
              <div className="lightbox-info-group">
                <span className="lightbox-badge">{lightboxState.unitTitle || currentAsset.badge || '高解析檢視'}</span>
                <h3 className="lightbox-title">{currentAsset.title}</h3>
                {hasMultiple && (
                  <span className="lightbox-counter">
                    {lightboxState.currentIndex + 1} / {lightboxState.items.length}
                  </span>
                )}
              </div>
              <div className="lightbox-btn-group">
                <button 
                  className="lightbox-action-btn"
                  onClick={() => setIsZoomed(!isZoomed)}
                  title={isZoomed ? "還原適合螢幕大小" : "放大至原始比例"}
                >
                  {isZoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
                  <span>{isZoomed ? "還原大小" : "放大細節"}</span>
                </button>
                <a 
                  href={currentAsset.file} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="lightbox-action-btn"
                  title="在新分頁開啟原始檔案"
                >
                  <Maximize2 size={18} />
                  <span>開啟原圖</span>
                </a>
                <button 
                  className="lightbox-close-round-btn"
                  onClick={closeLightbox}
                  title="關閉 (Esc)"
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* 中央大圖展現區 (支援上一張/下一張左右切換與點擊縮放) */}
            <div className="fullscreen-lightbox-viewport" onClick={e => e.stopPropagation()}>
              {hasMultiple && (
                <button 
                  className="lightbox-nav-btn prev"
                  onClick={prevLightboxImage}
                  title="上一張 (鍵盤 ←)"
                >
                  <ChevronLeft size={32} />
                </button>
              )}

              <img 
                key={currentAsset.file}
                src={currentAsset.file} 
                alt={currentAsset.title} 
                className={`fullscreen-lightbox-img ${isZoomed ? 'zoomed' : ''}`}
                onClick={() => setIsZoomed(!isZoomed)}
                title="點擊切換放大 / 縮小"
              />

              {hasMultiple && (
                <button 
                  className="lightbox-nav-btn next"
                  onClick={nextLightboxImage}
                  title="下一張 (鍵盤 →)"
                >
                  <ChevronRight size={32} />
                </button>
              )}
            </div>

            {/* 底部導覽頁籤/點點列 (多圖單元顯示) */}
            {hasMultiple && (
              <div className="lightbox-bottom-nav" onClick={e => e.stopPropagation()}>
                <div className="lightbox-dots">
                  {lightboxState.items.map((it, idx) => (
                    <button
                      key={idx}
                      className={`lightbox-dot ${idx === lightboxState.currentIndex ? 'active' : ''}`}
                      onClick={() => {
                        setLightboxState(prev => ({ ...prev, currentIndex: idx }));
                        setIsZoomed(false);
                      }}
                      title={it.title}
                    >
                      {it.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 底部說明列 (若有單張特別描述且無多圖列時呈現) */}
            {currentAsset.desc && !hasMultiple && (
              <div className="fullscreen-lightbox-caption" onClick={e => e.stopPropagation()}>
                <p>{currentAsset.desc}</p>
              </div>
            )}
          </div>
        );
      })()}


      {/* 預約課程 Modal */}
      {bookingModal && (
        <div className="modal-overlay" onClick={() => setBookingModal(false)}>
          <div className="modal-content" style={{ maxWidth: '480px' }} onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setBookingModal(false)}>
              <X size={20} />
            </button>
            <div className="modal-body" style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '8px', color: 'var(--text-primary)' }}>預約手沖咖啡體驗班</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
                單堂 NT$ 800 元 / 人 ｜ 2 小時小班實戰指導
              </p>

              {bookedSuccess ? (
                <div style={{ textAlign: 'center', padding: '30px 0' }}>
                  <CheckCircle2 size={54} color="var(--accent-gold)" style={{ margin: '0 auto 16px' }} />
                  <h4 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>預約成功！</h4>
                  <p style={{ color: 'var(--text-secondary)' }}>大倫老師將盡快與您電話聯繫確認上課時間。</p>
                </div>
              ) : (
                <form className="booking-form" onSubmit={handleBookingSubmit}>
                  <div className="form-group">
                    <label>學員姓名</label>
                    <input 
                      type="text" 
                      required 
                      className="form-input" 
                      placeholder="請輸入您的姓名"
                      value={bookingData.name}
                      onChange={e => setBookingData({ ...bookingData, name: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>聯絡電話</label>
                    <input 
                      type="tel" 
                      required 
                      className="form-input" 
                      placeholder="09xx-xxx-xxx"
                      value={bookingData.phone}
                      onChange={e => setBookingData({ ...bookingData, phone: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>報名人數</label>
                    <select 
                      className="form-input"
                      value={bookingData.people}
                      onChange={e => setBookingData({ ...bookingData, people: e.target.value })}
                    >
                      <option value="1">1 位</option>
                      <option value="2">2 位 (推薦)</option>
                      <option value="3">3 位</option>
                      <option value="4">4-5 位 (滿班包班)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>期望上課日期</label>
                    <input 
                      type="date" 
                      required 
                      className="form-input"
                      value={bookingData.date}
                      onChange={e => setBookingData({ ...bookingData, date: e.target.value })}
                    />
                  </div>
                  <button type="submit" className="form-submit-btn">
                    確認送出預約
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 頁尾 Footer */}
      <footer className="footer">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
            <img src="/coffee_assets/01_品牌與識別/brand_logo_大倫咖啡.jpg" alt="Logo" style={{ width: '28px', height: '28px', borderRadius: '50%' }} />
            <span style={{ color: 'var(--text-primary)', fontWeight: '700' }}>大倫咖啡講堂 Darren Coffee Academy</span>
          </div>
          <p>酸甜苦平衡且不帶澀韻 ｜ 給水不可大於咖啡顆粒吸收極限 ｜ 良好過濾層的建立</p>
          <p style={{ marginTop: '12px', fontSize: '0.78rem' }}>© 2026 Darren Coffee. Powered by Gemini & Antigravity Coding Agent.</p>
        </div>
      </footer>
    </div>
  );
}
