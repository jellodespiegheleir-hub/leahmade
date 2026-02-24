import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Search, Menu, Heart, Star, Sparkles, Smile, MessageCircle, Mail, Send, ArrowRight, Cloud, HeartPulse, ChevronDown, MousePointer2, Scissors, Flower2, Phone, ArrowLeft, CheckCircle2, Ruler, ShieldCheck, X, Plus, Minus, Trash2, CreditCard, Truck, Hammer, RotateCcw, Lock, Unlock, Eye, EyeOff, Instagram, Wand2, ExternalLink, ArrowUpRight } from 'lucide-react';

// --- STYLING CONSTANTS ---
const COLORS = {
  logoYellow: '#ffcc5c',
  logoPetrol: '#418f9f',
  milkyDark: '#f4f1ea', 
  textGray: '#4a4a4a',
};

const INSTAGRAM_URL = "https://www.instagram.com/leahmade.be?igsh=NGVtb3IxbzRvbzV2";

const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: "Dempsey the Dragon",
    category: "Fantasy Collection",
    price: 34.99,
    image: "https://imgur.com/UPfYcbT.png",
    images: [
      "https://imgur.com/UPfYcbT.png",
      "https://imgur.com/URl9yMa.png",
      "https://imgur.com/Og9Mvmf.png",
      "https://imgur.com/GlbBqKp.png"
    ],
    description: "Meet Dempsey, the gentle guardian of the Crochet Kingdom. Hand-crocheted with premium cotton yarn, Dempsey features soft ridges and a friendly gaze. Perfect for dragon lovers of all ages.",
    details: ["100% Organic Cotton Yarn", "Safety eyes secured", "Height: 25cm", "Washable by hand"],
    accent: "#ffcc5c",
    isSoldOut: false
  },
  {
    id: 2,
    name: "Dino the Dragon",
    category: "Fantasy Collection",
    price: 34.99,
    image: "https://imgur.com/YiiCcj2.png",
    images: [
      "https://imgur.com/YiiCcj2.png",
      "https://imgur.com/UBZ3FvM.png",
      "https://imgur.com/Fu1u9Jy.png",
      "https://imgur.com/CTgh0XS.png"
    ],
    description: "A playful prehistoric pal ready for adventures. Dino is soft, squishy, and loves to explore new worlds with you. Handcrafted with vibrant colors and a huge heart.",
    details: ["Soft Acrylic Blend", "Hypoallergenic stuffing", "Handmade with care", "Safety eyes installed"],
    accent: "#418f9f",
    isSoldOut: false
  },
  {
    id: 3,
    name: "Dexter the Dragon",
    category: "Fantasy Collection",
    price: 34.99,
    image: "https://imgur.com/U0xvWB6.png",
    images: [
      "https://imgur.com/U0xvWB6.png",
      "https://imgur.com/cSniqEm.png",
      "https://imgur.com/PGCwqlF.png",
      "https://imgur.com/b8uuQU9.png"
    ],
    description: "Dexter is the scholar of the group. With his distinguished posture and thoughtful expression, he makes the perfect companion for your bookshelf or workspace.",
    details: ["Premium Cotton & Bamboo Blend", "Reinforced crocheting", "Elegant Sage Green tone", "Sitting height: 22cm"],
    accent: "#ffcc5c",
    isSoldOut: false
  },
  {
    id: 4,
    name: "Draco the Dragon",
    category: "Fantasy Collection",
    price: 34.99,
    image: "https://imgur.com/IKVI2WX.png",
    images: [
      "https://imgur.com/IKVI2WX.png",
      "https://imgur.com/RGjUUU9.png",
      "https://imgur.com/Bre032a.png",
      "https://imgur.com/5r1tb9Q.png"
    ],
    description: "Draco is the boldest of our dragons. With his striking profile and meticulously hand-crafted wings, he brings a touch of magic and courage to any room.",
    details: ["Intricate Scale Pattern", "Reinforced wings for durability", "Soft Earth-toned yarn", "Safety eyes included"],
    accent: "#418f9f",
    isSoldOut: false
  },
  {
    id: 6,
    name: "Dax the Dragon",
    category: "Fantasy Collection",
    price: 34.99,
    image: "https://imgur.com/qIYQv3i.png",
    images: [
      "https://imgur.com/qIYQv3i.png",
      "https://imgur.com/HmP1uo0.png",
      "https://imgur.com/dyiDFAg.png"
    ],
    description: "Dax is our miniature marvel! Small enough to sit in your palm but big enough to hold all your secrets. The perfect pocket-sized companion for grand adventures.",
    details: ["Petite 'Palm-Size' design", "Extra-soft chenille yarn", "Available in pastel tones", "Durable travel-friendly build"],
    accent: "#418f9f",
    isSoldOut: false
  }
];

