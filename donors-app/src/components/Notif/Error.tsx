import React, { FC } from 'react';
export interface ErrorResponse {
    children: any;
  }
export const Error: FC<ErrorResponse> = props => (
  <>
    <h4>Error</h4>
    <p>Something went wrong</p>
    <p>Message: {props.children}</p>
  </>
);