import { Burger, Group, Header, MediaQuery, SegmentedControl, Text, useMantineTheme } from '@mantine/core';

interface IAppHeader {
    open: boolean;
    toggle: () => void;
    view: string;
    setView: (view: string) => void;
}

export const AppHeader = ({ open, toggle, view, setView }: IAppHeader) => {
    const theme = useMantineTheme();

    return (
        <Header height={70} p="md">
            {/* Handle other responsive styles with MediaQuery component or createStyles function */}
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                    <Burger
                        opened={open}
                        onClick={() => toggle()}
                        size="sm"
                        color={theme.colors.gray[6]}
                        mr="xl"
                    />
                </MediaQuery>

                <Group sx={{ flexGrow: 1 }} position='apart'>
                    <Text>Application header</Text>
                    <SegmentedControl
                        value={view}
                        onChange={view => setView(view)}
                        data={[
                            { label: 'Autor', value: 'author' },
                            { label: 'Student', value: 'student' },
                        ]}
                    />
                </Group>
            </div>
        </Header>
    );
}
