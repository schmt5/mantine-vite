import { useEffect, useReducer, useState } from 'react'
import { AppShell } from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import { Question } from './components/Question';
import { AppHeader } from './components/AppHeader';
import { AppNavbar } from './components/AppNavbar';
import { ControlBar } from './components/ControlBar';
import { TextEditorBlock } from './components/TextEditorBlock/TextEditorBlock';
import { reducer } from './helpers/reducer';
import { fetchBlocks, fetchPage } from './helpers/supabaseQueries';
import { TChoiceQuestion, TPage, TTextQuestion } from './helpers/Types';
import { FloatingAddButton } from './components/FloatingAddButton/FloatingAddButton';
import { ItemId } from '@atlaskit/tree';
import { PercentageBlock } from './components/PercentageBlock/PercentageBlock';
import { DraggableBlock } from './components/DraggableBlock/DraggableBlock';
import { DraggableItem } from './components/DraggableItem/DraggableItem';
import { DroppableList } from './components/DroppableList/DroppableList';
import { Blocks } from './components/Blocks';

export const App = () => {
  const [open, toggleOpen] = useBooleanToggle(false);
  const [view, setView] = useState('author');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [state, dispatch] = useReducer(reducer, []);

  const getPageContent = async () => {
    //const page = await fetchPage(currentPage) as TPage;
    //const textQuestions = await fetchTextQuestion() as TTextQuestion[];
    // const choiceQuestions = await fetchChoiceQuestion() as TChoiceQuestion[];
    // const allQuestions = [...textQuestions, ...choiceQuestions];
    // const sorted = page.ordered_ids.map(item => allQuestions.find(q => q.id === item));

    const blocks = await fetchBlocks();
    console.log(blocks)

    dispatch({
      type: 'fetched',
      payload: blocks,
    });
  }

  useEffect(() => {
    getPageContent()
  }, [currentPage]);

  return (
    <AppShell
      // navbarOffsetBreakpoint controls when navbar should no longer be offset with padding-left
      navbarOffsetBreakpoint="sm"
      // fixed prop on AppShell will be automatically added to Header and Navbar
      fixed
      navbar={<AppNavbar open={open} setCurrentPage={setCurrentPage} />}
      header={<AppHeader
        open={open}
        toggle={toggleOpen}
        view={view}
        setView={setView}
      />}
      sx={(theme) => ({ background: theme.colors.gray[0] })}
    >
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
    </AppShell>
  )
}
