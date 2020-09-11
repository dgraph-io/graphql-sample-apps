/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteForm
// ====================================================

export interface DeleteForm_deleteForm_form {
  __typename: "Form";
  id: string;
}

export interface DeleteForm_deleteForm {
  __typename: "DeleteFormPayload";
  form: (DeleteForm_deleteForm_form | null)[] | null;
}

export interface DeleteForm {
  deleteForm: DeleteForm_deleteForm | null;
}

export interface DeleteFormVariables {
  id: string;
}
