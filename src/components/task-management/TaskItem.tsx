import React from 'react';
import {
    Box,
    Typography,
    Avatar,
    IconButton,
    Card,
    CardContent,
    ListItem,
    ListItemButton,
} from '@mui/material';
import { Flag, ChatCircle, Paperclip, CaretDown, Circle } from '@phosphor-icons/react';

export interface TaskItemData {
    id: string;
    title: string;
    date: string;
    assignee?: {
        name: string;
        avatar?: string;
    };
    workStatus?: 'open' | 'in-progress' | 'closed';
    isUrgent?: boolean;
    commentsCount?: number;
    attachmentsCount?: number;
}

export interface TaskItemProps extends TaskItemData {
    view?: 'card' | 'list';
    selected?: boolean;
    onClick?: () => void;
}

const WorkStatusBadge: React.FC<{ status?: TaskItemProps['workStatus'] }> = ({ status }) => {
    if (!status) return null;

    const getStatusConfig = () => {
        switch (status) {
            case 'in-progress':
                return {
                    icon: <Circle size={12} weight="fill" />,
                    color: '#2196F3',
                    label: 'In Progress',
                };
            case 'closed':
                return {
                    icon: <Circle size={12} weight="fill" />,
                    color: '#4CAF50',
                    label: 'Closed',
                };
            case 'open':
            default:
                return {
                    icon: <Circle size={12} />,
                    color: '#9E9E9E',
                    label: 'Open',
                };
        }
    };

    const config = getStatusConfig();

    return (
        <Box
            sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
                px: 1,
                py: 0.25,
                borderRadius: 1,
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Box sx={{ color: config.color, display: 'flex', alignItems: 'center' }}>
                {config.icon}
            </Box>
            <Typography variant="caption" sx={{ fontSize: '0.75rem', fontWeight: 500 }}>
                {config.label}
            </Typography>
        </Box>
    );
};

export const TaskItemCard: React.FC<TaskItemProps> = ({
    id,
    title,
    date,
    assignee,
    workStatus,
    isUrgent,
    commentsCount,
    attachmentsCount,
    selected,
    onClick,
}) => {
    return (
        <Card
            sx={{
                cursor: 'pointer',
                transition: 'all 0.2s',
                border: '1px solid',
                borderColor: selected ? 'primary.main' : 'divider',
                bgcolor: selected ? 'action.selected' : 'background.paper',
                '&:hover': {
                    borderColor: 'primary.main',
                    bgcolor: 'action.hover',
                },
            }}
            onClick={onClick}
        >
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                {/* Header with ID and Flag */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Circle size={16} weight="regular" />
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                            {id}
                        </Typography>
                    </Box>
                    {isUrgent && (
                        <Flag size={16} weight="fill" color="#F44336" />
                    )}
                </Box>

                {/* Title */}
                <Typography
                    variant="body2"
                    sx={{
                        mb: 1.5,
                        fontWeight: 500,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                    }}
                >
                    {title}
                </Typography>

                {/* Date */}
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5, fontSize: '0.75rem' }}>
                    {date}
                </Typography>

                {/* Footer with Assignee and Stats */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    {/* Assignee */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Avatar
                            src={assignee?.avatar}
                            alt={assignee?.name}
                            sx={{ width: 20, height: 20, fontSize: '0.7rem' }}
                        >
                            {assignee?.name?.[0] || '?'}
                        </Avatar>
                        <IconButton size="small" sx={{ p: 0.25 }}>
                            <CaretDown size={12} />
                        </IconButton>
                    </Box>

                    {/* Stats and Badge */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {(commentsCount !== undefined && commentsCount > 0) && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
                                <ChatCircle size={14} color="#666" />
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                                    {commentsCount}
                                </Typography>
                            </Box>
                        )}
                        {(attachmentsCount !== undefined && attachmentsCount > 0) && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
                                <Paperclip size={14} color="#666" />
                                <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                                    {attachmentsCount}
                                </Typography>
                            </Box>
                        )}
                        <WorkStatusBadge status={workStatus} />
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export const TaskItemList: React.FC<TaskItemProps> = ({
    id,
    title,
    date,
    assignee,
    workStatus,
    isUrgent,
    commentsCount,
    attachmentsCount,
    selected,
    onClick,
}) => {
    return (
        <ListItem
            disablePadding
            sx={{
                borderBottom: '1px solid',
                borderColor: 'divider',
                bgcolor: selected ? 'action.selected' : 'transparent',
            }}
        >
            <ListItemButton
                selected={selected}
                onClick={onClick}
                sx={{
                    py: 1.5,
                    px: 2,
                    '&:hover': {
                        bgcolor: 'action.hover',
                    },
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 2 }}>
                    {/* Left: Circle and ID */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 80 }}>
                        <Circle size={16} weight="regular" />
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
                            {id}
                        </Typography>
                    </Box>

                    {/* Center: Flag and Title */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {isUrgent && (
                                <Flag size={16} weight="fill" color="#F44336" />
                            )}
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: 500,
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                {title}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Right: Date, Assignee, Stats, Badge */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.75rem', minWidth: 70 }}>
                            {date}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Avatar
                                src={assignee?.avatar}
                                alt={assignee?.name}
                                sx={{ width: 20, height: 20, fontSize: '0.7rem' }}
                            >
                                {assignee?.name?.[0] || '?'}
                            </Avatar>
                            <IconButton size="small" sx={{ p: 0.25 }}>
                                <CaretDown size={12} />
                            </IconButton>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {(commentsCount !== undefined && commentsCount > 0) && (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
                                    <ChatCircle size={14} color="#666" />
                                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                                        {commentsCount}
                                    </Typography>
                                </Box>
                            )}
                            {(attachmentsCount !== undefined && attachmentsCount > 0) && (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
                                    <Paperclip size={14} color="#666" />
                                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
                                        {attachmentsCount}
                                    </Typography>
                                </Box>
                            )}
                            <WorkStatusBadge status={workStatus} />
                        </Box>
                    </Box>
                </Box>
            </ListItemButton>
        </ListItem>
    );
};

export const TaskItem: React.FC<TaskItemProps> = (props) => {
    const { view = 'card' } = props;

    if (view === 'list') {
        return <TaskItemList {...props} />;
    }

    return <TaskItemCard {...props} />;
};
