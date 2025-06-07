import TemplateApartados from "@/components/TemplateApartados";
import { ListaSubApartados } from "@/components/ListaApartados";

const Pacientes = () => {
  return (
    <TemplateApartados 
      data={ListaSubApartados.pacientes.submenus} 
      tituloPrincipal={ListaSubApartados.pacientes.tituloPrincipal} 
    />
  );
};

export default Pacientes;
