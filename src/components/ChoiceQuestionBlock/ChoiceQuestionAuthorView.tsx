import { ActionIcon, Button, Group, Paper, SegmentedControl, Text, TextInput } from '@mantine/core';
import { LetterA, LetterF, Plus, Trash } from 'tabler-icons-react';
import { TChoiceQuestion } from '../../helpers/Types';
import { formList, useForm } from '@mantine/form';
import { updateChoiceQuestion } from '../../helpers/supabaseQueries';

interface IChoiceQuestionAuthorView {
    question: TChoiceQuestion;
    dispatch: any;
}

export const ChoiceQuestionAuthorView = ({ question, dispatch }: IChoiceQuestionAuthorView) => {
    const choicesWithSolution = question.choices.map(choice => ({ choice: choice, isCorrect: `${question.solution.includes(choice)}` }));
    const form = useForm({
        initialValues: {
            label: question.label ?? '',
            choicesWithSolution: formList(choicesWithSolution),
        }
    });

    return (
        <Paper p={'md'}>
            <form onSubmit={form.onSubmit(values => {
                const choices = values.choicesWithSolution.map(item => item.choice);
                const solution = values.choicesWithSolution
                    .filter(item => item.isCorrect === 'true')
                    .map(item => item.choice);

                const newQuestion = {
                    ...question,
                    label: values.label,
                    choices: choices,
                    solution: solution,
                }

                dispatch({
                    type: 'update',
                    payload: newQuestion,
                });
                updateChoiceQuestion(newQuestion.id, newQuestion.label, newQuestion.choices, newQuestion.solution);

            })}>
                <Text mb={'md'} weight={500}>Auswahlfrage</Text>
                <TextInput
                    aria-label='Frage'
                    placeholder='Frage'
                    icon={<LetterF size={18} />}
                    {...form.getInputProps('label')}
                />

                {form.values.choicesWithSolution.map((choice, index) => (
                    <Group key={index} mt={'md'}>
                        <TextInput
                            aria-label='Antwort'
                            placeholder='Antwort'
                            variant='filled'
                            icon={<LetterA size={18} />}
                            sx={{ flex: 1 }}
                            {...form.getListInputProps('choicesWithSolution', index, 'choice')}
                        />
                        <SegmentedControl
                            data={[
                                { label: 'wahr', value: 'true' },
                                { label: 'falsch', value: 'false' },
                            ]}
                            {...form.getListInputProps('choicesWithSolution', index, 'isCorrect')}
                        />
                        <ActionIcon
                            color={'red'}
                            variant={'hover'}
                            onClick={() => form.removeListItem('choicesWithSolution', index)}
                        >
                            <Trash size={18} />
                        </ActionIcon>
                    </Group>
                ))}
                <Group position='left' mt={'sm'}>
                    <Button
                        variant='subtle'
                        leftIcon={<Plus size={18} />}
                        onClick={() => form.addListItem('choicesWithSolution', { choice: '', isCorrect: 'false' })}
                    >
                        Antwort hinzufügen
                    </Button>
                </Group>
                <Group position='right'>
                    <Button type='submit' variant='subtle'>Speichern</Button>
                </Group>
            </form>
        </Paper>
    );
}
