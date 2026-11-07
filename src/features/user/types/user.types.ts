import type { UserActiveSchema } from "@/features/user/schemas/user.schema";
import {z} from "zod";


export type TUserActive = z.infer< typeof UserActiveSchema>