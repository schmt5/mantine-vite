import { ActionIcon, Button, Group, Navbar } from "@mantine/core";
import { useEffect, useState } from "react"
import { ArrowDown, ArrowUp } from "tabler-icons-react";
import { fetchPages, updatePage } from "../helpers/supabaseQueries";
import { TPage } from "../helpers/Types";

interface IAppNavbar {
    setCurrentPage: (id: number) => void;
}

export const AppNavbar = ({ setCurrentPage }: IAppNavbar) => {
    const [pages, setPages] = useState<TPage[]>([]);

    useEffect(() => {
        fetchPages().then(pages => {
            if (typeof pages === 'undefined') {
                return;
            }

            setCurrentPage(pages[0]?.id);
            setPages(pages);
        })
    }, []);

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
            {/* Grow section will take all available space that is not taken by first and last sections */}
            <Navbar.Section grow>
                {pages.map(page => (
                    <Group>
                        <Button
                            sx={{ flex: 1, justifyContent: "flex-start" }}
                            variant="white"
                            color={'dark'}
                            onClick={() => setCurrentPage(page.id)}
                        >
                            {page.label}
                        </Button>
                        <ActionIcon
                            onClick={() => {
                                const res = [...pages];
                                const sourceIndex = pages.findIndex(it => it.id === page.id);
                                const destIndex = sourceIndex - 1;
                                const [removed] = res.splice(sourceIndex, 1);
                                res.splice(destIndex, 0, removed);
                                setPages(res);

                                res.forEach((page, index) => {
                                    updatePage(page.id, index);
                                });
                            }}>
                            <ArrowUp />
                        </ActionIcon>
                        <ActionIcon>
                            <ArrowDown />
                        </ActionIcon>
                    </Group>
                ))}
            </Navbar.Section>

            {/* Last section with normal height (depends on section content) */}
            <Navbar.Section>Last section</Navbar.Section>
        </Navbar>
    );
}
