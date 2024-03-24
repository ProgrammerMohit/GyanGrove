import React, { useState, useEffect } from "react";
import styled from "styled-components";
const ProjectContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 40px 0px 80px 0px;
  @media (max-width: 960px) {
    padding: 0px;
  }
`;
const ProjectCard = styled.div`
  width: 650px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  padding: 12px 16px;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: all 0.3s ease-in-out;
  &:hover {
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
    cursor: pointer;
  }
  @media only screen and (max-width: 768px) {
    padding: 10px;
    gap: 8px;
    width: 300px;
  }

  border: 0.1px solid #306ee8;
  box-shadow: rgba(23, 92, 230, 0.15) 0px 4px 24px;
`;
const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  padding: 80px 0;
  gap: 12px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

const ProjectName = styled.h2`
  color: white;
  font-size: 20px;
  margin-bottom: 10px;
`;

const Description = styled.p`
  color: #666;
  margin-bottom: 10px;
`;

const Link = styled.a`
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
const Text = styled.p`
  color: white;
`;

const username = process.env.REACT_APP_GITHUB_USERNAME;

function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(`https://api.github.com/users/ProgrammerMohit/repos`)
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

  return (
    <ProjectContainer>
      <Wrapper>
        {projects.map((project) => (
          <ProjectCard key={project.name}>
            <ProjectName>{project.name}</ProjectName>
            <Description>{project.description}</Description>

            <Text>
              <p>
                Technologies Used:{" "}
                <Link >{project.language}</Link>
              </p>
              <p>
                Code Repository: <Link href={project.html_url}>View</Link>
              </p>
              <p>
                Live Site:{" "}
                <Link
                  href={`${project.homepage}`}
                >
                  View
                </Link>
              </p>
            </Text>
          </ProjectCard>
        ))}
      </Wrapper>
    </ProjectContainer>
  );
}

export default ProjectList;
