import { z } from "zod";

const updateschema = z.object({
  _id: z.string,
  Password: z.string(5),
  confirm_Password: z.string(5),
});

export default updateschema;
