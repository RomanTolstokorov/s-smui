import React from 'react';
import { Box, IconButton } from '@mui/material';
import { EqualsIcon, NotEqualsIcon } from '../../assets/icons/operators';
import { SSingleSelect, type OptionType } from '../ui/SSingleSelect';
import { SMultiSelect } from '../ui/SMultiSelect';

export type FilterValueType = 'single-select' | 'multi-select';

export interface AppFilterInputProps {
    /**
     * The filter name to display
     */
    name: string;
    /**
     * Type of filter value selection
     */
    valueType: FilterValueType;
    /**
     * Available options for the select
     */
    options: OptionType[];
    /**
     * Current selected value(s)
     */
    value: OptionType | OptionType[] | null;
    /**
     * Change handler for value selection
     */
    onValueChange: (value: OptionType | OptionType[] | null) => void;
    /**
     * Whether the operator is 'equals' (true) or 'not-equals' (false)
     */
    isEquals?: boolean;
    /**
     * Click handler for the operator toggle button
     */
    onOperatorToggle?: () => void;
    /**
     * Optional custom styling
     */
    sx?: any;
}

/**
 * AppFilterInput - A filter component with equals/not-equals toggle and value selection
 * 
 * Layout: [Equals/Not-Equals Button] [Single/Multi Select]
 * Width: Full width with 4px gap between button and select
 * Min height: 40px
 * 
 * The equals/not-equals button is disabled until a value is selected,
 * allowing users to quickly switch between inclusion and exclusion filtering.
 * 
 * Based on Figma design: https://www.figma.com/design/F8J2cgGBsmyFLyw9OW6Njq/Teletronics-SUI?node-id=21386-37593
 */
export const AppFilterInput: React.FC<AppFilterInputProps> = ({
    name,
    valueType,
    options,
    value,
    onValueChange,
    isEquals = true,
    onOperatorToggle,
    sx,
}) => {
    // Determine if filter has an active value
    const hasValue = valueType === 'multi-select'
        ? Array.isArray(value) && value.length > 0
        : value !== null;
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                width: '100%',
                ...sx,
            }}
        >
            {/* Equals/Not-Equals Toggle Button */}
            <IconButton
                disabled={!hasValue}
                onClick={(e) => {
                    e.stopPropagation();
                    if (hasValue && onOperatorToggle) {
                        onOperatorToggle();
                    }
                }}
            >
                {isEquals ? (
                    <EqualsIcon
                        color={hasValue ? 'var(--mui-palette-success-main)' : 'var(--mui-palette-action-disabled)'}
                    />
                ) : (
                    <NotEqualsIcon
                        color={hasValue ? 'var(--mui-palette-error-main)' : 'var(--mui-palette-action-disabled)'}
                    />
                )}
            </IconButton>

            {/* Value Selection Area */}
            <Box sx={{ flex: 1 }}>
                {valueType === 'single-select' ? (
                    <SSingleSelect<OptionType>
                        variant="standard"
                        value={value as OptionType | null}
                        onChange={(newValue) => onValueChange(newValue)}
                        options={options}
                        label={name}
                        searchable={true}
                        clearable={true}
                    />
                ) : (
                    <SMultiSelect<OptionType>
                        variant="standard"
                        value={(value as OptionType[]) || []}
                        onChange={(newValue) => onValueChange(newValue)}
                        options={options}
                        label={name}
                        searchable={true}
                    />
                )}
            </Box>
        </Box>
    );
};
