import React, {useEffect, useState} from "@wordpress/element";
import {
    Button,
    ComboboxControl,
    DatePicker,
    PanelBody,
    SelectControl,
    ToggleControl,
} from "@wordpress/components";
import {
    InspectorControls,
    MediaUpload,
    RichText,
    useBlockProps,
} from "@wordpress/block-editor";
import {
    formatDate, getRelativeTime, isHorizontalStyle
} from "../blockHelpers";
import {ColorInput} from "../customComponent";

import defaultAttr from "./defaultAttr.json";
import {categoryValue,fetchPostDataById, fetchCategoriesList, fetchPostsTitle} from "../api";

const edit = ({ attributes, setAttributes }) => {
  const {
    newTab,
    border,
    padding,
    btnColor,
    inputOption,
    style,
    post,
    posts,
    contentColor,
    titleColor,
    bgColor,
    date,
    author,
    showAuthorAndTime,
    showImage,
    imageUrl,
    imageWidth,
    title,
    content,
    showRouteButton,
    linkText,
    href,
    displayContent,
    imageAspectRatio,
    sizeAuto,
  } = attributes;

  const [categoriesList, setCategoriesList] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const blockProps = useBlockProps();

    useEffect(() => {
        const fetchCategories = async () => {
            const categories = await fetchCategoriesList();
            setCategoriesList(categories);
        };
        fetchCategories().then(null);
    }, []);

    useEffect(() => {
        if (inputOption === "fetch" && categoryId) {
            fetchPostsTitle(categoryId, setAttributes).then(null);
        }
    }, [inputOption, categoryId]);

    const handleCategoryChange = (newValue) => {
        const { intCategoryId } = categoryValue(newValue, categoriesList);
        setCategoryId(intCategoryId);
    };

  const resetAttributesToDefault = () => {
    setAttributes({
      contentColor: defaultAttr.contentColor,
      titleColor: defaultAttr.titleColor,
      bgColor: defaultAttr.bgColor,
    });
  };

  return (
      <div {...blockProps}>
        <InspectorControls>
          <PanelBody title="Card Settings">
            <SelectControl
                label="Input Option"
                value={inputOption}
                options={[
                  { label: "Manual Input", value: "manual" },
                  { label: "Fetch Post", value: "fetch" },
                ]}
                onChange={(value) => setAttributes({ inputOption: value })}
            />
            {inputOption === "fetch" && (
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
                          value={post?.id}
                          options={posts}
                          onChange={(postId) => fetchPostDataById(postId, setAttributes)}
                      />
                  )}
                </>
            )}
            <SelectControl
                label="Card Style"
                value={style || ""}
                options={[
                  { label: "Vertical", value: "" },
                  { label: "Horizontal", value: "card-horizontal" },
                ]}
                onChange={(value) => setAttributes({ style: value })}
            />
            {showImage && isHorizontalStyle(style) && (
                <SelectControl
                    label="Image Width"
                    value={imageWidth}
                    options={[
                      { label: "20%", value: 20 },
                      { label: "35%", value: 35 },
                      { label: "50%", value: 50 },
                    ]}
                    onChange={(value) => setAttributes({ imageWidth: value })}
                />
            )}
            <SelectControl
                label="Image Aspect Ratio"
                value={imageAspectRatio}
                options={[
                  { label: "21x9", value: "ratio-21x9" },
                  { label: "16x9", value: "ratio-16x9" },
                  { label: "4x3", value: "ratio-4x3" },
                  { label: "1x1", value: "ratio-1x1" }
                ]}
                onChange={(value) => setAttributes({ imageAspectRatio: value })}
            />
            <ColorInput
                label="Body Text Color"
                color={contentColor}
                defaultColor={defaultAttr.contentColor}
                onChange={(value) => setAttributes({ contentColor: value })}
            />
            <ColorInput
                label="Card Title Color"
                color={titleColor}
                defaultColor={defaultAttr.titleColor}
                onChange={(value) => setAttributes({ titleColor: value })}
            />
            <ColorInput
                label="Card Background Color"
                color={bgColor}
                defaultColor={defaultAttr.bgColor}
                onChange={(value) => setAttributes({ bgColor: value })}
            />
            <ColorInput
                label="Card Button Color"
                color={btnColor}
                defaultColor={defaultAttr.btnColor}
                onChange={(value) => setAttributes({ btnColor: value })}
            />
            <Button isSecondary onClick={resetAttributesToDefault}>
              Reset Colors to Default
            </Button>
          </PanelBody>
        </InspectorControls>
        <div className="card" style={{ background: bgColor }}>
          <ToggleControl
              label={`Display Border: ${border ? "On" : "Off"}`}
              checked={border}
              onChange={(value) => setAttributes({ border: value })}
          />
          <ToggleControl
              label="Size Auto"
              checked={sizeAuto}
              onChange={(value) => setAttributes({ sizeAuto: value })}
          />
          <ToggleControl
              label="Padding"
              checked={padding}
              onChange={(value) => setAttributes({ padding: value })}
          />
          <ToggleControl
              label="Show Author and Time"
              checked={showAuthorAndTime}
              onChange={(value) => setAttributes({ showAuthorAndTime: value })}
          />
          {showAuthorAndTime && (
              <div className="components-base-control">
                <DatePicker
                    currentDate={date}
                    onChange={(date) => setAttributes({ date: formatDate(date) })}
                    isClearable
                />
                <RichText
                    tagName="p"
                    value={getRelativeTime(date)}
                    onChange={(value) =>
                        setAttributes({ date: getRelativeTime(value) })
                    }
                    placeholder="Last updated: [date/time]..."
                    className="card-text"
                />
                <RichText
                    tagName="p"
                    value={author}
                    onChange={(value) => setAttributes({ author: value })}
                    className="card-text"
                    placeholder="Author name goes here"
                />
              </div>
          )}
          <ToggleControl
              label="Show Image"
              checked={showImage}
              onChange={(value) => setAttributes({ showImage: value })}
          />
          {showImage && (
              <div className="col-md-12 image-upload-placeholder">
                <MediaUpload
                    onSelect={(media) => setAttributes({ imageUrl: media.url })}
                    allowedTypes={["image"]}
                    value={imageUrl}
                    render={({ open }) => (
                        <div>
                          {!imageUrl ? (
                              <Button onClick={open} isPrimary>
                                Upload Image
                              </Button>
                          ) : (
                              <div className="uploaded-image">
                                <img src={imageUrl} alt="Card Image" />
                                <Button
                                    onClick={() => setAttributes({ imageUrl: null })}
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
          )}
          <RichText
              tagName="h2"
              value={title}
              onChange={(value) => setAttributes({ title: value })}
              placeholder="Enter card title..."
              className="card-title"
              allowedFormats={["core/bold", "core/heading"]}
          />
          <ToggleControl
              label="Display Content"
              checked={displayContent}
              onChange={(value) => setAttributes({ displayContent: value })}
          />
          {displayContent && (
              <RichText
                  tagName="p"
                  value={content}
                  onChange={(value) => setAttributes({ content: value })}
                  placeholder="Enter card content..."
                  className="card-content"
                  allowedFormats={["core/bold", "core/heading"]}
              />
          )}
          <ToggleControl
              label="Show Route Button"
              checked={showRouteButton}
              onChange={(value) => setAttributes({ showRouteButton: value })}
          />
          {showRouteButton && (
              <>
                <RichText
                    tagName="p"
                    value={linkText}
                    onChange={(value) => setAttributes({ linkText: value })}
                    placeholder='Enter link guide e.g., "Click here for more details" ...'
                    className="card-content"
                    allowedFormats={["core/bold", "core/heading"]}
                />
                <RichText
                    tagName="p"
                    value={href}
                    onChange={(value) => setAttributes({ href: value })}
                    placeholder="Enter the link to the page ..."
                    className="card-content"
                    allowedFormats={["core/bold", "core/heading"]}
                />
                <ToggleControl
                    label="Open In New Tab?"
                    checked={newTab}
                    onChange={(value) => setAttributes({ newTab: value })}
                />
              </>
          )}
        </div>
      </div>
  );
};

export default edit;
