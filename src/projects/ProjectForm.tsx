import React, { useState, SyntheticEvent } from 'react'
import { Project } from './Project'

interface ProjectFormProps {
    initialProject: Project;
    cancelEdit: () => void;
    saveEdit: (project: Project) => void;
}

function ProjectForm({ initialProject, cancelEdit, saveEdit }: ProjectFormProps) {
    const [project, setProject] = useState(initialProject);

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        saveEdit(project);
    };

    const handleChange = (event: any) => {
        const { type, name, value, checked } = event.target;
        // if input type is checkbox use checked
        // otherwise it's type is text, number etc. so use value
        let updatedValue = type === 'checkbox' ? checked : value;

        //if input type is number convert the updatedValue string to a +number
        if (type === 'number') {
            updatedValue = Number(updatedValue);
        }
        const change = {
            [name]: updatedValue,
        };

        let updatedProject: Project;
        // need to do functional update b/c
        // the new project state is based on the previous project state
        // so we can keep the project properties that aren't being edited +like project.id
        // the spread operator (...) is used to
        // spread the previous project properties and the new change
        setProject((p) => {
            updatedProject = new Project({ ...p, ...change });
            return updatedProject;
        });
    };

    return (
        <form className="input-group vertical" onSubmit={handleSubmit}>
            <label htmlFor="name">Project Name</label>
            <input type="text" name="name" value={project.name} onChange={handleChange} />
            <label htmlFor="description">Project Description</label>
            <textarea name="description" value={project.description} onChange={handleChange} />
            <label htmlFor="budget">Project Budget</label>
            <input type="number" name="budget" value={project.budget} onChange={handleChange} />
            <label htmlFor="isActive">Active?</label>
            <input type="checkbox" name="isActive" checked={project.isActive} onChange={handleChange} />
            <div className="input-group">
                <button type="submit" className="primary bordered medium">Save</button>
                <span />
                <button type="button" className="bordered medium" onClick={cancelEdit}>
                    cancel
                </button>
            </div>
        </form>
    )
}

export default ProjectForm