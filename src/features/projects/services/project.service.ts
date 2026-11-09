import { apiGetNestedData, apiPost } from "@/config/api-wrapper";
import { BibleVersionsApiResponseSchema } from "../schemas/bible-version.schema";
import type { TCreateProjectForm } from "../types/project.types";
import { StandarResponseSchema } from "@/common/schemas/general.schema";
import { CompleteProjectsSchemaResponse } from "../schemas/project.schema";

export async function getApiBibleVersions() {
    const url:string = '/bible-api/versions';
    return apiGetNestedData(url, BibleVersionsApiResponseSchema);
}

export function createInitProject(projectFormData: TCreateProjectForm){
    const url:string = '/project';
    return apiPost(url, projectFormData, StandarResponseSchema);
}

export function getProjects(){
    const url:string = '/project';
    return apiGetNestedData(url, CompleteProjectsSchemaResponse)
}