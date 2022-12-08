import React, {useState, useEffect} from 'react';
import Chart from './charts';
import './App.css';


let timer = 0;
export default  function AppJSX() {
const tempdataArr = [];
const tempdataArrY1 = [];
const rawTempdataArr = [];
const rawTempdataArrY1 = [];
let xpos = 0 ;
const nbPoints = 720000;
const samplesPoints = 1000; //100
const thresholdsPoints = 90; //900
// const [loading, setLoading] = useState(true);
const [dataArr, setdataArr] = useState([]);
const [Y1dataArr, setdataArrY1] = useState([]);
const [dataRaw1, setdataRaw1] = useState([]);
const [dataRaw2, setdataRaw2] = useState([]);
const Start = async () => {
  timer = setInterval(() => {
    rawTempdataArr.length = 0;
    rawTempdataArrY1.length = 0;
    // tempdataArr.length = 0;
    // tempdataArrY1.length = 0;
    for (let i = 0; i < nbPoints; i++) {
      rawTempdataArr.push({x: i, y: Math.floor(Math.random()* 100)});
      rawTempdataArrY1.push({x: i, y: Math.floor(Math.random()* 100)});
      tempdataArr.push({x: xpos + i, y: i === 100 ? Math.floor(Math.random()* 1000) :Math.floor(Math.random()* 100)});
      tempdataArrY1.push({x: xpos + i, y: i === 100 ? Math.floor(Math.random()* 1000) :Math.floor(Math.random()* 100)});
    }
  setdataArr([...tempdataArr]);
  setdataArrY1([...tempdataArrY1]);
  setdataRaw1([...rawTempdataArr]);
  setdataRaw2([...rawTempdataArrY1]);
  xpos = xpos + nbPoints;
}, 200);

// viewer test
//   rawTempdataArr.length = 0;
//   rawTempdataArrY1.length = 0;
//   // tempdataArr.length = 0;
//   // tempdataArrY1.length = 0;
//   await newFunction(rawTempdataArr, rawTempdataArrY1);
//   await newFunction_1(nbPoints, tempdataArr, xpos, tempdataArrY1);
// setdataArr([...tempdataArr]);
// setdataArrY1([...tempdataArrY1]);
// setdataRaw1([...rawTempdataArr]);
// setdataRaw2([...rawTempdataArrY1]);
// xpos = xpos + nbPoints;

}

const end = () => { 
  clearInterval(timer);
  xpos = 0;
  tempdataArr.length = 0;
  tempdataArrY1.length = 0;
  rawTempdataArr.length = 0;
  rawTempdataArrY1.length = 0;
 }

//  useEffect(() => {
//   return () => setLoading(false); // cleanup function을 이용
// }, []);

  return (
    <>
    <button type="button"  onClick={()=>{
      Start();
    }}>Start</button>
     <button type="button"  onClick={()=>{
      end();
    }}>end</button>
    <span className='arc_chart'>
        <div className='arc_chart_1'>
      <Chart yData={dataRaw1} y2Data={dataRaw2} samplesPoints ={samplesPoints} thresholdsPoints = {thresholdsPoints} nbPoints={nbPoints}  />
      </div>
      <div className='arc_chart_2'>
      <Chart yData={dataArr} y2Data={Y1dataArr} samplesPoints ={samplesPoints} thresholdsPoints = {thresholdsPoints} nbPoints={nbPoints} />
      </div>
    </span>
    {/* <span className='arc_chart'>
        <div className='arc_chart_3'>
      <Chart yData={dataArr} y2Data={Y1dataArr} samplesPoints ={samplesPoints} thresholdsPoints = {thresholdsPoints} nbPoints={nbPoints}  />
      </div>
      <div className='arc_chart_4'>
      <Chart yData={dataArr} y2Data={Y1dataArr} samplesPoints ={samplesPoints} thresholdsPoints = {thresholdsPoints} nbPoints={nbPoints} />
      </div>
    </span> */}
    </>
  );
}
async function newFunction_1(nbPoints, tempdataArr, xpos, tempdataArrY1) {
  for (let i = 0; i < nbPoints; i++) {

    tempdataArr.push({ x: xpos + i, y: i === 100 ? Math.floor(Math.random() * 1000) : Math.floor(Math.random() * 100) });
    tempdataArrY1.push({ x: xpos + i, y: i === 100 ? Math.floor(Math.random() * 1000) : Math.floor(Math.random() * 100) });
  }
}

async function newFunction(rawTempdataArr, rawTempdataArrY1) {
  for (let i = 0; i < 200; i++) {
    rawTempdataArr.push({ x: i, y: Math.floor(Math.random() * 100) });
    rawTempdataArrY1.push({ x: i, y: Math.floor(Math.random() * 100) });
  }
}

