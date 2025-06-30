// 网站分析工具配置文件
// 这个文件包含所有监控工具的配置代码

// Google Analytics 4 配置
const GA4_CONFIG = {
    measurementId: 'G-XXXXXXXXXX', // 替换为你的实际ID
    
    // 自定义事件跟踪
    trackEvents: {
        // 搜索事件
        search: function(searchTerm) {
            gtag('event', 'search', {
                search_term: searchTerm,
                page_location: window.location.href
            });
        },
        
        // 芯片点击事件
        chipClick: function(chipName, chipType) {
            gtag('event', 'chip_click', {
                chip_name: chipName,
                chip_type: chipType,
                page_location: window.location.href
            });
        },
        
        // 分类浏览事件
        categoryView: function(categoryName) {
            gtag('event', 'category_view', {
                category_name: categoryName,
                page_location: window.location.href
            });
        },
        
        // 语言切换事件
        languageSwitch: function(fromLang, toLang) {
            gtag('event', 'language_switch', {
                from_language: fromLang,
                to_language: toLang
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