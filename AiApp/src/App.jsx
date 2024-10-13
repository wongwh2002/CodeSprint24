import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  GeoPoint,
  deleteDoc,
} from "firebase/firestore";
import { saveAs } from "file-saver-es";

// import { GeoPoint } from "firebase/firestore"; // Correctly import GeoPoint
import firebase from "firebase/compat/app"; // Add this line to import firebase
import { db } from "./configuration"; // Assuming the correct path to your configuration file

async function initDb() {
  const getRandomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  const getRandomPercentage = (percentage, max) =>
    Math.floor((percentage / 100) * max);

  const portWriteData = [
    {
      PortName: "Tuas",
      PortActualName: "PSA Tuas Port",
      Location: new GeoPoint(1.2395633230556833, 103.61659118396314),
      MaxContainerCapacity: getRandomNumber(300, 500),
      MaxShipCapacity: getRandomNumber(8, 15),
    },
    {
      PortName: "Jurong",
      PortActualName: "PSA Jurong Island Terminal (JIT)",
      Location: new GeoPoint(1.2886391308540717, 103.666303667014),
      MaxContainerCapacity: getRandomNumber(300, 500),
      MaxShipCapacity: getRandomNumber(8, 15),
    },
    {
      PortName: "Pasir Panjang",
      PortActualName: "PSA Singapore - Multipurpose Terminal",
      Location: new GeoPoint(1.293157652875155, 103.77256072531563),
      MaxContainerCapacity: getRandomNumber(300, 500),
      MaxShipCapacity: getRandomNumber(8, 15),
    },
    {
      PortName: "Brani",
      PortActualName: "PSA Brani Terminal",
      Location: new GeoPoint(1.2642907896740723, 103.83410701602287),
      MaxContainerCapacity: getRandomNumber(300, 500),
      MaxShipCapacity: getRandomNumber(8, 15),
    },
    {
      PortName: "Jakarta",
      PortActualName: "New Priok Container Terminal One (NPCT1)",
      Location: new GeoPoint(-5.503645007056072, 107.0328982212003),
      MaxContainerCapacity: getRandomNumber(300, 500),
      MaxShipCapacity: getRandomNumber(8, 15),
    },
    {
      PortName: "Ameya",
      PortActualName: "Ameya Logistics",
      Location: new GeoPoint(18.80506733391735, 73.07964791060009),
      MaxContainerCapacity: getRandomNumber(300, 500),
      MaxShipCapacity: getRandomNumber(8, 15),
    },
    {
      PortName: "Sical",
      PortActualName: "PSA SICAL Terminals Limited",
      Location: new GeoPoint(8.553861979319608, 78.37834754736443),
      MaxContainerCapacity: getRandomNumber(300, 500),
      MaxShipCapacity: getRandomNumber(8, 15),
    },
    {
      PortName: "Baranagar",
      PortActualName: "Container Terminal N.S.D Gate 7",
      Location: new GeoPoint(12.785017886008374, 80.22405056171904),
      MaxContainerCapacity: getRandomNumber(300, 500),
      MaxShipCapacity: getRandomNumber(8, 15),
    },
    {
      PortName: "Laem Chabang",
      PortActualName:
        "Laem Chabang International Terminal Co., Ltd (B-5 Terminal)",
      Location: new GeoPoint(13.30240288070266, 100.89679655084919),
      MaxContainerCapacity: getRandomNumber(300, 500),
      MaxShipCapacity: getRandomNumber(8, 15),
    },
    {
      PortName: "Thai Connectivity",
      PortActualName:
        "Thai Connectivity Terminal (TCT Map Ta Phut Industrial Port",
      Location: new GeoPoint(12.655760354441844, 101.12242050350875),
      MaxContainerCapacity: getRandomNumber(300, 500),
      MaxShipCapacity: getRandomNumber(8, 15),
    },
    {
      PortName: "Cang Container Quoc Te",
      PortActualName: "SP - PSA International Port",
      Location: new GeoPoint(10.588901005461771, 107.01518758772386),
      MaxContainerCapacity: getRandomNumber(300, 500),
      MaxShipCapacity: getRandomNumber(8, 15),
    },
    {
      PortName: "Tan Cang Que Vo",
      PortActualName: "ICD Tân Cảng Quế Võ",
      Location: new GeoPoint(21.55288031841085, 106.15009727313961),
      MaxContainerCapacity: getRandomNumber(300, 500),
      MaxShipCapacity: getRandomNumber(8, 15),
    },
    {
      PortName: "Qinzhou",
      PortActualName: "Qinzhou Port",
      Location: new GeoPoint(22.22569762870952, 108.786816095586),
      MaxContainerCapacity: getRandomNumber(300, 500),
      MaxShipCapacity: getRandomNumber(8, 15),
    },
    {
      PortName: "Guang Zhou",
      PortActualName: "Guangzhou South China Oceangate Container Terminal",
      Location: new GeoPoint(22.956013190388607, 113.73066362406695),
      MaxContainerCapacity: getRandomNumber(300, 500),
      MaxShipCapacity: getRandomNumber(8, 15),
    },
    {
      PortName: "Fuzhou",
      PortActualName: "Fuzhou International Container Terminal",
      Location: new GeoPoint(26.110387475192258, 119.41241380126344),
      MaxContainerCapacity: getRandomNumber(300, 500),
      MaxShipCapacity: getRandomNumber(8, 15),
    },
    {
      PortName: "DingShuZhen",
      PortActualName: "Container Terminals",
      Location: new GeoPoint(31.277610227918167, 119.83420787374205),
      MaxContainerCapacity: getRandomNumber(300, 500),
      MaxShipCapacity: getRandomNumber(8, 15),
    },
    {
      PortName: "TianJin",
      PortActualName: "Tianjin Port Container Terminal Co., Ltd.",
      Location: new GeoPoint(38.78172961946943, 117.4709900687863),
      MaxContainerCapacity: getRandomNumber(300, 500),
      MaxShipCapacity: getRandomNumber(8, 15),
    },
    {
      PortName: "Dalian",
      PortActualName: "Dalian Container Terminal Co.,Ltd.",
      Location: new GeoPoint(38.521531342662804, 121.52466762991293),
      MaxContainerCapacity: getRandomNumber(300, 500),
      MaxShipCapacity: getRandomNumber(8, 15),
    },
    {
      PortName: "Hanjin Incheon",
      PortActualName: "Hanjin Incheon Container Terminal",
      Location: new GeoPoint(36.94059016874591, 126.52235229431564),
      MaxContainerCapacity: getRandomNumber(300, 500),
      MaxShipCapacity: getRandomNumber(8, 15),
    },
    {
      PortName: "Busan",
      PortActualName: "Busan Port Terminal",
      Location: new GeoPoint(36.27194770083046, 128.68801564889012),
      MaxContainerCapacity: getRandomNumber(300, 500),
      MaxShipCapacity: getRandomNumber(8, 15),
    },
    {
      PortName: "Hibikimachi",
      PortActualName: "Hibikimachi",
      Location: new GeoPoint(35.05386685062469, 130.63155968504674),
      MaxContainerCapacity: getRandomNumber(300, 500),
      MaxShipCapacity: getRandomNumber(8, 15),
    },
  ];

  portWriteData.forEach((port) => {
    port.CurrentContainerCount = getRandomPercentage(
      getRandomNumber(30, 80),
      port.MaxContainerCapacity
    );
    port.CurrentShipCount = getRandomPercentage(
      getRandomNumber(30, 80),
      port.MaxShipCapacity
    );
  });
  return portWriteData;
}

