/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateForm
// ====================================================

export interface UpdateForm_updateForm_form {
  __typename: "Form";
  isClosed: boolean | null;
}

export interface UpdateForm_updateForm {
  __typename: "UpdateFormPayload";
  numUids: number | null;
  form: (UpdateForm_updateForm_form | null)[] | null;
}

export interface UpdateForm {
  updateForm: UpdateForm_updateForm | null;
}

export interface UpdateFormVariables {
  id: string;
  isClosed: boolean;
}