const CATEGORIES = [
  { name: "All Plushies", comingSoon: false },
  { name: "Fantasy Collection", comingSoon: false },
  { name: "Winter Collection", comingSoon: true },
  { name: "Bird Collection", comingSoon: true },
  { name: "Ocean Collection", comingSoon: true }
];

const YarnBallFace = ({ className = "" }) => (
  <div className={`flex items-center gap-1 ${className}`}>
    <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
    <div className="w-2 h-1 border-b-2 border-current rounded-full"></div>
    <div className="w-1.5 h-1.5 bg-current rounded-full"></div>
  </div>
);

const ScribbleUnderline = () => (
  <svg className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-80 h-3 opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
    <path d="M0 5 Q 25 0 50 5 T 100 5" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
  </svg>
);

const SideBanner = ({ side = 'left', text = "" }) => (
  <div className={`fixed top-0 ${side === 'left' ? 'left-0' : 'right-0'} h-full w-12 md:w-16 hidden lg:flex flex-col items-center justify-between py-12 z-40 bg-white/50 backdrop-blur-sm border-${side === 'left' ? 'r' : 'l'} border-stone-200/30 overflow-hidden`}>
    <div className="w-px h-32 bg-gradient-to-b from-transparent via-[#418f9f]/10 to-[#418f9f]/20"></div>
    <div className={`flex flex-col items-center gap-12 whitespace-nowrap ${side === 'left' ? 'rotate-180' : ''}`} style={{ writingMode: 'vertical-rl' }}>
      <div className="space-y-8 flex flex-col items-center">
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#418f9f]/30 transition-colors hover:text-[#418f9f] cursor-default">{text}</span>
        <div className="w-px h-24 bg-stone-200 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#ffcc5c]/30"></div>
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#ffcc5c]/40 transition-colors hover:text-[#ffcc5c] cursor-default">{text}</span>
      </div>
    </div>
    <div className="w-px h-32 bg-gradient-to-t from-transparent via-[#418f9f]/10 to-[#418f9f]/20"></div>
  </div>
);

const CrochetHookIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 6L6 18" />
    <path d="M16 4l4 4-2-2z" />
    <circle cx="6" cy="18" r="2" />
  </svg>
);

