import { apiPost } from "@/config/api-wrapper";
import { StandarResponseSchema } from "@/common/schemas/general.schema";

export async function logOut() {
    const url = '/auth/logout';
    return apiPost(url, undefined, StandarResponseSchema);
}


