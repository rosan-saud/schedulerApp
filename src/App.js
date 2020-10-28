import React, { useEffect, useState } from "react";
import SideNav from "./components/sideNav";
import Form from "./components/form";
import View from "./components/View";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  HttpLink,
} from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: "https://alert-pug-56.hasura.app/v1/graphql",
    }),
    cache: new InMemoryCache(),
  });
};

function App(props) {
  const [scheduleData, setData] = useState("");
  const [client, setClient] = useState("");

  function startApollo() {
    let data = createApolloClient;
    setClient(data);
  }

  useEffect(() => {
    startApollo();
  }, []);

  return client ? (
    <ApolloProvider client={client}>
      <div className="main-cont">
        <SideNav />
        {/*  or use as SideNav() */}

        <div className="body-cont">
          <Switch>
            <Route path="/view" exact>
              <View recievedSchedule={scheduleData} />
            </Route>
            <Route path="/">
              <Form
                saveSchedule={(data) => {
                  setData(data);
                  props.history.push("/view");
                }}
              />
            </Route>
          </Switch>
        </div>
      </div>
    </ApolloProvider>
  ) : (
    "Loading"
  );
}

export default withRouter(App);
