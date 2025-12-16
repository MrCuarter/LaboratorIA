
export type Language = 'ES' | 'EN';

export interface CharacterParams {
  mode: 'image' | 'video'; 
  promptFormat: 'midjourney' | 'generic'; 
  designMode: 'quick' | 'advanced'; // New: UI State
  
  // Attributes
  race: string;
  gender: string;
  age: string;
  skinTone: string; // New
  classCategory: 'fantasy' | 'realistic'; // New
  role: string;
  subRole: string;
  bodyType: string;
  
  // Visuals
  style: string;
  setting: string;
  background: string;
  emotion: string;
  pose: string; 
  action: string; 
  framing: string; 
  lighting: string;
  atmosphere: string;
  colors: string[]; 
  details: string;
  aspectRatio: string;
}

export interface GeneratedData {
  prompt: string;
  negativePrompt: string;
  timestamp?: number; // Added for History
  modelParams?: Partial<CharacterParams>; // Added to restore state
}

export interface ExpressionEntry {
  label: string;
  prompt: string;
}

export enum LoadingState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}
