import styles from './ProjectsStyles.module.css'
import ProjectCard from '../../common/ProjectCard'
import ProductDesign from '../../assets/UIChallengeProductDesign.jpg'
import EventorLogo from '../../assets/eventor logo.png'
import XhibitLogo from '../../assets/XHIBIT LOGO.png'
import AwesomeTodos from '../../assets/awesometodos.png'


function Projects() {
    return (
        <section id='projects' className={styles.container}>
            <h1 className='sectionTittle'>Projects</h1>
            <div className={styles.projectsContainer}>
                < ProjectCard
                    src={ProductDesign}
                    h3="UI Challenge Product Design"
                    p="A simple practice on how to design if you want to be a Graphic Designer."
                />
                < ProjectCard
                    src={EventorLogo}
                    h3="Eventor"
                    p="A Web Application for upcoming school events for students so they can't miss any event."
                />
                < ProjectCard
                    src={XhibitLogo}
                    h3="Xhibit"
                    p="Web Application for showcasing IT/Computer Science Students/Graduates Projects."
                />
                < ProjectCard
                    src={AwesomeTodos}
                    h3="Awesome Todos"
                    p="Front-end and Back-end application about listing todo task for easy remembering<br> made using MERN Stacks, A individual task for Integrative Programming last year. "
                />
            </div>
        </section>
    )
}

export default Projects