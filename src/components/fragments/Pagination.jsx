import { Button } from "../elements/Button";
import ChevronLeft from "../../assets/icons/ChevronLeft.png";
import ChevronRight from "../../assets/icons/ChevronRight.png";
export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="mt-2 flex gap-2 items-center justify-center">
      <Button>
        <img src={ChevronLeft} className="" />
      </Button>
      <Button className={"w-9 h-9 rounded-full bg-[#E89229] text-white"}>
        1
      </Button>
      <Button className={"w-9 h-9 rounded-full bg-white text-black"}>2</Button>
      <Button className={"w-9 h-9 rounded-full bg-white text-black"}>3</Button>
      <Button className={"w-9 h-9 rounded-full bg-white text-black"}>4</Button>
      <Button className={"w-9 h-9 rounded-full bg-white text-black"}>5</Button>
      <Button className={"w-9 h-9 rounded-full bg-white text-black"}>
        ...
      </Button>
      <Button className={"w-9 h-9 rounded-full bg-white text-black"}>10</Button>
      <Button>
        <img src={ChevronRight} className="" />
      </Button>
    </div>
  );
};
