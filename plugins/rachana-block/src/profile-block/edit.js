import { Fragment } from '@wordpress/element';
import { Placeholder, PanelBody, TextControl, Button, ToggleControl } from '@wordpress/components';
import { InspectorControls, MediaUpload, useBlockProps } from '@wordpress/block-editor';

const edit = ({ attributes, setAttributes }) => {
    const blockProps = useBlockProps();
    const { title, imageUrl, name, role, showRole, embeddedLink, link } = attributes;

    const onSelectImage = (media) => {
        setAttributes({ imageUrl: media.url });
    };

    const onRemoveImage = () => {
        setAttributes({ imageUrl: null });
    };

    return (
        <div {...blockProps}>
            <InspectorControls>
                <PanelBody title="Profile Block Setting">
                    <div className="cgds row profile-block d-flex flex-column align-items-center">
                        <MediaUpload
                            onSelect={onSelectImage}
                            allowedTypes={['image']}
                            value={imageUrl}
                            render={({ open }) => (
                                <div className="text-center">
                                    {!imageUrl ? (
                                        <Button onClick={open} isPrimary>
                                            Upload Image
                                        </Button>
                                    ) : (
                                        <Fragment>
                                            <div className="col w-100 d-flex align-items-center justify-content-center image-container">
                                                <img
                                                    src={imageUrl}
                                                    alt={`${name} profile`}
                                                    className="image"
                                                />
                                            </div>
                                            <div className="col">
                                                <Button onClick={open} isPrimary className="mb-2">
                                                    Edit Image
                                                </Button>
                                            </div>
                                            <div className="col">
                                                <Button onClick={onRemoveImage} isLink isDestructive>
                                                    Remove Image
                                                </Button>
                                            </div>
                                        </Fragment>
                                        )}
                                </div>
                            )}
                        />
                    </div>
                    <TextControl
                        label="Title"
                        value={title}
                        onChange={(value) => setAttributes({ title: value })}
                    />
                    <TextControl
                        label="Name"
                        value={name}
                        onChange={(value) => setAttributes({ name: value })}
                    />
                    <ToggleControl
                        label="Display role"
                        checked={showRole}
                        onChange={(value) => setAttributes({ showRole: value })}
                    />
                    {showRole && (
                        <TextControl
                            label="Role"
                            value={role}
                            onChange={(value) => setAttributes({ role: value })}
                        />
                    )}
                    <ToggleControl
                        label="Embed link to a profile page?"
                        checked={embeddedLink}
                        onChange={(value) => setAttributes({ embeddedLink: value })}
                    />
                    {embeddedLink && (
                        <TextControl
                            label="Link"
                            value={link}
                            onChange={(value) => setAttributes({ link: value })}
                        />
                    )}
                </PanelBody>
            </InspectorControls>
            <Placeholder label={`Profile Block for ${name || '...'}`} />
        </div>
    );
};

export default edit;