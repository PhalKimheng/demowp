import { InspectorControls, useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { PanelBody, RangeControl, Placeholder, ToggleControl, Button } from '@wordpress/components';

const ALLOWED_BLOCKS = ['rachana-block/column'];

const edit = ({ attributes, setAttributes }) => {
    const { rowColumnCounts, breakpoints } = attributes;
    const blockProps = useBlockProps();

    const updateRowColumnCount = (breakpoint, value) => {
        const newCounts = { ...rowColumnCounts };
        newCounts[breakpoint] = value;
        setAttributes({ rowColumnCounts: newCounts });
    };

    const toggleBreakpoint = (value) => {
        const updatedBreakpoints = breakpoints.map(breakpoint =>
            breakpoint.value === value ? { ...breakpoint, isActive: !breakpoint.isActive } : breakpoint
        );
        setAttributes({ breakpoints: updatedBreakpoints });
    };

    return (
        <div {...blockProps}>
            <InspectorControls>
                <PanelBody title="Row Settings" initialOpen={true}>
                    {breakpoints.map(({ label, value, isActive }) => (
                        <div className="row-column-box" key={value} style={{ marginBottom: '10px' }}>
                            <ToggleControl
                                label={isActive ? `Unset columns for ${label}` : `Set columns for ${label}`}
                                checked={isActive}
                                onChange={() => toggleBreakpoint(value)}
                            />
                            {isActive && (
                                <RangeControl
                                    label={`Columns for ${label}`}
                                    value={rowColumnCounts[value] || 0}
                                    onChange={(newValue) => updateRowColumnCount(value, newValue)}
                                    min={0}
                                    max={12}
                                />
                            )}
                        </div>
                    ))}
                    <Button
                        isPrimary
                        onClick={() => wp.data.dispatch('core/block-editor').insertBlock(wp.blocks.createBlock(ALLOWED_BLOCKS[0]), undefined, wp.data.select('core/block-editor').getSelectedBlockClientId())}
                    >
                        Add Column
                    </Button>
                </PanelBody>
            </InspectorControls>
            <div className="bootstrap-row">
                <Placeholder label="Row">
                    <InnerBlocks allowedBlocks={ALLOWED_BLOCKS} />
                </Placeholder>
            </div>
        </div>
    );
};

export default edit;