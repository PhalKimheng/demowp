import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import { Button, Placeholder } from "@wordpress/components";
import defaultAttr from "./defaultAttr.json"
import './style.css';
import {Slide} from "./slide";

const edit = ({ attributes, setAttributes }) => {
    const updateSlide = (index, field, value) => {
        const newSlides = [...attributes.slides];
        newSlides[index] = { ...newSlides[index], [field]: value };
        setAttributes({ slides: newSlides });
    };
    const updatePostSlide = (field, index) => {
        const newSlides = [...attributes.slides];
        newSlides[index] = { ...newSlides[index], ...field };
        setAttributes({ slides: newSlides });
    };
    const addSlide = () => {
        const newSlides = [...attributes.slides, { ...defaultAttr }];
        setAttributes({ slides: newSlides });
    };

    const removeSlide = (index) => {
        const newSlides = attributes.slides.filter((_, i) => i !== index);
        setAttributes({ slides: newSlides });
    };

    const blockProps = useBlockProps();

    return (
        <>
            <InspectorControls>
                {attributes.slides.map((slide, index) => (
                    <Slide
                        key={slide.id}
                        index={index}
                        slide={slide}
                        updateSlide={updateSlide}
                        removeSlide={removeSlide}
                        updatePostSlide={updatePostSlide}
                    />
                ))}
                <Button isPrimary onClick={addSlide}>Add Slide</Button>
            </InspectorControls>
            <div {...blockProps}>
                <Placeholder label={'Slide Show Block'} />
            </div>
        </>
    );
};

export default edit;