const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function sendChatMessage(messages: { role: string; content: string }[]) {
  await wait(600);
  const last = messages[messages.length - 1]?.content || '';
  return { role: 'assistant', content: `Great question. For "${last}", start with native plants and layered lighting.` };
}

export async function analyzeGardenPhoto(_imageBase64: string, prompt?: string) {
  await wait(800);
  return { summary: `Detected lawn + patio. ${prompt ? `Focus: ${prompt}` : ''}` };
}

export async function generateGardenDesign(_imageBase64: string, stylePrompt: string, additionalInstructions?: string) {
  await wait(2400);
  return {
    resultText: `Generated ${stylePrompt} concept${additionalInstructions ? ` with ${additionalInstructions}` : ''}`,
    resultImageUri: 'https://picsum.photos/seed/gaia-result/900/1200',
  };
}

export async function getDesignSuggestions(description: string, style: string) {
  await wait(700);
  return [`Use ${style} stone path`, `Add drip irrigation`, `Plant low-maintenance shrubs around ${description}`];
}
