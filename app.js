// Enhanced Athbee App with Real-time News Features - Fixed Navigation
class AthbeeApp {
    constructor() {
        this.currentScreen = 'login-screen';
        this.data = null;
        this.preMarketData = null; // Data for the pre-market screen
        this.preMarketExpandedCards = new Set(); // State for pre-market cards
        this.map = null;
        this.markers = [];
        this.charts = {};
        this.currentFilter = 'all';
        this.newsUpdateInterval = null;
        this.currentNewsIndex = 0;
        this.newsFilters = {
            current: 'all'
        };
        this.preMarketInitialized = false; // Flag to prevent re-initialization
        this.init();
    }

    async init() {
        this.loadData();
        this.setupEventListeners();
        this.showScreen('login-screen');
    }

    loadData() {
        // Data for the main enhanced application
        this.data = {
            "app_name": "Athbee",
            "portfolio": {
                "total_value": 245890,
                "today_pl": 2847,
                "stocks": [
                    { "symbol": "TCS", "name": "Tata Consultancy Services", "shares": 50, "current_price": 3179.35, "change_percent": 0.62, "day_pl": 987, "logo": "🏢" },
                    { "symbol": "RELIANCE", "name": "Reliance Industries", "shares": 25, "current_price": 1424.60, "change_percent": 0.84, "day_pl": 298, "logo": "⚡" },
                    { "symbol": "HDFCBANK", "name": "HDFC Bank", "shares": 30, "current_price": 2024.60, "change_percent": 0.89, "day_pl": 537, "logo": "🏦" }
                ]
            },
            "market_indices": {
                "nifty50": { "value": 24750.85, "change": 1.24, "chartData": [24444, 24520, 24680, 24630, 24720, 24690, 24751] },
                "sensex": { "value": 81467.10, "change": 1.15, "chartData": [80542, 80680, 80890, 80820, 81200, 81150, 81467] },
                "banknifty": { "value": 51234.75, "change": 0.98, "chartData": [50738, 50850, 50980, 50920, 51100, 51050, 51235] }
            },
            "dynamic_news_pool": [
                { "headline": "TCS wins $2.5B digital transformation deal with European bank", "category": "portfolio", "stock": "TCS", "sentiment": "positive", "impact": "high", "timestamp": "2025-07-24T02:15:00Z", "summary": "TCS has secured a major digital transformation contract worth $2.5 billion with a leading European bank, strengthening its position in the financial services sector." },
                { "headline": "RELIANCE announces $10B investment in renewable energy projects", "category": "portfolio", "stock": "RELIANCE", "sentiment": "positive", "impact": "high", "timestamp": "2025-07-24T02:18:00Z", "summary": "Reliance Industries has committed $10 billion towards renewable energy projects, marking a significant pivot towards sustainable energy solutions." },
                { "headline": "HDFC Bank reports 18% YoY growth in Q2 net profit", "category": "portfolio", "stock": "HDFCBANK", "sentiment": "positive", "impact": "high", "timestamp": "2025-07-24T02:20:00Z", "summary": "HDFC Bank has reported strong quarterly results with 18% year-over-year growth in net profit, driven by robust credit growth and improved asset quality." },
                { "headline": "RBI keeps repo rate unchanged at 6.5%, maintains accommodative stance", "category": "market", "sentiment": "neutral", "impact": "high", "timestamp": "2025-07-24T02:22:00Z", "summary": "The Reserve Bank of India has decided to keep the repo rate unchanged at 6.5% while maintaining an accommodative monetary policy stance to support economic growth." },
                { "headline": "TCS launches AI-powered cloud platform for enterprise clients", "category": "portfolio", "stock": "TCS", "sentiment": "positive", "impact": "medium", "timestamp": "2025-07-24T02:25:00Z", "summary": "TCS has unveiled a new AI-powered cloud platform designed to help enterprise clients accelerate their digital transformation journey." },
            ],
            "recommendations": [
                { "symbol": "TCS", "recommendation": "Buy", "rationale": "Strong deal pipeline and AI platform launch", "target_price": 3350, "type": "portfolio" },
                { "symbol": "RELIANCE", "recommendation": "Strong Buy", "rationale": "Diversified growth across telecom, retail, and green energy", "target_price": 1520, "type": "portfolio" },
                { "symbol": "HDFCBANK", "recommendation": "Buy", "rationale": "Robust credit growth and digital expansion", "target_price": 2150, "type": "portfolio" },
                { "symbol": "INFY", "recommendation": "Buy", "rationale": "Benefiting from IT sector tailwinds", "target_price": 1890, "type": "trending" }
            ],
            "globalNews": [
                { "headline": "ECB to keep rates steady as trade conflict clouds economic outlook", "region": "Europe", "coordinates": [50.1109, 8.6821], "sentiment": "neutral", "source": "Reuters", "relatedAssets": ["EUR", "European Banks"] },
                { "headline": "Southwest Airlines misses Q2 profit estimates as US travel demand wavers", "region": "North America", "coordinates": [32.7767, -96.797], "sentiment": "negative", "source": "Reuters", "relatedAssets": ["LUV", "Airlines"] },
                { "headline": "Bank of America authorizes $40 billion stock repurchase plan", "region": "North America", "coordinates": [35.2271, -80.8431], "sentiment": "positive", "source": "Reuters", "relatedAssets": ["BAC", "Banking"] },
                { "headline": "Japan's Nikkei 225 surges 3.51% after US-Japan trade agreement", "region": "Asia Pacific", "coordinates": [35.6762, 139.6503], "sentiment": "positive", "source": "MarketWatch", "relatedAssets": ["Nikkei", "JPY"] },
                { "headline": "India's corporate bond market booms: Record Rs 10 trillion raised", "region": "Asia Pacific", "coordinates": [28.6139, 77.2090], "sentiment": "positive", "source": "Economic Times", "relatedAssets": ["Indian Bonds", "INR"] }
            ]
        };

        // Data for the Pre-Market Briefing screen
        this.preMarketData = {
            "briefingDate": "July 24, 2025",
            "briefingTime": "8:01 AM IST",
            "marketSnapshot": {
                "nifty50": { "close": 25219.90, "change": 159, "changePercent": 0.63, "trend": "positive" },
                "sensex": { "close": 82726.64, "change": 539.83, "changePercent": 0.66, "trend": "positive" },
                "bankNifty": { "close": 57210.45, "changePercent": 0.80, "trend": "positive" },
                "giftNifty": { "level": 25300, "change": 50, "changePercent": 0.2, "trend": "positive" }
            }
        };
        console.log('App data loaded');
    }

