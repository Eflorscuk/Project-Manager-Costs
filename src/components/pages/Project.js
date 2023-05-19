import { parse, v4 as uuidv4 } from 'uuid'

import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

import styles from "./Project.module.css"
import Loading from '../layout/Loading'
import Container from '../layout/Container'
import ProjectForm from '../project/ProjectForm'
import Message from '../layout/Message'
import ServiceForm from "../service/ServiceForm"
import ServiceCard from '../service/ServiceCard'

const Project = () => {
    const {id} = useParams()

    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [message, setMessage] = useState()
    const [type, setType] = useState()
    const [showServiceForm, setShowServiceForm] = useState(false)


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
                    setServices(data.services)
                })
                .catch(err => console.error(err))    
        }, 3000)
    }, [id])

    function editPost(project) {
        setMessage('')
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

    function createService (project) {
        // last service
        setMessage('')
        const lastService = project.services[project.services.length - 1]
        lastService.id = uuidv4()
        const lastServiceCost = lastService.cost
        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        // max value validation
        if(newCost > parseFloat(project.budget)) {
            setMessage('Budget exceeded, check the value of the service')
            setType('error')
            project.services.pop()
            return false
        }

        // add service cost to project total cost
        project.cost = newCost
        
        // update project
        fetch(`http://localhost:8084/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project),
        })
            .then(resp => resp.json())
            .then(data => {
                // show services
                setShowServiceForm(false)
            })
            .catch(err => console.log(err))
    }

    function removeService() {
        console.log('Removed')
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
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
                        <div className={styles.service_form_container}>
                                <h2>Add a service</h2>
                                <button className={styles.btn} onClick={toggleServiceForm}>
                                    {!showServiceForm ? 'Add Service' : 'Close'}
                                </button>
                                <div className={styles.project_info}>
                                    {showServiceForm && (
                                        <ServiceForm 
                                            handleSubmit={createService}
                                            btnText="Add Service"
                                            projectData={project}
                                        />
                                    )}
                                </div>
                        </div>
                        <h2>Services</h2>
                        <Container customClass="start">
                            {services.length > 0 && services.map(service => (
                                <ServiceCard
                                    id={service.id}
                                    name={service.name}
                                    cost={service.cost}
                                    description={service.description}
                                    key={service.id}
                                    handleRemove={removeService}
                                ></ServiceCard>
                            ))}
                            {services.length === 0 && <p>There are no registered services.</p>}
                        </Container>
                    </Container>
                </div>) : (
                <Loading />
            )}
        </>
    )
}

export default Project