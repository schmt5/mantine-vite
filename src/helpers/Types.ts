export type TBlock = TChoiceQuestion | TTextQuestion;

export type TChoiceQuestion = {
    id: number;
    type: string;
    data: TChoiceData;
    page: number;
}

export type TChoiceOption = {
    label: string;
    status: string;
}

export type TChoiceData = {
    label: string;
    note: string;
    options: TChoiceOption[];
}

export type TTextQuestion = {
    id: number,
    type: string;
    data: TTextData;
    page: number;
}

export type TTextData = {
    label: string;
    option: string;
    note: string;
}

export type TQuestion = TChoiceQuestion | TTextQuestion;




export type TPage = {
    id: number,
    created_at: string,
    label: string,
    ordered_ids: string[],
}