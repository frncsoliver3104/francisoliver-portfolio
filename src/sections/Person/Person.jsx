import styles from './PersonStyles.module.css'
import personalImage from '../../assets/pogi.jpg'
import sun from '../../assets/sun.svg'
import moon from '../../assets/moon.svg'
import githubLight from '../../assets/github-light.svg'
import githubDark from '../../assets/github-dark.svg'
import facebookLight from '../../assets/facebook-light.svg'
import facebookDark from '../../assets/facebook-dark.svg'
import instagramLight from '../../assets/instagram-light.svg'
import instagramDark from '../../assets/instagram-dark.svg'
import linkedinLight from '../../assets/linkedin-light.svg'
import linkedinDark from '../../assets/linkedin-dark.svg'
import { useTheme } from '../../common/ThemeContext'
import Navbar from '../../common/Navbar'
import BackgroundAnimation from '../../common/BackgroundAnimation'

function Person() {
    const { theme, toggleTheme } = useTheme();

    const themeIcon = theme === 'light' ? sun : moon
    // use dark icons on light theme and light icons on dark theme for proper contrast
    const githubIcon = theme === 'light' ? githubDark : githubLight
    const facebookIcon = theme === 'light' ? facebookDark : facebookLight
    const instagramIcon = theme === 'light' ? instagramDark : instagramLight
    const linkedinIcon = theme === 'light' ? linkedinDark : linkedinLight

    return (
        <section id='person' className={styles.container}>
            <BackgroundAnimation />

            <div className={styles.colorModeContainer}>
                <img
                    className={styles.person}
                    src={personalImage}
                    alt="Website personal profile picture of Francis Oliver Villanueva."
                />
                <img
                    className={styles.colorMode}
                    src={themeIcon}
                    alt="Color mode icon."
                    onClick={toggleTheme}
                    style={{cursor: 'pointer'}}
                />
            </div>

            <div className={styles.info}>
                <h1>
                    Francis Oliver
                    <br />
                    Villanueva
                </h1>

                <h2>Front-end Developer</h2>

                <span>
                    <a href="https://github.com/frncsoliver3104" target='_blank'>
                        <img src={githubIcon} alt="Github Icon."/>
                    </a>
                    <a href="https://www.facebook.com/franz.villanueva.39501" target='_blank'>
                        <img src={facebookIcon} alt="Facebook Icon." />
                    </a>
                    <a href="https://www.instagram.com/frrrrancs.dgaf/" target='_blank'>
                        <img src={instagramIcon} alt="Instagram Icon." />
                    </a>
                    <a href="https://www.linkedin.com/in/francis-oliver-villanueva-525803359/" target='_blank'>
                        <img src={linkedinIcon} alt="LinkedIn Icon." />
                    </a>
                </span>

                <p className={styles.description}>
                    Hi i'm a third-year Bachelor of Science in Information Technology student at the Western Institute of Technology with a focus on front-end development. I build accessible, responsive user interfaces and continuously learn modern web technologies to solve real-world problems. I'm driven to grow professionally and contribute to practical, user-centered projects.
                </p>

            </div>

        </section>
    )
}

export default Person