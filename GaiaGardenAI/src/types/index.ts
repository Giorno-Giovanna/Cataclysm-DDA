export type GardenStyle = {
  id: string;
  name: string;
  emoji: string;
  image: string;
  tagline: string;
  prompt: string;
};

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
