import { registerBlockType } from '@wordpress/blocks';
import './style.css';
import { generateAttributes } from "../blockHelpers";
import defaultAttr from "../news-block/defaultAttr.json";
import edit from "../news-block/edit";
import save from "../news-block/save";

const attributes = {
    ...generateAttributes(defaultAttr),
    title: {
        type: 'string',
        default: 'Announcement Block'
    }
};

registerBlockType('rachana-block/announcement-block', {
    attributes,
    edit,
    save: (props) => save({ ...props, includeImage: false }),
});
