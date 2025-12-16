
export type Language = 'ES' | 'EN';

export interface CharacterParams {
  mode: 'image' | 'video'; // New
  promptFormat: 'midjourney' | 'generic'; // New
  race: string;
  gender: string;
  age: string; // New
  role: string;
  subRole: string; // New
  bodyType: string; // New
  style: string;
  setting: string;
  background: string; // New (Chroma, White, etc)
  emotion: string; // New
  pose: string; // New (For Image)
  action: string; // New (For Video)
  framing: string; // New
  lighting: string; // New
  atmosphere: string; // New
  colors: string[]; // New
  details: string;
  aspectRatio: string;
}

export interface GeneratedData {
  prompt: string;
  negativePrompt: string;
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
