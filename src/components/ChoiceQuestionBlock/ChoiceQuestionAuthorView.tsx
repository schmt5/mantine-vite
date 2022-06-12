import { ActionIcon, Button, Group, Paper, SegmentedControl, Text, Textarea, TextInput } from '@mantine/core';
import { LetterA, LetterF, Plus, Trash } from 'tabler-icons-react';
import { TChoiceQuestion } from '../../helpers/Types';
import { formList, useForm } from '@mantine/form';
import { deleteChoiceQuestion, fetchPage, updateChoiceQuestion, updatePage } from '../../helpers/supabaseQueries';
import { useState } from 'react';

interface IChoiceQuestionAuthorView {
    question: TChoiceQuestion;
    dispatch: any;
    currentPage: number;
}

export const ChoiceQuestionAuthorView = ({ question, dispatch, currentPage }: IChoiceQuestionAuthorView) => {
    const [showNote, setShowNote] = useState(false);
    const form = useForm({
        initialValues: {
            label: question.data.label ?? '',
            note: question.data.note ?? '',
            options: formList(question.data.options),
        }
    });

    const handleDelete = async () => {
        dispatch({
            type: 'delete',
            payload: question,
        });

        deleteChoiceQuestion(question.id);
    }

    return (
        <Paper p={'md'}>
            <form onSubmit={form.onSubmit(values => {
                const newQuestion: TChoiceQuestion = {
                    ...question,
                    data: {
                        label: values.label,
                        note: values.note,
                        options: values.options,
                    }
                }

                dispatch({
                    type: 'update',
                    payload: newQuestion,
                });
                updateChoiceQuestion(newQuestion.id, newQuestion.data);
            })}>
                <Group position='apart'>
                    <Text mb={'md'} weight={500}>Auswahlfrage</Text>
                    <ActionIcon
                        color={'red'}
                        variant={'hover'}
                        onClick={handleDelete}
                    >
                        <Trash size={18} />
                    </ActionIcon>
                </Group>
                <TextInput
                    aria-label='Frage'
                    placeholder='Frage'
                    icon={<LetterF size={18} />}
                    {...form.getInputProps('label')}
                />

                {form.values.options.map((option, index) => (
                    <Group key={index} mt={'md'}>
                        <TextInput
                            aria-label='Antwort'
                            placeholder='Antwort'
                            variant='filled'
                            icon={<LetterA size={18} />}
                            sx={{ flex: 1 }}
                            {...form.getListInputProps('options', index, 'label')}
                        />
                        <SegmentedControl
                            data={[
                                { label: 'wahr', value: 'correct' },
                                { label: 'falsch', value: 'incorrect' },
                            ]}
                            {...form.getListInputProps('options', index, 'status')}
                        />
                        <ActionIcon
                            color={'red'}
                            variant={'hover'}
                            onClick={() => form.removeListItem('options', index)}
                        >
                            <Trash size={18} />
                        </ActionIcon>
                    </Group>
                ))}
                <Group position='left' mt={'sm'}>
                    <Button
                        variant='subtle'
                        leftIcon={<Plus size={18} />}
                        onClick={() => form.addListItem('options', { label: '', status: 'incorrect' })}
                    >
                        Antwort hinzufügen
                    </Button>
                    {!showNote && (
                        <Button
                            variant='subtle'
                            leftIcon={<Plus size={18} />}
                            onClick={() => setShowNote(true)}
                        >
                            Bemerkung hinzufügen
                        </Button>
                    )}
                </Group>
                {showNote && (
                    <Textarea
                        mt={'md'}
                        aria-label='Bemerkung'
                        placeholder='Bemerkung zur Lösung'
                        {...form.getInputProps('note')}
                    />
                )}

                <Group mt={'md'} position='right'>
                    <Button type='submit' variant='subtle'>Speichern</Button>
                </Group>
            </form>
        </Paper>
    );
}
