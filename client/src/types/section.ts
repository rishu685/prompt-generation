export type NodeType =
  | 'section'
  | 'container'
  | 'grid'
  | 'stack'
  | 'card'
  | 'heading'
  | 'paragraph'
  | 'button'
  | 'badge'
  | 'image'
  | 'avatar'
  | 'icon'
  | 'input'
  | 'divider'
  | 'accordion'
  | 'accordion-item';

export interface NodeProps {
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'amber' | 'emerald' | 'terracotta' | 'subtle';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  align?: 'left' | 'center' | 'right' | 'between' | 'stretch';
  direction?: 'row' | 'col';
  columns?: number;
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  highlighted?: boolean;
  src?: string;
  alt?: string;
  href?: string;
  iconName?: string;
  placeholder?: string;
  buttonType?: 'button' | 'submit';
  badgeType?: 'default' | 'success' | 'alert' | 'bronze' | 'navy';
  className?: string;
  style?: Record<string, string | number>;
  [key: string]: any;
}

export interface UIElementNode {
  id: string;
  type: NodeType;
  content?: string;
  props?: NodeProps;
  children?: UIElementNode[];
}

export interface SectionLayout {
  id: string;
  title: string;
  category: 'hero' | 'pricing' | 'features' | 'testimonials' | 'cta' | 'faq' | 'stats' | 'custom';
  promptUsed: string;
  createdAt: string;
  updatedAt: string;
  root: UIElementNode;
}
