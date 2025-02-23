import React, { useState } from "react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface EditItemProps {
    renderEditForm: (onClose: () => void) => React.ReactNode;
}

const EditItem: React.FC<EditItemProps> = ({ renderEditForm }) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    return (
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
                <Button variant="edit" className="w-auto">                 
                    <Image
                        src={"/img/edit.svg"}
                        width={18}
                        height={18}
                        alt="Icône de modification"
                    />            
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                {renderEditForm(() => setIsPopoverOpen(false))}
            </PopoverContent>
        </Popover>
    );
};

export default EditItem;
