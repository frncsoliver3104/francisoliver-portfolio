import style from './FooterStyles.module.css'

function Footer() {
    return (
        <section id='footer' className={style.container}>
            <p>&copy; 2025 Francis Oliver Villanueva.</p>
            <p id='p2'>All rights reserved.</p>
        </section>
    )
}

export default Footer