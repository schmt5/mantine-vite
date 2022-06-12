import { TChoiceQuestion } from '../../helpers/Types';
import { ChoiceQuestionAuthorView } from './ChoiceQuestionAuthorView';
import { ChoiceQuestionStudentView } from './ChoiceQuestionStudentView';

interface IChoiceQuestion {
    question: TChoiceQuestion;
    dispatch: any;
    view: string;
    currentPage: number;
}

export const ChoiceQuestionBlock = ({ question, dispatch, view, currentPage }: IChoiceQuestion) => {
    if (view === 'author') {
        return (
            <ChoiceQuestionAuthorView
                question={question}
                dispatch={dispatch}
                currentPage={currentPage}
            />
        );
    } else {
        return (
            <ChoiceQuestionStudentView
                question={question} />
        );
    }
}
