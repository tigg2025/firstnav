// SEO关键词分析和优化配置
// 基于当前搜索引擎趋势和AI芯片市场热点

const SEO_KEYWORDS = {
    // 核心关键词 (高搜索量，高竞争)
    primary: [
        'AI芯片',
        '人工智能芯片', 
        'GPU对比',
        'NPU性能',
        'ASIC芯片',
        'AI加速器',
        '深度学习芯片'
    ],
    
    // 品牌关键词 (高搜索量，中等竞争)
    brand: [
        '英伟达AI芯片',
        'NVIDIA H100',
        'NVIDIA A100', 
        'NVIDIA RTX 4090',
        'AMD AI芯片',
        'AMD Instinct',
        '华为昇腾',
        '华为麒麟AI',
        'Intel Gaudi',
        'Google TPU',
        'Apple M1 AI',
        'Qualcomm AI',
        '寒武纪芯片',
        '百度昆仑'
    ],
    
    // 应用场景关键词 (中等搜索量，低竞争)
    application: [
        'AI训练芯片',
        'AI推理芯片', 
        '边缘AI芯片',
        '自动驾驶芯片',
        '机器人AI芯片',
        '服务器AI芯片',
        '移动AI芯片',
        'IoT AI芯片',
        '云计算AI芯片',
        '数据中心AI芯片'
    ],
    
    // 技术规格关键词 (中等搜索量，低竞争)
    technical: [
        'AI芯片性能对比',
        'AI芯片功耗',
        'AI芯片算力',
        'TOPS性能',
        'HBM内存',
        '7nm AI芯片',
        '5nm AI芯片',
        '4nm AI芯片',
        'FP16性能',
        'BF16支持',
        'Transformer加速',
        '大模型推理'
    ],
    
    // 长尾关键词 (低搜索量，低竞争，高转化)
    longTail: [
        '2024最新AI芯片排行榜',
        'AI芯片选择指南',
        '深度学习训练用什么芯片',
        'AI推理加速卡推荐',
        '边缘计算AI芯片对比',
        '自动驾驶AI芯片哪个好',
        'ChatGPT用什么芯片训练',
        '大语言模型训练芯片',
        'AI芯片价格对比',
        '国产AI芯片有哪些',
        'GPU vs NPU 区别',
        'ASIC vs FPGA AI芯片',
        'AI服务器芯片配置',
        '机器学习硬件选择',
        'AI加速卡性价比'
    ],
    
    // 趋势关键词 (新兴搜索，潜力巨大)
    trending: [
        'AI芯片缺货',
        'AI芯片出口限制', 
        'AI芯片国产化',
        '生成式AI芯片',
        'AGI芯片',
        'AI芯片功耗优化',
        'AI芯片安全',
        '量子AI芯片',
        'AI芯片碳中和',
        'AI芯片供应链',
        'RISC-V AI芯片',
        '光电AI芯片'
    ],
    
    // 竞争对手分析关键词
    competitor: [
        'AI芯片网站',
        'AI芯片导航',
        'AI芯片数据库',
        'AI硬件评测',
        '芯片天梯图',
        'GPU天梯图',
        'AI芯片测评'
    ],
    
    // 地域关键词
    regional: [
        '中国AI芯片',
        '美国AI芯片',
        '日本AI芯片',
        '韩国AI芯片',
        '欧洲AI芯片',
        '台湾AI芯片',
        '深圳AI芯片',
        '北京AI芯片',
        '上海AI芯片'
    ]
};

// 关键词密度优化建议
const KEYWORD_DENSITY = {
    // 目标关键词密度 (%)
    target: {
        'AI芯片': 2.5,
        '人工智能芯片': 1.8,
        'GPU': 2.0,
        'NPU': 1.5,
        '深度学习': 1.2,
        '机器学习': 1.0
    },
    
    // 页面区域权重
    weights: {
        title: 10,
        h1: 8,
        h2: 6,
        h3: 4,
        meta_description: 8,
        first_paragraph: 6,
        body_text: 1,
        alt_text: 5,
        url: 7
    }
};

// 内容优化建议
const CONTENT_OPTIMIZATION = {
    // 文章主题建议
    articleTopics: [
        'AI芯片选购指南',
        '2024年AI芯片性能排行榜',
        'GPU vs NPU：AI芯片类型详解',
        '深度学习训练硬件配置指南',
        'AI推理加速优化方案',
        '边缘AI芯片应用案例',
        '自动驾驶AI芯片技术解析',
        '大模型训练硬件需求分析',
        'AI芯片功耗与性能平衡',
        '国产AI芯片发展现状'
    ],
    
    // FAQ优化建议
    faqTopics: [
        '什么是AI芯片？',
        'GPU和NPU有什么区别？',
        'AI芯片如何选择？',
        '深度学习需要什么硬件？',
        'AI训练和推理的硬件区别？',
        '边缘AI芯片有哪些优势？',
        'ASIC芯片适合什么场景？',
        'AI芯片的性能指标有哪些？',
        '如何评估AI芯片性价比？',
        '国产AI芯片发展如何？'
    ]
};

// 搜索趋势分析
const SEARCH_TRENDS = {
    // 季节性趋势
    seasonal: {
        Q1: ['AI芯片新品发布', '年度AI芯片总结'],
        Q2: ['AI芯片展会', 'GPU新架构'],
        Q3: ['AI芯片性能测试', '秋季新品'],
        Q4: ['AI芯片采购', '年终评选']
    },
    
    // 热点事件关联
    hotEvents: [
        'CES AI芯片展示',
        'COMPUTEX GPU发布',
        'GTC AI技术大会',
        'AI芯片IPO上市',
        '贸易政策影响',
        '技术突破新闻'
    ]
};

// 关键词监控配置
const KEYWORD_MONITORING = {
    // 需要监控排名的关键词
    trackingKeywords: [
        ...SEO_KEYWORDS.primary,
        ...SEO_KEYWORDS.brand.slice(0, 10),
        ...SEO_KEYWORDS.longTail.slice(0, 15)
    ],
    
    // 竞争对手网站
    competitors: [
        'techpowerup.com',
        'anandtech.com',
        'tomshardware.com',
        'guru3d.com'
    ],
    
    // 监控频率
    frequency: 'weekly'
};

// 导出配置
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        SEO_KEYWORDS,
        KEYWORD_DENSITY,
        CONTENT_OPTIMIZATION,
        SEARCH_TRENDS,
        KEYWORD_MONITORING
    };
} else {
    window.SEO_CONFIG = {
        SEO_KEYWORDS,
        KEYWORD_DENSITY,
        CONTENT_OPTIMIZATION,
        SEARCH_TRENDS,
        KEYWORD_MONITORING
    };
}