import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export interface PortalProps {
  /** Content to render in portal */
  children: ReactNode;
  /** Container element to render into (defaults to document.body) */
  container?: Element | null;
  /** Optional key for the portal */
  key?: string | null;
}

/**
 * Portal component for rendering children outside the DOM hierarchy
 * Useful for modals, tooltips, popovers, and other overlays
 */
export const Portal: React.FC<PortalProps> = ({ children, container, key }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(children, container || document.body, key);
};

export default Portal;
