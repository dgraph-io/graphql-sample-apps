import React from 'react';

export interface NotificationData {
  id: string;
  name: string;
}
export interface NotificationResponse {
  queryCategory: NotificationData[];
}

export const Notification: React.FC<NotificationData> = props => (
  <li>{props.id} - {props.name}</li>
);