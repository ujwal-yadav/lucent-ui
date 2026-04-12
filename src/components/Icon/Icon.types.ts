import { SVGProps } from 'react';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type IconColor =
  | 'current'
  | 'neutral'
  | 'gray'
  | 'primary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'premium'
  | 'workflow-ship'
  | 'workflow-preview'
  | 'workflow-develop';

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'ref'> {
  /** Icon size */
  size?: IconSize;

  /** Icon color */
  color?: IconColor;

  /** Additional className */
  className?: string;
}

export type IconComponent = React.FC<IconProps>;
