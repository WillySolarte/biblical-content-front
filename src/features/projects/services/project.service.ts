import { apiGetNestedData } from "@/config/api-wrapper";
import { BibleVersionsApiResponseSchema } from "../schemas/bible-version.schema";

export async function getApiBibleVersions() {
    const url:string = '/bible-api/versions';
    return apiGetNestedData(url, BibleVersionsApiResponseSchema);
}