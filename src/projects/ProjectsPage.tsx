import React, { useState } from 'react'
import { MOCK_PROJECTS } from './MockProjects'
import ProjectsList from './ProjectsList';
import { Project } from './Project';

const ProjectsPage = () => {
    const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS)

    const saveProject = (project: Project) => {
        let updatedProjects = projects.map((p: Project) => {
            return p.id === project.id ? project : p;
        });
        setProjects(updatedProjects)
    };

    return (
        <>
            <h1>ProjectsPage</h1>
            <ProjectsList projects={projects} onSave={saveProject} />
        </>
    )
}

export default ProjectsPage