import React from 'react';
import {
    Box,
    Paper,
    TextField,
    Chip,
    InputAdornment,
} from '@mui/material';
import {
    FolderUser,
    FileArrowUp,
    FileArrowDown,
    PencilCircle,
} from '@phosphor-icons/react';
import type { DocumentData } from './DocumentPreview';

interface DocumentPreviewStaticPropertiesProps {
    document: DocumentData;
    mode?: 'read' | 'edit';
    onPropertyChange?: (propertyName: string, value: any) => void;
}

/**
 * DocumentPreviewStaticProperties - Displays read-only static document properties
 * Shows document metadata like dates, categories, teams, owner, and counters
 * 
 * Includes:
 * - Tags/categories chips
 * - Numeric fields (views, downloads, shares, version)
 * - Owner field
 * - Metadata fields
 */
export const DocumentPreviewStaticProperties: React.FC<DocumentPreviewStaticPropertiesProps> = ({
    document,
    mode = 'read',
    onPropertyChange: _onPropertyChange,
}) => {
    const getIcon = (type: 'tags' | 'categories' | 'owners' | 'versions') => {
        const iconProps = { size: 24, weight: 'regular' as const };
        switch (type) {
            case 'tags':
                return <FileArrowUp {...iconProps} />;
            case 'categories':
                return <FileArrowDown {...iconProps} />;
            case 'owners':
                return <PencilCircle {...iconProps} />;
            case 'versions':
                return <FolderUser {...iconProps} />;
            default:
                return null;
        }
    };

    const renderChipField = (
        label: string,
        values: string[],
        icon: React.ReactNode,
        fieldType: 'tags' | 'categories' | 'owners' | 'versions'
    ) => (
        <Box key={fieldType}>
            <TextField
                value=""
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start" sx={{ ml: 1, mr: 0 }}>
                            {icon}
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 0.5,
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                pr: 1,
                            }}
                        >
                            {values.map((value, idx) => (
                                <Chip
                                    key={`${fieldType}-${idx}`}
                                    label={value}
                                    size="small"
                                    variant="outlined"
                                    sx={{
                                        height: 24,
                                        fontSize: '0.8125rem',
                                    }}
                                />
                            ))}
                        </Box>
                    ),
                }}
                fullWidth
                variant="outlined"
                size="small"
                placeholder={label}
                disabled
                sx={{
                    '& .MuiOutlinedInput-root': {
                        minHeight: 40,
                        alignItems: 'center',
                    },
                    '& .MuiOutlinedInput-input': {
                        display: 'none',
                    },
                }}
            />
        </Box>
    );

    const renderTextField = (
        label: string,
        value: string,
        icon: React.ReactNode,
        fieldType: string
    ) => (
        <Box key={fieldType} sx={{ py: 1 }}>
            <TextField
                label={label}
                value={value}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start" sx={{ ml: 1 }}>
                            {icon}
                        </InputAdornment>
                    ),
                }}
                fullWidth
                variant="outlined"
                size="small"
                disabled={mode === 'read'}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        minHeight: 40,
                    },
                }}
            />
        </Box>
    );

    return (
        <Paper
            elevation={1}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                p: 2,
                borderRadius: 1,
                backgroundColor: 'background.surface_2',
                boxShadow: '0px 1px 2px 0px rgba(15, 15, 15, 0.12), 0px 1px 3px 1px rgba(15, 15, 15, 0.08)',
            }}
        >
            {/* Static Properties Section Header */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {/* Tags with counter chips */}
                {renderChipField(
                    'Tags',
                    ['Important', 'Important', 'Important', 'Important', 'Important', 'Important'],
                    getIcon('tags'),
                    'tags'
                )}

                {/* Categories with counter chips */}
                {renderChipField(
                    'Categories',
                    ['56743', '56743', '56743', '56743'],
                    getIcon('categories'),
                    'categories'
                )}

                {/* Teams/Owners with counter chips */}
                {renderChipField(
                    'Teams',
                    ['56743', '56743', '56743'],
                    getIcon('owners'),
                    'owners'
                )}

                {/* Versions with counter chip */}
                {renderChipField(
                    'Version',
                    ['00032'],
                    getIcon('versions'),
                    'versions'
                )}

                {/* Owner/Created By field */}
                {renderTextField(
                    'Owner',
                    document.owner?.name || 'Ali Muhammed',
                    <PencilCircle size={24} />,
                    'owner'
                )}
            </Box>

            {/* Metadata Summary */}
            {document.metadata && (
                <Box
                    sx={{
                        pt: 2,
                        borderTop: '1px solid',
                        borderColor: 'divider',
                        display: 'flex',
                        gap: 2,
                        fontSize: '0.875rem',
                        color: 'text.secondary',
                    }}
                >
                    {document.metadata.views !== undefined && (
                        <Box>
                            <strong>Views:</strong> {document.metadata.views}
                        </Box>
                    )}
                    {document.metadata.downloads !== undefined && (
                        <Box>
                            <strong>Downloads:</strong> {document.metadata.downloads}
                        </Box>
                    )}
                    {document.metadata.shares !== undefined && (
                        <Box>
                            <strong>Shares:</strong> {document.metadata.shares}
                        </Box>
                    )}
                    {document.metadata.version && (
                        <Box>
                            <strong>Version:</strong> {document.metadata.version}
                        </Box>
                    )}
                </Box>
            )}
        </Paper>
    );
};

export default DocumentPreviewStaticProperties;
