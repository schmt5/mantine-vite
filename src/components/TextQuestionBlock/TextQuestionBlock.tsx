
import { TTextQuestion } from "../../helpers/Types";
import { TextQuestionAuthorView } from "./TextQuestionAuthorView";
import { TextQuestionStudentView } from "./TextQuestionStudentView";

interface ITextQueston {
    question: TTextQuestion;
    dispatch: any;
    view: string;
}

export const TextQuestionBlock = ({ question, dispatch, view }: ITextQueston) => {
    if (view === 'author') {
        return (
            <TextQuestionAuthorView
                question={question}
                dispatch={dispatch}

            />
        );
    } else {
        return (
            <TextQuestionStudentView
                question={question}
            />
        );
    }
}
