/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FieldType } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetForm
// ====================================================

export interface GetForm_getForm_fields_options {
  __typename: "FieldOption";
  id: string;
  title: string;
}

export interface GetForm_getForm_fields {
  __typename: "Field";
  id: string;
  title: string;
  type: FieldType;
  required: boolean;
  options: GetForm_getForm_fields_options[] | null;
  count: number | null;
}

export interface GetForm_getForm {
  __typename: "Form";
  id: string;
  title: string;
  isClosed: boolean | null;
  fields: GetForm_getForm_fields[];
}

export interface GetForm {
  getForm: GetForm_getForm | null;
}

export interface GetFormVariables {
  id: string;
}
