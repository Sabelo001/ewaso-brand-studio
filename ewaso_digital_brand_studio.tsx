import React, { useState, useEffect, useRef } from 'react';

// ==========================================
// 1. BRAND TOKENS & CONSTANTS
// ==========================================
const BRAND = {
  colors: {
    primaryTeal: '#1B4D3E',
    primaryTealLight: '#2A6B57',
    goldLight: '#C9A84C',
    goldDark: '#C47E1A',
    cream: '#FAF6EE',
    ivory: '#FFFDF8',
    sand: '#E6DCC7',
    sandLight: '#F5EDD8',
    ink: '#1A1A1A',
    muted: '#7A7265',
    white: '#FFFFFF'
  },
  fonts: {
    heading: '"Playfair Display", serif',
    body: '"DM Sans", sans-serif'
  }
};

const COLOR_OPTIONS = [
  { name: 'Teal', value: BRAND.colors.primaryTeal, bgClass: 'bg-[#1B4D3E]', textClass: 'text-white' },
  { name: 'Gold', value: BRAND.colors.goldLight, bgClass: 'bg-[#C9A84C]', textClass: 'text-black' },
  { name: 'Cream', value: BRAND.colors.cream, bgClass: 'bg-[#FAF6EE]', textClass: 'text-black' },
  { name: 'White', value: BRAND.colors.white, bgClass: 'bg-white', textClass: 'text-black' },
  { name: 'Ink', value: BRAND.colors.ink, bgClass: 'bg-[#1A1A1A]', textClass: 'text-white' }
];

const LAYOUTS = [
  { id: 'editorial', label: 'Editorial Hero', desc: 'Large image focus with structured typography below.' },
  { id: 'split', label: 'Signature Split', desc: 'Half image, half solid brand card with borders.' },
  { id: 'feature', label: 'Property Feature', desc: 'Full bleed background image with a floating content card.' },
  { id: 'quote', label: 'Quote Card', desc: 'Typography-first layout focusing on a central statement.' }
];

// ==========================================
// 2. ICONS & DECORATIONS
// ==========================================
const GlobeIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
);
const PhoneIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>
);
const MailIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
);
const WhatsAppIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
);

// Inject Fonts
const loadBrandFonts = () => {
  if (document.getElementById('ewaso-brand-fonts')) return;
  const link = document.createElement('link');
  link.id = 'ewaso-brand-fonts';
  link.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
};

