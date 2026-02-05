import React from 'react';
import {
    Box,
    Typography,
    Avatar,
    Chip,
    Tooltip,
} from '@mui/material';
import { useNotification } from '../../contexts';

interface DocumentPreviewSubjectSectionProps {
    subject: string;
    // Metadata
    authorOrgUnit?: string;
    submissionDate?: string;
    resolutionStatus?: string;
    documentId?: string;
    documentTypeIcon?: React.ReactNode;
    authorAvatar?: string;
    tags?: string[];
    categories?: string[];
    mode?: 'read' | 'edit';
    onSubjectChange?: (subject: string) => void;
    onTagsChange?: (tags: string[]) => void;
    onCategoriesChange?: (categories: string[]) => void;
}

/**
 * DocumentPreviewSubjectSection - Subject header with metadata
 * Displays the document subject/title with author info, date, status, and document ID
 * 
 * Layout:
 * - Top row: [Avatar + Org Unit + Date] on left, [Status Chip + Document ID + Type Icon] on right
 * - Bottom row: Subject text
 */
export const DocumentPreviewSubjectSection: React.FC<DocumentPreviewSubjectSectionProps> = ({
    subject,
    authorOrgUnit,
    submissionDate,
    resolutionStatus,
    documentId,
    documentTypeIcon,
    authorAvatar,
}) => {
    const { showNotification } = useNotification();
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                px: 2,
                py: 1.5,
            }}
        >
            {/* Top Row - Metadata */}
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                {/* Right Section - Status and ID */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                    }}
                >

                    {/* Document ID and Type Icon */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                        }}
                    >
                        {documentTypeIcon && (
                            <Tooltip title="Document type">
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        width: 24,
                                        height: 24,
                                    }}
                                >
                                    {documentTypeIcon}
                                </Box>
                            </Tooltip>
                        )}

                        <Tooltip title="Click to copy ID to clipboard">
                            <Typography
                                variant="caption"
                                sx={{
                                    color: 'text.secondary',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        color: 'text.primary',
                                        textDecoration: 'underline',
                                    },
                                }}
                                onClick={() => {
                                    if (documentId) {
                                        navigator.clipboard.writeText(documentId);
                                        showNotification('Document ID copied to clipboard', 'success');
                                    }
                                }}
                            >
                                {documentId}
                            </Typography>
                        </Tooltip>
                    </Box>

                    {/* Resolution Status Chip */}
                    {resolutionStatus && (
                        <Chip
                            label={resolutionStatus}
                            size="small"
                            sx={{
                                height: 24,
                                minHeight: 24,
                                maxHeight: 24,
                                backgroundColor: 'components.chip.work_status.toDoFill',
                                borderRadius: 'var(--cornerRadius-10, 1000px)',
                                '& .MuiChip-label': {
                                    px: 1.5,
                                    py: '3px',
                                    fontSize: '0.8125rem',
                                    lineHeight: '18px',
                                    letterSpacing: '0.16px',
                                },
                            }}
                        />
                    )}
                </Box>

                {/* Left Section - Author Info */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        direction: 'rtl'
                    }}
                >
                    {/* Avatar */}
                    <Tooltip title="Author">
                        <Avatar
                            src={authorAvatar}
                            sx={{
                                width: 24,
                                height: 24,
                            }}
                        />
                    </Tooltip>

                    {/* Org Unit and Date */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '2px',
                        }}
                    >
                        <Tooltip title="Author organization unit">
                            <Typography
                                variant="caption"
                                sx={{
                                    color: 'text.secondary',
                                    fontSize: '0.75rem',
                                }}
                            >
                                {authorOrgUnit}
                            </Typography>
                        </Tooltip>
                        <Typography
                            variant="caption"
                            sx={{
                                color: 'text.primary',
                            }}>
                            ,
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{
                                color: 'text.secondary',
                            }}
                        >
                            {submissionDate}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* Bottom Row - Subject */}
            <Typography
                variant="h6"
            >
                {subject}
            </Typography>
        </Box>
    );
};
export default DocumentPreviewSubjectSection;
