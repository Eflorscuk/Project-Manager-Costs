import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

import styles from "./Project.module.css"

const Project = () => {
    const {id} = useParams()

    const [project, setProject] = useState([])

    useEffect(() => {
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
    }, [id])

    return (
        <div>
            <p>{project.name}</p>
        </div>
    )
}

export default Project