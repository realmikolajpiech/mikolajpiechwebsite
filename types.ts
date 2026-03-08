import React from 'react';

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  link: string;
  image?: string;
  icon?: string;
  tags: string[];
  status?: string;
  isPrimary?: boolean;
  appStoreLink?: string;
  playStoreLink?: string;
  linkText?: string;
  layout?: 'standard' | 'split';
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
}

export type Theme = 'light' | 'dark' | 'system';