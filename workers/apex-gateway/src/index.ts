import { createSchema, createYoga, YogaInitialContext } from 'graphql-yoga';
import { typeDefs } from './graphql-schema/typeDefs.generated';
import { resolvers } from './graphql-schema/resolvers.generated';

export type Env = {
  ENVIRONMENT: 'testing' | 'development' | 'production';
  DB: D1Database;
  __D1_BETA__DB: D1Database;
};
export type GraphQLContext = YogaInitialContext & Env & ExecutionContext;

const graphqlServer = createYoga<Env & ExecutionContext>({
  schema: createSchema({ typeDefs, resolvers }),
});

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    return graphqlServer.fetch(request, env, ctx);
  },
};
