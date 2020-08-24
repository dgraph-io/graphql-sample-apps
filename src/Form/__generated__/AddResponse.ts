/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddResponseInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: AddResponse
// ====================================================

export interface AddResponse_addResponse_response {
  __typename: "Response";
  id: string;
}

export interface AddResponse_addResponse {
  __typename: "AddResponsePayload";
  response: (AddResponse_addResponse_response | null)[] | null;
}

export interface AddResponse {
  addResponse: AddResponse_addResponse | null;
}

export interface AddResponseVariables {
  response: AddResponseInput;
}
