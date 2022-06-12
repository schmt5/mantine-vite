import { Alert, Button, Checkbox, CheckboxGroup, Group, Paper, Radio, RadioGroup, Text, ThemeIcon, Transition } from '@mantine/core';
import { TChoiceQuestion } from '../../helpers/Types';
import { useForm } from '@mantine/form';
import { AlertCircle, Check, X } from 'tabler-icons-react';
import { useState } from 'react';
import { initStatus } from '../../helpers/InitBlocks';

interface IChoiceQuestionStudentView {
    question: TChoiceQuestion;
}

export const ChoiceQuestionStudentView = ({ question }: IChoiceQuestionStudentView) => {
    const [comittedAnswer, setCommitedAnswer] = useState<string[]>([]);
    const [checkStatus, setCheckStatus] = useState(initStatus);
    const form = useForm({
        initialValues: {
            answer: [],
        }
    })

    return (
        <Paper p={'md'}>
            <form onSubmit={form.onSubmit(values => {
                let answer: string[] = values.answer;
                let status;
                if (typeof answer === 'string') {
                    answer = [answer];
                }

                const correctOptionStr = question.data.options
                    .filter(option => option.status === 'correct')
                    .map(option => option.label)
                    .sort()
                    .join('-');

                const answerStr = answer.sort().join('-');

                if (correctOptionStr === answerStr) {
                    status = { show: true, correct: true, label: 'Gut gemacht' }
                } else {
                    status = { show: true, correct: false, label: 'Leider nein' }
                }

                setCheckStatus(status)
                setCommitedAnswer(answer);
            })}>
                <>
                    <Text mb={'md'} weight={500}>{question.data.label}</Text>
                    {comittedAnswer.length === 0 ? (
                        <>
                            {question.data.options.filter(option => option.status === 'correct').length > 1 ? (
                                <CheckboxGroup
                                    orientation='vertical'
                                    {...form.getInputProps('answer', { type: 'checkbox' })}
                                >
                                    {question.data.options.map(option => (
                                        <Checkbox
                                            key={option.label}
                                            label={option.label}
                                            value={option.label}
                                        />
                                    ))}
                                </CheckboxGroup>
                            ) : (
                                < RadioGroup
                                    orientation='vertical'
                                    {...form.getInputProps('answer')}
                                >
                                    {question.data.options.map(option => (
                                        <Radio
                                            key={option.label}
                                            label={option.label}
                                            value={option.label}
                                        />
                                    ))}
                                </RadioGroup>
                            )}
                        </>
                    ) : (
                        <Group direction='column' spacing={'xs'}>
                            {question.data.options.map(option => (
                                <Group key={option.label}>
                                    <ThemeIcon
                                        size={'sm'}
                                        radius={'xl'}
                                        color={(option.status === 'correct' && comittedAnswer.includes(option.label)) || (option.status === 'incorrect' && !comittedAnswer.includes(option.label)) ? 'green' : 'orange'}
                                        variant={'outline'}
                                    >
                                        {option.status === 'correct' ? (
                                            <Check size={12} />
                                        ) : (
                                            <X size={12} />
                                        )}
                                    </ThemeIcon>

                                    {option.label}
                                </Group>
                            ))}
                        </Group>
                    )}
                </>

                <Transition mounted={checkStatus.show} transition={'scale'} duration={250} timingFunction="ease-out">
                    {(styles) => (
                        <div style={styles}>
                            <Alert
                                mt={'xl'}
                                icon={checkStatus.correct ? <Check size={18} /> : <AlertCircle size={18} />}
                                title={checkStatus.label}
                                color={checkStatus.correct ? 'green' : 'orange'}

                            >
                                {question.data.note}
                            </Alert>
                        </div>
                    )}
                </Transition>

                <Group position='right' mt={'md'}>
                    <Button type='submit' variant='subtle'>Überprüfen</Button>
                </Group>
            </form>
        </Paper >
    );
}
