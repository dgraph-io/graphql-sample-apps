import { gql } from 'apollo-boost';


export const USER_LISTS =  () => {
    return gql`
        query {
            queryUser {
                id
                screen_name
                name
            }
        }
       `
}
