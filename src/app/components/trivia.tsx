import { onValue, ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "../lib/firebaseConfig";
import { ClickableHeading } from "./handleClickOption";
import toast from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { useGettingAnswersUsers, useGettingDataTrivia, useGettingDataUsers } from "../hooks/useCustoms";
import { TComponentTrivia } from "../lib/types";

export const ShowTrivia = ({ setTimeQuestions, numberQuestion, setNumberQuestion ,setPlayerToPlay, time, setTime, setTurnFormatNumber }:TComponentTrivia) => {
    const routerGetParams = useSearchParams();
    const username:string = atob(routerGetParams.get("user") as string);
    const routerCode:string  = routerGetParams.get("code") as string;
    const dataTrivia = useGettingDataTrivia(routerCode);
    const users = useGettingDataUsers(routerCode);
    const answersUsers = useGettingAnswersUsers(routerCode);
    const [dataQuestions, setDataQuestions] = useState<{[key:string]:string}>({questions: "", difficulty: "", category: "", correct: ""});
    const [optionsToDisplay, setOptionsToDisplay] = useState<string[]>([]);
    const [selectedOption, setSelectedOption] = useState<string>("");

    const postSeconds = ():void => {
        if(dataTrivia[0] === undefined || dataTrivia[0] === null) return;
        set(ref(db, `${routerCode}/time`), {
            seconds: time
        });
    };

    const getSeconds = ():void => {
        const starCountRef = ref(db, `${routerCode}/time`);
        onValue(starCountRef, (snapshot) => {
            const seconds = snapshot.val();
            if(seconds === null || seconds === undefined) return;
            setTime(seconds["seconds"]);
        });
    };

    const postAnswers = ():void => {
        let ordered_users:number = users.findIndex((lookForIndexUser:string) => lookForIndexUser === username);
        set(ref(db, `${routerCode}/answers/${ordered_users}`), {
            selectedOption,
            username
        });
    };

    useEffect(()=> {
        getSeconds();
    }, []);

    useEffect(()=> {
        let interval = setInterval(()=> {
            if(time > 0){
                setTime((prev) => prev - 1);
            };
        }, 1000);
        
        if(time === 0){
            let getTruesToPlay:boolean[] = answersUsers.map((el:any) =>  el["selectedOption"] === dataQuestions.correct);
            let getIndexOfTrueToPlay:number[] = [];
            
            for(let i:number = 0; i < getTruesToPlay.length; i++){
                if (getTruesToPlay[i] === true){
                    getIndexOfTrueToPlay.push(i);
                };
            };

            toast((t) => (
                <span>
                    <p>{dataQuestions.questions}</p>
                    <p>Answer: <b>{dataQuestions.correct}</b></p>
                </span>
            ));

            setTurnFormatNumber(0);

            if(getIndexOfTrueToPlay.length === 0){
                setNumberQuestion((prev) => prev + 1);
                return;
            };

            if(getIndexOfTrueToPlay.length !== users.length){
                let getFirstUserToValidateMotion:boolean = answersUsers[getIndexOfTrueToPlay[0]]["username"] === username;
                let getCorrectlyUserToPlay:number = getFirstUserToValidateMotion ? users.findIndex(el => el === username) : users.findIndex(el => el === answersUsers[getIndexOfTrueToPlay[0]]["username"]);
                
                for (let index:number = 0; index < getIndexOfTrueToPlay.length; index++) {
                    if(index === 0){
                        getIndexOfTrueToPlay[index] = getCorrectlyUserToPlay;
                    }else{
                        getIndexOfTrueToPlay[index] = users.findIndex(el => el === answersUsers[getIndexOfTrueToPlay[index]]["username"]);
                    };
                };
            };

            setPlayerToPlay(getIndexOfTrueToPlay);
            setTimeQuestions(false);
        };
        
        postSeconds();

        return () => clearInterval(interval);
    }, [time]);

    useEffect(()=> {
        if(dataTrivia[numberQuestion] === undefined || dataTrivia[numberQuestion] === null) return;
        
        setDataQuestions({
            questions: Object.values(dataTrivia[numberQuestion])[4],
            difficulty: Object.values(dataTrivia[numberQuestion])[2],
            category: Object.values(dataTrivia[numberQuestion])[0],
            correct: Object.values(dataTrivia[numberQuestion])[1]
        });
        let arrayOptionsToDisplay:string[] = [];
        let randomPositionCorrectAnswer:number = Math.floor(Math.random() * 4);

        arrayOptionsToDisplay.push(...Object.values(dataTrivia[numberQuestion])[3]);
        arrayOptionsToDisplay.splice(randomPositionCorrectAnswer, 0, Object.values(dataTrivia[numberQuestion])[1]);
        setOptionsToDisplay(arrayOptionsToDisplay);
    }, [dataTrivia, numberQuestion]);

    useEffect(()=> {
        if(selectedOption.length === 0) return;
        postAnswers();
    }, [selectedOption]);

    useEffect(()=> {
        if(users.length === 0) return;
        if(answersUsers.length !== users.length) return;
        setTime(0);
    }, [answersUsers]);

    return(
        <div className={`p-4 mb-2 mt-4 rounded-4 text-center bg-dark-subtle`}>
            <div className="container text-center mb-3">
                <div className="row">
                    <div className="col">
                        <div className="p-2 text-bg-success rounded">Category: {dataQuestions.category}</div>
                    </div>
                    <div className="col">
                        <div className="p-2 text-bg-info rounded">Difficulty: {dataQuestions.difficulty}</div>
                    </div>
                    <div className="col-6">
                        <div className="p-2 fw-bold" dangerouslySetInnerHTML={{ __html: dataQuestions.questions }}></div>
                    </div>
                    <div className="col">
                        <div className="p-2 text-bg-warning rounded">{time} seconds</div>
                    </div>
                </div>
            </div>

            {optionsToDisplay.map((el, index) => <ClickableHeading key={index} 
                data={el} 
                selectedOption={selectedOption} 
                setSelectedOption={setSelectedOption}
                numberQuestion={numberQuestion}
            />)}
        </div>
    );
};