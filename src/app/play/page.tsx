"use client"

//xiwerab835@wikfee.com
//Venezuela#25

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import dynamic from "next/dynamic";
import Image from "next/image"
import styles from '../page.module.css'
import { db } from "../lib/firebaseConfig"
import { codeValidation } from "../lib/firebaseFunctions"
import { ShowTrivia } from "../components/trivia"
import { ChatGame } from "../components/chatGame"
import toast from "react-hot-toast"
import { onValue, ref, remove, set } from "firebase/database"
import { useGettingAllSelectedUsersAndCountries, useGettingAllSelectedRegions, useGettingDataUsers } from "../hooks/useCustoms"
import { useUser } from '@auth0/nextjs-auth0/client';

const WorldMap = dynamic(()=> import("@/app/components/Map"), {
    ssr:false
});

export default function Page(){
    const { user, isLoading } = useUser() as any;
    const isLogin = {
        //google: ()=> user.sub.match(/google-oauth2/i),
        //facebook: ()=> user.sub.match(/facebook/i),
        //twitter: ()=> user.sub.match(/twitter/i),
        auth: ():boolean => Boolean(user?.sub.match(/auth0/i)),
    };
    const oficialUsername =  isLogin.auth() ? user?.nickname : user?.name.replace(" ", "_") as string;
    const routerGetParams = useSearchParams();
    const routerCode = routerGetParams.get("code") as string;
    const router = useRouter();
    const users = useGettingDataUsers(routerCode);
    const [region, setRegion] = useState<string>("");
    const [isOpenModalChat, setIsOpenModalChat] = useState<boolean>(false);
    
    const selectedRegions = useGettingAllSelectedRegions(routerCode);
    const [statePlaying, setStatePlaying] = useState<boolean>(false);
    const [id_number, setId_Number] = useState<number>(0);
    const [turnFormatNumber, setTurnFormatNumber] = useState<number>(0);
    const [timeQuestions, setTimeQuestions] = useState<boolean>(true);
    const [numberQuestion, setNumberQuestion] = useState<number>(0);
    const [playerToPlay, setPlayerToPlay] = useState<number[]>([]);
    const [time, setTime] = useState<number>(24);

    const allowedCountry:number = Object.keys(selectedRegions).findIndex((el:string) => el === region);
    const [letChooseSelectedCountries, setLetChooseSelectedCountries] = useState<boolean>(true);
    const allCountriesSelectedByAllUsers = useGettingAllSelectedUsersAndCountries(routerCode);
    const [lengthOfCountriesToFinishGaming, setLengthOfCountriesToFinishGaming] = useState<number>(0);
    const [endGaming, setEndGaming] = useState<boolean>(false);
    const [winner, setWinner] = useState<string>("");

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
        set(ref(db, `${routerCode}/invadedCountries/${oficialUsername}/${region}`), {
            id_number,
            region
        });
    };

    const postTimeQuestions = ():void => {
        if(users.length === 0) return;
        set(ref(db, `${routerCode}/timeOfQuestions`), {
            timeQuestions
        });
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

    const postUpdateTurn = ():void => {
        if(users.length === 0) return;
        set(ref(db, `${routerCode}/turnGame`), {
            turnFormatNumber
        });
    };

    const getTurn = ():void => {
        const starCountRef = ref(db, `${routerCode}/turnGame`);

        onValue(starCountRef, (snapshot) => {
            const userPlaying = snapshot.val();
            if(userPlaying === null || userPlaying === undefined) return;
            setTurnFormatNumber(userPlaying["turnFormatNumber"]);
        });
    };

    const postStatePlaying = ():void => {
        if(users.length === 0) return;
        set(ref(db, `${routerCode}/playing`), {
            statePlaying
        });
    };

    const getStatePlaying = ():void => {
        const starCountRef = ref(db, `${routerCode}/playing`);
        onValue(starCountRef, (snapshot) => {
            const stateGame = snapshot.val();
            if(stateGame === null || stateGame === undefined) return setStatePlaying(false);
            setStatePlaying(stateGame["statePlaying"]);
        });
    };

    const deleteCountryFromRival = (user:string):void => {
        if(time !== 0) return;
        const startRef = ref(db, `${routerCode}/invadedCountries/${user}/${region}`);
        remove(startRef);
    };

    const deleteAnswers = ():void => {
        if(users.length === 0) return;
        const startRef = ref(db, `${routerCode}/answers`);
        remove(startRef);
    };

    useEffect(() => {
        getTimeQuestions();
        getNumberQuestion();
        getTurn();
        getStatePlaying();
    }, []);

    useEffect(()=> {
        if(users.length === 0) return;
        toast(
            `${users[users.length - 1]} have joined`,
            {
              duration: 5000,
            }
          );
    }, [users]);

    useEffect(()=> {
        let responseToKeepPages:Promise<boolean> = codeValidation(routerCode);
        responseToKeepPages.then((response) => {
            if(response) return;
            router.push("/");
        });
    }, [routerCode]);

    useEffect(() => {
        if(region.length === 0) return;
        if(oficialUsername !== users[playerToPlay[turnFormatNumber]]){
            toast.error("It isn't your turn");
            return;
        };
        if(allowedCountry !== -1 && letChooseSelectedCountries){
            toast("This country has already onwer. Please by this moment choose another else", { duration: 5000, });
            return;
        };
        if(!letChooseSelectedCountries && oficialUsername === allCountriesSelectedByAllUsers[`${region}`]){
            toast("You have already this country, select other one else");
            return;
        };
        if(!letChooseSelectedCountries){
            let removeCountryFromAnyUser = allCountriesSelectedByAllUsers[`${region}`]; //Remove it to send it to the new conquerer user.
            deleteCountryFromRival(removeCountryFromAnyUser);
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

        if(region.length === 0) return;
        console.log("fuck");
        deleteAnswers();
        setPlayerToPlay([]);
        setTimeQuestions(true);
        setTurnFormatNumber(0);
        setTime(24);
    }, [numberQuestion]);

    useEffect(() => {
        postStatePlaying();
    }, [statePlaying]);
    
    useEffect(()=>{
        if(Object.keys(selectedRegions).length === 0 || lengthOfCountriesToFinishGaming !== Object.keys(selectedRegions).length) return;

        if(lengthOfCountriesToFinishGaming === Object.keys(selectedRegions).length && letChooseSelectedCountries){
            toast.success('End of the Phase 1. Phase 2: Be ready. Its time to conquer it ALL. Its time to be completely a conquerer');
            setLetChooseSelectedCountries(false);
            return;
        };
    }, [selectedRegions]);

    useEffect(()=>{
        if(lengthOfCountriesToFinishGaming === 0 || Object.keys(allCountriesSelectedByAllUsers).length === 0) return;
        if(Object.keys(allCountriesSelectedByAllUsers).length !== lengthOfCountriesToFinishGaming) return;
        let filterUserToGetWinner = Object.values(allCountriesSelectedByAllUsers).filter(el => el === oficialUsername);
        if(filterUserToGetWinner.length !== lengthOfCountriesToFinishGaming) return;
        setEndGaming(true);
        setWinner(filterUserToGetWinner[0]);
    }, [allCountriesSelectedByAllUsers, lengthOfCountriesToFinishGaming]);

    if(isLoading){
        return <h4>Loading...</h4>
    };

    if(!user && !isLoading){
        router.push("/");
    };

    return(
        <>
        {!endGaming &&
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
                        if(users[0] !== oficialUsername) {
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
        }
        
        {endGaming &&
            <div className="panel is-active">
                <div className="d-grid gap-2 col-6 mx-auto p-3">
                    <div className="card text-bg-success">
                        <div className="card-header fw-bold text-center">End of this game, congratulation!! Winner {winner} </div>
                    </div>
                    <button className="btn btn-warning" type="button" onClick={() => {
                        router.push("/");
                    }}>Go Back</button>
                </div>
            </div>
        }

        <div className={styles.containerMap}>
            <Image src="/kompass-compass.gif" className="position-absolute bottom-30 end-0" alt="Compass" width={90} height={90} />
            <Image src="/purple-tentacle.gif" className="position-absolute top-50 start-40 translate-middle" alt="Tentacle" width={90} height={90} />
            <Image src="/chillhop-lofi.gif" className="position-absolute top-0 start-0" alt="Boat" width={90} height={90} />

            <div className={styles.mainMap}>
                <div className="card text-bg-success mb-2" style={{"maxWidth": "18rem"}}>
                    <div className="card-header fw-bold text-center">Code: {routerCode}</div>
                    <div className="card-body">
                        <p className="card-text">You are {oficialUsername}</p>
                        <p className="card-text">{timeQuestions ? "Time to respond, lets put on a test your knowlegdes" : oficialUsername === users[playerToPlay[turnFormatNumber]] ? "It's your turn" : "This turn belongs to " + users[playerToPlay[turnFormatNumber]]}</p>
                    </div>
                </div>

                <WorldMap setRegion={setRegion} setLengthOfCountriesToFinishGaming={setLengthOfCountriesToFinishGaming} />
            </div>
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