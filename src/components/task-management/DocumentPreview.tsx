import React, { useState } from 'react';
import {
    Box,
    Tabs,
    Tab,
    Typography,
} from '@mui/material';

import { PreviewToolbar } from './PreviewToolbar';
import type { WorkflowAction } from './PreviewToolbar';
import { DocumentPreviewSubjectSection } from './DocumentPreviewSubjectSection';
import { DocumentPreviewStaticProperties } from './DocumentPreviewStaticProperties';
import { DocumentPreviewExtraSection } from './DocumentPreviewExtraSection';
import { DocumentPreviewBody } from './DocumentPreviewBody';

/**
 * Document data structure for document-type tasks
 */
export interface DocumentData {
    id: string;
    subject: string;
    tags: string[];
    categories: string[];
    status?: 'draft' | 'published' | 'archived';
    priority?: 'low' | 'medium' | 'high' | 'critical';
    owner?: {
        name: string;
        avatar?: string;
    };
    createdDate?: string;
    updatedDate?: string;
    summary?: string;
    content?: string;
    documentTypeIcon?: React.ReactNode;
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
}

export interface DocumentPreviewProps {
    document: DocumentData;
    mode?: 'read' | 'edit';
    onModeChange?: (mode: 'read' | 'edit') => void;
    onSave?: (updatedDocument: DocumentData) => void;
    /**
     * Workflow actions for the toolbar (e.g., Start, Done, Move to, Assign to)
     * These actions depend on the task flow state
     */
    workflowActions?: WorkflowAction[];
    /**
     * Toolbar action handlers
     */
    onFullscreenClick?: () => void;
    onHistoryClick?: () => void;
    onMoreActionsClick?: () => void;
}

type TabValue = 'comments' | 'keywords' | 'tasks' | 'attachments' | 'entities' | 'reply' | 'document';

interface TabConfig {
    id: TabValue;
    label: string;
}

const TAB_CONFIGS: TabConfig[] = [
    { id: 'document', label: 'Document' },
    { id: 'reply', label: 'Reply' },
    { id: 'tasks', label: 'Tasks' },
    { id: 'attachments', label: 'Attachments' },
    { id: 'entities', label: 'Entities' },
    { id: 'comments', label: 'Comments' },
    { id: 'keywords', label: 'Keywords' },
];

/**
 * DocumentPreview - Main component for displaying document preview
 * Combines multiple sub-components for different sections of the document
 * 
 * This is a complex preview form with the following parts:
 * 1. Subject Section - Title and primary metadata
 * 2. Static Properties - Read-only document properties
 * 3. Extra Section - Collapsible accordion with additional details
 * 4. Document Body - Main content with rich formatting
 */
export const DocumentPreview: React.FC<DocumentPreviewProps> = ({
    document,
    mode = 'read',
    onModeChange: _onModeChange,
    onSave: _onSave,
    workflowActions = [],
    onFullscreenClick,
    onHistoryClick,
    onMoreActionsClick,
}) => {
    const [activeTab, setActiveTab] = useState<TabValue>('document');

    const handleTabChange = (_event: React.SyntheticEvent, newValue: TabValue) => {
        setActiveTab(newValue);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
            }}
        >
            {/* Preview Toolbar */}
            <PreviewToolbar
                workflowActions={workflowActions}
                onFullscreenClick={onFullscreenClick}
                onHistoryClick={onHistoryClick}
                onMoreActionsClick={onMoreActionsClick}
            />

            {/* Subject Section */}
            <DocumentPreviewSubjectSection
                subject={document.subject}
                authorOrgUnit={document.owner?.name}
                submissionDate={document.createdDate}
                resolutionStatus={document.status}
                documentId={document.id}
                documentTypeIcon={document.documentTypeIcon}
                authorAvatar={document.owner?.avatar}
                mode={mode}
            />

            {/* Tabs Navigation */}

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-end',
                        width: '100%',

                        '& .MuiTabs-indicator': {
                            bottom: 0,
                        },
                    }}
                >
                    {TAB_CONFIGS.map((tab) => (
                        <Tab
                            key={tab.id}
                            value={tab.id}
                            label={tab.label}
                        /* sx={{
                            display: 'flex',
                            minHeight: 40,
                        }} */
                        />
                    ))}
                </Tabs>
            </Box>


            {/* Content Area */}
            <Box
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    p: 2,
                    overflow: 'auto',
                }}
            >
                {/* Show Document Content when "Document" tab is active */}
                {activeTab === 'document' && (
                    <>
                        {/* Static Properties */}
                        <DocumentPreviewStaticProperties
                            document={document}
                            mode={mode}
                        />

                        {/* Extra Sections (Accordion) */}
                        {document.extraSections && document.extraSections.length > 0 && (
                            <DocumentPreviewExtraSection
                                sections={document.extraSections}
                                mode={mode}
                            />
                        )}

                        {/* Document Body */}
                        <DocumentPreviewBody
                            content={document.content}
                            summary={document.summary}
                            mode={mode}
                        />
                    </>
                )}

                {/* Placeholder for other tabs */}
                {activeTab !== 'document' && (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="body2" color="text.secondary">
                            {TAB_CONFIGS.find((t) => t.id === activeTab)?.label} content will be displayed here
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default DocumentPreview;