// ==========================================
// 3. MAIN STUDIO APPLICATION
// ==========================================
export default function EwasoBrandStudio() {
  // Config & Layout State
  const [layoutId, setLayoutId] = useState('editorial');
  const [aspectRatio, setAspectRatio] = useState('9:16');
  const [bgColorTheme, setBgColorTheme] = useState(BRAND.colors.primaryTeal);
  const [heroType, setHeroType] = useState('image'); // image, quote, empty
  const [footerStyle, setFooterStyle] = useState('full'); // minimal, compact, full
  const [decoration, setDecoration] = useState('none'); // none, river, grass

  // Image Control State
  const [imageSrc, setImageSrc] = useState(null);
  const [zoom, setZoom] = useState(1.1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imgOpacity, setImgOpacity] = useState(1.0);

  // Content State
  const [metaText, setMetaText] = useState('LAKE NAKURU NATIONAL PARK');
  const [headlineText, setHeadlineText] = useState('The Silent Giant');
  const [bodyText1, setBodyText1] = useState('Roaming undisturbed in one of Kenya’s greatest sanctuaries.');
  const [bodyText2, setBodyText2] = useState('Captured during golden hour in the wilderness.');
  const [ctaText, setCtaText] = useState('Discover the Safari');

  // Contact State
  const [website, setWebsite] = useState('ewasodigital.co.ke');
  const [phone, setPhone] = useState('+254 711 940 174');
  const [email, setEmail] = useState('hello@ewasodigital.co.ke');
  const [whatsapp, setWhatsapp] = useState('+254 711 940 174');

  // Theme & Colors
  const [headerColor, setHeaderColor] = useState(BRAND.colors.goldLight);
  const [headlineColor, setHeadlineColor] = useState(BRAND.colors.white);
  const [bodyColor, setBodyColor] = useState(BRAND.colors.cream);
  const [borderWidth, setBorderWidth] = useState(12);
  const [borderColor, setBorderColor] = useState(BRAND.colors.goldLight);

  const fileInputRef = useRef(null);
  const previewContainerRef = useRef(null);

  // Load default empty canvas to act as image placeholder
  useEffect(() => {
    loadBrandFonts();
    const canvas = document.createElement('canvas');
    canvas.width = 1080; canvas.height = 1080;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 0, 1080);
    grad.addColorStop(0, '#11221A'); grad.addColorStop(1, '#2A5345');
    ctx.fillStyle = grad; ctx.fillRect(0, 0, 1080, 1080);
    setImageSrc(canvas.toDataURL());
  }, []);

  // Quick Preset Helper
  const applyPreset = (preset) => {
    if (preset === 'editorial') {
      setLayoutId('editorial'); setHeroType('image');
      setBgColorTheme(BRAND.colors.primaryTeal);
      setHeaderColor(BRAND.colors.goldLight); setHeadlineColor(BRAND.colors.white); setBodyColor(BRAND.colors.sandLight);
    } else if (preset === 'split') {
      setLayoutId('split'); setHeroType('image');
      setHeaderColor(BRAND.colors.goldDark); setHeadlineColor(BRAND.colors.primaryTeal); setBodyColor(BRAND.colors.muted);
    } else if (preset === 'feature') {
      setLayoutId('feature'); setHeroType('image');
      setBgColorTheme(BRAND.colors.primaryTeal);
      setHeaderColor(BRAND.colors.goldDark); setHeadlineColor(BRAND.colors.primaryTeal); setBodyColor(BRAND.colors.muted);
    } else if (preset === 'quote') {
      setLayoutId('quote'); setHeroType('quote');
      setBgColorTheme(BRAND.colors.cream);
      setHeaderColor(BRAND.colors.primaryTeal); setHeadlineColor(BRAND.colors.ink); setBodyColor(BRAND.colors.muted);
    }
  };

  // Image Upload & Pan Engine
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => { setImageSrc(event.target.result); setZoom(1.0); setPanX(0); setPanY(0); };
      reader.readAsDataURL(file);
    }
  };
  const handleStartDrag = (cx, cy) => { setIsDragging(true); setDragStart({ x: cx - panX, y: cy - panY }); };
  const handleDragMove = (cx, cy) => { if (isDragging) { setPanX(cx - dragStart.x); setPanY(cy - dragStart.y); } };

  // ==========================================
  // 4. CANVAS EXPORT ENGINE (Robust Wrapping & Alignment)
  // ==========================================
  const exportDesign = () => {
    const canvas = document.createElement('canvas');
    let w = 1080;
    let h = aspectRatio === '9:16' ? 1920 : aspectRatio === '4:5' ? 1350 : 1080;
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext('2d');

    // Helper: Draw Wrapped Text to avoid extension bugs
    const drawText = (text, x, y, maxWidth, lineHeight, font, color, align, letterSpace = '0px') => {
      if (!text) return y;
      ctx.font = font; ctx.fillStyle = color; ctx.textAlign = align; ctx.textBaseline = 'top';
      ctx.letterSpacing = letterSpace; // Modern canvas API feature
      
      const words = text.split(' ');
      let line = ''; let currentY = y;
      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && i > 0) {
          ctx.fillText(line.trim(), x, currentY);
          line = words[i] + ' '; currentY += lineHeight;
        } else { line = testLine; }
      }
      ctx.fillText(line.trim(), x, currentY);
      ctx.letterSpacing = '0px'; // Reset instantly
      return currentY + lineHeight;
    };

    // Helper: Draw Image Pan/Zoom
    const drawImageElement = (img, dx, dy, dw, dh, radius = 0) => {
      ctx.save();
      if (radius > 0) {
        ctx.beginPath(); ctx.roundRect(dx, dy, dw, dh, radius); ctx.clip();
      } else {
        ctx.beginPath(); ctx.rect(dx, dy, dw, dh); ctx.clip();
      }
      const scale = Math.max(dw / img.width, dh / img.height) * zoom;
      const finalW = img.width * scale; const finalH = img.height * scale;
      // Map DOM pan to Canvas pan proportionally
      const pW = previewContainerRef.current?.offsetWidth || 1;
      const pH = previewContainerRef.current?.offsetHeight || 1;
      const mappedPanX = panX * (dw / pW);
      const mappedPanY = panY * (dh / pH);
      
      const ox = dx + (dw - finalW) / 2 + mappedPanX;
      const oy = dy + (dh - finalH) / 2 + mappedPanY;
      ctx.globalAlpha = imgOpacity;
      ctx.drawImage(img, ox, oy, finalW, finalH);
      ctx.globalAlpha = 1.0;
      ctx.restore();
    };

    // Helper: Render Decorative Assets
    const drawDecorations = () => {
      if (decoration === 'river') {
        ctx.strokeStyle = BRAND.colors.goldLight; ctx.globalAlpha = 0.15; ctx.lineWidth = 120;
        ctx.beginPath(); ctx.moveTo(0, h * 0.8); ctx.bezierCurveTo(w * 0.4, h * 0.6, w * 0.6, h * 0.9, w, h * 0.7); ctx.stroke();
        ctx.globalAlpha = 1.0;
      }
    };

    // Helper: Footer Drawer
    const drawFooter = (yPos, themeIsDark) => {
      const textColor = themeIsDark ? BRAND.colors.white : BRAND.colors.ink;
      const iconColor = themeIsDark ? BRAND.colors.goldLight : BRAND.colors.goldDark;
      const lineY = yPos;
      
      ctx.fillStyle = iconColor;
      ctx.fillRect(w / 2 - 20, lineY, 40, 2);

      drawText('EWASO DIGITAL', w/2, lineY + 20, w, 30, `700 16px ${BRAND.fonts.body}`, textColor, 'center', '4px');
      
      ctx.font = `500 16px ${BRAND.fonts.body}`;
      ctx.fillStyle = themeIsDark ? BRAND.colors.sandLight : BRAND.colors.muted;
      ctx.textAlign = 'center';
      
      let contactStr = `Web: ${website}`;
      if (footerStyle === 'compact') contactStr += `   |   WA: ${whatsapp}`;
      if (footerStyle === 'full') contactStr += `   |   Tel: ${phone}   |   Email: ${email}`;
      
      ctx.fillText(contactStr, w/2, lineY + 50);
    };

    const renderCanvas = () => {
      // Base Background
      ctx.fillStyle = bgColorTheme;
      ctx.fillRect(0, 0, w, h);
      drawDecorations();

      const img = new Image();
      img.src = imageSrc;
      
      // LAYOUT ENGINE
      if (layoutId === 'editorial') {
        // Top Meta
        drawText(metaText.toUpperCase(), w/2, h*0.08, w*0.8, 30, `700 18px ${BRAND.fonts.body}`, headerColor, 'center', '6px');
        // Hero Module
        if (heroType === 'image' && imageSrc) {
          drawImageElement(img, w*0.08, h*0.15, w*0.84, h*0.4, 24);
        }
        // Typography Block
        const textStartY = h*0.6;
        let y = drawText(headlineText, w/2, textStartY, w*0.85, 80, `900 72px ${BRAND.fonts.heading}`, headlineColor, 'center');
        y = drawText(bodyText1, w/2, y + 20, w*0.75, 36, `400 24px ${BRAND.fonts.body}`, bodyColor, 'center');
        drawText(bodyText2, w/2, y + 10, w*0.75, 36, `italic 400 22px ${BRAND.fonts.heading}`, headerColor, 'center');
        
        drawFooter(h * 0.88, bgColorTheme === BRAND.colors.primaryTeal);
      } 
      else if (layoutId === 'split') {
        if (imageSrc) drawImageElement(img, 0, 0, w, h*0.5);
        ctx.fillStyle = BRAND.colors.ivory;
        ctx.fillRect(0, h*0.5, w, h*0.5);
        ctx.strokeStyle = BRAND.colors.sand; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(0, h*0.5); ctx.lineTo(w, h*0.5); ctx.stroke();

        let y = h*0.55;
        drawText(metaText.toUpperCase(), w/2, y, w*0.8, 30, `700 18px ${BRAND.fonts.body}`, headerColor, 'center', '6px');
        y = drawText(headlineText, w/2, y + 50, w*0.85, 70, `900 64px ${BRAND.fonts.heading}`, headlineColor, 'center');
        y = drawText(bodyText1, w/2, y + 30, w*0.75, 36, `400 24px ${BRAND.fonts.body}`, bodyColor, 'center');
        drawText(bodyText2, w/2, y + 10, w*0.75, 36, `italic 400 22px ${BRAND.fonts.heading}`, BRAND.colors.primaryTeal, 'center');
        
        drawFooter(h * 0.86, false);
      }
      else if (layoutId === 'feature') {
        if (imageSrc) drawImageElement(img, 0, 0, w, h);
        
        // Dark gradient overlay bottom
        const grad = ctx.createLinearGradient(0, h*0.5, 0, h);
        grad.addColorStop(0, 'rgba(0,0,0,0)'); grad.addColorStop(1, 'rgba(27,77,62,0.9)');
        ctx.fillStyle = grad; ctx.fillRect(0, h*0.5, w, h*0.5);

        // Floating Card
        const cardH = h * 0.35; const cardY = h - cardH - 40;
        ctx.fillStyle = BRAND.colors.ivory;
        ctx.beginPath(); ctx.roundRect(40, cardY, w - 80, cardH, 24); ctx.fill();
        
        let y = cardY + 50;
        drawText(metaText.toUpperCase(), w/2, y, w*0.7, 30, `700 16px ${BRAND.fonts.body}`, headerColor, 'center', '6px');
        y = drawText(headlineText, w/2, y + 40, w*0.75, 64, `900 56px ${BRAND.fonts.heading}`, headlineColor, 'center');
        drawText(bodyText1, w/2, y + 20, w*0.7, 32, `400 22px ${BRAND.fonts.body}`, bodyColor, 'center');

        drawFooter(cardY + cardH - 100, false);
      }
      else if (layoutId === 'quote') {
        let y = h*0.35;
        ctx.fillStyle = headerColor; ctx.globalAlpha = 0.2;
        ctx.font = `900 180px ${BRAND.fonts.heading}`; ctx.textAlign = 'center'; ctx.fillText('“', w/2, y - 60); ctx.globalAlpha = 1.0;
        
        y = drawText(headlineText, w/2, y, w*0.8, 80, `italic 700 64px ${BRAND.fonts.heading}`, headlineColor, 'center');
        ctx.fillStyle = headerColor; ctx.fillRect(w/2 - 40, y + 40, 80, 2);
        drawText(metaText.toUpperCase(), w/2, y + 80, w*0.8, 30, `700 18px ${BRAND.fonts.body}`, bodyColor, 'center', '4px');
        
        drawFooter(h * 0.88, bgColorTheme === BRAND.colors.primaryTeal);
      }

      // Border Frame
      if (borderWidth > 0) {
        ctx.strokeStyle = borderColor; ctx.lineWidth = borderWidth * 2;
        ctx.strokeRect(borderWidth, borderWidth, w - borderWidth * 2, h - borderWidth * 2);
      }

      const link = document.createElement('a');
      link.download = `Ewaso_Brand_Studio_${layoutId}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };

    if (imageSrc && heroType === 'image') {
      const img = new Image(); img.src = imageSrc; img.onload = renderCanvas;
    } else { renderCanvas(); }
  };

  // ==========================================
  // 5. DOM PREVIEW COMPONENTS (Matches Canvas strictly)
  // ==========================================
  const PreviewHeader = ({ color }) => (
    <div className="text-[10px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color }}>{metaText}</div>
  );
  const PreviewHeadline = ({ color }) => (
    <h2 className="text-4xl font-bold leading-tight font-serif mb-4" style={{ color }}>{headlineText}</h2>
  );
  const PreviewBody = ({ color, align="center" }) => (
    <div className={`flex flex-col items-${align} gap-2 opacity-90`}>
      <p className="text-xs font-sans leading-relaxed max-w-[85%] text-center" style={{ color }}>{bodyText1}</p>
      {bodyText2 && <p className="text-xs font-serif italic text-center mt-1" style={{ color: headerColor }}>{bodyText2}</p>}
    </div>
  );
  const PreviewFooter = ({ isDark }) => {
    const txtColor = isDark ? 'text-white' : 'text-[#1A1A1A]';
    const subColor = isDark ? 'text-[#E6DCC7]' : 'text-[#7A7265]';
    const iconColor = isDark ? BRAND.colors.goldLight : BRAND.colors.goldDark;
    return (
      <div className="flex flex-col items-center mt-auto pt-6 pb-2 w-full">
        <div className="w-8 h-[2px] mb-3" style={{ backgroundColor: iconColor }} />
        <span className={`text-[10px] font-bold tracking-widest font-sans mb-3 ${txtColor}`}>EWASO DIGITAL</span>
        <div className={`flex flex-wrap justify-center gap-3 text-[8px] font-medium font-sans ${subColor}`}>
          <div className="flex items-center gap-1"><GlobeIcon className="w-3 h-3" style={{color: iconColor}}/> {website}</div>
          {(footerStyle === 'compact' || footerStyle === 'full') && <div className="flex items-center gap-1"><WhatsAppIcon className="w-3 h-3" style={{color: iconColor}}/> {whatsapp}</div>}
          {footerStyle === 'full' && <div className="flex items-center gap-1"><PhoneIcon className="w-3 h-3" style={{color: iconColor}}/> {phone}</div>}
          {footerStyle === 'full' && <div className="flex items-center gap-1"><MailIcon className="w-3 h-3" style={{color: iconColor}}/> {email}</div>}
        </div>
      </div>
    );
  };
  const HeroImageModule = ({ heightClass, roundedClass }) => (
    imageSrc && heroType === 'image' && (
      <div className={`relative w-full ${heightClass} overflow-hidden ${roundedClass}`}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `url(${imageSrc})`, backgroundSize: 'cover', backgroundPosition: 'center', transform: `scale(${zoom}) translate(${panX}px, ${panY}px)`, opacity: imgOpacity }} />
      </div>
    )
  );

  return (
    <div className="min-h-screen bg-[#0E0E11] text-[#ECE9E4] font-sans flex flex-col xl:flex-row">
      
      {/* ================= SIDEBAR CONTROLS ================= */}
      <div className="w-full xl:w-[480px] bg-[#141419] p-6 flex flex-col border-b xl:border-b-0 xl:border-r border-[#26262B] overflow-y-auto max-h-screen custom-scrollbar">
        
        {/* Brand Header */}
        <div className="flex items-center space-x-4 mb-8 pb-6 border-b border-[#26262B]">
          <div className="p-3 bg-[#1B4D3E] rounded-xl text-[#C9A84C] shadow-lg shadow-[#1B4D3E]/20">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wider text-white">EWASO DIGITAL</h1>
            <p className="text-[11px] text-[#C9A84C] font-mono tracking-widest uppercase mt-1">Brand Studio System</p>
          </div>
        </div>

        {/* 1. Layout Presets */}
        <div className="mb-8">
          <label className="block text-xs font-bold tracking-wider text-[#C9A84C] uppercase mb-3">1. Layout Engine</label>
          <div className="grid grid-cols-2 gap-2">
            {LAYOUTS.map(l => (
              <button key={l.id} onClick={() => applyPreset(l.id)} className={`p-3 rounded-xl text-left transition border ${layoutId === l.id ? 'bg-[#1B4D3E] border-[#C9A84C]' : 'bg-[#1C1C24] border-[#2B2B33] hover:border-[#40404A]'}`}>
                <div className="text-xs font-bold text-white mb-1">{l.label}</div>
                <div className="text-[9px] text-neutral-400 leading-snug">{l.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Format & Hero */}
        <div className="mb-8 bg-[#1C1C24] p-4 rounded-xl border border-[#2B2B33] space-y-5">
          <div>
            <label className="block text-[10px] font-bold text-neutral-400 uppercase mb-2">Canvas Format</label>
            <div className="flex space-x-2">
              {['9:16', '4:5', '1:1'].map(r => (
                <button key={r} onClick={() => setAspectRatio(r)} className={`px-4 py-2 rounded-lg text-xs font-bold transition ${aspectRatio === r ? 'bg-[#C9A84C] text-[#141419]' : 'bg-[#15151A] text-neutral-400 border border-[#2B2B33]'}`}>{r}</button>
              ))}
            </div>
          </div>
          
          {(layoutId !== 'quote') && (
            <div>
              <label className="block text-[10px] font-bold text-neutral-400 uppercase mb-2">Hero Image Asset</label>
              <div onClick={() => fileInputRef.current.click()} className="border border-dashed border-[#40404A] hover:border-[#C9A84C] rounded-lg p-4 text-center cursor-pointer bg-[#15151A] transition">
                <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                <span className="text-xs text-white font-bold">📷 Replace Primary Asset</span>
              </div>
              <div className="mt-3 flex gap-2">
                <div className="flex-1">
                  <span className="text-[9px] text-neutral-500">Zoom Scale</span>
                  <input type="range" min="0.5" max="2.5" step="0.05" value={zoom} onChange={(e) => setZoom(parseFloat(e.target.value))} className="w-full accent-[#C9A84C] bg-[#22222D] h-1 rounded-lg appearance-none" />
                </div>
                <div className="flex-1">
                  <span className="text-[9px] text-neutral-500">Opacity</span>
                  <input type="range" min="0.1" max="1.0" step="0.1" value={imgOpacity} onChange={(e) => setImgOpacity(parseFloat(e.target.value))} className="w-full accent-[#C9A84C] bg-[#22222D] h-1 rounded-lg appearance-none" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3. Typography Content */}
        <div className="mb-8 space-y-3">
          <label className="block text-xs font-bold tracking-wider text-[#C9A84C] uppercase mb-1">2. Typography Block</label>
          <input type="text" value={metaText} onChange={(e) => setMetaText(e.target.value)} placeholder="Subtitle / Meta" className="w-full bg-[#1C1C24] border border-[#2B2B33] rounded-lg px-3 py-2 text-xs text-white focus:border-[#C9A84C] focus:outline-none font-mono" />
          <textarea value={headlineText} onChange={(e) => setHeadlineText(e.target.value)} placeholder="Hero Headline" rows={2} className="w-full bg-[#1C1C24] border border-[#2B2B33] rounded-lg px-3 py-2 text-sm text-white focus:border-[#C9A84C] focus:outline-none font-serif font-bold" />
          <input type="text" value={bodyText1} onChange={(e) => setBodyText1(e.target.value)} placeholder="Body Text Line 1" className="w-full bg-[#1C1C24] border border-[#2B2B33] rounded-lg px-3 py-2 text-xs text-white focus:border-[#C9A84C] focus:outline-none" />
          <input type="text" value={bodyText2} onChange={(e) => setBodyText2(e.target.value)} placeholder="Body Text Line 2 (Italic)" className="w-full bg-[#1C1C24] border border-[#2B2B33] rounded-lg px-3 py-2 text-xs text-white focus:border-[#C9A84C] focus:outline-none font-serif italic" />
          <input type="text" value={ctaText} onChange={(e) => setCtaText(e.target.value)} placeholder="Call to Action (Optional)" className="w-full bg-[#1B4D3E]/30 border border-[#1B4D3E] rounded-lg px-3 py-2 text-xs text-white focus:border-[#C9A84C] focus:outline-none font-bold" />
        </div>

        {/* 4. Brand Colors */}
        <div className="mb-8 bg-[#1C1C24] p-4 rounded-xl border border-[#2B2B33] space-y-4">
          <label className="block text-xs font-bold tracking-wider text-[#C9A84C] uppercase border-b border-[#2B2B33] pb-2">3. Brand Colors</label>
          
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-neutral-400">Background Theme:</span>
            <div className="flex space-x-1">
              {COLOR_OPTIONS.map(c => (
                <button key={c.name} onClick={() => setBgColorTheme(c.value)} className={`w-5 h-5 rounded-full border-2 ${bgColorTheme === c.value ? 'border-[#C9A84C]' : 'border-transparent'} ${c.bgClass}`} title={c.name} />
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-neutral-400">Headline Color:</span>
            <div className="flex space-x-1">
              {COLOR_OPTIONS.map(c => (
                <button key={c.name} onClick={() => setHeadlineColor(c.value)} className={`w-5 h-5 rounded-full border-2 ${headlineColor === c.value ? 'border-[#C9A84C]' : 'border-transparent'} ${c.bgClass}`} title={c.name} />
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-neutral-400">Accents (Meta/Border):</span>
            <div className="flex space-x-1">
              {COLOR_OPTIONS.map(c => (
                <button key={c.name} onClick={() => {setHeaderColor(c.value); setBorderColor(c.value);}} className={`w-5 h-5 rounded-full border-2 ${headerColor === c.value ? 'border-[#C9A84C]' : 'border-transparent'} ${c.bgClass}`} title={c.name} />
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-neutral-400">Body Text:</span>
            <div className="flex space-x-1">
              {COLOR_OPTIONS.map(c => (
                <button key={c.name} onClick={() => setBodyColor(c.value)} className={`w-5 h-5 rounded-full border-2 ${bodyColor === c.value ? 'border-[#C9A84C]' : 'border-transparent'} ${c.bgClass}`} title={c.name} />
              ))}
            </div>
          </div>
        </div>

        {/* 5. Components & Footer */}
        <div className="mb-8">
          <label className="block text-xs font-bold tracking-wider text-[#C9A84C] uppercase mb-3">4. Footer & Overlays</label>
          <div className="space-y-4">
            <div className="flex gap-2">
              {['minimal', 'compact', 'full'].map(s => (
                <button key={s} onClick={() => setFooterStyle(s)} className={`flex-1 py-1.5 text-[10px] font-bold uppercase rounded border transition ${footerStyle === s ? 'bg-[#1B4D3E] text-white border-[#C9A84C]' : 'bg-[#1C1C24] border-[#2B2B33] text-neutral-400'}`}>{s}</button>
              ))}
            </div>
            
            {footerStyle !== 'minimal' && (
              <div className="grid grid-cols-2 gap-2">
                <input type="text" value={website} onChange={(e)=>setWebsite(e.target.value)} className="bg-[#1C1C24] border border-[#2B2B33] rounded px-2 py-1.5 text-[10px] text-white" placeholder="Website" />
                <input type="text" value={whatsapp} onChange={(e)=>setWhatsapp(e.target.value)} className="bg-[#1C1C24] border border-[#2B2B33] rounded px-2 py-1.5 text-[10px] text-white" placeholder="WhatsApp" />
                {footerStyle === 'full' && (
                  <>
                    <input type="text" value={phone} onChange={(e)=>setPhone(e.target.value)} className="bg-[#1C1C24] border border-[#2B2B33] rounded px-2 py-1.5 text-[10px] text-white" placeholder="Phone" />
                    <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} className="bg-[#1C1C24] border border-[#2B2B33] rounded px-2 py-1.5 text-[10px] text-white" placeholder="Email" />
                  </>
                )}
              </div>
            )}

            <div className="pt-3 border-t border-[#26262B]">
              <div className="flex justify-between text-[10px] font-bold text-neutral-400 mb-1">
                <span>Outer Border Frame</span><span>{borderWidth}px</span>
              </div>
              <input type="range" min="0" max="24" step="2" value={borderWidth} onChange={(e) => setBorderWidth(parseInt(e.target.value))} className="w-full accent-[#C9A84C] bg-[#22222D] h-1 rounded-lg appearance-none" />
            </div>
          </div>
        </div>

        {/* Export */}
        <button onClick={exportDesign} className="mt-auto w-full py-4 bg-[#C9A84C] text-[#141419] hover:bg-white font-bold tracking-widest uppercase rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          <span>Export Layout Render</span>
        </button>

      </div>

      {/* ================= RIGHT WORKSPACE PREVIEW ================= */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#0E0E11] relative">
        <div className="absolute top-8 left-0 right-0 text-center">
          <span className="text-[10px] font-bold text-neutral-500 tracking-widest uppercase bg-[#141419] px-4 py-1.5 rounded-full border border-neutral-800">
            Design Canvas Preview
          </span>
        </div>

        {/* Canvas Engine Wrapper */}
        <div 
          ref={previewContainerRef}
          className="relative overflow-hidden shadow-2xl border border-neutral-800 select-none cursor-grab active:cursor-grabbing transition-colors duration-300"
          style={{
            width: '100%',
            maxWidth: aspectRatio === '9:16' ? '380px' : aspectRatio === '4:5' ? '460px' : '520px',
            aspectRatio: aspectRatio === '9:16' ? '9/16' : aspectRatio === '4:5' ? '4/5' : '1/1',
            backgroundColor: bgColorTheme,
            padding: `${borderWidth}px`
          }}
          onMouseDown={(e) => handleStartDrag(e.clientX, e.clientY)}
          onMouseMove={(e) => handleDragMove(e.clientX, e.clientY)}
          onMouseUp={() => setIsDragging(false)} onMouseLeave={() => setIsDragging(false)}
        >
          {/* Internal Border Logic */}
          {borderWidth > 0 && (
            <div className="absolute inset-0 pointer-events-none z-50" style={{ border: `${borderWidth}px solid ${borderColor}` }} />
          )}

          {/* LAYOUT RENDERER */}
          <div className="w-full h-full relative flex flex-col pointer-events-none z-10">
            
            {/* 1. EDITORIAL LAYOUT */}
            {layoutId === 'editorial' && (
              <div className="flex flex-col h-full items-center text-center p-6">
                <div className="mt-4"><PreviewHeader color={headerColor} /></div>
                <HeroImageModule heightClass="h-[40%] mt-4 mb-8" roundedClass="rounded-[24px]" />
                <div className="flex flex-col items-center justify-center flex-1">
                  <PreviewHeadline color={headlineColor} />
                  <PreviewBody color={bodyColor} />
                  {ctaText && <div className="mt-6 px-6 py-2 rounded-full font-bold text-[10px] uppercase tracking-wider bg-[#1B4D3E] text-white border border-[#C9A84C]">{ctaText}</div>}
                </div>
                <PreviewFooter isDark={bgColorTheme === BRAND.colors.primaryTeal || bgColorTheme === BRAND.colors.ink} />
              </div>
            )}

            {/* 2. SPLIT LAYOUT */}
            {layoutId === 'split' && (
              <div className="flex flex-col h-full">
                <div className="h-[50%] relative">
                  <HeroImageModule heightClass="h-full" roundedClass="rounded-none" />
                </div>
                <div className="h-[50%] bg-[#FFFDF8] flex flex-col items-center justify-center p-6 text-center border-t-2" style={{borderColor: BRAND.colors.sand}}>
                  <div className="mt-2"><PreviewHeader color={headerColor} /></div>
                  <PreviewHeadline color={headlineColor} />
                  <PreviewBody color={bodyColor} />
                  <PreviewFooter isDark={false} />
                </div>
              </div>
            )}

            {/* 3. PROPERTY FEATURE LAYOUT */}
            {layoutId === 'feature' && (
              <div className="relative h-full w-full">
                <HeroImageModule heightClass="h-full absolute inset-0" roundedClass="rounded-none" />
                <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#1B4D3E]/95 to-transparent flex flex-col justify-end p-6 pb-8 text-center">
                  <div className="bg-[#FFFDF8] rounded-[24px] p-6 shadow-2xl flex flex-col items-center border border-[#E6DCC7]">
                    <PreviewHeader color={headerColor} />
                    <PreviewHeadline color={headlineColor} />
                    <PreviewBody color={bodyColor} />
                    {ctaText && <div className="mt-5 px-5 py-2 rounded-full font-bold text-[10px] uppercase tracking-wider bg-[#1B4D3E] text-white">{ctaText}</div>}
                    <div className="mt-4 w-full"><PreviewFooter isDark={false} /></div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. QUOTE CARD LAYOUT */}
            {layoutId === 'quote' && (
              <div className="flex flex-col h-full items-center justify-center p-8 text-center">
                <div className="flex flex-col items-center justify-center flex-1">
                  <div className="text-[120px] font-serif leading-none opacity-20" style={{color: headerColor}}>“</div>
                  <h2 className="text-4xl sm:text-5xl font-bold font-serif italic mb-6 -mt-8" style={{ color: headlineColor }}>{headlineText}</h2>
                  <div className="w-16 h-[2px] mb-6" style={{ backgroundColor: headerColor }} />
                  <PreviewHeader color={bodyColor} />
                </div>
                <PreviewFooter isDark={bgColorTheme === BRAND.colors.primaryTeal || bgColorTheme === BRAND.colors.ink} />
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}