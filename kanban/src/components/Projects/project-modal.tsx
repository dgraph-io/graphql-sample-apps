import { useAuth0 } from "@auth0/auth0-react";
import React, { Fragment, useState } from "react";
import { Header, Image, Modal, Form, Button } from "semantic-ui-react";
import { Project } from "../../types/graphql";
import updateCacheAfterDelete from "../../utils/updateCacheAfterDelete";

import {
  useGetProjectDetailsQuery,
  useAddProjectMutation,
  useUpdateProjectDetailsMutation,
  useAllUsersQuery,
  useDeleteProjectMutation,
} from "./types/operations";

const CLAIMS = process.env.REACT_APP_AUTH0_CLAIMS_KEY as string

export interface ProjectModalProps {
  closeModal?: () => void;
  projID?: string;
}

function useFormButton(project: Partial<Project>, closeModal: () => void) {
  const { user, isAuthenticated } = useAuth0();

  const [addProjectMutation] = useAddProjectMutation({
    refetchQueries: ["allProjectsDetails"],
  });

  const [updtProjectMutation] = useUpdateProjectDetailsMutation();

  const [deleteProject] = useDeleteProjectMutation({
    update: updateCacheAfterDelete
  })

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Form.Button
        disabled={!isAuthenticated || !project.name || !user.email}
        onClick={() => {
          project.admin = { username: user.email };
          if (project.name && project.admin) {
            const { projID, __typename, admin, ...proj } = project;
            projID
              ? updtProjectMutation({
                  variables: {
                    id: projID,
                    details: { ...proj, admin: { username: admin.username } },
                  },
                })
              : addProjectMutation({
                  variables: { proj: { ...project, name: project.name } },
                });

            closeModal();
          }
        }}
      >
        Save Project
      </Form.Button>
      {Boolean(project.projID) && (
        <Button
          inverted
          negative
          color="red"
          onClick={() =>
            deleteProject({ variables: { projID: project.projID as string } })
          }
        >
          Delete
        </Button>
      )}
    </div>
  );
}

function SelectUser({
  getUser,
  setUser,
}: {
  getUser: () => string | undefined;
  setUser: (username: string) => void;
}) {
  const { data, loading, error } = useAllUsersQuery();
  if (error) {
    console.error(error);
  }

  // TODO: This should use the userWithIcon component to render with a github icon
  const users = data?.queryUser
    ? data?.queryUser.map((user) => ({
        value: user?.username,
        text: user?.displayName,
        icon: "doctor",
      }))
    : [];

  return (
    <Form.Select
      fluid
      loading={loading}
      label="Project Admin"
      icon="user plus"
      options={users}
      placeholder="Select an Admin"
      value={getUser()}
      onChange={(_, { value }) => {
        if (value) {
          setUser(value.toString());
        }
      }}
    />
  );
}

function ProjectModal(props: ProjectModalProps) {
  const { user } = useAuth0();
  const isAdmin =
    user?.[CLAIMS]?.isAdmin || false;
  const header = props.projID ? "Edit Project" : "Add New Project";
  const [project, setProject] = useState<Partial<Project>>({});
  const noop = () => {};
  const closeModal = props.closeModal ?? noop;

  const {
    loading: projectDataLoading,
    error: projectDataError,
  } = useGetProjectDetailsQuery({
    variables: {
      projID: props.projID ?? "0x1",
    },
    onCompleted: (data) => {
      if (data.getProject) {
        setProject(data.getProject);
      }
    },
  });

  if (projectDataError) {
    console.error(projectDataError);
  }

  const loading = !!props.projID && projectDataLoading;

  return (
    <Fragment>
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content image>
        <Image
          wrapped
          size="medium"
          src="https://img.icons8.com/dusk/256/000000/new-job.png"
        />
        <Modal.Description style={{ flexGrow: 1 }}>
          <Header>Project Details</Header>
          <Form>
            <Form.Input
              fluid
              loading={loading}
              label="Project Name"
              placeholder="Project Name (required)"
              value={project?.name || ""}
              onChange={(_, { value }) =>
                setProject({ ...project, name: value })
              }
            />
            {isAdmin && (
              <SelectUser
                getUser={() => project.admin?.username}
                setUser={(username: string) =>
                  setProject({ ...project, admin: { username } })
                }
              />
            )}
            <Form.Input
              loading={loading}
              label="Project URL"
              placeholder="E.G. GitHub URL (optional)"
              value={project?.url || ""}
              onChange={(_, { value }) =>
                setProject({ ...project, url: value })
              }
            />

            <Form.TextArea
              label="Project Description"
              placeholder="A short description of the project (optional)"
              value={project.description ? project.description : ""}
              onChange={(_, { value }) =>
                setProject({ ...project, description: value?.toString() })
              }
            />

            {useFormButton(project, closeModal)}
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Fragment>
  );
}

export default ProjectModal;
