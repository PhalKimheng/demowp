import {Placeholder, RangeControl, SelectControl, ToggleControl} from '@wordpress/components';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {useEffect} from "@wordpress/element";
import {categoryValue, fetchCategoriesList, fetchPosts} from "../api";

const edit = ({ attributes, setAttributes }) => {
    const blockProps = useBlockProps();
    const { postCount, displayCategoryButtons, displayTimeAndAuthor, fetchByCategory, categoryId, categories = [] } = attributes;

    useEffect(() => {
        if (!categories.length) {
            fetchCategoriesList(setAttributes).then(() => null)
        }
    }, []);

    useEffect(() => {
        fetchPosts(postCount, categoryId, setAttributes);
    }, [postCount, categoryId]);

    return (
        <div {...blockProps}>
            <InspectorControls>
                <ToggleControl
                    label="Display Time Author"
                    checked={displayTimeAndAuthor}
                    onChange={(value) => setAttributes({ displayTimeAndAuthor: value })}
                />
                <ToggleControl
                    label="Display Category Buttons"
                    checked={displayCategoryButtons}
                    onChange={(value) => setAttributes({ displayCategoryButtons: value })}
                />
                <ToggleControl
                    label={fetchByCategory ? "Show Posts by Category" : "Show Mixed Categories"}
                    checked={fetchByCategory}
                    onChange={(value) => setAttributes({ fetchByCategory: value })}
                />
                {fetchByCategory && (
                    <SelectControl
                        label="Category"
                        value={categoryId}
                        options={[{ label: "Select a category", value: null }, ...categories]}
                        onChange={(value) => {
                            const { intCategoryId } = categoryValue(value, categories);
                            setAttributes({ categoryId: intCategoryId });
                        }}
                    />
                )}
                <RangeControl
                    label="Number of Posts"
                    value={postCount}
                    onChange={(value) => setAttributes({ postCount: value })}
                    min={1}
                    max={20}
                />
            </InspectorControls>
            <Placeholder label="Latest Posts Slide Show" />
        </div>
    );
};

export default edit;
