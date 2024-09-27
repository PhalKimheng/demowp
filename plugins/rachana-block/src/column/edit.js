import { InspectorControls, useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl, Placeholder } from '@wordpress/components';

const edit = ({ attributes, setAttributes }) => {
    const { breakpointSizes, breakpointOptions } = attributes;
    const blockProps = useBlockProps();

    const updateColumnSize = (breakpoint, value) => {
        const newSizes = { ...breakpointSizes };
        newSizes[breakpoint] = value;
        setAttributes({ breakpointSizes: newSizes });
    };

    const toggleBreakpoint = (value) => {
        const updatedOptions = breakpointOptions.map(option =>
            option.value === value ? { ...option, isActive: !option.isActive } : option
        );
        setAttributes({ breakpointOptions: updatedOptions });
    };

    return (
        <div {...blockProps}>
            <InspectorControls>
                <PanelBody title="Column Settings" initialOpen={true}>
                    {breakpointOptions.map(({ label, value, isActive }) => (
                        <div className="row-column-box" key={value} style={{ marginBottom: '10px' }}>
                            <ToggleControl
                                label={isActive ? `Unset width for ${label}` : `Set width for ${label}`}
                                checked={isActive}
                                onChange={() => toggleBreakpoint(value)}
                            />
                            {isActive && (
                                <RangeControl
                                    label={`Width for ${label}`}
                                    value={breakpointSizes[value] || 0}
                                    onChange={(newValue) => updateColumnSize(value, newValue)}
                                    min={0}
                                    max={12}
                                />
                            )}
                        </div>
                    ))}
                </PanelBody>
            </InspectorControls>
            <div className="columns-wrapper">
                <Placeholder label="Column" className="columns-wrapper">
                    <InnerBlocks />
                </Placeholder>
            </div>
        </div>
    );
};

export default edit;