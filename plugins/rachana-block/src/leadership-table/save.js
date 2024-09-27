import { useBlockProps } from "@wordpress/block-editor";

const save = ({ attributes }) => {
    const { members } = attributes;
    const blockProps = useBlockProps.save();

    return (
        <div {...blockProps} className="cgds table-structure">
            <div className="pb-8">
                {members.map((member, index) => {
                    const isFirst = index === 0;
                    const isLast = index === members.length - 1;
                    const containerClasses = `rounded-md bg-light p-5 text-muted ${
                        isFirst ? '' : 'pt-0 rounded-bottom'
                    } ${isLast ? '' : 'pb-3 rounded-top'}`;

                    return (
                        <div key={index} className={containerClasses}>
                            <div className="row row-cols-3 rounded-top rounded-bottom bg-white p-2 text-dark align-items-center">
                                <div className="col-3 align-items-center">
                                    {member.title} <span className="fw-bold">{member.name}</span>
                                </div>
                                <div className="col-7 d-flex align-items-center">
                                    {member.role}
                                </div>
                                <div className="col-2 d-flex align-items-center text-muted">
                                    {member.position}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default save;
