import React from 'react';
import { Project } from '../types';

interface SchemaMarkupProps {
  projects: Project[];
}

export const SchemaMarkup: React.FC<SchemaMarkupProps> = ({ projects }) => {
  const personSchema = {
    "@type": "Person",
    "@id": "https://mikolajpiech.com/#person",
    "name": "Mikołaj Piech",
    "jobTitle": "Founder & Developer",
    "url": "https://mikolajpiech.com",
    "image": "https://mikolajpiech.com/mikolaj-profile.jpg",
    "sameAs": [
      "https://x.com/mikolajpiech",
      "https://www.linkedin.com/in/mikolajpiech/",
      "https://github.com/realmikolajpiech"
    ],
    "description": "Founder and developer from Poland who builds and ships consumer software. Creator of Omni (AI that knows you and your computer), Platoic (personalized AI learning), Subby (subscription management), and Solvee (AI homework helper, acquired)."
  };

  const projectSchemas = projects.map((project, index) => {
    const isMobileApp = project.tags.some(tag => tag.toLowerCase().includes('mobile') || tag.toLowerCase().includes('ios') || tag.toLowerCase().includes('android'));
    
    return {
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": isMobileApp ? "MobileApplication" : "SoftwareApplication",
        "name": project.name,
        "description": project.description,
        "applicationCategory": project.tags[0] || "Utility",
        "operatingSystem": isMobileApp ? "iOS, Android" : "Web, macOS",
        "url": project.link,
        "image": project.image,
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "author": {
          "@id": "https://mikolajpiech.com/#person"
        }
      }
    };
  });

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      personSchema,
      {
        "@type": "ItemList",
        "itemListElement": projectSchemas
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
