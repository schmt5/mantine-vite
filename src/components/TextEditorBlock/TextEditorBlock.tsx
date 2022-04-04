import { Group, ThemeIcon } from "@mantine/core";
import RichTextEditor from "@mantine/rte";
import { useEffect, useState } from "react";
import { DeviceFloppy } from "tabler-icons-react";
import { useDebounce } from "usehooks-ts";

interface ITextEditorBlock {
    view: string;
}

export const TextEditorBlock = ({ view }: ITextEditorBlock) => {
    const [isContentSaved, setIsContentSaved] = useState(true);
    const [content, setContent] = useState('');
    const debouncedContent = useDebounce(content, 1000)

    useEffect(() => {
        setIsContentSaved(false);
    }, [content])

    useEffect(() => {
        // ToDo

        setIsContentSaved(true)
        return () => {
            setIsContentSaved(false)
        }
    }, [debouncedContent])

    return (
        <div>
            {view === 'author' && (
                <Group m={8} position={'right'}>
                    <ThemeIcon color={isContentSaved ? 'green' : 'gray'} variant={'outline'}>
                        <DeviceFloppy size={18} />
                    </ThemeIcon>
                </Group>
            )}
            <RichTextEditor
                value={content}
                onChange={setContent}
                readOnly={view !== 'author'}
            />

        </div>
    );
};
