import { gql } from '@apollo/client';

export const CHATBOX_SUBSCRIPTION = gql`
    subscription message(
        $name1: String!
        $name2: String!
    ){
        message(
            name1: $name1
            name2: $name2
        ){
            mutation
            data{
                sender{
                    name
                }
                body
            }
        }
    }
`;
