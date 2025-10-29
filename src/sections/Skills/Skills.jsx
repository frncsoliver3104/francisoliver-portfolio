import style from './SkillsStyles.module.css'
import checkMarkIcon from '../../assets/checkmark-dark.svg'
import SkillList from '../../common/SkillList'

function Skills() {
    return (
        <section id='skills' className={style.container}>
            <h1 className='sectionTitle'>Skills</h1>
            <div className={style.skillList}>
                <SkillList src={checkMarkIcon} p="Java"></SkillList>
                <SkillList src={checkMarkIcon} p="Python"></SkillList>
                <SkillList src={checkMarkIcon} p="JavaScript"></SkillList>
            </div>
            <hr />
            <div className={style.skillList}>
                <SkillList src={checkMarkIcon} p="HTML"></SkillList>
                <SkillList src={checkMarkIcon} p="CSS"></SkillList>
            </div>
        </section>
    )
}

export default Skills