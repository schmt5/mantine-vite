import * as React from 'react';
import { Burger, Header, MediaQuery, Text, useMantineTheme } from '@mantine/core';

interface IAppHeader {
    open: boolean;
    toggle: () => void
}

export const AppHeader = ({ open, toggle }: IAppHeader) => {
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

                <Text>Application header</Text>
            </div>
        </Header>
    );
}
