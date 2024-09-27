import { useBlockProps } from '@wordpress/block-editor';

const save = (props) => {
    const { type, message, size = 'medium' } = props.attributes;
    const blockProps = useBlockProps.save();

    return (
        <div {...blockProps}>
            <button className={`btn btn-${type} ${size}`}>
                {message}
            </button>
        </div>
    );
};

export default save;
