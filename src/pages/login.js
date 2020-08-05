import React, {useEffect} from "react";
import { Redirect } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import Content from '../components/content';
import { Navbar } from '../components/navbar';
import Loading from "../components/loading";


import {GET_USER, ADD_USER} from "../gql/queryData"
import { useQuery, useMutation } from "@apollo/react-hooks";
import useImperativeQuery from "../utils/imperativeQuery"

const Login = () => {

  const [addUser] = useMutation(ADD_USER);
  const getUsers = useImperativeQuery(GET_USER)
  const { isLoading, user } = useAuth0();

  const createUser = async () => {
    if (user === undefined) {
      return null;
    }
    const { data: getUser } = await getUsers({
      username: user.email
    });
    if (getUser && getUser.getUser === null) {
      console.log("Creating new user...", user)
      const newUser = {
        username: user.email,
        name: user.nickname,
        isMod: false,
      };
      addUser({
        variables: {
          user: newUser
        }
      })
    }
  }

  useEffect( () => {
    createUser()
  }, [user])

  if(isLoading){
      return <Loading />
  }

  return <>
    <Navbar title="Logging in..." color="primary" />
    <Content>
    <Redirect to="/home" />
    </Content>
  </>
}

export default Login;
