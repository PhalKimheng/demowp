import { useBlockProps } from "@wordpress/block-editor";

const save = ({ attributes }) => {
    const { table } = attributes;
    const blockProps = useBlockProps.save();

    const tableSize = `${table.style === "table-responsive" ? "table-responsive" : "table-responsive-lg"}`;
    const tableClass = `table ${table.style}`;

    if (table.columns === 0) {
        return null;
    }

    let tableHtml = `
        <div class="${tableSize}">
            <table class="${tableClass}" style="color: ${table.cellTextColor}; width: ${table.width}%;">
                <thead>
                    <tr>
                        ${table.rows[0].cells.map((cell, cellIndex) => `
                            <th scope="col" style="background-color: ${table.headerColors?.[cellIndex] || 'transparent'}; color: ${table.headerTextColor};">
                                ${cell}
                            </th>
                        `).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${table.rows.slice(1).map((row, rowIndex) => `
                        <tr>
                            ${row.cells.map((cell, cellIndex) => `
                                <td>
                                    ${cellIndex === 0 ? rowIndex + 1 : cell}
                                </td>
                            `).join('')}
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;

    return (
        <div {...blockProps} className="wp-block-rachana-block-table">
            <div className="text-left">
                <h2>{table.caption}</h2>
            </div>
            <div dangerouslySetInnerHTML={{ __html: tableHtml }} />
        </div>
    );
};

export default save;
