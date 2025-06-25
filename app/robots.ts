import { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/lib/constants'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/private/',
        '/admin/',
        '/api/',
        '/_next/',
        '/static/',
      ],
    },
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  }
} 