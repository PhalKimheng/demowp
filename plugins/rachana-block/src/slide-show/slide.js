import {useEffect, useState} from "@wordpress/element";
import {categoryValue, fetchCategoriesList, fetchPostDataById, fetchPostsTitle} from "../api";
import {Button, ComboboxControl, PanelBody, SelectControl, TextControl, ToggleControl} from "@wordpress/components";
import {MediaUpload} from "@wordpress/block-editor";

export const Slide = ({ index, slide, updateSlide, removeSlide , updatePostSlide}) => {
    const [posts, setPosts] = useState([]);
    const [categoriesList, setCategoriesList] = useState([]);
    const [categoryId, setCategoryId] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            const categories = await fetchCategoriesList();
            setCategoriesList(categories);
        };
        fetchCategories().then(null);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const posts = await fetchPostsTitle(categoryId, null);
            setPosts(posts);
        };
        fetchData().then(null);
    }, [categoryId, slide.inputOption]);

    const handleCategoryChange = (newValue) => {
        const { intCategoryId } = categoryValue(newValue, categoriesList);
        setCategoryId(intCategoryId);
    };

    const handlePostSelection = async (postId) => {
        const postData = await fetchPostDataById(postId);
        const field = {
            slideTitle: postData.title,
            postAuthor: postData.author,
            postDate: postData.date,
            slideLink: postData.href,
            slideImage: postData.imageLink,
            categories: postData.categories,
        };
        updatePostSlide(field, index);
    };

    return (
        <PanelBody title={`Slide ${index + 1}`} initialOpen={false}>
            <SelectControl
                label="Input Option"
                value={slide.inputOption}
                options={[
                    { label: "Manual Input", value: "manual" },
                    { label: "Fetch Post", value: "fetch" },
                ]}
                onChange={(value) => updateSlide(index, "inputOption", value)}
            />
            {slide.inputOption === "fetch" && (
                <>
                    <SelectControl
                        label="Category"
                        value={categoryId}
                        options={[{ label: "Select a category", value: null }, ...categoriesList]}
                        onChange={handleCategoryChange}
                    />
                    {categoryId && (
                        <ComboboxControl
                            label="Select a Post"
                            value={slide.postData?.id}
                            options={posts}
                            onChange={handlePostSelection}
                        />
                    )}
                </>
            )}
            <TextControl
                label="Slide Title"
                value={slide.slideTitle}
                onChange={(value) => updateSlide(index, "slideTitle", value)}
            />
            <ToggleControl
                label="Show Author"
                checked={slide.showAuthor}
                onChange={(value) => updateSlide(index, "showAuthor", value)}
            />
            {slide.showAuthor && (
                <TextControl
                    label="Author"
                    value={slide.postAuthor}
                    onChange={(value) => updateSlide(index, "postAuthor", value)}
                />
            )}
            <ToggleControl
                label="Show Last Update"
                checked={slide.showDate}
                onChange={(value) => updateSlide(index, "showDate", value)}
            />
            {slide.showDate && (
                <TextControl
                    label="Last Update"
                    value={slide.postDate}
                    onChange={(value) => updateSlide(index, "postDate", value)}
                />
            )}
            <ToggleControl
                label="Show Image"
                checked={slide.showImage}
                onChange={(value) => updateSlide(index, "showImage", value)}
            />
            {slide.showImage && (
                <MediaUpload
                    onSelect={(media) => updateSlide(index, "slideImage", media.url)}
                    type="image"
                    value={slide.slideImage}
                    render={({ open }) => (
                        <div>
                            <Button isPrimary onClick={open}>
                                Upload/Select Image
                            </Button>
                            {slide.slideImage && (
                                <img
                                    src={slide.slideImage}
                                    alt={slide.slideImage.alt || 'Uploaded image'}
                                    style={{ width: '50px', height: '50px', marginLeft: '10px' }}
                                />
                            )}
                        </div>
                    )}
                />
            )}
            <ToggleControl
                label="Show Category Button"
                onChange={(value) => updateSlide(index, "showCategoryBtn", value)}
                checked={slide.showCategoryBtn}
            />
            {slide.showCategoryBtn && (
                <div className="category-links-wrapper">
                    {slide.categories.length > 0 ? (
                        slide.categories.map((category, categoryIndex) => (
                            <div key={categoryIndex} className="category-item">
                                <TextControl
                                    label={`Category ${categoryIndex + 1} Name`}
                                    value={category.name || ''}
                                    onChange={(value) => {
                                        const newCategories = [...slide.categories];
                                        newCategories[categoryIndex] = {...newCategories[categoryIndex], name: value};
                                        updateSlide(index, "categories", newCategories);
                                    }}
                                />
                                <TextControl
                                    label={`Category ${categoryIndex + 1} Link`}
                                    value={category.link || ''}
                                    onChange={(value) => {
                                        const newCategories = [...slide.categories];
                                        newCategories[categoryIndex] = {...newCategories[categoryIndex], link: value};
                                        updateSlide(index, "categories", newCategories);
                                    }}
                                />
                            </div>
                        ))
                    ) : (
                        <p>No categories available.</p>
                    )}
                    <Button
                        isPrimary
                        onClick={() => {
                            const newCategories = [...slide.categories, {name: '', link: ''}];
                            updateSlide(index, "categories", newCategories);
                        }}
                    >
                        Add Category
                    </Button>
                </div>
            )}
            <ToggleControl
                label="Show Read More Button"
                checked={slide.showReadMoreBtn}
                onChange={(value) => updateSlide(index, "showReadMoreBtn", value)}
            />
            {slide.showReadMoreBtn && (
                <>
                    <TextControl
                        label="Slide Link"
                        value={slide.slideLink}
                        onChange={(value) => updateSlide(index, "slideLink", value)}
                    />
                    <TextControl
                        label="Read More Text"
                        value={slide.readMoreText}
                        onChange={(value) => updateSlide(index, "readMoreText", value)}
                    />
                </>
            )}
            <Button isDestructive onClick={() => removeSlide(index)}>Remove Slide</Button>
        </PanelBody>
    );
};