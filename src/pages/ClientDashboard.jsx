
// import React, { useMemo } from "react";
// import { useAuth } from "../auth/AuthContext";
// import windSensorData from "../data/windSensorData";

// import {
//   Chart as ChartJS,
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   ArcElement,
//   Tooltip,
//   Legend
// } from "chart.js";

// import { Line, Doughnut } from "react-chartjs-2";

// ChartJS.register(
//   LineElement,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   ArcElement,
//   Tooltip,
//   Legend
// );

// const ClientDashboard = () => {
//   const { user } = useAuth();

//   /* ================= USER DATA ================= */
//   const userData = useMemo(
//     () => windSensorData.filter(d => d.user_email === user?.email),
//     [user]
//   );

//   const userName = userData[0]?.user_name || "User";

//   /* ================= KPI ================= */
//   const avgTotalCost = useMemo(() => {
//     if (!userData.length) return 0;
//     return (
//       userData.reduce((s, d) => s + (+d.total_cost || 0), 0) /
//       userData.length
//     ).toFixed(2);
//   }, [userData]);

//   const numberOfPlants = new Set(userData.map(d => d.plant_name)).size;

//   /* ================= LINE CHART HELPERS ================= */
//   const buildProductLineData = (key) => {
//     const map = {};

//     userData.forEach(d => {
//       const year = d.installation_year;
//       if (!map[year]) map[year] = [];
//       map[year].push(+d[key] || 0);
//     });

//     return {
//       labels: [...Array(10).keys()].map(i => i + 1),
//       datasets: Object.entries(map).map(([year, values], idx) => ({
//         label: year,
//         data: values,
//         borderColor: BOOTSTRAP_COLORS[idx % BOOTSTRAP_COLORS.length],
//         tension: 0.4
//       }))
//     };
//   };

//   /* ================= GAUGE HELPERS ================= */
//   const avg = (key) =>
//     userData.length
//       ? (
//           userData.reduce((s, d) => s + (+d[key] || 0), 0) / userData.length
//         ).toFixed(2)
//       : 0;

//   /* ================= CONSTANTS ================= */
//   const BOOTSTRAP_COLORS = [
//     "#0d6efd",
//     "#198754",
//     "#dc3545",
//     "#ffc107",
//     "#6f42c1"
//   ];

//   const Gauge = ({ label, value, max, color }) => (
//     <div className="gauge-card">
//       <h6>{label}</h6>
//       <Doughnut
//         data={{
//           datasets: [
//             {
//               data: [value, max - value],
//               backgroundColor: [color, "#e9ecef"],
//               borderWidth: 0,
//               cutout: "70%"
//             }
//           ]
//         }}
//         options={{
//           circumference: 180,
//           rotation: 270,
//           plugins: { legend: { display: false } }
//         }}
//       />
//       <div className="gauge-value">{value}</div>
//     </div>
//   );

//   return (
//     <div className="container-fluid client-dashboard">

//       {/* HEADER */}
//       <h3 className="mb-4">{userName} Dashboard</h3>

//       {/* KPI */}
//       <div className="row g-3 mb-4">
//         <div className="col-md-6">
//           <div className="kpi-card bg-primary">
//             <p>Average Total Cost</p>
//             <h4>₹ {avgTotalCost}</h4>
//           </div>
//         </div>

//         <div className="col-md-6">
//           <div className="kpi-card bg-success">
//             <p>Number of Plants</p>
//             <h4>{numberOfPlants}</h4>
//           </div>
//         </div>
//       </div>

//       {/* LINE CHARTS */}
//       <div className="row g-4 mb-4">
//         <div className="col-md-6">
//           <Line data={buildProductLineData("product_type1_wind_turbine")} />
//         </div>
//         <div className="col-md-6">
//           <Line data={buildProductLineData("product_type2_tower_structure")} />
//         </div>
//         <div className="col-md-6">
//           <Line data={buildProductLineData("product_type3_power_inverter")} />
//         </div>
//         <div className="col-md-6">
//           <Line data={buildProductLineData("product_type4_controller_unit")} />
//         </div>
//       </div>

