"use client"

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import Layout from "../components/layout";
import { Loader } from "../components/loader";
import { ErrPressingButton, ErrApiAlert } from "../components/errsAlert";
import { addUsers, dataTrivia, saveMap } from "../lib/firebaseFunctions";
import toast from "react-hot-toast";
import { useUser } from '@auth0/nextjs-auth0/client';

type TOptionsToPlay = {
    value: string;
    label: string;
};

const optionsToPlay:TOptionsToPlay[] = [
    { value:"africaMill", label:"Africa" },
    { value:"dzMill", label:"Algeria" },
    { value:"arMill", label:"Argentina" },
    { value:"asiaMill", label:"Asia" },
    { value:"auMill", label:"Australia" },
    { value:"atMill", label:"Austria" },
    { value:"beMill", label:"Belgium" },
    { value:"brMill", label:"Brazil" },
    { value:"caMill", label:"Canada" },
    { value:"usIlChicagoMill", label:"Chicago" },
    { value:"cnMill", label:"China" },
    { value:"coMill", label:"Colombia" },
    { value:"dkMill", label:"Denmark" },
    { value:"europeMill", label:"Europe" },
    { value:"frMill", label:"France" },
    { value:"frRegionsMill", label:"France Regions" },
    { value:"frRegions_2016Mill", label:"France Regions 2016" },
    { value:"deMill", label:"Germany" },
    { value:"inMill", label:"India" },
    { value:"iranMill", label:"Iran" },
    { value:"itMill", label:"Italy" },
    { value:"itRegionsMill", label:"Italy Regions" },
    { value:"nlMill", label:"Netherlands" },
    { value:"usNyNewYorkMill", label:"New York" },
    { value:"nzMill", label:"New Ziland" },
    { value:"northAmericaMill", label:"NorthAmerica" },
    { value:"noMill", label:"Norway" },
    { value:"oceaniaMill", label:"Oceania" },
    { value:"plMill", label:"Poland" },
    { value:"ptMill", label:"Portugal" },
    { value:"ruMill", label:"Russia" },
    { value:"ruFdMill", label:"Russia Federal Districts" },
    { value:"zaMill", label:"SouthAfrica" },
    { value:"southAmericaMill", label:"SouthAmerica" },
    { value:"krMill", label:"SouthKorea" },
    { value:"esMill", label:"Spain" },
    { value:"seMill", label:"Sweden" },
    { value:"chMill", label:"Switzerland" },
    { value:"thMill", label:"Thailand" },
    { value:"trMill", label:"Turkey" },
    { value:"ukRegionsMill", label:"UkRegions" },
    { value:"ukCountriesMill", label:"United Kingdom Countries" },
    { value:"usMill", label:"United States" },
    { value:"veMill", label:"Venezuela" },
    { value:"worldMill", label:"The Whole World" },
];

const placesToValidate:string[] = ["africaMill", "dzMill", "arMill", "asiaMill", "auMill", "atMill", "beMill", "brMill", "caMill", "usIlChicagoMill", "cnMill", "coMill", "dkMill", "europeMill",
"frMill", "frRegionsMill", "frRegions_2016Mill", "deMill", "inMill", "iranMill", "itMill", "itRegionsMill", "nlMill", "usNyNewYorkMill", "nzMill", "northAmericaMill", "noMill",
"oceaniaMill", "plMill", "ptMill", "ruMill", "ruFdMill", "zaMill", "southAmericaMill", "krMill", "esMill", "seMill", "chMill", "thMill", "trMill", "ukRegionsMill", "ukCountriesMill",
"usMill", "veMill", "worldMill"];

