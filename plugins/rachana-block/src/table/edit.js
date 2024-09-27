import { PanelBody, TextControl, Button, SelectControl, RangeControl, ColorPicker } from "@wordpress/components";
import { InspectorControls, RichText, useBlockProps } from "@wordpress/block-editor";
import { plus, trash, undo } from '@wordpress/icons';

const edit = ({ attributes, setAttributes }) => {
    const { table } = attributes;
    const blockProps = useBlockProps();

    const customizeTable = (key, value) => {
        setAttributes({ table: { ...table, [key]: value } });
    };

    const addRow = () => {
        const numberOfCells = table.rows[0].cells.length;
        const newRow = { cells: Array(numberOfCells).fill("") };
        newRow.cells[0] = (table.rows.length).toString();
        setAttributes({ table: { ...table, rows: [...table.rows, newRow] } });
    };

    const addColumn = () => {
        const updatedRows = table.rows.map((row, index) => ({
            ...row,
            cells: index === 0 ? [...row.cells, "Header"] : [...row.cells, ""],
        }));
        setAttributes({ table: { ...table, columns: updatedRows[0].cells.length, rows: updatedRows } });
    };

    const removeColumn = columnIndex => {
        const updatedRows = table.rows.map(row => ({
            ...row,
            cells: row.cells.filter((_, index) => index !== columnIndex)
        }));
        setAttributes({ table: { ...table, columns: updatedRows[0].cells.length, rows: updatedRows } });
    };

    const removeRow = rowIndex => {
        const updatedRows = table.rows.filter((_, index) => index !== rowIndex);
        setAttributes({ table: { ...table, rows: updatedRows } });
    };

    const updateCellContent = (targetRowIndex, targetCellIndex, newValue) => {
        const updatedTableRows = table.rows.map((currentRow, currentRowIndex) => {
            if (currentRowIndex !== targetRowIndex) {
                return currentRow;
            }

            const updatedCells = currentRow.cells.map((cellContent, currentCellIndex) =>
                currentCellIndex === targetCellIndex ? newValue : cellContent
            );

            return { ...currentRow, cells: updatedCells };
        });

        setAttributes({ table: { ...table, rows: updatedTableRows } });
    };

    const updateHeaderCellColor = (cellIndex, color) => {
        const updatedColors = table.headerColors ? [...table.headerColors] : [];
        updatedColors[cellIndex] = color;
        setAttributes({ table: { ...table, headerColors: updatedColors } });
    };

    return (
        <div {...blockProps}>
            <InspectorControls>
                <PanelBody title="Table Settings">
                    <TextControl
                        label="Caption"
                        value={table.caption}
                        onChange={(value) => customizeTable("caption", value)}
                    />
                    <SelectControl
                        label="Table Style"
                        value={table.style}
                        options={[
                            { label: "Default", value: "" },
                            { label: "Small", value: "table-sm" },
                            { label: "Bordered", value: "table-bordered" },
                            { label: "Borderless", value: "table-borderless" },
                            { label: "Hover", value: "table-hover" },
                            { label: "Dark", value: "table-dark" },
                            { label: "Responsive", value: "table-responsive" },
                            { label: "Striped", value: "table-striped" },
                            { label: "Bordered and Striped", value: "table-bordered table-striped" },
                        ]}
                        onChange={(value) => customizeTable("style", value)}
                    />
                    <RangeControl
                        label="Table Width"
                        value={table.width}
                        onChange={(value) => customizeTable("width", value)}
                        min={0}
                        max={100}
                        step={10}
                    />
                    <div className="components-base-control">
                        <label className="components-base-control__label">Header Text Color</label>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <ColorPicker
                                color={table.headerTextColor}
                                onChangeComplete={(value) => customizeTable("headerTextColor", value.hex)}
                                disableAlpha
                            />
                            <Button
                                isSmall
                                className="btn btn-warning"
                                icon={undo}
                                onClick={() => customizeTable("headerTextColor", "#000000")}
                            />
                        </div>
                    </div>
                    <div className="components-base-control">
                        <label className="components-base-control__label">Cell Text Color</label>
                        <div className="color-picker-container">
                            <ColorPicker
                                color={table.cellTextColor}
                                onChangeComplete={(value) => customizeTable("cellTextColor", value.hex)}
                                disableAlpha
                            />
                            <Button
                                isSmall
                                className="btn btn-warning"
                                icon={undo}
                                onClick={() => customizeTable("cellTextColor", "#000000")}
                            />
                        </div>
                    </div>
                </PanelBody>
            </InspectorControls>

            <div className={`table-responsive${table.style === "table-responsive" ? "" : "-lg"}`}>
                <table className={`table ${table.style}`} style={{ width: `${table.width}%`, color: table.cellTextColor }}>
                    <RichText
                        tagName="caption"
                        value={table.caption}
                        onChange={(value) => customizeTable("caption", value)}
                        placeholder="Enter table caption..."
                    />
                    <thead>
                        <tr>
                            {table.rows[0].cells.map((_, cellIndex) => (
                                <th 
                                    key={cellIndex} 
                                    scope="col" 
                                    style={{ 
                                        backgroundColor: table.headerColors?.[cellIndex] || 'transparent', 
                                        color: table.headerTextColor,
                                        textAlign: table.headerTextAlign 
                                    }}>
                                    <RichText
                                        tagName="span"
                                        value={table.rows[0].cells[cellIndex]}
                                        onChange={(value) => updateCellContent(0, cellIndex, value)}
                                        placeholder={`Header ${cellIndex + 1}`}
                                    />
                                    <Button isSmall icon={trash} onClick={() => removeColumn(cellIndex)} />
                                    <input
                                        type="color"
                                        value={table.headerColors?.[cellIndex] || '#ffffff'}
                                        onChange={(event) => updateHeaderCellColor(cellIndex, event.target.value)}
                                        style={{ width: '30px', height: '30px', padding: 0, border: 'none', background: 'none' }}
                                    />
                                </th>
                            ))}
                            <th>
                                <Button isSmall icon={plus} onClick={addColumn} />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {table.rows.slice(1).map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {row.cells.map((cell, cellIndex) => (
                                    <td 
                                        key={cellIndex} 
                                        style={{ textAlign: cellIndex === 0 ? "center" : table.bodyTextAlign }}>
                                        <RichText
                                            tagName="span"
                                            value={cellIndex === 0 && !cell ? (rowIndex + 1).toString() : cell}
                                            onChange={(value) => updateCellContent(rowIndex + 1, cellIndex, value)}
                                            placeholder={`Cell ${cellIndex + 1}`}
                                        />
                                    </td>
                                ))}
                                <td>
                                    <Button isSmall icon={trash} onClick={() => removeRow(rowIndex + 1)} />
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={table.columns + 1} style={{ border: "none" }}>
                                <Button isSmall icon={plus} onClick={addRow}></Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default edit;
