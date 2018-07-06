import React from 'react';
import Aux from '../../hoc/Auxx';
import classes from './Layout.css';

const layout = (props) => (
  <Aux>
    <div>toolbar, sideDrawer, backDrop</div>
    <main className={classes.Content}>
      {props.children}
    </main>
  </Aux>
);

export default layout;
