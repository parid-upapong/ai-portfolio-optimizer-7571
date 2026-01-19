import { PrismaClient } from '@prisma/client';

/**
 * Portfolio Hosting Engine
 * Responsibility: Handles dynamic routing and metadata injection for edge delivery.
 */
export class HostingEngine {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  /**
   * Resolves a portfolio by slug for the edge renderer.
   * Optimized for high-speed cache hits.
   */
  async getPortfolioBySlug(slug: string) {
    const portfolio = await this.prisma.portfolio.findUnique({
      where: { slug, published: true },
      include: {
        projects: true,
        owner: {
          select: { name: true, email: true }
        }
      }
    });

    if (!portfolio) return null;

    // Inject Dynamic SEO Metadata
    return {
      ...portfolio,
      seo: {
        title: `${portfolio.owner.name} | ${portfolio.title}`,
        description: portfolio.projects[0]?.aiOptimizedDesc?.substring(0, 160) || "Professional Portfolio",
        openGraph: {
          images: [portfolio.projects[0]?.mediaUrls[0] || "/default-og.jpg"]
        }
      }
    };
  }

  /**
   * Records analytics event without blocking the main thread.
   */
  async recordVisit(portfolioId: string, visitorData: any) {
    await this.prisma.analyticsEvent.create({
      data: {
        portfolioId,
        eventType: 'VIEW',
        metadata: visitorData
      }
    });
  }
}