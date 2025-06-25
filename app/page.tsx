"use client"

import { Search, Cpu, Brain, Server, Zap, Building, Smartphone } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/hooks/useLanguage"
import { CHIP_DATA, CHIP_CATEGORIES, STATS } from "@/lib/constants"

// 图标映射
const iconMap = {
  Brain,
  Zap,
  Smartphone,
  Cpu,
  Server,
  Building
}

export default function HomePage() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")

  const getChipCategories = () => {
    return Object.values(CHIP_CATEGORIES).flatMap(category =>
      category.items.map(item => ({
        ...item,
        icon: iconMap[item.icon as keyof typeof iconMap],
        count: CHIP_DATA.filter(chip => chip.category === item.id || chip.deployment === item.id).length,
        color: getColorForCategory(item.id),
        category: category.id
      }))
    )
  }

  const getColorForCategory = (id: string) => {
    const colors = {
      training: "bg-blue-500",
      inference: "bg-green-500",
      edge: "bg-purple-500",
      gpu: "bg-orange-500",
      npu: "bg-cyan-500",
      asic: "bg-rose-500",
      datacenter: "bg-red-500",
      commercial: "bg-indigo-500",
      inhouse: "bg-pink-500"
    }
    return colors[id as keyof typeof colors] || "bg-gray-500"
  }

  const chipCategories = getChipCategories()
  const featuredChips = CHIP_DATA.slice(0, 4)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Brain className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <nav className="hidden md:flex space-x-8">
                <Link href="/" className="text-gray-900 font-medium">
                  {t.nav.home}
                </Link>
                <Link href="/categories" className="text-gray-600 hover:text-gray-900">
                  {t.nav.categories}
                </Link>
                <Link href="/manufacturers" className="text-gray-600 hover:text-gray-900">
                  {t.nav.manufacturers}
                </Link>
                <Link href="/news" className="text-gray-600 hover:text-gray-900">
                  {t.nav.news}
                </Link>
                <Link href="/compare" className="text-gray-600 hover:text-gray-900">
                  {t.nav.compare}
                </Link>
              </nav>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">{t.subtitle}</h2>
          <p className="text-xl text-gray-600 mb-8">{t.description}</p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder={t.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-4 text-lg rounded-full border-2 border-gray-200 focus:border-blue-500"
            />
            <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full">{t.searchBtn}</Button>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">{t.categories}</h3>

          {Object.entries(CHIP_CATEGORIES).map(([categoryKey, category]) => (
            <div key={categoryKey} className="mb-12">
              <h4 className="text-xl font-semibold text-gray-800 mb-6">{category.name}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {chipCategories
                  .filter((cat) => cat.category === categoryKey)
                  .map((item) => {
                    const IconComponent = item.icon
                    return (
                      <Card key={item.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                        <CardHeader className="pb-4">
                          <div className="flex items-center space-x-3">
                            <div className={`p-3 rounded-lg ${item.color}`}>
                              <IconComponent className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                                {item.name}
                              </CardTitle>
                              <Badge variant="secondary" className="mt-1">
                                {item.count} 款芯片
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-gray-600">{item.description}</CardDescription>
                        </CardContent>
                      </Card>
                    )
                  })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Chips */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">{t.featured}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredChips.map((chip) => (
              <Card key={chip.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{chip.name}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{chip.manufacturer}</Badge>
                    <Badge variant="secondary">{chip.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium">制程：</span>
                    <span className="text-gray-600">{chip.process}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">性能：</span>
                    <span className="text-gray-600">{chip.performance}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">精度：</span>
                    <span className="text-gray-600">{chip.precision.join(", ")}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">部署：</span>
                    <span className="text-gray-600">{chip.deployment}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">{chip.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">{STATS.chips}+</div>
              <div className="text-gray-600">{t.stats.chips}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">{STATS.vendors}+</div>
              <div className="text-gray-600">{t.stats.vendors}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">{STATS.categories}</div>
              <div className="text-gray-600">{t.stats.categories}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-600 mb-2">{STATS.updates}</div>
              <div className="text-gray-600">{t.stats.updates}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Brain className="h-6 w-6" />
                <span className="text-xl font-bold">{t.title}</span>
              </div>
              <p className="text-gray-400">{t.footer.description}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">{t.footer.quickNav}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/" className="hover:text-white">{t.nav.home}</Link></li>
                <li><Link href="/categories" className="hover:text-white">{t.nav.categories}</Link></li>
                <li><Link href="/search" className="hover:text-white">高级搜索</Link></li>
                <li><Link href="/compare" className="hover:text-white">{t.nav.compare}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">{t.footer.hotCategories}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/training" className="hover:text-white">{t.applicationScenarios.training}</Link></li>
                <li><Link href="/inference" className="hover:text-white">{t.applicationScenarios.inference}</Link></li>
                <li><Link href="/edge" className="hover:text-white">{t.applicationScenarios.edge}</Link></li>
                <li><Link href="/gpu" className="hover:text-white">{t.hardwareTypes.gpu}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">{t.footer.aboutUs}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">{t.footer.about}</Link></li>
                <li><Link href="/contact" className="hover:text-white">{t.footer.contact}</Link></li>
                <li><Link href="/privacy" className="hover:text-white">{t.footer.privacy}</Link></li>
                <li><Link href="/terms" className="hover:text-white">{t.footer.terms}</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 {t.title}. {t.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
