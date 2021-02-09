/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetSurveys
// ====================================================

export interface GetSurveys_getUser_forms_responses {
  __typename: "Response";
  id: string;
}

export interface GetSurveys_getUser_forms {
  __typename: "Form";
  id: string;
  title: string;
  responses: GetSurveys_getUser_forms_responses[] | null;
  isClosed: boolean | null;
}

export interface GetSurveys_getUser {
  __typename: "User";
  forms: (GetSurveys_getUser_forms | null)[] | null;
}

export interface GetSurveys {
  getUser: GetSurveys_getUser | null;
}

export interface GetSurveysVariables {
  email: string;
}
