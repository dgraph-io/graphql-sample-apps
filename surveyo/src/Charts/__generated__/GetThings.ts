/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FieldType } from "../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetThings
// ====================================================

export interface GetThings_getForm_fields_entries_singleChoice {
  __typename: "FieldOption";
  title: string;
}

export interface GetThings_getForm_fields_entries {
  __typename: "Entry";
  rating: number | null;
  singleChoice: GetThings_getForm_fields_entries_singleChoice | null;
  text: string | null;
}

export interface GetThings_getForm_fields {
  __typename: "Field";
  title: string;
  type: FieldType;
  count: number | null;
  entries: GetThings_getForm_fields_entries[] | null;
}

export interface GetThings_getForm {
  __typename: "Form";
  title: string;
  fields: GetThings_getForm_fields[];
}

export interface GetThings {
  getForm: GetThings_getForm | null;
}

export interface GetThingsVariables {
  id: string;
}
