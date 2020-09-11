/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FieldType } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetCsvResponses
// ====================================================

export interface GetCsvResponses_getForm_fields {
  __typename: "Field";
  id: string;
  type: FieldType;
  title: string;
}

export interface GetCsvResponses_getForm_responses_entries_field {
  __typename: "Field";
  id: string;
}

export interface GetCsvResponses_getForm_responses_entries_singleChoice {
  __typename: "FieldOption";
  title: string;
}

export interface GetCsvResponses_getForm_responses_entries {
  __typename: "Entry";
  field: GetCsvResponses_getForm_responses_entries_field;
  date: any | null;
  netPromoterScore: number | null;
  rating: number | null;
  singleChoice: GetCsvResponses_getForm_responses_entries_singleChoice | null;
  text: string | null;
}

export interface GetCsvResponses_getForm_responses {
  __typename: "Response";
  entries: GetCsvResponses_getForm_responses_entries[];
}

export interface GetCsvResponses_getForm {
  __typename: "Form";
  fields: GetCsvResponses_getForm_fields[];
  responses: GetCsvResponses_getForm_responses[] | null;
}

export interface GetCsvResponses {
  getForm: GetCsvResponses_getForm | null;
}

export interface GetCsvResponsesVariables {
  id: string;
}
