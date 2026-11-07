import { apiGetNestedData } from "@/config/api-wrapper";
import { UserActiveResponseSchema } from "../schemas/user.schema";



export async function getUserAuthenticated() {
    const url = '/user/me';
    return apiGetNestedData(url, UserActiveResponseSchema);
}