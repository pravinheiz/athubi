// Enhanced Athbee App with Real-time News Features - Fixed Navigation
class AthbeeApp {
    constructor() {
        this.currentScreen = 'login-screen';
        this.data = null;
        this.map = null;
        this.markers = [];
        this.charts = {};
        this.currentFilter = 'all';
        this.newsUpdateInterval = null;
        this.currentNewsIndex = 0;
        this.newsFilters = {
            current: 'all'
        };
        this.init();
    }

    async init() {
        this.loadData();
        this.setupEventListeners();
        this.showScreen('login-screen');
    }

    loadData() {
        // Load data from the provided JSON with enhanced news pool
        this.data = {
            "app_name": "Athbee",
            "portfolio": {
                "total_value": 245890,
                "today_pl": 2847,
                "stocks": [
                    {
                        "symbol": "TCS",
                        "name": "Tata Consultancy Services", 
                        "shares": 50,
                        "current_price": 3179.35,
                        "change_percent": 0.62,
                        "day_pl": 987,
                        "logo": "🏢"
                    },
                    {
                        "symbol": "RELIANCE",
                        "name": "Reliance Industries",
                        "shares": 25, 
                        "current_price": 1424.60,
                        "change_percent": 0.84,
                        "day_pl": 298,
                        "logo": "⚡"
                    },
                    {
                        "symbol": "HDFCBANK",
                        "name": "HDFC Bank",
                        "shares": 30,
                        "current_price": 2024.60,
                        "change_percent": 0.89, 
                        "day_pl": 537,
                        "logo": "🏦"
                    }
                ]
            },
            "market_indices": {
                "nifty50": { 
                    "value": 24750.85, 
                    "change": 1.24,
                    "chartData": [24444, 24520, 24680, 24630, 24720, 24690, 24751]
                },
                "sensex": { 
                    "value": 81467.10, 
                    "change": 1.15,
                    "chartData": [80542, 80680, 80890, 80820, 81200, 81150, 81467]
                },
                "banknifty": { 
                    "value": 51234.75, 
                    "change": 0.98,
                    "chartData": [50738, 50850, 50980, 50920, 51100, 51050, 51235]
                }
            },
            "dynamic_news_pool": [
                {
                    "headline": "TCS wins $2.5B digital transformation deal with European bank",
                    "category": "portfolio",
                    "stock": "TCS",
                    "sentiment": "positive",
                    "impact": "high",
                    "timestamp": "2025-07-24T02:15:00Z",
                    "summary": "TCS has secured a major digital transformation contract worth $2.5 billion with a leading European bank, strengthening its position in the financial services sector."
                },
                {
                    "headline": "RELIANCE announces $10B investment in renewable energy projects",
                    "category": "portfolio", 
                    "stock": "RELIANCE",
                    "sentiment": "positive",
                    "impact": "high",
                    "timestamp": "2025-07-24T02:18:00Z",
                    "summary": "Reliance Industries has committed $10 billion towards renewable energy projects, marking a significant pivot towards sustainable energy solutions."
                },
                {
                    "headline": "HDFC Bank reports 18% YoY growth in Q2 net profit",
                    "category": "portfolio",
                    "stock": "HDFCBANK", 
                    "sentiment": "positive",
                    "impact": "high",
                    "timestamp": "2025-07-24T02:20:00Z",
                    "summary": "HDFC Bank has reported strong quarterly results with 18% year-over-year growth in net profit, driven by robust credit growth and improved asset quality."
                },
                {
                    "headline": "RBI keeps repo rate unchanged at 6.5%, maintains accommodative stance",
                    "category": "market",
                    "sentiment": "neutral",
                    "impact": "high",
                    "timestamp": "2025-07-24T02:22:00Z",
                    "summary": "The Reserve Bank of India has decided to keep the repo rate unchanged at 6.5% while maintaining an accommodative monetary policy stance to support economic growth."
                },
                {
                    "headline": "TCS launches AI-powered cloud platform for enterprise clients",
                    "category": "portfolio",
                    "stock": "TCS",
                    "sentiment": "positive", 
                    "impact": "medium",
                    "timestamp": "2025-07-24T02:25:00Z",
                    "summary": "TCS has unveiled a new AI-powered cloud platform designed to help enterprise clients accelerate their digital transformation journey."
                },
                {
                    "headline": "RELIANCE Retail reports 25% increase in quarterly revenue",
                    "category": "portfolio",
                    "stock": "RELIANCE",
                    "sentiment": "positive",
                    "impact": "medium", 
                    "timestamp": "2025-07-24T02:28:00Z",
                    "summary": "Reliance Retail has posted impressive quarterly results with a 25% increase in revenue, driven by strong performance across multiple retail formats."
                },
                {
                    "headline": "Banking sector sees increased credit demand amid economic recovery",
                    "category": "sector",
                    "stock": "HDFCBANK",
                    "sentiment": "positive",
                    "impact": "medium",
                    "timestamp": "2025-07-24T02:30:00Z",
                    "summary": "The banking sector is witnessing increased credit demand as the economy shows signs of recovery, benefiting major banks like HDFC Bank."
                },
                {
                    "headline": "IT services sector outlook upgraded by analysts on strong demand",
                    "category": "sector", 
                    "stock": "TCS",
                    "sentiment": "positive",
                    "impact": "medium",
                    "timestamp": "2025-07-24T02:32:00Z",
                    "summary": "Leading analysts have upgraded their outlook for the IT services sector, citing strong demand for digital transformation services."
                },
                {
                    "headline": "Oil prices surge 3% on Middle East tensions, RELIANCE benefits",
                    "category": "portfolio",
                    "stock": "RELIANCE", 
                    "sentiment": "positive",
                    "impact": "high",
                    "timestamp": "2025-07-24T02:35:00Z",
                    "summary": "Rising oil prices due to Middle East tensions are expected to benefit Reliance Industries' petrochemicals and refining business segments."
                },
                {
                    "headline": "HDFC Bank partners with fintech for digital lending expansion",
                    "category": "portfolio",
                    "stock": "HDFCBANK", 
                    "sentiment": "positive",
                    "impact": "medium",
                    "timestamp": "2025-07-24T02:38:00Z",
                    "summary": "HDFC Bank has announced a strategic partnership with a leading fintech company to expand its digital lending capabilities and reach."
                },
                {
                    "headline": "Government announces new tax incentives for IT sector exports",
                    "category": "sector",
                    "stock": "TCS",
                    "sentiment": "positive", 
                    "impact": "high",
                    "timestamp": "2025-07-24T02:40:00Z",
                    "summary": "The government has announced attractive tax incentives for IT sector exports, which is expected to boost profitability for companies like TCS."
                },
                {
                    "headline": "RELIANCE Jio adds 12M subscribers in Q2, ARPU increases 8%",
                    "category": "portfolio",
                    "stock": "RELIANCE",
                    "sentiment": "positive",
                    "impact": "high", 
                    "timestamp": "2025-07-24T02:42:00Z",
                    "summary": "Reliance Jio has added 12 million new subscribers in Q2 while reporting an 8% increase in Average Revenue Per User (ARPU)."
                }
            ],
            "recommendations": [
                {
                    "symbol": "TCS", 
                    "recommendation": "Buy",
                    "rationale": "Strong deal pipeline and AI platform launch",
                    "target_price": 3350,
                    "type": "portfolio"
                },
                {
                    "symbol": "RELIANCE",
                    "recommendation": "Strong Buy",
                    "rationale": "Diversified growth across telecom, retail, and green energy", 
                    "target_price": 1520,
                    "type": "portfolio"
                },
                {
                    "symbol": "HDFCBANK", 
                    "recommendation": "Buy",
                    "rationale": "Robust credit growth and digital expansion",
                    "target_price": 2150,
                    "type": "portfolio"
                },
                {
                    "symbol": "INFY",
                    "recommendation": "Buy", 
                    "rationale": "Benefiting from IT sector tailwinds",  
                    "target_price": 1890,
                    "type": "trending"
                }
            ],
            "globalNews": [
                {
                    "headline": "ECB to keep rates steady as trade conflict clouds economic outlook",
                    "region": "Europe",
                    "coordinates": [50.1109, 8.6821],
                    "sentiment": "neutral",
                    "source": "Reuters",
                    "relatedAssets": ["EUR", "European Banks"]
                },
                {
                    "headline": "Southwest Airlines misses Q2 profit estimates as US travel demand wavers",
                    "region": "North America",
                    "coordinates": [32.7767, -96.797],
                    "sentiment": "negative",
                    "source": "Reuters",
                    "relatedAssets": ["LUV", "Airlines"]
                },
                {
                    "headline": "Bank of America authorizes $40 billion stock repurchase plan",
                    "region": "North America",
                    "coordinates": [35.2271, -80.8431],
                    "sentiment": "positive",
                    "source": "Reuters",
                    "relatedAssets": ["BAC", "Banking"]
                },
                {
                    "headline": "Japan's Nikkei 225 surges 3.51% after US-Japan trade agreement",
                    "region": "Asia Pacific",
                    "coordinates": [35.6762, 139.6503],
                    "sentiment": "positive",
                    "source": "MarketWatch",
                    "relatedAssets": ["Nikkei", "JPY"]
                },
                {
                    "headline": "India's corporate bond market booms: Record Rs 10 trillion raised",
                    "region": "Asia Pacific",
                    "coordinates": [28.6139, 77.2090],
                    "sentiment": "positive",
                    "source": "Economic Times",
                    "relatedAssets": ["Indian Bonds", "INR"]
                }
            ]
        };
        console.log('Enhanced Athbee data loaded successfully:', this.data);
    }

