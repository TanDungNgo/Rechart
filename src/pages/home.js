import React, { useEffect, useState } from "react";

import axios from "axios";
import style from "./style.css";
import {
  Bar,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";

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
          このグラフは、日本の行政単位（地区）ごとの人口の変化を示しています
        </h2>
      </div>
      <div className="container">
        <div className="sidebar">
          <h4>日本の行政単位</h4>
          <div>
            <select className="custom-select" onChange={handleChange}>
              {renderCity()}
            </select>
          </div>
        </div>
        <div className="content">
          <div className="card">
            <h4>総人口</h4>
            <ResponsiveContainer width="100%" aspect={3}>
              <LineChart
                width={500}
                height={300}
                data={totalPopulation}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line dataKey="value" fill="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <h4>年少人口</h4>
            <ResponsiveContainer width="100%" aspect={3}>
              <LineChart
                width={500}
                height={300}
                data={youngPopulation}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#ff7300" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="card">
            <h4>生産年齢人口</h4>
            <ResponsiveContainer width="100%" aspect={3}>
              <LineChart
                width={500}
                height={300}
                data={workingAgePopulation}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <h4>老年人口</h4>
            <ResponsiveContainer width="100%" aspect={3}>
              <LineChart
                width={500}
                height={300}
                data={geriatricPopulation}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
