import * as d3 from "d3";
import { transpose } from "d3";
import { useEffect, useState } from "react";
import "bulma/css/bulma.css";

export default function App() {
  const [data, setData] = useState(null);
  const [x_property, setx_property] = useState("sepalLength");
  const [y_property, sety_property] = useState("sepalLength");
  const [setosa, setsetsa] = useState(true);
  const [versicolor, setversicolor] = useState(true);
  const [virginica, setvirginica] = useState(true);

  useEffect(() => {
    fetch("https://assets.codepen.io/2004014/iris.json")
      .then((response) => response.json())
      .then(setData);
  }, []);

  if (data == null) {
    return <p>loding</p>;
  }

  const xScale = d3
    .scaleLinear()
    .domain(d3.extent(data, (flower) => flower[x_property]))
    .range([30, 350])
    .nice();
  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(data, (flower) => flower[y_property]))
    .range([350, 30])
    .nice();

  const species = Array.from(new Set(data.map(({ species }) => species)));
  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);
  data.map((flower) => colorScale(flower.species));

  const xTicks = xScale.ticks();
  const yTicks = yScale.ticks();

  const f = document.getElementById("foo");

  return (
    <div>
      <header className="hero is-dark is-blod">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">scatter plot of iris data</h1>
          </div>
        </div>
      </header>

      <div className="select is-fullwidth">
        <div>
          <label>x property</label>
          <select
            name="x_property"
            defaultValue="sepalLength"
            onChange={(event) => {
              setx_property(event.target.value);
            }}
          >
            <option value="sepalLength">sepalLength</option>
            <option value="sepalWidth">sepalWidth</option>
            <option value="petalLength">petalLength</option>
            <option value="petalWidth">petalWidth</option>
          </select>
        </div>

        <div>
          <label>x property</label>
          <select
            name="y_property"
            defaultValue="sepalLength"
            onChange={(event) => {
              sety_property(event.target.value);
            }}
          >
            <option value="sepalLength">sepalLength</option>
            <option value="sepalWidth">sepalWidth</option>
            <option value="petalLength">petalLength</option>
            <option value="petalWidth">petalWidth</option>
          </select>
        </div>
      </div>

      <svg width="800" height="800">
        {/* コンテンツ＋軸 */}
        <g transform="translate(100, 200) scale(1.25)">
          {/* コンテンツ */}
          <g>
            {data.map((flower, index) => {
              if (flower.species === "setosa") {
                return (
                  <circle
                    key={index}
                    style={{ transition: `transform 0.5s, opacity 1s` }}
                    transform={`translate(${xScale(flower[x_property])},
                                    ${yScale(flower[y_property])})`}
                    r="3"
                    fill={colorScale(flower.species)}
                    opacity={setosa ? 1 : 0}
                  />
                );
              } else if (flower.species === "virginica") {
                return (
                  <circle
                    key={index}
                    style={{ transition: `transform 0.5s, opacity 1s` }}
                    transform={`translate(${xScale(flower[x_property])},
                                    ${yScale(flower[y_property])})`}
                    r="3"
                    fill={colorScale(flower.species)}
                    opacity={virginica ? 1 : 0}
                  />
                );
              } else {
                return (
                  <circle
                    key={index}
                    style={{ transition: `transform 0.5s, opacity 1s` }}
                    transform={`translate(${xScale(flower[x_property])},
                                    ${yScale(flower[y_property])})`}
                    r="3"
                    fill={colorScale(flower.species)}
                    opacity={versicolor ? 1 : 0}
                  />
                );
              }
            })}
          </g>
          {/* x軸 */}
          <g>
            <line x1="30" x2="350" y1="350" y2="350" stroke="black" />
            {/* x軸目盛 */}
            <g>
              {xTicks.map((xTick) => {
                return (
                  <g key={xTick}>
                    <line
                      x1={xScale(xTick)}
                      x2={xScale(xTick)}
                      y1="350"
                      y2="360"
                      stroke="black"
                    />
                    <text
                      fontSize="12"
                      textAnchor="middle"
                      x={xScale(xTick)}
                      y="375"
                    >
                      {xTick}
                    </text>
                  </g>
                );
              })}
            </g>
          </g>
          {/* y軸 */}
          <g>
            <line x1="30" x2="30" y1="30" y2="350" stroke="black" />
            {/* y軸目盛 */}
            <g>
              {yTicks.map((yTick) => {
                return (
                  <g key={yTick}>
                    <line
                      x1="30"
                      x2="20"
                      y1={yScale(yTick)}
                      y2={yScale(yTick)}
                      stroke="black"
                    />
                    <text
                      fontSize="12"
                      dominantBaseline="middle"
                      textAnchor="end"
                      x="10"
                      y={yScale(yTick)}
                    >
                      {yTick}
                    </text>
                  </g>
                );
              })}
            </g>
          </g>
        </g>
        {/* 凡例 */}

        <g transform="translate(600 300) scale(1.25)">
          {species.map((specie, index) => {
            return (
              <g
                key={`${specie}`}
                onClick={(event) => {
                  if (specie === "setosa") {
                    setsetsa(!setosa);
                  } else if (specie === "versicolor") {
                    setversicolor(!versicolor);
                  } else {
                    setvirginica(!virginica);
                  }
                }}
              >
                <circle
                  cx="0"
                  cy={20 * index}
                  r="5"
                  fill={colorScale(specie)}
                />
                <text x="10" y={20 * index}>
                  {specie}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
