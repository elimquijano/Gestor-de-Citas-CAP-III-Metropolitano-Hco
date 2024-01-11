import React, { useEffect, useRef, useState } from "react";

interface ImageInputProps {
  label: string;
  classColor: string;
  onChange: (file: File) => void;
  required?: boolean;
  currentImage?: string | null; // Nueva prop para el nombre del archivo actual
}

const ImageInput: React.FC<ImageInputProps> = ({ label, classColor, onChange, required = false,currentImage }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    // UseEffect para actualizar el nombre del archivo cuando cambia currentImage
    if (currentImage) {
      const imageName = currentImage.split("/").pop(); // Obtenemos el nombre del archivo de la URL
      setFileName(imageName || null);
    }
  }, [currentImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
  
    if (file) {
      setSelectedFile(file);
      onChange(file);
      setFileName(file.name);
    }
  };

  const handleCustomButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Simula un clic en el input de tipo archivo
    }
  };

  return (
    <div className="w-full">
      <label htmlFor="image" className="block">
        {label}:
      </label>
      <div className="relative mt-2">
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*" // Acepta cualquier tipo de imagen
          onChange={handleFileChange}
          required={required}
          className="hidden"
          ref={fileInputRef}
        />
        <div className="flex border-2 border-slate-300 focus:border-sky-500 gap-2 rounded-lg">
        {(fileName || currentImage) && (
              <p>Archivo seleccionado: {fileName || currentImage}</p>
            )}
          <button
            type="button"
            onClick={handleCustomButtonClick}
            className={`w-1/10 ${classColor} text-white py-2 px-2 cursor-pointer rounded-r-lg ml-auto`}
          >
            Seleccionar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageInput;
