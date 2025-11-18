import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    Box,
    Checkbox,
    Chip,
    IconButton,
    List,
    MenuItem,
    Paper,
    Popper,
    TextField,
    Tooltip,
    Typography,
    styled,
} from '@mui/material';
import useAutocomplete from '@mui/material/useAutocomplete';
import type { AriaAttributes, HTMLAttributes, ReactElement, ReactNode } from 'react';
import { XIcon, CaretDownIcon } from '@phosphor-icons/react';
import type { Part, OptionType } from './commonTypes';
import { TextMeasurer } from '../../utils/TextMeasurer';

export type { OptionType };

type OptionRenderState = {
    selected: boolean;
    index: number;
    inputValue: string;
};

type RenderOption<O extends OptionType> = (
    props: HTMLAttributes<HTMLLIElement> & {
        key: any;
    },
    option: O,
    renderState: OptionRenderState
) => ReactNode;

type RenderValueItem<O extends OptionType> = (
    props: {
        className?: string;
        key: any;
    },
    option: O,
    onDelete: (event: any) => void
) => ReactNode;

export type SMultiSelectVariants = 'borderless' | 'standard';
export type SMultiSelectSize = 'small' | 'medium';

type SMultiSelectProps<O extends OptionType> = {
    id?: string;
    value: O[];
    options: O[];
    onChange: (option: O[]) => void;
    placeholder?: string;
    label?: string;
    variant?: SMultiSelectVariants;
    size?: SMultiSelectSize;
    disabled?: boolean;
    searchable?: boolean;
    clearable?: boolean;
    filterOptions?: (options: O[], searchText: string) => O[];
    parts?: {
        root?: Part;
        input?: Part;
        optionsList?: Part;
        controlButtonsContainer?: Part;
        surface?: Part;
        popper?: Part<{ placement?: 'bottom-start' | 'bottom-end' | 'bottom' | 'top-start' | 'top-end' | 'top' }>;
        clearButton?: Part<{ icon?: ReactNode }>;
        toggleButton?: Part<{ icon?: ReactNode }>;
        inputPrefix?: Part;
        optionsListPrefix?: Part;
        optionsListSuffix?: Part;
        noOptions?: Part;
    };
    slots?: {
        renderOption?: RenderOption<O>;
        renderValueItem?: RenderValueItem<O>;
        inputPrefix?: (focused: boolean) => ReactNode;
        renderCounterTooltipContent?: (hiddenOptions: O[]) => ReactNode;
        optionsListPrefix?: ReactNode;
        optionsListSuffix?: ReactNode;
        noOptions?: ReactNode;
    };
} & AriaAttributes &
    Record<`data-${string}`, string>;

const CONTROL_BUTTON_SIZE = 32;
const VALUE_ITEM_SELECTOR = 'filter-multi-select-value-item';
const DEFAULT_LISTBOX_MAX_HEIGHT = 400;
const DEFAULT_COUNTER_POPPER_MAX_WIDTH = 200;

const textMeasurer = new TextMeasurer();

const StandardTextField = styled(TextField)(({ }) => ({
    '& .MuiOutlinedInput-root': {
        height: 'auto',
        '&.MuiInputBase-sizeSmall': {
            padding: '0 14px',
        },
    },
}));

const BorderlessTextField = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        border: 'none',
        boxShadow: 'none',
        borderRadius: 0,
        padding: '0 4px 0 12px',
        minHeight: '40px',
        height: 'auto',
        '& .MuiInputBase-input': {
            padding: 0,
        },
        '& .MuiAutocomplete-input': {
            padding: 0,
            minWidth: '10px',
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

const MultiSelectRoot = styled(Box)({
    '& .clear-button': {
        display: 'none',
    },
    '&.clearable:hover .clear-button': {
        display: 'flex',
    },
    '&.clearable:hover .toggle-button': {
        display: 'none',
    },
});

const MeasureContainer = styled(Box)({
    position: 'relative',
    height: 0,
    visibility: 'hidden',
    pointerEvents: 'none',
    whiteSpace: 'nowrap',
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    flexWrap: 'nowrap',
});

const TagsContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    flexWrap: 'nowrap',
});

const EndAdornmentContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
});

const EndAdornmentContainerWithPrefix = styled(EndAdornmentContainer)({
    gap: 8,
});

const StyledPopper = styled(Popper)({
    zIndex: 1300,
});

const StyledPaper = styled(Paper)({
    display: 'flex',
    flexDirection: 'column',
    maxHeight: DEFAULT_LISTBOX_MAX_HEIGHT,
    borderColor: 'var(--palette-divider)',
});

const StyledList = styled(List)({
    width: '100%',
    margin: 0,
    padding: 0,
    listStyle: 'none',
    overflow: 'auto',
    flexGrow: 1,
});

const StyledMenuItem = styled(MenuItem)({
    padding: '8px 16px',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: 'var(--palette-action-hover)',
    },
    '&[data-focus="true"]': {
        backgroundColor: 'var(--palette-action-focus)',
        outline: '2px solid var(--palette-primary-main)',
        outlineOffset: -2,
    },
    '&[aria-disabled="true"]': {
        opacity: 0.5,
        cursor: 'default',
        pointerEvents: 'none',
    },
});

const NoOptions = styled(Box)(({ theme }) => ({
    padding: 16,
    textAlign: 'center',
    color: theme.vars.palette.text.secondary,
}));

const ControlIconButton = styled(IconButton)({
    borderRadius: 8,
    width: CONTROL_BUTTON_SIZE,
    height: CONTROL_BUTTON_SIZE,
});

const CounterChip = styled(Chip)({
    cursor: 'default',
});

const HiddenOption = styled('div')({
    position: 'absolute !important' as any,
    left: 0,
    top: 0,
    height: '0 !important',
});

const styledTextFieldComponents: Record<SMultiSelectVariants, typeof BorderlessTextField> = {
    borderless: BorderlessTextField,
    standard: StandardTextField,
};

