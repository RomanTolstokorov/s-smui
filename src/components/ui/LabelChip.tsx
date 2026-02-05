import React from 'react';
import { Chip, Badge, type ChipProps } from '@mui/material';
import { X } from '@phosphor-icons/react';

export interface LabelChipProps extends Omit<ChipProps, 'size'> {
    /**
     * The label text to display
     */
    label: string;

    /**
     * Whether to show the badge indicator dot
     */
    hasBadge?: boolean;

    /**
     * The color of the badge indicator
     */
    badgeColor?: 'warning' | 'success' | 'error' | 'info' | 'primary' | 'secondary';

    /**
     * Size of the chip - small (24px) or medium (32px)
     */
    size?: 'small' | 'medium';

    /**
     * Whether the chip is deletable (shows X icon)
     */
    onDelete?: () => void;
}

/**
 * LabelChip - A specialized chip component with optional badge indicator
 * 
 * Features:
 * - Two sizes: small (24px height) and medium (32px height)
 * - Optional colored badge dot indicator
 * - Optional delete functionality with X icon
 * - Outlined style with border
 * 
 * Usage:
 * ```tsx
 * <LabelChip label="Important" hasBadge badgeColor="warning" size="medium" />
 * <LabelChip label="Draft" size="small" />
 * ```
 */
export const LabelChip: React.FC<LabelChipProps> = ({
    label,
    hasBadge = false,
    badgeColor = 'warning',
    size = 'small',
    onDelete,
    sx,
    ...chipProps
}) => {
    const chipContent = (
        <Chip
            label={label}
            variant="outlined"
            onDelete={onDelete}
            deleteIcon={onDelete ? <X size={16} weight="regular" /> : undefined}
            sx={{
                height: size === 'small' ? 24 : 32,
                fontSize: '0.8125rem', // 13px
                fontWeight: 400,
                lineHeight: '18px',
                letterSpacing: '0.16px',
                px: 1,
                py: size === 'small' ? '3px' : '2px',
                borderRadius: '24px',
                backgroundColor: 'background.default',
                borderColor: 'components.input.border',
                boxShadow: '0px 1px 2px 0px rgba(65, 50, 42, 0.08)',
                '& .MuiChip-label': {
                    px: 0.5,
                    py: 0,
                    lineHeight: '18px',
                },
                '& .MuiChip-deleteIcon': {
                    margin: 0,
                    marginLeft: 0.5,
                    width: 16,
                    height: 16,
                    color: 'text.primary',
                    '&:hover': {
                        color: 'text.primary',
                        opacity: 0.7,
                    },
                },
                '&:hover': {
                    borderColor: 'primary.light',
                    backgroundColor: 'background.default',
                },
                '&:active': {
                    borderColor: 'primary.main',
                },
                ...sx,
            }}
            {...chipProps}
        />
    );

    // Wrap with Badge if hasBadge is true
    if (hasBadge) {
        return (
            <Badge
                variant="dot"
                color={badgeColor}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                sx={{
                    '& .MuiBadge-badge': {
                        minWidth: 8,
                        width: 8,
                        height: 8,
                        borderRadius: '100px',
                        top: size === 'small' ? 6 : 8,
                        left: size === 'small' ? 6 : 8,
                    },
                }}
            >
                {chipContent}
            </Badge>
        );
    }

    return chipContent;
};

export default LabelChip;
