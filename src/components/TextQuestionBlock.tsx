import { Paper } from "@mantine/core";
import { TTextQuestion } from "../helpers/Types";


interface ITextQueston {
    question: TTextQuestion;
}

export const TextQuestionBlock = ({ question }: ITextQueston) => {

    return (
        <Paper p={'md'}>
            Text Question
        </Paper>
    );
}
