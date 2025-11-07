import type { ReactElement, ComponentType } from 'react';
import type { OperatorType } from './types';
import {
    ContainsIcon,
    EndsWithIcon,
    StartsWithIcon,
    EqualsIcon,
    NotEqualsIcon,
    GreaterThanIcon,
    LessThanIcon,
    GreaterThanOrEqualIcon,
} from '../../assets/icons/operators';

type IconComponent = ComponentType<{ color?: string }>;

const ICON_MAP_CONFIG: Record<OperatorType, { Component: IconComponent; cssVar: string }> = {
    'contains': { Component: ContainsIcon, cssVar: 'var(--mui-palette-primary-dark)' },
    'equals': { Component: EqualsIcon, cssVar: 'var(--mui-palette-success-main)' },
    'not-equals': { Component: NotEqualsIcon, cssVar: 'var(--mui-palette-error-main)' },
    'starts-with': { Component: StartsWithIcon, cssVar: 'var(--mui-palette-warning-dark)' },
    'ends-with': { Component: EndsWithIcon, cssVar: 'var(--mui-palette-warning-dark)' },
    'greater-than': { Component: GreaterThanIcon, cssVar: 'var(--mui-palette-info-main)' },
    'less-than': { Component: LessThanIcon, cssVar: 'var(--mui-palette-info-main)' },
    // Note: Using available icons for missing operators - you may want to create specific icons for these
    'not-contains': { Component: NotEqualsIcon, cssVar: 'var(--mui-palette-error-main)' },
    'between': { Component: GreaterThanOrEqualIcon, cssVar: 'var(--mui-palette-info-main)' },
} as const;

/**
 * Gets the appropriate icon for an operator with semantic color coding
 * 
 * @param operatorType - The operator type to get the icon for
 * @param disabled - Whether the icon should appear disabled
 * @returns React element containing the colored operator icon
 */
export const getOperatorIcon = (operatorType: OperatorType, disabled = false) => {
    const getOperatorColor = (cssVar: string): string => {
        if (disabled) {
            return 'var(--mui-palette-action-active)';
        }
        return cssVar;
    };

    // Recreate icon map on each function call with current colors
    const iconMap = Object.entries(ICON_MAP_CONFIG).reduce((acc, [key, config]) => {
        const { Component, cssVar } = config;
        acc[key as OperatorType] = <Component color={getOperatorColor(cssVar)} />;
        return acc;
    }, {} as Record<OperatorType, ReactElement>);

    const defaultConfig = ICON_MAP_CONFIG['equals'];
    return iconMap[operatorType] ?? <defaultConfig.Component color={getOperatorColor(defaultConfig.cssVar)} />;
};
