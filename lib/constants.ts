// 芯片数据
export const CHIP_DATA = [
  {
    id: "h100",
    name: "NVIDIA H100",
    manufacturer: "NVIDIA",
    category: "training",
    process: "TSMC 4nm",
    performance: "1000 TFLOPS (BF16)",
    precision: ["FP32", "FP16", "BF16", "INT8"],
    deployment: "datacenter",
    description: "NVIDIA最新的AI训练芯片，专为大模型训练优化",
    releaseDate: "2022-03",
    price: "高端",
    specs: {
      cores: "16896 CUDA核心",
      memory: "80GB HBM3",
      memoryBandwidth: "3.35TB/s",
      tdp: "700W",
      interconnect: "NVLink 18 600GB/s"
    }
  },
  {
    id: "tpu-v5e",
    name: "Google TPU v5e",
    manufacturer: "Google",
    category: "inference",
    process: "未公布",
    performance: "393 TOPS (INT8)",
    precision: ["BF16", "INT8"],
    deployment: "datacenter",
    description: "Google自研的AI推理芯片，优化推理性能",
    releaseDate: "2023-08",
    price: "企业级",
    specs: {
      cores: "未公布",
      memory: "16GB HBM",
      memoryBandwidth: "未公布",
      tdp: "未公布",
      interconnect: "ICI"
    }
  },
  {
    id: "m3-neural-engine",
    name: "Apple M3 Neural Engine",
    manufacturer: "Apple",
    category: "edge",
    process: "TSMC 3nm",
    performance: "18 TOPS",
    precision: ["FP16", "INT8"],
    deployment: "edge",
    description: "苹果M3芯片的AI加速单元，专为端侧AI优化",
    releaseDate: "2023-10",
    price: "消费级",
    specs: {
      cores: "16核神经引擎",
      memory: "统一内存",
      memoryBandwidth: "300GB/s",
      tdp: "集成设计",
      interconnect: "统一内存架构"
    }
  },
  {
    id: "snapdragon-8-gen3-ai",
    name: "Qualcomm AI Engine",
    manufacturer: "Qualcomm",
    category: "edge",
    process: "TSMC 4nm",
    performance: "75 TOPS",
    precision: ["FP16", "INT8", "INT4"],
    deployment: "edge",
    description: "高通骁龙8 Gen 3的AI引擎，移动端AI性能领先",
    releaseDate: "2023-10",
    price: "消费级",
    specs: {
      cores: "Hexagon NPU",
      memory: "LPDDR5X",
      memoryBandwidth: "未公布",
      tdp: "集成设计",
      interconnect: "SoC内部总线"
    }
  }
] as const

// 芯片分类定义
export const CHIP_CATEGORIES = {
  application: {
    id: "application",
    name: "应用场景",
    items: [
      { id: "training", name: "训练", description: "大模型训练专用芯片", icon: "Brain" },
      { id: "inference", name: "推理", description: "AI推理加速芯片", icon: "Zap" },
      { id: "edge", name: "边缘", description: "边缘计算AI芯片", icon: "Smartphone" }
    ]
  },
  hardware: {
    id: "hardware",
    name: "硬件类型",
    items: [
      { id: "gpu", name: "GPU", description: "图形处理器", icon: "Cpu" },
      { id: "npu", name: "NPU", description: "神经网络处理器", icon: "Brain" },
      { id: "asic", name: "ASIC", description: "专用集成电路", icon: "Cpu" }
    ]
  },
  deployment: {
    id: "deployment",
    name: "部署位置",
    items: [
      { id: "datacenter", name: "数据中心", description: "数据中心级AI芯片", icon: "Server" },
      { id: "edge", name: "端侧设备", description: "移动设备和边缘设备", icon: "Smartphone" }
    ]
  },
  vendor: {
    id: "vendor",
    name: "厂商类型",
    items: [
      { id: "commercial", name: "商业化厂商", description: "NVIDIA、AMD等商业厂商", icon: "Building" },
      { id: "inhouse", name: "自研芯片", description: "Tesla、Google等自研芯片", icon: "Cpu" }
    ]
  }
} as const

// 网站配置
export const SITE_CONFIG = {
  name: "AI芯片导航",
  description: "专业的AI芯片信息导航平台",
  url: "https://ai-chip-navigator.com",
  ogImage: "/og-image.jpg",
  creator: "AI Chip Navigator Team",
  keywords: [
    "AI芯片", "人工智能芯片", "GPU", "NPU", "ASIC", "FPGA",
    "芯片导航", "芯片对比", "AI训练", "AI推理", "边缘计算"
  ]
} as const

// 统计数据
export const STATS = {
  chips: 500,
  vendors: 80,
  categories: 5,
  updates: "24/7"
} as const 