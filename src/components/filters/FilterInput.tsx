import React, { useState, type ReactNode } from 'react';
import {
    Box,
    IconButton,
    MenuItem,
    TextField,
    ListItemText,
    ListItemIcon,
    Paper,
    Tooltip,
    Typography,
} from '@mui/material';
import {
    TrashIcon,
    EyeSlashIcon
} from '@phosphor-icons/react';
import type { ActiveFilter, FilterDefinition, DateRangeValue, OperatorType } from './types';
import { getFilterDefinition } from './filterConfigService';
import { FilterSelect, type OptionType } from './FilterSelect';
import { FilterAutocompleteV2 } from './FilterAutocompleteV2';
import { MultiTextInput } from './MultiTextInput';
import { DateRangeInput } from './DateRangeInput';
import { getOperatorIcon } from './operatorIcons';

interface FilterInputProps {
    filter: ActiveFilter;
    availableFilters: FilterDefinition[];
    onChange: (filter: ActiveFilter) => void;
    onDelete: () => void;
    onToggleEnabled: () => void;
    onFilterTypeChange?: (oldFilterId: string, newFilterId: string) => void;
    isLinked?: boolean;
    isLinkedEnabled?: boolean;
}

type OperatorOption = {
    value: OperatorType;
    label: string;
    icon?: ReactNode;
};

