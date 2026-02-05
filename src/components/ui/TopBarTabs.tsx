import React from 'react';
import {
    Tabs as MuiTabs,
    Tab as MuiTab,
    type TabsProps as MuiTabsProps,
    type TabProps as MuiTabProps,
} from '@mui/material';

/**
 * TopBarTab - Custom Tab component for non-dynamic variant
 * Used in header navigation with static styling
 */
export interface TopBarTabProps extends Omit<MuiTabProps, 'children'> {
    label: string;
    badge?: React.ReactNode;
    value: string;
}

export const TopBarTab: React.FC<TopBarTabProps> = ({
    label,
    badge,
    value,
    ...props
}) => {
    return (
        <MuiTab
            label={
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>{label}</span>
                    {badge}
                </span>
            }
            value={value}
            {...props}
        />
    );
};

/**
 * TopBarTabs - Custom Tabs container with non-dynamic variant
 * Static horizontal tabs for header navigation
 */
export interface TopBarTabsProps extends Omit<MuiTabsProps, 'variant'> {
    variant?: 'nodynamic';
    children: React.ReactNode;
}

export const TopBarTabs: React.FC<TopBarTabsProps> = ({
    variant = 'nodynamic',
    children,
    ...props
}) => {
    return (
        <MuiTabs
            {...props}
            sx={{
                minHeight: 'auto',
                '& .MuiTabs-flexContainer': {
                    gap: 1, // 8px gap between tabs
                },
                '& .MuiTabs-indicator': {
                    display: 'none', // No bottom indicator for static variant
                },
                '& .MuiTab-root': {
                    minHeight: 'auto',
                    minWidth: 'auto',
                    textTransform: 'none',
                    fontSize: '0.9375rem', // 15px
                    lineHeight: '26px',
                    fontWeight: 500,
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    color: 'action.active',
                    backgroundColor: 'transparent',
                    transition: 'background-color 0.2s, color 0.2s',
                    '&:hover': {
                        backgroundColor: 'action.hover',
                    },
                    '&.Mui-selected': {
                        color: 'primary.dark',
                        backgroundColor: (theme) => theme.alpha(theme.vars.palette.primary.main, theme.vars.palette.action.selectedOpacity),
                        '&:hover': {
                            backgroundColor: (theme) => theme.alpha(theme.vars.palette.primary.main, theme.vars.palette.action.hoverOpacity),
                        },
                    },
                },
                ...props.sx,
            }}
        >
            {children}
        </MuiTabs>
    );
};
