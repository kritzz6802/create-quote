import { gql } from 'apollo-server';

const typeDefs = gql`
type Query{
    users:[User]
    quotes:[QuoteWithName]
    user(_id:ID!):User
    iquotes(by:ID!):[Quote]
    myprofile:User
}
type User{
    _id:ID!
    fname:String!
    lname:String!
    email:String!
    password:String!
    quotes:[QuoteWithName]
}
type Quote{
    by:ID!
    discription:String
    price:String
    name:String
    url:String
}
type Token{
    token:String!
}
type QuoteWithName{
    name:String
    discription:String
    price:String
    url:String
    by:IdName
}
type IdName{
    _id:String
    fname:String
}
input UserInput{
    fname:String!
    lname:String!
    email:String!
    password:String!
}
input UserSigninInput{
    email:String!
    password:String!
}
input product{
    name:String
    discription:String
    price:String
    url:String
}
type Mutation{
    signupUser(userNew:UserInput!):User
    signinUser(userSignin:UserSigninInput!):Token
    createQuote(addproduct:product):QuoteWithName
}
`;
export default typeDefs;