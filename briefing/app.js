// Pre-Market Briefing Application
class PreMarketBriefing {
    constructor() {
        this.data = null;
        this.expandedCards = new Set();
        this.init();
    }

    init() {
        this.loadData();
        this.setupEventListeners();
        this.animateOnLoad();
        this.updateRealTimeData();
    }

    loadData() {
        // Load the briefing data from the provided JSON structure
        this.data = {
            "briefingDate": "July 24, 2025",
            "briefingTime": "8:01 AM IST",
            "marketSnapshot": {
                "nifty50": {
                    "close": 25219.90,
                    "change": 159,
                    "changePercent": 0.63,
                    "trend": "positive"
                },
                "sensex": {
                    "close": 82726.64,
                    "change": 539.83,
                    "changePercent": 0.66,
                    "trend": "positive"
                },
                "bankNifty": {
                    "close": 57210.45,
                    "changePercent": 0.80,
                    "trend": "positive"
                },
                "giftNifty": {
                    "level": 25300,
                    "change": 50,
                    "changePercent": 0.2,
                    "trend": "positive"
                }
            },
            "keyEvents": [
                {
                    "title": "Global Trade Developments",
                    "description": "US-Japan trade deal announced with 15% tariffs instead of feared 25%. India-UK FTA approved by cabinet.",
                    "impact": "Positive sentiment across Asian markets, hope for favorable India-US deal",
                    "importance": "high"
                },
                {
                    "title": "Corporate Earnings Highlights",
                    "description": "Mixed Q1 results with Infosys profit up 9%, JSW Steel +158%, Tech Mahindra +34%",
                    "impact": "Better than expected performance in key sectors",
                    "importance": "high"
                },
                {
                    "title": "Market Flow Analysis", 
                    "description": "FII outflow of ₹4,209 crore offset by DII inflow of ₹4,358 crore",
                    "impact": "Domestic institutions providing market stability",
                    "importance": "medium"
                }
            ],
            "technicalLevels": {
                "nifty50": {
                    "resistance": [25325, 25400, 25475],
                    "support": [25060, 25100, 24900]
                },
                "bankNifty": {
                    "resistance": [57400, 57500, 57900],
                    "support": [56850, 56800, 56500]
                }
            },
            "sectoralOutlook": [
                {
                    "sector": "Auto",
                    "performance": "+0.85%",
                    "outlook": "Positive on trade deal optimism and export potential",
                    "leaders": ["Tata Motors", "Apollo Tyres"],
                    "sentiment": "bullish"
                },
                {
                    "sector": "Banking & Financial Services",
                    "performance": "+0.76%",
                    "outlook": "Strong momentum with HDFC Bank, ICICI Bank at record highs",
                    "leaders": ["HDFC Bank", "ICICI Bank"],
                    "sentiment": "bullish"
                },
                {
                    "sector": "IT",
                    "performance": "Mixed",
                    "outlook": "Cautiously optimistic on US recovery signs",
                    "leaders": ["Infosys", "TCS"],
                    "sentiment": "neutral"
                }
            ],
            "tradingStrategy": {
                "bias": "Cautiously Optimistic",
                "strategy": "Buy on dips near support levels",
                "focus": ["Banking", "Auto", "Selective IT"],
                "riskLevel": "Medium"
            },
            "keyEventsToday": [
                "India-UK FTA signing ceremony",
                "More Q1 earnings announcements",
                "FII/DII flow monitoring",
                "Global market cues",
                "RBI communication watch"
            ]
        };

        console.log('Pre-Market Briefing data loaded successfully');
    }

    setupEventListeners() {
        // Expandable event cards
        this.setupExpandableCards();
        
        // Smooth scrolling for any anchor links
        this.setupSmoothScrolling();
        
        // Animation triggers on scroll
        this.setupScrollAnimations();
        
        // Interactive hover effects
        this.setupHoverEffects();
        
        // Keyboard navigation
        this.setupKeyboardNavigation();
        
        // Touch interactions for mobile
        this.setupTouchInteractions();
    }

