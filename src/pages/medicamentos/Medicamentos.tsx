import TemplateApartados from "@/components/TemplateApartados";
import { ListaSubApartados } from "@/components/ListaApartados";

const Medicamentos = () => {
  return (
    <TemplateApartados 
      data={ListaSubApartados.medicamentos.submenus} 
      tituloPrincipal={ListaSubApartados.medicamentos.tituloPrincipal} 
    />
  );
};

export default Medicamentos;
