import {useState, useEffect} from "react";
import type { Project } from './types/Project';

function ProjectList(){

const[projects, setProjects] = useState<Project[]>([]);
const [pageSize, setPageSize] = useState<number>(10);

useEffect(() => {
    const fetchProjects = async() => {
        const response = await fetch(`https://localhost:5000/api/water/AllProjects?pageHowMany=${pageSaize}`);
        const data = await response.json();
        setProjects(data);
    }
    fetchProjects()
}, []);

    return(
        <><h1> Water Projects</h1>
        <br/>
        {projects.map((p) =>
        <div id="projectCard" className="card" key={p.projectID}>
            <h3 className="card-title">{p.projectName}</h3>
                <div className="card-body">
                   <ul className="list-unstyled">
                <li><strong>Project Type:</strong> {p.projectType}</li>
                <li><strong>RegionalProgram</strong>: {p.projectRegionalProgram}</li>
                <li><strong>Impact:</strong> {p.projectImpact} Individuals Served</li>
                <li><strong>Project Phase: </strong> {p.projectPhase}</li>
                <li><strong>Project Status: </strong> {p.projectFunctionalityStatus}</li>
                    </ul> 
                </div>
            
        </div>
        
        )}
        <br></br>
        <label>
            Results per page:
            <select value={pageSize} onChange={(p) => setPageSize(Number(p.target.value))}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
            </select>
        </label>
        </>
    );
}

export default ProjectList;