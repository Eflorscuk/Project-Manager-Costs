import { useNavigate } from 'react-router-dom'

import styles from "./NewProject.module.css"
import ProjectForm from "../project/ProjectForm"

const NewProject = () => {
    const navigate = useNavigate()

    function createPost(project) {
        // initialize cost and services
        project.cost = 0
        project.services = []

        fetch("http://localhost:8084/projects", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data)
                // redirect
                navigate('/projects', { state: { message: 'Project created successfully!' } })
            })
            .catch(err => console.error('=======>', err))
    }


    return (
        <div className={styles.newproject_container}>
            <h1>New Project</h1>
            <p>Create your project and then add the services.</p>
            <ProjectForm handleSubmit={createPost} btnText="Project Create"/>
        </div>
    )
}

export default NewProject