export const FilterInput: React.FC<FilterInputProps> = ({
    filter,
    availableFilters,
    onChange,
    onDelete,
    onToggleEnabled,
    onFilterTypeChange,
    isLinked = false,
    isLinkedEnabled = true,
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isToggleVisible, setIsToggleVisible] = useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const filterDef = filter.filterId ? getFilterDefinition(filter.filterId) : null;
    const isEmptyFilter = !filter.filterId;
    const isOperatorDisabled = !filter.enabled || !isLinkedEnabled || isEmptyFilter;

    // Get available operator options for the dropdown
    const operatorOptions: OperatorOption[] = React.useMemo(() => {
        if (!filterDef) return [];
        return filterDef.operators.map(op => ({
            value: op.value,
            label: op.label,
            icon: getOperatorIcon(op.value, false)
        }));
    }, [filterDef]);

    // Determine which operator value to use (without icon rendering logic)
    const selectedOperator: OperatorOption | null = React.useMemo(() => {
        // Case 1: No filter type selected - show default operator (equal)
        if (isEmptyFilter) {
            return {
                value: 'equals' as OperatorType,
                label: 'Equals'
            };
        }

        // Case 2: Filter type selected
        if (filterDef) {
            const operatorValue = filter.operator || filterDef.operators[0].value;
            const operatorLabel = filterDef.operators.find(op => op.value === operatorValue)?.label || '';

            return {
                value: operatorValue,
                label: operatorLabel
            };
        }

        return null;
    }, [filterDef, filter.operator, isEmptyFilter]);    // Handle mouse leave with check for active Select menu
    const handleMouseLeave = () => {
        // Check if any Select menu is open by looking for open MUI menu
        const hasOpenMenu = document.querySelector('.MuiMenu-root');
        if (!hasOpenMenu) {
            setIsHovered(false);
        }
    };

    // Reset hover when Select menus close
    React.useEffect(() => {
        const handleMenuClose = () => {
            if (containerRef.current && !containerRef.current.matches(':hover')) {
                setIsHovered(false);
            }
        };

        // Listen for menu close events
        document.addEventListener('click', handleMenuClose);
        return () => document.removeEventListener('click', handleMenuClose);
    }, []);

    // Handle filter type change
    const handleFilterTypeChange = (newValue: FilterDefinition | null) => {
        if (!newValue) return;

        const newFilterDef = newValue;
        const defaultOperator = newFilterDef.operators[0];
        let defaultValue: string | string[] | boolean | number | DateRangeValue = '';

        // Set appropriate default value based on value type
        switch (newFilterDef.valueType) {
            case 'multi-select':
            case 'multi-text':
                defaultValue = [];
                break;
            case 'boolean':
                defaultValue = false;
                break;
            case 'numeric':
                defaultValue = 0;
                break;
            case 'date-range':
                defaultValue = { from: null, to: null };
                break;
            default:
                defaultValue = '';
        }

        const updatedFilter: ActiveFilter = {
            ...filter,
            filterId: newFilterDef.id,
            operator: defaultOperator.value,
            value: defaultValue,
            valueLogicOperator: (newFilterDef.valueType === 'multi-select' || newFilterDef.valueType === 'multi-text')
                ? 'and'
                : undefined,
        };

        if (onFilterTypeChange) {
            const oldFilterId = filter.filterId || '';
            onFilterTypeChange(oldFilterId, newFilterDef.id);
        }

        onChange(updatedFilter);
    };

    // Handle value change
    const handleTextValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange({
            ...filter,
            value: event.target.value,
        });
    };

    // Handle toggle button visibility
    const handleToggleClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsToggleVisible(!isToggleVisible);
        onToggleEnabled();
    };

    return (
        <Box
            ref={containerRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                width: '100%',
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    opacity: (filter.enabled && isLinkedEnabled) ? 1 : 0.5,
                    transition: 'all 0.2s',
                    overflow: 'hidden',
                    boxShadow: '0px 1px 2px 0px rgba(65, 50, 42, 0.08)',
                    '&:hover': {
                        borderColor: 'primary.light',
                    },
                    '&:focus-within': {
                        borderColor: 'primary.main',
                    },
                }}
            >
                {/* Filter Name Row */}
                {isLinked ? (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            px: 1,
                            py: 2,
                        }}
                    >
                        <Typography variant="body1" color={isEmptyFilter ? 'text.disabled' : 'text.primary'}>
                            {isEmptyFilter ? 'Select filter type' : filterDef?.name}
                        </Typography>
                    </Box>
                ) : (
                    <FilterSelect
                        value={
                            availableFilters.find(f => f.id === filter.filterId)
                                ? {
                                    value: filter.filterId || '',
                                    label: availableFilters.find(f => f.id === filter.filterId)?.name || '',
                                }
                                : null
                        }
                        onChange={(newValue) => {
                            if (!newValue) {
                                // Reset filter to empty state when cleared
                                onChange({
                                    ...filter,
                                    filterId: '',
                                    operator: undefined,
                                    value: '',
                                    valueLogicOperator: undefined,
                                });
                                return;
                            }
                            const filterDef = availableFilters.find(f => f.id === newValue.value);
                            handleFilterTypeChange(filterDef || null);
                        }}
                        options={
                            availableFilters.map((f) => ({
                                value: f.id,
                                label: f.name,
                            }))
                        }
                        disabled={!filter.enabled || !isLinkedEnabled}
                        placeholder={isEmptyFilter ? 'Select filter type' : ''}
                        searchable={true}
                        variant="borderless"
                    />
                )}

                {/* Divider */}
                <Box sx={{ height: '1px', bgcolor: 'divider' }} />

                {/* Value and Operator Row */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'stretch',
                        height: 40,
                    }}
                >
                    {/* Operator Section */}
                    <FilterSelect<OperatorOption>
                        value={selectedOperator}
                        onChange={(newValue) => {
                            if (!newValue) return;
                            onChange({
                                ...filter,
                                operator: newValue.value as any,
                            });
                        }}
                        options={operatorOptions}
                        disabled={isOperatorDisabled}
                        clearable={false}
                        variant='borderless'
                        slots={{
                            renderValue: (option) => {
                                // Render responsibility: Determine icon state based on component state
                                const iconDisabled = isOperatorDisabled;
                                const operatorIcon = getOperatorIcon(option.value, iconDisabled);

                                return (
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        {operatorIcon}
                                    </Box>
                                );
                            },
                            renderOption: (props, option, renderState) => (
                                <MenuItem
                                    {...props}
                                    key={String(option.value)}
                                    selected={renderState.selected}
                                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                                >
                                    <ListItemIcon>
                                        {option.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={option.label} />
                                </MenuItem>
                            ),
                        }}
                        parts={{
                            root: { style: { minWidth: 60, maxWidth: 80 } },
                            popper: {
                                style: { minWidth: 200 },
                                placement: 'bottom-end'
                            }
                        }}
                    />

                    {/* Vertical Divider */}
                    <Box sx={{ width: '1px', bgcolor: 'divider' }} />

                    {/* Value Section */}
                    {isEmptyFilter ? (
                        <Box
                            sx={{
                                flex: 2,
                                display: 'flex',
                                alignItems: 'center',
                                px: 2,
                                py: 1,
                                color: 'text.disabled',
                                fontStyle: 'italic',
                            }}
                        >
                            <Typography variant="body1" sx={{ color: 'text.disabled' }}>
                                Value
                            </Typography>
                        </Box>
                    ) : filterDef?.valueType === 'text' ? (
                        <Box
                            sx={{
                                flex: 1.6,
                                display: 'flex',
                                alignItems: 'center',
                                px: 2,
                                py: 1,
                                '&:hover': filter.enabled ? {
                                    bgcolor: 'action.hover',
                                } : {},
                            }}
                        >
                            <TextField
                                fullWidth
                                size="small"
                                variant="standard"
                                placeholder={filterDef.placeholder || 'Enter value...'}
                                value={filter.value as string}
                                onChange={handleTextValueChange}
                                disabled={!filter.enabled || !isLinkedEnabled}
                                autoComplete="off"
                                slotProps={{
                                    input: {
                                        disableUnderline: true,
                                    },
                                }}
                            />
                        </Box>
                    ) : filterDef?.valueType === 'multi-text' ? (
                        <MultiTextInput
                            values={Array.isArray(filter.value) ? filter.value : []}
                            logicOperator={filter.valueLogicOperator || 'and'}
                            placeholder={filterDef.placeholder || 'Enter value...'}
                            disabled={!filter.enabled || !isLinkedEnabled}
                            sx={{ flex: 1.6 }}
                            onChange={(values) => {
                                onChange({
                                    ...filter,
                                    value: values,
                                });
                            }}
                            onLogicOperatorChange={(operator) => {
                                onChange({
                                    ...filter,
                                    valueLogicOperator: operator,
                                });
                            }}
                        />
                    ) : filterDef?.valueType === 'numeric' ? (
                        <Box
                            sx={{
                                flex: 1.6,
                                display: 'flex',
                                alignItems: 'center',
                                px: 2,
                                py: 1,
                                '&:hover': filter.enabled ? {
                                    bgcolor: 'action.hover',
                                } : {},
                            }}
                        >
                            <TextField
                                fullWidth
                                size="small"
                                variant="standard"
                                type="number"
                                placeholder={filterDef.placeholder || 'Enter number...'}
                                value={typeof filter.value === 'number' ? filter.value : ''}
                                onChange={(e) => {
                                    const numValue = parseFloat(e.target.value);
                                    onChange({
                                        ...filter,
                                        value: isNaN(numValue) ? 0 : numValue,
                                    });
                                }}
                                disabled={!filter.enabled || !isLinkedEnabled}
                                autoComplete="off"
                                slotProps={{
                                    input: {
                                        disableUnderline: true,
                                        inputProps: {
                                            min: filterDef.min,
                                            max: filterDef.max,
                                            step: filterDef.step,
                                        },
                                    },
                                }}
                            />
                        </Box>
                    ) : filterDef?.valueType === 'boolean' ? (
                        <FilterSelect<OptionType>
                            value={{
                                value: typeof filter.value === 'boolean' ? (filter.value ? 'true' : 'false') : 'false',
                                label: typeof filter.value === 'boolean' ? (filter.value ? 'True' : 'False') : 'False',
                            }}
                            onChange={(newValue) => {
                                onChange({
                                    ...filter,
                                    value: newValue?.value === 'true',
                                });
                            }}
                            options={[
                                { value: 'true', label: 'True' },
                                { value: 'false', label: 'False' },
                            ]}
                            disabled={!filter.enabled || !isLinkedEnabled}
                            clearable={false}
                            sx={{ flex: 1.6 }}
                        />
                    ) : filterDef?.valueType === 'date-range' ? (
                        <DateRangeInput
                            value={
                                filter.value &&
                                    typeof filter.value === 'object' &&
                                    'from' in filter.value &&
                                    'to' in filter.value
                                    ? filter.value as DateRangeValue
                                    : { from: null, to: null }
                            }
                            placeholder={filterDef.placeholder}
                            minDate={filterDef.minDate}
                            maxDate={filterDef.maxDate}
                            onChange={(value) => {
                                onChange({
                                    ...filter,
                                    value,
                                });
                            }}
                        />
                    ) : filterDef?.valueType === 'single-select' ? (
                        <FilterSelect<OptionType>
                            value={
                                filterDef?.options?.find(opt => opt.id === filter.value)
                                    ? {
                                        value: filter.value as string,
                                        label: filterDef.options.find(opt => opt.id === filter.value)?.label || '',
                                    }
                                    : null
                            }
                            onChange={(newValue) => {
                                onChange({
                                    ...filter,
                                    value: newValue?.value || '',
                                });
                            }}
                            options={
                                filterDef?.options?.map((option) => ({
                                    value: option.id,
                                    label: option.label,
                                })) || []
                            }
                            disabled={!filter.enabled || !isLinkedEnabled}
                            placeholder="Select..."
                            searchable={false}
                            sx={{ flex: 1.6 }}
                        />
                    ) : filterDef?.valueType === 'multi-select' ? (
                        <FilterAutocompleteV2
                            multiple
                            disableCloseOnSelect
                            value={filterDef.options?.filter(opt =>
                                Array.isArray(filter.value) && filter.value.includes(opt.id)
                            ) || []}
                            onChange={(_, newValue) => {
                                const selectedIds = Array.isArray(newValue)
                                    ? newValue.map((opt: any) => opt.id)
                                    : [];
                                onChange({
                                    ...filter,
                                    value: selectedIds,
                                });
                            }}
                            options={filterDef.options || []}
                            getOptionLabel={(option: any) => option.label}
                            disabled={!filter.enabled || !isLinkedEnabled}
                            placeholder="Select..."
                            limitTags={1}
                            showLogicSelector={true}
                            logicOperator={filter.valueLogicOperator || 'and'}
                            onLogicOperatorChange={(operator) => {
                                onChange({
                                    ...filter,
                                    valueLogicOperator: operator,
                                });
                            }}
                            sx={{ flex: 1.6 }}
                        />
                    ) : null}
                </Box>
            </Paper>

            {/* Actions */}
            {
                !isLinked && (
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 1,
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <Tooltip title={filter.enabled ? 'Disable filter' : 'Enable filter'} placement='left'>
                            <IconButton
                                size="small"
                                onClick={handleToggleClick}
                                sx={{
                                    opacity: isHovered || isToggleVisible ? 1 : 0,
                                    transition: 'opacity 0.2s ease',
                                    color: isToggleVisible ? 'primary.main' : 'inherit',
                                }}
                            >
                                <EyeSlashIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete filter" placement='left'>
                            <IconButton
                                size="small"
                                onClick={onDelete}
                                sx={{
                                    color: 'error.main',
                                    opacity: isHovered ? 1 : 0,
                                    transition: 'opacity 0.2s ease',
                                }}
                            >
                                <TrashIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )
            }
        </Box >
    );
};
