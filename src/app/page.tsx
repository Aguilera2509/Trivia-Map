"use client"

import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import Layout from './components/layout';
import Login from './login';
import Logout from './logout';

export default function Home() {
  const { user, error, isLoading } = useUser();
  let styleCreateAndJoinRoom:string = "btn btn-success m-3 fs-5 d-block";

  if(isLoading){
    return <h4>Loading...</h4>
  };

  return(
    <Layout>
      <h5 className="card-header">Create a room to play with your friends or join them</h5>
      <div className="card-body text-center">
        {user &&
          <>
            <Link href="/createRoom" className={styleCreateAndJoinRoom}>Create</Link>
            <Link href="/joinRoom" className={styleCreateAndJoinRoom}>Join</Link>
            <Logout />
          </>
        }
        {!user && 
          <Login />
        }

        <div className="alert alert-warning" role="alert">
          Si todo lo que pudo salir mal, ha salido mal, contactar / Any problem, suggestion and more, contacting Ja846699@gmail.com
        </div>
      </div>

      
      <h5 className="card-header mt-3 text-center">Instruction to play</h5>
      <div className="card-body text-center">
        This game is based in conquering world&apos;s spot across knowlegde to win. When you start to play immediately a trivia show up to you and your friends,
        you all must to read the question and answer it correctly if you do you have a chance to conquer a spot selecting it by yourself. When all spots are conquered
        before winning the trivia will continue until one person get all the spots. Make sure to do zoom in the map
      </div>

    </Layout> 
  );
};
