import { supabase } from "./supabaseClient"

/*
    TEXT QUESTION
*/
export const fetchTextQuestion = async () => {
    try {
        let { data, error, status } = await supabase
            .from('text_question')
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

export const insertTextQuestion = async () => {
    try {
        const { data, error, status } = await supabase
            .from('text_question')
            .insert([{}]);

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

export const updateTextQuestion = async (id: number, label: string, solution: string) => {
    try {
        const { data, error, status } = await supabase
            .from('text_question')
            .update({ label: label, solution: solution })
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
    CHOICE QUESTION
*/
export const fetchChoiceQuestion = async () => {
    try {
        let { data, error, status } = await supabase
            .from('choice_question')
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

export const insertChoiceQuestion = async () => {
    try {
        const { data, error, status } = await supabase
            .from('choice_question')
            .insert([{}]);

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

export const updateChoiceQuestion = async (id: number, label: string, choices: string[], solution: string[]) => {
    try {
        const { data, error, status } = await supabase
            .from('choice_question')
            .update({ label: label, choices: choices, solution: solution })
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
