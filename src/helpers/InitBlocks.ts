import { TChoice, TChoiceQuestion, TTextQuestion } from "./Types"

export const initStatus = {
    show: false,
    correct: false,
    label: '',
}

export const initChoice: TChoice = {
    label: '',
    isCorrect: 'true',
}

export const initChoiceQuestionBlock: TChoiceQuestion = {
    __typename: 'choiceQuestionBlock',
    choiceQuestionBlock: true,
    id: '',
    label: '',
    note: '',
    choices: [''],
    solution: [''],
}

export const initTextBlock: TTextQuestion = {
    __typename: 'textBlock',
    textBlock: true,
    id: '',
    label: '',
    solution: '',
    note: '',
}