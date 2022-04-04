import * as React from 'react';
import { ActionIcon, Navbar } from '@mantine/core';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { Folder } from 'tabler-icons-react';

interface IAppNavbar {
    open: boolean;
}

export const AppNavbar = ({ open }: IAppNavbar) => {
    const [order, setOrder] = React.useState(['pg-1', 'pg-2', 'pg-3', 'pg-4'])
    const handleDragEnd = ({ destination, source, draggableId }: DropResult) => {
        if (!destination) {
            return;
        }

        if (destination.index === source.index) {
            return;
        }

        const newOrder = [...order]
        newOrder.splice(source.index, 1);
        newOrder.splice(destination.index, 0, draggableId);
        setOrder(newOrder);
    };

    return (
        <Navbar
            p="md"
            // Breakpoint at which navbar will be hidden if hidden prop is true
            hiddenBreakpoint="sm"
            // Hides navbar when viewport size is less than value specified in hiddenBreakpoint
            hidden={!open}
            // when viewport size is less than theme.breakpoints.sm navbar width is 100%
            // viewport size > theme.breakpoints.sm – width is 300px
            // viewport size > theme.breakpoints.lg – width is 400px
            width={{ sm: 300, lg: 400 }}
        >
            {/* First section with normal height (depends on section content) */}
            <Navbar.Section>First section</Navbar.Section>

            {/* Grow section will take all available space that is not taken by first and last sections */}
            <Navbar.Section grow>
                <DragDropContext
                    onDragEnd={handleDragEnd}
                >
                    <Droppable
                        droppableId='pages'
                    >
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                                    {order.map((page, index) => (
                                        <Draggable
                                            key={page}
                                            draggableId={page}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <div style={{ padding: 16, border: '1px solid black', backgroundColor: 'white' }}>
                                                        {page}
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>

                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

                <ActionIcon variant='filled' color="green">
                    <Folder size={18} />
                </ActionIcon>
            </Navbar.Section>

            {/* Last section with normal height (depends on section content) */}
            <Navbar.Section>Last section</Navbar.Section>
        </Navbar>
    );
}
