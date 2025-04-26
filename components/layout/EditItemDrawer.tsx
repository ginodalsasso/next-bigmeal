import React, { useState } from "react";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Edit3Icon } from "lucide-react";

interface EditItemProps {
    renderEditForm: (onClose: () => void) => React.ReactNode;
}

const EditItem: React.FC<EditItemProps> = ({ renderEditForm }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return (
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger>
                <Edit3Icon />
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Formulaire d&apos;édition</DrawerTitle>
                </DrawerHeader>
                <div className="flex justify-center p-4 md:p-10">
                    {renderEditForm(() => setIsDrawerOpen(false))}  
                </div>
            </DrawerContent>
        </Drawer>
    );
};

export default EditItem;
