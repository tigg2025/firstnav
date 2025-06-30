// 数据保护版本 - 基础混淆和反爬虫
// 这个文件展示如何对现有data.js进行基础保护

// 反爬虫检测
function detectBot() {
    const userAgent = navigator.userAgent.toLowerCase();
    const botPatterns = [
        'bot', 'crawler', 'spider', 'scraper', 'wget', 'curl',
        'python', 'java', 'go-http', 'node', 'axios', 'fetch'
    ];
    
    // 检查User-Agent
    const hasBot = botPatterns.some(pattern => userAgent.includes(pattern));
    
    // 检查无头浏览器特征
    const isHeadless = !window.chrome && !window.navigator.webdriver === undefined;
    
    // 检查自动化工具
    const hasAutomation = window.navigator.webdriver || window.callPhantom || window._phantom;
    
    return hasBot || isHeadless || hasAutomation;
}

// 访问频率限制
class RateLimiter {
    constructor() {
        this.requests = JSON.parse(localStorage.getItem('requestLog') || '[]');
        this.maxRequests = 30; // 每分钟最多30次请求
        this.timeWindow = 60000; // 1分钟
    }
    
    checkLimit() {
        const now = Date.now();
        // 清理过期记录
        this.requests = this.requests.filter(time => now - time < this.timeWindow);
        
        if (this.requests.length >= this.maxRequests) {
            throw new Error('访问过于频繁，请稍后再试');
        }
        
        this.requests.push(now);
        localStorage.setItem('requestLog', JSON.stringify(this.requests));
        return true;
    }
}

// 简单的数据解码函数
function decodeChipData(encodedData) {
    try {
        // Base64解码
        const decoded = atob(encodedData);
        return JSON.parse(decoded);
    } catch (error) {
        console.error('数据解码失败:', error);
        return null;
    }
}

