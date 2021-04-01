import React, { useState ,useEffect} from 'react';
import './App.css';
import firebaseDb from "./firebase";  
import TodoTask from './TodoTask';
import AddHeader from './AddHeader';

const localStorageName="TasksArr";

function App() {
  let firestore=firebaseDb.firestore();

  const [inputTxt,setInputTxt]=useState('');
  const [arrValue,setArrValue]=useState ([]);
  const [editIndex,seteditIndex]=useState(null);
  const [inputtaskTxt,setinputtaskTxt]=useState('');

  const onChangeTxt=(e)=>{
    setInputTxt(e.target.value);
  }
  const onChangeofTask=(e)=>{
    setinputtaskTxt(e.target.value);
  }
  const onClickBtn=()=>{
    if(inputTxt !=='')
      setArrValue(arrValue => [...arrValue, inputTxt])
      setInputTxt('');
  }
  const onClickDelete=(index)=>{
    const x= arrValue.filter((_, i) => i !== index);
    setArrValue(x)
  }

  const onClickEdit=(index,readWriteBool)=>{
    if(readWriteBool){
      seteditIndex(null)
      if(inputtaskTxt!=='')
        arrValue[index]=inputtaskTxt;
    }else{
      seteditIndex(index)
      setinputtaskTxt('')
    }
  }

  const onClickSave=()=>{
    if(editIndex !==null){
      alert("There is some changes to be done!");
      return
    }
    if(arrValue.length>0){
      localStorage.setItem(localStorageName, JSON.stringify(arrValue));
      if(navigator.onLine){
        let docRef=firestore.doc('todoV/todoView');
        docRef.set({
          todovalue:arrValue
        });
        alert("Online!!")
      }else{
        alert("Offline!!")
      }
    } 
  }

  useEffect(() => { 
    let firestore=firebaseDb.firestore();
    let docRef=firestore.doc('todoV/todoView');
    // docRef.set({
    //   todovalue:[]
    // });
    if(navigator.onLine){
      docRef.get().then((doc)=>{
          if(doc.data().todovalue.length>0)
            localStorage.setItem(localStorageName, JSON.stringify(doc.data().todovalue));
            setArrValue(doc.data().todovalue);
      });
    }else{
      if(JSON.parse(localStorage.getItem(localStorageName)))
        setArrValue(JSON.parse(localStorage.getItem(localStorageName)));
    }
  },[]);

  return (
    <div className="App">
      <AddHeader
        inputTxt={inputTxt}
        onChangeTxt={onChangeTxt}
        onClickBtn={onClickBtn}
      />
      {arrValue.length > 0 &&
        <> 
          <div className="flex-display">
            {arrValue.map((item,index)=>{
                const readWriteBool=(index === editIndex)
                return <TodoTask 
                key={index}
                item={item}
                onChangeofTask={onChangeofTask}
                index={index}
                readWriteBool={readWriteBool}
                onClickDelete={onClickDelete}
                onClickEdit={onClickEdit}
                />
              })
            }
          </div>
          <button onClick={onClickSave}>Save</button>
        </>
      }      
    </div>
  );
}

export default App;
