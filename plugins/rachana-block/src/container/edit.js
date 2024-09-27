import { Placeholder, SelectControl, PanelBody } from "@wordpress/components";
import {
  InnerBlocks,
  InspectorControls,
  useBlockProps,
} from "@wordpress/block-editor";
import { useEffect, useState } from "@wordpress/element";
import { objectMapping } from "../blockHelpers";
const edit = ({ attributes, setAttributes }) => {
  const blockProps = useBlockProps();
  const { breakpoint, options, colors, color } = attributes;
  const formattedOptions = objectMapping(options);
  const colorOptions = objectMapping(colors);

  useEffect(() => {
    if (colors == "grey") {
      setAttributes({ breakpoint: "" });
    }
  }, [colors]);

  return (
    <div {...blockProps}>
      <InspectorControls>
        <PanelBody title="Container Options">
          <SelectControl
            label="Background Color"
            value={color}
            options={colorOptions}
            onChange={(newValue) => setAttributes({ color: newValue })}
          />
          <SelectControl
            label="Container Breakpoint (Bootstrap Standard)"
            value={breakpoint}
            options={formattedOptions}
            disabled={color == "gray"}
            onChange={(newValue) => setAttributes({ breakpoint: newValue })}
          />
        </PanelBody>
      </InspectorControls>
      <Placeholder label={`Bootstrap Container Block ${breakpoint}`}>
        <InnerBlocks
          renderAppender={() => <InnerBlocks.ButtonBlockAppender />}
        />
      </Placeholder>
    </div>
  );
};

export default edit;
