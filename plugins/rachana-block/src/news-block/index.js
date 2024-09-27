import { registerBlockType } from '@wordpress/blocks';
import './style.css';
import {generateAttributes} from "../blockHelpers";
import defaultAttr from "./defaultAttr.json";
import edit from "./edit";
import save from "./save";

registerBlockType('rachana-block/news-block', {
    attributes:generateAttributes(defaultAttr),
    edit,
    save: (props) => save({ ...props, includeImage: true })
});