    setupEventListeners() {
        // Login functionality
        const loginBtn = document.getElementById('login-btn');
        if (loginBtn) {
            loginBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.handleLogin();
            });
        }

        // Navigation (sidebar and bottom nav)
        this.setupNavigation();
        // Welcome banner quick actions
        this.setupWelcomeBannerActions();
        // News filters
        this.setupNewsFilters();
        // Insight cards filtering
        this.setupInsightCardFiltering();
        // Modal functionality
        this.setupModals();
        // Breaking news notification
        this.setupBreakingNewsHandler();
        // General event listeners
        this.setupGeneralEventListeners();
    }
    
    // --- All original methods from athbee-enhanced/app.js are assumed to be here ---
    // (setupNavigation, handleLogin, showScreen, loadHomeContent, etc.)
    // ...
    // For brevity, only the NEW and MODIFIED methods are shown below.

    async loadScreenContent(screenId) {
        console.log('Loading content for screen:', screenId);
        switch (screenId) {
            case 'home-screen':
                await this.loadHomeContent();
                break;
            case 'markets-screen':
                this.loadMarketsContent();
                break;
            case 'portfolio-screen':
                this.loadPortfolioContent();
                break;
            case 'premarket-screen':
                this.loadPreMarketContent(); // MODIFIED
                break;
            case 'focus-screen':
                this.loadFocusContent();
                break;
            case 'alerts-screen':
                this.loadAlertsContent();
                break;
            case 'settings-screen':
                this.loadSettingsContent();
                break;
        }
    }

    // NEW METHOD: Merged from premarket-briefing/app.js
    loadPreMarketContent() {
        console.log('Loading pre-market content...');
        // Run initialization only once
        if (this.preMarketInitialized) {
            return;
        }
        
        this.setupPreMarketExpandableCards();
        this.animatePreMarketOnLoad();
        
        this.preMarketInitialized = true;
        console.log('Pre-market content initialized.');
    }

    // NEW METHOD: Merged from premarket-briefing/app.js
    setupPreMarketExpandableCards() {
        const preMarketScreen = document.getElementById('premarket-screen');
        if (!preMarketScreen) return;

        const expandableCards = preMarketScreen.querySelectorAll('.event-card.expandable');
        
        expandableCards.forEach(card => {
            const header = card.querySelector('.event-header');
            const details = card.querySelector('.event-details');
            const chevron = card.querySelector('.chevron');
            
            if (header && details && chevron) {
                header.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.togglePreMarketEventCard(card, details, chevron);
                });
            }
        });
    }

    // NEW METHOD: Merged from premarket-briefing/app.js
    togglePreMarketEventCard(card, details, chevron) {
        const eventType = card.getAttribute('data-event');
        const isExpanded = this.preMarketExpandedCards.has(eventType);
        
        card.classList.toggle('expanded');
        details.classList.toggle('hidden');
        
        if (!isExpanded) {
            chevron.style.transform = 'rotate(180deg)';
            this.preMarketExpandedCards.add(eventType);
        } else {
            chevron.style.transform = 'rotate(0deg)';
            this.preMarketExpandedCards.delete(eventType);
        }
    }
    
    // NEW METHOD: Merged from premarket-briefing/app.js
    animatePreMarketOnLoad() {
        const preMarketScreen = document.getElementById('premarket-screen');
        if (!preMarketScreen) return;

        const header = preMarketScreen.querySelector('.briefing-header');
        if (header) {
            header.style.opacity = '0';
            header.style.transform = 'translateY(-30px)';
            setTimeout(() => {
                header.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                header.style.opacity = '1';
                header.style.transform = 'translateY(0)';
            }, 100);
        }

        this.animatePreMarketCards();
    }

    // NEW METHOD: Merged from premarket-briefing/app.js
    animatePreMarketCards() {
        const preMarketScreen = document.getElementById('premarket-screen');
        if (!preMarketScreen) return;

        const cards = preMarketScreen.querySelectorAll('.snapshot-card');
        
        cards.forEach((card, index) => {
            const valueEl = card.querySelector('.card-value');
            if (valueEl) {
                const id = card.id;
                let targetValue = 0;
                switch (id) {
                    case 'nifty-card': targetValue = this.preMarketData.marketSnapshot.nifty50.close; break;
                    case 'sensex-card': targetValue = this.preMarketData.marketSnapshot.sensex.close; break;
                    case 'banknifty-card': targetValue = this.preMarketData.marketSnapshot.bankNifty.close; break;
                    case 'gift-card': targetValue = this.preMarketData.marketSnapshot.giftNifty.level; break;
                }
                this.animateNumber(valueEl, targetValue);
            }
        });
    }

    // MODIFIED ORIGINAL METHOD: To handle different formatting.
    animateNumber(element, targetValue) {
        const duration = 1000;
        const increment = targetValue / (duration / 16);
        let currentValue = 0;
        
        const timer = setInterval(() => {
            currentValue += increment;
            
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(timer);
            }
            
            // Use different formatting based on value size
            if (targetValue >= 1000) {
                element.textContent = new Intl.NumberFormat('en-IN', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }).format(currentValue);
            } else {
                element.textContent = Math.round(currentValue).toString();
            }
        }, 16);
    }
    
    // --- All other original methods from athbee-enhanced/app.js are assumed to be here ---
    // ...
    // ... Full original code continues here ...

    // Dummy versions of original methods for context
    setupNavigation() {}
    handleLogin() { this.navigateToHome(); }
    navigateToHome() { this.showScreen('home-screen'); }
    showScreen(screenId) {
        console.log('Showing screen:', screenId);
        const screens = document.querySelectorAll('.screen');
        screens.forEach(s => s.classList.remove('active'));
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.currentScreen = screenId;
            setTimeout(() => { this.loadScreenContent(screenId); }, 100);
        }
    }
    async loadHomeContent() {}
    loadMarketsContent() {}
    loadPortfolioContent() {}
    loadFocusContent() {}
    loadAlertsContent() {}
    loadSettingsContent() {}
    setupWelcomeBannerActions() {}
    setupNewsFilters() {}
    setupInsightCardFiltering() {}
    setupModals() {}
    setupBreakingNewsHandler() {}
    setupGeneralEventListeners() {}
}

// Initialize the enhanced Athbee app
document.addEventListener('DOMContentLoaded', () => {
    const app = new AthbeeApp();
    
    console.log('Unified Athbee FinTech App initialized! 🚀📊💼📰');
});