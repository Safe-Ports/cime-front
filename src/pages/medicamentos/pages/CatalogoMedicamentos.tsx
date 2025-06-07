import { useState } from "react";

// Medicamentos dummy
const medicamentosDummy = [
  {
    id: "1",
    name: "Ibuprofeno",
    unit_measure: "mg",
    eag_group_id: "Adultos",
    description: "Antiinflamatorio y analgésico",
    price: 45.0,
    expitation_date: "2026-09-10",
    mdicamente_serial_no: "IBP-9982",
    manufacturer_id: "Pfizer",
    batch_id: "L22001",
    pharmaceutical_form: "Tableta",
    contraindications: "Úlceras gástricas",
    image_data: "", // base64 si lo deseas
  },
  {
    id: "2",
    name: "Paracetamol",
    unit_measure: "mg",
    eag_group_id: "Niños",
    description: "Alivia fiebre y dolor",
    price: 25.5,
    expitation_date: "2025-01-20",
    mdicamente_serial_no: "PAR-005",
    manufacturer_id: "Bayer",
    batch_id: "L20233",
    pharmaceutical_form: "Jarabe",
    contraindications: "Hepatitis",
    image_data: "",
  },
];

const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative border border-gray-300 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black hover:text-gray-600 text-2xl"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

const CatalogoMedicamentos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMedicamento, setSelectedMedicamento] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const itemsPerPage = 5;

  const filteredMedicamentos = medicamentosDummy.filter((m) =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMedicamentos.length / itemsPerPage);
  const currentItems = filteredMedicamentos.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const openModal = (medicamento: any) => {
    setSelectedMedicamento(medicamento);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMedicamento(null);
    setIsModalOpen(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full border border-gray-300">
        <h1 className="text-2xl font-bold mb-4 text-black">Listado de Medicamentos</h1>

        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4 text-black"
        />

        <table className="min-w-full bg-white text-black table-auto border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b border-gray-300 text-left">Nombre</th>
              <th className="py-2 px-4 border-b border-gray-300 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((med) => (
              <tr key={med.id}>
                <td className="py-2 px-4 border-b border-gray-300">{med.name}</td>
                <td className="py-2 px-4 border-b border-gray-300">
                  <button
                    onClick={() => openModal(med)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-sm"
                  >
                    Ver Detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginación */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="text-black">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedMedicamento && (
          <div className="text-black space-y-4">
            <h2 className="text-xl font-bold">Detalles del Medicamento</h2>

            {/* Imagen */}
            {selectedMedicamento.image_data && (
              <div className="flex justify-center">
                <img
                  src={`data:image/jpeg;base64,${selectedMedicamento.image_data}`}
                  alt={`Imagen de ${selectedMedicamento.name}`}
                  className="max-w-full max-h-64 object-contain"
                />
              </div>
            )}

            {/* Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p><strong>Nombre:</strong> {selectedMedicamento.name}</p>
                <p><strong>Unidad de Medida:</strong> {selectedMedicamento.unit_measure}</p>
                <p><strong>Grupo EAG:</strong> {selectedMedicamento.eag_group_id}</p>
                <p><strong>Descripción:</strong> {selectedMedicamento.description}</p>
                <p><strong>Precio:</strong> ${selectedMedicamento.price.toFixed(2)}</p>
              </div>
              <div>
                <p><strong>Fecha de Expiración:</strong> {selectedMedicamento.expitation_date}</p>
                <p><strong>Número de Serie:</strong> {selectedMedicamento.mdicamente_serial_no}</p>
                <p><strong>Fabricante:</strong> {selectedMedicamento.manufacturer_id}</p>
                <p><strong>Lote:</strong> {selectedMedicamento.batch_id}</p>
                <p><strong>Forma Farmacéutica:</strong> {selectedMedicamento.pharmaceutical_form}</p>
              </div>
            </div>

            <p><strong>Contraindicaciones:</strong> {selectedMedicamento.contraindications}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CatalogoMedicamentos;
