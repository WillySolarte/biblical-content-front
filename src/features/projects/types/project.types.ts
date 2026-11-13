import type z from "zod";
import type { CompleteProjectSchema, CreateProjectFormSchema } from "../schemas/project.schema";

export type ProjectStatus =
  | 'DRAFT'
  | 'ACTIVE'
  | 'PAUSED'
  | 'COMPLETED'
  | 'PUBLISHED'
  | 'ARCHIVED';

export type ProductionStage =
  | 'BIBLE_SELECTION'
  | 'CONTENT_GENERATION'
  | 'CONTENT_REVIEW'
  | 'IMAGE_PRODUCTION'
  | 'AUDIO_PRODUCTION'
  | 'VIDEO_PRODUCTION'
  | 'FINAL_REVIEW'
  | 'EXPORT'
  | 'DONE';

export interface PassageRange {
  id: string;
  book: string;
  chapter: number;
  verseStart: number;
  verseEnd: number;
  sampleText?: string;
}

export interface StoryboardScene {
  id: string;
  sceneNumber: number;
  title: string;
  voiceover: string;
  visualPrompt: string;
  shotType: string;
  durationSeconds: number;
  imageUrl?: string;
  status: 'pending' | 'generating' | 'completed';
}

export interface BiblicalContext {
  author: string;
  historicalPeriod: string;
  coreTheologicalMessage: string;
  keyThemes: string[];
  audience: string;
}

export interface AudioConfig {
  voiceId: string;
  voiceName: string;
  speechRate: number;
  musicTrack: string;
  musicVolume: number;
  soundEffectsEnabled: boolean;
}

export interface VideoConfig {
  aspectRatio: '16:9' | '9:16' | '1:1';
  resolution: '1080p' | '4K' | '720p';
  fps: 30 | 60;
  transitionType: 'crossfade' | 'smooth_cut' | 'cinematic_blur';
  subtitlesEnabled: boolean;
  subtitleFont: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  bibleVersion: string;
  passages: PassageRange[];
  status: ProjectStatus;
  stage: ProductionStage;
  progress: number;
  visualStyle: string;
  tone: string;
  biblicalContext?: BiblicalContext;
  scenes: StoryboardScene[];
  audioConfig: AudioConfig;
  videoConfig: VideoConfig;
  coverImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BibleBook {
  id: string;
  name: string;
  testament: 'ANTIGUO' | 'NUEVO';
  chaptersCount: number;
}

export interface BibleVersion {
  id: string;
  code: string;
  name: string;
  language: string;
  description: string;
}

//Propios

export type TCreateProjectForm = z.infer<typeof CreateProjectFormSchema>
export type TProject = z.infer<typeof CompleteProjectSchema>
export type ProjectFilters = {
  search?: string;
  status?: ProjectStatus | '';
  productionStage?: ProductionStage | '';
  page?: number;
}

export type projectDataDelete = Pick<TProject, "id" | "name">