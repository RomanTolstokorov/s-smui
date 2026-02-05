import React from 'react';
import {
    Box,
    Typography,
    Avatar,
    Tooltip,
    Paper,
} from '@mui/material';
import { PaperclipIcon, CircleIcon, ArrowLeftIcon, FlagIcon } from '@phosphor-icons/react';
import { SubtaskIcon } from '../../assets/icons';

export interface TaskItemData {
    id: string;
    subject: string; // Changed from 'title' to match Figma annotation "this is task subject"
    submissionDate: string; // Changed from 'date' to match Figma annotation
    taskType?: 'task' | 'document'; // Type of task: regular task or document task
    assignee?: {
        name: string;
        avatar?: string;
    };
    fromUser?: { // User who created/sent the task
        name: string;
        avatar?: string;
    };
    workStatus?: 'todo' | 'in_progress'; // Only show when task is running, per annotation
    isUrgent?: boolean; // Show urgent flag conditionally
    linkedTasksCount?: number; // Show counter if linked tasks exist
    attachmentsCount?: number; // Show if any attachments
    flowStatus?: string; // Task flow status (e.g., "QA-مفتوح")
    ejsContent?: string; // EJS embeddings - admin can show anything
    typeIcon?: React.ReactNode; // Task type icon
    // Document-specific fields (when taskType === 'document')
    documentData?: {
        tags?: string[];
        categories?: string[];
        summary?: string;
        content?: string;
        metadata?: {
            views?: number;
            downloads?: number;
            shares?: number;
            version?: string;
        };
        extraSections?: Array<{
            title: string;
            fields: Record<string, string>;
        }>;
    };
}

export interface TaskListItemProps extends TaskItemData {
    selected?: boolean;
    focused?: boolean; // Add focused state
    onClick?: () => void;
}

// Work Status Icon - only shows when task is running (todo or in_progress)
const WorkStatusIcon: React.FC<{ status?: 'todo' | 'in_progress' }> = ({ status }) => {
    if (!status) return null;

    const isTodo = status === 'todo';

    return (
        <Box
            sx={{
                width: 24,
                height: 24,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
            }}
        >
            <CircleIcon
                size={16}
                weight={isTodo ? 'regular' : 'fill'}
                color={isTodo ? 'var(--mui-palette-components-icon-secondary)' : 'var(--mui-palette-primary-main)'}
            />
        </Box>
    );
};

