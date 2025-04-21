import React, { useState } from 'react';
import TransparentBtn from '../Buttons/TransparentBtn';

interface DescriptionComponentProps {
    description: string;
    maxLength?: number;
}

const DescriptionComponent: React.FC<DescriptionComponentProps> = ({
    description,
    maxLength = 600 // Default value, can be overridden with props
}) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    // If no description, return null
    if (!description) return null;

    // Check if the description needs to be sliced
    const needsSlicing: boolean = description.length > maxLength;

    // Get the content to display
    const displayContent: string = isExpanded || !needsSlicing
        ? description
        : description.substring(0, maxLength) + '...';

    // Toggle expand/collapse
    const toggleExpand = (): void => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="flex flex-col mb-2">
            <div
                className="text-base"
                dangerouslySetInnerHTML={{
                    __html: displayContent
                }}
            />

            {needsSlicing && (
                <div className='mt-4 flex items-center justify-center'>
                    <TransparentBtn
                        text={isExpanded ? 'Show Less' : 'View More'}
                        width="w-60"
                        fontSize="text-md"
                        onClick={() => toggleExpand()}
                    />
                </div>

            )}
        </div>
    );
};

export default DescriptionComponent;