//       {/* GAUGES */}
//       <div className="row g-4 mb-4">
//         <div className="col-md-3">
//           <Gauge label="Avg Wind Speed" value={avg("Wind_Speed (m/s)")} max={30} color="#0d6efd" />
//         </div>
//         <div className="col-md-3">
//           <Gauge label="Avg Theoretical Power" value={avg("Theoretical_Power_Curve (KWh)")} max={5000} color="#198754" />
//         </div>
//         <div className="col-md-3">
//           <Gauge label="Avg Power Output" value={avg("Power_Output_kW")} max={3000} color="#dc3545" />
//         </div>
//         <div className="col-md-3">
//           <Gauge label="Avg Wind Direction" value={avg("wind_direction_category")} max={360} color="#ffc107" />
//         </div>
//       </div>

//       {/* TABLE */}
//       <div className="card">
//         <div className="card-header">Plant Details</div>
//         <div className="table-responsive" style={{ maxHeight: "30vh" }}>
//           <table className="table table-striped mb-0">
//             <thead>
//               <tr>
//                 <th>Plant Name</th>
//                 <th>User ID</th>
//                 <th>User Email</th>
//               </tr>
//             </thead>
//             <tbody>
//               {userData.map((d, i) => (
//                 <tr key={i}>
//                   <td>{d.plant_name}</td>
//                   <td>{d.user_id}</td>
//                   <td>{d.user_email}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default ClientDashboard;


