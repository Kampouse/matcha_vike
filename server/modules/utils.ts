import { zu } from "zod_utilz";
import z from "zod";
import type { H3Event } from "h3";
import { readBody } from "h3";
export const readZodBody = async <T extends z.ZodType>(
  event: H3Event,
  schema: T,
): Promise<{ success: boolean; data: z.infer<T> }> => {
  try {
    let parsed;
    const jsonparser = zu.stringToJSON();
    const body = await readBody(event);
    if (body == null) {
      return { success: false, data: { error: "invalid request" } };
    }
    if (typeof body === "string") {

      parsed = jsonparser.parse(body);
      const validated = schema.safeParse(parsed);

      if (validated.success) {
        return { success: validated.success, data: validated.data };
      }
      return { success: validated.success, data: { error: "invalid request" } };
    }
    if (typeof body === "object") {
      parsed = body;
      const validated = schema.safeParse(parsed);
      if (validated.success) {
        return { success: validated.success, data: validated.data };
      }
      return { success: validated.success, data: { error: "invalid request" } };
    }
  } catch (error) {
    return { success: false, data: error };
  }
  const error = z.object({ error: z.string() }).safeParse({ error: "invalid request" });
  return { success: false, data: error };

};
