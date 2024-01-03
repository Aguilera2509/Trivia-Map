export default function Login() {
    let styleLogin:string = "btn btn-warning m-3 fs-5 d-block";
    return <a href="/api/auth/login" className={styleLogin}>Login</a>;
};