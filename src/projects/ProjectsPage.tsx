import React, { useEffect, useState } from 'react'
import { MOCK_PROJECTS } from './MockProjects'
import ProjectsList from './ProjectsList';
import { Project } from './Project';
import { projectApi } from '../services/projectApi';

const ProjectsPage = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);

    useEffect(() => {
        async function loadProjects() {
            setLoading(true);
            try {
                const projectsResponse = await projectApi.get(1, 1000);
                setError('');
                setProjects(projectsResponse);
            } catch (e) {
                if (e instanceof Error) {
                    setError(e.message);
                }
            } finally {
                setLoading(false);
            }
        }
        loadProjects();
    }, []);

    const saveProject = (project: Project) => {

        projectApi.put(project)
            .then((updatedProject: Project) => {
                let updatedProjects = projects.map((p: Project) => {
                    return p.id === project.id ? updatedProject : p;
                });
                setProjects(updatedProjects)
            })
            .catch((e) => {
                if (e instanceof Error) {
                    setError(e.message);
                }
            });
    };

    return (
        <>
            <h1>ProjectsPage</h1>
            {
                error &&
                <div className='error-block'>
                    <p><span className="icon-alert"></span>{error}</p>
                </div>
            }
            <ProjectsList projects={projects} onSave={saveProject} />
            {
                loading &&
                <div className="center-page">
                    <span className="spinner primary"></span>
                    <p>Loading...</p>
                </div>
            }
        </>
    )
}

export default ProjectsPage