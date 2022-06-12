import { Transition, Box, Stack, ThemeIcon, ActionIcon } from "@mantine/core";
import { useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Dots, Edit, GripVertical } from "tabler-icons-react";
import { useOnClickOutside } from "usehooks-ts";

interface IDraggableItem {
    index: number;
    id: string;
    children: (val: boolean) => React.ReactNode;
}

export const DraggableItem = ({ index, id, children }: IDraggableItem) => {
    const ref = useRef(null);
    const [hasFocus, setHasFocus] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleClickInside = () => {
        setHasFocus(true);
    }
    const handleClickOutside = () => {
        setHasFocus(false);
        setIsEditing(false);
    }

    useOnClickOutside(ref, handleClickOutside);

    return (
        <Box
            ref={ref}
            onClick={handleClickInside}
        >
            <Draggable index={index} draggableId={id}>
                {provided => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={{
                            ...provided.draggableProps.style,
                            borderWidth: 1,
                            borderStyle: 'solid',
                            borderColor: hasFocus ? '#495057' : 'transparent',
                            borderRadius: 4,
                            backgroundColor: '#f8f9fa',
                        }}
                    >
                        <Transition mounted={hasFocus} transition={'scale-x'}>
                            {(styles) => (
                                <div style={styles}>
                                    <Box
                                        sx={(theme) => ({
                                            position: 'absolute',
                                            top: 0,
                                            left: -46,
                                            borderRadius: theme.radius.sm,
                                            backgroundColor: theme.colors.gray[9],
                                            padding: 6,
                                        })}
                                    >
                                        <Stack spacing={'sm'}>
                                            <ThemeIcon {...provided.dragHandleProps} color={'dark'}>
                                                <GripVertical />
                                            </ThemeIcon>
                                            <ActionIcon
                                                color={'dark'}
                                                variant={'filled'}
                                                onClick={() => setIsEditing(prevState => !prevState)}
                                            >
                                                <Edit />
                                            </ActionIcon>
                                            <ActionIcon color={'dark'} variant={'filled'}>
                                                <Dots />
                                            </ActionIcon>
                                        </Stack>
                                    </Box>
                                </div>
                            )}
                        </Transition>
                        {children(isEditing)}
                    </div>
                )}
            </Draggable>
        </Box>
    );
}
