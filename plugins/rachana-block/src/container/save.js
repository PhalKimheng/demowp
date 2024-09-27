import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

const save = ({ attributes }) => {
  const { breakpoint, color } = attributes;
  const blockProps = useBlockProps.save();
  const containerClassName =
    color && color == "gray" ? "cgds-container" : `container${breakpoint}`;

  return color ? (
    <div {...blockProps} className={color}>
      <div className={containerClassName}>
        <InnerBlocks.Content />
      </div>
    </div>
  ) : (
    <div {...blockProps} className={containerClassName}>
      <InnerBlocks.Content />
    </div>
  );
};

export default save;
