import './ProjectCard.css';

function ProjectCard({ link, src, h3, p }) {
    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / card.offsetWidth) * 100;
        const y = ((e.clientY - rect.top) / card.offsetHeight) * 100;
        
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
    };

    return (
        <a 
            href={link} 
            target='_blank' 
            onMouseMove={handleMouseMove}
        >
            <img className="hover" src={src} alt={`${h3} logo`} />
            <h3 dangerouslySetInnerHTML={{ __html: h3 }} />
            <hr/>
            <p dangerouslySetInnerHTML={{ __html: p }} className="project-description" />
        </a>
    )
}

export default ProjectCard