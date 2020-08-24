/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddFormInput } from "../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: AddForm
// ====================================================

export interface AddForm_addForm_form {
  __typename: "Form";
  id: string;
}

export interface AddForm_addForm {
  __typename: "AddFormPayload";
  form: (AddForm_addForm_form | null)[] | null;
}

export interface AddForm {
  addForm: AddForm_addForm | null;
}

export interface AddFormVariables {
  form: AddFormInput;
}
