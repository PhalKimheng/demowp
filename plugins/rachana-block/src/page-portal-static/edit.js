import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Button, TextControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { Placeholder } from "@wordpress/components";

const Card = ({ icon, url, text, onChangeIcon, onChangeUrl, onChangeText, onRemove }) => (
    <PanelBody title={`Card: ${text || 'New Card'}`} initialOpen={false}>
        <TextControl
            label="Icon (Bootstrap icon name)"
            value={icon}
            onChange={onChangeIcon}
        />
        <TextControl
            label="URL"
            value={url}
            onChange={onChangeUrl}
        />
        <TextControl
            label="Text"
            value={text}
            onChange={onChangeText}
        />
        <Button isDestructive onClick={onRemove}>Remove Card</Button>
    </PanelBody>
);

const edit = ({ attributes, setAttributes }) => {
    const [cards, setCards] = useState(attributes.cards );

    const addCard = () => {
        const newCard = { icon: '', url: '', text: '' };
        setCards([...cards, newCard]);
        setAttributes({ cards: [...cards, newCard] });
    };

    const updateCard = (index, field, value) => {
        const newCards = [...cards];
        newCards[index][field] = value;
        setCards(newCards);
        setAttributes({ cards: newCards });
    };

    const removeCard = (index) => {
        const newCards = cards.filter((_, i) => i !== index);
        setCards(newCards);
        setAttributes({ cards: newCards });
    };

    const blockProps = useBlockProps();

    return (
        <>
            <InspectorControls>
                <PanelBody title="Page Portal Cards">
                    {cards.map((card, index) => (
                        <Card
                            key={index}
                            {...card}
                            onChangeIcon={(value) => updateCard(index, 'icon', value)}
                            onChangeUrl={(value) => updateCard(index, 'url', value)}
                            onChangeText={(value) => updateCard(index, 'text', value)}
                            onRemove={() => removeCard(index)}
                        />
                    ))}
                    <Button isPrimary onClick={addCard}>Add Card</Button>
                </PanelBody>
            </InspectorControls>
            <div {...blockProps}>
                <Placeholder
                    label={'Page Portal Block Static'}
                >
                </Placeholder>
            </div>
        </>
    );
};

export default edit;