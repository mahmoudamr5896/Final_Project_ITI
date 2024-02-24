import { VictoryPie, VictoryTooltip } from "victory"; 
import "./ProgressChart.css"; 

function ProgressChart() {
  return (
    <div className="progress-chart-container"> 
      <VictoryPie
        colorScale={["#8ff087", "rgb(129, 194, 161)", "#A6C3A7"]} 
        radius={120}
        style={{ labels: { padding: 5, fontSize: 20 } }}
        data={[
          { x: 1, y: 3, placement: "Thinness" },
          { x: 2, y: 6, placement: "Obesity" },
          { x: 3, y: 1, placement: "Maintain weight" },
        ]}
        labels={({ datum }) => `${datum.placement}`}
        labelPlacement={({ datum }) => datum.placement === "Obesity" ? "perpendicular" : "vertical"}
        labelPosition={({ datum }) => datum.placement === "Obesity" ? "endAngle" : "startAngle"}
        labelComponent={<VictoryTooltip />}
      />
      <div className="Casese" style={{backgroundColor:"#8ff087"}}><span className="CaseDes">Thinness</span></div>
      <div className="Casese" style={{backgroundColor:"rgb(129, 194, 161)"}}><span className="CaseDes">Obesity</span></div>
      <div className="Casese" style={{backgroundColor:"#A6C3A7"}}><span className="CaseDes">Maintain </span></div>
    </div>
  );
}

export default ProgressChart;

// export default ProgressChart;
