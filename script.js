// 全局变量
let currentLanguage = 'zh';
let searchResults = [];

// 初始化应用
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // 初始化 Lucide 图标
    lucide.createIcons();
    
    // 设置事件监听器
    setupEventListeners();
    
    // 渲染内容
    renderContent();
    
    // 渲染分类
    renderCategories();
    
    // 渲染热门芯片
    renderFeaturedChips();
}

function setupEventListeners() {
    // 语言切换器
    const langButton = document.getElementById('lang-button');
    const langDropdown = document.getElementById('lang-dropdown');
    
    langButton.addEventListener('click', function(e) {
        e.stopPropagation();
        langDropdown.classList.toggle('show');
    });
    
    // 点击外部关闭下拉菜单
    document.addEventListener('click', function() {
        langDropdown.classList.remove('show');
    });
    
    // 语言选项点击
    document.querySelectorAll('.lang-option').forEach(option => {
        option.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            switchLanguage(lang);
            langDropdown.classList.remove('show');
        });
    });
    
    // 搜索功能
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-btn');
    
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // 实时搜索建议
    searchInput.addEventListener('input', function() {
        const query = this.value.trim();
        if (query.length > 2) {
            showSearchSuggestions(query);
        } else {
            hideSearchSuggestions();
        }
    });
}

function switchLanguage(lang) {
    const previousLang = currentLanguage;
    currentLanguage = lang;
    
    // 分析追踪：语言切换事件
    if (typeof GA4_CONFIG !== 'undefined' && previousLang !== lang) {
        GA4_CONFIG.trackEvents.languageSwitch(previousLang, lang);
    }
    
    // 记录用户行为
    recordUserAction('language_switch', {
        fromLang: previousLang,
        toLang: lang
    });
    
    // 更新语言按钮显示
    const currentLangSpan = document.getElementById('current-lang');
    const langTexts = {
        'zh': '🇨🇳 中文',
        'en': '🇺🇸 English',
        'ja': '🇯🇵 日本語',
        'ko': '🇰🇷 한국어'
    };
    currentLangSpan.textContent = langTexts[lang];
    
    // 更新页面语言属性和meta标签
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang;
    updateMetaTags(lang);
    
    // 重新渲染内容
    renderContent();
    renderCategories();
    renderFeaturedChips();
}

// 动态更新meta标签以提升SEO
function updateMetaTags(lang) {
    const t = translations[lang];
    
    // 更新页面标题
    document.title = `${t.siteTitle} - ${t.siteDescription}`;
    
    // 更新meta描述
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        const descriptions = {
            'zh': '专业AI芯片导航平台，提供英伟达、AMD、华为等品牌最新AI芯片对比，包含GPU、NPU、ASIC性能参数、价格评测。助您选择最适合的深度学习训练和推理硬件',
            'en': 'Professional AI chip navigation platform providing the latest AI chip comparisons from NVIDIA, AMD, Huawei and other brands, including GPU, NPU, ASIC performance parameters and price reviews.',
            'ja': 'プロフェッショナルAIチップナビゲーションプラットフォーム。NVIDIA、AMD、Huaweiなどのブランドの最新AIチップ比較、GPU、NPU、ASIC性能パラメータと価格レビューを提供。',
            'ko': '전문 AI 칩 네비게이션 플랫폼. NVIDIA, AMD, Huawei 등 브랜드의 최신 AI 칩 비교, GPU, NPU, ASIC 성능 매개변수 및 가격 리뷰 제공.'
        };
        metaDesc.content = descriptions[lang] || descriptions['zh'];
    }
    
    // 更新Open Graph标签
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogTitle) ogTitle.content = `${t.siteTitle} - ${t.siteDescription}`;
    if (ogDesc) ogDesc.content = metaDesc?.content || descriptions[lang];
}

