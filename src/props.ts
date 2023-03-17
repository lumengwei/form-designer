export type CheckboxProps = {
    placeholder: string;
    options: {
        label: string;
        value: string;
        checked: boolean;
        disabled: boolean;
    }[];
};

export type LinearLayoutProps = {};

export type ColumnLayoutProps = {
    columnNum: number
};


export type InputProps = {
    placeholder: string
};
