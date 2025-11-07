// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import MainLayout from "./components/MainLayout";
// // import Login from "./pages/Login";
// // import Dashboard from "./pages/Dashboard";
// // import Consultas from "./pages/consultas/Consultas";
// // import Medicamentos from "./pages/medicamentos/Medicamentos";
// // import Pacientes from "./pages/pacientes/Pacientes";

// // import HistorialConsultas from "./pages/consultas/pages/HistorialConsultas";
// // import CatalogoMedicamentos from "./pages/medicamentos/pages/CatalogoMedicamentos";
// // import RegistroMedicamentos from "./pages/medicamentos/pages/RegistroMedicamentos";
// // import CapturarDatosMedicos from "./pages/pacientes/pages/CapturarDatosMedicos";
// // import ListadosPacientes from "./pages/pacientes/pages/ListadosPacientes";
// // import RecetasPacientes from "./pages/pacientes/pages/RecetasPacientes";
// // import RegistrarPaciente from "./pages/pacientes/pages/RegistrarPaciente";

// // function App() {
// //   return (
// //     <Router>
// //       <Routes>
// //         {/* Página de inicio */}
// //         <Route path="/" element={<Login />} />

// //         {/* Dashboard principal */}
// //         <Route element={<MainLayout />}>
// //           <Route path="/dashboard" element={<Dashboard />} />

// //           {/* Rutas principales de apartados */}
// //           <Route path="/dashboard/consultas" element={<Consultas />} />
// //           <Route path="/dashboard/medicamentos" element={<Medicamentos />} />
// //           <Route path="/dashboard/pacientes" element={<Pacientes />} />

// //           {/* Rutas de subapartados de Consultas */}
// //           <Route path="/dashboard/consultas/historialconsultas" element={<HistorialConsultas />} />

// //           {/* Rutas de subapartados de Medicamentos */}
// //           <Route path="/dashboard/medicamentos/catalogomedicamentos" element={<CatalogoMedicamentos />} />
// //           <Route path="/dashboard/medicamentos/registromedicamentos" element={<RegistroMedicamentos />} />

// //           {/* Rutas de subapartados de Pacientes */}
// //           <Route path="/dashboard/pacientes/capturardatosmedicos" element={<CapturarDatosMedicos />} />
// //           <Route path="/dashboard/pacientes/listadopacientes" element={<ListadosPacientes />} />
// //           <Route path="/dashboard/pacientes/recetaspacientes" element={<RecetasPacientes />} />
// //           <Route path="/dashboard/pacientes/registrarpacientes" element={<RegistrarPaciente />} />
// //         </Route>
// //       </Routes>
// //     </Router>
// //   );
// // }

// // export default App;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import MainLayout from "./components/MainLayout";
// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import Consultas from "./pages/consultas/Consultas";
// import Medicamentos from "./pages/medicamentos/Medicamentos";
// import Pacientes from "./pages/pacientes/Pacientes";

// // Subapartados
// import HistorialConsultas from "./pages/consultas/pages/HistorialConsultas";
// import CatalogoMedicamentos from "./pages/medicamentos/pages/CatalogoMedicamentos";
// import RegistroMedicamentos from "./pages/medicamentos/pages/RegistroMedicamentos";
// import CapturarDatosMedicos from "./pages/pacientes/pages/CapturarDatosMedicos";
// import ListadosPacientes from "./pages/pacientes/pages/ListadosPacientes";
// import RecetasPacientes from "./pages/pacientes/pages/RecetasPacientes";
// import RegistrarPaciente from "./pages/pacientes/pages/RegistrarPaciente";

// import PrivateRoute from "./components/PrivateRoute";

// import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer } from "react-toastify";

// function App() {
//   return (
//     <>
//       <Router>
//         <Routes>
//           {/* Página de login */}
//           <Route path="/" element={<Login />} />

//           {/* Rutas protegidas */}
//           <Route
//             element={
//               <PrivateRoute>
//                 <MainLayout />
//               </PrivateRoute>
//             }
//           >
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/dashboard/consultas" element={<Consultas />} />
//             <Route path="/dashboard/medicamentos" element={<Medicamentos />} />
//             <Route path="/dashboard/pacientes" element={<Pacientes />} />

//             {/* Subrutas de Consultas */}
//             <Route path="/dashboard/consultas/historialconsultas" element={<HistorialConsultas />} />

//             {/* Subrutas de Medicamentos */}
//             <Route path="/dashboard/medicamentos/catalogomedicamentos" element={<CatalogoMedicamentos />} />
//             <Route path="/dashboard/medicamentos/registromedicamentos" element={<RegistroMedicamentos />} />

//             {/* Subrutas de Pacientes */}
//             <Route path="/dashboard/pacientes/capturardatosmedicos" element={<CapturarDatosMedicos />} />
//             <Route path="/dashboard/pacientes/listadopacientes" element={<ListadosPacientes />} />
//             <Route path="/dashboard/pacientes/recetaspacientes" element={<RecetasPacientes />} />
//             <Route path="/dashboard/pacientes/registrarpacientes" element={<RegistrarPaciente />} />
//           </Route>
//         </Routes>
//       </Router>
//       <ToastContainer />
//     </>
//   );
// }

// export default App;


// import React from "react";
import CapturarDatosMedicos from "@/pages/pacientes/pages/CapturarDatosMedicos";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <CapturarDatosMedicos />
    </div>
  );
}

export default App;