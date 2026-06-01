import React from 'react';

export interface ProjectScreenshot {
  src: string;
  alt: string;
  caption?: string;
  variant?: 'phone' | 'desktop' | 'wide';
}

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  link?: string;
  image?: string;
  video?: string;
  icon?: string;
  tags: string[];
  platform: string;
  category: string;
  scope: string;
  status?: string;
  isPrimary?: boolean;
  appStoreLink?: string;
  playStoreLink?: string;
  linkText?: string;
  layout?: 'standard' | 'split';
  imageFit?: 'cover' | 'contain';
  operatingSystem?: string;
  screenshots?: ProjectScreenshot[];
  outcome?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
}

export type Theme = 'light' | 'dark' | 'system';