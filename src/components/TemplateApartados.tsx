import { useNavigate } from "react-router-dom";

interface ApartadoItem {
  title: string;
  icon: any;
  path: string;
}

interface TemplateApartadosProps {
  data: ApartadoItem[]; // Lista de apartados o subapartados
  tituloPrincipal?: string; // Si se proporciona, se mostrará como título
}

const TemplateApartados: React.FC<TemplateApartadosProps> = ({ data, tituloPrincipal }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-black px-4 overflow-hidden">
      {/* 🔹 Contenedor del título */}
      {tituloPrincipal && (
        <h1 className="text-3xl font-bold text-center mb-6">{tituloPrincipal}</h1>
      )}

      {/* 🔹 Contenedor de botones sin scroll */}
      <div className="flex justify-center items-center w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.map((item) => {
            const IconComponent = item.icon;

            return (
              <div
                key={item.path}
                onClick={() => navigate(item.path)}
                className="cursor-pointer flex flex-col items-center justify-center bg-gray-100 text-black rounded-lg shadow-md w-44 h-44 hover:shadow-lg transition-all duration-300"
              >
                <div className="bg-gray-200 p-5 rounded-full flex justify-center items-center">
                  {IconComponent && <IconComponent className="text-5xl text-gray-600" />}
                </div>
                <div className="mt-3 text-lg font-medium text-center">{item.title}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TemplateApartados;
