import { Group, ThemeIcon, Transition, Box } from "@mantine/core";
import RichTextEditor from "@mantine/rte";
import { useEffect, useState } from "react";
import { DeviceFloppy } from "tabler-icons-react";
import { useDebounce } from "usehooks-ts";

interface ITextEditorBlock {
    view: string;
    isEditing: boolean;
}

export const TextEditorBlock = ({ view, isEditing }: ITextEditorBlock) => {
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
        <div style={{ position: 'relative', paddingTop: isEditing ? 0 : 53 }}>
            {view === 'author' && (
                <Box sx={{ position: 'absolute', right: 0, top: -32 }}>
                    <ThemeIcon color={isContentSaved ? 'green' : 'gray'} variant={'outline'}>
                        <DeviceFloppy size={18} />
                    </ThemeIcon>
                </Box>
            )}
            <RichTextEditor
                value={content}
                onChange={setContent}
                readOnly={!isEditing}
                style={{
                    backgroundColor: 'transparent',
                    borderColor: isEditing ? undefined : 'transparent',
                }}
            />
        </div>
    );
};
