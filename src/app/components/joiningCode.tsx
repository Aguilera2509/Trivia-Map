import Layout from "./layout";
import toast from "react-hot-toast";
import { requestCode } from "../action/requestCode";
import { Loader } from "./loader";
import { useState } from "react";

export function JoiningCode(){
    const [load, setLoad] = useState<boolean>(false);

    const clientActionCode = async (formData:FormData) => {
        const dataUserCode = {
            username: formData.get("username"),
            roomCode: formData.get("roomCode"),
        };

        const response = await requestCode(dataUserCode);
        
        if(response?.error){
            toast.error(response.error);
            setLoad(false);
        };
    };

    return(
        <section>
            <form onSubmit={() => setLoad(true)} action={clientActionCode}>
                <Layout>
                    <h5 className="card-header">Join quickly to have fun</h5>
                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="FormControlUsername" className="form-label">Username</label>
                            <input type="text" className="form-control" id="FormControlUsername" name="username" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="FormControlCode" className="form-label">Code of room</label>
                            <input type="text" className="form-control" name="roomCode" id="FormControlCode" />
                        </div>
                        <div className="d-flex justify-content-end">
                            <button type="submit" className="btn btn-success">Submit</button>
                        </div>
                    </div>
                    {load &&
                        <Loader />
                    }
                </Layout>
            </form>
        </section>
    )
}