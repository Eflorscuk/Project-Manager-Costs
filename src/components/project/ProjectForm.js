import { useState, useEffect } from "react"

import styles from "./ProjectForm.module.css"
import Input from "../form/Input"
import Select from "../form/Select"
import SubmitButton from "../form/SubmitButton"

const ProjectForm = ({btnText}) => {
    const [categories, setCategories] = useState([])

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

    console.log('Categories ===>', categories)

    return (
        <form className={styles.form}>
            <Input 
                type="text" 
                text="Project's Name"
                name="name"
                placeholder="Enter project name"
            />
            <Input 
                type="number" 
                text="Enter the total budget"
                name="budget"
                placeholder="Enter the total budget"
            />
            <Select 
                name="category_id"
                text="Select a Category"
                options={categories}
            />
            <SubmitButton text={btnText}/>
            
        </form>
    )
}

export default ProjectForm