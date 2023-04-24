import React, { useState, SyntheticEvent, useEffect } from 'react'
import { Project } from './Project'

interface ProjectFormProps {
    initialProject: Project;
    cancelEdit: () => void;
    saveEdit: (project: Project) => void;
}

interface formValidationErrors {
    name: string;
    description: string;
    budget: string;
}

function ProjectForm({ initialProject, cancelEdit, saveEdit }: ProjectFormProps) {
    const [project, setProject] = useState(initialProject);
    const [errors, setErrors] = useState<formValidationErrors>();

    const handleSubmit = () => {
        if (isProjectFormValid()) {
            saveEdit(project);
        }
    };

    const validateProjectForm = (project: Project): void => {
        let errors: formValidationErrors = {
            name: '',
            description: '',
            budget: ''
        };

        if (!project.name) {
            errors.name = 'The project name is required.';
        } else if (project.name.length < 3) {
            errors.name = 'The project name must be longer than 3 characters.';
        }

        if (!project.description) {
            errors.description = 'The project description is required';
        }

        if (project.budget <= 0) {
            errors.budget = 'The project budget must be greater than 0';
        }

        setErrors(errors);
    }

    const isProjectFormValid = (): boolean => {
        if (errors) {
            return (
                errors.name.length === 0 &&
                errors.description.length === 0 &&
                errors.budget.length === 0
            );
        }

        return true;
    }

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
            validateProjectForm(updatedProject);
            return updatedProject;
        });

    };

    return (
        <form className="input-group vertical">
            <label htmlFor="name">Project Name</label>
            <input type="text" name="name" value={project.name} onChange={handleChange} />
            <label htmlFor="description">Project Description</label>
            <textarea name="description" value={project.description} onChange={handleChange} />
            <label htmlFor="budget">Project Budget</label>
            <input type="number" name="budget" value={project.budget} onChange={handleChange} />
            <label htmlFor="isActive">Active?</label>
            <input type="checkbox" name="isActive" checked={project.isActive} onChange={handleChange} />
            <div className="input-group">
                <button type="button" className="primary bordered medium" onClick={handleSubmit}>Save</button>
                <span />
                <button type="button" className="bordered medium" onClick={cancelEdit}>
                    cancel
                </button>
            </div>

            {
                errors &&
                <>
                    {
                        (errors.name.length > 0 || errors.description.length > 0 || errors.budget.length > 0) &&
                        <div className="error-block">
                            <h3>Invalid Form:</h3>
                            <ul>
                                {errors.name.length > 0 && <li>{errors.name}</li>}
                                {errors.description.length > 0 && <li>{errors.description}</li>}
                                {errors.budget.length > 0 && <li>{errors.budget}</li>}
                            </ul>
                        </div>
                    }

                </>
            }

        </form>
    )
}

export default ProjectForm