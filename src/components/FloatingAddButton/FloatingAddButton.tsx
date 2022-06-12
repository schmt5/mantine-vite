import { Affix, Button, Divider, Menu } from '@mantine/core';
import * as React from 'react';
import { AlignLeft, Circle, CursorText, Plus } from 'tabler-icons-react';
import { fetchPage, insertChoiceQuestion, insertTextQuestion, updatePage } from '../../helpers/supabaseQueries';

interface IFloatingAddButton {
    dispatch: any;
    currentPage: number,
}

export const FloatingAddButton = ({ dispatch, currentPage }: IFloatingAddButton) => {
    const addChoiceQuestion = async () => {
        const choiceQuestion = await insertChoiceQuestion();
        const page = await fetchPage(currentPage);
        updatePage(currentPage, page.title, [...page.ordered_ids, choiceQuestion.id]);
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
        <>
            <Affix position={{ top: 80, right: 24 }}>
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
            </Affix>
        </>
    );
}