import { DragDropContext, Draggable, Droppable, Responders } from "react-beautiful-dnd";
import { Image } from "../../../../components/Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export interface SideBarProps {
  items: NewItem[];
  setItems: any;
  open: any;
  editHandler: any;
}

export const SideBar = (props: SideBarProps) => {
  const { items, setItems, open, editHandler } = props;

  const handleDelete = (e: any) => {
    const parentNode: HTMLElement = e.target.parentNode as HTMLElement;
    const index: number = items.findIndex((item) => item.id === parentNode.id);
    var updatedItems: NewItem[];
    if (index > 0) {
      updatedItems = [...items.slice(0, index), ...items.slice(index + 1)];
    } else {
      updatedItems = [...items.slice(1)];
    }

    setItems(updatedItems);
  };

  const handleDragDrop = (res: any) => {
    const { source, destination } = res;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const reorderedItems = [...items];
    const [removedItems] = reorderedItems.splice(source.index, 1);
    reorderedItems.splice(destination.index, 0, removedItems);
    return setItems(reorderedItems);
  };

  return (
    <DragDropContext onDragEnd={handleDragDrop}>
      <div
        className="absolute p-4 z-50 h-full w-1/3 bg-white/25 backdrop-blur-sm rounded-r-[10px] duration-[0.75s] "
        style={{ left: open ? 0 : "-35%" }}
      >
        <Droppable droppableId="drop-root">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((item: NewItem, i: number) => {
                return (
                  <Draggable key={i} draggableId={`drag-id-${i}`} index={i}>
                    {(provided) => (
                      <div
                        key={i}
                        id={item.id}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        className="relative mb-4 p-4 center h-[60px] w-full bg-white/25 rounded-[10px] hover:bg-black/25 active:bg-black/25"
                        onMouseUp={editHandler}
                      >
                        {item.image && (
                          <div className="absolute h-full w-full opacity-50 pointer-events-none">
                            <Image src={item.image} alt="sidebar-item-image" />
                          </div>
                        )}
                        {item.title && <p className="absolute left-4 text-1 text-shadow-lg pointer-events-none">{item.title}</p>}
                        <div className="absolute right-4 h-full center cursor-pointer" onClick={handleDelete}>
                          <FontAwesomeIcon className=" h-1/3 shadow-lg pointer-events-none" icon={faTrash} />
                        </div>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};
