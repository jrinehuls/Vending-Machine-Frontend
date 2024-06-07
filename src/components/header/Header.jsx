import styles from "./Header.module.css"

function Header() {

    function logout() {
        localStorage.removeItem('token');
    }

    return(
        <div>
            <header>
                <nav className={styles.navbar}>
                    <span>Vending Machine</span>
                    <div className={styles.linkContainer}>
                        <a href="/">Show Snacks</a>
                    </div>
                </nav>
            </header>
        </div>
    );
}

export default Header;
