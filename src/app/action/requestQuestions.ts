"use server"

//xiwerab835@wikfee.com
//Venezuela#25

import { addUsers, dataTrivia, saveMap } from "../lib/firebaseFunctions";
import { getSession } from '@auth0/nextjs-auth0';

const placesToValidate:string[] = ["africaMill", "dzMill", "arMill", "asiaMill", "auMill", "atMill", "beMill", "brMill", "caMill", "usIlChicagoMill", "cnMill", "coMill", "dkMill", "europeMill",
"frMill", "frRegionsMill", "frRegions_2016Mill", "deMill", "inMill", "iranMill", "itMill", "itRegionsMill", "nlMill", "usNyNewYorkMill", "nzMill", "northAmericaMill", "noMill",
"oceaniaMill", "plMill", "ptMill", "ruMill", "ruFdMill", "zaMill", "southAmericaMill", "krMill", "esMill", "seMill", "chMill", "thMill", "trMill", "ukRegionsMill", "ukCountriesMill",
"usMill", "veMill", "worldMill"];

export async function requestQuestions(formData:FormDataEntryValue, username:string) {
  const { user } = await getSession() as any;
  const id_db:string = crypto.randomUUID();
  const short_id_db:string = id_db.substring(0,8);
  const itemFound:number = placesToValidate.findIndex((itemToFind:string) => itemToFind === formData);

  if(itemFound === -1){
    return {
      error: "That Spot is not allowed, user. Refresh and try again"
    };
  };
    
  const isLogin = {
    //google: ()=> user.sub.match(/google-oauth2/i),
    //facebook: ()=> user.sub.match(/facebook/i),
    //twitter: ()=> user.sub.match(/twitter/i),
    auth: ():boolean => Boolean(user?.sub.match(/auth0/i)),
  };
  const oficialUsername:string = isLogin.auth() ? user?.nickname : username.replace(" ", "_");

  addUsers(short_id_db, oficialUsername, user.picture);
  saveMap(short_id_db, formData);

  const url_getToken:string = "https://opentdb.com/api_token.php?command=request";
  const request_token:Response = await fetch(url_getToken, { cache:"no-cache" });
  const getTokenFormatJson:any = await request_token.json();
  let allDataTriviaApi:string[] = [];
  let amountQuestions:number = 50;
  
  const urls:string[] = [
    `https://opentdb.com/api.php?amount=${amountQuestions}&type=multiple&token=${getTokenFormatJson["token"]}`,
    `https://opentdb.com/api.php?amount=${amountQuestions}&type=multiple&token=${getTokenFormatJson["token"]}`,
    `https://opentdb.com/api.php?amount=${amountQuestions}&type=multiple&token=${getTokenFormatJson["token"]}`,
    `https://opentdb.com/api.php?amount=${amountQuestions}&type=multiple&token=${getTokenFormatJson["token"]}`,
    `https://opentdb.com/api.php?amount=${amountQuestions}&type=multiple&token=${getTokenFormatJson["token"]}`
  ];

  let count:number = 0;

  const requestAllQuestions = () => {
    fetch(urls[count], { cache:"no-cache" })
    .then((response) => response.json())
    .then((data) => {

      allDataTriviaApi.push(...data.results);
      count++;

      if(count === urls.length){
        dataTrivia(short_id_db, allDataTriviaApi);
      }else{
        setTimeout(requestAllQuestions, 5050);
      };

    })
  };

  requestAllQuestions();

  return {
    code: short_id_db
  };
    
};