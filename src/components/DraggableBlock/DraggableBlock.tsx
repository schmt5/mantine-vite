import { useRef, useState } from "react";
import { BoxModel, Dots, DragDrop, Edit, GripVertical, Pencil } from "tabler-icons-react";
import { useOnClickOutside } from "usehooks-ts";
import { Stack, Box, ThemeIcon, ActionIcon, Transition } from '@mantine/core'


interface IDraggableBlock {
    children: any;
}

export const DraggableBlock = ({ children }: IDraggableBlock) => {
    const blockRef = useRef(null);
    const [isEditing, setIsEditing] = useState(false);

    const handleClickOutside = () => {
        setIsEditing(false);
    }

    const handleClickInside = () => {
        setIsEditing(true);
    }


    useOnClickOutside(blockRef, handleClickOutside);

    return (
        <Box
            ref={blockRef}
            onClick={handleClickInside}
            sx={(theme) => ({
                borderWidth: 1,
                borderStyle: 'solid',
                borderColor: isEditing ? theme.colors.gray[7] : 'transparent',
                borderRadius: theme.radius.sm,
            })}
        >
            <Transition mounted={isEditing} transition={'scale-x'}>
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
                                <ThemeIcon color={'dark'}>
                                    <GripVertical />
                                </ThemeIcon>
                                <ActionIcon color={'dark'} variant={'filled'}>
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
            {(children(isEditing))}
        </Box>
    );
}
