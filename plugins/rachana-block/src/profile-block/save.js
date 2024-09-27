import { InnerBlocks, useBlockProps } from "@wordpress/block-editor";

const save = ({ attributes }) => {
    const { title, imageUrl, name, role, showRole, link } = attributes;
    const blockProps = useBlockProps.save();
    const imgElement = (
        <img
            alt={`${name} photo`}
            src={imageUrl}
            decoding="async"
            className="profile-pic"
        />
    );
    const nameElement = link ? (
        <a href={link} target="_blank" rel="noopener noreferrer">
            <div className="fs-5 fs-md-6 text-center">
                <span>{title}</span>
                {' '}<span className="fw-bolder name">{name}</span>
            </div>
        </a>
    ) : (
        <div className="fs-5 fs-md-6 text-center">
            <span>{title}</span>{' '}<span className="name fw-bold">{name}</span>
        </div>
    );
    return (
        <div {...blockProps} className="profile-block cgds d-grid justify-content-center gap-3">
            <div
                className="profile-pic-container position-relative rounded-circle overflow-hidden border border-white shadow">
                {link ? (
                    <a href={link} target="_blank" rel="noopener noreferrer">
                        {imgElement}
                    </a>
                ) : (
                    imgElement
                )}
            </div>
            {nameElement}
            {showRole && (
                <div className="fs-5 text-center fs-md-6 role">
                    {role}
                </div>
            )}
        </div>
    );
};

export default save;
