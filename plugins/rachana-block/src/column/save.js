import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

const save = ({ attributes }) => {
    const { breakpointSizes, breakpointOptions } = attributes;
    const blockProps = useBlockProps.save();

    const colClasses = breakpointOptions
        .filter(option => option.isActive)
        .map(({ value }) => {
            if (value === 'xs') {
                return `col-${breakpointSizes[value]}`;
            } else if (!value){
                return null
            } else {
                return `col-${value}-${breakpointSizes[value]}`;
            }
        })
        .join(' ');

    return (
        <div {...blockProps} className={`col ${colClasses}`}>
            <InnerBlocks.Content />
        </div>
    );
};

export default save;