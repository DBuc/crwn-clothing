import React from 'react';
import HomePage from './pages/homepage/homepage.component';
import { Switch, Route } from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';

/*const HomePage = (props) => {
  console.log("HomePage props=", props)
  return (<div><h1>HOME PAGE</h1></div>)
};

const TopicsList = (props) => {
  console.log("TopicsList props=", props)
  return (<div><h1>HATS PAGE</h1></div>);
};
const TopicDetail = (props) => {
  console.log("TopicDetail props=", props)
  return (<div><h1>TOPIC DETAIL PAGE</h1></div>)
};
*/

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
      </Switch>
    </div>
  );
}

export default App;
