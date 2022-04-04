import { Button, Checkbox, CheckboxGroup, Group, Paper, Radio, RadioGroup, Text } from '@mantine/core';
import { TChoiceQuestion } from '../../helpers/Types';
import { useForm } from '@mantine/form';

interface IChoiceQuestionStudentView {
    question: TChoiceQuestion;
}

export const ChoiceQuestionStudentView = ({ question }: IChoiceQuestionStudentView) => {
    const choicesWithSolution = question.choices.map(choice => ({ choice: choice, isCorrect: `${question.solution.includes(choice)}` }));
    const form = useForm({
        initialValues: {
            answer: [],
        }
    })

    return (
        <Paper p={'md'}>
            <form onSubmit={form.onSubmit(values => {
                console.log(values)

            })}>
                <Text mb={'md'} weight={500}>{question.label}</Text>

                {choicesWithSolution.filter(choice => choice.isCorrect === 'true').length > 1 ? (
                    <CheckboxGroup
                        orientation='vertical'
                        {...form.getInputProps('answer', { type: 'checkbox' })}
                    >
                        {choicesWithSolution.map(choice => (
                            <Checkbox
                                key={choice.choice}
                                label={choice.choice}
                                value={choice.choice}

                            />
                        ))}
                    </CheckboxGroup>
                ) : (
                    <RadioGroup
                        orientation='vertical'
                        {...form.getInputProps('answer')}
                    >
                        {choicesWithSolution.map((choice, index) => (
                            <Radio
                                key={choice.choice}
                                label={choice.choice}
                                value={choice.choice}
                            />
                        ))}
                    </RadioGroup>
                )}

                <Group position='right'>
                    <Button type='submit' variant='subtle'>Überprüfen</Button>
                </Group>
            </form>
        </Paper>
    );
}
