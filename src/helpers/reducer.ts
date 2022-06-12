import { TBlock, TQuestion } from "./Types"

export const reducer = (state: TBlock[], action: any): TBlock[] => {
    if (action.type === 'fetched') {
        return [...action.payload];
    } else if (action.type === 'insert') {
        return [...state, action.payload];
    } else if (action.type === 'update') {
        const others = state.filter(item => item.id !== action.payload.id);
        return [...others, action.payload];
    } else if (action.type === 'delete') {
        const others = state.filter(item => item.id !== action.payload.id);
        return [...others];
    } else {
        return [...state];
    }
}
