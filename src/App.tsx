import { useEffect, useReducer, useState } from 'react'
import { AppShell } from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import { Question } from './components/Question';
import { AppHeader } from './components/AppHeader';
import { AppNavbar } from './components/AppNavbar';
import { ControlBar } from './components/ControlBar';
import { TextEditorBlock } from './components/TextEditorBlock/TextEditorBlock';
import { reducer } from './helpers/reducer';
import { fetchChoiceQuestion, fetchTextQuestion } from './helpers/supabaseQueries';

export const App = () => {
  const [open, toggleOpen] = useBooleanToggle(false);
  const [view, setView] = useState('author');
  const [state, dispatch] = useReducer(reducer, []);

  const fetchInitState = async () => {
    // const questions = await fetchTextQuestion();
    const questions = await fetchChoiceQuestion();

    dispatch({
      type: 'fetched',
      payload: questions,
    });
  }

  useEffect(() => {
    fetchInitState();
  }, []);

  return (
    <AppShell
      // navbarOffsetBreakpoint controls when navbar should no longer be offset with padding-left
      navbarOffsetBreakpoint="sm"
      // fixed prop on AppShell will be automatically added to Header and Navbar
      fixed
      navbar={<AppNavbar open={open} />}
      header={<AppHeader
        open={open}
        toggle={toggleOpen}
        view={view}
        setView={setView}
      />}
      sx={(theme) => ({ background: theme.colors.gray[0] })}
    >
      <ControlBar dispatch={dispatch} />
      <div style={{ marginTop: 86, display: 'grid', gap: 32 }}>
        <TextEditorBlock view={view} />
        {state.map(q => (
          <Question
            key={q.id}
            question={q}
            dispatch={dispatch}
            view={view}
          />
        ))}
      </div>
    </AppShell>
  )
}
