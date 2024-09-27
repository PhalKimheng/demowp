import { useBlockProps } from '@wordpress/block-editor';

const save = ({ attributes }) => {
    const { imageURL } = attributes;
    const blockProps = useBlockProps.save();

    return (
        <div {...blockProps} className="text-center">
            {imageURL && (
                <img
                    src={imageURL}
                    alt="Organization Chart Image"
                    className="img-fluid mx-auto d-block"
                />
            )}
            <p className="text-center">
                <a href={imageURL} download target="_blank" rel="noopener noreferrer" className="mt-5 cgds btn btn-primary">
                    Download Full Structure
                </a>
            </p>
        </div>
    );
};

export default save;
