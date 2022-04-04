import { TQuestion } from '../helpers/Types';
import { isChoiceQuestion, isTextQuestion } from '../helpers/isType';
import { ChoiceQuestionBlock } from './ChoiceQuestionBlock/ChoiceQuestionBlock';
import { TextQuestionBlock } from './TextQuestionBlock/TextQuestionBlock';

interface IQueston {
    question: TQuestion;
    dispatch: any;
    view: string;
}

export const Question = ({ question, dispatch, view }: IQueston) => {
    if (isChoiceQuestion(question)) {
        return (
            <ChoiceQuestionBlock
                question={question}
                dispatch={dispatch}
                view={view}
            />
        );
    } else if (isTextQuestion(question)) {
        return (
            <TextQuestionBlock
                question={question}
                dispatch={dispatch}
                view={view}
            />
        );
    } else {
        return (
            <div>No Block</div>
        )
    }
}
