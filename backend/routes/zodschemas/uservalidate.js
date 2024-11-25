import { z } from "zod";

const signin_user = z.object({
  Email: z.string().email().min(5),
  Password: z.string().min(3),
});

export default signin_user;
