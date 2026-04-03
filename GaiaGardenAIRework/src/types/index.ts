export type GardenStyle = {
  id: string;
  name: string;
  emoji: string;
  image: string;
  tagline: string;
  prompt: string;
};

export type GardenMode = 'normal' | 'add' | 'style' | 'create' | 'replace' | 'drag';

export type DesignHistoryItem = {
  id: string;
  createdAt: string;
  originalImageUri: string;
  resultImageUri?: string;
  styleId: string;
  styleName: string;
  customPrompt?: string;
  resultText?: string;
};

export type PlannerPlanItem = {
  id: string;
  title: string;
  detail: string;
};

export type PlannerPlan = {
  id: string;
  createdAt: string;
  yardType: string;
  climate: string;
  goal: string;
  items: PlannerPlanItem[];
};