export const SMultiSelect = <O extends OptionType>({
    id: propsId,
    value: propsValue,
    onChange,
    options,
    variant = 'standard',
    size = 'small',
    disabled = false,
    searchable = false,
    clearable = true,
    filterOptions,
    placeholder = 'Select options',
    label,
    parts,
    slots,
    ...attributes
}: SMultiSelectProps<O>): ReactElement | null => {
    const scrollAreaRef = useRef<HTMLUListElement>(null);

    const {
        getRootProps,
        getInputProps,
        getListboxProps,
        getOptionProps,
        getClearProps,
        getPopupIndicatorProps,
        groupedOptions,
        id,
        inputValue,
        popupOpen,
        setAnchorEl,
        value,
        anchorEl,
        getTagProps,
        focused,
    } = useAutocomplete<O, true, false, false>({
        id: propsId,
        multiple: true,
        value: propsValue,
        onChange: (_event, newValue) => onChange?.(newValue || []),
        options,
        getOptionLabel: (option) => option.label || String(option.value),
        isOptionEqualToValue: (option, value) => option.value === value.value,
        getOptionDisabled: (option) => option.disabled || false,
        filterOptions: filterOptions
            ? (opts, state) => filterOptions(opts, state.inputValue)
            : undefined,
        disabled,
        disableCloseOnSelect: true,
        onHighlightChange: (_event, option, reason) => {
            if (reason === 'mouse' || reason === 'touch') return;

            const listboxNode = scrollAreaRef.current;

            if (!listboxNode) return;

            if (listboxNode.scrollHeight > listboxNode.clientHeight) {
                const optionEl = listboxNode.querySelector(
                    `[data-option-value="${option?.value}"]`
                );

                if (!optionEl) return;

                optionEl.scrollIntoView({ block: 'nearest' });
            }
        },
    });

    const defaultRenderOption = useCallback<RenderOption<O>>(
        (props, option, renderState) => (
            <StyledMenuItem
                {...props}
                key={props.key}
                selected={renderState.selected}
            >
                <Checkbox checked={renderState.selected} />
                <Typography variant="body1">
                    {option.label || option.value}
                </Typography>
            </StyledMenuItem>
        ),
        []
    );

    const defaultRenderValueItem = useCallback<RenderValueItem<O>>(
        (props, option, onDelete) => (
            <Chip
                key={props.key as string}
                className={props.className}
                label={option.label || option.value}
                onDelete={onDelete}
                onClick={(e) => {
                    e.preventDefault();
                }}
                deleteIcon={<XIcon size={16} />}
                size="small"
            />
        ),
        []
    );

    const defaultCounterTooltipContent = useCallback(
        (hiddenOptions: O[]) => (
            <Typography
                color="primary.contrastText"
                fontSize="12px"
                sx={{ maxWidth: DEFAULT_COUNTER_POPPER_MAX_WIDTH }}
            >
                {hiddenOptions.map((option) => option.label || option.value).join('; ')}
            </Typography>
        ),
        []
    );

    const renderOption = slots?.renderOption || defaultRenderOption;
    const renderValueItem = slots?.renderValueItem || defaultRenderValueItem;
    const renderCounterTooltipContent =
        slots?.renderCounterTooltipContent || defaultCounterTooltipContent;

    const rootProps = getRootProps();
    const inputProps = getInputProps();
    const listboxProps = getListboxProps();
    const clearProps = getClearProps();
    const popupIndicatorProps = getPopupIndicatorProps();

    const inputRef = inputProps.ref as React.RefObject<HTMLInputElement>;

    const isClearVisible =
        !disabled && clearable && (value.length > 0 || inputValue.length > 0);
    const isSearchable = Boolean(searchable || filterOptions);

    const TextInputField = styledTextFieldComponents[variant];
    const cursorStyle = disabled ? 'default' : !isSearchable ? 'pointer' : undefined;

    const tagsContainerRef = useRef<HTMLDivElement>(null);
    const controlButtonsContainerRef = useRef<HTMLDivElement>(null);
    const measureContainerRef = useRef<HTMLDivElement>(null);
    const counterChipRef = useRef<HTMLDivElement>(null);

    // Cache computed styles to avoid recalculating on every input change
    const cachedStylesRef = useRef<{
        gap: number;
        paddingRL: number;
        inputFont: string;
    } | null>(null);

    const [visibleTagsCount, setVisibleTagsCount] = useState<number>(value.length);

    const calculateVisibleTags = useCallback(
        (currentInputValue: string, selectedOptionsLength: number) => {
            const inputElement = inputRef.current;
            const inputParent = inputElement?.parentElement;
            const measureContainer = measureContainerRef.current;

            if (!inputElement || !inputParent || !measureContainer) {
                return;
            }

            // Get or cache computed styles
            if (!cachedStylesRef.current) {
                const inputParentComputedStyle = getComputedStyle(inputParent);
                const measureContainerComputedStyle = getComputedStyle(measureContainer);
                const inputComputedStyle = getComputedStyle(inputElement);

                const paddingLeft = parseFloat(inputParentComputedStyle.paddingLeft);
                const paddingRight = parseFloat(inputParentComputedStyle.paddingRight);

                cachedStylesRef.current = {
                    gap: parseFloat(measureContainerComputedStyle.gap) || 4,
                    paddingRL: paddingLeft + paddingRight,
                    inputFont: `${inputComputedStyle.fontSize} ${inputComputedStyle.fontFamily}`,
                };
            }

            // Get available width for tags
            const inputParentWidth = inputParent.clientWidth;
            const { paddingRL, gap, inputFont } = cachedStylesRef.current;

            // Calculate space taken by input text
            const textWidth =
                currentInputValue.length > 0
                    ? textMeasurer.measureTextWidth(currentInputValue, inputFont)
                    : 0;

            // Space needed for controls (clear + toggle buttons)
            const controlsWidth = controlButtonsContainerRef.current?.clientWidth || 0;

            // Available space for tags
            const availableWidth = inputParentWidth - paddingRL - controlsWidth - textWidth;

            if (availableWidth <= 0) {
                setVisibleTagsCount(0);
                return;
            }

            // Measure all tags from the hidden measure container
            const allTagElements = measureContainer.querySelectorAll(
                `.${VALUE_ITEM_SELECTOR}`
            );

            if (allTagElements.length === 0) {
                return;
            }

            // Get counter chip width from measure container
            const counterChipElement = counterChipRef.current;
            const counterChipWidth = counterChipElement
                ? counterChipElement.offsetWidth
                : 50;

            let totalWidth = 0;
            let count = 0;

            // Calculate how many tags fit, considering we might need space for counter chip
            for (let i = 0; i < allTagElements.length; i++) {
                const tagWidth = (allTagElements[i] as HTMLElement).clientWidth;
                const totalWidthWithTag = totalWidth + tagWidth + (i > 0 ? gap : 0);

                // Check if we'll need a counter chip after this tag
                const willNeedCounter = i + 1 < selectedOptionsLength;
                const reservedForCounter = willNeedCounter ? counterChipWidth + gap : 0;

                if (totalWidthWithTag + reservedForCounter <= availableWidth) {
                    totalWidth = totalWidthWithTag;
                    count += 1;
                } else {
                    break;
                }
            }

            setVisibleTagsCount(count);
        },
        []
    );

    // Calculate how many tags can fit based on input text width
    useEffect(() => {
        calculateVisibleTags(inputValue, value.length);

        // Set up ResizeObserver to recalculate on input size changes
        const resizeObserver = new ResizeObserver(() => {
            calculateVisibleTags(inputValue, value.length);
        });

        if (inputRef.current?.parentElement) {
            resizeObserver.observe(inputRef.current.parentElement);
        }

        return () => {
            resizeObserver.disconnect();
        };
    }, [inputValue, value.length, calculateVisibleTags]);

    return (
        <MultiSelectRoot
            {...rootProps}
            key={id}
            className={`${isClearVisible ? 'clearable' : ''} ${parts?.root?.className || ''}`}
            style={parts?.root?.style}
            {...attributes}
        >
            {/* Hidden container for measuring all tags */}
            <MeasureContainer ref={measureContainerRef}>
                {value.map((option, index) => {
                    const { onDelete, ...tagProps } = getTagProps({ index });
                    return (
                        <HiddenOption key={tagProps.key} className={VALUE_ITEM_SELECTOR}>
                            {renderValueItem(
                                { key: tagProps.key, className: VALUE_ITEM_SELECTOR },
                                option,
                                onDelete
                            )}
                        </HiddenOption>
                    );
                })}
                <CounterChip
                    ref={counterChipRef}
                    size="small"
                    label="+99"
                    className={VALUE_ITEM_SELECTOR}
                />
            </MeasureContainer>

            <TextInputField
                ref={setAnchorEl}
                fullWidth
                size={size}
                label={variant === 'standard' ? label : undefined}
                placeholder={value.length === 0 ? placeholder : undefined}
                onClick={() => inputRef.current?.focus()}
                disabled={disabled || !isSearchable}
                slotProps={{
                    htmlInput: {
                        ...inputProps,
                        ref: inputRef,
                        readOnly: !isSearchable || disabled,
                        style: {
                            ...inputProps.style,
                            cursor: cursorStyle,
                        },
                    },
                    input: {
                        className: parts?.input?.className,
                        style: {
                            cursor: cursorStyle,
                            ...parts?.input?.style,
                        },
                        startAdornment:
                            value.length > 0 ? (
                                <TagsContainer ref={tagsContainerRef}>
                                    {value.slice(0, visibleTagsCount).map((option, index) => {
                                        const { onDelete, ...tagProps } = getTagProps({ index });
                                        return renderValueItem(
                                            {
                                                key: tagProps.key,
                                                className: VALUE_ITEM_SELECTOR,
                                            },
                                            option,
                                            onDelete
                                        );
                                    })}
                                    {visibleTagsCount < value.length && (
                                        <Tooltip
                                            placement="left"
                                            title={renderCounterTooltipContent(
                                                value.slice(visibleTagsCount)
                                            )}
                                        >
                                            <CounterChip
                                                size="small"
                                                label={`+${value.length - visibleTagsCount}`}
                                                className={VALUE_ITEM_SELECTOR}
                                            />
                                        </Tooltip>
                                    )}
                                </TagsContainer>
                            ) : null,
                        endAdornment: (
                            <Box
                                component={
                                    slots?.inputPrefix
                                        ? EndAdornmentContainerWithPrefix
                                        : EndAdornmentContainer
                                }
                                ref={controlButtonsContainerRef}
                            >
                                {slots?.inputPrefix && (
                                    <Box
                                        className={parts?.inputPrefix?.className}
                                        style={parts?.inputPrefix?.style}
                                    >
                                        {slots.inputPrefix(focused)}
                                    </Box>
                                )}
                                <Box
                                    className={parts?.controlButtonsContainer?.className}
                                    style={parts?.controlButtonsContainer?.style}
                                >
                                    <ControlIconButton
                                        {...(clearProps as any)}
                                        size="small"
                                        className={`clear-button ${parts?.clearButton?.className || ''}`}
                                        style={parts?.clearButton?.style}
                                    >
                                        {parts?.clearButton?.icon || <XIcon size={20} />}
                                    </ControlIconButton>
                                    <ControlIconButton
                                        {...(popupIndicatorProps as any)}
                                        size="small"
                                        disabled={disabled}
                                        className={`toggle-button ${parts?.toggleButton?.className || ''}`}
                                        style={parts?.toggleButton?.style}
                                    >
                                        {parts?.toggleButton?.icon || (
                                            <CaretDownIcon
                                                size={20}
                                                style={{
                                                    transform: `rotate(${popupOpen ? 180 : 0}deg)`,
                                                    transition: 'transform 0.2s ease',
                                                }}
                                            />
                                        )}
                                    </ControlIconButton>
                                </Box>
                            </Box>
                        ),
                    },
                }}
            />

            {anchorEl && (
                <StyledPopper
                    open={popupOpen}
                    anchorEl={anchorEl}
                    style={{ width: anchorEl.clientWidth, ...parts?.popper?.style }}
                    className={parts?.popper?.className}
                    disablePortal={false}
                    placement={parts?.popper?.placement || 'bottom-start'}
                >
                    <StyledPaper
                        className={parts?.surface?.className}
                        style={parts?.surface?.style}
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        {slots?.optionsListPrefix && (
                            <Box
                                className={parts?.optionsListPrefix?.className}
                                style={parts?.optionsListPrefix?.style}
                            >
                                {slots.optionsListPrefix}
                            </Box>
                        )}

                        {groupedOptions.length === 0 ? (
                            <NoOptions
                                className={parts?.noOptions?.className}
                                style={parts?.noOptions?.style}
                            >
                                {slots?.noOptions || 'No options'}
                            </NoOptions>
                        ) : null}

                        <StyledList
                            {...listboxProps}
                            ref={scrollAreaRef}
                            className={`${parts?.optionsList?.className || ''} ${listboxProps.className || ''}`}
                            style={{
                                ...parts?.optionsList?.style,
                                ...listboxProps.style,
                            }}
                        >
                            {(groupedOptions as O[]).map((option, index) => {
                                const optionProps = getOptionProps({ option, index });
                                const ariaSelected = optionProps['aria-selected'];
                                const isSelected =
                                    ariaSelected === true || ariaSelected === 'true';
                                (optionProps as any)['data-option-value'] = option.value;

                                return renderOption(optionProps, option, {
                                    selected: isSelected,
                                    index,
                                    inputValue,
                                });
                            })}
                        </StyledList>

                        {slots?.optionsListSuffix && (
                            <Box
                                className={parts?.optionsListSuffix?.className}
                                style={parts?.optionsListSuffix?.style}
                            >
                                {slots.optionsListSuffix}
                            </Box>
                        )}
                    </StyledPaper>
                </StyledPopper>
            )}
        </MultiSelectRoot>
    );
};
