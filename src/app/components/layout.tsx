import styles from '../page.module.css'

export default function Layout({ children }: { children: React.ReactNode }){
    return(
        <main className={styles.main}>
            <div className={styles.background}>
                <div className={styles.center}>
                    <div className="card" style={{"opacity": "92%", "width": "28vw"}}>
                        {children}
                    </div>
                </div>
            </div>
        </main>
    )
}