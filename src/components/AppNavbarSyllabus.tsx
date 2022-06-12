import * as React from 'react';
import { useEffect, useReducer, useState } from 'react'
import { ActionIcon, Button, Group, Navbar, ThemeIcon } from '@mantine/core';
import Tree, {
    mutateTree,
    moveItemOnTree,
    RenderItemParams,
    TreeItem,
    TreeData,
    ItemId,
    TreeSourcePosition,
    TreeDestinationPosition,
} from '@atlaskit/tree';
import { treeWithTwoBranches } from '@atlaskit/tree/mockdata/treeWithTwoBranches';
import { ArrowDown, ArrowUp, ChevronDown, ChevronRight, GripVertical } from 'tabler-icons-react';
import { flattenTree, getParent } from '@atlaskit/tree/dist/es2019/utils/tree.js';
import { FlattenedItem } from '@atlaskit/tree/dist/types/types';
import { fetchSyllabus } from '../helpers/supabaseQueries';

interface IAppNavbar {
    open: boolean;
    setCurrentPage: any;
}

export const AppNavbarSyllabus = ({ open }: IAppNavbar) => {
    const [tree, setTree] = useState<TreeData>(treeWithTwoBranches);

    const fetchInitSyllabus = async () => {
        const syllabus = await fetchSyllabus();
        if (syllabus === undefined) {
            return;
        }
        const items = Object.fromEntries(
            syllabus.map(it => [it.id, it])
        );
        const initTree = {
            rootId: 0,
            items: items
        }

        console.log(initTree)
        setTree(initTree);

    }

    useEffect(() => {
        fetchInitSyllabus();
    }, []);



    const onExpand = (itemId: ItemId) => {
        const newTree = mutateTree(tree, itemId, { isExpanded: true })
        setTree(newTree);
    }

    const onCollapse = (itemId: ItemId) => {
        const newTree = mutateTree(tree, itemId, { isExpanded: false })
        setTree(newTree)
    }

    const onDragEnd = (source: TreeSourcePosition, destination?: TreeDestinationPosition) => {
        if (!destination) {
            return;
        }

        const newTree = moveItemOnTree(tree, source, destination);
        setTree(newTree);
    }

    const moveItem = (item: TreeItem, step: number) => {
        const flatTree: FlattenedItem[] = flattenTree(tree);
        const flatItem = flatTree.find(it => it.item.id === item.id);
        const parent: TreeItem = getParent(tree, flatItem?.path);
        const index = parent.children.findIndex(child => child === item.id);
        const newTree = moveItemOnTree(tree, { parentId: parent.id, index: index }, { parentId: parent.id, index: index + step })

        setTree(newTree)
    }

    const renderItem = ({ item, onExpand, onCollapse, provided }: RenderItemParams) => {
        return (
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
            >
                <Group sx={{ gap: 2, padding: '4px 0' }}>
                    <div {...provided.dragHandleProps}>
                        <GripVertical size={18} style={{ display: 'block' }} />
                    </div>
                    {item.children && item.children.length > 0 && (
                        <>
                            {item.isExpanded ? (
                                <ActionIcon onClick={() => onCollapse(item.id)}>
                                    <ChevronDown size={18} />
                                </ActionIcon>
                            ) : (
                                <ActionIcon onClick={() => onExpand(item.id)}>
                                    <ChevronRight size={18} />
                                </ActionIcon>
                            )}
                        </>
                    )}
                    <Button
                        variant='default'
                        color={'dark'}
                        sx={{ flex: 1, border: 'none' }}
                        onClick={() => setCurrentPage(item.id)}
                    >
                        {item.data.title}
                    </Button>

                    <ActionIcon onClick={() => moveItem(item, -1)}>
                        <ArrowUp size={18} />
                    </ActionIcon>
                    <ActionIcon onClick={() => moveItem(item, 1)}>
                        <ArrowDown size={18} />
                    </ActionIcon>
                </Group>
            </div>
        );
    }

    React.useEffect(() => {
        console.log(tree)
    }, [tree])

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
                <Tree
                    tree={tree}
                    renderItem={renderItem}
                    onExpand={onExpand}
                    onCollapse={onCollapse}
                    onDragEnd={onDragEnd}
                    isDragEnabled={true}
                />
            </Navbar.Section>

            {/* Last section with normal height (depends on section content) */}
            <Navbar.Section>Last section</Navbar.Section>
        </Navbar>
    );
}
