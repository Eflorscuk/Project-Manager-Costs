import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"

import Message from "../layout/Message"
import styles from "./Projects.module.css"
import Container from "../layout/Container"
import LinkButton from "../layout/LinkButton"
import ProjectCard from "../project/ProjectCard"
import Loading from "../layout/Loading"

const Projects = () => {
    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)

    const location = useLocation()
    let message = ""
    if(location.state) {
        message = location.state.message
    }

    useEffect(_ => {
        setTimeout(_ => {
            fetch('http://localhost:8084/projects', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(resp => resp.json())
                .then(data => {
                    console.log('======>', data)
                    setProjects(data)
                    setRemoveLoading(true)
            })
            .catch(err => console.error('====>', err))
        }, 1500)
    }, [])
    
    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>My Projects</h1>
                <LinkButton to="/newproject" text="Create a new project"/>
            </div>
            {message && <Message type="success" msg={message}/>}
            <Container customClass="start">
                {projects.length > 0 && projects.map(project => (
                    <ProjectCard 
                        id={project.id}
                        name={project.name}
                        budget={project.budget}
                        category={project.category.name}
                        key={project.id}
                    ></ProjectCard>
                ))}
                {!removeLoading && <Loading />}
                {!removeLoading && projects.length === 0 && (
                    <p>There are no projects available</p>
                )}
            </Container>
        </div>
    )
}

export default Projects