export default function Page(){
    const router = useRouter();
    const [load, setLoad] = useState<boolean>(false);
    const [err, setErr] = useState<boolean>(false);
    const { user, isLoading } = useUser() as any;
    const [optionFromSelectTag, setOptionFromSelectTag] = useState<string>("africaMill");
    const [allDataTriviaApi, setAllDataTriviaApi] = useState<string[]>([]);
    const [id_db, setId_db] = useState<string>(crypto.randomUUID());
    const [short_id_db, setShort_id_db] = useState<string>(id_db.substring(0,8));
    const [errApiTrivia, setErrApiTrivia] = useState<boolean>(false);

    const handleChange = (e:React.ChangeEvent<HTMLSelectElement>):void =>{
        setOptionFromSelectTag(e.target.value);
    };

    const clientActionQuestions = async (e:FormEvent<HTMLFormElement>):Promise<void> => {
        e.preventDefault();

        setErrApiTrivia(false);
        setLoad(true);
        if(user === null || user === undefined) return setErr(true);
        setErr(false);
        const itemFound:number = placesToValidate.findIndex((itemToFind:string) => itemToFind === optionFromSelectTag);
        const isLogin = {
            //google: ()=> user.sub.match(/google-oauth2/i),
            //facebook: ()=> user.sub.match(/facebook/i),
            //twitter: ()=> user.sub.match(/twitter/i),
            auth: ():boolean => Boolean(user?.sub.match(/auth0/i)),
        };
        const oficialUsername:string = isLogin.auth() ? user?.nickname : user?.name.replace(" ", "_");
        
        if(itemFound === -1){
            toast.error("That Spot is not allowed, user. Refresh and try again");
            return;
        };

        //addUsers(short_id_db, oficialUsername, user?.picture);
        //saveMap(short_id_db, optionFromSelectTag);

        const url_getToken:RequestInfo = "https://opentdb.com/api_token.php?command=request";
        const request_token:Response = await fetch(url_getToken, { cache:"no-cache" });
        const getTokenFormatJson:any = await request_token.json();
        let amountQuestions:number = 50;
        let count:number = 0;

        const urls:string[] = [
            `https://opentdb.com/api.php?amount=${amountQuestions}&type=multiple&token=${getTokenFormatJson["token"]}`,
            `https://opentdb.com/api.php?amount=${amountQuestions}&type=multiple&token=${getTokenFormatJson["token"]}`,
            `https://opentdb.com/api.php?amount=${amountQuestions}&type=multiple&token=${getTokenFormatJson["token"]}`,
            `https://opentdb.com/api.php?amount=${amountQuestions}&type=multiple&token=${getTokenFormatJson["token"]}`,
            `https://opentdb.com/api.php?amount=${amountQuestions}&type=multiple&token=${getTokenFormatJson["token"]}`
        ];
        let dataTrivia:string[] = [];

        const requestAllQuestions = ():void => {
            fetch(urls[count], { cache:"no-cache" })
            .then((response:Response) => response.json())
            .then((data:any) => {
                dataTrivia.push(...data.results);
                count++;
        
                if(count === urls.length){
                    setAllDataTriviaApi(dataTrivia);
                    addUsers(short_id_db, oficialUsername, user?.picture);
                    saveMap(short_id_db, optionFromSelectTag);
                }else{
                    setTimeout(requestAllQuestions, 5050);
                };
            }).catch(error => {
                console.log(error);
                setErrApiTrivia(true);
                setLoad(false);
            })
        };

        requestAllQuestions();
    };

    useEffect(()=> {
        if(allDataTriviaApi.length === 0) return;
        dataTrivia(short_id_db, allDataTriviaApi);
        setTimeout(() => {
            router.push(`play?code=${short_id_db}`);
        }, 3500);
    }, [allDataTriviaApi]);

    if(isLoading){
        return <h4>Loading...</h4>
    };

    if(!user && !isLoading){
        router.back();
    };

    return(
        <section>
            <form onSubmit={clientActionQuestions}>
                <Layout>
                    <h5 className="card-header">Features of Your Game, have Fun</h5>
                    <div className="card-body">
                        <div className="mb-3">
                            <label className="form-label" htmlFor="optionChosenFromSelectTag">Choose where you wanna play</label>
                            <select className="form-select" id="optionChosenFromSelectTag" name="optionFromSelectTag" value={optionFromSelectTag} onChange={handleChange} aria-label="Default select example">
                                {optionsToPlay.map((option) => (
                                    <option value={option.value} key={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button type="submit" className="btn btn-success">Submit</button>
                        </div>
                        <div className="d-flex justify-content-start">
                            <Link href="/" role="button" className="btn btn-info">Back</Link>
                        </div>
                    </div>
                    {load &&
                    <>
                        <div className="alert alert-success" role="alert">
                            Sorry, due to the database we are using this process can take 24 seconds, user
                        </div>
                        <Loader />
                    </>
                    }
                    {err &&
                        <ErrPressingButton />
                    }
                    {errApiTrivia &&
                        <ErrApiAlert />
                    }
                </Layout>
            </form>
        </section>
    )
};