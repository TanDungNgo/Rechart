import React, { useEffect, useState } from "react";

import axios from "axios";
import style from "./style.css";
import { FaMap, FaChartLine } from "react-icons/fa";
import ChartLine from "../components/ChartLine";

function Home() {
  const [listCity, setListCity] = useState([]);
  const [totalPopulation, setTotalPopulation] = useState([]);
  const [youngPopulation, setYoungPopulation] = useState([]);
  const [workingAgePopulation, setWorkingAgePopulation] = useState([]);
  const [geriatricPopulation, setGeriatricPopulation] = useState([]);
  useEffect(() => {
    axios
      .get("https://opendata.resas-portal.go.jp/api/v1/prefectures/", {
        headers: {
          "X-API-KEY": "GxXCPOL6IjOmtigjIlKPlu7aqGEtSm34Xzbnwb7D",
        },
      })
      .then((res) => {
        setListCity(res.data.result);
      })
      .catch(() => {});
  }, []);
  useEffect(() => {
    axios
      .get(
        "https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=1",
        {
          headers: {
            "X-API-KEY": "GxXCPOL6IjOmtigjIlKPlu7aqGEtSm34Xzbnwb7D",
          },
        }
      )
      .then((res) => {
        setTotalPopulation(res.data.result.data[0].data);
        setYoungPopulation(res.data.result.data[1].data);
        setWorkingAgePopulation(res.data.result.data[2].data);
        setGeriatricPopulation(res.data.result.data[3].data);
      })
      .catch(() => {});
  }, []);

  const renderCity = () => {
    return listCity.map((item) => {
      return (
        <option key={item.prefCode} value={item.prefCode}>
          {item.prefName}
        </option>
      );
    });
  };

  const handleChange = (e) => {
    const id = e.target.value;
    axios
      .get(
        `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=${id}`,
        {
          headers: {
            "X-API-KEY": "GxXCPOL6IjOmtigjIlKPlu7aqGEtSm34Xzbnwb7D",
          },
        }
      )
      .then((res) => {
        setTotalPopulation(res.data.result.data[0].data);
        setYoungPopulation(res.data.result.data[1].data);
        setWorkingAgePopulation(res.data.result.data[2].data);
        setGeriatricPopulation(res.data.result.data[3].data);
      })
      .catch(() => {});
  };

  return (
    <div className="wrapper">
      <div className="header">
        <h2>
          <FaChartLine className="icon" />
          このグラフは、日本の行政単位（地区）ごとの人口の変化を示しています
        </h2>
      </div>
      <div className="container">
        <div className="sidebar">
          <div className="box">
            <h4>
              <FaMap className="icon" />
              日本の行政単位
            </h4>
            <div>
              <select className="custom-select" onChange={handleChange}>
                {renderCity()}
              </select>
            </div>
          </div>
        </div>
        <div className="content">
          <ChartLine header="総人口" data={totalPopulation} />
          <ChartLine header="年少人口" data={youngPopulation} stroke="#ff7300" />
          <ChartLine
            header="生産年齢人口"
            data={workingAgePopulation}
            stroke="#82ca9d"
          />
          <ChartLine
            header="老年人口"
            data={geriatricPopulation}
            stroke="#8884d8"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
