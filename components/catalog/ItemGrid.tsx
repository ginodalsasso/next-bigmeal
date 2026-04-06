
type ItemGridProps<T extends { id: string }> = {
    items: T[];
    emptyMessage: string;
    renderItem: (item: T) => React.ReactNode;
};

export default function ItemGrid<T extends { id: string }>({
    items,
    emptyMessage,
    renderItem,
}: ItemGridProps<T>) {
    if (items.length === 0) {
        return (
            <p className="py-12 text-center text-sm text-warm-secondary">
                {emptyMessage}
            </p>
        );
    }

    return (
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4" role="list">
            {items.map((item) => (
                <li key={item.id}>{renderItem(item)}</li>
            ))}
        </ul>
    );
}
