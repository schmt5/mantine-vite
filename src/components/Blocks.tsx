import { isChoiceQuestion, isTextQuestion } from "../helpers/isType";
import { TBlock } from "../helpers/Types"
import { ChoiceQuestionBlock } from "./ChoiceQuestionBlock/ChoiceQuestionBlock";
import { TextQuestionBlock } from "./TextQuestionBlock/TextQuestionBlock";

interface IBlocks {
    block: TBlock;
    dispatch: any;
    view: string;
    currentPage: number;
}

export const Blocks = ({ block, dispatch, view, currentPage }: IBlocks) => {

    if (isChoiceQuestion(block)) {
        return (
            <ChoiceQuestionBlock
                question={block}
                dispatch={dispatch}
                view={view}
                currentPage={currentPage}
            />
        );
    } else if (isTextQuestion(block)) {
        return (
            <TextQuestionBlock
                question={block}
                dispatch={dispatch}
                view={view}
            />
        )
    }
    else {
        return <div>my test</div>
    }
}