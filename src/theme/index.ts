// Main theme exports
export { default as theme } from './theme';
export type { Theme } from '@mui/material/styles';

// Export modular theme parts for advanced usage
export * from './theme';
export * from './typography';
export * from './colors';
export * from './island';
export { components } from './components';

// Import theme augmentations to ensure they are applied
import './theme-augmentations.d.ts';