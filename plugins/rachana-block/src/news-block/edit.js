import { RangeControl, SelectControl } from '@wordpress/components';
import { useEffect } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
import { categoryValue, fetchCategoriesList, fetchPosts } from "../api";

const edit = ({ attributes, setAttributes }) => {
    const blockProps = useBlockProps();
    const { categoryId, postCount, categoriesList, title } = attributes;

    useEffect(() => {
        fetchPosts(postCount, categoryId, setAttributes).then(null);
    }, [postCount, categoryId]);

    useEffect(() => {
        loadCategories().then(null);
    }, []);

    const loadCategories = async () => {
        try {
            const categoriesList = await fetchCategoriesList();
            setAttributes({ categoriesList });
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const handleRangeChange = (value) => {
        const nearestMultipleOfThree = Math.round(value / 3) * 3;
        setAttributes({ postCount: nearestMultipleOfThree });
    };

    const handleCategoryChange = (newValue) => {
        const { link, label, intCategoryId } = categoryValue(newValue, categoriesList);
        setAttributes({
            categoryId: intCategoryId,
            categoryLink: link,
            categoryName: label
        });
    };

    return (
        <div {...blockProps}>
            <h2>{title}</h2>
            <RangeControl
                label="Number of Posts"
                value={postCount}
                onChange={handleRangeChange}
                min={6}
                max={30}
            />
            <SelectControl
                label="Category"
                value={categoryId}
                options={categoriesList || []}
                onChange={handleCategoryChange}
            />
            <p>This block will display a slide show of the latest {postCount} posts from the selected category.</p>
        </div>
    );
};

export default edit;
