import { Button, Placeholder } from '@wordpress/components';
import { InspectorControls, MediaUpload, useBlockProps } from '@wordpress/block-editor';
import React from "@wordpress/element";

const edit = ({ attributes, setAttributes }) => {
    const { imageURL } = attributes;
    const blockProps = useBlockProps();

    return (
        <div {...blockProps}>
            <InspectorControls>
                <div className="col-md-12 image-upload-placeholder">
                    <MediaUpload
                        onSelect={(media) => setAttributes({imageURL: media.url})}
                        allowedTypes={['image']}
                        value={imageURL}
                        render={({open}) => (
                            <div>
                                {!imageURL ? (
                                    <Button onClick={open} isPrimary>
                                        Upload Image
                                    </Button>
                                ) : (
                                    <div className="uploaded-image">
                                        <img src={imageURL} alt="Organization Chart Image"/>
                                        <Button
                                            onClick={() => setAttributes({imageURL: null})}
                                            isLink
                                            isDestructive
                                        >
                                            Remove Image
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}
                    />
                </div>
            </InspectorControls>


            <Placeholder label="Organization Block">
                {!imageURL && (
                    <p>Please upload an image.</p>
                )}
            </Placeholder>
        </div>
    );
};

export default edit;
