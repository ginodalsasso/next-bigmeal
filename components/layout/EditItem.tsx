import React, { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface EditItemProps {
    renderEditForm: (onClose: () => void) => React.ReactNode;
}

const EditItem: React.FC<EditItemProps> = ({ renderEditForm }) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    return (
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
                <Button variant="edit">Modifier</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4">
                {renderEditForm(() => setIsPopoverOpen(false))}
            </PopoverContent>
        </Popover>
    );
};

export default EditItem;
