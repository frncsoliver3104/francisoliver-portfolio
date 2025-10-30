function SkillList({src, p}) {
    return (
        <span className="skill-item">
            <img src={src} alt="Checkmark Icon" />
            <p>{p}</p>
        </span>)
}

export default SkillList