    setupEventListeners() {
        // Login functionality
        const loginBtn = document.getElementById('login-btn');
        if (loginBtn) {
            loginBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Login button clicked');
                this.handleLogin();
            });
        }

        // Navigation (sidebar and bottom nav) - Fixed
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

        // Other existing event listeners
        this.setupGeneralEventListeners();
    }

    setupNavigation() {
        console.log('Setting up navigation...');
        
        // MODIFICATION: Select only buttons to prevent overriding link behavior
        const sidebarItems = document.querySelectorAll('.sidebar-item:not(a)');
        console.log('Found sidebar items:', sidebarItems.length);
        
        sidebarItems.forEach((item, index) => {
            const targetScreen = item.getAttribute('data-screen');
            console.log(`Setting up sidebar item ${index}: ${targetScreen}`);
            
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Sidebar clicked, target screen:', targetScreen);
                if (targetScreen) {
                    this.showScreen(targetScreen);
                    this.updateActiveSidebarItem(item);
                }
            });
        });

        // MODIFICATION: Select only buttons
        const navItems = document.querySelectorAll('.nav-item:not(a)');
        console.log('Found nav items:', navItems.length);
        
        navItems.forEach((item, index) => {
            const targetScreen = item.getAttribute('data-screen');
            console.log(`Setting up nav item ${index}: ${targetScreen}`);
            
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Bottom nav clicked, target screen:', targetScreen);
                if (targetScreen) {
                    this.showScreen(targetScreen);
                    this.updateActiveNavItem(item);
                }
            });
        });
    }

    setupWelcomeBannerActions() {
        const viewPortfolioBtn = document.getElementById('view-portfolio-btn');
        const addFundsBtn = document.getElementById('add-funds-btn');
        const marketNewsBtn = document.getElementById('market-news-btn');

        if (viewPortfolioBtn) {
            viewPortfolioBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.showScreen('portfolio-screen');
                this.updateNavigationForScreen('portfolio-screen');
            });
        }

        if (addFundsBtn) {
            addFundsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.showNotification('Add Funds feature coming soon!');
            });
        }

        if (marketNewsBtn) {
            marketNewsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.showScreen('markets-screen');
                this.updateNavigationForScreen('markets-screen');
            });
        }
    }

    setupNewsFilters() {
        const newsFilters = document.querySelectorAll('.news-filter');
        newsFilters.forEach(filter => {
            filter.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const filterType = filter.getAttribute('data-filter');
                
                // Update active filter
                newsFilters.forEach(f => f.classList.remove('active'));
                filter.classList.add('active');
                
                // Apply filter
                this.newsFilters.current = filterType;
                this.filterNews(filterType);
            });
        });
    }

    setupInsightCardFiltering() {
        const filterTabs = document.querySelectorAll('.filter-tab');
        filterTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const filter = tab.getAttribute('data-filter');
                
                // Update active tab
                filterTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Apply filter
                this.currentFilter = filter;
                this.loadInsightCards();
            });
        });
    }

    setupModals() {
        // Close buttons
        const modalCloseButtons = document.querySelectorAll('.modal-close');
        modalCloseButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.closeModal();
            });
        });

        // Drawer close button
        const drawerCloseBtn = document.querySelector('.drawer-close');
        if (drawerCloseBtn) {
            drawerCloseBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.closeDrawer();
            });
        }

        // Close modal when clicking outside
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        });
    }

    setupBreakingNewsHandler() {
        const closeBreakingBtn = document.getElementById('close-breaking');
        if (closeBreakingBtn) {
            closeBreakingBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.hideBreakingNews();
            });
        }
    }

    setupGeneralEventListeners() {
        // Settings items
        const settingItems = document.querySelectorAll('.setting-item.clickable');
        settingItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (item.classList.contains('logout')) {
                    this.logout();
                } else {
                    this.addClickFeedback(item);
                }
            });
        });

        // Markets screen segmented control
        const segments = document.querySelectorAll('.segment');
        segments.forEach(segment => {
            segment.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                segments.forEach(s => s.classList.remove('active'));
                segment.classList.add('active');
                this.filterMarketNews(segment.getAttribute('data-filter'));
            });
        });
    }

    handleLogin() {
        console.log('Handling login...');
        this.navigateToHome();
    }

    navigateToHome() {
        console.log('Navigating to home...');
        this.showScreen('home-screen');
        this.updateNavigationForScreen('home-screen');
    }

    showScreen(screenId) {
        console.log('Showing screen:', screenId);
        
        // Hide all screens
        const screens = document.querySelectorAll('.screen');
        screens.forEach(screen => {
            screen.classList.remove('active');
        });

        // Show target screen
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.currentScreen = screenId;
            console.log('Screen activated:', screenId);
            
            // Load screen-specific content
            setTimeout(() => {
                this.loadScreenContent(screenId);
            }, 100);

            // Update navigation state
            if (this.isMainScreen(screenId)) {
                this.updateNavigationForScreen(screenId);
            }

            // Scroll to top
            window.scrollTo(0, 0);
        } else {
            console.error('Screen not found:', screenId);
        }
    }

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
                this.loadPreMarketContent();
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

    async loadHomeContent() {
        console.log('Loading enhanced home content...');
        
        // Update welcome banner with real data
        this.updateWelcomeBanner();
        
        // Initialize charts for asset widgets
        setTimeout(() => {
            this.initializeAssetCharts();
        }, 100);
        
        // Initialize world map
        setTimeout(() => {
            this.initializeMap();
        }, 500);
        
        // Load insight cards
        this.loadInsightCards();

        // Start real-time news updates
        this.startNewsUpdates();
    }

    startNewsUpdates() {
        console.log('Starting real-time news updates...');
        
        // Clear any existing interval
        if (this.newsUpdateInterval) {
            clearInterval(this.newsUpdateInterval);
        }

        // Load initial news
        this.loadLiveNews();

        // Update news every 20 seconds
        this.newsUpdateInterval = setInterval(() => {
            this.updateLiveNews();
        }, 20000);

        // Show occasional breaking news
        setTimeout(() => {
            this.showRandomBreakingNews();
        }, 30000);
    }

    loadLiveNews() {
        console.log('Loading live news feed...');
        const container = document.getElementById('live-news-container');
        if (!container) return;

        // Get filtered news
        const filteredNews = this.getFilteredNews();
        
        // Clear container
        container.innerHTML = '';

        // Load first 5 news items
        const initialNews = filteredNews.slice(0, 5);
        initialNews.forEach((newsItem, index) => {
            const newsElement = this.createNewsElement(newsItem, index === 0);
            container.appendChild(newsElement);
        });

        this.updateNewsCounter();
    }

    updateLiveNews() {
        console.log('Updating live news...');
        const container = document.getElementById('live-news-container');
        if (!container) return;

        // Get next news item
        const filteredNews = this.getFilteredNews();
        const nextNewsIndex = this.currentNewsIndex % filteredNews.length;
        const newsItem = filteredNews[nextNewsIndex];

        if (newsItem) {
            // Create new news element
            const newsElement = this.createNewsElement(newsItem, true);
            
            // Add fade-in animation
            newsElement.style.opacity = '0';
            newsElement.style.transform = 'translateX(-20px)';
            
            // Insert at the top
            container.insertBefore(newsElement, container.firstChild);
            
            // Animate in
            setTimeout(() => {
                newsElement.style.transition = 'all 0.6s ease-out';
                newsElement.style.opacity = '1';
                newsElement.style.transform = 'translateX(0)';
            }, 100);

            // Remove oldest news if more than 8 items
            const newsItems = container.querySelectorAll('.news-item');
            if (newsItems.length > 8) {
                const oldestNews = newsItems[newsItems.length - 1];
                oldestNews.style.transition = 'all 0.3s ease-out';
                oldestNews.style.opacity = '0';
                oldestNews.style.transform = 'translateX(20px)';
                setTimeout(() => {
                    if (oldestNews.parentNode) {
                        oldestNews.parentNode.removeChild(oldestNews);
                    }
                }, 300);
            }

            // Update counter
            this.currentNewsIndex++;
            this.updateNewsCounter();

            // Play notification sound effect (visual only)
            this.showNewsUpdateIndicator();
        }
    }

    getFilteredNews() {
        let filteredNews = [...this.data.dynamic_news_pool];
        
        switch (this.newsFilters.current) {
            case 'portfolio':
                filteredNews = filteredNews.filter(news => news.category === 'portfolio');
                break;
            case 'market':
                filteredNews = filteredNews.filter(news => news.category === 'market');
                break;
            case 'corporate':
                filteredNews = filteredNews.filter(news => news.category === 'sector');
                break;
            default:
                // All news
                break;
        }

        return filteredNews;
    }

    createNewsElement(newsItem, isNew = false) {
        const newsElement = document.createElement('div');
        newsElement.className = `news-item clickable ${isNew ? 'new-news' : ''}`;
        
        // Determine if breaking news
        const isBreaking = newsItem.impact === 'high' && Math.random() > 0.7;
        if (isBreaking) {
            newsElement.classList.add('breaking');
        }

        newsElement.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.openNewsModal(newsItem);
        });

        const badgeClass = isBreaking ? 'breaking' : (isNew ? 'new' : 'portfolio');
        const badgeText = isBreaking ? 'BREAKING' : (isNew ? 'NEW' : newsItem.stock || 'MARKET');

        newsElement.innerHTML = `
            <div class="news-meta">
                <span class="news-source">Athbee News</span>
                <span class="news-badge ${badgeClass}">${badgeText}</span>
            </div>
            <h4>${newsItem.headline}</h4>
            <div class="news-summary">${newsItem.summary || this.generateSummary(newsItem)}</div>
            <div class="news-tags">
                ${newsItem.stock ? `<span class="news-tag">${newsItem.stock}</span>` : ''}
                <span class="news-tag">${newsItem.category.toUpperCase()}</span>
                <span class="news-tag">${newsItem.sentiment.toUpperCase()}</span>
            </div>
        `;

        return newsElement;
    }

    filterNews(filterType) {
        console.log('Filtering news by:', filterType);
        this.loadLiveNews();
    }

    updateNewsCounter() {
        const counter = document.getElementById('news-counter');
        if (counter) {
            const now = new Date();
            const timeStr = now.toLocaleTimeString('en-US', { 
                hour12: false, 
                hour: '2-digit', 
                minute: '2-digit' 
            });
            counter.textContent = `Updated ${timeStr}`;
        }
    }

    showNewsUpdateIndicator() {
        // Create a temporary visual indicator
        const indicator = document.createElement('div');
        indicator.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: var(--color-success);
            color: white;
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            z-index: 1001;
            animation: slideInRight 0.3s ease-out;
        `;
        indicator.textContent = '📰 News Updated';
        
        document.body.appendChild(indicator);
        
        setTimeout(() => {
            indicator.style.animation = 'slideOutRight 0.3s ease-in forwards';
            setTimeout(() => {
                if (document.body.contains(indicator)) {
                    document.body.removeChild(indicator);
                }
            }, 300);
        }, 2000);
    }

    showRandomBreakingNews() {
        // Show breaking news occasionally
        if (Math.random() > 0.6) {
            const breakingNewsItems = this.data.dynamic_news_pool.filter(news => 
                news.impact === 'high' && news.category === 'portfolio'
            );
            
            if (breakingNewsItems.length > 0) {
                const randomNews = breakingNewsItems[Math.floor(Math.random() * breakingNewsItems.length)];
                this.showBreakingNews(randomNews.headline);
            }
        }

        // Schedule next potential breaking news
        setTimeout(() => {
            this.showRandomBreakingNews();
        }, 60000 + Math.random() * 120000); // 1-3 minutes
    }

    showBreakingNews(headline) {
        const breakingNews = document.getElementById('breaking-news');
        const breakingText = document.getElementById('breaking-text');
        
        if (breakingNews && breakingText) {
            breakingText.textContent = headline;
            breakingNews.classList.remove('hidden');
            
            // Auto-hide after 10 seconds
            setTimeout(() => {
                this.hideBreakingNews();
            }, 10000);
        }
    }

    hideBreakingNews() {
        const breakingNews = document.getElementById('breaking-news');
        if (breakingNews) {
            breakingNews.classList.add('hidden');
        }
    }

    updateWelcomeBanner() {
        const totalValueEl = document.getElementById('total-portfolio-value');
        const todayPnlEl = document.getElementById('today-pnl');
        const topPerformerEl = document.getElementById('top-performer');

        if (totalValueEl && this.data.portfolio) {
            totalValueEl.textContent = `₹${this.formatNumber(this.data.portfolio.total_value)}`;
        }

        if (todayPnlEl && this.data.portfolio) {
            const pnl = this.data.portfolio.today_pl;
            const pnlPercent = ((pnl / this.data.portfolio.total_value) * 100).toFixed(2);
            todayPnlEl.textContent = `+₹${this.formatNumber(pnl)} (+${pnlPercent}%)`;
            todayPnlEl.classList.add('positive');
        }

        if (topPerformerEl) {
            // Find top performer
            const topStock = this.data.portfolio.stocks.reduce((prev, current) => 
                (prev.change_percent > current.change_percent) ? prev : current
            );
            topPerformerEl.textContent = topStock.symbol;
        }
    }

    initializeAssetCharts() {
        const chartConfigs = [
            { id: 'nifty-chart', data: this.data.market_indices.nifty50 },
            { id: 'sensex-chart', data: this.data.market_indices.sensex },
            { id: 'banknifty-chart', data: this.data.market_indices.banknifty }
        ];

        chartConfigs.forEach(config => {
            const canvas = document.getElementById(config.id);
            if (canvas) {
                this.createMiniChart(canvas, config.data);
            }
        });
    }

    createMiniChart(canvas, data) {
        const ctx = canvas.getContext('2d');
        
        // Destroy existing chart if it exists
        if (this.charts[canvas.id]) {
            this.charts[canvas.id].destroy();
        }

        const isPositive = data.change > 0;
        const color = isPositive ? '#10b981' : '#ef4444';

        this.charts[canvas.id] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['', '', '', '', '', '', ''],
                datasets: [{
                    data: data.chartData,
                    borderColor: color,
                    backgroundColor: `${color}20`,
                    fill: true,
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 4,
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { display: false },
                    y: { display: false }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: { enabled: false }
                },
                elements: {
                    point: { hoverRadius: 4 }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        });
    }

    initializeMap() {
        const mapContainer = document.getElementById('leaflet-map');
        if (!mapContainer) {
            console.error('Map container not found');
            return;
        }

        // Destroy existing map
        if (this.map) {
            this.map.remove();
            this.map = null;
        }

        try {
            console.log('Initializing map...');
            this.map = L.map('leaflet-map', {
                center: [20, 0],
                zoom: 2,
                zoomControl: true,
                scrollWheelZoom: true
            });

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                maxZoom: 18
            }).addTo(this.map);

            setTimeout(() => {
                this.addNewsMarkers();
            }, 1000);

        } catch (error) {
            console.error('Error initializing map:', error);
        }
    }

    addNewsMarkers() {
        if (!this.data || !this.data.globalNews || !this.map) {
            console.error('Cannot add markers: missing data or map');
            return;
        }

        console.log('Adding news markers...');

        // Clear existing markers
        this.markers.forEach(marker => this.map.removeLayer(marker));
        this.markers = [];

        this.data.globalNews.forEach((newsItem, index) => {
            if (newsItem.coordinates && newsItem.coordinates.length === 2) {
                const [lat, lng] = newsItem.coordinates;
                console.log(`Adding marker ${index} at [${lat}, ${lng}]`);
                
                let color = '#fbbf24';
                if (newsItem.sentiment === 'positive') {
                    color = '#10b981';
                } else if (newsItem.sentiment === 'negative') {
                    color = '#ef4444';
                }

                const pulseIcon = L.divIcon({
                    className: 'custom-pulse-marker',
                    html: `
                        <div class="pulse-container">
                            <div class="pulse-dot" style="background-color: ${color};"></div>
                            <div class="pulse-ring" style="border-color: ${color};"></div>
                        </div>
                    `,
                    iconSize: [30, 30],
                    iconAnchor: [15, 15]
                });

                const marker = L.marker([lat, lng], { icon: pulseIcon }).addTo(this.map);
                
                marker.on('click', () => {
                    console.log('Marker clicked:', newsItem.headline);
                    this.showMapDrawer(newsItem);
                });

                marker.bindPopup(`
                    <div style="max-width: 300px;">
                        <strong>${newsItem.headline}</strong><br>
                        <small style="color: #666;">${newsItem.region}</small><br>
                        <span style="color: ${color};">Sentiment: ${newsItem.sentiment}</span>
                    </div>
                `, {
                    maxWidth: 300,
                    className: 'custom-popup'
                });

                this.markers.push(marker);
            }
        });

        console.log(`Added ${this.markers.length} markers to map`);
    }

    loadInsightCards() {
        const container = document.getElementById('insight-cards-container');
        if (!container || !this.data.recommendations) {
            console.error('Cannot load insight cards: missing container or data');
            return;
        }

        console.log('Loading insight cards with filter:', this.currentFilter);
        container.innerHTML = '';

        let filteredCards = this.data.recommendations;
        if (this.currentFilter !== 'all') {
            filteredCards = this.data.recommendations.filter(card => 
                card.type === this.currentFilter
            );
        }

        console.log(`Loading ${filteredCards.length} cards`);

        filteredCards.forEach(card => {
            const cardElement = this.createInsightCard(card);
            container.appendChild(cardElement);
        });
    }

    createInsightCard(cardData) {
        const card = document.createElement('div');
        card.className = 'insight-card';
        card.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Insight card clicked:', cardData.symbol);
            this.openInsightModal(cardData);
        });

        const recommendationClass = cardData.recommendation.toLowerCase().replace(' ', '');
        const targetPriceFormatted = this.formatPrice(cardData.target_price);

        card.innerHTML = `
            <div class="insight-card-header">
                <div class="asset-name">${cardData.symbol}</div>
                <span class="recommendation-badge ${recommendationClass}">${cardData.recommendation}</span>
            </div>
            <div class="insight-rationale">${cardData.rationale}</div>
            <div class="insight-footer">
                <span class="target-price">Target: ${targetPriceFormatted}</span>
                <span class="time-horizon">12 months</span>
            </div>
        `;

        return card;
    }

    loadPreMarketContent() {
        console.log('Loading pre-market content...');
        const eventsContainer = document.getElementById('premarket-events');
        const moversContainer = document.getElementById('premarket-movers-list');

        if (eventsContainer) {
            eventsContainer.innerHTML = '';
            const events = [
                "RBI Monetary Policy announcement at 10:00 AM",
                "TCS Q2 earnings call at 4:00 PM",
                "RELIANCE board meeting for bonus issue",
                "HDFC Bank management commentary on credit growth"
            ];

            events.forEach(event => {
                const eventDiv = document.createElement('div');
                eventDiv.className = 'premarket-event';
                eventDiv.innerHTML = `<h5>${event}</h5>`;
                eventsContainer.appendChild(eventDiv);
            });
        }

        if (moversContainer) {
            moversContainer.innerHTML = '';
            this.data.portfolio.stocks.forEach(stock => {
                const moverDiv = document.createElement('div');
                moverDiv.className = 'premarket-mover';
                moverDiv.innerHTML = `
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span>${stock.logo} ${stock.symbol}</span>
                        <span class="positive">+${stock.change_percent}%</span>
                    </div>
                `;
                moversContainer.appendChild(moverDiv);
            });
        }
    }

    loadFocusContent() {
        console.log('Loading focus mode content...');
        
        // Load stock-specific news for each portfolio stock
        this.data.portfolio.stocks.forEach(stock => {
            const newsContainer = document.getElementById(`${stock.symbol.toLowerCase()}-news`);
            if (newsContainer) {
                newsContainer.innerHTML = '';
                
                // Filter news for this specific stock
                const stockNews = this.data.dynamic_news_pool.filter(news => 
                    news.stock === stock.symbol
                ).slice(0, 3);

                stockNews.forEach(newsItem => {
                    const newsDiv = document.createElement('div');
                    newsDiv.className = 'focus-news-item';
                    newsDiv.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.openNewsModal(newsItem);
                    });
                    
                    newsDiv.innerHTML = `
                        <h5>${newsItem.headline}</h5>
                        <span class="focus-news-time">2 hours ago</span>
                    `;
                    newsContainer.appendChild(newsDiv);
                });

                if (stockNews.length === 0) {
                    newsContainer.innerHTML = '<div class="focus-news-item"><h5>No recent news for ' + stock.symbol + '</h5></div>';
                }
            }
        });
    }

    loadMarketsContent() {
        console.log('Loading markets content...');
        setTimeout(() => {
            this.filterMarketNews('indian');
        }, 100);
    }

    loadPortfolioContent() {
        console.log('Loading portfolio content...');
        // Portfolio content is mainly static in HTML with real data
    }

    loadAlertsContent() {
        console.log('Loading alerts content...');
        const container = document.getElementById('alerts-container');
        if (!container) return;

        container.innerHTML = '';

        const alerts = [
            {
                icon: '📈',
                message: `Your portfolio gained ₹${this.formatNumber(this.data.portfolio.today_pl)} today`,
                time: '2 hours ago'
            },
            {
                icon: '🎯',
                message: 'RELIANCE hit your target price of ₹1,450',
                time: '3 hours ago'
            },
            {
                icon: '⚠️',
                message: 'Market volatility alert: High volume detected in Bank Nifty',
                time: '5 hours ago'
            },
            {
                icon: '💡',
                message: 'New AI recommendation: Consider adding INFY to your portfolio',
                time: '1 day ago'
            },
            {
                icon: '📰',
                message: 'Breaking: TCS wins major deal - Check latest news',
                time: '30 minutes ago'
            }
        ];

        alerts.forEach(alert => {
            const alertCard = document.createElement('div');
            alertCard.className = 'alert-item';
            
            alertCard.innerHTML = `
                <div class="alert-icon">${alert.icon}</div>
                <div class="alert-content">
                    <span class="alert-message">${alert.message}</span>
                    <span class="alert-time">${alert.time}</span>
                </div>
            `;

            container.appendChild(alertCard);
        });

        console.log(`Loaded ${alerts.length} alerts`);
    }

    loadSettingsContent() {
        console.log('Settings content loaded (static HTML)');
    }

    filterMarketNews(filter) {
        const container = document.getElementById('markets-news-list');
        if (!container) return;

        console.log('Filtering market news by:', filter);
        container.innerHTML = '';

        let newsItems = [];
        if (filter === 'global') {
            newsItems = this.data.globalNews.map(item => ({
                ...item,
                source: item.source,
                timestamp: 'Recent'
            }));
        } else {
            // Indian market focus - combine portfolio and market news
            newsItems = this.data.dynamic_news_pool.map(item => ({
                ...item,
                source: 'Athbee News',
                timestamp: 'Recent'
            }));
        }

        newsItems.forEach(newsItem => {
            const newsCard = document.createElement('div');
            newsCard.className = 'news-item clickable';
            newsCard.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.openNewsModal(newsItem);
            });

            newsCard.innerHTML = `
                <div class="news-content">
                    <h4>${newsItem.headline}</h4>
                    <span class="news-source">${newsItem.source} • ${newsItem.timestamp}</span>
                </div>
                <span class="arrow">→</span>
            `;

            container.appendChild(newsCard);
        });

        console.log(`Loaded ${newsItems.length} news items`);
    }

    openInsightModal(cardData) {
        console.log('Opening insight modal for:', cardData.symbol);
        
        const modal = document.getElementById('insight-detail-modal');
        if (!modal) {
            console.error('Insight modal not found');
            return;
        }

        const assetName = document.getElementById('modal-asset-name');
        const recommendationBadge = document.getElementById('modal-recommendation-badge');
        const targetPrice = document.getElementById('modal-target-price');
        const rationale = document.getElementById('modal-rationale');
        const timeHorizon = document.getElementById('modal-time-horizon');

        if (assetName) assetName.textContent = cardData.symbol;
        if (recommendationBadge) {
            recommendationBadge.textContent = cardData.recommendation;
            recommendationBadge.className = `recommendation-badge ${cardData.recommendation.toLowerCase().replace(' ', '')}`;
        }
        if (targetPrice) targetPrice.textContent = this.formatPrice(cardData.target_price);
        if (rationale) rationale.textContent = cardData.rationale;
        if (timeHorizon) timeHorizon.textContent = '12 months';

        modal.classList.remove('hidden');
        console.log('Modal shown');
    }

    openNewsModal(newsItem) {
        console.log('Opening news modal for:', newsItem.headline);
        
        const modal = document.getElementById('news-detail-modal');
        if (!modal) {
            console.error('News modal not found');
            return;
        }

        const headline = document.getElementById('modal-headline');
        const sentimentCircle = document.getElementById('modal-sentiment-circle');
        const sentimentScore = document.getElementById('modal-sentiment-score');
        const sentimentLabel = document.getElementById('modal-sentiment-label');
        const summary = document.getElementById('modal-summary');
        const impact = document.getElementById('modal-impact');
        const assetTags = document.getElementById('modal-asset-tags');

        if (headline) headline.textContent = newsItem.headline;
        
        // Set sentiment
        const sentiment = newsItem.sentiment;
        if (sentimentScore) {
            sentimentScore.textContent = sentiment === 'positive' ? '+8.5' : sentiment === 'negative' ? '-3.2' : '0.0';
        }
        
        if (sentimentCircle && sentimentLabel) {
            sentimentCircle.className = 'sentiment-circle';
            if (sentiment === 'positive') {
                sentimentCircle.classList.add('positive');
                sentimentLabel.textContent = 'Positive Sentiment';
            } else if (sentiment === 'negative') {
                sentimentCircle.classList.add('negative');
                sentimentLabel.textContent = 'Negative Sentiment';
            } else {
                sentimentCircle.classList.add('neutral');
                sentimentLabel.textContent = 'Neutral Sentiment';
            }
        }

        if (summary) summary.innerHTML = `<p>${newsItem.summary || this.generateSummary(newsItem)}</p>`;
        if (impact) impact.textContent = this.generateImpactText(newsItem);
        
        if (assetTags) {
            assetTags.innerHTML = '';
            const assets = newsItem.relatedAssets || [newsItem.stock || 'Market'];
            assets.forEach(asset => {
                const tag = document.createElement('span');
                tag.className = 'asset-tag';
                tag.textContent = asset;
                assetTags.appendChild(tag);
            });
        }

        modal.classList.remove('hidden');
        console.log('News modal shown');
    }

    showMapDrawer(newsItem) {
        console.log('Showing map drawer for:', newsItem.headline);
        
        const drawer = document.getElementById('map-detail-drawer');
        if (!drawer) {
            console.error('Map drawer not found');
            return;
        }

        const headline = document.getElementById('drawer-headline');
        const source = document.getElementById('drawer-source');
        const timestamp = document.getElementById('drawer-timestamp');
        const summary = document.getElementById('drawer-summary');
        const assetTags = document.getElementById('drawer-asset-tags');

        if (headline) headline.textContent = newsItem.headline;
        if (source) source.textContent = newsItem.source;
        if (timestamp) timestamp.textContent = 'Recent';
        if (summary) summary.textContent = this.generateSummary(newsItem);
        
        if (assetTags) {
            assetTags.innerHTML = '';
            if (newsItem.relatedAssets && newsItem.relatedAssets.length > 0) {
                newsItem.relatedAssets.forEach(asset => {
                    const tag = document.createElement('span');
                    tag.className = 'asset-tag';
                    tag.textContent = asset;
                    assetTags.appendChild(tag);
                });
            }
        }

        drawer.classList.remove('hidden');
        drawer.classList.add('active');
        console.log('Drawer shown');
    }

    closeModal() {
        console.log('Closing modals...');
        const activeModal = document.querySelector('.modal:not(.hidden)');
        if (activeModal) {
            activeModal.classList.add('hidden');
            console.log('Modal closed');
        }
    }

    closeDrawer() {
        console.log('Closing drawer...');
        const drawer = document.getElementById('map-detail-drawer');
        if (drawer) {
            drawer.classList.remove('active');
            setTimeout(() => {
                drawer.classList.add('hidden');
            }, 300);
            console.log('Drawer closed');
        }
    }

    // Utility methods
    isMainScreen(screenId) {
        const mainScreens = ['home-screen', 'markets-screen', 'portfolio-screen', 'premarket-screen', 'focus-screen', 'alerts-screen', 'settings-screen'];
        return mainScreens.includes(screenId);
    }

    updateNavigationForScreen(screenId) {
        console.log('Updating navigation for screen:', screenId);
        
        // Update sidebar
        const sidebarItems = document.querySelectorAll('.sidebar-item');
        sidebarItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-screen') === screenId) {
                item.classList.add('active');
            }
        });

        // Update bottom nav
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-screen') === screenId) {
                item.classList.add('active');
            }
        });
    }

    updateActiveSidebarItem(activeItem) {
        if (!activeItem) return;
        const sidebarItems = document.querySelectorAll('.sidebar-item');
        sidebarItems.forEach(item => item.classList.remove('active'));
        activeItem.classList.add('active');
    }

    updateActiveNavItem(activeItem) {
        if (!activeItem) return;
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => item.classList.remove('active'));
        activeItem.classList.add('active');
    }

    addClickFeedback(element) {
        element.style.transform = 'scale(0.98)';
        element.style.opacity = '0.8';
        
        setTimeout(() => {
            element.style.transform = '';
            element.style.opacity = '';
        }, 150);
    }

    logout() {
        const confirmed = confirm('Are you sure you want to log out?');
        if (confirmed) {
            // Clear news updates
            if (this.newsUpdateInterval) {
                clearInterval(this.newsUpdateInterval);
            }
            
            this.showScreen('login-screen');
            this.currentFilter = 'all';
            this.newsFilters.current = 'all';
            
            // Reset navigation
            const navItems = document.querySelectorAll('.nav-item, .sidebar-item');
            navItems.forEach(item => item.classList.remove('active'));
        }
    }

    showNotification(message) {
        console.log('Showing notification:', message);
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--color-primary);
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 10000;
            font-weight: 500;
            animation: slideInRight 0.3s ease-out;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Helper methods
    formatNumber(num) {
        return new Intl.NumberFormat('en-IN').format(num);
    }

    formatPrice(price) {
        return `₹${this.formatNumber(price)}`;
    }

    generateSummary(newsItem) {
        if (newsItem.summary) return newsItem.summary;
        
        const summaries = {
            'positive': `${newsItem.headline} - This development is expected to have a positive impact on market sentiment and related asset performance.`,
            'negative': `${newsItem.headline} - This news may create headwinds for affected markets and sectors in the near term.`,
            'neutral': `${newsItem.headline} - Market participants are monitoring this development for potential implications.`
        };
        
        return summaries[newsItem.sentiment] || summaries['neutral'];
    }

    generateImpactText(newsItem) {
        const impacts = {
            'positive': 'Positive market sentiment likely to drive upward price pressure across related assets.',
            'negative': 'Negative sentiment may weigh on price performance in the near term.',
            'neutral': 'Neutral market impact expected with potential for volatility.'
        };
        
        return impacts[newsItem.sentiment] || impacts['neutral'];
    }

    // Clean up on page unload
    cleanup() {
        if (this.newsUpdateInterval) {
            clearInterval(this.newsUpdateInterval);
        }
        if (this.map) {
            this.map.remove();
        }
    }
}

// Initialize the enhanced Athbee app
document.addEventListener('DOMContentLoaded', () => {
    const app = new AthbeeApp();
    
    // Add CSS animations for notifications and news updates
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        @keyframes flash {
            0%, 50%, 100% { opacity: 1; }
            25%, 75% { opacity: 0.5; }
        }
        .pulse { animation: pulse 1s infinite; }
        .flash { animation: flash 1s infinite; }
    `;
    document.head.appendChild(style);
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            app.closeModal();
            app.closeDrawer();
            app.hideBreakingNews();
        }
    });
    
    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
        app.cleanup();
    });
    
    // Touch interactions for mobile
    document.addEventListener('touchstart', () => {}, { passive: true });
    
    console.log('Enhanced Athbee FinTech App with Real-time News initialized! 🚀📊💼📰');
});
