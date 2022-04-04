import { Button, Divider, Menu } from '@mantine/core';
import { AlignLeft, Circle, CursorText, Plus } from 'tabler-icons-react';
import { insertChoiceQuestion, insertTextQuestion } from '../helpers/supabaseQueries';

interface IAddMenu {
    dispatch: any;
}

export const AddMenu = ({ dispatch }: IAddMenu) => {
    const addChoiceQuestion = async () => {
        const choiceQuestion = await insertChoiceQuestion();
        dispatch({
            type: 'insert',
            payload: choiceQuestion,
        });
    }

    const addTextQuestion = async () => {
        const textQuestion = await insertTextQuestion();
        dispatch({
            type: 'insert',
            payload: textQuestion,
        });
    };

    return (
        <Menu control={<Button
            leftIcon={<Plus size={18} />}
        >
            Hinzufügen
        </Button>}>
            <Menu.Label>Inhalt</Menu.Label>
            <Menu.Item icon={<AlignLeft size={18} />}>Absatz</Menu.Item>
            <Divider />
            <Menu.Label>Fragen</Menu.Label>
            <Menu.Item onClick={addChoiceQuestion} icon={<Circle size={18} />}>Single-Choice</Menu.Item>
            <Menu.Item onClick={addTextQuestion} icon={<CursorText size={18} />}>Text</Menu.Item>
        </Menu>
    );
};
