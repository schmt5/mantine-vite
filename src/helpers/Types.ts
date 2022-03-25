export type TChoice = {
    label: string,
    isCorrect: boolean,
}

export type TChoiceQuestion = {
    __typename: string,
    choiceQuestionBlock: boolean,
    id: string,
    label: string,
    choices: TChoice[],
}

export type TTextQuestion = {
    __typename: string,
    textBlock: boolean,
    id: string,
    label: string,
    answer: string,
}

export type TQuestion = TChoiceQuestion | TTextQuestion;


