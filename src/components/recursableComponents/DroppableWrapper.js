import React from 'react';
import {Droppable} from "react-beautiful-dnd";

function DroppableWrapper(props) {
  console.log(props)

  return (
    <Droppable {...props} >
      {(provided) => (
        <div
          {...provided.droppableProps}
          {...provided.droppablePlaceholder}
          ref={provided.innerRef}
          style={{minHeight: 300,backgroundColor:'#efefef83',borderRadius: 5}}
        >
          { props.children }
          { provided.placeholder }
        </div>
      )}
    </Droppable>
  );
}

export default DroppableWrapper;
