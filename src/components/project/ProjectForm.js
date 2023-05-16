import { useState, useEffect } from "react"

import styles from "./ProjectForm.module.css"
import Input from "../form/Input"
import Select from "../form/Select"
import SubmitButton from "../form/SubmitButton"

const ProjectForm = ({ handleSubmit, btnText, projectData }) => {
    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})

    useEffect(() => {
        fetch("http://localhost:8084/categories", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(resp => resp.json())
        .then(data => {
            setCategories(data)
        })
        .catch(err => console.error('====> ', err))
    }, [])

    const submit = e => {
        e.preventDefault()
        console.log(project)
        handleSubmit(project)
    }

    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value })
    }

    function handleCategory(e) {
        setProject({ ...project, category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
        }})
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input 
                type="text" 
                text="Project's Name"
                name="name"
                placeholder="Enter project name"
                handleOnChange={handleChange}
                value={project.name ? project.name : ''}
            />
            <Input 
                type="number" 
                text="Enter the total budget"
                name="budget"
                placeholder="Enter the total budget"
                handleOnChange={handleChange}
                value={project.budget}
            />
            <Select 
                name="category_id"
                text="Select a Category"
                options={categories}
                handleOnChange={handleCategory}
                value={project.category ? project.category.id : ''}
            />
            <SubmitButton text={btnText}/>
            
        </form>
    )
}

export default ProjectForm