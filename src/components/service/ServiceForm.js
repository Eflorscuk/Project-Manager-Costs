import { useState } from "react"

import Input from "../form/Input"
import SubmitButton from "../form/SubmitButton"

import styles from "../project/ProjectForm.module.css"

const ServiceForm = ({handleSubmit, btnText, projectData}) => {
    const [service, setService] = useState({})
    
    const submit = (e) => {
        e.preventDefault()
        projectData.services.push(service)
        handleSubmit(projectData)
    }

    const handleChange = (e) => {
        setService({...service, [e.target.name]:e.target.value})
    }

    return(
        <form onSubmit={submit} className={styles.form}>
            <Input
                type="text"
                text="Service Name"
                name="name"
                placeholder="Enter service name"
                handleOnChange={handleChange}
            ></Input>
            <Input
                type="number"
                text="Service Cost"
                name="cost"
                placeholder="Enter total budget"
                handleOnChange={handleChange}
            ></Input>
            <Input
                type="text"
                text="Service Description"
                name="description"
                placeholder="Service Description"
                handleOnChange={handleChange}
            ></Input>
            <SubmitButton text={btnText}></SubmitButton>
        </form>
    )
}

export default ServiceForm