function renderContent() {
    const t = translations[currentLanguage];
    
    // 更新页面标题和描述
    document.title = t.siteTitle + ' - ' + t.siteDescription;
    
    // 更新页面元素
    const elementsToUpdate = [
        { id: 'site-title', text: t.siteTitle },
        { id: 'hero-title', text: t.heroTitle },
        { id: 'hero-subtitle', text: t.heroSubtitle },
        { id: 'nav-home', text: t.navHome },
        { id: 'nav-categories', text: t.navCategories },
        { id: 'nav-manufacturers', text: t.navManufacturers },
        { id: 'nav-news', text: t.navNews },
        { id: 'nav-compare', text: t.navCompare },
        { id: 'categories-title', text: t.categoriesTitle },
        { id: 'app-scenarios-title', text: t.appScenariosTitle },
        { id: 'hardware-types-title', text: t.hardwareTypesTitle },
        { id: 'deployment-title', text: t.deploymentTitle },
        { id: 'featured-title', text: t.featuredTitle },
        { id: 'stat-chips', text: t.statChips },
        { id: 'stat-vendors', text: t.statVendors },
        { id: 'stat-categories', text: t.statCategories },
        { id: 'stat-updates', text: t.statUpdates },
        { id: 'footer-title', text: t.footerTitle },
        { id: 'footer-desc', text: t.footerDesc },
        { id: 'footer-nav-title', text: t.footerNavTitle },
        { id: 'footer-nav-home', text: t.footerNavHome },
        { id: 'footer-nav-categories', text: t.footerNavCategories },
        { id: 'footer-nav-compare', text: t.footerNavCompare },
        { id: 'footer-hot-title', text: t.footerHotTitle },
        { id: 'footer-training', text: t.footerTraining },
        { id: 'footer-inference', text: t.footerInference },
        { id: 'footer-edge', text: t.footerEdge },
        { id: 'footer-about-title', text: t.footerAboutTitle },
        { id: 'footer-about', text: t.footerAbout },
        { id: 'footer-contact', text: t.footerContact },
        { id: 'footer-privacy', text: t.footerPrivacy },
        { id: 'footer-terms', text: t.footerTerms },
        { id: 'footer-copyright-title', text: t.footerCopyrightTitle },
        { id: 'footer-copyright', text: t.footerCopyright }
    ];
    
    elementsToUpdate.forEach(item => {
        const element = document.getElementById(item.id);
        if (element) {
            element.textContent = item.text;
        }
    });
    
    // 更新搜索框占位符
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.placeholder = t.searchPlaceholder;
    }
    
    // 更新搜索按钮
    const searchButton = document.getElementById('search-btn');
    if (searchButton) {
        searchButton.textContent = t.searchButton;
    }
}

function renderCategories() {
    const t = translations[currentLanguage];
    
    // 渲染应用场景
    renderCategoryGrid('app-scenarios-grid', chipData.applicationScenarios, t);
    
    // 渲染硬件类型
    renderCategoryGrid('hardware-types-grid', chipData.hardwareTypes, t);
    
    // 渲染部署位置
    renderCategoryGrid('deployment-grid', chipData.deploymentTypes, t);
}

function renderCategoryGrid(containerId, categories, translations) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // 确定分类类型
    const categoryTypeMap = {
        'app-scenarios-grid': 'application_scenarios',
        'hardware-types-grid': 'hardware_types', 
        'deployment-grid': 'deployment_types'
    };
    const categoryType = categoryTypeMap[containerId] || 'unknown';
    
    container.innerHTML = categories.map((category, index) => {
        const title = translations[category.id] || category.id;
        return `
            <div class="chip-card p-6 rounded-lg border-2 ${category.color} cursor-pointer transition-all duration-300"
                 data-category-id="${category.id}"
                 data-category-type="${categoryType}"
                 onclick="handleCategoryClick({id: '${category.id}', count: ${category.count}}, '${categoryType}')">
                <div class="flex items-center justify-between mb-4">
                    <div class="category-icon p-3 rounded-full bg-white">
                        <i data-lucide="${category.icon}" class="h-6 w-6 ${category.iconColor}"></i>
                    </div>
                    <span class="text-2xl font-bold text-gray-700">${category.count}</span>
                </div>
                <h5 class="text-lg font-semibold text-gray-900 mb-2">${title}</h5>
                <p class="text-gray-600 text-sm">${category.count}${translations.chipModels || ' models'}</p>
            </div>
        `;
    }).join('');
    
    // 重新初始化图标
    lucide.createIcons();
}

