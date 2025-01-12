import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Font,
} from '@react-pdf/renderer';
import { CVData } from '@/types/types';

// Register custom font
Font.register({
  family: 'Open Sans',
  src: 'https://fonts.gstatic.com/s/opensans/v28/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0B4gaVc.ttf',
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Open Sans',
  },
  section: {
    marginBottom: 10,
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contactInfo: {
    fontSize: 10,
    color: '#666',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2c5282',
    borderBottom: '1 solid #e2e8f0',
    paddingBottom: 3,
  },
  sectionContent: {
    fontSize: 11,
    lineHeight: 1.5,
  },
  experienceItem: {
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  companyDate: {
    fontSize: 10,
    color: '#666',
    marginBottom: 3,
  },
  bullet: {
    fontSize: 11,
    marginLeft: 15,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  skill: {
    fontSize: 10,
    backgroundColor: '#e2e8f0',
    padding: '3 6',
    borderRadius: 3,
  },
});

interface CVPDFProps {
  data: CVData;
}

const CVPDF: React.FC<CVPDFProps> = ({ data }) => (
  <Document>
    <Page size='A4' style={styles.page}>
      {/* Header / Personal Info */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.personalInfo.name}</Text>
        <View style={styles.contactInfo}>
          <Text>{data.personalInfo.email}</Text>
          <Text>{data.personalInfo.phone}</Text>
          <Text>{data.personalInfo.location}</Text>
        </View>
      </View>

      {/* Professional Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Summary</Text>
        <Text style={styles.sectionContent}>{data.professionalSummary}</Text>
      </View>

      {/* Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Professional Experience</Text>
        {data.experience.map((exp: any, index: number) => (
          <View key={index} style={styles.experienceItem}>
            <Text style={styles.jobTitle}>{exp.title}</Text>
            <Text style={styles.companyDate}>
              {exp.company} | {exp.date}
            </Text>
            {exp.description.map((bullet: string, idx: number) => (
              <Text key={idx} style={styles.bullet}>
                • {bullet}
              </Text>
            ))}
          </View>
        ))}
      </View>

      {/* Skills */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        <View style={styles.skillsContainer}>
          {data.skills.map((skill: string, index: number) => (
            <Text key={index} style={styles.skill}>
              {skill}
            </Text>
          ))}
        </View>
      </View>

      {/* Education */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        {data.education.map((edu: any, index: number) => (
          <View key={index} style={styles.experienceItem}>
            <Text style={styles.jobTitle}>{edu.degree}</Text>
            <Text style={styles.companyDate}>
              {edu.institution} | {edu.date}
            </Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export const generatePDFCV = async (cvData: CVData) => {
  return (
    <PDFViewer width='100%' height='100%'>
      <CVPDF data={cvData} />
    </PDFViewer>
  );
};