export const TaskListItem: React.FC<TaskListItemProps> = ({
    id,
    subject,
    submissionDate,
    assignee,
    fromUser,
    workStatus,
    isUrgent,
    linkedTasksCount,
    attachmentsCount,
    flowStatus,
    ejsContent,
    typeIcon,
    selected,
    focused,
    onClick,
}) => {
    // Determine background based on state
    const getBackgroundStyle = () => {
        if (focused) {
            return 'primary.states.focus'; // rgba(40,108,255,0.15) from Figma
        }
        if (selected) {
            return 'primary.states.selected'; // rgba(40,108,255,0.08) from Figma
        }
        return 'background.surface_3'; // #ffffff
    };

    return (
        <Paper
            onClick={onClick}
            sx={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                p: 1,
                bgcolor: getBackgroundStyle(),
                maxHeight: 156,
                overflow: 'hidden',
                '&:hover': {
                    backgroundColor: 'var(--mui-palette-action-hover)',
                },
            }}
        >
            {/* Top Row: Type Icon, ID, Urgent Flag on left | Work Status, Attachments, Linked Tasks on right */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: 24,
                    minHeight: 24,
                    maxHeight: 24,
                }}
            >
                {/* Left: Type & ID */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        flexShrink: 0,
                    }}
                >
                    {/* Task Type Icon */}
                    {typeIcon && (
                        <Box
                            sx={{
                                width: 24,
                                height: 24,
                                overflow: 'hidden',
                                flexShrink: 0,
                            }}
                        >
                            {typeIcon}
                        </Box>
                    )}

                    {/* Task ID */}
                    <Typography
                        variant="caption"
                        color='text.secondary'
                    >
                        {id}
                    </Typography>

                    {/* Urgent Flag - show if marked urgent */}
                    {isUrgent && (
                        <Box
                            sx={{
                                width: 24,
                                height: 24,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                            }}
                        >
                            <FlagIcon size={24} weight="fill" color="rgba(216, 55, 49, 1)" />
                        </Box>
                    )}
                </Box>

                {/* Right: Additional info - linked tasks, attachment, work status */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        height: 24,
                        overflow: 'hidden',
                        flexShrink: 0,
                    }}
                >
                    {/* Linked Tasks Counter - show if any linked tasks */}
                    {linkedTasksCount !== undefined && linkedTasksCount > 0 && (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                overflow: 'hidden',
                                flexShrink: 0,
                            }}
                        >
                            <Box
                                sx={{
                                    width: 20,
                                    height: 20,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                }}
                            >
                                <SubtaskIcon size={16} color="var(--mui-palette-components-icon-secondary)" />
                            </Box>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: 'components.icon.secondary',
                                    fontSize: '0.875rem',
                                    lineHeight: 1.7,
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {linkedTasksCount}
                            </Typography>
                        </Box>
                    )}

                    {/* Attachment Icon - show if any attachments */}
                    {attachmentsCount !== undefined && attachmentsCount > 0 && (
                        <Box
                            sx={{
                                width: 20,
                                height: 20,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                            }}
                        >
                            <PaperclipIcon size={20} color="var(--mui-palette-components-icon-secondary)" />
                        </Box>
                    )}

                    {/* Work Status - only show when task is running */}
                    <WorkStatusIcon status={workStatus} />
                </Box>
            </Box>

            {/* Middle & Bottom Section: Subject, EJS, Date, Flow Status, Avatars */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                }}
            >
                {/* Subject & EJS Container */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        alignItems: 'stretch',
                    }}
                >
                    {/* Task Subject */}
                    <Typography
                        variant="subtitle2"
                        dir="auto"
                        sx={{
                            color: 'text.primary',
                            fontSize: '14px',
                            fontWeight: 600,
                            lineHeight: 1.57,
                            width: '100%',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {subject}
                    </Typography>

                    {/* EJS Embeddings - admin can show anything */}
                    {ejsContent && (
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'left',
                                gap: 1,
                                height: 24,
                                width: '100%',
                            }}
                        >
                            <Typography
                                variant="body2"
                                color='text.secondary'
                                sx={{
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {ejsContent}
                            </Typography>
                        </Box>
                    )}
                </Box>

                {/* Bottom Row: Avatars, Flow Status, and Submission Date */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'start',
                        justifyContent: 'space-between',
                    }}
                >
                    {/* Left: Avatar Container - From User, Arrow, Assignee */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            overflow: 'hidden',
                            flexShrink: 1,
                            minWidth: 0,
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                flexShrink: 0,
                            }}
                        >
                            {/* From User - with tooltip */}
                            {fromUser && (
                                <Tooltip title={fromUser.name} placement="top">
                                    <Avatar
                                        src={fromUser.avatar}
                                        alt={fromUser.name}
                                        sx={{
                                            width: 24,
                                            height: 24,
                                            fontSize: '0.75rem',
                                            borderRadius: 0.5,
                                        }}
                                    >
                                        {fromUser.name?.[0] || '?'}
                                    </Avatar>
                                </Tooltip>
                            )}

                            {/* Arrow Icon */}
                            {assignee && fromUser && (
                                <Box
                                    sx={{
                                        width: 20,
                                        height: 20,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        flexShrink: 0,
                                    }}
                                >
                                    <ArrowLeftIcon size={20} color="var(--mui-palette-components-icon-secondary)" />
                                </Box>
                            )}

                            {/* Current Assignee */}
                            {assignee && (
                                <Avatar
                                    src={assignee.avatar}
                                    alt={assignee.name}
                                    sx={{
                                        width: 24,
                                        height: 24,
                                        fontSize: '0.75rem',
                                        borderRadius: 0.5,
                                    }}
                                >
                                    {assignee.name?.[0] || '?'}
                                </Avatar>
                            )}
                        </Box>

                        {/* Flow Status */}
                        {flowStatus && (
                            <Typography
                                variant="body2"
                                dir="auto"
                                sx={{
                                    color: 'text.secondary',
                                    fontSize: '0.875rem',
                                    lineHeight: 1.7,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    maxWidth: 140,
                                }}
                            >
                                {flowStatus}
                            </Typography>
                        )}
                    </Box>

                    {/* Right: Submission Date */}
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'text.secondary',
                            fontSize: '0.875rem',
                            lineHeight: 1.7,
                            whiteSpace: 'nowrap',
                        }}
                    >
                        {submissionDate}
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );
};
