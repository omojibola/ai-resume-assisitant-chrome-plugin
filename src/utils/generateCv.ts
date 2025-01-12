import { pdf } from '@react-pdf/renderer';
import { CVData } from '@/types/types';
import { extractJobDescription } from './extractPageContent';
import {
  UserDetails,
  generatePromptToCreateCv,
} from './generatePromptToCreateCv';
import { getAIResponse } from './getAiResponse';
import { generatePDFCV } from './pdfGenerator';

const isValidCVData = (data: any): data is CVData => {
  return (
    data &&
    data.personalInfo &&
    data.professionalSummary &&
    Array.isArray(data.experience) &&
    Array.isArray(data.skills) &&
    Array.isArray(data.education)
  );
};

const cleanAIResponse = (response: string): string => {
  // Remove markdown code blocks
  let cleaned = response.replace(/```\s*json\s*/, '').replace(/```\s*$/, '');

  // Remove any template literal placeholders that weren't replaced
  cleaned = cleaned.replace(/\${[^}]+}/g, '');

  // Remove any trailing commas before closing brackets/braces
  cleaned = cleaned.replace(/,(\s*[}\]])/g, '$1');

  return cleaned.trim();
};

export const generateCv = async (userDetails: UserDetails) => {
  try {
    const result = await extractJobDescription();
    if (result.success) {
      const prompt = generatePromptToCreateCv(userDetails, result.content);
      const aiResponse = await getAIResponse(prompt);
      const cleanedResponse = cleanAIResponse(aiResponse);
      const cvData = JSON.parse(cleanedResponse);

      if (isValidCVData(cvData)) {
        // Generate PDF document
        const CVDocument = await generatePDFCV(cvData);

        // Convert to blob
        const blob = await pdf(CVDocument).toBlob();

        // Create blob URL
        const blobUrl = URL.createObjectURL(blob);

        // Open in new tab
        chrome.tabs.create({ url: blobUrl }, (tab) => {
          // Clean up blob URL when tab is closed
          if (tab.id) {
            chrome.tabs.onRemoved.addListener((tabId) => {
              if (tabId === tab.id) {
                URL.revokeObjectURL(blobUrl);
              }
            });
          }
        });

        return {
          success: true,
          cvData,
          blobUrl,
        };
      } else {
        throw new Error('Invalid CV data structure received from AI');
      }
    } else {
      throw new Error(`Failed to extract content: ${result.error}`);
    }
  } catch (error) {
    console.error('Error during CV generation:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};
