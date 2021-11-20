import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";

import Header from "./components/header/header.component";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInUpPage from "./pages/sign-in-and-sign-up/sign-in-up.component";
import { auth, createUserProfileDoc } from "./firebase/firebase.utils";

const HatsPage = () => (
  <div>
    <h1>HATS PAGE </h1>
  </div>
);

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDoc(userAuth);

        userRef.onSnapshot((snapShot) => {
          this.setState(
            {
              currentUser: {
                id: snapShot.id,
                ...snapShot.data(),
              },
            },
            () => {
              console.log(this.state);
            }
          );
        });
      }
      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currenUser} />
        <Switch>
          <Route exact path="/" component={HomePage}></Route>
          <Route exact path="/hats" component={HatsPage}></Route>
          <Route exact path="/shop" component={ShopPage}></Route>
          <Route exact path="/sign-in" component={SignInUpPage}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
