import React from 'react';
import {
    Box,
    Paper,
    TextField,
    Chip,
    Autocomplete,
    IconButton,
} from '@mui/material';
import {
    FolderUserIcon,
    FileArrowUpIcon,
    FileArrowDownIcon,
    PencilCircleIcon,
    Star,
    X,
    TagSimple,
} from '@phosphor-icons/react';
import type { DocumentData } from './DocumentPreview';
import { LabelChip } from './LabelChip';

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
    const getIcon = (type: 'tags' | 'categories' | 'owners' | 'versions' | 'creator') => {
        const iconProps = { size: 24, weight: 'regular' as const };
        switch (type) {
            case 'tags':
                return <TagSimple {...iconProps} />;
            case 'categories':
                return <FolderUserIcon {...iconProps} />;
            case 'owners':
                return <FileArrowUpIcon {...iconProps} />;
            case 'versions':
                return <FileArrowDownIcon {...iconProps} />;
            case 'creator':
                return <PencilCircleIcon {...iconProps} />;
            default:
                return null;
        }
    };

    // Reusable row layout used for each static property (icon + content)
    const StaticRow: React.FC<{
        label?: string;
        icon: React.ReactNode;
        children: React.ReactNode;
    }> = ({ icon, children }) => (
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, py: 0.5 }}>
            <Box sx={{ width: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</Box>
            <Box sx={{ flex: 1 }}>{children}</Box>
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
                {/* Tags - Label chips with badge indicators (no delete) */}
                <StaticRow label="Tags" icon={getIcon('tags')}>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {[
                            { label: 'Important', color: '#069520' },
                            { label: 'Occured in', color: '#ef6c00' },
                            { label: 'Location', color: '#f59c02' },
                            { label: 'Categories', color: '#2400ef' },
                        ].map((item, i) => (
                            <LabelChip
                                key={`tag-${i}`}
                                label={item.label}
                                color={item.color}
                                onDelete={
                                    mode === 'edit'
                                        ? () => {
                                            console.log('Delete tag:', item.label);
                                            _onPropertyChange?.('tags', item.label);
                                        }
                                        : undefined
                                }
                            />
                        ))}
                    </Box>
                </StaticRow>

                {/* Categories - Autocomplete with filled chips */}
                <StaticRow label="Categories" icon={getIcon('categories')}>
                    {mode === 'edit' ? (
                        <Autocomplete
                            multiple
                            options={[]}
                            freeSolo
                            value={["56743", "56743", "56743", "56743"]}
                            onChange={(_, newValue) => _onPropertyChange?.('categories', newValue)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    size="small"
                                    placeholder="Add category"
                                />
                            )}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip
                                        {...getTagProps({ index })}
                                        key={index}
                                        label={option}
                                        size="small"
                                        deleteIcon={<X size={16} />}
                                        sx={{
                                            bgcolor: '#e1e3e5',
                                            height: 24,
                                            fontSize: '0.8125rem',
                                        }}
                                    />
                                ))
                            }
                            sx={{ width: '100%' }}
                        />
                    ) : (
                        <Paper variant="outlined" sx={{ p: 0.5 }}>
                            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                {['56743', '56743', '56743', '56743'].map((v, i) => (
                                    <Chip key={`cat-${i}`} label={v} size="small" sx={{ bgcolor: '#e1e3e5' }} />
                                ))}
                            </Box>
                        </Paper>
                    )}
                </StaticRow>

                {/* Teams - Autocomplete with clickable chips (outlined with star icon) */}
                <StaticRow label="Teams" icon={getIcon('owners')}>
                    {mode === 'edit' ? (
                        <Autocomplete
                            multiple
                            options={[]}
                            freeSolo
                            value={["2344", "1245", "56743"]}
                            onChange={(_, newValue) => _onPropertyChange?.('teams', newValue)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    size="small"
                                    placeholder="Add team"
                                />
                            )}
                            renderTags={(value, getTagProps) =>
                                value.map((option, index) => (
                                    <Chip
                                        {...getTagProps({ index })}
                                        key={index}
                                        label={option}
                                        size="small"
                                        variant="outlined"
                                        deleteIcon={<X size={16} />}
                                        icon={<Star size={16} weight="fill" />}
                                        sx={{
                                            height: 24,
                                            fontSize: '0.8125rem',
                                            '& .MuiChip-icon': {
                                                marginLeft: '4px',
                                            },
                                        }}
                                    />
                                ))
                            }
                            sx={{ width: '100%' }}
                        />
                    ) : (
                        <Paper variant="outlined" sx={{ p: 0.5 }}>
                            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                                {['2344', '1245', '56743'].map((v, i) => (
                                    <Chip
                                        key={`team-${i}`}
                                        label={v}
                                        size="small"
                                        variant="outlined"
                                        icon={<Star size={16} weight="fill" />}
                                    />
                                ))}
                            </Box>
                        </Paper>
                    )}
                </StaticRow>

                {/* Version - Single document chip with star icon */}
                <StaticRow label="Version" icon={getIcon('versions')}>
                    <Box sx={{ display: 'flex', alignItems: 'center', py: 1 }}>
                        <Chip
                            label="00032"
                            size="small"
                            variant="outlined"
                            icon={<Star size={16} weight="fill" />}
                            sx={{
                                height: 24,
                                fontSize: '0.8125rem',
                            }}
                        />
                    </Box>
                </StaticRow>

                {/* Owner - Select dropdown with star button */}
                <StaticRow label="Owner" icon={getIcon('creator')}>
                    {mode === 'edit' ? (
                        <Autocomplete
                            options={['Ali Muhammed', 'Fatima Ahmed', 'Ahmed Hassan', 'Sara Ali']}
                            value={document.owner?.name || 'Ali Muhammed'}
                            onChange={(_, newValue) => _onPropertyChange?.('owner', newValue)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    size="small"
                                    InputProps={{
                                        ...params.InputProps,
                                        startAdornment: (
                                            <>
                                                <IconButton size="small" sx={{ ml: -0.5 }}>
                                                    <Star size={20} weight="fill" />
                                                </IconButton>
                                                {params.InputProps.startAdornment}
                                            </>
                                        ),
                                    }}
                                />
                            )}
                            sx={{ width: 220 }}
                        />
                    ) : (
                        <Box sx={{ py: 1 }}>
                            <TextField
                                value={document.owner?.name || 'Ali Muhammed'}
                                variant="outlined"
                                size="small"
                                disabled
                                fullWidth
                                sx={{ maxWidth: 220 }}
                            />
                        </Box>
                    )}
                </StaticRow>
            </Box>


        </Paper>
    );
};

export default DocumentPreviewStaticProperties;
