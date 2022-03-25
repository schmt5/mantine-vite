import { TChoice, TChoiceQuestion, TTextQuestion } from "./Types"

export const initChoice: TChoice = {
    label: '',
    isCorrect: true,
}

export const initChoiceQuestionBlock: TChoiceQuestion = {
    __typename: 'choiceQuestionBlock',
    choiceQuestionBlock: true,
    id: '',
    label: '',
    choices: [initChoice],
}

export const initTextBlock: TTextQuestion = {
    __typename: 'textBlock',
    textBlock: true,
    id: '',
    label: '',
    answer: '',
}