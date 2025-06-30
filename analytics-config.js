// 网站分析工具配置文件
// 这个文件包含所有监控工具的配置代码

// Google Analytics 4 配置
const GA4_CONFIG = {
    measurementId: 'G-XXXXXXXXXX', // 替换为你的实际ID
    
    // 增强型电子商务配置
    ecommerce: {
        // 芯片产品数据转换
        convertChipToProduct: function(chip) {
            return {
                item_id: chip.id,
                item_name: `${chip.vendor} ${chip.model}`,
                item_category: chip.type,
                item_category2: chip.applications?.[0] || 'general',
                item_variant: chip.process,
                item_brand: chip.vendor,
                price: 0, // 可以后续添加价格
                quantity: 1,
                custom_parameters: {
                    performance: chip.performance,
                    power: chip.power,
                    memory: chip.memory,
                    release_year: chip.releaseYear
                }
            };
        }
    },
    
    // 自定义事件跟踪 (增强版)
    trackEvents: {
        // 搜索事件 (增强版)
        search: function(searchTerm, resultsCount = 0) {
            gtag('event', 'search', {
                search_term: searchTerm,
                search_results: resultsCount,
                page_location: window.location.href,
                language: currentLanguage || 'zh',
                timestamp: Date.now()
            });
            
            // 记录搜索关键词分析
            this.recordSearchKeyword(searchTerm);
        },
        
        // 芯片点击事件 (增强版)
        chipClick: function(chipData) {
            const product = GA4_CONFIG.ecommerce.convertChipToProduct(chipData);
            
            // 产品选择事件
            gtag('event', 'select_item', {
                item_list_id: 'featured_chips',
                item_list_name: 'Featured AI Chips',
                items: [product]
            });
            
            // 产品查看事件
            gtag('event', 'view_item', {
                currency: 'USD',
                value: 0,
                items: [product]
            });
            
            // 自定义芯片点击事件
            gtag('event', 'chip_interaction', {
                event_category: 'product_engagement',
                chip_vendor: chipData.vendor,
                chip_type: chipData.type,
                chip_performance: chipData.performance,
                language: currentLanguage || 'zh'
            });
        },
        
        // 分类浏览事件 (增强版)
        categoryView: function(category, categoryType) {
            gtag('event', 'view_item_list', {
                item_list_id: categoryType,
                item_list_name: categoryType.replace('_', ' '),
                items: [{
                    item_id: category.id,
                    item_name: category.id,
                    item_category: categoryType
                }]
            });
            
            gtag('event', 'category_interaction', {
                event_category: 'navigation',
                category_type: categoryType,
                category_id: category.id,
                category_count: category.count,
                language: currentLanguage || 'zh'
            });
        },
        
        // 语言切换事件 (增强版)
        languageSwitch: function(fromLang, toLang) {
            gtag('event', 'language_change', {
                event_category: 'user_preference',
                from_language: fromLang,
                to_language: toLang,
                page_location: window.location.href,
                timestamp: Date.now()
            });
        },
        
        // 新增：用户意图分析
        analyzeUserIntent: function(actions) {
            const intentScore = this.calculateIntentScore(actions);
            const userSegment = this.determineUserSegment(intentScore);
            
            gtag('event', 'user_intent_analysis', {
                event_category: 'user_behavior',
                intent_score: intentScore,
                user_segment: userSegment,
                session_actions: actions.length,
                language: currentLanguage || 'zh'
            });
        },
        
        // 计算用户意图分数
        calculateIntentScore: function(actions) {
            let score = 0;
            actions.forEach(action => {
                switch(action.type) {
                    case 'search': score += 15; break;
                    case 'chip_click': score += 20; break;
                    case 'category_view': score += 10; break;
                    case 'language_switch': score += 5; break;
                    default: score += 2;
                }
            });
            return Math.min(score, 100);
        },
        
        // 确定用户细分
        determineUserSegment: function(score) {
            if (score >= 70) return 'high_intent_professional';
            if (score >= 40) return 'medium_intent_researcher';
            if (score >= 20) return 'low_intent_casual';
            return 'visitor';
        },
        
        // 记录搜索关键词用于SEO分析
        recordSearchKeyword: function(keyword) {
            const keywords = JSON.parse(localStorage.getItem('seo_keywords') || '{}');
            const normalizedKeyword = keyword.toLowerCase().trim();
            
            keywords[normalizedKeyword] = {
                count: (keywords[normalizedKeyword]?.count || 0) + 1,
                lastSearched: Date.now(),
                language: currentLanguage || 'zh'
            };
            
            localStorage.setItem('seo_keywords', JSON.stringify(keywords));
            
            // 分析搜索趋势
            this.analyzeSearchTrends(keywords);
        },
        
        // 分析搜索趋势
        analyzeSearchTrends: function(keywords) {
            const topKeywords = Object.entries(keywords)
                .sort(([,a], [,b]) => b.count - a.count)
                .slice(0, 20);
                
            gtag('event', 'search_trend_analysis', {
                event_category: 'seo_insights',
                top_keyword: topKeywords[0]?.[0] || 'none',
                total_unique_searches: Object.keys(keywords).length,
                language: currentLanguage || 'zh'
            });
        }
    }
};