function renderFeaturedChips() {
    const t = translations[currentLanguage];
    const container = document.getElementById('featured-chips');
    if (!container) return;
    
    container.innerHTML = chipData.featuredChips.map(chip => `
        <div class="chip-card bg-white rounded-lg shadow-md p-6 border border-gray-200 cursor-pointer" 
             data-chip-id="${chip.id}" 
             onclick="handleChipClick('${chip.id}')">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <i data-lucide="chip" class="h-5 w-5 text-blue-600"></i>
                    </div>
                    <div>
                        <h4 class="font-semibold text-gray-900">${chip.vendor}</h4>
                        <p class="text-sm text-gray-600">${chip.model}</p>
                    </div>
                </div>
                <span class="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">${chip.type}</span>
            </div>
            
            <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                    <span class="text-gray-600">${t.chipPerformance}:</span>
                    <span class="font-medium">${chip.performance}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">${t.chipPower}:</span>
                    <span class="font-medium">${chip.power}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">${t.chipProcess}:</span>
                    <span class="font-medium">${chip.process}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">${t.chipMemory}:</span>
                    <span class="font-medium">${chip.memory}</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-gray-600">${t.chipYear}:</span>
                    <span class="font-medium">${chip.releaseYear}</span>
                </div>
            </div>
            
            <div class="mt-4 pt-4 border-t border-gray-100">
                <div class="flex flex-wrap gap-1">
                    ${chip.applications.map(app => `
                        <span class="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                            ${translations[currentLanguage][app] || app}
                        </span>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');
    
    // 重新初始化图标
    lucide.createIcons();
}

function performSearch() {
    const searchInput = document.getElementById('search-input');
    const query = searchInput.value.trim().toLowerCase();
    
    if (!query) return;
    
    // 搜索芯片数据
    searchResults = chipData.featuredChips.filter(chip => 
        chip.vendor.toLowerCase().includes(query) ||
        chip.model.toLowerCase().includes(query) ||
        chip.type.toLowerCase().includes(query) ||
        chip.applications.some(app => app.toLowerCase().includes(query))
    );
    
    // 分析追踪：搜索事件
    if (typeof GA4_CONFIG !== 'undefined') {
        GA4_CONFIG.trackEvents.search(query, searchResults.length);
    }
    
    // 显示搜索结果
    displaySearchResults(query);
}

// 处理芯片点击事件
function handleChipClick(chipId) {
    const chip = chipData.featuredChips.find(c => c.id === chipId);
    if (!chip) return;
    
    // 分析追踪：芯片点击事件
    if (typeof GA4_CONFIG !== 'undefined') {
        GA4_CONFIG.trackEvents.chipClick(chip);
    }
    
    // 记录用户行为
    recordUserAction('chip_click', {
        chipId: chip.id,
        vendor: chip.vendor,
        type: chip.type
    });
    
    // 这里可以添加芯片详情页面跳转或模态框显示
    console.log('用户点击了芯片:', chip.vendor, chip.model);
}

// 处理分类点击事件  
function handleCategoryClick(category, categoryType) {
    // 分析追踪：分类浏览事件
    if (typeof GA4_CONFIG !== 'undefined') {
        GA4_CONFIG.trackEvents.categoryView(category, categoryType);
    }
    
    // 记录用户行为
    recordUserAction('category_view', {
        categoryId: category.id,
        categoryType: categoryType,
        count: category.count
    });
    
    console.log('用户浏览了分类:', categoryType, category.id);
}

// 记录用户行为用于分析
function recordUserAction(actionType, data) {
    const actions = JSON.parse(sessionStorage.getItem('userActions') || '[]');
    actions.push({
        type: actionType,
        data: data,
        timestamp: Date.now(),
        language: currentLanguage
    });
    
    sessionStorage.setItem('userActions', JSON.stringify(actions));
    
    // 每5个动作分析一次用户意图
    if (actions.length % 5 === 0 && typeof GA4_CONFIG !== 'undefined') {
        GA4_CONFIG.trackEvents.analyzeUserIntent(actions);
    }
}

function displaySearchResults(query) {
    const t = translations[currentLanguage];
    
    // 创建搜索结果模态框
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
        <div class="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div class="sticky top-0 bg-white border-b p-6">
                <div class="flex items-center justify-between">
                    <h3 class="text-xl font-bold">搜索结果: "${query}"</h3>
                    <button class="close-modal text-gray-500 hover:text-gray-700">
                        <i data-lucide="x" class="h-6 w-6"></i>
                    </button>
                </div>
                <p class="text-gray-600 mt-2">找到 ${searchResults.length} 个相关结果</p>
            </div>
            <div class="p-6">
                ${searchResults.length > 0 ? 
                    `<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        ${searchResults.map(chip => `
                            <div class="chip-card bg-gray-50 rounded-lg p-4 border">
                                <div class="flex items-center space-x-3 mb-3">
                                    <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <i data-lucide="chip" class="h-4 w-4 text-blue-600"></i>
                                    </div>
                                    <div>
                                        <h4 class="font-semibold">${chip.vendor} ${chip.model}</h4>
                                        <p class="text-sm text-gray-600">${chip.type}</p>
                                    </div>
                                </div>
                                <div class="text-sm space-y-1">
                                    <div class="flex justify-between">
                                        <span class="text-gray-600">${t.chipPerformance}:</span>
                                        <span>${chip.performance}</span>
                                    </div>
                                    <div class="flex justify-between">
                                        <span class="text-gray-600">${t.chipPower}:</span>
                                        <span>${chip.power}</span>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>` 
                    : '<p class="text-center text-gray-500 py-8">未找到相关结果</p>'
                }
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    lucide.createIcons();
    
    // 关闭模态框
    modal.querySelector('.close-modal').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

function showSearchSuggestions(query) {
    // 简单的搜索建议实现
    const suggestions = [];
    
    // 从芯片数据中获取建议
    chipData.featuredChips.forEach(chip => {
        if (chip.vendor.toLowerCase().includes(query.toLowerCase())) {
            suggestions.push(chip.vendor);
        }
        if (chip.model.toLowerCase().includes(query.toLowerCase())) {
            suggestions.push(`${chip.vendor} ${chip.model}`);
        }
    });
    
    // 去重并限制数量
    const uniqueSuggestions = [...new Set(suggestions)].slice(0, 5);
    
    if (uniqueSuggestions.length > 0) {
        displaySuggestions(uniqueSuggestions);
    }
}

function displaySuggestions(suggestions) {
    // 移除现有的建议框
    const existingSuggestions = document.querySelector('.search-suggestions');
    if (existingSuggestions) {
        existingSuggestions.remove();
    }
    
    // 创建建议框
    const suggestionsBox = document.createElement('div');
    suggestionsBox.className = 'search-suggestions absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 z-10';
    suggestionsBox.innerHTML = suggestions.map(suggestion => `
        <div class="suggestion-item px-4 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0">
            ${suggestion}
        </div>
    `).join('');
    
    // 添加到搜索框容器
    const searchContainer = document.querySelector('.max-w-2xl.mx-auto.relative');
    searchContainer.appendChild(suggestionsBox);
    
    // 添加点击事件
    suggestionsBox.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', () => {
            document.getElementById('search-input').value = item.textContent;
            performSearch();
            hideSearchSuggestions();
        });
    });
}

function hideSearchSuggestions() {
    const suggestions = document.querySelector('.search-suggestions');
    if (suggestions) {
        suggestions.remove();
    }
}

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 响应式导航菜单（移动端）
function setupMobileMenu() {
    // 可以在这里添加移动端导航菜单的逻辑
    // 当前设计使用了响应式类，在小屏幕下会隐藏导航
}

// 页面加载完成后的额外初始化
window.addEventListener('load', function() {
    // 添加页面加载动画
    document.body.classList.add('loaded');
    
    // 设置移动端菜单
    setupMobileMenu();
    
    // 添加滚动事件监听
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const header = document.querySelector('header');
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // 向下滚动时隐藏导航
            header.style.transform = 'translateY(-100%)';
        } else {
            // 向上滚动时显示导航
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
});