import {
  InnerBlocks,
  InspectorControls,
  useBlockProps,
} from "@wordpress/block-editor";
import {
  Placeholder,
  RadioControl,
  SelectControl,
  PanelBody,
} from "@wordpress/components";
import { useEffect, useState } from "@wordpress/element";
import { useDispatch, useSelect } from "@wordpress/data";
import { createBlock } from "@wordpress/blocks";
import { objectMapping } from "../blockHelpers";

const edit = ({ attributes, setAttributes, clientId }) => {
  const { options, type, innerBlocksContent, widthOptions, widthType } =
    attributes;
  console.log(attributes, widthOptions, widthType);

  const blockProps = useBlockProps();
  const { replaceInnerBlocks } = useDispatch("core/block-editor");
  const [isInitialized, setIsInitialized] = useState(false);

  // const FormatWidthOptions = objectMapping(widthOptions);

  const innerBlocks = useSelect(
    (select) => select("core/block-editor").getBlocks(clientId),
    [clientId]
  );

  const hasInnerBlocks = innerBlocks.length > 0;

  const handleTypeChange = (newType) => {
    setAttributes({ type: newType });
    replaceInnerBlocks(clientId, [createBlock(newType)], false);
  };

  useEffect(() => {
    if (!isInitialized) {
      if (innerBlocksContent && innerBlocksContent.length > 0) {
        replaceInnerBlocks(
          clientId,
          innerBlocksContent.map((block) =>
            createBlock(block.name, block.attributes, block.innerBlocks)
          ),
          false
        );
      } else if (type && !hasInnerBlocks) {
        replaceInnerBlocks(clientId, [createBlock(type)], false);
      }
      setIsInitialized(true);
    }
  }, [
    isInitialized,
    innerBlocksContent,
    type,
    hasInnerBlocks,
    clientId,
    replaceInnerBlocks,
  ]);

  useEffect(() => {
    if (isInitialized) {
      saveInnerBlocksContent();
    }
  }, [innerBlocks]);

  const saveInnerBlocksContent = () => {
    const currentInnerBlocks = innerBlocks.map((block) => ({
      name: block.name,
      attributes: block.attributes,
      innerBlocks: block.innerBlocks,
    }));
    setAttributes({ innerBlocksContent: currentInnerBlocks });
  };

  return (
    <div {...blockProps}>
      <InspectorControls>
        <PanelBody title="Options">
          <SelectControl
            label="width"
            value={widthType}
            options={widthOptions}
            onChange={(newValue) => setAttributes({ widthType: newValue })}
          />
        </PanelBody>
      </InspectorControls>
      <Placeholder label="Carousel">
        <RadioControl
          selected={type}
          options={options}
          onChange={handleTypeChange}
        />
        {type && (
          <InnerBlocks
            allowedBlocks={[type]}
            templateLock="all"
            renderAppender={false}
          />
        )}
      </Placeholder>
    </div>
  );
};

export default edit;
