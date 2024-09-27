import './style.css';
import save from './save';
import { registerBlockType } from '@wordpress/blocks';
import edit from './edit';
registerBlockType('rachana-block/page-portal', {
    edit,
    save,
});
