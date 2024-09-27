import {useBlockProps} from "@wordpress/block-editor";

const save = (props) => {
    const { type, message } = props.attributes;
    const blockProps = useBlockProps.save();

    return (
        <div {...blockProps} className={`cgds alert alert-${type} fade d-flex align-items-center alert-dismissible-link show`} role="alert">
            <i className="primary bi bi-exclamation-circle me-2"></i>
            {message}
            <button type="button" className="btn-close btn-sm" aria-label="Close Alert"></button>
        </div>
    );
};

export default save;
