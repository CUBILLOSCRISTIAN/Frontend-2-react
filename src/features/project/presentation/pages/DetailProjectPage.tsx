import { useParams } from "react-router-dom";
import { Content } from "../components/Content";
import { useGetOneProject } from "../hooks/useGetOneProject";

export const DetailProjectPage = () => {
  const { projectId } = useParams();

  const { project } = useGetOneProject(projectId || "");

  return <div>{project && <Content project={project} />}</div>;
};
