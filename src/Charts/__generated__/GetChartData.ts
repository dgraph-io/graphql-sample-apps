/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FieldType } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetChartData
// ====================================================

export interface GetChartData_getForm_fields_entries_singleChoice {
  __typename: "FieldOption";
  title: string;
}

export interface GetChartData_getForm_fields_entries {
  __typename: "Entry";
  netPromoterScore: number | null;
  rating: number | null;
  singleChoice: GetChartData_getForm_fields_entries_singleChoice | null;
  text: string | null;
}

export interface GetChartData_getForm_fields {
  __typename: "Field";
  title: string;
  type: FieldType;
  count: number | null;
  entries: GetChartData_getForm_fields_entries[] | null;
}

export interface GetChartData_getForm {
  __typename: "Form";
  title: string;
  fields: GetChartData_getForm_fields[];
}

export interface GetChartData {
  getForm: GetChartData_getForm | null;
}

export interface GetChartDataVariables {
  id: string;
}