// 百度统计配置
const BAIDU_CONFIG = {
    siteId: '_xxxxxxxxxx', // 替换为你的百度统计ID
    
    // 自定义事件跟踪
    trackEvents: {
        search: function(searchTerm) {
            _hmt.push(['_trackEvent', 'search', 'query', searchTerm]);
        },
        
        chipClick: function(chipName) {
            _hmt.push(['_trackEvent', 'chip', 'click', chipName]);
        }
    }
};

// 页面性能监控
const PERFORMANCE_CONFIG = {
    // 页面加载时间监控
    trackPageLoad: function() {
        window.addEventListener('load', function() {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            
            // 发送到GA4
            gtag('event', 'page_load_time', {
                custom_parameter: loadTime,
                page_location: window.location.href
            });
            
            // 发送到百度统计
            _hmt.push(['_trackEvent', 'performance', 'load_time', loadTime]);
        });
    },
    
    // 用户停留时间监控
    trackTimeOnPage: function() {
        let startTime = Date.now();
        
        window.addEventListener('beforeunload', function() {
            const timeSpent = Date.now() - startTime;
            
            gtag('event', 'time_on_page', {
                custom_parameter: Math.floor(timeSpent / 1000), // 转换为秒
                page_location: window.location.href
            });
        });
    }
};

// 错误监控
const ERROR_TRACKING = {
    // JavaScript错误监控
    trackJSErrors: function() {
        window.addEventListener('error', function(e) {
            gtag('event', 'js_error', {
                error_message: e.message,
                error_file: e.filename,
                error_line: e.lineno,
                page_location: window.location.href
            });
        });
    },
    
    // 资源加载错误监控
    trackResourceErrors: function() {
        window.addEventListener('error', function(e) {
            if (e.target !== window) {
                gtag('event', 'resource_error', {
                    resource_url: e.target.src || e.target.href,
                    resource_type: e.target.tagName,
                    page_location: window.location.href
                });
            }
        }, true);
    }
};

// 用户行为热力图 (简化版)
const HEATMAP_TRACKING = {
    // 点击热力图
    trackClicks: function() {
        document.addEventListener('click', function(e) {
            const clickData = {
                x: e.pageX,
                y: e.pageY,
                element: e.target.tagName,
                className: e.target.className,
                id: e.target.id,
                timestamp: Date.now()
            };
            
            // 存储到localStorage (生产环境可发送到服务器)
            const clicks = JSON.parse(localStorage.getItem('clickHeatmap') || '[]');
            clicks.push(clickData);
            localStorage.setItem('clickHeatmap', JSON.stringify(clicks.slice(-1000))); // 只保存最近1000次点击
        });
    },
    
    // 滚动深度跟踪
    trackScrollDepth: function() {
        let maxScroll = 0;
        
        window.addEventListener('scroll', function() {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                
                // 每25%发送一次事件
                if (maxScroll % 25 === 0 && maxScroll > 0) {
                    gtag('event', 'scroll_depth', {
                        scroll_depth: maxScroll,
                        page_location: window.location.href
                    });
                }
            }
        });
    }
};

// 转化漏斗跟踪
const CONVERSION_TRACKING = {
    // 用户兴趣程度评分
    calculateEngagementScore: function() {
        let score = 0;
        
        // 页面停留时间 (每分钟+10分)
        const timeSpent = (Date.now() - window.pageLoadTime) / 60000;
        score += Math.min(timeSpent * 10, 50);
        
        // 点击次数 (每次点击+5分)
        const clicks = JSON.parse(localStorage.getItem('sessionClicks') || '0');
        score += Math.min(clicks * 5, 30);
        
        // 搜索次数 (每次搜索+15分)
        const searches = JSON.parse(localStorage.getItem('sessionSearches') || '0');
        score += Math.min(searches * 15, 45);
        
        return Math.round(score);
    },
    
    // 用户类型分类
    classifyUser: function() {
        const score = this.calculateEngagementScore();
        
        if (score >= 80) return 'high_intent';
        if (score >= 40) return 'medium_intent';
        return 'low_intent';
    }
};

// 初始化所有监控
function initializeAnalytics() {
    // 记录页面加载时间
    window.pageLoadTime = Date.now();
    
    // 启动性能监控
    PERFORMANCE_CONFIG.trackPageLoad();
    PERFORMANCE_CONFIG.trackTimeOnPage();
    
    // 启动错误监控
    ERROR_TRACKING.trackJSErrors();
    ERROR_TRACKING.trackResourceErrors();
    
    // 启动用户行为监控
    HEATMAP_TRACKING.trackClicks();
    HEATMAP_TRACKING.trackScrollDepth();
    
    console.log('所有分析工具已初始化');
}

// 页面卸载时发送最终数据
window.addEventListener('beforeunload', function() {
    const finalData = {
        engagement_score: CONVERSION_TRACKING.calculateEngagementScore(),
        user_type: CONVERSION_TRACKING.classifyUser(),
        session_duration: Date.now() - window.pageLoadTime,
        page_url: window.location.href
    };
    
    gtag('event', 'session_end', finalData);
});

// 自动初始化
document.addEventListener('DOMContentLoaded', initializeAnalytics);

// 导出配置供其他脚本使用
window.AnalyticsConfig = {
    GA4_CONFIG,
    BAIDU_CONFIG,
    PERFORMANCE_CONFIG,
    ERROR_TRACKING,
    HEATMAP_TRACKING,
    CONVERSION_TRACKING
};