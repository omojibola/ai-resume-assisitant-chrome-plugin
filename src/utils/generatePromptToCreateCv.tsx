export type UserDetails = {
  fullName: string;
  email: string;
  phone: string;
  additionalInfo: string;
};

export const generatePromptToCreateCv = (
  userDetails: UserDetails,
  jobInfo: string
): string => {
  const { fullName, email, phone, additionalInfo } = userDetails;

  return `
  You are an expert CV writer. Create a tailored CV in JSON format for the following user based on their details and the job they are applying for.
  
  ### User Details:
  - Full Name: ${fullName}
  - Email: ${email}
  - Phone: ${phone}
  ${additionalInfo ? `- Additional Information: ${additionalInfo}` : ''}
  
  ### Job Details:
  ${jobInfo}
  
  Please return the CV in the following strict JSON format, with all fields required:
  
  {
    "personalInfo": {
      "name": "${fullName}",
      "email": "${email}",
      "phone": "${phone}",
      "location": "Extract or generate appropriate location"
    },
    "professionalSummary": "A compelling 2-3 sentence summary tailored to the job requirements",
    "experience": [
      {
        "title": "Job Title",
        "company": "Company Name",
        "date": "Date Range (e.g., 'Jan 2020 - Present')",
        "description": [
          "Achievement or responsibility bullet point 1",
          "Achievement or responsibility bullet point 2",
          "Achievement or responsibility bullet point 3"
        ]
      }
    ],
    "skills": [
      "Skill 1",
      "Skill 2",
      "Skill 3"
    ],
    "education": [
      {
        "degree": "Degree Name",
        "institution": "Institution Name",
        "date": "Date Range (e.g., '2016 - 2020')"
      }
    ]
  }
  
  Important:
  1. Ensure the response is valid JSON that can be parsed
  2. Use the provided user information to fill in personal details
  3. Analyze the job description to identify and include relevant skills and experiences
  4. Make the experience and skills sections highly relevant to the job requirements
  5. Keep descriptions concise and impactful
  6. Include 3-5 relevant skills based on the job description
  7. If education details are not provided, generate appropriate placeholder education
  8. Format dates consistently
  9. Do not include any explanation or additional text outside the JSON structure`;
};
