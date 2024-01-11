import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import config from "../../config";
const baseUrl = config.baseUrl;

interface Column {
  label: string; // El nombre de la columna que se mostrará en la tabla
  property: string; // El nombre de la propiedad en los objetos de datos
  transform?: (value: any) => React.ReactNode;
}

interface TableProps {
  columns: Column[];
  data: Record<string, any>[]; // Usamos un tipo Record para permitir diferentes tipos de datos
  onEditClick: (item: Record<string, any>) => void; // Callback para el botón de editar
  onDeleteClick: (item: Record<string, any>) => void; // Callback para el botón de eliminar
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  onEditClick,
  onDeleteClick,
}) => {
  return (
    <div className="overflow-x-auto rounded-lg">
      <table className="w-full border">
        <thead className="bg-[#009EFB] text-white font-sans">
          <tr>
            {columns.map((column) => (
              <th key={column.label} className="p-2 font-extralight text-start">
                {column.label}
              </th>
            ))}
            <th className="p-2 font-extralight text-start">Acción</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-200">
              {columns.map((column) => (
                <td className="p-2 whitespace-nowrap" key={column.property}>
                  {/* Imagen o Texto */}
                  {String(item[column.property]).includes(".jpg") ||
                  String(item[column.property]).includes(".png") ? (
                    <img
                      src={`${baseUrl}/storage/${item[column.property]}`}
                      
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    column.transform ? column.transform(item[column.property]) : item[column.property]
                  )}
                
                </td>
              ))}
              <td className="p-2 whitespace-nowrap flex gap-1">
                <div className="p-2 bg-warning rounded flex items-center">
                  <button
                    className="text-white"
                    onClick={() => onEditClick(item)}
                  >
                    <FaEdit />
                  </button>
                </div>
                <div className="p-2 bg-danger rounded flex items-center">
                  <button
                    className="text-white"
                    onClick={() => onDeleteClick(item)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