// ROT13编码/解码 (对字符串进行简单混淆)
function rot13(str) {
    return str.replace(/[a-zA-Z]/g, function(c) {
        return String.fromCharCode(
            (c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26
        );
    });
}

// 数据访问控制
function getProtectedData() {
    // 1. 检测爬虫
    if (detectBot()) {
        console.log('检测到自动化访问，拒绝提供完整数据');
        return getLimitedData(); // 返回有限数据
    }
    
    // 2. 检查访问频率
    const rateLimiter = new RateLimiter();
    try {
        rateLimiter.checkLimit();
    } catch (error) {
        console.warn(error.message);
        return getLimitedData();
    }
    
    // 3. 返回完整数据
    return getFullData();
}

// 有限数据 (公开信息)
function getLimitedData() {
    return {
        applicationScenarios: [
            {
                id: 'training',
                icon: 'brain',
                color: 'bg-blue-100 border-blue-200 hover:bg-blue-200',
                iconColor: 'text-blue-600',
                count: 45
            },
            {
                id: 'inference',
                icon: 'zap',
                color: 'bg-green-100 border-green-200 hover:bg-green-200',
                iconColor: 'text-green-600',
                count: 78
            },
            {
                id: 'edge',
                icon: 'smartphone',
                color: 'bg-purple-100 border-purple-200 hover:bg-purple-200',
                iconColor: 'text-purple-600',
                count: 52
            }
        ],
        hardwareTypes: [
            {
                id: 'gpu',
                icon: 'monitor',
                color: 'bg-blue-100 border-blue-200 hover:bg-blue-200',
                iconColor: 'text-blue-600',
                count: 89
            },
            {
                id: 'npu',
                icon: 'cpu',
                color: 'bg-green-100 border-green-200 hover:bg-green-200',
                iconColor: 'text-green-600',
                count: 67
            }
        ],
        deploymentTypes: [
            {
                id: 'datacenter',
                icon: 'server',
                color: 'bg-blue-100 border-blue-200 hover:bg-blue-200',
                iconColor: 'text-blue-600',
                count: 78
            }
        ],
        featuredChips: [
            {
                id: 'limited',
                vendor: '***',
                model: '数据受限',
                type: '***',
                performance: '***',
                power: '***',
                process: '***',
                memory: '***',
                applications: ['limited'],
                releaseYear: 2024
            }
        ]
    };
}

// 完整数据 (编码后的)
function getFullData() {
    // 这里是编码后的完整芯片数据
    // 实际使用时，将原data.js的内容进行Base64编码后放在这里
    const encodedFullData = "eyJhcHBsaWNhdGlvblNjZW5hcmlvcyI6W3siaWQiOiJ0cmFpbmluZyIsImljb24iOiJicmFpbiIsImNvbG9yIjoiYmctYmx1ZS0xMDAgYm9yZGVyLWJsdWUtMjAwIGhvdmVyOmJnLWJsdWUtMjAwIiwiaWNvbkNvbG9yIjoidGV4dC1ibHVlLTYwMCIsImNvdW50Ijo0NX0seyJpZCI6ImluZmVyZW5jZSIsImljb24iOiJ6YXAiLCJjb2xvciI6ImJnLWdyZWVuLTEwMCBib3JkZXItZ3JlZW4tMjAwIGhvdmVyOmJnLWdyZWVuLTIwMCIsImljb25Db2xvciI6InRleHQtZ3JlZW4tNjAwIiwiY291bnQiOjc4fV19";
    
    try {
        return decodeChipData(encodedFullData);
    } catch (error) {
        console.error('无法加载完整数据，返回基础数据');
        return getLimitedData();
    }
}

// 延迟加载策略
function loadDataWithDelay() {
    return new Promise((resolve) => {
        // 添加随机延迟，干扰自动化工具
        const delay = Math.random() * 2000 + 1000; // 1-3秒随机延迟
        setTimeout(() => {
            resolve(getProtectedData());
        }, delay);
    });
}

// 数据完整性验证
function validateDataIntegrity(data) {
    if (!data || typeof data !== 'object') return false;
    if (!data.featuredChips || !Array.isArray(data.featuredChips)) return false;
    if (!data.applicationScenarios || !Array.isArray(data.applicationScenarios)) return false;
    return true;
}

// 导出保护后的数据加载函数
window.loadProtectedChipData = async function() {
    try {
        const data = await loadDataWithDelay();
        
        if (!validateDataIntegrity(data)) {
            throw new Error('数据完整性验证失败');
        }
        
        return data;
    } catch (error) {
        console.warn('数据加载异常:', error.message);
        return getLimitedData();
    }
};

// 多语言数据 (同样可以进行保护)
const protectedTranslations = {
    zh: {
        siteTitle: 'AI芯片导航',
        siteDescription: '专业的AI芯片信息导航平台',
        heroTitle: '专业的AI芯片信息导航平台',
        heroSubtitle: '汇聚全球AI芯片信息，提供详细的技术参数、性能对比和最新资讯',
        
        // 基础翻译数据
        navHome: '首页',
        navCategories: '分类',
        navManufacturers: '厂商',
        navNews: '资讯',
        navCompare: '对比',
        
        searchPlaceholder: '搜索芯片型号、厂商或技术规格...',
        searchButton: '搜索',
        
        // 其他翻译...
        training: '训练',
        inference: '推理',
        edge: '边缘计算',
        gpu: 'GPU',
        npu: 'NPU',
        
        chipType: '类型',
        chipPerformance: '性能',
        chipPower: '功耗',
        chipProcess: '工艺',
        chipMemory: '内存',
        chipYear: '发布年份',
        chipModels: '个型号'
    },
    
    en: {
        siteTitle: 'AI Chip Navigator',
        siteDescription: 'Professional AI Chip Information Navigation Platform',
        heroTitle: 'Professional AI Chip Information Navigation Platform',
        heroSubtitle: 'Comprehensive global AI chip information with detailed technical specifications',
        
        navHome: 'Home',
        navCategories: 'Categories',
        navManufacturers: 'Manufacturers',
        navNews: 'News',
        navCompare: 'Compare',
        
        searchPlaceholder: 'Search chip models, manufacturers, or specifications...',
        searchButton: 'Search',
        
        training: 'Training',
        inference: 'Inference',
        edge: 'Edge Computing',
        gpu: 'GPU',
        npu: 'NPU',
        
        chipType: 'Type',
        chipPerformance: 'Performance',
        chipPower: 'Power',
        chipProcess: 'Process',
        chipMemory: 'Memory',
        chipYear: 'Release Year',
        chipModels: ' Models'
    }
};

// 导出翻译数据
window.translations = protectedTranslations;

// 添加页面离开时的数据清理
window.addEventListener('beforeunload', function() {
    // 清理敏感数据
    if (window.chipData) {
        window.chipData = null;
    }
    
    // 清理缓存
    sessionStorage.clear();
});

// 控制台警告
console.warn(`
⚠️  数据保护提醒
本网站数据受到保护，仅供正常用户浏览使用。
禁止爬取、复制或商业使用。
如需合作，请联系网站管理员。
`);

// 禁用常见的开发者工具快捷键（可选，可能影响正常用户体验）
document.addEventListener('keydown', function(e) {
    // 禁用F12, Ctrl+Shift+I, Ctrl+U等
    if (e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.key === 'u')) {
        e.preventDefault();
        console.log('开发者工具访问受限');
        return false;
    }
});

// 检测开发者工具打开（高级检测，可选）
(function() {
    let devtools = {
        open: false,
        orientation: null
    };
    
    const threshold = 160;
    
    setInterval(function() {
        if (window.outerHeight - window.innerHeight > threshold || 
            window.outerWidth - window.innerWidth > threshold) {
            if (!devtools.open) {
                devtools.open = true;
                console.log('检测到开发者工具打开');
                // 可以在这里添加额外的保护措施
            }
        } else {
            devtools.open = false;
        }
    }, 500);
})();