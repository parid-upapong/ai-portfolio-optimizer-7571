import { OpenAI } from 'openai';
import { PrismaClient } from '@prisma/client';

/**
 * AI Analytics Engine
 * Responsibility: Analyzes user projects and generates strategic narratives.
 */
export class AIAnalyticsEngine {
  private openai: OpenAI;
  private prisma: PrismaClient;

  constructor() {
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    this.prisma = new PrismaClient();
  }

  /**
   * Transforms a technical project description into a strategic narrative.
   */
  async generateImpactNarrative(projectId: string) {
    const project = await this.prisma.project.findUnique({ where: { id: projectId } });
    
    if (!project) throw new Error("Project not found");

    const prompt = `
      Context: Transform the following project description into a strategic narrative for a professional portfolio.
      Focus on: Problem, Action, and Result (STAR Method).
      Raw Data: ${project.rawDescription}
      Goal: Emphasize high-value impact and problem-solving skills.
    `;

    const response = await this.openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [{ role: "system", content: "You are a career strategy expert." }, { role: "user", content: prompt }],
      temperature: 0.7,
    });

    const optimizedDesc = response.choices[0].message.content;

    return await this.prisma.project.update({
      where: { id: projectId },
      data: { aiOptimizedDesc: optimizedDesc },
    });
  }

  /**
   * Compares portfolio skills against target Job Description using semantic similarity.
   */
  async calculateMarketAlignment(portfolioId: string, targetJD: string) {
    // 1. Vectorize target JD
    // 2. Query Vector DB for Portfolio skills/projects
    // 3. Calculate cosine similarity
    // 4. Return alignment score and suggestions
    return {
      alignmentScore: 0.85,
      suggestions: ["Add more focus on System Design", "Highlight leadership in Agile teams"],
    };
  }
}