import { ReactNode } from "react";
import { MoreVertical } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import EditItem from "./EditItemDrawer";
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
    const content = (
        <div className="flex gap-2">
            <EditItem renderEditForm={renderEditForm} />
            <DeleteItem apiUrl={apiUrl} id={id} onSubmit={onDelete} />
        </div>
    );

    return (
        <Popover>
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
                {content}
            </PopoverContent>
        </Popover>
    );
}
