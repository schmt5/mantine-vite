import { useEffect, useState } from 'react'
import { ActionIcon, AppShell, Burger, Grid, Header, MediaQuery, Navbar, Paper, Select, SimpleGrid, Text, TextInput, useMantineTheme } from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import './App.css'
import { Question } from './components/Question';
import { AddMenu } from './components/AddMenu';
import { AppHeader } from './components/AppHeader';
import { AppNavbar } from './components/AppNavbar';
import { TQuestion, TChoiceQuestion } from './helpers/Types';



function App() {
  const pages = [
    {
      id: 'pg-1',
      title: 'Page 1'
    },
    {
      id: 'pg-2',
      title: 'Page 2'
    },
    {
      id: 'pg-3',
      title: 'Page 3'
    },
    {
      id: 'pg-4',
      title: 'Page 4'
    },
  ];

  const [open, toggleOpen] = useBooleanToggle(false);
  const [questions, setQuestions] = useState<TQuestion[]>([]);



  const addQuestion = (question: TQuestion) => {
    setQuestions(prevState => [...prevState, question])
  }

  return (
    <AppShell
      // navbarOffsetBreakpoint controls when navbar should no longer be offset with padding-left
      navbarOffsetBreakpoint="sm"
      // fixed prop on AppShell will be automatically added to Header and Navbar
      fixed
      navbar={<AppNavbar open={open} />}
      header={<AppHeader open={open} toggle={toggleOpen} />}
      sx={(theme) => ({background: theme.colors.gray[0]})}
    >
      <AddMenu addQuestion={addQuestion} />
      <div style={{ marginTop: 48, display: 'grid', gap: 32 }}>
        {questions.map(q => (
          <Question key={q.id} question={q} />
        ))}
      </div>
    </AppShell>
  )
}

export default App
