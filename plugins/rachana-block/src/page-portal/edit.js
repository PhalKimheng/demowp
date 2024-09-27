import {useBlockProps} from '@wordpress/block-editor';
import {Placeholder} from "@wordpress/components";

const edit = () => {
    const blockProps = useBlockProps();
    return (
        <div {...blockProps}>
            <Placeholder
                label={'Page Portal Block'}
            >
            </Placeholder>
        </div>
    );
};

export default edit;
