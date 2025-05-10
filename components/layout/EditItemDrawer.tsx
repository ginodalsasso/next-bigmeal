import React, { useState } from "react";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Edit3Icon } from "lucide-react";
import { Button } from "../ui/button";

interface EditItemProps {
    renderEditForm: (onClose: () => void) => React.ReactNode;
}

const EditItem: React.FC<EditItemProps> = ({ renderEditForm }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false); 

    return (
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
                <Button variant="edit" title="Modifier">
                    <Edit3Icon />
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Formulaire d&apos;édition</DrawerTitle>
                </DrawerHeader>
                    {renderEditForm(() => setIsDrawerOpen(false))}  
            </DrawerContent>
        </Drawer>
    );
};

export default EditItem;
