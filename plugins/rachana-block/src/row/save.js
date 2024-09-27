import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

const save = ({ attributes }) => {
    const { rowColumnCounts, breakpoints } = attributes;
    const blockProps = useBlockProps.save();

    const rowClasses = breakpoints
        .filter(breakpoint => breakpoint.isActive)
        .map(({ value }) => {
            if (value === 'xs') {
                return `row-cols-${rowColumnCounts[value]}`;
            } else if (!value) {
                return null
            } else {
                return `row-cols-${value}-${rowColumnCounts[value]}`;
            }
        })
        .join(' ');

    return (
        <div {...blockProps}>
            <div className={`row gap ${rowClasses}`}>
                <InnerBlocks.Content />
            </div>
        </div>
    );
};

export default save;