export default function App() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All Plushies');
  const [showContactForm, setShowContactForm] = useState(false);
  const [view, setView] = useState('hero');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [checkoutStep, setCheckoutStep] = useState('cart'); 

  // Admin State
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const logoUrl = "https://i.imgur.com/bqsh8YA.png";
  const leahPhotoUrl = "https://imgur.com/yLGCDas.png";

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const soldOutProducts = products.filter(p => p.isSoldOut);

  const addToCart = (product, e) => {
    if (e) e.stopPropagation();
    if (product.isSoldOut) return;
    
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev; 
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
    setCheckoutStep('cart');
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const revertSale = (id) => {
    if (!isAdmin) return;
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, isSoldOut: false } : p
    ));
    if (selectedProduct?.id === id) {
      setSelectedProduct(prev => ({ ...prev, isSoldOut: false }));
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPassword === "leah2026") {
      setIsAdmin(true);
      setShowLoginModal(false);
      setAdminPassword("");
      setLoginError(false);
    } else {
      setLoginError(true);
      setTimeout(() => setLoginError(false), 2000);
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
  };

  const handleCheckout = () => {
    setCheckoutStep('processing');
    setTimeout(() => {
      const cartIds = cart.map(item => item.id);
      setProducts(prev => prev.map(p => 
        cartIds.includes(p.id) ? { ...p, isSoldOut: true } : p
      ));
      
      setCheckoutStep('success');
      setCart([]);
    }, 2000);
  };

  const goToShop = () => {
    setView('shop');
    setSelectedProduct(null);
    setShowContactForm(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToCustom = () => {
    setView('shop');
    setSelectedProduct(null);
    setShowContactForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToAbout = () => {
    setView('about');
    setSelectedProduct(null);
    setShowContactForm(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openDetails = (product) => {
    setSelectedProduct(product);
    setActiveImageIndex(0);
  };

  const filteredProducts = products.filter(p => activeCategory === 'All Plushies' || p.category === activeCategory);
  const currentCategoryData = CATEGORIES.find(c => c.name === activeCategory);
  const isComingSoon = currentCategoryData?.comingSoon;

  return (
    <div className="min-h-screen bg-[#f4f1ea] text-[#4a4a4a] font-sans selection:bg-[#ffcc5c]/20 overflow-x-hidden transition-colors duration-1000">
      
      <SideBanner side="left" text="Handmade with joy • Est. 2026" />
      <SideBanner side="right" text="Unique design • Crochet Creations" />

      {/* --- ADMIN LOGIN MODAL --- */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-md" onClick={() => setShowLoginModal(false)}></div>
          <div className="relative bg-[#f4f1ea] w-full max-w-md rounded-[3rem] shadow-2xl p-10 border border-white/60 animate-in zoom-in-95">
             <button onClick={() => setShowLoginModal(false)} className="absolute top-6 right-6 p-2 text-stone-400 hover:text-[#418f9f] transition-colors"><X className="w-5 h-5" /></button>
             <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-16 h-16 bg-[#418f9f]/10 rounded-full flex items-center justify-center text-[#418f9f]">
                  <Lock className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-xl font-black uppercase tracking-widest">Admin Access</h2>
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest leading-relaxed">Enter your password to unlock studio tools</p>
                </div>
                <form onSubmit={handleAdminLogin} className="w-full space-y-4">
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"}
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      className={`w-full bg-white/50 border ${loginError ? 'border-red-400 animate-shake' : 'border-stone-200'} rounded-2xl px-6 py-4 outline-none font-bold text-sm transition-all focus:border-[#418f9f]`}
                      placeholder="Admin Password"
                      autoFocus
                    />
                    <button 
                      type="button" 
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-[#418f9f]"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {loginError && <p className="text-[9px] text-red-500 font-black uppercase tracking-widest">Incorrect Password</p>}
                  <button type="submit" className="w-full bg-[#418f9f] text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-xl hover:bg-[#ffcc5c] transition-all">Sign In</button>
                </form>
             </div>
          </div>
        </div>
      )}

      {/* --- BASKET DRAWER --- */}
      <div className={`fixed inset-0 z-[110] transition-opacity duration-500 ${isCartOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
        <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-[#f4f1ea] shadow-2xl transition-transform duration-500 ease-out flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-8 flex items-center justify-between border-b border-stone-200">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6 text-[#418f9f]" />
              <h2 className="font-black text-xl uppercase tracking-tighter">Your Basket</h2>
            </div>
            <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-stone-200 rounded-full transition-colors"><X className="w-6 h-6" /></button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-8">
            {checkoutStep === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in-95">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-500">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black uppercase">Order Placed!</h3>
                <p className="text-stone-500 font-medium italic">Your new unique friend is getting ready for its journey home.</p>
                <button onClick={() => setIsCartOpen(false)} className="bg-[#418f9f] text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest">Back to Browsing</button>
              </div>
            ) : cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center text-stone-400 space-y-4 py-12">
                <Cloud className="w-16 h-16 opacity-20" />
                <p className="font-bold italic uppercase tracking-widest text-xs">Your basket is empty</p>
                <button onClick={() => setIsCartOpen(false)} className="text-[#418f9f] font-black uppercase text-[10px] tracking-widest border-b-2 border-[#418f9f] pb-1">Start Shopping</button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4 bg-white/60 p-4 rounded-3xl border border-white group">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white border border-stone-100 flex-shrink-0">
                      <img src={item.image} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h4 className="font-black text-xs uppercase tracking-tight">{item.name}</h4>
                      <p className="text-[#418f9f] font-black text-[10px]">€{item.price.toFixed(2)}</p>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-[8px] font-black bg-[#ffcc5c]/20 text-[#ffcc5c] px-2 py-0.5 rounded uppercase tracking-tighter">Unique Piece</span>
                        <button onClick={() => removeFromCart(item.id)} className="text-stone-300 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {isAdmin && soldOutProducts.length > 0 && (
              <div className="pt-8 border-t border-stone-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#418f9f] flex items-center gap-2">
                    <RotateCcw className="w-3 h-3" /> Recent Sales
                  </h3>
                  <span className="text-[8px] font-black bg-[#418f9f]/10 text-[#418f9f] px-2 py-1 rounded uppercase tracking-tighter">Admin View</span>
                </div>
                <div className="space-y-3">
                  {soldOutProducts.map(product => (
                    <div key={product.id} className="flex items-center gap-4 bg-stone-100/50 p-3 rounded-2xl border border-stone-200/50 opacity-80 hover:opacity-100 transition-opacity">
                      <img src={product.image} className="w-10 h-10 rounded-lg object-cover grayscale" />
                      <div className="flex-1">
                        <p className="text-[9px] font-black uppercase truncate max-w-[120px]">{product.name}</p>
                      </div>
                      <button 
                        onClick={() => revertSale(product.id)}
                        className="bg-white text-[#418f9f] p-2 px-3 rounded-xl shadow-sm hover:bg-[#418f9f] hover:text-white transition-all text-[8px] font-black uppercase tracking-tighter"
                      >
                        Re-List
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {cart.length > 0 && checkoutStep === 'cart' && (
            <div className="p-8 bg-white border-t border-stone-200 space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-stone-400 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span>€{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-stone-400 uppercase tracking-widest">
                  <span>Shipping</span>
                  <span className="text-green-500">Free</span>
                </div>
                <div className="flex justify-between text-xl font-black uppercase tracking-tighter pt-2 border-t border-dashed border-stone-200 mt-2">
                  <span>Total</span>
                  <span className="text-[#418f9f]">€{cartTotal.toFixed(2)}</span>
                </div>
              </div>
              <button 
                onClick={handleCheckout}
                className="w-full bg-[#418f9f] hover:bg-[#ffcc5c] text-white py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-[10px] transition-all flex items-center justify-center gap-3 shadow-xl"
              >
                <CreditCard className="w-4 h-4" /> Secure Checkout
              </button>
            </div>
          )}

          {checkoutStep === 'processing' && (
            <div className="absolute inset-0 bg-[#f4f1ea]/90 backdrop-blur-md z-[120] flex flex-col items-center justify-center text-center p-8 space-y-6">
              <div className="w-16 h-16 border-4 border-[#418f9f]/20 border-t-[#418f9f] rounded-full animate-spin"></div>
              <div className="space-y-2">
                <h3 className="font-black uppercase tracking-widest text-sm">Processing Payment</h3>
                <p className="text-xs font-medium italic text-stone-400">Verifying with the Crochet Council...</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- NAVIGATION --- */}
      {view !== 'hero' && (
        <nav className="fixed top-0 w-full z-50 bg-[#f4f1ea]/80 backdrop-blur-xl py-6 shadow-xl shadow-stone-900/5 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-3 items-center">
            <div className="flex items-center space-x-10">
              <button onClick={goToShop} className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${view === 'shop' && !showContactForm ? 'text-[#ffcc5c]' : 'text-[#418f9f] hover:text-[#ffcc5c]'}`}>Shop All</button>
              <button onClick={goToCustom} className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${view === 'shop' && showContactForm ? 'text-[#ffcc5c]' : 'text-[#4a4a4a] hover:text-[#418f9f]'}`}>Custom Request</button>
              <button onClick={goToAbout} className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${view === 'about' ? 'text-[#ffcc5c]' : 'text-[#4a4a4a] hover:text-[#418f9f]'}`}>About Leah</button>
            </div>
            <div className="flex justify-center">
              <img src={logoUrl} alt="Leah Made" className="object-contain h-16 md:h-20 hover:scale-110 cursor-pointer" onClick={() => setView('hero')} />
            </div>
            <div className="flex items-center justify-end space-x-4">
              {isAdmin && (
                <button onClick={handleLogout} className="p-3.5 bg-[#ffcc5c]/10 text-[#ffcc5c] rounded-full border border-[#ffcc5c]/20 flex items-center gap-2 group px-5">
                   <Unlock className="w-4 h-4" />
                   <span className="text-[8px] font-black uppercase tracking-widest">Logout</span>
                </button>
              )}
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="p-3.5 bg-white/40 border-white/60 text-[#418f9f] rounded-full border shadow-sm hover:text-[#ffcc5c] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <button onClick={() => { setIsCartOpen(true); setCheckoutStep('cart'); }} className="p-3.5 bg-[#418f9f] rounded-full text-white shadow-lg relative transition-transform hover:scale-105 active:scale-95">
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#ffcc5c] text-white text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center animate-in zoom-in">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </nav>
      )}

      {view === 'hero' ? (
        <section className="h-screen w-full relative flex items-center justify-center overflow-hidden">
          <div className="max-w-5xl mx-auto px-8 text-center relative z-10 animate-in fade-in duration-1000">
            <div className="inline-flex items-center gap-4 bg-white/20 px-10 py-4 rounded-full border border-white/30 mb-12 backdrop-blur-sm">
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-[#418f9f]">Crochet Masterpieces</span>
              <Sparkles className="text-[#ffcc5c] w-3.5 h-3.5 animate-pulse" />
            </div>
            <div className="flex flex-col items-center gap-2 mb-16 relative">
              <img src={logoUrl} alt="Leah Made" className="h-64 md:h-[32rem] object-contain transition-all duration-700 hover:rotate-1" />
              <div className="text-[#ffcc5c] opacity-60"><ScribbleUnderline /></div>
            </div>
            <p className="text-xl md:text-2xl font-medium text-[#4a4a4a]/50 uppercase tracking-[1em] italic mb-12">Made with <Heart className="inline-block w-5 h-5 mx-2 text-[#ffcc5c]/60 fill-current" /> love</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
              <button onClick={goToShop} className="bg-[#418f9f] text-white px-14 py-7 rounded-full font-black text-xs uppercase tracking-[0.3em] shadow-2xl hover:bg-[#ffcc5c] transition-all flex items-center gap-5 group">Shop the Collection <ArrowRight className="w-4 h-4" /></button>
              <button onClick={goToAbout} className="bg-white/30 text-[#418f9f] px-14 py-7 rounded-full font-black text-xs uppercase tracking-[0.3em] border border-white/40 backdrop-blur-sm transition-all">About Leah</button>
            </div>
          </div>
        </section>
      ) : view === 'about' ? (
        <div className="max-w-5xl mx-auto px-8 pb-32 pt-52 animate-in slide-in-from-bottom-8 duration-700 text-center">
          <div className="mb-20">
            <div className="relative inline-block">
              <div className="w-72 h-96 md:w-96 md:h-[30rem] rounded-[5rem] overflow-hidden shadow-2xl relative border-[12px] border-white z-10 mx-auto">
                <img src={leahPhotoUrl} alt="Leah Made" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#ffcc5c]/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#418f9f]/10 rounded-full blur-3xl"></div>
            </div>
          </div>
          
          <div className="space-y-12 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-3 bg-[#ffcc5c]/10 px-6 py-2 rounded-full border border-[#ffcc5c]/20">
               <Flower2 className="w-4 h-4 text-[#ffcc5c]" />
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ffcc5c]">The Leah Made Story</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black text-[#418f9f] uppercase tracking-tighter leading-none italic">My Story.</h2>
            
            <div className="space-y-8 text-[#4a4a4a]/80 font-medium leading-relaxed text-lg md:text-xl">
              <p>
                Since 2026, I have been creating unique, hand-crocheted plushies under the name <strong>Leah Made</strong>. What started as a small hobby at the kitchen table has grown into a dedicated studio where magic and craftsmanship meet every single day.
              </p>
              <p>
                Every creation at Leah Made begins as a simple ball of yarn and is transformed through endless patience, thousands of tiny stitches, and a healthy dose of creativity into a loyal companion for life. I believe that handwork has a soul; no two plushies are exactly the same, and that is precisely what makes them so special.
              </p>
              <p>
                In a world that is constantly speeding up, I consciously choose <em>slow design</em>. I take the time for every detail, from the sparkle in the safety eyes to the selection of the softest, sustainable materials that guarantee years of cuddling pleasure. Whether it's a dragon from the Fantasy Collection or a personalized request, every stitch is made with the thought of the smile it will bring.
              </p>
              <p>
                My mission is simple: to bring a little more magic into the world, one stitch at a time. Thank you for being part of this journey and for supporting the art of handmade.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-12 text-left">
                <a 
                  href={INSTAGRAM_URL} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex items-center justify-between bg-white p-8 rounded-[2.5rem] border-4 border-[#ffcc5c] shadow-xl hover:shadow-[#ffcc5c]/20 transition-all transform hover:-translate-y-1"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-[#ffcc5c]/10 rounded-2xl flex items-center justify-center text-[#418f9f] group-hover:bg-[#ffcc5c] group-hover:text-white transition-colors duration-500">
                      <Instagram className="w-8 h-8" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-black uppercase tracking-widest text-[#418f9f]">Instagram</span>
                      <span className="text-xl md:text-2xl font-black text-stone-800 tracking-tight">@leahmade.be</span>
                    </div>
                  </div>
                  <ExternalLink className="w-6 h-6 text-[#ffcc5c]" />
                </a>

                <a 
                  href="mailto:hello@leahmade.be" 
                  className="group flex items-center justify-between bg-white p-8 rounded-[2.5rem] border-2 border-stone-100 shadow-lg hover:shadow-xl hover:border-[#418f9f] transition-all transform hover:-translate-y-1"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center text-stone-400 group-hover:bg-[#418f9f] group-hover:text-white transition-colors duration-500">
                      <Mail className="w-8 h-8" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-black uppercase tracking-widest text-stone-400">Email Me</span>
                      <span className="text-xl md:text-2xl font-black text-stone-800 tracking-tight">hello@leahmade.be</span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-6 h-6 text-stone-300" />
                </a>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-16 opacity-60">
                <div className="space-y-2">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-[#418f9f]">Technique</h4>
                  <p className="text-sm">Traditional Amigurumi with a modern, playful twist and focus on character design.</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-[#418f9f]">Materials</h4>
                  <p className="text-sm">Only premium quality cotton and hypoallergenic stuffing for ultimate safety and softness.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-[1440px] mx-auto px-8 lg:px-24 pb-32 pt-52 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="w-full lg:w-72 flex-shrink-0">
              <div className="lg:sticky lg:top-32 space-y-8">
                <div className="bg-white/60 backdrop-blur-md p-10 rounded-[3.5rem] shadow-xl border border-white/40">
                  <h3 className="font-black text-[11px] text-[#418f9f] mb-8 uppercase tracking-[0.4em] flex items-center gap-3"><HeartPulse className="w-4 h-4 text-[#ffcc5c]" /> Collections</h3>
                  <ul className="space-y-3">
                    {CATEGORIES.map(cat => (
                      <li key={cat.name}>
                        <button onClick={() => {setActiveCategory(cat.name); setShowContactForm(false); setSelectedProduct(null);}} className={`text-left w-full px-6 py-4 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest flex items-center justify-between ${activeCategory === cat.name && !showContactForm ? 'bg-[#418f9f] text-white shadow-lg' : 'bg-white/40 text-[#4a4a4a] hover:bg-white'}`}>
                          <div className="flex flex-col gap-1"><span>{cat.name}</span>{cat.comingSoon && <span className="text-[7px] text-[#ffcc5c] font-black">Coming Soon</span>}</div>
                          {activeCategory === cat.name && !showContactForm && <YarnBallFace className="scale-75" />}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-12 pt-10 border-t border-stone-200/50">
                    <button onClick={() => {setShowContactForm(true); setSelectedProduct(null);}} className={`w-full p-8 rounded-[2.5rem] transition-all flex flex-col items-center gap-6 border shadow-xl ${showContactForm ? 'bg-[#ffcc5c] text-white' : 'bg-[#418f9f] text-white'}`}>
                      <Wand2 className={`w-8 h-8 ${showContactForm ? 'animate-pulse' : ''}`} /><span className="block font-black text-lg uppercase tracking-[0.1em]">Custom Plushy</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1">
              {showContactForm ? (
                <div className="bg-white/60 backdrop-blur-md rounded-[4rem] border border-white/40 shadow-2xl p-10 md:p-20 text-center animate-in zoom-in-95">
                  <h2 className="text-4xl md:text-5xl font-black text-[#418f9f] uppercase mb-8 italic">Let's Get In Touch</h2>
                  <p className="text-[#4a4a4a]/60 font-bold text-xs uppercase tracking-widest mb-16 max-w-lg mx-auto leading-relaxed">
                    I will reach out to you as soon as possible so we can discuss your idea for a personalised plushy
                  </p>
                  <form className="space-y-6 max-w-2xl mx-auto" onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <input type="text" className="w-full bg-white/50 border border-stone-200/50 rounded-2xl px-8 py-5 outline-none font-bold" placeholder="Your Name" />
                      <input type="email" className="w-full bg-white/50 border border-stone-200/50 rounded-2xl px-8 py-5 outline-none font-bold" placeholder="Email Address" />
                    </div>
                    <div className="relative">
                      <input type="tel" className="w-full bg-white/50 border border-stone-200/50 rounded-2xl px-8 py-5 outline-none font-bold" placeholder="Phone Number" />
                    </div>
                    <textarea rows="5" className="w-full bg-white/50 border border-stone-200/50 rounded-[2rem] px-8 py-8 outline-none font-bold" placeholder="Tell me about your dream plushy..."></textarea>
                    <button className="w-full bg-[#418f9f] text-white font-black py-6 rounded-2xl hover:bg-[#ffcc5c] uppercase tracking-[0.3em] flex items-center justify-center gap-4 text-[10px]">Send Request <Send className="w-4 h-4" /></button>
                  </form>
                </div>
              ) : isComingSoon ? (
                <div className="min-h-[60vh] flex flex-col items-center justify-center text-center bg-white/40 rounded-[4rem] border border-white border-dashed p-12 md:p-24 animate-in zoom-in-95">
                  <div className="w-32 h-32 bg-[#418f9f]/5 rounded-full flex items-center justify-center mb-12 relative">
                    <CrochetHookIcon className="w-12 h-12 text-[#418f9f]/30 animate-pulse" />
                    <Sparkles className="absolute top-4 right-4 w-6 h-6 text-[#ffcc5c]/40 animate-pulse" />
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black text-[#418f9f] uppercase mb-6 italic tracking-tighter">Coming Soon</h2>
                  <div className="w-24 h-1 bg-[#ffcc5c]/30 mb-8 rounded-full"></div>
                  <div className="max-w-md space-y-4">
                    <p className="text-[#4a4a4a]/70 font-bold text-[13px] uppercase tracking-[0.2em] leading-loose">
                      Leah is currently at her workbench, carefully hand-crocheting the first members of the <span className="text-[#418f9f] underline decoration-wavy decoration-[#ffcc5c] underline-offset-4">{activeCategory}</span>.
                    </p>
                    <p className="text-[#4a4a4a]/40 font-medium text-[10px] uppercase tracking-[0.3em] leading-relaxed italic">
                      Every row of stitches takes time to ensure your future companion is perfectly soft and ready for its new home. 
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="group flex flex-col cursor-pointer" onClick={() => openDetails(product)}>
                      <div className="relative aspect-[4/5] bg-white rounded-[3rem] overflow-hidden mb-8 shadow-sm border border-stone-100 group-hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className={`w-full h-full object-cover scale-110 group-hover:scale-[1.15] transition-transform duration-1000 ${product.isSoldOut ? 'grayscale opacity-60' : ''}`} 
                        />
                        {product.isSoldOut && (
                          <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-[2px] flex items-center justify-center p-6">
                            <div className="bg-white/90 px-8 py-3 rounded-2xl rotate-[-5deg] border-2 border-[#418f9f] shadow-lg">
                              <span className="font-black uppercase tracking-[0.3em] text-[10px] text-[#418f9f]">Adopted / Sold Out</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="text-center px-4">
                        <p className="text-[#418f9f] font-black text-[8px] uppercase tracking-[0.4em] mb-3 opacity-40">{product.category}</p>
                        <h3 className="text-xl font-black text-[#4a4a4a] mb-6 uppercase tracking-tight">{product.name}</h3>
                        <div className="flex items-center justify-center gap-4">
                          <span className="font-black text-lg text-[#418f9f]">€{product.price.toFixed(2)}</span>
                          {product.isSoldOut ? (
                            <button className="bg-stone-200 text-stone-400 font-black px-6 py-3 rounded-xl text-[9px] uppercase tracking-[0.2em] cursor-not-allowed">Sold Out</button>
                          ) : (
                            <button onClick={(e) => addToCart(product, e)} className="bg-white/40 border border-white/60 text-[#418f9f] font-black px-6 py-3 rounded-xl hover:bg-[#418f9f] hover:text-white transition-all text-[9px] uppercase tracking-[0.2em]">Add to Basket</button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- QUICK VIEW POP-UP FEATURE --- */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-stone-900/30 backdrop-blur-md" onClick={() => setSelectedProduct(null)}></div>
          <div className="relative bg-[#f4f1ea] w-full max-w-5xl rounded-[4rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-500 border border-white/60 max-h-[90vh]">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-8 right-8 z-10 p-3 bg-white/80 rounded-full text-stone-400 hover:text-[#418f9f] hover:rotate-90 transition-all"><X className="w-6 h-6" /></button>
            <div className="w-full md:w-1/2 p-8 md:p-12 space-y-6">
              <div className="aspect-square bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-white relative">
                <img src={selectedProduct.images[activeImageIndex]} alt={selectedProduct.name} className={`w-full h-full object-cover transition-opacity duration-300 ${selectedProduct.isSoldOut ? 'grayscale opacity-50' : ''}`}/>
                {selectedProduct.isSoldOut && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-white/90 text-[#418f9f] font-black px-10 py-4 rounded-3xl border-4 border-dashed border-[#418f9f] text-xl uppercase tracking-widest rotate-[-10deg] shadow-2xl">Sold Out</span>
                  </div>
                )}
              </div>
              <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
                {selectedProduct.images.map((img, idx) => (
                  <button key={idx} onClick={() => setActiveImageIndex(idx)} className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl flex-shrink-0 overflow-hidden border-2 transition-all ${activeImageIndex === idx ? 'border-[#ffcc5c] scale-105 shadow-md' : 'border-transparent opacity-40'}`}><img src={img} className="w-full h-full object-cover" /></button>
                ))}
              </div>
            </div>
            <div className="flex-1 p-8 md:p-16 overflow-y-auto">
              <span className="text-[10px] font-black text-[#418f9f] uppercase tracking-[0.5em] mb-4 block">{selectedProduct.category}</span>
              <h2 className="text-4xl md:text-5xl font-black uppercase text-[#4a4a4a] tracking-tighter leading-tight mb-4">{selectedProduct.name}</h2>
              <div className="flex items-center gap-6 mb-8">
                <p className="text-3xl font-black text-[#418f9f]">€{selectedProduct.price.toFixed(2)}</p>
                <span className="bg-[#ffcc5c]/10 text-[#ffcc5c] text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest flex items-center gap-2">
                  <Star className="w-3 h-3 fill-current" /> Unique 1 of 1
                </span>
              </div>
              <p className="text-lg leading-relaxed text-[#4a4a4a]/70 font-medium italic mb-10">{selectedProduct.description}</p>
              <div className="grid grid-cols-1 gap-6 mb-12">
                <div className="bg-white/50 p-8 rounded-[2.5rem] border border-white/80 shadow-sm">
                  <h4 className="text-[11px] font-black uppercase tracking-[0.4em] mb-4 flex items-center gap-3 text-[#418f9f]"><CrochetHookIcon className="w-4 h-4 text-[#ffcc5c]" /> Crafting Details</h4>
                  {selectedProduct.details.map((d, i) => (<div key={i} className="flex items-center gap-4 text-[11px] font-bold text-[#4a4a4a]/60 mt-2"><CheckCircle2 className="w-4 h-4 text-[#ffcc5c]" /> {d}</div>))}
                </div>
              </div>
              {selectedProduct.isSoldOut ? (
                <div className="bg-stone-100 p-8 rounded-3xl border border-stone-200 text-center">
                  <p className="font-black text-[#4a4a4a]/40 uppercase tracking-[0.2em] text-[10px] mb-4">This little one has already found its forever home.</p>
                  {isAdmin && (
                    <button 
                      onClick={() => revertSale(selectedProduct.id)}
                      className="text-[#418f9f] font-black uppercase text-[9px] tracking-widest border-b border-[#418f9f] pb-0.5"
                    >
                      Oops, Revert Sale
                    </button>
                  )}
                </div>
              ) : (
                <button onClick={() => addToCart(selectedProduct)} className="w-full bg-[#418f9f] text-white py-8 rounded-3xl font-black uppercase tracking-[0.4em] text-xs shadow-2xl hover:bg-[#ffcc5c] transition-all flex items-center justify-center gap-4 group">Add to Basket <ShoppingBag className="w-5 h-5 group-hover:rotate-12 transition-transform" /></button>
              )}
            </div>
          </div>
        </div>
      )}

      <footer className="bg-white/40 backdrop-blur-md border-t border-white/60 py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-8 lg:px-24 text-center">
          <button 
            onClick={() => setShowLoginModal(true)} 
            className="mb-8 p-4 bg-[#f4f1ea] rounded-full text-stone-300 hover:text-[#418f9f] transition-colors"
            title="Studio Entry"
          >
            <Lock className="w-4 h-4" />
          </button>
          <div className="mb-8 flex justify-center space-x-12">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-[#418f9f] transition-all hover:scale-110">
              <Instagram />
            </a>
            <a href="mailto:hello@leahmade.be" className="text-stone-400 hover:text-[#418f9f] transition-all hover:scale-110">
              <Mail />
            </a>
          </div>
          <div className="mb-8">
            <img src={logoUrl} alt="Logo" className="h-12 w-auto mx-auto grayscale opacity-30" />
          </div>
          <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#4a4a4a]/20">© 2026 Leah Made Studio • Handmade in Belgium</p>
        </div>
      </footer>
    </div>
  );
}