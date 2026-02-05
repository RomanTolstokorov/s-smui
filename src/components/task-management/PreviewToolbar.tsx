import React from 'react';
import { Box, Button, IconButton, Divider } from '@mui/material';
import { ArrowsOut, ClockCounterClockwise, DotsThree, DotsThreeIcon } from '@phosphor-icons/react';

/**
 * Action button configuration for workflow actions
 */
export interface WorkflowAction {
    id: string;
    label: string;
    onClick: () => void;
    variant?: 'contained' | 'outlined' | 'text';
    color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
    disabled?: boolean;
}

export interface PreviewToolbarProps {
    /**
     * Primary workflow actions (e.g., Start, Done, Move to, Assign to, Reject)
     * These appear on the left side as outlined buttons
     */
    workflowActions?: WorkflowAction[];

    /**
     * Show fullscreen button
     */
    showFullscreen?: boolean;

    /**
     * Show history button
     */
    showHistory?: boolean;

    /**
     * Show more actions button
     */
    showMoreActions?: boolean;

    /**
     * Fullscreen button click handler
     */
    onFullscreenClick?: () => void;

    /**
     * History button click handler
     */
    onHistoryClick?: () => void;

    /**
     * More actions button click handler
     */
    onMoreActionsClick?: () => void;
}

/**
 * PreviewToolbar - Action toolbar for document/task preview
 * 
 * Features:
 * - Left side: Workflow action buttons (Start, Done, Move to, Assign to, etc.)
 * - Right side: Common action buttons (Fullscreen, History, More)
 * - Configurable based on task flow state
 * - Responsive layout with proper spacing
 * 
 * Usage:
 * ```tsx
 * <PreviewToolbar
 *   workflowActions={[
 *     { id: 'done', label: 'تم', onClick: handleDone },
 *     { id: 'reject', label: 'الرفض', onClick: handleReject },
 *   ]}
 *   onFullscreenClick={handleFullscreen}
 *   onHistoryClick={handleHistory}
 *   onMoreActionsClick={handleMore}
 * />
 * ```
 */
export const PreviewToolbar: React.FC<PreviewToolbarProps> = ({
    workflowActions = [],
    showFullscreen = true,
    showHistory = true,
    showMoreActions = true,
    onFullscreenClick,
    onHistoryClick,
    onMoreActionsClick,
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2,
                minHeight: 72,
            }}
        >
            {/* Left Side - Primary Workflow Actions */}
            <Box
                sx={{
                    display: 'flex',
                    gap: 1,
                    alignItems: 'center',
                }}
            >
                {workflowActions.map((action) => (
                    <Button
                        key={action.id}
                        variant={action.variant || 'outlined'}
                        color={action.color || 'primary'}
                        onClick={action.onClick}
                        disabled={action.disabled}
                    >
                        {action.label}
                    </Button>
                ))}
            </Box>

            {/* Right Side - Secondary Common Actions */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0,
                }}
            >
                {/* Fullscreen Button */}
                {showFullscreen && (
                    <IconButton
                        onClick={onFullscreenClick}
                        size="medium"
                        sx={{
                            width: 40,
                            height: 40,
                        }}
                    >
                        <ArrowsOut size={24} weight="regular" />
                    </IconButton>
                )}

                {/* History Button */}
                {showHistory && (
                    <IconButton
                        onClick={onHistoryClick}
                        size="medium"
                        sx={{
                            width: 40,
                            height: 40,
                        }}
                    >
                        <ClockCounterClockwise size={24} weight="regular" />
                    </IconButton>
                )}


                {/* More Actions Button */}
                {showMoreActions && (
                    <IconButton
                        onClick={onMoreActionsClick}
                        size="medium"
                        sx={{
                            width: 40,
                            height: 40,
                        }}
                    >
                        <DotsThreeIcon size={24} weight="regular" />
                    </IconButton>
                )}
            </Box>
        </Box>
    );
};

export default PreviewToolbar;
