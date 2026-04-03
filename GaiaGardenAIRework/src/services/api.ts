const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type ApiConfig = {
  baseUrl?: string;
  chatPath: string;
  analyzePath: string;
  generatePath: string;
  suggestionsPath: string;
};

export const apiConfig: ApiConfig = {
  baseUrl: '',
  chatPath: '/chat',
  analyzePath: '/analyze',
  generatePath: '/generate',
  suggestionsPath: '/suggestions',
};

async function requestPlaceholder<T>(path: string, mockData: T): Promise<T> {
  if (!apiConfig.baseUrl) {
    await wait(700);
    return mockData;
  }

  const response = await fetch(`${apiConfig.baseUrl}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${path}`);
  }

  return (await response.json()) as T;
}

export async function sendChatMessage(messages: { role: string; content: string }[]) {
  const last = messages[messages.length - 1]?.content || '';
  return requestPlaceholder(apiConfig.chatPath, {
    role: 'assistant',
    content: `Great question. For "${last}", start with native plants, strong geometry, and layered evening lighting.`,
  });
}

export async function analyzeGardenPhoto(_imageBase64: string, prompt?: string) {
  return requestPlaceholder(apiConfig.analyzePath, {
    summary: `Detected lawn, hardscape, and a likely focal seating zone.${prompt ? ` Focus note: ${prompt}` : ''}`,
  });
}

export async function generateGardenDesign(_imageBase64: string, stylePrompt: string, additionalInstructions?: string) {
  return requestPlaceholder(apiConfig.generatePath, {
    resultText: `Generated ${stylePrompt} design${additionalInstructions ? ` with ${additionalInstructions}` : ''}.`,
    resultImageUri: 'https://picsum.photos/seed/gaia-rework-result/900/1200',
  });
}

export async function getDesignSuggestions(description: string, style: string) {
  return requestPlaceholder(apiConfig.suggestionsPath, [
    `Use ${style} stone path detailing`,
    `Add drip irrigation and layered perimeter lighting`,
    `Anchor ${description} with one central focal feature`,
  ]);
}
