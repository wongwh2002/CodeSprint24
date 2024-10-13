import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, GeoPoint } from "firebase/firestore";
// import { GeoPoint } from "firebase/firestore"; // Correctly import GeoPoint
import firebase from "firebase/compat/app"; // Add this line to import firebase
import { db } from "./configuration"; // Assuming the correct path to your configuration file

function initDb() {
  const portWriteData = [
    {
      PortName: "Tuas",
      PortActualName: "PSA Tuas Port",
      Location: new GeoPoint(1.2395633230556833, 103.61659118396314),
    },
    {
      PortName: "Jurong",
      PortActualName: "PSA Jurong Island Terminal (JIT)",
      Location: new GeoPoint(1.2886391308540717, 103.666303667014),
    },
    {
      PortName: "Pasir Panjang",
      PortActualName: "PSA Singapore - Multipurpose Terminal",
      Location: new GeoPoint(1.293157652875155, 103.77256072531563),
    },
    {
      PortName: "Brani",
      PortActualName: "PSA Brani Terminal",
      Location: new GeoPoint(1.2642907896740723, 103.83410701602287),
    },
    {
      PortName: "Jakarta",
      PortActualName: "New Priok Container Terminal One (NPCT1)",
      Location: new GeoPoint(-5.503645007056072, 107.0328982212003),
    },
    {
      PortName: "Ameya",
      PortActualName: "Ameya Logistics",
      Location: new GeoPoint(18.80506733391735, 73.07964791060009),
    },
    {
      PortName: "Sical",
      PortActualName: "PSA SICAL Terminals Limited",
      Location: new GeoPoint(8.553861979319608, 78.37834754736443),
    },
    {
      PortName: "Baranagar",
      PortActualName: "Container Terminal N.S.D Gate 7",
      Location: new GeoPoint(12.785017886008374, 80.22405056171904),
    },
    {
      PortName: "Laem Chabang",
      PortActualName:
        "Laem Chabang International Terminal Co., Ltd (B-5 Terminal)",
      Location: new GeoPoint(13.30240288070266, 100.89679655084919),
    },
    {
      PortName: "Thai Connectivity",
      PortActualName:
        "Thai Connectivity Terminal (TCT Map Ta Phut Industrial Port",
      Location: new GeoPoint(12.655760354441844, 101.12242050350875),
    },
    {
      PortName: "Cang Container Quoc Te",
      PortActualName: "SP - PSA International Port",
      Location: new GeoPoint(10.588901005461771, 107.01518758772386),
    },
    {
      PortName: "Tan Cang Que Vo",
      PortActualName: "ICD Tân Cảng Quế Võ",
      Location: new GeoPoint(21.55288031841085, 106.15009727313961),
    },
    {
      PortName: "Qinzhou",
      PortActualName: "Qinzhou Port",
      Location: new GeoPoint(22.22569762870952, 108.786816095586),
    },
    {
      PortName: "Guang Zhou",
      PortActualName: "Guangzhou South China Oceangate Container Terminal",
      Location: new GeoPoint(22.956013190388607, 113.73066362406695),
    },
    {
      PortName: "Fuzhou",
      PortActualName: "Fuzhou International Container Terminal",
      Location: new GeoPoint(26.110387475192258, 119.41241380126344),
    },
    {
      PortName: "DingShuZhen",
      PortActualName: "Container Terminals",
      Location: new GeoPoint(31.277610227918167, 119.83420787374205),
    },
    {
      PortName: "TianJin",
      PortActualName: "Tianjin Port Container Terminal Co., Ltd.",
      Location: new GeoPoint(38.78172961946943, 117.4709900687863),
    },
    {
      PortName: "Dalian",
      PortActualName: "Dalian Container Terminal Co.,Ltd.",
      Location: new GeoPoint(38.521531342662804, 121.52466762991293),
    },
    {
      PortName: "Hanjin Incheon",
      PortActualName: "Hanjin Incheon Container Terminal",
      Location: new GeoPoint(36.94059016874591, 126.52235229431564),
    },
    {
      PortName: "Busan",
      PortActualName: "Busan Port Terminal",
      Location: new GeoPoint(36.27194770083046, 128.68801564889012),
    },
    {
      PortName: "Hibikimachi",
      PortActualName: "Hibikimachi",
      Location: new GeoPoint(35.05386685062469, 130.63155968504674),
    },
  ];
  useEffect(() => {
    for (let i = 0; i < portWriteData.length; i++) {
      addDataToFirestore(portWriteData[i]);
    }
  }, []);
}

// App.js
async function fetchDataFromFIreStore() {
  const querySnapshot = await getDocs(collection(db, "Ports"));
  let tempData = [];
  querySnapshot.forEach((doc) => {
    tempData.push({ id: doc.id, ...doc.data() });
  });
  console.log(tempData);
  return tempData;
}

async function addDataToFirestore(data) {
  try {
    const docRef = await addDoc(collection(db, "Ports"), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

function App() {
  const [portData, setPortData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchDataFromFIreStore();
      setPortData(data);
    }
    fetchData();
  }, []);
  // for (let i = 0; i < portWriteData.length; i++) {
  //   addDataToFirestore(portWriteData[i]);
  // }

  return (
    <div>
      <h1>Data from port database:</h1>
      <ul>
        {portData.map((ports) => (
          <div key={ports.PortName}>
            <li>portName: {ports.PortName}</li>
            <li>portActualName: {ports.PortActualName}</li>
            <li>lat: {ports.Location.latitude}</li>
            <li>lng: {ports.Location.latitude}</li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
