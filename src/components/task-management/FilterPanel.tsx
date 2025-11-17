import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    InputAdornment,
    Tabs,
    Tab,
    List,
    ListItem,
    ListItemText,
    Button,
    IconButton,
    Chip,
    Divider,
} from '@mui/material';
import {
    MagnifyingGlass,
    Equals,
    FunnelSimple,
    FloppyDisk,
    X,
} from '@phosphor-icons/react';
import { islandStyleNoBorder } from '../../theme';

interface FilterPanelProps {
    onFiltersChange?: (filters: Record<string, any>) => void;
}

interface SavedSearch {
    id: string;
    name: string;
    filters: Record<string, any>;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ onFiltersChange }) => {
    const [searchValue, setSearchValue] = useState('');
    const [activeTab, setActiveTab] = useState<'search' | 'saved'>('search');
    const [savedSearches] = useState<SavedSearch[]>([
        { id: '1', name: 'Correspondence E-Service', filters: {} },
        { id: '2', name: 'Correspondence UAE', filters: {} },
        { id: '3', name: 'Correspondence In', filters: {} },
    ]);

    const [activeFilters, setActiveFilters] = useState<Record<string, any>>({
        type: null,
        workStatus: null,
        color: null,
        flowStatus: null,
        creationDate: null,
        country: null,
        updatedDate: null,
        myGroups: null,
    });

    const filterOptions = [
        { key: 'type', label: 'Type' },
        { key: 'workStatus', label: 'Work status' },
        { key: 'color', label: 'Color' },
        { key: 'flowStatus', label: 'Flow status' },
        { key: 'creationDate', label: 'Creation Date' },
        { key: 'country', label: 'Country' },
        { key: 'updatedDate', label: 'Updated Date' },
        { key: 'myGroups', label: 'My groups' },
    ];

    const hasActiveFilters = Object.values(activeFilters).some(v => v !== null);

    const handleResetFilters = () => {
        const resetFilters = Object.keys(activeFilters).reduce((acc, key) => {
            acc[key] = null;
            return acc;
        }, {} as Record<string, any>);
        setActiveFilters(resetFilters);
        onFiltersChange?.(resetFilters);
    };

    return (
        <Box
            sx={{
                ...islandStyleNoBorder,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={activeTab}
                    onChange={(_, value) => setActiveTab(value)}
                    variant="fullWidth"
                    sx={{
                        minHeight: 40,
                        '& .MuiTab-root': {
                            minHeight: 40,
                            fontSize: '0.875rem',
                            textTransform: 'none',
                        },
                    }}
                >
                    <Tab
                        icon={<Equals size={16} />}
                        iconPosition="start"
                        label="Saved Searches"
                        value="saved"
                    />
                    <Tab
                        icon={<MagnifyingGlass size={16} />}
                        iconPosition="start"
                        label="Search"
                        value="search"
                    />
                </Tabs>
            </Box>

            {/* Content */}
            <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
                {/* Search Input */}
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Search"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <MagnifyingGlass size={18} />
                            </InputAdornment>
                        ),
                    }}
                    sx={{ mb: 2 }}
                />

                {activeTab === 'search' && (
                    <>
                        {/* Filters Header */}
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                    Filters
                                </Typography>
                                {hasActiveFilters && (
                                    <Button
                                        size="small"
                                        color="error"
                                        onClick={handleResetFilters}
                                        sx={{ textTransform: 'none', fontSize: '0.75rem' }}
                                    >
                                        Reset (3)
                                    </Button>
                                )}
                            </Box>
                            <IconButton size="small">
                                <FunnelSimple size={16} />
                            </IconButton>
                        </Box>

                        {/* Active Filters Chips */}
                        {hasActiveFilters && (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                                {Object.entries(activeFilters)
                                    .filter(([_, value]) => value !== null)
                                    .map(([key, value]) => (
                                        <Chip
                                            key={key}
                                            label={`${filterOptions.find(f => f.key === key)?.label}: ${value}`}
                                            size="small"
                                            onDelete={() => {
                                                const newFilters = { ...activeFilters, [key]: null };
                                                setActiveFilters(newFilters);
                                                onFiltersChange?.(newFilters);
                                            }}
                                            sx={{ fontSize: '0.75rem' }}
                                        />
                                    ))}
                            </Box>
                        )}

                        {/* Filter List */}
                        <List disablePadding>
                            {filterOptions.map((filter, index) => (
                                <React.Fragment key={filter.key}>
                                    <ListItem
                                        sx={{
                                            py: 1,
                                            px: 0,
                                            '&:hover': {
                                                bgcolor: 'action.hover',
                                            },
                                        }}
                                    >
                                        <ListItemText
                                            primary={filter.label}
                                            primaryTypographyProps={{
                                                variant: 'body2',
                                                fontSize: '0.875rem',
                                            }}
                                        />
                                        <IconButton size="small">
                                            <Equals size={14} />
                                        </IconButton>
                                    </ListItem>
                                    {index < filterOptions.length - 1 && <Divider />}
                                </React.Fragment>
                            ))}
                        </List>

                        {/* Save Filters Button */}
                        <Box sx={{ mt: 3 }}>
                            <Button
                                fullWidth
                                variant="text"
                                startIcon={<FloppyDisk size={16} />}
                                sx={{
                                    textTransform: 'none',
                                    justifyContent: 'flex-start',
                                    color: 'primary.main',
                                }}
                            >
                                Save filters
                            </Button>
                        </Box>
                    </>
                )}

                {activeTab === 'saved' && (
                    <>
                        {savedSearches.length === 0 ? (
                            <Box sx={{ textAlign: 'center', py: 4 }}>
                                <Typography variant="body2" color="text.secondary">
                                    No saved searches yet
                                </Typography>
                            </Box>
                        ) : (
                            <List disablePadding>
                                {savedSearches.map((search, index) => (
                                    <React.Fragment key={search.id}>
                                        <ListItem
                                            sx={{
                                                py: 1.5,
                                                px: 0,
                                                '&:hover': {
                                                    bgcolor: 'action.hover',
                                                    '& .delete-button': {
                                                        opacity: 1,
                                                    },
                                                },
                                            }}
                                        >
                                            <ListItemText
                                                primary={search.name}
                                                primaryTypographyProps={{
                                                    variant: 'body2',
                                                    fontSize: '0.875rem',
                                                }}
                                            />
                                            <IconButton
                                                size="small"
                                                className="delete-button"
                                                sx={{
                                                    opacity: 0,
                                                    transition: 'opacity 0.2s',
                                                }}
                                            >
                                                <X size={14} />
                                            </IconButton>
                                        </ListItem>
                                        {index < savedSearches.length - 1 && <Divider />}
                                    </React.Fragment>
                                ))}
                            </List>
                        )}
                    </>
                )}
            </Box>
        </Box>
    );
};
