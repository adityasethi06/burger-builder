import React from 'react';

const layout = (props) => (
    <div>toolbar, sideDrawer, backDrop</div>
    <main>
      {props.children}
    </main>
);
