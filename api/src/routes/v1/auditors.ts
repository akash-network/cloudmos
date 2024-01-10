import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { getAuditors } from "@src/providers/githubProvider";

const route = createRoute({
  method: "get",
  path: "/auditors",
  summary: "Get a list of auditors.",
  responses: {
    200: {
      description: "List of auditors",
      content: {
        "application/json": {
          schema: z.array(
            z.object({
              id: z.string(),
              name: z.string(),
              address: z.string(),
              website: z.string()
            })
          )
        }
      }
    }
  }
});

export default new OpenAPIHono().openapi(route, async (c) => {
  const response = await getAuditors(); // TODO: Add typing
  return c.json(response);
});
