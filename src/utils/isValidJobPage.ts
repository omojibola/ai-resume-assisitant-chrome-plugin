export const isJobBoardPage = async (): Promise<boolean> => {
  try {
    // List of keywords typically found on job boards or job postings
    const jobKeywords = [
      'job requirements',
      'qualifications',
      'job role',
      'job responsibilities',
      'career opportunities',
      'desired skills',
      'employment',
      'salary',
      'benefits',
      'about the job',
      'apply',
    ];

    // Inject a script into the active tab to retrieve page content
    const pageContent = await new Promise<string>((resolve, reject) => {
      try {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs[0]?.id) {
            chrome.scripting.executeScript(
              {
                target: { tabId: tabs[0].id },
                func: () => document.body.innerText,
              },
              (results) => {
                if (chrome.runtime.lastError || !results?.[0]?.result) {
                  reject(
                    chrome.runtime.lastError ||
                      'Failed to retrieve page content.'
                  );
                } else {
                  resolve(results[0].result);
                }
              }
            );
          } else {
            reject('No active tab found.');
          }
        });
      } catch (error) {
        reject(error);
      }
    });

    // Normalize the content and check for keywords
    const lowerCaseContent = pageContent.toLowerCase();
    return jobKeywords.some((keyword) => lowerCaseContent.includes(keyword));
  } catch (error) {
    console.error('Error checking if page is a job board:', error);
    return false;
  }
};