    setupExpandableCards() {
        const expandableCards = document.querySelectorAll('.event-card.expandable');
        
        expandableCards.forEach(card => {
            const header = card.querySelector('.event-header');
            const details = card.querySelector('.event-details');
            const chevron = card.querySelector('.chevron');
            
            if (header && details && chevron) {
                header.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.toggleEventCard(card, details, chevron);
                });

                // Add keyboard support
                header.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.toggleEventCard(card, details, chevron);
                    }
                });

                // Make header focusable
                header.setAttribute('tabindex', '0');
                header.setAttribute('role', 'button');
                header.setAttribute('aria-expanded', 'false');
            }
        });
    }

    toggleEventCard(card, details, chevron) {
        const eventType = card.getAttribute('data-event');
        const isExpanded = this.expandedCards.has(eventType);
        
        if (isExpanded) {
            // Collapse
            this.collapseCard(card, details, chevron, eventType);
        } else {
            // Expand
            this.expandCard(card, details, chevron, eventType);
        }

        // Update accessibility
        const header = card.querySelector('.event-header');
        header.setAttribute('aria-expanded', (!isExpanded).toString());
    }

    expandCard(card, details, chevron, eventType) {
        card.classList.add('expanded');
        details.classList.remove('hidden');
        
        // Animate chevron rotation
        chevron.style.transform = 'rotate(180deg)';
        
        // Animate content expansion
        const height = details.scrollHeight;
        details.style.maxHeight = '0px';
        details.style.opacity = '0';
        
        // Force reflow
        details.offsetHeight;
        
        // Animate to full height
        details.style.transition = 'max-height 0.3s ease-out, opacity 0.3s ease-out';
        details.style.maxHeight = height + 'px';
        details.style.opacity = '1';
        
        // Add to expanded set
        this.expandedCards.add(eventType);
        
        // Add entrance animation to list items
        setTimeout(() => {
            const listItems = details.querySelectorAll('li');
            listItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(10px)';
                item.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 50);
            });
        }, 100);

        // Scroll to show expanded content if needed
        setTimeout(() => {
            this.scrollIntoViewIfNeeded(card);
        }, 350);
    }

    collapseCard(card, details, chevron, eventType) {
        card.classList.remove('expanded');
        
        // Animate chevron rotation
        chevron.style.transform = 'rotate(0deg)';
        
        // Animate content collapse
        details.style.transition = 'max-height 0.25s ease-in, opacity 0.25s ease-in';
        details.style.maxHeight = '0px';
        details.style.opacity = '0';
        
        // Remove from expanded set
        this.expandedCards.delete(eventType);
        
        // Hide after animation
        setTimeout(() => {
            details.classList.add('hidden');
        }, 250);
    }

    setupSmoothScrolling() {
        // Add smooth scrolling behavior for any internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href').substring(1);
                const target = document.getElementById(targetId);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupScrollAnimations() {
        // Create intersection observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe all animatable elements
        const animatableElements = document.querySelectorAll(
            '.snapshot-card, .event-card, .outlook-card, .sector-card, .opportunity-card, .risk-card, .strategy-card, .event-item'
        );

        animatableElements.forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    }

    setupHoverEffects() {
        // Enhanced hover effects for interactive elements
        const interactiveCards = document.querySelectorAll(
            '.snapshot-card, .event-card, .sector-card, .opportunity-card, .risk-card'
        );

        interactiveCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addHoverEffect(card);
            });

            card.addEventListener('mouseleave', () => {
                this.removeHoverEffect(card);
            });
        });
    }

    addHoverEffect(element) {
        element.style.transform = 'translateY(-4px) scale(1.01)';
        element.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
        
        // Add subtle glow effect
        const rect = element.getBoundingClientRect();
        const glowSize = Math.max(rect.width, rect.height) * 0.1;
        element.style.boxShadow = `0 ${glowSize}px ${glowSize * 2}px -${glowSize / 2}px rgba(37, 99, 235, 0.15)`;
    }

    removeHoverEffect(element) {
        element.style.transform = 'translateY(0) scale(1)';
        element.style.boxShadow = '';
    }

    setupKeyboardNavigation() {
        // Add keyboard navigation support
        document.addEventListener('keydown', (e) => {
            // ESC key to collapse all expanded cards
            if (e.key === 'Escape') {
                this.collapseAllCards();
            }
        });
    }

    setupTouchInteractions() {
        // Add touch-friendly interactions for mobile
        let touchStartY = 0;
        let touchEndY = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        document.addEventListener('touchend', (e) => {
            touchEndY = e.changedTouches[0].screenY;
            
            // Detect swipe gestures if needed
            const swipeThreshold = 50;
            const swipeDistance = touchStartY - touchEndY;
            
            if (Math.abs(swipeDistance) > swipeThreshold) {
                // Could implement swipe-based navigation here
            }
        }, { passive: true });
    }

    animateOnLoad() {
        // Animate elements on initial load
        const header = document.querySelector('.briefing-header');
        const sections = document.querySelectorAll('section');
        
        // Animate header
        if (header) {
            header.style.opacity = '0';
            header.style.transform = 'translateY(-30px)';
            
            setTimeout(() => {
                header.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                header.style.opacity = '1';
                header.style.transform = 'translateY(0)';
            }, 100);
        }

        // Stagger section animations
        sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 200 + (index * 100));
        });

        // Animate market snapshot cards
        setTimeout(() => {
            this.animateMarketCards();
        }, 800);
    }

    animateMarketCards() {
        const cards = document.querySelectorAll('.snapshot-card');
        
        cards.forEach((card, index) => {
            const value = card.querySelector('.card-value');
            const change = card.querySelector('.card-change');
            
            if (value && change) {
                // Animate numbers counting up
                this.animateNumber(value, this.getCardValue(card));
                
                // Add pulse effect to positive changes
                if (change.classList.contains('positive')) {
                    setTimeout(() => {
                        change.style.animation = 'pulse 1s ease-out';
                    }, 500 + (index * 200));
                }
            }
        });
    }

    getCardValue(card) {
        const id = card.id;
        switch (id) {
            case 'nifty-card':
                return this.data.marketSnapshot.nifty50.close;
            case 'sensex-card':
                return this.data.marketSnapshot.sensex.close;
            case 'banknifty-card':
                return this.data.marketSnapshot.bankNifty.close;
            case 'gift-card':
                return this.data.marketSnapshot.giftNifty.level;
            default:
                return 0;
        }
    }

    animateNumber(element, targetValue) {
        const startValue = 0;
        const duration = 1000;
        const increment = targetValue / (duration / 16);
        let currentValue = startValue;
        
        const timer = setInterval(() => {
            currentValue += increment;
            
            if (currentValue >= targetValue) {
                currentValue = targetValue;
                clearInterval(timer);
            }
            
            element.textContent = this.formatNumber(currentValue);
        }, 16);
    }

    formatNumber(number) {
        // Format numbers with appropriate commas and decimals
        if (number >= 1000) {
            return new Intl.NumberFormat('en-IN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }).format(number);
        }
        return Math.round(number).toString();
    }

    updateRealTimeData() {
        // Simulate real-time updates (in a real app, this would connect to live data)
        setInterval(() => {
            this.updateMarketData();
        }, 30000); // Update every 30 seconds

        // Update time display
        this.updateTimeDisplay();
        setInterval(() => {
            this.updateTimeDisplay();
        }, 60000); // Update every minute
    }

    updateMarketData() {
        // Simulate small market movements
        const cards = document.querySelectorAll('.snapshot-card');
        
        cards.forEach(card => {
            const changeElement = card.querySelector('.card-change');
            if (changeElement && Math.random() > 0.7) {
                // Small random change
                const currentText = changeElement.textContent;
                const variation = (Math.random() - 0.5) * 0.02; // ±1% max variation
                
                // Add subtle flash animation
                changeElement.style.animation = 'flash 0.5s ease-out';
                setTimeout(() => {
                    changeElement.style.animation = '';
                }, 500);
            }
        });
    }

    updateTimeDisplay() {
        const timeElement = document.querySelector('.time');
        if (timeElement) {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
                timeZone: 'Asia/Kolkata'
            }) + ' IST';
            
            timeElement.textContent = timeString;
        }
    }

    collapseAllCards() {
        const expandableCards = document.querySelectorAll('.event-card.expandable');
        
        expandableCards.forEach(card => {
            const eventType = card.getAttribute('data-event');
            if (this.expandedCards.has(eventType)) {
                const details = card.querySelector('.event-details');
                const chevron = card.querySelector('.chevron');
                
                if (details && chevron) {
                    this.collapseCard(card, details, chevron, eventType);
                }
            }
        });
    }

    scrollIntoViewIfNeeded(element) {
        const rect = element.getBoundingClientRect();
        const isVisible = (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );

        if (!isVisible) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }

    // Utility method to add click feedback
    addClickFeedback(element) {
        element.style.transform = 'scale(0.98)';
        element.style.opacity = '0.8';
        
        setTimeout(() => {
            element.style.transform = '';
            element.style.opacity = '';
        }, 150);
    }

    // Method to show notifications (if needed)
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--color-primary);
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 10000;
            font-weight: 500;
            animation: slideInRight 0.3s ease-out;
            max-width: 300px;
        `;
        
        if (type === 'success') {
            notification.style.background = 'var(--positive-green)';
        } else if (type === 'error') {
            notification.style.background = 'var(--negative-red)';
        }
        
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

    // Cleanup method
    cleanup() {
        // Remove event listeners and intervals if needed
        clearInterval(this.updateInterval);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new PreMarketBriefing();
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        /* Animation styles */
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        @keyframes flash {
            0%, 50%, 100% { opacity: 1; }
            25%, 75% { opacity: 0.7; }
        }
        
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .animate-on-scroll.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Enhanced hover states */
        .snapshot-card:hover,
        .event-card:hover,
        .sector-card:hover,
        .opportunity-card:hover,
        .risk-card:hover {
            cursor: pointer;
        }
        
        .event-header:hover {
            background-color: var(--hover-bg);
        }
        
        /* Focus states for accessibility */
        .event-header:focus {
            outline: 2px solid var(--color-primary);
            outline-offset: 2px;
        }
        
        /* Mobile touch improvements */
        @media (max-width: 768px) {
            .event-header {
                padding: var(--space-20);
                min-height: 60px;
            }
            
            .expand-icon {
                width: 40px;
                height: 40px;
            }
            
            .chevron {
                font-size: var(--font-size-base);
            }
        }
        
        /* Loading states */
        .loading {
            position: relative;
            overflow: hidden;
        }
        
        .loading::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
            animation: shimmer 1.5s infinite;
        }
        
        @keyframes shimmer {
            0% { left: -100%; }
            100% { left: 100%; }
        }
    `;
    document.head.appendChild(style);
    
    // Add global error handling
    window.addEventListener('error', (e) => {
        console.error('Application error:', e.error);
    });
    
    // Add performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const loadTime = performance.now();
            console.log(`Pre-Market Briefing loaded in ${loadTime.toFixed(2)}ms`);
        });
    }
    
    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        app.cleanup();
    });
    
    console.log('🌅 Athbee Pre-Market Briefing Application initialized successfully! 📊💼');
});