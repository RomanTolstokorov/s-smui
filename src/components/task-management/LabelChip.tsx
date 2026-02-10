import React from 'react';
import { Box, IconButton } from '@mui/material';
import { XIcon } from '@phosphor-icons/react';

interface LabelChipProps {
    label: string;
    color: string;
    error?: boolean;
    onDelete?: () => void;
}

/**
 * LabelChip - A customizable chip component with label and colored badge dot
 * 
 * Features:
 * - Interactive states: Enabled, Hovered, Pressed, Error
 * - Configurable badge dot color
 * - Optional delete button (X icon) for edit mode
 * - Smooth border color transitions
 * 
 * States:
 * - Default: Gray border (#e1e3e5)
 * - Hovered: Light blue border (#6196f8)
 * - Pressed: Dark blue border (#3b6bf6)
 * - Error: Red border (#d83731)
 */
export const LabelChip: React.FC<LabelChipProps> = ({ label, color, error = false, onDelete }) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const [isPressed, setIsPressed] = React.useState(false);

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                height: 32,
                pr: onDelete ? 0.5 : 1,
                pl: 1,
                py: 0.25,
                border: '1px solid',
                borderColor: (theme) => {
                    if (error) return theme.vars.palette.error.main;
                    if (isPressed) return theme.vars.palette.primary.main;
                    if (isHovered) return theme.vars.palette.primary.light;
                    return theme.vars.palette.divider;
                },
                borderRadius: 5,
                bgcolor: 'background.default',
                boxShadow: '0px 1px 2px 0px rgba(65, 50, 42, 0.08)',
                cursor: onDelete ? 'pointer' : 'default',
                transition: 'border-color 0.2s ease',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setIsPressed(false);
            }}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
        >

            <Box
                sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    bgcolor: color,
                    flexShrink: 0,
                }}
            />
            <Box
                component="span"
                sx={{
                    fontSize: '0.8125rem',
                    lineHeight: '18px',
                    letterSpacing: '0.16px',
                    color: 'text.primary',
                }}
            >
                {label}
            </Box>

            {onDelete && (
                <IconButton
                    size="xsmall"
                    shape="circle"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                >
                    <XIcon size={12} />
                </IconButton>
            )}

        </Box>
    );
};

export default LabelChip;
