import React from 'react';

interface ButtonProps {
    classColor: string;
    text: string;
    onClick: () => void;
}

const ButtonComun: React.FC<ButtonProps> = ({ classColor, text, onClick}) => {
    return (
        <button onClick={onClick} className={`${classColor} text-white px-4 py-2 rounded-lg`} type='button'>
            {text}
        </button>
    );
}

export default ButtonComun;
