import './App.css';
import React from "react";
import logo from './images/sideLogo.png'
import { db } from "./config/connection";
import { useState, useEffect } from "react";
import { collection, getDocs, onSnapshot, query, where,} from "firebase/firestore";


function App() {
  const [projects, setProjects] = useState([]);
  const projectsCollectionRef = collection(db, "projects");
  const[myHours, setMyHours] = useState([]);
  let array = [];

  //FETCHING DATA FROM FIREBASE
  const getProjects = async () => {
    const data = await getDocs(projectsCollectionRef);
    setProjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    for (let i = 0; i < projects.length; i++) {
      const q = query(collection(db, "hours"),where("project", "==", projects[i].name));
      let tot = 0;
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        tot += calculateTime(doc.data().signIn, doc.data().signOut);
      });
        array.push({name: projects[i].name, tot: tot});
    }
    setMyHours(array);
  };

  useEffect(() => {
    const database = query(collection(db, "projects"));
    onSnapshot(database, () => {
      getProjects();
    });
  });

  function calculateTime(signedIn, signedOut) {
    let started = signedIn.split(":");
    let startedHR = parseInt(started[0]);
    let startedMIN = parseInt(started[1]);
    let concluded = signedOut.split(":");
    let concludedHR = parseInt(concluded[0]);
    let concludedMIN = parseInt(concluded[1]);
    let tot = concludedHR * 60 + concludedMIN - (startedHR * 60 + startedMIN);
    return tot;
  }

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  var today = new Date(), time = today.getHours() + ':' + today.getMinutes();

  return (
    <div className="App">
      <div className="sheetHeader">
        <img src={logo}></img>
        <div>
          <p> <b> Time: </b> {time}</p>
          <p> <b> Date: </b> {date}</p>
        </div>
      </div>
      <h1> Time Tracker </h1>

      <table id="hours">
        <tr>
          <th id="left">Project Name</th>
          <th id="right">Hours</th>
        </tr>
        {myHours.map((row) => {
          return (
            <tr>
              <td  id="left">{row.name}</td>
              <td id="right">{(row.tot /60).toFixed(2)} hrs</td>
            </tr> 
          )
        })}
      </table>
    
      

     
    </div>
  );
}

export default App;
