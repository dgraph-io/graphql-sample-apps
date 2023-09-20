import React, { FC } from 'react';
import { useSubscription } from 'urql';
import { Error, NotificationResponse, Notification, NotificationData } from './Notif';

const NotificationSubQuery = `
subscription subscribeCategory {
    queryCategory(first:100) {
        id
        name
        }
}
`
const Message:FC = () => {
    const handleSubscription = (
        notifications: NotificationResponse[] | undefined,
        notification: NotificationResponse  
      ) =>  {
        return [notification]
      }
  const [subscription] = useSubscription<
    NotificationResponse,
    NotificationResponse[]
  >({ query: NotificationSubQuery }, handleSubscription);

  if (subscription.error) {
    return <Error>{subscription.error.message}</Error>;
  }

  return <>
    {subscription.data?.map(notif => (
      notif.queryCategory.map( d => <Notification key={d.id} {...d} />)
    
  ))}
  </>
};



export default Message