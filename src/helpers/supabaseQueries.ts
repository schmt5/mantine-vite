import { supabase } from "./supabaseClient"
import { TChoiceData, TTextData } from "./Types";

/*
    Blocks
*/
export const fetchBlocks = async () => {
    try {
        let { data, error, status } = await supabase
            .from('blocks')
            .select('*')

        if (error && status !== 406) {
            throw error;
        }

        if (data) {
            return data;
        }
    } catch (error: any) {
        alert(error.message)
    }
}


/*
    CHOICE QUESTION
*/
export const insertChoiceQuestion = async () => {
    try {
        const blockData: TChoiceData = {
            label: '',
            note: '',
            options: [{ label: '', status: 'incorrect' }]
        }
        const { data, error, status } = await supabase
            .from('blocks')
            .insert([{ type: 'choiceQuestion', data: blockData }]);

        if (error && status !== 406) {
            throw error;
        }

        if (data) {
            return data[0];
        }

    } catch (error: any) {
        console.error(error.message)
    }
}

export const updateChoiceQuestion = async (id: number, blockData: TChoiceData) => {
    try {
        const { data, error, status } = await supabase
            .from('blocks')
            .update({ data: blockData })
            .match({ id: id })

        if (error && status !== 406) {
            throw error;
        }

        if (data) {
            return data[0];
        }

    } catch (error: any) {
        console.error(error.message)
    }
}

export const deleteChoiceQuestion = async (id: number) => {
    try {
        const { data, error, status } = await supabase
            .from('blocks')
            .delete()
            .match({ id: id })

        if (error && status !== 406) {
            throw error;
        }

        if (data) {
            return data[0];
        }
    } catch (error: any) {
        console.error(error.message)
    }
}

/*
    TEXT QUESTION
*/

export const insertTextQuestion = async () => {
    try {
        const blockData: TTextData = {
            label: '',
            note: '',
            option: '',
        }
        const { data, error, status } = await supabase
            .from('blocks')
            .insert([{ type: 'textQuestion', data: blockData }]);

        if (error && status !== 406) {
            throw error;
        }

        if (data) {
            return data[0];
        }

    } catch (error: any) {
        console.error(error.message)
    }
}

export const updateTextQuestion = async (id: number, blockData: TTextData) => {
    try {
        const { data, error, status } = await supabase
            .from('blocks')
            .update({ data: blockData })
            .match({ id: id })

        if (error && status !== 406) {
            throw error;
        }

        if (data) {
            return data[0];
        }

    } catch (error: any) {
        console.error(error.message)
    }
}

export const deleteTextQuestion = async (id: number) => {
    try {
        const { data, error, status } = await supabase
            .from('blocks')
            .delete()
            .match({ id: id })

        if (error && status !== 406) {
            throw error;
        }

        if (data) {
            return data[0];
        }
    } catch (error: any) {
        console.error(error.message)
    }
}












/*
    TEXT Page
*/
export const fetchSyllabus = async () => {
    try {
        let { data, error, status } = await supabase
            .from('syllabus')
            .select('*')

        if (error && status !== 406) {
            throw error;
        }

        if (data) {
            return data;
        }
    } catch (error: any) {
        alert(error.message)
    }
}


/*
    TEXT Page
*/
export const fetchPage = async (pageId?: number) => {
    try {
        let query = supabase
            .from('pages')
            .select('*');

        if (pageId) {
            query.match({ id: pageId });
        }

        let { data, error, status } = await query;

        if (error && status !== 406) {
            throw error;
        }

        if (data) {
            return data[0];
        }
    } catch (error: any) {
        alert(error.message)
    }
}

export const updatePage = async (id: number, label: string, ordered_ids: string[]) => {
    try {
        const { data, error, status } = await supabase
            .from('pages')
            .update({ label: label, ordered_ids: ordered_ids })
            .match({ id: id })

        if (error && status !== 406) {
            throw error;
        }

        if (data) {
            return data[0];
        }

    } catch (error: any) {
        console.error(error.message)
    }
}

