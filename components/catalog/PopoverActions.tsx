import { ReactNode, useState } from "react";
import { MoreVertical, Edit3Icon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import DeleteItem from "./DeleteItemDialog";

type PopoverActionsProps = {
    id: string;
    apiUrl: string;
    renderEditForm: (onClose: () => void) => ReactNode;
    onDelete: () => void;
};

export default function PopoverActions({
    id,
    apiUrl,
    renderEditForm,
    onDelete,
}: PopoverActionsProps) {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const openDrawer = () => {
        setIsPopoverOpen(false);
        setIsDrawerOpen(true);
    };

    return (
        <>
            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="link"
                        aria-label="Actions"
                        className="absolute -right-4 -top-2"
                    >
                        <MoreVertical className="text-zinc-500" aria-hidden="true" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto">
                    <div className="flex gap-2">
                        <Button variant="edit" aria-label="Modifier" onClick={openDrawer}>
                            <Edit3Icon aria-hidden="true" />
                        </Button>
                        <DeleteItem apiUrl={apiUrl} id={id} onSubmit={onDelete} />
                    </div>
                </PopoverContent>
            </Popover>

            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Formulaire d&apos;édition</DrawerTitle>
                    </DrawerHeader>
                    {renderEditForm(() => setIsDrawerOpen(false))}
                </DrawerContent>
            </Drawer>
        </>
    );
}
