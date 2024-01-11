import React from "react"

const ButtonForm: React.FC<{
  label: string
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  classColor: string
}> = ({ label, onClick, classColor }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${classColor} text-white px-4 py-2 rounded-lg`}
    >
      {label}
    </button>
  )
}
export default ButtonForm
