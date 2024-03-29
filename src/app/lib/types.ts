import { Dispatch, SetStateAction } from "react";
import { z } from "zod";

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
    dataOption:string, 
    selectedOption:string, 
    setSelectedOption:Dispatch<SetStateAction<string>>, 
    numberQuestion:number
};

export const TodoSchemaCode = z.string({
        required_error: "Code is required"
    }).trim().toLowerCase().length(8, {
        message: "Code must have 8 characters"
    }
)

export type TodoCode = z.infer<typeof TodoSchemaCode>