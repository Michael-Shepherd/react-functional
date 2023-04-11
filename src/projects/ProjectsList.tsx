import React, { useState } from 'react'
import { Project } from './Project'
import ProjectCard from './ProjectCard'
import ProjectForm from './ProjectForm'

interface ProjectsListProps {
    projects: Project[];
    onSave: (project: Project) => void;
}

function ProjectsList({ projects, onSave }: ProjectsListProps) {
    const [projectBeingEdited, setProjectBeingEdited] = useState({});

    const handleEditProject = (project: Project) => {
        setProjectBeingEdited(project);
    };

    const handleCancelEditProject = () => {
        setProjectBeingEdited({});
    }

    const items = projects.map(project => (
        <div key={project.id} className="col-sm">
            {project === projectBeingEdited ? <ProjectForm initialProject={project} cancelEdit={handleCancelEditProject} saveEdit={onSave} /> : <ProjectCard project={project} onEditFunction={handleEditProject}></ProjectCard>}
        </div>
    ));
    return <div className="row">{items}</div>;
}

export default ProjectsList