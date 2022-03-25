import * as React from 'react'
import { ActionIcon, AppShell, Burger, Button, Grid, Group, Header, MediaQuery, Navbar, Paper, Radio, RadioGroup, SegmentedControl, Select, SimpleGrid, Text, TextInput, useMantineTheme } from '@mantine/core';
import { Circle, LetterA, LetterF, Plus, SquareCheck, Trash } from 'tabler-icons-react';
import { TQuestion, TChoiceQuestion } from '../helpers/Types';
import { formList, useForm } from '@mantine/form';
import { initChoice, initChoiceQuestionBlock } from '../helpers/InitBlocks'
import { isChoiceQuestion, isTextQuestion } from '../helpers/isType';
import { ChoiceQuestionBlock } from './ChoiceQuestionBlock';
import { TextQuestionBlock } from './TextQuestionBlock';


interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
    icon: React.ReactNode;
    label: string;
}
const SelectItem = React.forwardRef<HTMLDivElement, ItemProps>(
    ({ icon, label, ...others }: ItemProps, ref) => (
        <div ref={ref} {...others}>
            <Group>
                {icon}
                <Text>{label}</Text>
            </Group>
        </div>
    )
)

interface IQueston {
    question: TQuestion;
}



export const Question = ({ question }: IQueston) => {
    if (isChoiceQuestion(question)) {
        return (<ChoiceQuestionBlock question={question} />)
    } else if (isTextQuestion(question)) {
        return (<TextQuestionBlock question={question} />);
    } else {
        return (
            <div>No Block</div>
        )
    }
}
