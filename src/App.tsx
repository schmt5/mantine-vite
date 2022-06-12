import { useEffect, useReducer, useState } from 'react'
import { AppShell } from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import { AppHeader } from './components/AppHeader';
import { TextEditorBlock } from './components/TextEditorBlock/TextEditorBlock';
import { reducer } from './helpers/reducer';
import { fetchBlocks } from './helpers/supabaseQueries';
import { FloatingAddButton } from './components/FloatingAddButton/FloatingAddButton';
import { DraggableBlock } from './components/DraggableBlock/DraggableBlock';
import { DraggableItem } from './components/DraggableItem/DraggableItem';
import { DroppableList } from './components/DroppableList/DroppableList';
import { Blocks } from './components/Blocks';
import { AppNavbar } from './components/AppNavbar';

export const App = () => {
  const [open, toggleOpen] = useBooleanToggle(false);
  const [view, setView] = useState('author');
  const [currentPage, setCurrentPage] = useState<number>();
  const [state, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    if (typeof currentPage === 'undefined') {
      return;
    }

    fetchBlocks(currentPage).then(blocks => {
      dispatch({
        type: 'fetched',
        payload: blocks,
      });
    })
  }, [currentPage, fetchBlocks, dispatch]);

  return (

    <AppShell
      // navbarOffsetBreakpoint controls when navbar should no longer be offset with padding-left
      navbarOffsetBreakpoint="sm"
      // fixed prop on AppShell will be automatically added to Header and Navbar
      fixed
      navbar={<AppNavbar setCurrentPage={setCurrentPage} />}
      header={<AppHeader
        open={open}
        toggle={toggleOpen}
        view={view}
        setView={setView}
      />}
      sx={(theme) => ({ background: theme.colors.gray[0] })}
    >
      {typeof currentPage !== 'undefined' && (
        <>
          <FloatingAddButton dispatch={dispatch} currentPage={currentPage} />
          <div style={{ marginTop: 86, display: 'grid', gap: 32, marginLeft: 46 }}>
            <DroppableList>
              <DraggableItem index={0} id={'one'}>
                {isEditing => (
                  <TextEditorBlock view={view} isEditing={isEditing} />
                )}
              </DraggableItem>
            </DroppableList>
            <DraggableBlock>
              {(isEditing: boolean) => (
                <TextEditorBlock view={view} isEditing={isEditing} />
              )}
            </DraggableBlock>


            {state.map(block => (
              <Blocks
                key={block.id}
                block={block}
                view={view}
                dispatch={dispatch}
                currentPage={currentPage}
              />
            ))}
          </div>
        </>
      )}
    </AppShell>
  )
}
