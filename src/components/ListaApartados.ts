import * as Icons from "react-icons/fa";

export const ListaApartados = [
  {
    title: "Pacientes",
    icon: Icons.FaUserInjured,
    path: "/dashboard/pacientes",
  },
  // {
  //   title: "Consultas",
  //   icon: Icons.FaStethoscope,
  //   path: "/dashboard/consultas",
  // },
  // {
  //   title: "Medicamentos",
  //   icon: Icons.FaPills,
  //   path: "/dashboard/medicamentos",
  // },
];

export const ListaSubApartados = {
  // consultas: {
  //   tituloPrincipal: "Consultas", // 🔹 Solo en los subapartados
  //   submenus: [
  //     {
  //       title: "Historial de Consultas",
  //       icon: Icons.FaClipboardList,
  //       path: "/dashboard/consultas/historialconsultas",
  //     },
  //   ],
  // },
  // medicamentos: {
  //   tituloPrincipal: "Medicamentos", // 🔹 Solo en los subapartados
  //   submenus: [
  //     {
  //       title: "Catálogo de Medicamentos",
  //       icon: Icons.FaCapsules,
  //       path: "/dashboard/medicamentos/catalogomedicamentos",
  //     },
  //     {
  //       title: "Registro de Medicamentos",
  //       icon: Icons.FaFileMedical,
  //       path: "/dashboard/medicamentos/registromedicamentos",
  //     },
  //   ],
  // },
  pacientes: {
    tituloPrincipal: "Pacientes", // 🔹 Solo en los subapartados
    submenus: [
      {
        title: "Registrar Paciente",
        icon: Icons.FaUserPlus,
        path: "/dashboard/pacientes/registrarpacientes",
      },
      {
        title: "Capturar Datos Médicos",
        icon: Icons.FaNotesMedical,
        path: "/dashboard/pacientes/capturardatosmedicos",
      },
      {
        title: "Recetas Pacientes",
        icon: Icons.FaFilePrescription,
        path: "/dashboard/pacientes/recetaspacientes",
      },
      {
        title: "Listado de Pacientes",
        icon: Icons.FaClipboardList,
        path: "/dashboard/pacientes/listadopacientes",
      }
    ],
  },
};
