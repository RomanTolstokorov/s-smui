import React, { useState, useCallback, useRef } from 'react';
import {
    Autocomplete,
    Box,
    IconButton,
    MenuItem,
    TextField,
    Typography,
    styled,
} from '@mui/material';
import type { AriaAttributes, HTMLAttributes, ReactNode } from 'react';
import { XIcon, CaretDownIcon } from '@phosphor-icons/react';

export type OptionType = {
    value: string | number;
    label?: string;
    disabled?: boolean;
};

type OptionRenderState = {
    selected: boolean;
    index: number;
    inputValue: string;
};

type RenderOption<O extends OptionType> = (
    props: HTMLAttributes<HTMLLIElement> & { key: any },
    option: O,
    renderState: OptionRenderState
) => ReactNode;

export type Part<T = {}> = {
    className?: string;
    style?: React.CSSProperties;
} & T;

type FilterSelectVariants = 'borderless';

type FilterSelectV2Props<O extends OptionType> = {
    id?: string;
    value: O | null;
    options: O[];
    onChange: (option: O | null) => void;
    placeholder?: string;
    variant?: FilterSelectVariants;
    disabled?: boolean;
    searchable?: boolean;
    clearable?: boolean;
    filterOptions?: (options: O[], searchText: string) => O[];
    parts?: {
        root?: Part;
        input?: Part;
        optionsList?: Part;
        valueContainer?: Part;
        controlButtonsContainer?: Part;
        surface?: Part;
        popper?: Part<{ placement?: 'bottom-start' | 'bottom-end' | 'bottom' | 'top-start' | 'top-end' | 'top' }>;
        clearButton?: Part<{ icon?: ReactNode }>;
        toggleButton?: Part<{ icon?: ReactNode }>;
    };
    slots?: {
        renderValue?: (option: O) => ReactNode;
        renderOption?: RenderOption<O>;
    };
    sx?: any;
} & AriaAttributes &
    Record<`data-${string}`, string>;

const CONTROL_BUTTON_SIZE = 32;

const BorderlessTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        border: 'none',
        boxShadow: 'none',
        borderRadius: 0,
        padding: '4px 4px 4px 12px',
        '& .MuiAutocomplete-input': {
            padding: 0,
        },
        '& fieldset': {
            border: 'none',
        },
        '&:hover:not(.Mui-disabled)': {
            backgroundColor: theme.vars.palette.action.hover,
            borderRadius: 0,
            boxShadow: 'none',
        },
        '&.Mui-focused': {
            boxShadow: 'none',
            borderRadius: 0,
        },
    },
    '& .MuiInputBase-root': {
        border: 'none',
        boxShadow: 'none',
        borderRadius: 0,
    },
}));

const SelectValueContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    padding: 'inherit',
});

const styledTextFieldComponents: Record<FilterSelectVariants, typeof BorderlessTextField> = {
    borderless: BorderlessTextField,
};

