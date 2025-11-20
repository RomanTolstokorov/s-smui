import React from 'react';
import { Box } from '@mui/material';
import { AppFilterInput, type AppFilterInputProps } from './AppFilterInput';

export interface LinkedAppFilterInputProps {
    /**
     * Props for the parent (main) filter - typically single-select
     */
    parentFilter: AppFilterInputProps;
    /**
     * Props for the child (sub) filter - typically multi-select
     */
    childFilter: AppFilterInputProps;
    /**
     * Whether to show the child filter (shown when parent has a value)
     */
    showChildFilter?: boolean;
}

/**
 * LinkedAppFilterInput - A pair of parent-child filter inputs with visual connection
 * 
 * Layout: Full width with visual connector on the right
 * - Main area: Parent filter (typically single-select)
 * - Child area: Sub-filter (typically multi-select) shown when parent has value
 * - Visual connector: Right border showing relationship
 * 
 * The parent filter is usually single-select (e.g., Country)
 * The child filter is usually multi-select (e.g., Cities within selected Country)
 * 
 * Based on Figma design: https://www.figma.com/design/F8J2cgGBsmyFLyw9OW6Njq/Teletronics-SUI?node-id=21397-36702
 */
export const LinkedAppFilterInput: React.FC<LinkedAppFilterInputProps> = ({
    parentFilter,
    childFilter,
    showChildFilter = false,
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                gap: '4px',
                width: '100%',
            }}
        >
            {/* Left Column - Filters */}
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                }}
            >
                {/* Parent Filter */}
                <AppFilterInput {...parentFilter} />

                {/* Child Filter (indented) */}
                {showChildFilter && (
                    <Box sx={{ pl: 3 }}>
                        <AppFilterInput {...childFilter} />
                    </Box>
                )}
            </Box>

            {/* Right Column - Visual Connector */}
            {showChildFilter && (
                <Box
                    sx={{
                        width: '32px',
                        display: 'flex',
                        alignItems: 'stretch',
                        pt: '20px',
                        pb: '20px',
                    }}
                >
                    <Box
                        sx={{
                            flex: 1,
                            borderRight: '1px solid',
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                            borderTopRightRadius: '8px',
                            borderBottomRightRadius: '8px',
                            ml: '4px',
                            mr: '16px',
                        }}
                    />
                </Box>
            )}
        </Box>
    );
};
