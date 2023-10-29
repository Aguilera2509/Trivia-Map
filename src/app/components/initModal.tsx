import Link from "next/link";
import Layout from "./layout";

export function InitModal(){
    return(
        <Layout>
            <h5 className="card-header">Create a room to play with your friends or join them</h5>
            <div className="card-body text-center">
                <Link href="/createRoom" className="btn btn-success m-2 fs-5 d-block">Create</Link>
                <br />
                <Link href="/joinRoom" className="btn btn-success m-2 fs-5 d-block">Join</Link>
            </div>
        </Layout>
    )
}