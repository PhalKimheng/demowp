import { InnerBlocks } from "@wordpress/block-editor";

const save = ({ attributes }) => {
  const { type, widthType } = attributes;

  return (
    <div className={widthType == "full" ? "cgds full-width" : ""}>
      {type && <InnerBlocks.Content />}
    </div>
  );
};

export default save;
