// Constant array of known job description selectors
const JOB_DESCRIPTION_SELECTORS = [
  '.jobs-description__content',
  '.jobs-description-content',
  '.jobsearch-embeddedBody',
  // Add new selectors here
  '[data-test="job-description"]',
  '.job-desc',
  '.job-description',
  '#job-description',
  '.description__text',
  '.posting-requirements',
] as const;

interface ExtractionResult {
  content: string;
  matchedSelector: string | null;
  success: boolean;
  error?: string;
}

const extractJobDescription = async (): Promise<ExtractionResult> => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs[0]?.id) {
        reject({
          content: '',
          matchedSelector: null,
          success: false,
          error: 'No active tab found',
        });
        return;
      }

      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          func: (selectors) => {
            // Helper to clean text content
            const cleanContent = (text: string): string => {
              return text
                .replace(/\s+/g, ' ') // Replace multiple spaces with single space
                .replace(/\n\s*\n/g, '\n') // Replace multiple newlines with single newline
                .trim();
            };

            // Try to find content using provided selectors
            for (const selector of selectors) {
              const element = document.querySelector(selector);
              if (element) {
                // Get text content and clean it
                const content = cleanContent(element.textContent || '');
                if (content) {
                  return {
                    content,
                    matchedSelector: selector,
                    success: true,
                  };
                }
              }
            }

            // Fallback: Try to find content in article or main tags
            const fallbackSelectors = ['article', 'main', '[role="main"]'];
            for (const selector of fallbackSelectors) {
              const element = document.querySelector(selector);
              if (element) {
                const content = cleanContent(element.textContent || '');
                if (content) {
                  return {
                    content,
                    matchedSelector: selector,
                    success: true,
                  };
                }
              }
            }

            // If no content found, return error
            return {
              content: '',
              matchedSelector: null,
              success: false,
              error: 'No job description content found',
            };
          },
          args: [Array.from(JOB_DESCRIPTION_SELECTORS)],
        },
        (results) => {
          if (chrome.runtime.lastError) {
            reject({
              content: '',
              matchedSelector: null,
              success: false,
              error: chrome.runtime.lastError.message,
            });
            return;
          }

          if (!results?.[0]?.result) {
            reject({
              content: '',
              matchedSelector: null,
              success: false,
              error: 'Failed to extract content',
            });
            return;
          }

          resolve(results[0].result);
        }
      );
    });
  });
};

// Helper function to add new selectors
const addJobDescriptionSelectors = (newSelectors: string[]): void => {
  // TypeScript might complain about modifying a const array
  // This is a runtime modification that works but you might want to use a different approach
  // depending on your needs
  (JOB_DESCRIPTION_SELECTORS as any).push(...newSelectors);
};

export {
  extractJobDescription,
  addJobDescriptionSelectors,
  JOB_DESCRIPTION_SELECTORS,
  type ExtractionResult,
};
