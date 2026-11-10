import type { TProject } from "@/features/projects/types/project.types";

export function calculateProjectProgress(projectStage: TProject['productionStage']) : number {
    const projectProgress: Record<TProject['productionStage'], number> = {
        BIBLE_SELECTION: 20,
        CONTENT_GENERATION: 30,
        CONTENT_REVIEW: 40,
        IMAGE_PRODUCTION: 50,
        AUDIO_PRODUCTION: 60,
        VIDEO_PRODUCTION: 70,
        FINAL_REVIEW: 80,
        EXPORT: 90,
        DONE: 100
    }
  return projectProgress[projectStage]
}