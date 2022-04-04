export type TChoice = {
    label: string,
    isCorrect: string,
}

export type TChoiceQuestion = {
    __typename: string,
    choiceQuestionBlock: boolean,
    id: number,
    label: string,
    choices: string[],
    solution: string[],
}

export type TTextQuestion = {
    __typename: string,
    textBlock: boolean,
    id: number,
    label: string,
    solution: string,
}

export type TQuestion = TChoiceQuestion | TTextQuestion;


