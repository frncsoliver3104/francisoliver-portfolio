import './ProjectCard.css';

function ProjectCard({ link, src, h3, p }) {
    return (
        <a href={link} target='_blank'>
            <img className="hover" src={src} alt={`${h3} logo`} />
            <h3 dangerouslySetInnerHTML={{ __html: h3 }} />
            <hr/>
            <p dangerouslySetInnerHTML={{ __html: p }} className="project-description" />
        </a>
    )
}

export default ProjectCard