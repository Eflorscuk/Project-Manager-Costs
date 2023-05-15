import styles from "./ProjectForm.module.css"

const ProjectForm = () => {
    return (
        <form>
            <div>
                <input text="text" placeholder="Enter project name" />
            </div>
            <div>
                <input text="number" placeholder="Enter the total budget" />
            </div>
            <div>
                <select name="category_id">
                    <option Disabled>Select the Category</option>
                </select>
            </div>
            <div>
                <input type="submit" value="Create Project" />
            </div>
        </form>
    )
}

export default ProjectForm