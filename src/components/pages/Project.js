import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

import styles from "./Project.module.css"
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'

const Project = () => {
    const {id} = useParams()

    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()

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

    function editPost(project) {
        // Budget Validation
        if(project.budget < project.cost) {
            setMessage('The budget cannot be less than the cost of the project!')
            setType('error')
            return false
        }

        fetch(`http://localhost:8084/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(project),
        })
            .then(resp => resp.json())
            .then(data => {
                setProject(data)
                setShowProjectForm(false)
                setMessage('Updated Project')
                setType('success')
                
            })
            .catch(err => console.error(err))
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    return (
        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column">
                        {message && <Message type={type} msg={message}></Message>}
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
                                    <ProjectForm 
                                        handleSubmit={editPost}
                                        btnText="Finish Editing"
                                        projectData={project}
                                    ></ProjectForm>
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