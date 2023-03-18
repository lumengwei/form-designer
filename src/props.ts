export type CheckboxProps = {
    placeholder: string;
    options: {
        label: string;
        value: string;
        checked: boolean;
        disabled: boolean;
    }[];
};

export type RadioProps = {
    placeholder: string;
    options: {
        label: string;
        value: string;
        checked: boolean;
        disabled: boolean;
    }[];
};


export type RateProps = {
    count: number
}

export type SelectProps = {
    placeholder: string;
    options: {
        label: string;
        value: string;
        checked: boolean;
        disabled: boolean;
    }[];
}

export type TextAreaProps = {
    placeholder: string;
}

export type LinearLayoutProps = {};

export type ColumnLayoutProps = {
    columnNum: number
};


export type InputProps = {
    placeholder: string
};
