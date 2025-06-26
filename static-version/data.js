// AI芯片数据和多语言配置
const chipData = {
    // 应用场景分类
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
        },
        {
            id: 'cloud',
            icon: 'cloud',
            color: 'bg-orange-100 border-orange-200 hover:bg-orange-200',
            iconColor: 'text-orange-600',
            count: 36
        },
        {
            id: 'automotive',
            icon: 'car',
            color: 'bg-red-100 border-red-200 hover:bg-red-200',
            iconColor: 'text-red-600',
            count: 29
        },
        {
            id: 'robotics',
            icon: 'bot',
            color: 'bg-indigo-100 border-indigo-200 hover:bg-indigo-200',
            iconColor: 'text-indigo-600',
            count: 33
        }
    ],

    // 硬件类型分类
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
        },
        {
            id: 'asic',
            icon: 'chip',
            color: 'bg-purple-100 border-purple-200 hover:bg-purple-200',
            iconColor: 'text-purple-600',
            count: 45
        },
        {
            id: 'fpga',
            icon: 'circuit-board',
            color: 'bg-orange-100 border-orange-200 hover:bg-orange-200',
            iconColor: 'text-orange-600',
            count: 38
        },
        {
            id: 'soc',
            icon: 'microchip',
            color: 'bg-red-100 border-red-200 hover:bg-red-200',
            iconColor: 'text-red-600',
            count: 56
        },
        {
            id: 'neuromorphic',
            icon: 'brain-circuit',
            color: 'bg-indigo-100 border-indigo-200 hover:bg-indigo-200',
            iconColor: 'text-indigo-600',
            count: 12
        }
    ],

    // 部署位置分类
    deploymentTypes: [
        {
            id: 'datacenter',
            icon: 'server',
            color: 'bg-blue-100 border-blue-200 hover:bg-blue-200',
            iconColor: 'text-blue-600',
            count: 78
        },
        {
            id: 'edge-device',
            icon: 'smartphone',
            color: 'bg-green-100 border-green-200 hover:bg-green-200',
            iconColor: 'text-green-600',
            count: 65
        },
        {
            id: 'embedded',
            icon: 'cpu',
            color: 'bg-purple-100 border-purple-200 hover:bg-purple-200',
            iconColor: 'text-purple-600',
            count: 43
        },
        {
            id: 'mobile',
            icon: 'tablet',
            color: 'bg-orange-100 border-orange-200 hover:bg-orange-200',
            iconColor: 'text-orange-600',
            count: 39
        },
        {
            id: 'iot',
            icon: 'wifi',
            color: 'bg-red-100 border-red-200 hover:bg-red-200',
            iconColor: 'text-red-600',
            count: 47
        },
        {
            id: 'hybrid',
            icon: 'layers',
            color: 'bg-indigo-100 border-indigo-200 hover:bg-indigo-200',
            iconColor: 'text-indigo-600',
            count: 28
        }
    ],

    // 热门芯片数据
    featuredChips: [
        {
            id: 'h100',
            vendor: 'NVIDIA',
            model: 'H100',
            type: 'GPU',
            performance: '1000 TOPS',
            power: '700W',
            process: '4nm',
            memory: '80GB HBM3',
            applications: ['training', 'inference'],
            releaseYear: 2022
        },
        {
            id: 'a100',
            vendor: 'NVIDIA',
            model: 'A100',
            type: 'GPU',
            performance: '624 TOPS',
            power: '400W',
            process: '7nm',
            memory: '80GB HBM2e',
            applications: ['training', 'inference'],
            releaseYear: 2020
        },
        {
            id: 'tpu-v4',
            vendor: 'Google',
            model: 'TPU v4',
            type: 'ASIC',
            performance: '275 TOPS',
            power: '200W',
            process: '7nm',
            memory: '32GB HBM2',
            applications: ['training', 'inference'],
            releaseYear: 2021
        },
        {
            id: 'ascend-910',
            vendor: 'Huawei',
            model: 'Ascend 910',
            type: 'NPU',
            performance: '256 TOPS',
            power: '310W',
            process: '7nm',
            memory: '32GB HBM2',
            applications: ['training'],
            releaseYear: 2019
        },
        {
            id: 'm1-ultra',
            vendor: 'Apple',
            model: 'M1 Ultra',
            type: 'SoC',
            performance: '22 TOPS',
            power: '60W',
            process: '5nm',
            memory: '128GB',
            applications: ['inference', 'edge'],
            releaseYear: 2022
        },
        {
            id: 'snapdragon-8cx',
            vendor: 'Qualcomm',
            model: 'Snapdragon 8cx',
            type: 'SoC',
            performance: '15 TOPS',
            power: '7W',
            process: '7nm',
            memory: '16GB',
            applications: ['edge', 'mobile'],
            releaseYear: 2021
        },
        {
            id: 'intel-gaudi2',
            vendor: 'Intel',
            model: 'Gaudi2',
            type: 'ASIC',
            performance: '380 TOPS',
            power: '600W',
            process: '7nm',
            memory: '96GB HBM2e',
            applications: ['training'],
            releaseYear: 2022
        },
        {
            id: 'amd-instinct',
            vendor: 'AMD',
            model: 'Instinct MI250X',
            type: 'GPU',
            performance: '383 TOPS',
            power: '560W',
            process: '6nm',
            memory: '128GB HBM2e',
            applications: ['training', 'inference'],
            releaseYear: 2021
        }
    ]
};

