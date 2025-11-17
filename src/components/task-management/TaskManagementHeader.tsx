import React from 'react';
import {
    Box,
    Typography,
    Button,
    ToggleButton,
    ToggleButtonGroup,
    Chip,
} from '@mui/material';
import {
    PlusIcon,
    SquaresFourIcon,
    ListBulletsIcon,
    CaretDownIcon,
} from '@phosphor-icons/react';
import { islandStyleNoBorder } from '../../theme';

type ViewMode = 'card' | 'list';
type TabValue = 'all' | 'created-by-me' | 'incoming';

interface TaskManagementHeaderProps {
    viewMode: ViewMode;
    activeTab: TabValue;
    onViewModeChange: (mode: ViewMode) => void;
    onTabChange: (tab: TabValue) => void;
    onNewTask?: () => void;
}

export const TaskManagementHeader: React.FC<TaskManagementHeaderProps> = ({
    viewMode,
    activeTab,
    onViewModeChange,
    onTabChange,
    onNewTask,
}) => {
    const handleViewChange = (_: React.MouseEvent<HTMLElement>, newView: ViewMode | null) => {
        if (newView !== null) {
            onViewModeChange(newView);
        }
    };

    return (
        <Box
            sx={{
                ...islandStyleNoBorder,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 4,
                py: 2,
                minHeight: 56,
            }}
        >

            {/* Right Side - Tabs and Title */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                {/* Title */}
                <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    Tasks
                </Typography>

                {/* Filter Tabs */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Button
                        variant="text"
                        size="small"
                        onClick={() => onTabChange('incoming')}
                        endIcon={
                            <Chip
                                label="34/357"
                                size="small"
                                sx={{
                                    height: 20,
                                    fontSize: '0.75rem',
                                    fontWeight: 700,
                                    '& .MuiChip-label': {
                                        px: 0.5,
                                    },
                                }}
                            />
                        }
                        sx={{
                            textTransform: 'none',
                            px: 2,
                            py: 1,
                            borderRadius: 2,
                            color: activeTab === 'incoming' ? 'primary.dark' : 'action.active',
                            bgcolor: activeTab === 'incoming' ? 'primary.states.selected' : 'transparent',
                            '&:hover': {
                                bgcolor: activeTab === 'incoming' ? 'primary.states.selected' : 'action.hover',
                            },
                        }}
                    >
                        Incoming
                    </Button>
                    <Button
                        variant="text"
                        size="small"
                        onClick={() => onTabChange('created-by-me')}
                        sx={{
                            textTransform: 'none',
                            px: 2,
                            py: 1,
                            borderRadius: 2,
                            color: activeTab === 'created-by-me' ? 'text.primary' : 'action.active',
                            bgcolor: activeTab === 'created-by-me' ? 'primary.states.selected' : 'transparent',
                            '&:hover': {
                                bgcolor: activeTab === 'created-by-me' ? 'primary.states.selected' : 'action.hover',
                            },
                        }}
                    >
                        Created by me
                    </Button>
                    <Button
                        variant="text"
                        size="small"
                        onClick={() => onTabChange('all')}
                        sx={{
                            textTransform: 'none',
                            px: 2,
                            py: 1,
                            borderRadius: 2,
                            color: activeTab === 'all' ? 'text.primary' : 'action.active',
                            bgcolor: activeTab === 'all' ? 'primary.states.selected' : 'transparent',
                            '&:hover': {
                                bgcolor: activeTab === 'all' ? 'primary.states.selected' : 'action.hover',
                            },
                        }}
                    >
                        All
                    </Button>
                </Box>
            </Box>


            {/* Left Side - Actions */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    {/* Columns Button */}
                    <Button
                        variant="text"
                        size="small"
                        endIcon={<CaretDownIcon size={14} />}
                        sx={{
                            textTransform: 'none',
                            color: 'primary.dark',
                            px: 2,
                            py: 1,
                        }}
                    >
                        Columns
                    </Button>

                    {/* View Controls */}
                    <ToggleButtonGroup
                        value={viewMode}
                        exclusive
                        onChange={handleViewChange}
                        size="small"
                    >
                        <ToggleButton value="card" aria-label="card view">
                            <SquaresFourIcon size={18} />
                        </ToggleButton>
                        <ToggleButton value="list" aria-label="list view">
                            <ListBulletsIcon size={18} />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>

                {/* New Task Button */}
                <Button
                    variant="contained"
                    endIcon={<PlusIcon size={18} />}
                    onClick={onNewTask}
                >
                    New task
                </Button>
            </Box>
        </Box>
    );
};
