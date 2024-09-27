import save from './save';
import defaultAttr from './defaultAttr.json';
import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
import {generateAttributes} from "../blockHelpers";
import "./style.css"
const attributes = generateAttributes(defaultAttr);
registerBlockType('rachana-block/profile-block', {
    attributes: attributes,
    edit,
    save,
});
