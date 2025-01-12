import { openaiConfig } from '@/lib/openaiClient';

export async function getAIResponse(prompt: string): Promise<string> {
  try {
    const response = await openaiConfig?.chat?.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 4096,
      temperature: 0.7,
    });
    return (
      response?.choices[0]?.message?.content?.trim() ?? 'No response generated.'
    );
  } catch (error) {
    console.error('Error generating AI response:', error);
    return 'Sorry, something went wrong while generating the response.';
  }
}