// App.js
async function fetchDataFromFireStore() {
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
  // useEffect(() => {
  //   async function initializeData() {
  //     // Check if data already exists
  //     const querySnapshot = await getDocs(collection(db, "Ports"));
  //     if (!querySnapshot.empty) {
  //       console.log("Data already initialized");
  //       return;
  //     }

  //     // Initialize and add new data
  //     const portWriteData = await initDb();
  //     console.log(portWriteData);
  //     for (let i = 0; i < portWriteData.length; i++) {
  //       console.log(portWriteData[i]);
  //       await addDataToFirestore(portWriteData[i]);
  //     }
  //   }
  //   initializeData();
  // }, []);
  async function fetchDataFromFireStore() {
    const querySnapshot = await getDocs(collection(db, "Ports"));
    let tempData = [];
    querySnapshot.forEach((doc) => {
      tempData.push({ id: doc.id, ...doc.data() });
    });
    console.log(tempData);
    return tempData;
  }
  useEffect(() => {
    async function fetchData() {
      const data = await fetchDataFromFireStore();
      setPortData(data);
    }
    fetchData();
  }, []);

  const [markers2, setMarkers2] = useState([]);

  useEffect(() => {
    const newMarkers = portData.map((port) => {
      return {
        coords: [port.Location.latitude, port.Location.longitude],
        popup: `${port.PortName}<br>Ships: ${port.CurrentShipCount} / ${port.MaxShipCapacity}<br>Containers: ${port.CurrentContainerCount} / ${port.MaxContainerCapacity}`,
      };
    });
    setMarkers2(newMarkers);
  }, [portData]);

  useEffect(() => {
    if (portData.length > 0) {
      saveMarkersToFile(markers2);
    }
  }, [markers2]);
  // useEffect(() => {
  //   async function loadMarkersFromFile() {
  //     try {
  //       const response = await fetch("/path/to/markers.json");
  //       const markers = await response.json();
  //       setPortData(markers);
  //     } catch (error) {
  //       console.error("Error loading markers from file:", error);
  //     }
  //   }

  //   loadMarkersFromFile();
  // }, []);

  function saveMarkersToFile(markers) {
    const jsonString = JSON.stringify(markers, null, 2);
    console.log(jsonString);
  }

  // function readMarkersFromFile(file) {
  //   return new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onload = (event) => {
  //       try {
  //         const markers = JSON.parse(event.target.result);
  //         resolve(markers);
  //       } catch (error) {
  //         reject(error);
  //       }
  //     };
  //     reader.onerror = (error) => reject(error);
  //     reader.readAsText(file);
  //   });
  // }

  // useEffect(() => {
  //   saveMarkersToFile(markers2);
  // });

  // // Example usage
  // useEffect(() => {
  //   // Save markers2 to file
  //   saveMarkersToFile(markers2);

  //   // Read markers from file (assuming you have a file input to select the file)
  //   const fileInput = document.createElement("input");
  //   fileInput.type = "file";
  //   fileInput.onchange = async (event) => {
  //     const file = event.target.files[0];
  //     if (file) {
  //       try {
  //         const markersFromFile = await readMarkersFromFile(file);
  //         console.log(markersFromFile);
  //       } catch (error) {
  //         console.error("Error reading markers from file:", error);
  //       }
  //     }
  //   };
  //   document.body.appendChild(fileInput);
  // }, [portData]);
  return <></>;
}

export default App;
