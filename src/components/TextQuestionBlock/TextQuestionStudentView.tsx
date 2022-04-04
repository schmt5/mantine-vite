import { Button, Group, Paper, TextInput, Text, Alert } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { AlertCircle, Check, LetterA } from "tabler-icons-react";
import { TTextQuestion } from "../../helpers/Types";

interface ITextQuestionStudentView {
    question: TTextQuestion;
}

const initStatus = {
    show: false,
    correct: false,
    label: '',
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
                if (values.answer.trim().toLocaleLowerCase().localeCompare(question.solution.toLocaleLowerCase()) !== 0) {
                    status = { show: true, correct: false, label: 'Leider nein' }
                } else {
                    status = { show: true, correct: true, label: 'Gut gemacht' }
                }

                setCheckStatus(status)


            })}>
                <Text weight={500}>{question.label}</Text>
                <TextInput
                    mt={'md'}
                    aria-label="Antwort"
                    placeholder="Deine Antwort"
                    icon={<LetterA size={18} />}
                    {...form.getInputProps('answer')}
                />
                {checkStatus.show && (
                    <Alert
                        mt={'xl'}
                        icon={checkStatus.correct ? <Check size={18} /> : <AlertCircle size={18} />}
                        title={checkStatus.label}
                        color={checkStatus.correct ? 'green' : 'orange'}
                    >
                        Erkährung kommt hier.
                    </Alert>
                )}
                <Group position='right' mt={'xl'}>
                    <Button type='submit' variant="subtle">Check</Button>
                </Group>
            </form>
        </Paper>
    );
}
