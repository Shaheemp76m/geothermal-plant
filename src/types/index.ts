export interface NavItem {
  label: string;
  href: string;
}

export interface FeatureStripItem {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  linkText: string;
  targetId: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  mechanism: string;
  thermodynamics: string;
  icon: 'Flame' | 'Droplets' | 'Cpu' | 'Zap';
}

export interface GeothermalTechType {
  name: string;
  temperature: string;
  process: string;
  application: string;
  efficiency: string;
}

export interface BenefitStat {
  value: number;
  suffix: string;
  title: string;
  category?: string;
  displayValue?: string;
  unitLabel?: string;
  subNumber?: number;
  highlight: string;
  description: string;
  qualification: string;
  source: string;
  editorialNote?: {
    tag: string;
    headline: string;
    detail: string;
  };
}

export interface ApplicationCard {
  id: string;
  title: string;
  tag: string;
  description: string;
  operatingTemp: string;
  image: string;
  imageAlt: string;
  details: string[];
}

export interface ImpactPoint {
  title: string;
  tag: string;
  description: string;
  isStrength: boolean;
  qualification: string;
}

export interface NextGenTechEntry {
  number: string;
  classification: string;
  title: string;
  subtitle: string;
  description: string;
  status: string;
  footerLabel: string;
}

export interface ReferenceItem {
  source: string;
  title: string;
  year: string;
  url: string;
  description: string;
}
