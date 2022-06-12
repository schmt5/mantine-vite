import { Divider, NumberInput, Paper, Box, NumberInputHandlers, Group, ActionIcon, SimpleGrid, RingProgress } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'tabler-icons-react';

export const PercentageAuthorView = () => {
    const [value, setValue] = useState(0)
    const [numerator, setNumerator] = useState(0);
    const [denominator, setDenominator] = useState(0);
    const numeratorHandlers = useRef<NumberInputHandlers>();
    const denominatorHandlers = useRef<NumberInputHandlers>();

    useEffect(() => {
        if (denominator === 0) {
            return;
        }

        setValue((numerator / denominator)* 100);
    }, [numerator, denominator])

    return (
        <Paper p={'md'}>
            <SimpleGrid cols={2}>
                <Box
                    sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}
                >
                    <Group spacing={'xs'}>
                        <NumberInput
                            variant='unstyled'
                            size='xl'
                            hideControls
                            value={numerator}
                            onChange={(val) => setNumerator(val)}
                            handlersRef={numeratorHandlers}
                            min={0}
                            sx={{ width: 36, 'input': { textAlign: 'center' } }}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <ActionIcon
                                onClick={() => numeratorHandlers.current?.increment()}
                            >
                                <ChevronUp size={16} />
                            </ActionIcon>
                            <ActionIcon
                                onClick={() => numeratorHandlers.current?.decrement()}
                            >
                                <ChevronDown size={16} />
                            </ActionIcon>
                        </Box>
                    </Group>
                    <Divider sx={{ width: 36 }} />
                    <Group spacing={'xs'}>
                        <NumberInput
                            variant='unstyled'
                            size='xl'
                            hideControls
                            value={denominator}
                            onChange={(val) => setDenominator(val)}
                            handlersRef={denominatorHandlers}
                            min={0}
                            sx={{ width: 36, 'input': { textAlign: 'center' } }}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <ActionIcon
                                onClick={() => denominatorHandlers.current?.increment()}
                            >
                                <ChevronUp size={16} />
                            </ActionIcon>
                            <ActionIcon
                                onClick={() => denominatorHandlers.current?.decrement()}
                            >
                                <ChevronDown size={16} />
                            </ActionIcon>
                        </Box>
                    </Group>
                </Box>
                <RingProgress
                    sections={[
                        { value: value, color: 'blue' }
                    ]}

                />
            </SimpleGrid>
        </Paper>
    )
}
