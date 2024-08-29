import { z } from "zod";

export const employeeSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  position: z.string(),
  // Add more fields as needed
});
