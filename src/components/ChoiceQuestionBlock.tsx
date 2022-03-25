import * as React from 'react'
import { ActionIcon, AppShell, Burger, Button, Grid, Group, Header, MediaQuery, Navbar, Paper, Radio, RadioGroup, SegmentedControl, Select, SimpleGrid, Text, TextInput, useMantineTheme } from '@mantine/core';
import { Circle, LetterA, LetterF, Plus, SquareCheck, Trash } from 'tabler-icons-react';
import { TQuestion, TChoiceQuestion } from '../helpers/Types';
import { formList, useForm } from '@mantine/form';
import { initChoice, initChoiceQuestionBlock } from '../helpers/InitBlocks'
import { isChoiceQuestion } from '../helpers/isType';

interface IChoiceQuestion {
    question: TChoiceQuestion;
}

export const ChoiceQuestionBlock = ({ question }: IChoiceQuestion) => {
    const form = useForm({
        initialValues: {
            question: question.label ?? '',
            choices: question.choices.length === 0 ? formList([initChoice]) : formList([...question.choices])
        }
    })

    return (
        <Paper p={'md'}>
            <form onSubmit={form.onSubmit(values => console.log(values))}>
                <TextInput
                    aria-label='Frage'
                    placeholder='Frage'
                    variant='default'
                    icon={<LetterF size={18} />}
                    {...form.getInputProps('question')}
                />

                {form.values.choices.map((choice, index) => (
                    <Group key={index} mt={'sm'}>
                        <TextInput
                            aria-label='Antwort'
                            placeholder='Antwort'
                            variant='filled'
                            icon={<LetterA size={18} />}
                            sx={{ flex: 1 }}
                            {...form.getListInputProps('choices', index, 'label')}
                        />
                        <SegmentedControl
                            data={[
                                { label: 'wahr', value: 'true' },
                                { label: 'falsch', value: 'false' },
                            ]}
                            {...form.getListInputProps('choices', index, 'isCorrect')}
                        />
                        <ActionIcon
                            color={'red'}
                            variant={'hover'}
                            onClick={() => form.removeListItem('choices', index)}
                        >
                            <Trash size={18} />
                        </ActionIcon>
                    </Group>
                ))}
                <Group position='left' mt={'sm'}>
                    <Button
                        variant='subtle'
                        leftIcon={<Plus size={18} />}
                        onClick={() => form.addListItem('choices', initChoice)}
                    >
                        Antwort hinzufügen
                    </Button>
                </Group>
                <Group position='right'>
                    <Button type='submit'>Speichern</Button>
                </Group>
            </form>
        </Paper>
    );
}
