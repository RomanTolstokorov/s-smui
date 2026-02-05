import React from 'react';
import {
    Box,
    Typography,
    Button,
    ToggleButton,
    ToggleButtonGroup,
    Badge,
} from '@mui/material';
import {
    PlusIcon,
    TableIcon,
    ListBulletsIcon,
    CaretDownIcon,
} from '@phosphor-icons/react';
import { TopBarTabs, TopBarTab } from '../ui';
import { islandStyleNoBorder } from '../../theme';

type ViewMode = 'list' | 'table';
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
                <TopBarTabs
                    value={activeTab}
                    onChange={(_, newValue: TabValue) => onTabChange(newValue)}
                >
                    <TopBarTab
                        label="Incoming"
                        value="incoming"
                        badge={
                            <Badge
                                badgeContent="34/357"
                                color="error"
                                sx={{
                                    '& .MuiBadge-badge': {
                                        position: 'static',
                                        transform: 'none',
                                        fontSize: '0.75rem',
                                        fontWeight: 700,
                                        lineHeight: '20px',
                                        height: 20,
                                        minWidth: 20,
                                        px: 0.8125,
                                    },
                                }}
                            />
                        }
                    />
                    <TopBarTab
                        label="Created by me"
                        value="created-by-me"
                    />
                    <TopBarTab
                        label="All"
                        value="all"
                    />
                </TopBarTabs>
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
                        <ToggleButton value="list" aria-label="list view">
                            <ListBulletsIcon size={18} />
                        </ToggleButton>
                        <ToggleButton value="table" aria-label="table view">
                            <TableIcon size={18} />
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
