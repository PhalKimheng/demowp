import React, {useState} from "@wordpress/element";

export const ColorInput = ({ label, color, defaultColor, onChange }) => {
    const [tempColor, setTempColor] = useState(color);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setTempColor(value);
        onChange(value);
    };

    const handleColorChange = (e) => {
        const value = e.target.value;
        setTempColor(value);
        onChange(value);
    };

    const handleResetToDefault = () => {
        setTempColor(defaultColor);
        onChange(defaultColor);
    };

    return (
        <div className="components-base-control">
            <label className="components-base-control__label">{label}</label>
            <div style={{ display: "flex", alignItems: "center" }}>
                <input
                    type="text"
                    value={tempColor}
                    onChange={handleInputChange}
                    className="components-text-control__input"
                    style={{ marginRight: "10px", flex: "1" }}
                />
                <input
                    type="color"
                    value={tempColor.startsWith('var(') ? '#000000' : tempColor}
                    onChange={handleColorChange}
                    className="components-color-picker__input"
                    style={{ flex: "0" }}
                />
                <button
                    className="components-button components-core-button"
                    onClick={handleResetToDefault}
                    style={{ marginLeft: "10px" }}
                >
                    Reset
                </button>
            </div>
        </div>
    );
};
