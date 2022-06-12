import { Button, Group, Paper, TextInput, Text, Textarea, ActionIcon } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { LetterF, LetterL, Plus, Trash } from "tabler-icons-react";
import { deleteTextQuestion, updateTextQuestion } from "../../helpers/supabaseQueries";
import { TTextQuestion } from "../../helpers/Types";

interface ITextQuestionAuthorView {
    question: TTextQuestion;
    dispatch: any;
}

export const TextQuestionAuthorView = ({ question, dispatch }: ITextQuestionAuthorView) => {
    const [showNote, setShowNote] = useState(false);
    const form = useForm({
        initialValues: {
            label: question.data.label ?? '',
            option: question.data.option ?? '',
            note: question.data.note ?? '',
        }
    });

    const handleDelete = () => {
        dispatch({
            type: 'delete',
            payload: question,
        });

        deleteTextQuestion(question.id);
    }

    return (
        <Paper p={'md'}>
            <form onSubmit={form.onSubmit((values) => {
                const newQuestion: TTextQuestion = {
                    ...question,
                    data: {
                        label: values.label.trim(),
                        option: values.option.trim(),
                        note: values.note.trim(),
                    }
                }

                dispatch({
                    type: 'update',
                    payload: newQuestion,
                });
                updateTextQuestion(newQuestion.id, newQuestion.data);
            })}>
                <Group position="apart">
                    <Text weight={500}>Textfrage</Text>
                    <ActionIcon
                        color={'red'}
                        variant={'hover'}
                        onClick={handleDelete}
                    >
                        <Trash size={18} />
                    </ActionIcon>
                </Group>
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
                    {...form.getInputProps('option')}
                />
                {showNote ? (
                    <Textarea
                        mt={'md'}
                        aria-label='Bemerkung'
                        placeholder='Bemerkung zur Lösung'
                        {...form.getInputProps('note')}
                    />
                ) : (
                    <Button
                        mt={'sm'}
                        variant='subtle'
                        leftIcon={<Plus size={18} />}
                        onClick={() => setShowNote(true)}
                    >
                        Bemerkung hinzufügen
                    </Button>
                )}

                <Group position='right' mt={'xl'}>
                    <Button type='submit' variant="subtle">Speichern</Button>
                </Group>
            </form>
        </Paper>
    );
}
