"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import styles from '../page.module.css'
import { onValue, ref, remove, set } from "firebase/database"
import { db } from "../lib/firebaseConfig"
import { WorldMap } from "../components/Map"
import { ShowTrivia } from "../components/trivia"
import { ChatGame } from "../components/chatGame"
import toast from "react-hot-toast"
import { useGettingAllSelectedRegions, useGettingDataUsers, useGettingStatePlaying } from "../hooks/useCustoms"

export default function Page(){
    const routerGetParams = useSearchParams();
    const username:string = atob(routerGetParams.get("user") as string);
    const routerCode:string  = routerGetParams.get("code") as string;
    const router = useRouter();
    const [region, setRegion] = useState<string>("");
    const [isOpenModalChat, setIsOpenModalChat] = useState<boolean>(false);
    const users = useGettingDataUsers(routerCode);
    const selectedRegions = useGettingAllSelectedRegions(routerCode);
    const { statePlaying, setStatePlaying } = useGettingStatePlaying(routerCode);
    const [id_number, setId_Number] = useState<number>(0);
    const [turnFormatNumber, setTurnFormatNumber] = useState<number>(0);
    const [timeQuestions, setTimeQuestions] = useState<boolean>(true);
    const [numberQuestion, setNumberQuestion] = useState<number>(0);
    const [playerToPlay, setPlayerToPlay] = useState<number[]>([]);
    const [time, setTime] = useState<number>(24);

    const idColorMap = ():void => {
        let id: number;
        let validId: number;

        if (window.sessionStorage.getItem("id") !== null) {
            setId_Number(parseInt(window.sessionStorage.getItem("id") as string));
            return;
        };
    
        if (id_number === 0) {
            do {
                id = Math.floor(Math.random() * 100);
                validId = Object.values(selectedRegions).findIndex(el => el === id);
            } while (validId !== -1);
            setId_Number(id);
        } else {
            window.sessionStorage.setItem("id", id_number.toString());
        };
    };

    const postYourRegionsToFirebase = ():void => {
        const id_country:number = Date.now();
        const allowedCountry:number = Object.keys(selectedRegions).findIndex((el:string) => el === region);

        if(allowedCountry === -1 && username === users[playerToPlay[turnFormatNumber]]){
            set(ref(db, `${routerCode}/invadedCountries/${username}/${id_country}`), {
                id_number,
                region
            });
        };
    };

    const getTimeQuestions = ():void => {
        const starCountRef = ref(db, `${routerCode}/timeOfQuestions`);
    
        onValue(starCountRef, (snapshot) => {
            const time = snapshot.val();
        
            if(time === null) return;

            setTimeQuestions(time["timeQuestions"]);
        });
    };

    const postNumberQuestion = ():void => {
        if(users.length === 0) return;
        set(ref(db, `${routerCode}/numberQuestion`), {
            numberQuestion
        });
    };

    const getNumberQuestion = ():void => {
        const starCountRef = ref(db, `${routerCode}/numberQuestion`);
    
        onValue(starCountRef, (snapshot) => {
            const questionNumber = snapshot.val();
        
            if(questionNumber === null) return;

            setNumberQuestion(questionNumber["numberQuestion"]);
        });
    };

    const deleteAnswers = ():void => {
        if(time !== 0) return;
        const startRef = ref(db, `${routerCode}/answers`);
        remove(startRef);
    };

    const getTurn = ():void => {
        const starCountRef = ref(db, `${routerCode}/turnGame`);

        onValue(starCountRef, (snapshot) => {
            const userPlaying = snapshot.val();
            if(userPlaying === null || userPlaying === undefined) return;
            setTurnFormatNumber(userPlaying["turnFormatNumber"]);
        });
    };

    const postUpdateTurn = ():void => {
        if(users.length === 0) return;
        set(ref(db, `${routerCode}/turnGame`), {
            turnFormatNumber
        });
    };

    const postTimeQuestions = ():void => {
        if(users.length === 0) return;
        set(ref(db, `${routerCode}/timeOfQuestions`), {
            timeQuestions
        });
    };

    const postStatePlaying = ():void => {
        if(users.length === 0) return;
        set(ref(db, `${routerCode}/playing`), {
            statePlaying
        });
    };

    useEffect(() => {
        getTimeQuestions();
        getNumberQuestion();
        getTurn();
    }, []);

    useEffect(()=> {
        //For a while
        if(routerCode.length === 8) return;
        router.push("/");
    }, [routerCode]);

    useEffect(() => {
        if(region.length === 0) return;
        if(username !== users[playerToPlay[turnFormatNumber]]){
            toast.error("It isn't your turn");
            return
        };

        postYourRegionsToFirebase();

        if(turnFormatNumber + 1 === users.length){
            setNumberQuestion((prev) => prev + 1);
        }else{
            setTurnFormatNumber((prev) => prev + 1);
        };
    }, [region]);

    useEffect(() => {
        idColorMap();
    }, [id_number]);
    
    useEffect(() => {
        postUpdateTurn();

        if(users.length === 0) return;
        if(users[playerToPlay[turnFormatNumber]] === undefined && !timeQuestions){
            setNumberQuestion((prev) => prev + 1);
        };
    }, [turnFormatNumber]);

    useEffect(() => {
        postTimeQuestions();
    }, [timeQuestions]);

    useEffect(() => {
        postNumberQuestion();
        
        if(users.length === 0) return;
        setPlayerToPlay([]);
        setTimeQuestions(true);
        setTurnFormatNumber(0);
        setTime(24);
        deleteAnswers();
    }, [numberQuestion]);

    useEffect(() => {
        postStatePlaying();
    }, [statePlaying]);
    
    return(
        <>
         <div className={!timeQuestions ? "panel" : "panel is-active"}>
            {statePlaying && 
            <ShowTrivia
                setTimeQuestions={setTimeQuestions} 
                numberQuestion={numberQuestion}
                setNumberQuestion={setNumberQuestion} 
                setPlayerToPlay={setPlayerToPlay} 
                time={time}
                setTime={setTime}
                setTurnFormatNumber={setTurnFormatNumber}
            />
            }

            {!statePlaying &&
            <div className="d-grid gap-2 col-6 mx-auto p-3">
                <div className="card text-bg-success">
                    <div className="card-header fw-bold text-center">Code: {routerCode}</div>
                </div>
                <button className="btn btn-warning" type="button" onClick={() => {
                    if(users[0] !== username) {
                        toast((t) => (
                            <span>
                              The person who have to begin the game is: {users[0]}
                              <br />
                              <button className="btn btn-info" onClick={() => toast.dismiss(t.id)}>
                                I got it
                              </button>
                            </span>
                        ));
                        return;
                    };
                    setStatePlaying(true);
                }}>Start Game!!!!</button>
            </div>
            }
        </div>

        <div className={styles.containerMap}>
            {<div className={styles.mainMap}>
                <div className="card text-bg-success" style={{"maxWidth": "18rem"}}>
                    <div className="card-header fw-bold text-center">Code: {routerCode}</div>
                    <div className="card-body">
                        <p className="card-text">You are {username}</p>
                        <p className="card-text">{timeQuestions ? "Time to respond, lets put on a test your knowlegdes" : username === users[playerToPlay[turnFormatNumber]] ? "It's your turn" : "This turn belongs to " + users[playerToPlay[turnFormatNumber]]}</p>
                    </div>
                </div>

                {timeQuestions &&
                    <WorldMap 
                        setRegion={setRegion} 
                        timeQuestions={timeQuestions} 
                    />
                }

                {!timeQuestions &&
                    <WorldMap 
                        setRegion={setRegion} 
                        timeQuestions={timeQuestions} 
                    />
                }
            </div>}
        </div>
        
        <div className="chat-container">
            <div className="bubble">
                <button type="button" className="btn btn-danger" onClick={() => setIsOpenModalChat(!isOpenModalChat)}>Chat</button>
            </div>
        </div>

        {isOpenModalChat &&
            <ChatGame />
        }
        </>
    );
};