import { trpc } from '../_core/trpc';
import { agentSystem } from '../agents/aiAgentSystem';
import { allFeatures } from '../consolidation/allFeaturesIndex';

export const integrationRouter = trpc.router({
  getSystemStatus: trpc.publicProcedure.query(async () => ({
    status: 'operational',
    features: allFeatures.features,
    versions: allFeatures.versions,
    uptime: process.uptime(),
    timestamp: new Date(),
  })),
  
  executeAIAgent: trpc.protectedProcedure
    .input((val: any) => val)
    .mutation(async ({ input }) => {
      const result = await agentSystem.executeAgent(input.agentId, input.prompt);
      return { success: true, result };
    }),
  
  getAllFeatures: trpc.publicProcedure.query(() => allFeatures),
  
  getFeaturesByCategory: trpc.publicProcedure
    .input((val: any) => val)
    .query(({ input }) => {
      const features = allFeatures.categories[input.category as keyof typeof allFeatures.categories];
      return features || { error: 'Category not found' };
    }),
});
