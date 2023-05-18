import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

import styles from "./Project.module.css"
import Loading from '../layout/Loading'
import Container from '../layout/Container'

const Project = () => {
    const {id} = useParams()

    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)

    useEffect(() => {
        setTimeout(_ => {
            fetch(`http://localhost:8084/projects/${id}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(resp => resp.json())
                .then(data => {
                    setProject(data)
                })
                .catch(err => console.error(err))    
        }, 3000)
    }, [id])

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    return (
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column">
                        <div className={styles.details_container}>
                            <h1>Project: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm ? 'Edit Project' : 'Close'}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Category: {project.category.name}</span>
                                    </p>
                                    <p>
                                        <span>Total Budget: R$ {project.budget}</span>
                                    </p>
                                    <p>
                                        <span>Total Used: R$ {project.cost}</span>
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <p>Form</p>
                                </div>
                            )}
                        </div>
                    </Container>
                </div>) : (
                <Loading />
            )}
        </>
    )
}

export default Project