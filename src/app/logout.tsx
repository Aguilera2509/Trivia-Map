export default function Logout() {
    let styleLogout:string = "btn btn-danger m-3 fs-5 d-block";
    return <a href="/api/auth/logout" className={styleLogout}>Logout</a>;
};