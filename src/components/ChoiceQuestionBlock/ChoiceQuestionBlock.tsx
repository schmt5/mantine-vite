import { TChoiceQuestion } from '../../helpers/Types';
import { ChoiceQuestionAuthorView } from './ChoiceQuestionAuthorView';
import { ChoiceQuestionStudentView } from './ChoiceQuestionStudentView';

interface IChoiceQuestion {
    question: TChoiceQuestion;
    dispatch: any;
    view: string;
}

export const ChoiceQuestionBlock = ({ question, dispatch, view }: IChoiceQuestion) => {
    if (view === 'author') {
        return (
            <ChoiceQuestionAuthorView
                question={question}
                dispatch={dispatch}
            />
        );
    } else {
        return (
            <ChoiceQuestionStudentView
                question={question} />
        );
    }
}
