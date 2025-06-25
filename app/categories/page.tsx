"use client"

// Metadata cannot be exported from client components
// This page uses client-side state, so metadata is defined in layout.tsx

import { ArrowLeft, Cpu, Grid, List } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { CHIP_DATA } from "@/lib/constants"

// 扩展芯片数据用于演示
const extendedChipData = [
  ...CHIP_DATA.map(chip => ({
    id: chip.id,
    name: chip.name,
    manufacturer: chip.manufacturer,
    category: getCategoryDisplayName(chip.category),
    process: chip.process,
    cores: chip.specs.cores,
    baseFreq: "未公布",
    memory: chip.specs.memory,
    tdp: chip.specs.tdp,
    releaseDate: chip.releaseDate,
    price: chip.price,
    description: chip.description,
  })),
  // 添加一些模拟数据
  {
    id: "intel-i9-14900k",
    name: "Intel Core i9-14900K",
    manufacturer: "Intel",
    category: "处理器",
    process: "Intel 7",
    cores: "24核心 (8P+16E)",
    baseFreq: "3.2 GHz",
    memory: "DDR5-5600",
    tdp: "125W",
    releaseDate: "2023-10",
    price: "高端",
    description: "英特尔第14代酷睿旗舰处理器",
  },
  {
    id: "amd-ryzen-9-7950x",
    name: "AMD Ryzen 9 7950X",
    manufacturer: "AMD",
    category: "处理器",
    process: "TSMC 5nm",
    cores: "16核心32线程",
    baseFreq: "4.5 GHz",
    memory: "DDR5-5200",
    tdp: "170W",
    releaseDate: "2022-09",
    price: "高端",
    description: "AMD Zen 4架构旗舰处理器",
  },
  {
    id: "rtx-4090",
    name: "NVIDIA RTX 4090",
    manufacturer: "NVIDIA",
    category: "显卡芯片",
    process: "TSMC 4N",
    cores: "16384 CUDA核心",
    baseFreq: "2.2 GHz",
    memory: "24GB GDDR6X",
    tdp: "450W",
    releaseDate: "2022-10",
    price: "高端",
    description: "NVIDIA最强消费级显卡芯片",
  },
]

function getCategoryDisplayName(category: string): string {
  const categoryMap = {
    training: "AI训练",
    inference: "AI推理", 
    edge: "边缘计算",
    datacenter: "数据中心"
  }
  return categoryMap[category as keyof typeof categoryMap] || category
}

export default function CategoriesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("name")
  const [filterCategory, setFilterCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredChips = extendedChipData.filter((chip) => {
    const matchesSearch =
      chip.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chip.manufacturer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === "all" || chip.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const sortedChips = [...filteredChips].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name)
      case "manufacturer":
        return a.manufacturer.localeCompare(b.manufacturer)
      case "releaseDate":
        return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
      default:
        return 0
    }
  })

  const categories = Array.from(new Set(extendedChipData.map(chip => chip.category)))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <ArrowLeft className="h-5 w-5" />
                <span>返回首页</span>
              </Link>
              <div className="flex items-center space-x-2">
                <Cpu className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">芯片分类</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <Input
                placeholder="搜索芯片..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-xs"
              />
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="max-w-xs">
                  <SelectValue placeholder="选择分类" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有分类</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="max-w-xs">
                  <SelectValue placeholder="排序方式" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">按名称</SelectItem>
                  <SelectItem value="manufacturer">按厂商</SelectItem>
                  <SelectItem value="releaseDate">按发布时间</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">找到 {sortedChips.length} 款芯片</p>
        </div>

        {/* Chips Display */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedChips.map((chip) => (
              <Card key={chip.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{chip.name}</CardTitle>
                    <Badge variant="outline">{chip.price}</Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">{chip.manufacturer}</Badge>
                    <Badge variant="outline">{chip.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="font-medium">制程：</span>
                      <span className="text-gray-600">{chip.process}</span>
                    </div>
                    <div>
                      <span className="font-medium">核心：</span>
                      <span className="text-gray-600">{chip.cores}</span>
                    </div>
                    <div>
                      <span className="font-medium">频率：</span>
                      <span className="text-gray-600">{chip.baseFreq}</span>
                    </div>
                    <div>
                      <span className="font-medium">TDP：</span>
                      <span className="text-gray-600">{chip.tdp}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{chip.description}</p>
                  <div className="text-xs text-gray-500">发布时间：{chip.releaseDate}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {sortedChips.map((chip) => (
              <Card key={chip.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold">{chip.name}</h3>
                        <Badge variant="secondary">{chip.manufacturer}</Badge>
                        <Badge variant="outline">{chip.category}</Badge>
                        <Badge variant="outline">{chip.price}</Badge>
                      </div>
                      <p className="text-gray-600 mb-3">{chip.description}</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="font-medium">制程：</span>
                          <span className="text-gray-600">{chip.process}</span>
                        </div>
                        <div>
                          <span className="font-medium">核心：</span>
                          <span className="text-gray-600">{chip.cores}</span>
                        </div>
                        <div>
                          <span className="font-medium">频率：</span>
                          <span className="text-gray-600">{chip.baseFreq}</span>
                        </div>
                        <div>
                          <span className="font-medium">TDP：</span>
                          <span className="text-gray-600">{chip.tdp}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 lg:mt-0 lg:ml-6">
                      <div className="text-sm text-gray-500">{chip.releaseDate}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {sortedChips.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">没有找到匹配的芯片</p>
            <p className="text-gray-400 mt-2">请尝试调整搜索条件或筛选器</p>
          </div>
        )}
      </div>
    </div>
  )
}