import { useMemo, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Line, Doughnut } from "react-chartjs-2";
import windSensorData from "../data/windSensorData";
import { useAuth } from "../auth/AuthContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function UserDashboard() {
  const { user } = useAuth();

  /* ================= PLANT DROPDOWN STATE ================= */
  const [selectedPlantId, setSelectedPlantId] = useState("ALL");

  /* ================= USER DATA (ALL PLANTS) ================= */
  const userDataAll = useMemo(() => {
    if (!user?.email) return [];
    return windSensorData.filter(
      d => d.user_email === user.email
    );
  }, [user]);

  /* ================= PLANT LIST ================= */
  const plantIds = useMemo(() => {
    return [...new Set(userDataAll.map(d => d.plant_id))];
  }, [userDataAll]);

  /* ================= FILTER BY SELECTED PLANT ================= */
  const userData = useMemo(() => {
    if (selectedPlantId === "ALL") return userDataAll;
    return userDataAll.filter(d => d.plant_id === selectedPlantId);
  }, [userDataAll, selectedPlantId]);

  const userName = userData.length > 0 ? userData[0].user_name : "";

  /* ================= UTIL ================= */
  const getDynamicMax = (data, key, fallback) => {
    const values = data.map(d => Number(d[key]) || 0);
    const max = Math.max(...values);
    return max > 0 ? Math.ceil(max) : fallback;
  };

  /* ================= KPI ================= */
  const avgTotalCostMillions = useMemo(() => {
    if (!userData.length) return "0.00";
    const avg =
      userData.reduce((s, d) => s + d.total_cost, 0) / userData.length;
    return (avg / 1_000_000).toFixed(2);
  }, [userData]);

  const avgWindSpeed = useMemo(() => {
    const valid = userData.filter(d => d.wind_speed > 0);
    if (!valid.length) return "0.00";
    return (
      valid.reduce((s, d) => s + d.wind_speed, 0) / valid.length
    ).toFixed(2);
  }, [userData]);

  const avgTheoreticalPower = useMemo(() => {
    if (!userData.length) return "0.00";
    return (
      userData.reduce((s, d) => s + d.theoretical_power, 0) /
      userData.length
    ).toFixed(2);
  }, [userData]);

  const avgPowerOutput = useMemo(() => {
    if (!userData.length) return "0.00";
    return (
      userData.reduce((s, d) => s + d.power_output, 0) /
      userData.length
    ).toFixed(2);
  }, [userData]);

  const avgWindDirection = useMemo(() => {
    if (!userData.length) return "0.00";
    return (
      userData.reduce((s, d) => s + d.wind_direction, 0) /
      userData.length
    ).toFixed(2);
  }, [userData]);

  /* ================= GAUGE ================= */
  const createGaugeData = (value, max, color) => {
    const safeValue = Math.min(Number(value), max);
    return {
      datasets: [
        {
          data: [safeValue, max - safeValue],
          backgroundColor: [color, "#e9ecef"],
          borderWidth: 0,
          cutout: "75%",
          circumference: 180,
          rotation: 270
        }
      ]
    };
  };

  const gaugeOptionsCommon = {
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => ctx.raw
        }
      }
    }
  };

  const maxWindSpeed = useMemo(
    () => getDynamicMax(userData, "wind_speed", 20),
    [userData]
  );
  const maxTheoreticalPower = useMemo(
    () => getDynamicMax(userData, "theoretical_power", 50),
    [userData]
  );
  const maxPowerOutput = useMemo(
    () => getDynamicMax(userData, "power_output", 100),
    [userData]
  );
  const maxWindDirection = 360;

  /* ================= LINE CHART ================= */
  const groupedByYear = useMemo(() => {
    const map = {};
    userData.forEach(d => {
      if (!map[d.installation_year]) {
        map[d.installation_year] = [];
      }
      map[d.installation_year].push(d.product_type1_wind_turbine);
    });
    return map;
  }, [userData]);

  const lineChartData = {
    labels: userData.map(d => d.product_type1_wind_turbine),
    datasets: Object.entries(groupedByYear).map(([year, values], i) => ({
      label: year,
      data: values,
      borderColor: ["#0d6efd", "#198754", "#dc3545", "#6f42c1"][i % 4],
      tension: 0.4
    }))
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "top" } },
    scales: {
      y: { beginAtZero: true }
    }
  };

  return (
    <div className="container-fluid p-3">

      {/* ===== HEADER ===== */}
      <div className="dashboard-header mb-2">
        <h3>{userName || user?.user_id} Dashboard</h3>
      </div>

      {/* ===== PLANT DROPDOWN ===== */}
      {plantIds.length > 1 && (
        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label fw-bold">Select Plant</label>
            <select
              className="form-select"
              value={selectedPlantId}
              onChange={(e) => setSelectedPlantId(e.target.value)}
            >
              <option value="ALL">All Plants</option>
              {plantIds.map(id => (
                <option key={id} value={id}>{id}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* ===== KPI ===== */}
      <div className="row">
        <div className="col-md-4">
          <div className="kpi-card">
            <h5>Total Cost</h5>
            <h2>{avgTotalCostMillions} M</h2>
          </div>
        </div>
      </div>

      {/* ===== KPI GAUGES ===== */}
      <div className="row mt-4">
        {[
          ["Avg Theoretical Power", avgTheoreticalPower, maxTheoreticalPower, "#198754"],
          ["Avg Power Output", avgPowerOutput, maxPowerOutput, "#0d6efd"],
          ["Avg Wind Direction", avgWindDirection, maxWindDirection, "#dc3545"],
          ["Avg Wind Speed", avgWindSpeed, maxWindSpeed, "#6f42c1"]
        ].map(([title, value, max, color], i) => (
          <div className="col-md-3" key={i}>
            <div className="card p-3 kpi-gauge-card">
              <h6 className="text-center">{title}</h6>
              <div className="gauge-body">
                <Doughnut
                  data={createGaugeData(value, max, color)}
                  options={gaugeOptionsCommon}
                />
                <div className="gauge-center-value">
                  {value}{title.includes("Direction") && "°"}
                </div>
              </div>
              <div className="gauge-footer">
                <span>0</span>
                <span>{max}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== LINE CHART ===== */}
      <div className="row mt-4">
        <div className="col-md-7">
          <div className="card p-3" style={{ height: "290px" }}>
            <h6 className="text-center">
              Count of product_type1_wind_turbine by installation_year
            </h6>
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </div>
      </div>

      {/* ===== TABLE ===== */}
      <div className="card mt-4 p-3 table-card">
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>Plant Name</th>
              <th>User Mobile</th>
              <th>User Email</th>
              <th>City</th>
              <th>State</th>
              <th>Sector</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((d, i) => (
              <tr key={i}>
                <td>{d.plant_name}</td>
                <td>{d.user_mobile}</td>
                <td>{d.user_email}</td>
                <td>{d.city}</td>
                <td>{d.state}</td>
                <td>{d.sector}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
