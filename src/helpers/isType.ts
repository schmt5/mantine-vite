import { TChoiceQuestion, TQuestion, TTextQuestion } from "./Types";

export const isChoiceQuestion = (question: TQuestion): question is TChoiceQuestion => {
    return (question as TChoiceQuestion).choiceQuestionBlock !== undefined;
}

export const isTextQuestion = (question: TQuestion): question is TTextQuestion => {
    return (question as TTextQuestion).textBlock !== undefined;
}
