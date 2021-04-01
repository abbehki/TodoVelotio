import React from 'react';

function AddHeader(props) {
  const {inputTxt, onClickBtn , onChangeTxt}=props;
  return (
    <>
        <input  placeholder="Enter to Todo!!" value={inputTxt} onChange={onChangeTxt}/>
        <button onClick={onClickBtn}>Add</button>
    </>
  )
}

export default AddHeader;
