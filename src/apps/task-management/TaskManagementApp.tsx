import React, { useState } from 'react';
import {
    Box,
    Typography,
    Pagination,
} from '@mui/material';
import { FilterPanel, TaskManagementHeader, TaskListItem } from '../../components/task-management';
import type { TaskItemData } from '../../components/task-management/TaskListItem';
import { mockTaskItems } from '../../mocks';
import { islandStyle } from '../../theme';

type ViewMode = 'list' | 'table';
type TabValue = 'all' | 'created-by-me' | 'incoming';

export const TaskManagementApp: React.FC = () => {
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab, setActiveTab] = useState<TabValue>('incoming');
    const [tasks] = useState<TaskItemData[]>(mockTaskItems);
    const tasksPerPage = 10;

    const totalPages = Math.ceil(tasks.length / tasksPerPage);
    const startIndex = (currentPage - 1) * tasksPerPage;
    const currentTasks = tasks.slice(startIndex, startIndex + tasksPerPage);

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* Header */}
            <TaskManagementHeader
                viewMode={viewMode}
                activeTab={activeTab}
                onViewModeChange={setViewMode}
                onTabChange={setActiveTab}
            />

            {/* Main Content Area */}
            <Box sx={{ display: 'flex', gap: 2, flex: 1, minHeight: 0 }}>
                {/* Right Panel - Filters */}
                <Box sx={{ flex: 1.2 }}>
                    <FilterPanel />
                </Box>

                {/* Center Panel - Task List */}
                <Box sx={{ flex: 1.2, display: 'flex', flexDirection: 'column', minWidth: 0, width: 400, }}>
                    <Box
                        sx={{
                            ...islandStyle,
                            flex: 1,
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >

                        {/* Task List Container */}
                        <Box sx={{ flex: 1, overflow: 'auto' }}>
                            {viewMode === 'list' ? (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 3,
                                        p: 2,
                                    }}
                                >
                                    {currentTasks.map((task: TaskItemData) => (
                                        <TaskListItem
                                            key={task.id}
                                            {...task}
                                            selected={selectedTaskId === task.id}
                                            onClick={() => setSelectedTaskId(task.id)}
                                        />
                                    ))}
                                </Box>
                            ) : (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '100%',
                                        p: 2,
                                    }}
                                >
                                    <Typography variant="body2" color="text.secondary">
                                        Table view coming soon
                                    </Typography>
                                </Box>
                            )}
                        </Box>

                        {/* Pagination */}
                        <Box
                            sx={{
                                p: 2,
                                borderTop: '1px solid',
                                borderColor: 'divider',
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={(_, page) => setCurrentPage(page)}
                                color="primary"
                                showFirstButton
                                showLastButton
                            />
                        </Box>
                    </Box>
                </Box>

                {/* Left Panel - Task Details Placeholder */}
                <Box
                    sx={{
                        ...islandStyle,
                        flex: 3,
                        flexShrink: 0,
                        p: 3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography variant="body2" color="text.secondary">
                        Task details panel
                        <br />
                        (In progress)
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default TaskManagementApp;