import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

export type TfirebaseConfig = {
    apiKey: string,
    authDomain: string,
    databaseURL: string,
    projectId: string,
    storageBucket: string,
    messagingSenderId: string,
    appId: string,
    measurementId: string
};

export type TComponentTrivia = {
    setTimeQuestions: Dispatch<SetStateAction<boolean>>,
    numberQuestion: number,
    setNumberQuestion: Dispatch<SetStateAction<number>>,
    setPlayerToPlay: Dispatch<SetStateAction<number[]>>,
    time:number,
    setTime: Dispatch<SetStateAction<number>>,
    setTurnFormatNumber: Dispatch<SetStateAction<number>>
};

export type TComponentMap = {
    setRegion:Dispatch<SetStateAction<string>>,
    timeQuestions:boolean
};

export type TComponentClickableHeading = {
    data:string, 
    selectedOption:string, 
    setSelectedOption:Dispatch<SetStateAction<string>>, 
    numberQuestion:number
};

export const TodoSchema = z.object({
    username: z.string({
        required_error: "Username is required"
    }).trim().toLowerCase().min(3, {
        message: "Error: Username must be at least 3 character long."
    }).max(20, {
        message: "Error: Username must be at most 20 character long."
    })
});

export const TodoSchemaCode = z.object({
    username: z.string({
        required_error: "Username is required"
    }).trim().toLowerCase().min(3, {
        message: "Error: Username must be at least 3 character long."
    }).max(20, {
        message: "Error: Username must be at most 20 character long."
    }),
    roomCode: z.string({
        required_error: "Code is required"
    }).trim().toLowerCase().length(8, {
        message: "Code must have 8 characters"
    })
});

export type Todo = z.infer<typeof TodoSchema>
export type TodoCode = z.infer<typeof TodoSchemaCode>
