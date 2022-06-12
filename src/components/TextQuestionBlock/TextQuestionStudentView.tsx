import { Button, Group, Paper, TextInput, Text, Alert, Transition } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { AlertCircle, Check, LetterA } from "tabler-icons-react";
import { initStatus } from "../../helpers/InitBlocks";
import { TTextQuestion } from "../../helpers/Types";

interface ITextQuestionStudentView {
    question: TTextQuestion;
}

export const TextQuestionStudentView = ({ question }: ITextQuestionStudentView) => {
    const [checkStatus, setCheckStatus] = useState(initStatus);
    const form = useForm({
        initialValues: {
            answer: '',
        }
    })

    return (
        <Paper p={'md'}>
            <form onSubmit={form.onSubmit((values) => {
                let status;
                if (values.answer.trim().toLocaleLowerCase().localeCompare(question.data.option.toLocaleLowerCase()) === 0) {
                    status = { show: true, correct: true, label: 'Gut gemacht' }
                } else {
                    status = { show: true, correct: false, label: 'Leider nein' }
                }

                setCheckStatus(status)
            })}>
                <Text weight={500}>{question.data.label}</Text>
                <TextInput
                    mt={'md'}
                    aria-label="Antwort"
                    placeholder="Deine Antwort"
                    icon={<LetterA size={18} />}
                    {...form.getInputProps('answer')}
                />

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

                <Group position='right' mt={'xl'}>
                    <Button type='submit' variant="subtle">Überprüfen</Button>
                </Group>
            </form>
        </Paper>
    );
}
