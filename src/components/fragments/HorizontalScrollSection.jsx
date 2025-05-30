export const HorizontalScrollSection = ({ title, items, renderItem }) => (
  <div className="mb-8 w-full">
    <h2 className="text-2xl font-semibold text-black mb-4">{title}</h2>
    <div className="scroll-area custom-scrollbar w-full overflow-x-auto">
      <div className="flex gap-4 pl-4 pb-4">
        {items.map((item, index) => renderItem(item, index))}
      </div>
    </div>
  </div>
);
