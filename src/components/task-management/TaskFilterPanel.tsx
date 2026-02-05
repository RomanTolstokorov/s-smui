import React, { useState, useMemo } from 'react';
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
    Divider,
} from '@mui/material';
import {
    MagnifyingGlass,
    X,
    Pencil,
    PlusIcon,
} from '@phosphor-icons/react';
import { islandStyleNoBorder } from '../../theme';
import { useSavedSearches } from '../../hooks';
import { SaveSearchDialog } from './SaveSearchDialog';
import { AppFilterInput } from './AppFilterInput';
import type { TaskFilterDefinition, SavedSearch } from '../../mocks/taskFilterData';

interface TaskFilterPanelProps {
    filterDefinitions: TaskFilterDefinition[];
    initialSavedSearches?: SavedSearch[];
    onFiltersChange?: (filters: Record<string, string | string[]>) => void;
}

export const TaskFilterPanel: React.FC<TaskFilterPanelProps> = ({
    filterDefinitions,
    initialSavedSearches = [],
    onFiltersChange,
}) => {
    const [searchValue, setSearchValue] = useState('');
    const [activeTab, setActiveTab] = useState<'search' | 'saved'>('search');
    const [activeFilters, setActiveFilters] = useState<Record<string, string | string[]>>({});

    // Operator state: track equals (true) vs not-equals (false) for each filter
    const [filterOperators, setFilterOperators] = useState<Record<string, boolean>>({});

    // Dialog state
    const [saveDialogOpen, setSaveDialogOpen] = useState(false);
    const [renameDialogOpen, setRenameDialogOpen] = useState(false);
    const [renamingSearchId, setRenamingSearchId] = useState<string | null>(null);

    const {
        savedSearches,
        saveSearch,
        loadSearch,
        deleteSearch,
        renameSearch,
    } = useSavedSearches(initialSavedSearches);

    // Filter the filter definitions based on search
    const filteredDefinitions = useMemo(() => {
        if (!searchValue) return filterDefinitions;
        const lowerSearch = searchValue.toLowerCase();
        return filterDefinitions.filter(def =>
            def.name.toLowerCase().includes(lowerSearch)
        );
    }, [filterDefinitions, searchValue]);

    const hasActiveFilters = Object.keys(activeFilters).length > 0;

    const handleFilterChange = (filterId: string, value: string | string[] | null) => {
        if (value === null || (Array.isArray(value) && value.length === 0)) {
            // Remove filter if value is null or empty array
            const newFilters = { ...activeFilters };
            delete newFilters[filterId];
            setActiveFilters(newFilters);
            onFiltersChange?.(newFilters);
        } else {
            // Update filter
            const newFilters = { ...activeFilters, [filterId]: value };
            setActiveFilters(newFilters);
            onFiltersChange?.(newFilters);
        }
    };

    const handleOperatorToggle = (filterId: string) => {
        setFilterOperators(prev => ({
            ...prev,
            [filterId]: !prev[filterId],
        }));
    };

    const convertFilterValueToOptions = (filter: TaskFilterDefinition, value: string | string[]): any => {
        if (Array.isArray(value)) {
            return filter.options.filter(opt => value.includes(String(opt.value)));
        }
        return filter.options.find(opt => opt.value === value) || null;
    };

    const handleSaveSearch = (name: string) => {
        saveSearch(name, activeFilters);
    };

    const handleLoadSearch = (searchId: string) => {
        const search = loadSearch(searchId);
        if (search) {
            setActiveFilters(search.filters);
            onFiltersChange?.(search.filters);
            setActiveTab('search'); // Switch to search tab to show loaded filters
        }
    };

    const handleDeleteSearch = (searchId: string) => {
        deleteSearch(searchId);
    };

    const handleRenameClick = (searchId: string) => {
        setRenamingSearchId(searchId);
        setRenameDialogOpen(true);
    };

    const handleRenameSearch = (newName: string) => {
        if (renamingSearchId) {
            renameSearch(renamingSearchId, newName);
        }
    };

    return (
        <Box
            sx={{
                ...islandStyleNoBorder,
                height: '100%',
                width: 320,
                minWidth: 280,
                maxWidth: 400,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {/* Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={activeTab}
                    onChange={(_, value) => setActiveTab(value)}
                >
                    <Tab
                        label="Search"
                        value="search"
                    />
                    <Tab
                        label="Saved Searches"
                        value="saved"
                    />
                </Tabs>
            </Box>

            {/* Content */}
            <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
                {/* Search Input */}
                <TextField
                    fullWidth
                    size="small"
                    placeholder=""
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <MagnifyingGlass size={18} />
                            </InputAdornment>
                        ),
                        endAdornment: !searchValue && (
                            <InputAdornment position="end">
                                <Typography variant="body2" sx={{ color: 'text.disabled', fontSize: '0.875rem' }}>
                                    Search
                                </Typography>
                            </InputAdornment>
                        ),
                    }}
                    sx={{ mb: 1 }}
                />

                {activeTab === 'search' && (
                    <>
                        {/* Add More and Filters Header */}
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="subtitle2">
                                Filters
                            </Typography>
                            <Button
                                size="small"
                                startIcon={<PlusIcon />}
                            >
                                More
                            </Button>
                        </Box>

                        {/* Filter List - Dropdown Style Buttons */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {filteredDefinitions
                                .filter(filter => {
                                    // Don't show filters that are linked children of other filters
                                    const isLinkedChild = filterDefinitions.some(f => f.linkedFilterId === filter.id);
                                    return !isLinkedChild;
                                })
                                .map((filter) => {
                                    const filterValue = activeFilters[filter.id];
                                    const isEquals = filterOperators[filter.id] !== false; // Default to true (equals)

                                    // Check if this filter has a linked child filter
                                    const linkedFilter = filter.linkedFilterId
                                        ? filterDefinitions.find(f => f.id === filter.linkedFilterId)
                                        : null;
                                    const showLinkedFilter = Boolean(linkedFilter && filterValue !== undefined);
                                    const linkedFilterValue = linkedFilter ? activeFilters[linkedFilter.id] : undefined;
                                    const linkedIsEquals = linkedFilter ? (filterOperators[linkedFilter.id] !== false) : true;

                                    // If filter has a linked child, render both
                                    if (linkedFilter) {
                                        return (
                                            <Box key={filter.id} sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                                {/* Parent Filter */}
                                                <AppFilterInput
                                                    name={filter.name}
                                                    valueType={filter.type}
                                                    options={filter.options}
                                                    value={filterValue ? convertFilterValueToOptions(filter, filterValue) : null}
                                                    onValueChange={(value) => {
                                                        if (value === null || (Array.isArray(value) && value.length === 0)) {
                                                            handleFilterChange(filter.id, null);
                                                        } else if (Array.isArray(value)) {
                                                            handleFilterChange(filter.id, value.map(v => String(v.value)));
                                                        } else {
                                                            handleFilterChange(filter.id, String(value.value));
                                                        }
                                                    }}
                                                    isEquals={isEquals}
                                                    onOperatorToggle={() => handleOperatorToggle(filter.id)}
                                                />

                                                {/* Linked Child Filter */}
                                                {showLinkedFilter && (
                                                    <Box sx={{ ml: 1 }}>
                                                        <AppFilterInput
                                                            name={linkedFilter.name}
                                                            valueType={linkedFilter.type}
                                                            options={linkedFilter.options}
                                                            value={linkedFilterValue ? convertFilterValueToOptions(linkedFilter, linkedFilterValue) : null}
                                                            onValueChange={(value) => {
                                                                if (value === null || (Array.isArray(value) && value.length === 0)) {
                                                                    handleFilterChange(linkedFilter.id, null);
                                                                } else if (Array.isArray(value)) {
                                                                    handleFilterChange(linkedFilter.id, value.map(v => String(v.value)));
                                                                } else {
                                                                    handleFilterChange(linkedFilter.id, String(value.value));
                                                                }
                                                            }}
                                                            isEquals={linkedIsEquals}
                                                            onOperatorToggle={() => handleOperatorToggle(linkedFilter.id)}
                                                        />
                                                    </Box>
                                                )}
                                            </Box>
                                        );
                                    }

                                    // Regular filter without linked child
                                    return (
                                        <AppFilterInput
                                            key={filter.id}
                                            name={filter.name}
                                            valueType={filter.type}
                                            options={filter.options}
                                            value={filterValue ? convertFilterValueToOptions(filter, filterValue) : null}
                                            onValueChange={(value) => {
                                                if (value === null || (Array.isArray(value) && value.length === 0)) {
                                                    handleFilterChange(filter.id, null);
                                                } else if (Array.isArray(value)) {
                                                    handleFilterChange(filter.id, value.map(v => String(v.value)));
                                                } else {
                                                    handleFilterChange(filter.id, String(value.value));
                                                }
                                            }}
                                            isEquals={isEquals}
                                            onOperatorToggle={() => handleOperatorToggle(filter.id)}
                                        />
                                    );
                                })}
                        </Box>

                        {/* Save Filters Button */}
                        <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                variant="text"
                                onClick={() => setSaveDialogOpen(true)}
                                disabled={!hasActiveFilters}
                                sx={{
                                    textTransform: 'none',
                                    color: 'primary.main',
                                    fontSize: '0.875rem',
                                    fontWeight: 500,
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
                                            onClick={() => handleLoadSearch(search.id)}
                                            sx={{
                                                py: 1.5,
                                                px: 0,
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    bgcolor: 'action.hover',
                                                    '& .action-buttons': {
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
                                            <Box
                                                className="action-buttons"
                                                sx={{
                                                    display: 'flex',
                                                    gap: 0.5,
                                                    opacity: 0,
                                                    transition: 'opacity 0.2s',
                                                }}
                                            >
                                                <IconButton
                                                    size="small"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleRenameClick(search.id);
                                                    }}
                                                >
                                                    <Pencil size={14} />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteSearch(search.id);
                                                    }}
                                                >
                                                    <X size={14} />
                                                </IconButton>
                                            </Box>
                                        </ListItem>
                                        {index < savedSearches.length - 1 && <Divider />}
                                    </React.Fragment>
                                ))}
                            </List>
                        )}
                    </>
                )}
            </Box>

            {/* Save Search Dialog */}
            <SaveSearchDialog
                open={saveDialogOpen}
                onClose={() => setSaveDialogOpen(false)}
                onSave={handleSaveSearch}
                title="Save Search"
            />

            {/* Rename Search Dialog */}
            <SaveSearchDialog
                open={renameDialogOpen}
                onClose={() => {
                    setRenameDialogOpen(false);
                    setRenamingSearchId(null);
                }}
                onSave={handleRenameSearch}
                title="Rename Search"
                initialValue={
                    renamingSearchId
                        ? savedSearches.find(s => s.id === renamingSearchId)?.name || ''
                        : ''
                }
                saveButtonLabel="Rename"
            />
        </Box>
    );
};
