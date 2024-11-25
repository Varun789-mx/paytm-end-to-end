import { z } from "zod";

const new_user = z.object({
  First_name: z.string().min(2, "Firstname must be at least 5 characters"),
  Last_name: z.string().min(2, "Lastname must be at least 5 characters"),
  Email: z.string().email("Invalid email address"),
  Mobile: z.string().min(10, "Mobile number must be at least 10 digits"),
  Password: z.string().min(4, "Password must be at least 8 characters"),
});

export default new_user;
