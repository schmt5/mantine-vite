import * as React from 'react';
import { TQuestion } from '../../helpers/Types';
import { PercentageAuthorView } from './PercentageAuthorView';


interface IPercentageBlock {
    question: TQuestion;
    dispatch: any;
    view: string;
    currentPage: number;
}

export const PercentageBlock = () => {

    return (
        <PercentageAuthorView />
    );
}