// 多语言配置
const translations = {
    zh: {
        // 网站标题和描述
        siteTitle: 'AI芯片导航',
        siteDescription: '专业的AI芯片信息导航平台',
        heroTitle: '专业的AI芯片信息导航平台',
        heroSubtitle: '汇聚全球AI芯片信息，提供详细的技术参数、性能对比和最新资讯',
        
        // 导航菜单
        navHome: '首页',
        navCategories: '分类',
        navManufacturers: '厂商',
        navNews: '资讯',
        navCompare: '对比',
        
        // 搜索
        searchPlaceholder: '搜索芯片型号、厂商或技术规格...',
        searchButton: '搜索',
        
        // 分类标题
        categoriesTitle: '芯片分类',
        appScenariosTitle: '应用场景',
        hardwareTypesTitle: '硬件类型',
        deploymentTitle: '部署位置',
        featuredTitle: '热门芯片',
        
        // 应用场景
        training: '训练',
        inference: '推理',
        edge: '边缘计算',
        cloud: '云计算',
        automotive: '自动驾驶',
        robotics: '机器人',
        
        // 硬件类型
        gpu: 'GPU',
        npu: 'NPU',
        asic: 'ASIC',
        fpga: 'FPGA',
        soc: 'SoC',
        neuromorphic: '神经形态',
        
        // 部署位置
        datacenter: '数据中心',
        edgeDevice: '边缘设备',
        embedded: '嵌入式',
        mobile: '移动设备',
        iot: '物联网',
        hybrid: '混合部署',
        
        // 统计信息
        statChips: 'AI芯片型号',
        statVendors: '芯片厂商',
        statCategories: '主要分类',
        statUpdates: '实时更新',
        
        // 页脚
        footerTitle: 'AI芯片导航',
        footerDesc: '专业的AI芯片信息导航平台，为您提供最全面的AI芯片技术资讯。',
        footerNavTitle: '快速导航',
        footerNavHome: '首页',
        footerNavCategories: '分类',
        footerNavCompare: '对比',
        footerHotTitle: '热门分类',
        footerTraining: '训练',
        footerInference: '推理',
        footerEdge: '边缘',
        footerAboutTitle: '关于我们',
        footerAbout: '关于我们',
        footerContact: '联系我们',
        footerPrivacy: '隐私政策',
        footerTerms: '使用条款',
        footerCopyrightTitle: 'AI芯片导航',
        footerCopyright: '保留所有权利.',
        
        // 芯片卡片
        chipType: '类型',
        chipPerformance: '性能',
        chipPower: '功耗',
        chipProcess: '工艺',
        chipMemory: '内存',
        chipYear: '发布年份',
        chipModels: '个型号'
    },
    
    en: {
        // Site title and description
        siteTitle: 'AI Chip Navigator',
        siteDescription: 'Professional AI Chip Information Navigation Platform',
        heroTitle: 'Professional AI Chip Information Navigation Platform',
        heroSubtitle: 'Comprehensive global AI chip information with detailed technical specifications, performance comparisons, and latest news',
        
        // Navigation menu
        navHome: 'Home',
        navCategories: 'Categories',
        navManufacturers: 'Manufacturers',
        navNews: 'News',
        navCompare: 'Compare',
        
        // Search
        searchPlaceholder: 'Search chip models, manufacturers, or specifications...',
        searchButton: 'Search',
        
        // Category titles
        categoriesTitle: 'Chip Categories',
        appScenariosTitle: 'Application Scenarios',
        hardwareTypesTitle: 'Hardware Types',
        deploymentTitle: 'Deployment Locations',
        featuredTitle: 'Featured Chips',
        
        // Application scenarios
        training: 'Training',
        inference: 'Inference',
        edge: 'Edge Computing',
        cloud: 'Cloud Computing',
        automotive: 'Automotive',
        robotics: 'Robotics',
        
        // Hardware types
        gpu: 'GPU',
        npu: 'NPU',
        asic: 'ASIC',
        fpga: 'FPGA',
        soc: 'SoC',
        neuromorphic: 'Neuromorphic',
        
        // Deployment locations
        datacenter: 'Data Center',
        edgeDevice: 'Edge Device',
        embedded: 'Embedded',
        mobile: 'Mobile',
        iot: 'IoT',
        hybrid: 'Hybrid',
        
        // Statistics
        statChips: 'AI Chip Models',
        statVendors: 'Chip Vendors',
        statCategories: 'Main Categories',
        statUpdates: 'Real-time Updates',
        
        // Footer
        footerTitle: 'AI Chip Navigator',
        footerDesc: 'Professional AI chip information navigation platform providing comprehensive AI chip technical information.',
        footerNavTitle: 'Quick Navigation',
        footerNavHome: 'Home',
        footerNavCategories: 'Categories',
        footerNavCompare: 'Compare',
        footerHotTitle: 'Hot Categories',
        footerTraining: 'Training',
        footerInference: 'Inference',
        footerEdge: 'Edge',
        footerAboutTitle: 'About Us',
        footerAbout: 'About Us',
        footerContact: 'Contact Us',
        footerPrivacy: 'Privacy Policy',
        footerTerms: 'Terms of Service',
        footerCopyrightTitle: 'AI Chip Navigator',
        footerCopyright: 'All rights reserved.',
        
        // Chip cards
        chipType: 'Type',
        chipPerformance: 'Performance',
        chipPower: 'Power',
        chipProcess: 'Process',
        chipMemory: 'Memory',
        chipYear: 'Release Year',
        chipModels: ' Models'
    },
    
    ja: {
        // サイトタイトルと説明
        siteTitle: 'AIチップナビゲーター',
        siteDescription: 'プロフェッショナルAIチップ情報ナビゲーションプラットフォーム',
        heroTitle: 'プロフェッショナルAIチップ情報ナビゲーションプラットフォーム',
        heroSubtitle: '世界のAIチップ情報を集約し、詳細な技術仕様、性能比較、最新ニュースを提供',
        
        // ナビゲーションメニュー
        navHome: 'ホーム',
        navCategories: 'カテゴリー',
        navManufacturers: 'メーカー',
        navNews: 'ニュース',
        navCompare: '比較',
        
        // 検索
        searchPlaceholder: 'チップモデル、メーカー、仕様を検索...',
        searchButton: '検索',
        
        // カテゴリータイトル
        categoriesTitle: 'チップカテゴリー',
        appScenariosTitle: 'アプリケーションシナリオ',
        hardwareTypesTitle: 'ハードウェアタイプ',
        deploymentTitle: 'デプロイメント場所',
        featuredTitle: '注目のチップ',
        
        // アプリケーションシナリオ
        training: 'トレーニング',
        inference: '推論',
        edge: 'エッジコンピューティング',
        cloud: 'クラウドコンピューティング',
        automotive: '自動車',
        robotics: 'ロボティクス',
        
        // ハードウェアタイプ
        gpu: 'GPU',
        npu: 'NPU',
        asic: 'ASIC',
        fpga: 'FPGA',
        soc: 'SoC',
        neuromorphic: 'ニューロモルフィック',
        
        // デプロイメント場所
        datacenter: 'データセンター',
        edgeDevice: 'エッジデバイス',
        embedded: '組み込み',
        mobile: 'モバイル',
        iot: 'IoT',
        hybrid: 'ハイブリッド',
        
        // 統計情報
        statChips: 'AIチップモデル',
        statVendors: 'チップベンダー',
        statCategories: '主要カテゴリー',
        statUpdates: 'リアルタイム更新',
        
        // フッター
        footerTitle: 'AIチップナビゲーター',
        footerDesc: '包括的なAIチップ技術情報を提供するプロフェッショナルなAIチップ情報ナビゲーションプラットフォーム。',
        footerNavTitle: 'クイックナビゲーション',
        footerNavHome: 'ホーム',
        footerNavCategories: 'カテゴリー',
        footerNavCompare: '比較',
        footerHotTitle: '人気カテゴリー',
        footerTraining: 'トレーニング',
        footerInference: '推論',
        footerEdge: 'エッジ',
        footerAboutTitle: '会社情報',
        footerAbout: '会社情報',
        footerContact: 'お問い合わせ',
        footerPrivacy: 'プライバシーポリシー',
        footerTerms: '利用規約',
        footerCopyrightTitle: 'AIチップナビゲーター',
        footerCopyright: '全著作権所有。',
        
        // チップカード
        chipType: 'タイプ',
        chipPerformance: 'パフォーマンス',
        chipPower: '消費電力',
        chipProcess: 'プロセス',
        chipMemory: 'メモリ',
        chipYear: 'リリース年',
        chipModels: 'モデル'
    },
    
    ko: {
        // 사이트 제목과 설명
        siteTitle: 'AI 칩 네비게이터',
        siteDescription: '전문 AI 칩 정보 네비게이션 플랫폼',
        heroTitle: '전문 AI 칩 정보 네비게이션 플랫폼',
        heroSubtitle: '전 세계 AI 칩 정보를 집약하여 상세한 기술 사양, 성능 비교 및 최신 뉴스 제공',
        
        // 네비게이션 메뉴
        navHome: '홈',
        navCategories: '카테고리',
        navManufacturers: '제조사',
        navNews: '뉴스',
        navCompare: '비교',
        
        // 검색
        searchPlaceholder: '칩 모델, 제조사 또는 사양 검색...',
        searchButton: '검색',
        
        // 카테고리 제목
        categoriesTitle: '칩 카테고리',
        appScenariosTitle: '응용 시나리오',
        hardwareTypesTitle: '하드웨어 유형',
        deploymentTitle: '배포 위치',
        featuredTitle: '주요 칩',
        
        // 응용 시나리오
        training: '훈련',
        inference: '추론',
        edge: '엣지 컴퓨팅',
        cloud: '클라우드 컴퓨팅',
        automotive: '자율주행',
        robotics: '로보틱스',
        
        // 하드웨어 유형
        gpu: 'GPU',
        npu: 'NPU',
        asic: 'ASIC',
        fpga: 'FPGA',
        soc: 'SoC',
        neuromorphic: '뉴로모픽',
        
        // 배포 위치
        datacenter: '데이터센터',
        edgeDevice: '엣지 디바이스',
        embedded: '임베디드',
        mobile: '모바일',
        iot: 'IoT',
        hybrid: '하이브리드',
        
        // 통계 정보
        statChips: 'AI 칩 모델',
        statVendors: '칩 벤더',
        statCategories: '주요 카테고리',
        statUpdates: '실시간 업데이트',
        
        // 푸터
        footerTitle: 'AI 칩 네비게이터',
        footerDesc: '포괄적인 AI 칩 기술 정보를 제공하는 전문 AI 칩 정보 네비게이션 플랫폼.',
        footerNavTitle: '빠른 네비게이션',
        footerNavHome: '홈',
        footerNavCategories: '카테고리',
        footerNavCompare: '비교',
        footerHotTitle: '인기 카테고리',
        footerTraining: '훈련',
        footerInference: '추론',
        footerEdge: '엣지',
        footerAboutTitle: '회사 소개',
        footerAbout: '회사 소개',
        footerContact: '연락처',
        footerPrivacy: '개인정보처리방침',
        footerTerms: '이용약관',
        footerCopyrightTitle: 'AI 칩 네비게이터',
        footerCopyright: '모든 권리 보유.',
        
        // 칩 카드
        chipType: '유형',
        chipPerformance: '성능',
        chipPower: '전력',
        chipProcess: '공정',
        chipMemory: '메모리',
        chipYear: '출시 연도',
        chipModels: '개 모델'
    }
};