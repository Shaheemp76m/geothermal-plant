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

export interface BenefitItem {
  metric: string;
  title: string;
  description: string;
  iconName: 'Clock' | 'Leaf' | 'Layers' | 'Compass';
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

export interface FutureTechItem {
  name: string;
  status: 'Commercial & Expanding' | 'Field Demonstration' | 'Early R&D';
  description: string;
  potential: string;
}

export interface ReferenceItem {
  source: string;
  title: string;
  year: string;
  url: string;
  description: string;
}
