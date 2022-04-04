import { Button, Group, Paper, TextInput, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { LetterF, LetterL } from "tabler-icons-react";
import { updateTextQuestion } from "../../helpers/supabaseQueries";
import { TTextQuestion } from "../../helpers/Types";

interface ITextQuestionAuthorView {
    question: TTextQuestion;
    dispatch: any;
}

export const TextQuestionAuthorView = ({ question, dispatch }: ITextQuestionAuthorView) => {
    const form = useForm({
        initialValues: {
            label: question.label ?? '',
            solution: question.solution ?? '',
        }
    });

    return (
        <Paper p={'md'}>
            <form onSubmit={form.onSubmit((values) => {
                const newQuestion = {
                    ...question,
                    label: values.label.trim(),
                    solution: values.solution.trim(),
                }

                dispatch({
                    type: 'update',
                    payload: newQuestion,
                });
                updateTextQuestion(newQuestion.id, newQuestion.label, newQuestion.solution)

            })}>

                <Text weight={500}>Textfrage</Text>
                <TextInput
                    mt={'md'}
                    aria-label="Frage"
                    placeholder="Frage"
                    icon={<LetterF size={18} />}
                    {...form.getInputProps('label')}
                />
                <TextInput
                    mt={'md'}
                    aria-label="Lösung"
                    placeholder="Lösung"
                    icon={<LetterL size={18} />}
                    {...form.getInputProps('solution')}
                />

                <Group position='right' mt={'xl'}>
                    <Button type='submit' variant="subtle">Speichern</Button>
                </Group>
            </form>
        </Paper>
    );
}
