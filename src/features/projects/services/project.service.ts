import { apiDelete, apiGetNestedData, apiPost } from "@/config/api-wrapper";
import { BibleVersionsApiResponseSchema } from "../schemas/bible-version.schema";
import type { ProjectFilters, TCreateProjectForm } from "../types/project.types";
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

export function deleteProject(id: string) {
  const url = `/project/${id}`;
  return apiDelete(url);
}

export function getProjects(filters?: ProjectFilters) {
  const params = new URLSearchParams();

  if (filters?.search?.trim())   params.append('search', filters.search.trim());
  
  if (filters?.status)  params.append('status', filters.status);
  
  if (filters?.productionStage) params.append('productionStage', filters.productionStage);
  
  if (filters?.page)  params.append('page', String(filters.page));
  
  const queryString = params.toString();
  const url = queryString ? `/project?${queryString}` : '/project';

  return apiGetNestedData(url, CompleteProjectsSchemaResponse);
}