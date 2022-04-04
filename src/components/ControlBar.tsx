import { Affix } from '@mantine/core'
import { AddMenu } from './AddMenu'

interface IControlBar {
    dispatch: any;
}

export const ControlBar = ({ dispatch }: IControlBar) => {
    return (
        <Affix position={{ top: 80, right: 24 }}>
            <AddMenu dispatch={dispatch} />
        </Affix>
    );
}
