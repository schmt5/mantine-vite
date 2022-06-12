import { DragDropContext, Droppable } from "react-beautiful-dnd";

interface IDroppableList {
    children: React.ReactNode;
}

export const DroppableList = ({ children }: IDroppableList) => {
    const onDragEnd = () => { }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="contentList">
                {provided => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {children}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}
