import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "../lib/firebaseConfig";

export const useGettingDataUsers = (routerCode:string):string[] => {
    const [users, setUsers] = useState<string[]>([]);
    const starCountRef = ref(db, `${routerCode}/users`);
        
    useEffect(()=> {
        onValue(starCountRef, (snapshot)=> {
            const usersFromFirebase = snapshot.val();
            let usersFormatArray:string[] = [];

            if(usersFromFirebase === null || usersFromFirebase === undefined) return setUsers([]);
            Object.values(usersFromFirebase).forEach((el:any) => {
                usersFormatArray.push(el["username"]);
            });

            setUsers(usersFormatArray);
        });
    }, []);

    return users
};

export const useGettingDataTrivia = (routerCode:string):string[] => {
    const [trivia, setTrivia] = useState<string[]>([]);
    const starCountRef = ref(db, `${routerCode}/trivia/dataTrivia`);
    
    useEffect(()=> {
        onValue(starCountRef, (snapshot) => {
            const questionsTrivia = snapshot.val();
    
           setTrivia(questionsTrivia);
        });
    }, []);

    return trivia;
};

const convertDataToObject = (data:{[key:string]:{[key:string]:{[key:string]:string | number}}}):{[key:string]:number} => {
    let countriesFormatCompleletyObject:{[key:string]:number} = {};
    let getAllCountries:{[key:string]:number}[] = [];

    Object.entries(data).forEach((el:any) => {
        for (const key in el[1]) {
            const countriesFormatObject = {
                [el[1][key].region as string]: el[1][key].id_number as number
            };
        getAllCountries.push(countriesFormatObject);
        };
    });

    getAllCountries.forEach(formatObject => {
        countriesFormatCompleletyObject[Object.keys(formatObject).toString()] = parseInt(Object.values(formatObject).toString());
    });

    return countriesFormatCompleletyObject;
};

export const useGettingAllSelectedRegions = (routerCode:string):{[key:string]:number} => {
    const [allSelectedRegions, setAllSelectedRegions] = useState<{[key:string]:number}>({});
    const starCountRef = ref(db, `${routerCode}/invadedCountries`);

    useEffect(() => {
        onValue(starCountRef, (snapshot) => {
            const regionsSelected:{[key:string]:{[key:string]:{[key:string]:string | number}}} = snapshot.val();
    
            if(regionsSelected === null || regionsSelected === undefined) return setAllSelectedRegions({});
        
            setAllSelectedRegions((prev) => ({...prev, ...convertDataToObject(regionsSelected)}));
        });
    }, []);

    return allSelectedRegions;
};

export const useGettingAnswersUsers = (routerCode:string):string[] => {
    const [answersUsers, setAnswersUsers] = useState<string[]>([]);
    const starCountRef = ref(db, `${routerCode}/answers`);

    useEffect(() => {
        onValue(starCountRef, (snapshot) => {
            const lengthAnswers = snapshot.val();
            if(lengthAnswers === null || lengthAnswers === undefined) return setAnswersUsers([]);
            setAnswersUsers(Object.values(lengthAnswers));
        });
    }, []);

    return answersUsers;
};

export const useGettingMessagesUsers = (routerCode:string):string[] => {
    const [readMessages, setReadMessages] = useState<string[]>([]);
    const starCountRef = ref(db, `${routerCode}/messages`);
    
    useEffect(() => {
        onValue(starCountRef, (snapshot) => {
            const messagesFromFirebase = snapshot.val();
            if(messagesFromFirebase === null || messagesFromFirebase === undefined) return;
            setReadMessages(Object.values(messagesFromFirebase));
        });
    }, []);

    return readMessages;
};


export const useGettingStatePlaying = (routerCode:string) => {
    const [statePlaying, setStatePlaying] = useState<boolean>(false)
    const starCountRef = ref(db, `${routerCode}/playing`);

    useEffect(() => {
        onValue(starCountRef, (snapshot) => {
            const stateGame = snapshot.val();
            if(stateGame === null || stateGame === undefined) return;
            setStatePlaying(stateGame["statePlaying"]);
        });
    }, []);

    return{
        statePlaying,
        setStatePlaying
    };
};