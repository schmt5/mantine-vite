import { Affix, Button, Divider, Menu } from '@mantine/core';
import { AlignLeft, Circle, CursorText, Plus, SquareCheck } from 'tabler-icons-react';
import { TQuestion } from '../helpers/Types';
import { initChoiceQuestionBlock, initTextBlock } from '../helpers/InitBlocks'

interface IAddMenu {
    addQuestion: (question: TQuestion) => void;
}


export const AddMenu = ({ addQuestion }: IAddMenu) => {
    const addChoiceQuestion = () => {
        const choiceQuestion = {
            ...initChoiceQuestionBlock,
            id: new Date().getMilliseconds().toString(),
        };

        addQuestion(choiceQuestion);
    }

    const addTextQuestion = () => {
        const textQuestion = {
            ...initTextBlock,
            id: new Date().getMilliseconds().toString(),
        };

        addQuestion(textQuestion);
    }

    return (
        <Affix position={{ top: 80, right: 24 }}>
            <Menu control={<Button leftIcon={<Plus size={18} />} color={'green'}>Hinzufügen</Button>}>
                <Menu.Label>Inhalt</Menu.Label>
                <Menu.Item icon={<AlignLeft size={18} />}>Absatz</Menu.Item>
                <Divider />
                <Menu.Label>Fragen</Menu.Label>
                <Menu.Item onClick={addChoiceQuestion} icon={<Circle size={18} />}>Single-Choice</Menu.Item>
                <Menu.Item onClick={addTextQuestion} icon={<CursorText size={18} />}>Text</Menu.Item>
            </Menu>
        </Affix>
    );
};
