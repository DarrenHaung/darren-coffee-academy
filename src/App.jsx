import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Menu,
  Coffee, Award, Compass, BookOpen, Layers, 
  Clock, Thermometer, Droplet, Download, 
  ExternalLink, ChevronRight, CheckCircle2, 
  X, Sparkles, Filter, Eye, Play, Pause, RotateCcw
} from 'lucide-react';
import './App.css';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [lightboxAsset, setLightboxAsset] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: '首頁與理念', icon: Compass },
    { id: 'courses', label: '手沖課程', icon: BookOpen },
    { id: 'calculator', label: '沖煮計算機', icon: Coffee },
    { id: 'sensory', label: '感官風味庫', icon: Award },
    { id: 'science', label: '沖煮科學', icon: Filter },
    { id: 'origins', label: '產區與品種', icon: Layers },
    { id: 'downloads', label: '講義下載', icon: Download },
  ];
  const [bookingModal, setBookingModal] = useState(false);
  const [bookedSuccess, setBookedSuccess] = useState(false);
  const [bookingData, setBookingData] = useState({ name: '', phone: '', people: '1', date: '' });

  // Calculator State
  const [grams, setGrams] = useState(10);
  const [ratio, setRatio] = useState(18);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

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
              <div>
                <img 
                  src={dripperDetails[activeDripper].img} 
                  alt={dripperDetails[activeDripper].name}
                  style={{ width: '100%', height: '260px', objectFit: 'cover', borderRadius: '16px', border: '1px solid var(--border-subtle)' }}
                />
              </div>
            </div>
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

      {/* 模組四：感官與風味庫 */}
      {currentTab === 'sensory' && (
        <main className="container animate-fade-in" style={{ padding: '30px 0 60px' }}>
          <div className="section-header">
            <span className="section-tag">SENSORY & FLAVORS</span>
            <h2 className="section-title">精品咖啡感官與風味庫</h2>
            <p className="section-desc">收錄世界標準杯測風味輪、反文化咖啡瑕疵輪與 Le Nez du Cafe 36 味聞香瓶解析。</p>
          </div>

          <div className="dripper-tabs">
            <button 
              id="sensory-tab-scaa"
              className={`dripper-tab ${sensoryTab === 'scaa' ? 'active' : ''}`}
              onClick={() => setSensoryTab('scaa')}
            >
              SCAA 2016 官方風味輪
            </button>
            <button 
              id="sensory-tab-cc"
              className={`dripper-tab ${sensoryTab === 'cc' ? 'active' : ''}`}
              onClick={() => setSensoryTab('cc')}
            >
              反文化咖啡 (Counter Culture)
            </button>
            <button 
              id="sensory-tab-36"
              className={`dripper-tab ${sensoryTab === '36' ? 'active' : ''}`}
              onClick={() => setSensoryTab('36')}
            >
              SCAA 36味聞香瓶與味覺對應
            </button>
          </div>

          {sensoryTab === 'scaa' && (
            <div className="gallery-grid">
              {[
                {
                  title: 'SCAA 2016 官方風味輪 (繁體中文版)',
                  badge: '官方繁中版',
                  desc: 'SCAA 與 WCR 2016 最新修訂世界標準繁中風味輪，涵蓋花香、果香、甜感等 9 大維度。',
                  file: '/coffee_assets/03_感官與風味庫/SCAA官方風味輪/scaa_flavor_wheel_2016_繁體中文.png'
                },
                {
                  title: 'SCAA 2016 繁中超高清印刷版',
                  badge: '2546 x 3600 超高解析度',
                  desc: '專業杯測室大圖輸出版，細緻字型與色環光譜無失真呈現。',
                  file: '/coffee_assets/03_感官與風味庫/SCAA官方風味輪/scaa_flavor_wheel_2016_繁中高解析輸出版.jpg'
                },
                {
                  title: 'SCAA 經典風味輪 (中英雙語對照)',
                  badge: '中英文對照',
                  desc: '專業杯測師必備中英文術語詞彙對照辭典。',
                  file: '/coffee_assets/03_感官與風味庫/SCAA官方風味輪/scaa_flavor_wheel_經典中英對照.jpg'
                },
                {
                  title: 'SCAA 2016 英文原版風味輪',
                  badge: 'English Official',
                  desc: 'WCR 感官辭典科學背景對照之英文官方版。',
                  file: '/coffee_assets/03_感官與風味庫/SCAA官方風味輪/scaa_flavor_wheel_2016_英文原版.jpg'
                }
              ].map((item, idx) => (
                <div key={idx} className="gallery-card" onClick={() => setLightboxAsset(item)}>
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

          {sensoryTab === 'cc' && (
            <div className="gallery-grid">
              {[
                {
                  title: '反文化咖啡風味輪 (中英對照)',
                  badge: 'Counter Culture',
                  desc: 'Counter Culture Coffee 獨創現代感官風味光譜。',
                  file: '/coffee_assets/03_感官與風味庫/反文化咖啡風味輪/cc_flavor_wheel_反文化咖啡中英對照.jpg'
                },
                {
                  title: '反文化咖啡 瑕疵風味輪 (Faults Wheel)',
                  badge: '瑕疵味鑑識必備',
                  desc: '烘焙瑕疵、生豆變質、過度發酵等負面風味鑑識標準。',
                  file: '/coffee_assets/03_感官與風味庫/反文化咖啡風味輪/cc_faults_wheel_反文化瑕疵風味輪.jpg'
                },
                {
                  title: '反文化咖啡 新版高解析風味輪',
                  badge: '新版色彩光譜',
                  desc: '現代扁平化高對比色彩風味光譜。',
                  file: '/coffee_assets/03_感官與風味庫/反文化咖啡風味輪/cc_flavor_wheel_反文化咖啡新版.png'
                }
              ].map((item, idx) => (
                <div key={idx} className="gallery-card" onClick={() => setLightboxAsset(item)}>
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

          {sensoryTab === '36' && (
            <div className="gallery-grid">
              {[
                {
                  title: 'SCAA 36味之一：酵素反應 (花果草本)',
                  badge: '1-9 號香氣瓶',
                  desc: '花香、水果香、草本植物等生豆有機酸在烘焙初期形成的揮發性香氣。',
                  file: '/coffee_assets/03_感官與風味庫/SCAA_36味聞香瓶/scaa_36_aromas_01_酵素反應_花果草本.jpg'
                },
                {
                  title: 'SCAA 36味之二：糖化反應 (焦糖堅果)',
                  badge: '10-18 號香氣瓶',
                  desc: '焦糖化與梅納反應生成的堅果、吐司、巧克力與奶油芳香。',
                  file: '/coffee_assets/03_感官與風味庫/SCAA_36味聞香瓶/scaa_36_aromas_02_焦糖化反應_堅果焦糖.jpg'
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
              ].map((item, idx) => (
                <div key={idx} className="gallery-card" onClick={() => setLightboxAsset(item)}>
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
            <h2 className="section-title">沖煮科學與顯微鏡微觀世界</h2>
            <p className="section-desc">金杯理論萃取率計算、水質硬度與電子顯微鏡下的咖啡細胞壁多孔結構。</p>
          </div>

          <h3 style={{ fontSize: '1.4rem', color: 'var(--accent-gold)', margin: '20px 0 16px' }}>⚖️ 金杯準則與濃度萃取圖解</h3>
          <div className="gallery-grid">
            {[
              {
                title: '金杯理論：濃度與萃取率基準坐標',
                badge: 'TDS vs Extraction',
                desc: 'SCAE / SCAA 理想萃取帶（1.15%-1.45% 濃度，18%-22% 萃取率）。',
                file: '/coffee_assets/04_沖煮科學與器材/金杯萃取與濃度/gold_cup_extraction_01_濃度與萃取率基準.jpg'
              },
              {
                title: '金杯理論：風味落點分佈控制圖',
                badge: '苦澀/水感/平衡',
                desc: '萃取不足、金杯平衡與過度萃取之風味落點圖解。',
                file: '/coffee_assets/04_沖煮科學與器材/金杯萃取與濃度/gold_cup_extraction_02_控制圖解.jpg'
              },
              {
                title: '沖煮變因：水質硬度與萃取表現',
                badge: '水質 TDS 實驗',
                desc: '鎂離子、鈣離子含量對酸甜感與芳香物質溶解度的影響。',
                file: '/coffee_assets/04_沖煮科學與器材/沖煮變因與器材/water_quality_01_水質硬度與萃取關係.jpg'
              },
              {
                title: '沖煮器材：磨豆機刀盤顆粒雙峰分佈',
                badge: '研磨顆粒粒徑',
                desc: '平刀、鬼齒與錐刀之研磨粗細分佈對水流通道之影響。',
                file: '/coffee_assets/04_沖煮科學與器材/沖煮變因與器材/grinder_01_磨豆機刀盤與顆粒分佈.jpg'
              }
            ].map((item, idx) => (
              <div key={idx} className="gallery-card" onClick={() => setLightboxAsset(item)}>
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

          <h3 style={{ fontSize: '1.4rem', color: 'var(--accent-gold)', margin: '40px 0 16px' }}>🔬 電子顯微鏡下的咖啡微觀結構 (去重精選)</h3>
          <div className="gallery-grid">
            {[
              {
                title: '顯微鏡微觀：咖啡豆多孔蜂巢細胞壁',
                badge: '細胞壁孔隙',
                desc: '熟豆烘焙後水分與二氧化碳逸散形成的微米級多孔蜂巢通道。',
                file: '/coffee_assets/04_沖煮科學與器材/咖啡顯微鏡微觀/microscope_bean_cell_01_細胞壁孔隙.jpg'
              },
              {
                title: '顯微鏡微觀：孔徑毛細吸收水流現象',
                badge: '毛細吸水通道',
                desc: '水分子透過微孔道滲透並浸潤顆粒內部的毛細現象。',
                file: '/coffee_assets/04_沖煮科學與器材/咖啡顯微鏡微觀/microscope_bean_cell_02_孔徑毛細現象.jpg'
              },
              {
                title: '顯微鏡微觀：萃取前後細胞壁溶解狀態',
                badge: '可溶物釋出變化',
                desc: '高倍顯微鏡下熱水萃取後固形物溶解流失後的孔洞擴大。',
                file: '/coffee_assets/04_沖煮科學與器材/咖啡顯微鏡微觀/microscope_bean_cell_03_萃取前後結構.jpg'
              },
              {
                title: '顯微鏡微觀：研磨顆粒斷裂橫截面',
                badge: '研磨破碎面',
                desc: '刀盤剪切與擠壓造成的咖啡粉末微細碎屑附著形態。',
                file: '/coffee_assets/04_沖煮科學與器材/咖啡顯微鏡微觀/microscope_bean_cell_04_顆粒橫截面.jpg'
              }
            ].map((item, idx) => (
              <div key={idx} className="gallery-card" onClick={() => setLightboxAsset(item)}>
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

      
          {/* 教材補充專區 */}
          <div style={{ marginTop: '50px', borderTop: '1px solid var(--border-subtle)', paddingTop: '40px' }}>
            <div className="section-header" style={{ margin: '0 0 24px' }}>
              <span className="section-tag">SUPPLEMENTARY MATERIALS</span>
              <h3 className="section-title">📖 沖煮變因與器材・教材補充</h3>
              <p className="section-desc">彙整大倫老師手沖課程延伸教材、萃取動力學、烘焙膨脹率與濾紙孔隙之深度實務圖解。</p>
            </div>

            <div className="gallery-grid">
              {[
                {
                  title: '教材補充：烘焙度與熟豆細胞壁膨脹',
                  badge: '烘焙動力學',
                  desc: '淺焙到深焙細胞壁多孔孔隙擴大與體積膨脹比率，直接影響注水時的吸水速度與可溶出物比例。',
                  file: '/coffee_assets/04_沖煮科學與器材/沖煮變因與器材/roast_degree_01_烘焙度與細胞膨脹.jpg'
                },
                {
                  title: '教材補充：烘焙可溶性物質釋出變化',
                  badge: '萃取率關聯',
                  desc: '不同烘焙階段可萃取水溶性芳香物質（果酸、焦糖、油脂、灰分）之釋放順序與速率差異。',
                  file: '/coffee_assets/04_沖煮科學與器材/沖煮變因與器材/roast_degree_02_烘焙萃取變化.jpg'
                },
                {
                  title: '教材補充：烘焙歷程失重率與脫水比例',
                  badge: '生豆脫水數據',
                  desc: '烘焙過程中水分散失比率（失重率約 12% - 18%）與熟豆密度之對應數據。',
                  file: '/coffee_assets/04_沖煮科學與器材/沖煮變因與器材/roast_degree_03_烘焙失重率.jpg'
                },
                {
                  title: '教材補充：濾紙纖維孔隙粗細與流速',
                  badge: '濾材孔隙解析',
                  desc: '微距觀察不同品牌濾紙纖維密度，解析細粉截留能力與阻水流速之直接關係。',
                  file: '/coffee_assets/04_沖煮科學與器材/沖煮變因與器材/filter_paper_粗細孔隙與流速.jpg'
                },
                {
                  title: '教材補充：悶蒸排氣與泡沫細緻度觀察 (一)',
                  badge: '新鮮度與排氣',
                  desc: '新鮮烘焙豆遇熱水瞬間釋出二氧化碳形成之綿密咖啡漢堡（Bloom），建立最初水流通道。',
                  file: '/coffee_assets/04_沖煮科學與器材/沖煮變因與器材/bloom_degas_01_沖煮悶蒸泡沫觀察.jpg'
                },
                {
                  title: '教材補充：排氣狀態與通道穩定觀察 (二)',
                  badge: '通道效應診斷',
                  desc: '觀察表面泡沫色澤與排氣微孔分佈，藉以判斷過濾層是否均勻、有無局部通道破裂。',
                  file: '/coffee_assets/04_沖煮科學與器材/沖煮變因與器材/bloom_degas_02_排氣狀態觀察.jpg'
                },
                {
                  title: '教材補充：磨豆機研磨顆粒均勻度解析',
                  badge: '細粉與阻力',
                  desc: '研磨顆粒粒徑分佈（微米篩分），極細粉沉積對下層濾水通道阻力之實測解析。',
                  file: '/coffee_assets/04_沖煮科學與器材/沖煮變因與器材/grinder_02_研磨均勻度解析.jpg'
                },
                {
                  title: '教材補充：咖啡萃取動力學觀念圖解',
                  badge: '萃取動力學',
                  desc: '水分子擴散速度、對流驅動與可溶性固形物溶解曲線之理論模型。',
                  file: '/coffee_assets/04_沖煮科學與器材/沖煮變因與器材/brewing_concept_沖煮動力學概念.jpg'
                },
                {
                  title: '教材補充：手沖沖煮器具與實驗配置實拍',
                  badge: '實習器具設定',
                  desc: '手沖壺（鶴嘴/月兔）、濾杯、電子秤與下壺之標準教學實驗台配置。',
                  file: '/coffee_assets/04_沖煮科學與器材/沖煮變因與器材/brewing_equipment_手沖器具實拍.jpg'
                }
              ].map((item, idx) => (
                <div key={idx} className="gallery-card" onClick={() => setLightboxAsset(item)}>
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
          </div>


      {/* 模組六：產區與品種 */}
      {currentTab === 'origins' && (
        <main className="container animate-fade-in" style={{ padding: '30px 0 60px' }}>
          <div className="section-header">
            <span className="section-tag">COFFEE ENCYCLOPEDIA</span>
            <h2 className="section-title">世界產區與生豆品種圖鑑</h2>
            <p className="section-desc">探索南北回歸線間的全球咖啡帶、主要產國萬國旗與阿拉比卡品種基因系譜。</p>
          </div>

          <div className="gallery-grid">
            {[
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
            ].map((item, idx) => (
              <div key={idx} className="gallery-card" onClick={() => setLightboxAsset(item)}>
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

      {/* 模組七：講義下載專區 */}
      {currentTab === 'downloads' && (
        <main className="container animate-fade-in" style={{ padding: '30px 0 60px' }}>
          <div className="section-header">
            <span className="section-tag">DOWNLOADS & RESOURCES</span>
            <h2 className="section-title">官方白皮書與課程講義下載</h2>
            <p className="section-desc">包含 SCAA / WCR 19 頁官方科學背景白皮書、反文化 PDF 與精編課綱。</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', maxWidth: '960px', margin: '0 auto' }}>
            {[
              {
                name: 'SCAA 2016 風味輪科學背景白皮書 (19頁完整版)',
                format: 'PDF (34.2 MB)',
                path: '/coffee_assets/06_專業文獻與PDF/scaa_flavor_wheel_scientific_background_2016.pdf'
              },
              {
                name: 'SCAA 經典風味輪 官方向量高解析 PDF',
                format: 'PDF (677 KB)',
                path: '/coffee_assets/06_專業文獻與PDF/scaa_flavor_wheel_official_vector.pdf'
              },
              {
                name: '反文化咖啡風味輪 (Counter Culture 8.5x11 PDF)',
                format: 'PDF (1.8 MB)',
                path: '/coffee_assets/06_專業文獻與PDF/counter_culture_flavor_wheel_85x11.pdf'
              },
              {
                name: '反文化咖啡 瑕疵味輪 (Faults Wheel 11x17 PDF)',
                format: 'PDF (3.4 MB)',
                path: '/coffee_assets/06_專業文獻與PDF/counter_culture_faults_wheel_11x17.pdf'
              },
              {
                name: '手沖咖啡體驗班 講義大綱 (大倫精編版)',
                format: 'Markdown (.md)',
                path: '/coffee_assets/02_課程與教案/01_手沖咖啡體驗班_簡介與收費.md'
              },
              {
                name: '基礎手沖專業實戰課綱 (兩大鐵則與三段注水)',
                format: 'Markdown (.md)',
                path: '/coffee_assets/02_課程與教案/02_基礎手沖專業實戰課綱.md'
              }
            ].map((res, i) => (
              <div key={i} className="glass-panel" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontSize: '1rem', marginBottom: '6px' }}>{res.name}</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)' }}>{res.format}</span>
                </div>
                <a 
                  href={res.path} 
                  target="_blank" 
                  rel="noreferrer" 
                  download
                  style={{ background: 'rgba(229,169,93,0.15)', color: 'var(--accent-gold)', padding: '10px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Download size={14} /> 下載
                </a>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* 圖片 Lightbox Modal */}
      {lightboxAsset && (
        <div className="modal-overlay" onClick={() => setLightboxAsset(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setLightboxAsset(null)}>
              <X size={20} />
            </button>
            <img src={lightboxAsset.file} alt={lightboxAsset.title} className="modal-image-preview" />
            <div className="modal-body">
              <span style={{ background: 'var(--accent-amber)', color: '#fff', padding: '3px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '700' }}>
                {lightboxAsset.badge || '高解析圖片'}
              </span>
              <h3 style={{ fontSize: '1.4rem', margin: '12px 0 8px' }}>{lightboxAsset.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{lightboxAsset.desc}</p>
            </div>
          </div>
        </div>
      )}

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
