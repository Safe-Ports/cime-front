import { useState } from "react";

const RegistroMedicamento: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    unit_measure: "",
    eag_group_id: "",
    description: "",
    price: "",
    expiration_date: "",
    medicamento_serial_no: "",
    manufacturer_id: "",
    batch_id: "",
    contraindications: "",
    pharmaceutical_form: "",
    image_data: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image_data: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex justify-center pt-32 px-4 bg-white min-h-screen">
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-full max-w-5xl">
        <h1 className="text-2xl font-bold text-center mb-6 text-black">Registro de Medicamento</h1>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-black">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 rounded border border-gray-300 bg-white text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Unidad de Medida</label>
            <input
              type="text"
              name="unit_measure"
              value={formData.unit_measure}
              onChange={handleChange}
              className="w-full p-2 rounded border border-gray-300 bg-white text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Grupo EAG</label>
            <input
              type="text"
              name="eag_group_id"
              value={formData.eag_group_id}
              onChange={handleChange}
              className="w-full p-2 rounded border border-gray-300 bg-white text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Precio</label>
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full p-2 rounded border border-gray-300 bg-white text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Fecha de Expiración</label>
            <input
              type="date"
              name="expiration_date"
              value={formData.expiration_date}
              onChange={handleChange}
              className="w-full p-2 rounded border border-gray-300 bg-white text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Número de Serie</label>
            <input
              type="text"
              name="medicamento_serial_no"
              value={formData.medicamento_serial_no}
              onChange={handleChange}
              className="w-full p-2 rounded border border-gray-300 bg-white text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">ID del Fabricante</label>
            <input
              type="text"
              name="manufacturer_id"
              value={formData.manufacturer_id}
              onChange={handleChange}
              className="w-full p-2 rounded border border-gray-300 bg-white text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black">Lote</label>
            <input
              type="text"
              name="batch_id"
              value={formData.batch_id}
              onChange={handleChange}
              className="w-full p-2 rounded border border-gray-300 bg-white text-black"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-black">Descripción</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full p-2 rounded border border-gray-300 bg-white text-black"
            ></textarea>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-black">Contraindicaciones</label>
            <textarea
              name="contraindications"
              value={formData.contraindications}
              onChange={handleChange}
              rows={3}
              className="w-full p-2 rounded border border-gray-300 bg-white text-black"
            ></textarea>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-black">Forma Farmacéutica</label>
            <input
              type="text"
              name="pharmaceutical_form"
              value={formData.pharmaceutical_form}
              onChange={handleChange}
              className="w-full p-2 rounded border border-gray-300 bg-white text-black"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-black">Imagen del Medicamento</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full text-sm text-black file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Guardar Medicamento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistroMedicamento;
