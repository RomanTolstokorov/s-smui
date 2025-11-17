export type Part<T = {}> = {
    className?: string;
    style?: React.CSSProperties;
} & T;

export type OptionType = {
    value: string | number;
    label?: string;
    disabled?: boolean;
};
