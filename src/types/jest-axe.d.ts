declare module 'jest-axe' {
  import { AxeResults } from 'axe-core';

  export interface JestAxeConfigureOptions {
    globalOptions?: any;
    impactLevels?: string[];
  }

  export interface AxeMatchers {
    toHaveNoViolations(): void;
  }

  export function configureAxe(options?: JestAxeConfigureOptions): typeof axe;

  export function axe(html: Element | Document | string, options?: any): Promise<AxeResults>;

  export function toHaveNoViolations(results: AxeResults): {
    pass: boolean;
    message: () => string;
  };
}
