import { motion } from 'framer-motion';
import '../../styles/hero.scss';

function Hero() {
    const containerVariants = {
        hidden: {
            opacity: 0,
            y: '-100vh',
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                ease: 'easeInOut',
            },
        },
    };

    return (
        <>
            <motion.section
                className="hero_section"
                id="home"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div
                    className="hero"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, ease: 'easeInOut', delay: 0.5 }}
                >
                    <div className="hero_content">
                        <motion.h1
                            className="hero_text"
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: 'easeInOut', delay: 1 }}
                        >
                            <span>Creative Full-Stack Developer</span>
                        </motion.h1>
                        <div className="hero_subtext">
                            <p>Building innovative and dynamic websites that leave a lasting impression.</p>
                        </div>
                    </div>
                </motion.div>
            </motion.section>
            <div className="hero_observer"></div>
        </>
    );
}

export default Hero;
