import { useState } from "react";
import { requestQuestions } from "../action/requestQuestions";
import Layout from "./layout";
import toast from "react-hot-toast";
import { Loader } from "./loader";

export function CreatingCode(){
    const [load, setLoad] = useState<boolean>(false);

    const clientActionQuestions = async (formData:FormData) => {
        const dataUserQuestions = {
            username: formData.get("username"),
        };

        const response = await requestQuestions(dataUserQuestions);
        if(response?.error){
          toast.error(response.error);
          setLoad(false);
        };
    };

    return(
        <section>
            <form onSubmit={() => setLoad(true)} action={clientActionQuestions}>
                <Layout>
                    <h5 className="card-header">Features of Your Game, have Fun</h5>
                    <div className="card-body">
                        <div className="mb-3">
                            <label htmlFor="FormControlUsername" className="form-label">Username</label>
                            <input type="text" className="form-control" id="FormControlUsername" name="username" />
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