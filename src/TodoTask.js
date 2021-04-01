import React from 'react';

function TodoTask(props) {
  const {onChangeofTask, item,index,onClickDelete,readWriteBool,onClickEdit}=props;
  return (
    <div className="card-view" key={index}>
        {/* <span className="sno">{index+1}.</span> */}
        {!readWriteBool && <span style={{margin:'5px',wordBreak:'break-word'}}>{item}</span>}
        {readWriteBool &&<textarea style={{width:'70%',margin:'5px'}} type="text" onChange={onChangeofTask} defaultValue={item}/>}
        <button onClick={onClickDelete.bind(null,index)}>Delete</button>
        <button onClick={onClickEdit.bind(null,index,readWriteBool)}>{!readWriteBool ? 'Edit':'Done'}</button> 
      </div>
  )
}

export default TodoTask;
