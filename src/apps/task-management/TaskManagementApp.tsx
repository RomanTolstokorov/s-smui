import React, { useState, useMemo } from 'react';
import {
    Box,
    Typography,
    Pagination,
} from '@mui/material';
import { TaskFilterPanel, TaskManagementHeader, TaskListItem, DocumentPreview } from '../../components/task-management';
import type { TaskItemData } from '../../components/task-management/TaskListItem';
import type { DocumentData, WorkflowAction } from '../../components/task-management';
import { mockTaskItems, taskFilterDefinitions, mockSavedSearches } from '../../mocks';
import { islandStyleNoBorder } from '../../theme';

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

    // Get the selected task
    const selectedTask = useMemo(() => {
        return tasks.find(task => task.id === selectedTaskId);
    }, [tasks, selectedTaskId]);

    // Convert TaskItemData to DocumentData for document type tasks
    const documentData = useMemo((): DocumentData | null => {
        if (!selectedTask || selectedTask.taskType !== 'document') {
            return null;
        }

        return {
            id: selectedTask.id,
            subject: selectedTask.subject,
            tags: selectedTask.documentData?.tags || [],
            categories: selectedTask.documentData?.categories || [],
            status: 'published',
            priority: selectedTask.isUrgent ? 'high' : 'medium',
            owner: selectedTask.assignee,
            createdDate: selectedTask.submissionDate,
            updatedDate: selectedTask.submissionDate,
            documentTypeIcon: selectedTask.typeIcon,
            summary: selectedTask.documentData?.summary,
            content: selectedTask.documentData?.content,
            metadata: selectedTask.documentData?.metadata,
            extraSections: selectedTask.documentData?.extraSections,
        };
    }, [selectedTask]);

    // Get workflow actions based on task state
    const workflowActions = useMemo((): WorkflowAction[] => {
        if (!selectedTask || selectedTask.taskType !== 'document') {
            return [];
        }

        // Different actions based on task work status
        const workStatus = selectedTask.workStatus;

        if (!workStatus || workStatus === 'todo') {
            return [
                {
                    id: 'start',
                    label: 'ابدأ', // Start
                    onClick: () => console.log('Start task:', selectedTask.id),
                    variant: 'outlined',
                },
                {
                    id: 'assign',
                    label: 'تعيين إلى', // Assign to
                    onClick: () => console.log('Assign task:', selectedTask.id),
                    variant: 'outlined',
                },
            ];
        } else if (workStatus === 'in_progress') {
            return [
                {
                    id: 'done',
                    label: 'تم', // Done
                    onClick: () => console.log('Complete task:', selectedTask.id),
                    variant: 'outlined',
                    color: 'success',
                },
                {
                    id: 'move-to',
                    label: 'انتقل إلى', // Move to
                    onClick: () => console.log('Move task:', selectedTask.id),
                    variant: 'outlined',
                },
                {
                    id: 'reject',
                    label: 'رفض', // Reject
                    onClick: () => console.log('Reject task:', selectedTask.id),
                    variant: 'outlined',
                    color: 'error',
                },
            ];
        }

        return [];
    }, [selectedTask]);

    return (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
            {/* Header */}
            <TaskManagementHeader
                viewMode={viewMode}
                activeTab={activeTab}
                onViewModeChange={setViewMode}
                onTabChange={setActiveTab}
            />

            {/* Main Content Area */}
            <Box sx={{ display: 'flex', gap: 1, flex: 1, minHeight: 0 }}>
                {/* Right Panel - Filters */}
                <TaskFilterPanel
                    filterDefinitions={taskFilterDefinitions}
                    initialSavedSearches={mockSavedSearches}
                    onFiltersChange={(filters) => {
                        console.log('Filters changed:', filters);
                        // TODO: Apply filters to task list
                    }}
                />

                {/* Center Panel - Task List */}
                <Box sx={{ flex: 1.2, display: 'flex', flexDirection: 'column', minWidth: 0, width: 400, }}>
                    <Box
                        sx={{
                            ...islandStyleNoBorder,
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
                                        gap: 1,
                                        p: 1,
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
                                p: 1,
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

                {/* Left Panel - Task Details / Document Preview */}
                <Box
                    sx={{
                        ...islandStyleNoBorder,
                        flex: 3,
                        flexShrink: 0,
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    {selectedTask ? (
                        selectedTask.taskType === 'document' && documentData ? (
                            // Document Preview for document type tasks
                            <DocumentPreview
                                document={documentData}
                                mode="read"
                                workflowActions={workflowActions}
                                onFullscreenClick={() => console.log('Fullscreen clicked')}
                                onHistoryClick={() => console.log('History clicked')}
                                onMoreActionsClick={() => console.log('More actions clicked')}
                                onSave={(updatedDoc) => {
                                    console.log('Document saved:', updatedDoc);
                                    // TODO: Handle document save
                                }}
                            />
                        ) : (
                            // Regular task details (placeholder for now)
                            <Box
                                sx={{
                                    p: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flex: 1,
                                }}
                            >
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="h6" gutterBottom>
                                        Task Details
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Task ID: {selectedTask.id}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Subject: {selectedTask.subject}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                                        Regular task details view coming soon
                                    </Typography>
                                </Box>
                            </Box>
                        )
                    ) : (
                        // No task selected
                        <Box
                            sx={{
                                p: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flex: 1,
                            }}
                        >
                            <Typography variant="body2" color="text.secondary">
                                Select a task to view details
                            </Typography>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box >
    );
};

export default TaskManagementApp;