export const FilterSelect = <O extends OptionType>({
    id,
    value,
    onChange,
    options,
    variant = 'borderless',
    disabled = false,
    searchable = false,
    clearable = true,
    filterOptions,
    placeholder = 'Select an option',
    parts,
    slots,
    sx,
    ...attributes
}: FilterSelectV2Props<O>): React.ReactElement | null => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');
    const [isInputHovered, setIsInputHovered] = useState<boolean>(false);
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const defaultRenderValue = useCallback(
        (option: O) => (
            <Typography
                variant="body1"
                style={{
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                }}
            >
                {option.label || option.value}
            </Typography>
        ),
        []
    );

    const defaultRenderOption = useCallback<RenderOption<O>>(
        (props, option, renderState) => (
            <MenuItem
                {...props}
                key={String(option.value)}
                disabled={option.disabled}
                selected={renderState.selected}
            >
                <Typography variant="body1">{option.label || option.value}</Typography>
            </MenuItem>
        ),
        []
    );

    const renderFunctionsRef = useRef<{
        renderValue?: (option: O) => ReactNode;
        renderOption?: RenderOption<O>;
    }>({});

    renderFunctionsRef.current = {
        renderValue: slots?.renderValue || defaultRenderValue,
        renderOption: slots?.renderOption || defaultRenderOption,
    };

    const valueRenderer = useCallback(
        (option: O) => renderFunctionsRef.current.renderValue?.(option),
        []
    );

    const optionRenderer = useCallback<RenderOption<O>>(
        (props, option, state) => renderFunctionsRef.current.renderOption?.(props, option, state),
        []
    );

    const isSearchable = Boolean(searchable || filterOptions);
    const isClearIconVisible =
        ((isInputHovered && value !== null) || inputValue.length > 0) && !disabled && clearable;

    const TextInputField = styledTextFieldComponents[variant];

    // Clear input value when value changes and component is not searchable
    React.useEffect(() => {
        if (!isSearchable && value && !isOpen) {
            setInputValue('');
        }
    }, [value, isSearchable, isOpen]);

    return (
        <Autocomplete
            key={value?.value ?? 'empty'}
            id={id}
            options={options}
            value={value ?? undefined}
            onChange={(_event, newValue) => onChange?.(newValue)}
            disabled={disabled}
            readOnly={disabled}
            open={isOpen}
            onOpen={() => setIsOpen(true)}
            onClose={() => {
                setIsOpen(false);
                setIsFocused(false);
            }}
            getOptionLabel={(option) => option.label || String(option.value)}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            onMouseEnter={() => setIsInputHovered(true)}
            onMouseLeave={() => setIsInputHovered(false)}
            filterOptions={
                filterOptions
                    ? (opts, { inputValue }) => filterOptions(opts, inputValue)
                    : undefined
            }
            inputValue={inputValue}
            onInputChange={(_event, newInputValue, reason) => {
                // For non-searchable selects, clear input on selection/reset
                if (!isSearchable && (reason === 'reset')) {
                    setInputValue('');
                } else {
                    setInputValue(newInputValue);
                }
            }}
            forcePopupIcon={false}
            disableClearable={true}
            renderInput={(params) => {
                // Show custom rendered value when:
                // 1. There's no input being typed AND value exists AND (dropdown is closed OR not focused)
                // OR
                // 2. Component is not searchable and not clearable (always show custom value)
                const displayValue = value && (
                    (!inputValue && !isOpen && !isFocused) ||
                    (!isSearchable && !clearable)
                );

                return (
                    <TextInputField
                        {...params}
                        placeholder={value ? undefined : placeholder}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        slotProps={{
                            htmlInput: {
                                ...params.inputProps,
                                readOnly: !isSearchable,
                                style: {
                                    ...params.inputProps.style,
                                    // Hide input text when showing custom value display
                                    color: displayValue ? 'transparent' : undefined,
                                },
                            },
                            input: {
                                ...params.InputProps,
                                className: parts?.input?.className,
                                style: parts?.input?.style,
                                startAdornment: displayValue ? (
                                    <SelectValueContainer
                                        className={parts?.valueContainer?.className}
                                        style={{
                                            cursor: disabled ? 'default' : (!isSearchable ? 'pointer' : 'text'),
                                            ...parts?.valueContainer?.style,
                                        }}
                                        onClick={() => {
                                            if (disabled) return;
                                            setIsOpen((s) => !s);
                                        }}
                                    >
                                        {valueRenderer(value)}
                                    </SelectValueContainer>
                                ) : null,
                                endAdornment: (
                                    <Box
                                        className={parts?.controlButtonsContainer?.className}
                                        style={parts?.controlButtonsContainer?.style}
                                    >
                                        {isClearIconVisible && (
                                            <IconButton
                                                style={{
                                                    width: CONTROL_BUTTON_SIZE,
                                                    height: CONTROL_BUTTON_SIZE,
                                                    ...parts?.clearButton?.style,
                                                }}
                                                className={parts?.clearButton?.className}
                                                onClick={() => {
                                                    onChange?.(null);
                                                    setIsOpen(false);
                                                    setInputValue('');
                                                }}
                                            >
                                                {parts?.clearButton?.icon || <XIcon size={20} />}
                                            </IconButton>
                                        )}

                                        {!isClearIconVisible && (
                                            <IconButton
                                                style={{
                                                    width: CONTROL_BUTTON_SIZE,
                                                    height: CONTROL_BUTTON_SIZE,
                                                    ...parts?.toggleButton?.style,
                                                }}
                                                className={parts?.toggleButton?.className}
                                                disabled={disabled}
                                                onClick={() => {
                                                    if (disabled) return;
                                                    setIsOpen((s) => !s);
                                                }}
                                            >
                                                {parts?.toggleButton?.icon || (
                                                    <CaretDownIcon
                                                        size={20}
                                                        style={{
                                                            transform: `rotate(${isOpen ? 180 : 0}deg)`,
                                                            transition: 'transform 0.2s',
                                                        }}
                                                    />
                                                )}
                                            </IconButton>
                                        )}
                                    </Box>
                                ),
                            },
                        }}
                        style={{ padding: 0 }}
                    />
                );
            }}
            renderOption={(props, option, state) =>
                optionRenderer(props, option, {
                    selected: state.selected,
                    index: state.index,
                    inputValue: inputValue,
                })
            }
            slotProps={{
                paper: {
                    sx: {
                        boxShadow: '0px 1px 2px 0px rgba(65, 50, 42, 0.08)',
                        border: '1px solid',
                        borderColor: 'divider',
                        ...parts?.surface?.style,
                    },
                    className: parts?.surface?.className,
                },
                popper: {
                    style: parts?.popper?.style,
                    className: parts?.popper?.className,
                    placement: parts?.popper?.placement || 'bottom-start',
                },
            }}
            className={parts?.root?.className}
            style={{ padding: 0, width: '100%', ...parts?.root?.style }}
            sx={sx}
            {...attributes}
        />
    );
};
