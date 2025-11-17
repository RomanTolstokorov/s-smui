import type { SxProps, Theme } from '@mui/material';

/**
 * Shared "island" style for containers across the application.
 * Islands are elevated containers with consistent styling:
 * - surface_2 background color
 * - 8px border radius (cornerradius/2 from design system)
 * - No elevation/shadow by default
 */
export const islandStyle: SxProps<Theme> = {
    backgroundColor: 'background.surface_2',
    borderRadius: 2, // 2 * 4px = 8px (cornerradius/2 from Figma)
    border: '1px solid',
    borderColor: 'divider',
};

/**
 * Island style without border (for nested islands or special cases)
 */
export const islandStyleNoBorder: SxProps<Theme> = {
    backgroundColor: 'background.surface_2',
    borderRadius: 2,
};

/**
 * Island style with custom border radius
 */
export const createIslandStyle = (borderRadius: number = 2): SxProps<Theme> => ({
    backgroundColor: 'background.surface_2',
    borderRadius,
    border: '1px solid',
    borderColor: 'divider',
});
