import { TBlock, TChoiceQuestion, TTextQuestion } from "./Types";

export const isChoiceQuestion = (block: TBlock): block is TChoiceQuestion => {
    return block.type === 'choiceQuestion';
}

export const isTextQuestion = (block: TBlock): block is TTextQuestion => {
    return block.type === 'textQuestion';
}
