import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { Button, PanelBody, Placeholder, TextControl } from "@wordpress/components";

const edit = ({ attributes, setAttributes }) => {
    const { members } = attributes;
    const blockProps = useBlockProps();

    const addMember = () => {
        const newMembers = [...members, { title: '', name: '', role: '', position: '' }];
        setAttributes({ members: newMembers });
    };

    const updateMember = (index, key, value) => {
        const newMembers = [...members];
        newMembers[index] = { ...newMembers[index], [key]: value };
        setAttributes({ members: newMembers });
    };

    const removeMember = (index) => {
        const newMembers = members.filter((_, i) => i !== index);
        setAttributes({ members: newMembers });
    };

    return (
        <>
            <InspectorControls>
                <PanelBody title="Members" initialOpen={true}>
                    {members.map((member, index) => (
                        <PanelBody
                            key={index}
                            title={`Member ${index + 1}`}
                            initialOpen={false}
                        >
                            <TextControl
                                label="Title"
                                value={member.title}
                                onChange={(value) => updateMember(index, 'title', value)}
                            />
                            <TextControl
                                label="Name"
                                value={member.name}
                                onChange={(value) => updateMember(index, 'name', value)}
                            />
                            <TextControl
                                label="Role"
                                value={member.role}
                                onChange={(value) => updateMember(index, 'role', value)}
                            />
                            <TextControl
                                label="Position"
                                value={member.position}
                                onChange={(value) => updateMember(index, 'position', value)}
                            />
                            <Button
                                isSecondary
                                onClick={() => removeMember(index)}
                            >
                                Remove Member
                            </Button>
                        </PanelBody>
                    ))}
                    <Button isPrimary onClick={addMember}>Add Member</Button>
                </PanelBody>
            </InspectorControls>
            <div {...blockProps}>
                <Placeholder label="Leadership Table" />
            </div>
        </>
    );
}

export default edit;