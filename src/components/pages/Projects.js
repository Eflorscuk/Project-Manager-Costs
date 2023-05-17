import { useLocation } from "react-router-dom"

import Message from "../layout/Message"
import styles from "./Projects.module.css"
import Container from "../layout/Container"
import LinkButton from "../layout/LinkButton"

const Projects = () => {
    const location = useLocation()
    let message = ""
    if(location.state) {
        message = location.state.message
    }
    
    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>My Projects</h1>
                <LinkButton to="/newproject" text="Create a new project"/>
            </div>
            {message && <Message type="success" msg={message}/>}
            <Container customClass="start">
                <p>Project...</p>
            </Container>
        </div>
    )
}

export default Projects