import React from 'react';
import Item from './Item';

function Inventory(){
    return(
        <div>
            <h1>Username's inventory</h1>
            <p>Select an item you'd like to use on Ratty.</p>
            <p>Using an item will remove it from your inventory.</p>
            <div>
                <Item id={1} src='something.png' action='Feed' amount={10} name="Candy" description="A little sweet, but who doesn't like candy?" />
                <Item id={2} src='something.png' action='Play' amount={10} name="Ball" description="Time for a little game of fetch!" />
            </div>
        </div>
    )
}

export default Inventory;