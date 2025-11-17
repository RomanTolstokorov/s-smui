import React, { useState } from 'react';
import {
    Box,
    Typography,
    List,
    Pagination,
} from '@mui/material';
import { TaskItem, FilterPanel, TaskManagementHeader } from '../../components/task-management';
import type { TaskItemData } from '../../components/task-management/TaskItem';
import { mockTaskItems } from '../../mocks';
import { islandStyle } from '../../theme';

type ViewMode = 'card' | 'list';
type TabValue = 'all' | 'created-by-me' | 'incoming';

export const TaskManagementApp: React.FC = () => {
    const [viewMode, setViewMode] = useState<ViewMode>('card');
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
                {/* Left Panel - Task Details Placeholder */}
                <Box
                    sx={{
                        ...islandStyle,
                        width: 300,
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

                {/* Center Panel - Task List */}
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
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
                            {viewMode === 'card' ? (
                                <Box
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns: {
                                            xs: '1fr',
                                            sm: 'repeat(2, 1fr)',
                                            lg: 'repeat(3, 1fr)',
                                        },
                                        gap: 2,
                                        p: 2,
                                    }}
                                >
                                    {currentTasks.map((task: TaskItemData) => (
                                        <TaskItem
                                            key={task.id}
                                            {...task}
                                            view="card"
                                            selected={selectedTaskId === task.id}
                                            onClick={() => setSelectedTaskId(task.id)}
                                        />
                                    ))}
                                </Box>
                            ) : (
                                <List disablePadding>
                                    {currentTasks.map((task: TaskItemData) => (
                                        <TaskItem
                                            key={task.id}
                                            {...task}
                                            view="list"
                                            selected={selectedTaskId === task.id}
                                            onClick={() => setSelectedTaskId(task.id)}
                                        />
                                    ))}
                                </List>
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

                {/* Right Panel - Filters */}
                <Box sx={{ width: 280, flexShrink: 0 }}>
                    <FilterPanel />
                </Box>
            </Box>
        </Box>
    );
};

export default TaskManagementApp;