import type { } from '@mui/material/themeCssVarsAugmentation';

// Button component overrides

export const buttonOverrides = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8, // cornerRadius-2
        textTransform: 'none' as const,
        fontSize: 14,
        lineHeight: 1.714,
      },
      sizeLarge: {
        fontSize: 15,
        lineHeight: 1.733,
        height: 48,
        padding: '8px 22px',
      },
      sizeMedium: {
        fontSize: 14,
        lineHeight: 1.714,
        height: 40,
        padding: '4px 16px',
      },
      sizeSmall: {
        fontSize: 13,
        lineHeight: 1.692,
        height: 22,
        padding: '16px 12px',
        borderRadius: 4,
      },
      contained: {
        boxShadow: 'none',
        '&:hover': {
          boxShadow: '0px 2px 4px rgba(59, 107, 246, 0.12)',
        },
      },
    },
  },
  MuiIconButton: {
    defaultProps: {
      TouchRippleProps: {
        center: false,
      },
    },
    variants: [
      {
        props: { size: 'xsmall' as const },
        style: {
          width: 24,
          height: 24,
          padding: 0,
          borderRadius: 4,
          '& .MuiSvgIcon-root': {
            fontSize: 16,
          },
        },
      },
      // Shape variants
      {
        props: { shape: 'circle' as const },
        style: {
          borderRadius: '50%',
        },
      },
      {
        props: { shape: 'rectangle' as const },
        style: {
          borderRadius: 8,
        },
      },
      // Shape + Size combinations
      {
        props: { size: 'large' as const, shape: 'circle' as const },
        style: {
          borderRadius: '50%',
        },
      },
      {
        props: { size: 'large' as const, shape: 'rectangle' as const },
        style: {
          borderRadius: 8,
        },
      },
      {
        props: { size: 'medium' as const, shape: 'circle' as const },
        style: {
          borderRadius: '50%',
        },
      },
      {
        props: { size: 'medium' as const, shape: 'rectangle' as const },
        style: {
          borderRadius: 8,
        },
      },
      {
        props: { size: 'small' as const, shape: 'circle' as const },
        style: {
          borderRadius: '50%',
        },
      },
      {
        props: { size: 'small' as const, shape: 'rectangle' as const },
        style: {
          borderRadius: 4,
        },
      },
      {
        props: { size: 'xsmall' as const, shape: 'circle' as const },
        style: {
          borderRadius: '50%',
        },
      },
      {
        props: { size: 'xsmall' as const, shape: 'rectangle' as const },
        style: {
          borderRadius: 4,
        },
      },
    ],
    styleOverrides: {
      root: ({ theme }: { theme: any }) => ({
        borderRadius: 8,
        padding: 12, // Default padding for large
        '&:hover': {
          backgroundColor: theme.vars.palette.action.hover,
        },
        '&.Mui-disabled': {
          backgroundColor: 'transparent',
          color: theme.vars.palette.action.disabled,
        },
      }),
      sizeLarge: {
        width: 48,
        height: 48,
        padding: 12, // (48 - 24) / 2 = 12px padding for 24px icon
        '& .MuiSvgIcon-root': {
          fontSize: 24,
        },
      },
      sizeMedium: {
        width: 40,
        height: 40,
        padding: 8, // (40 - 24) / 2 = 8px padding for 24px icon
        '& .MuiSvgIcon-root': {
          fontSize: 24,
        },
      },
      sizeSmall: {
        width: 32,
        height: 32,
        padding: 4,
        '& .MuiSvgIcon-root': {
          fontSize: 20,
        },
      },
      // Color variants
      colorPrimary: ({ theme }: { theme: any }) => ({
        backgroundColor: theme.vars.palette.primary.main,
        color: theme.vars.palette.primary.contrastText,
        '&:hover': {
          backgroundColor: theme.vars.palette.primary.dark,
        },
        '&:active': {
          backgroundColor: theme.vars.palette.primary.dark,
        },
        '&.Mui-disabled': {
          backgroundColor: theme.vars.palette.action.disabledBackground,
          color: theme.vars.palette.action.disabled,
        },
      }),

      colorError: ({ theme }: { theme: any }) => ({
        backgroundColor: theme.vars.palette.error.main,
        color: theme.vars.palette.error.contrastText,
        '&:hover': {
          backgroundColor: theme.vars.palette.error.dark,
        },
        '&:active': {
          backgroundColor: theme.vars.palette.error.dark,
        },
      }),
    },
  },
  MuiToggleButtonGroup: {
    styleOverrides: {
      root: {
        gap: 0,
      },
      grouped: {
        '&:first-of-type': {
          borderTopLeftRadius: '8px !important',
          borderBottomLeftRadius: '8px !important',
        },
        '&:last-of-type': {
          borderTopRightRadius: '8px !important',
          borderBottomRightRadius: '8px !important',
        },
      },
    },
  },
};