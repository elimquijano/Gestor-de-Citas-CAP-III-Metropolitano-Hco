interface ItemsPerPageSelectorProps {
  itemsPerPageRedux: number; // Especifica el tipo aquí
  onChange: (newValue: number) => void;
}

const ItemsPerPageSelector: React.FC<ItemsPerPageSelectorProps> = ({
  itemsPerPageRedux,
  onChange,
}) => {
  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newValue = Number(e.target.value);
    onChange(newValue); // Llama a la función de devolución de llamada con el nuevo valor
  };

  return (
    <div>
      <label htmlFor="itemsPerPage">Ver:</label>
      <select
        id="itemsPerPage"
        className="ml-2 p-1 border rounded"
        value={itemsPerPageRedux}
        onChange={handleItemsPerPageChange}
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>
    </div>
  );
};

export default ItemsPerPageSelector;
