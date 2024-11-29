import { Pagination, PaginationItemType } from "@nextui-org/react";
import { ChevronIcon } from "../icons/ChevronIcon";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const PaginationModal = ({ onPageChange,totalImages }) => {
  const cn = (...classes) => classes.filter(Boolean).join(" ");
  const [currPage, setCurrPage] = useState(1);

  const handlePageChange = (newPage) => {
    console.log("modal---",newPage);
    
    setCurrPage(newPage); 
    onPageChange(newPage); 
  };
  
  useEffect(()=>{
    setCurrPage(1)
    onPageChange(1)
  },[])
 

  const renderItem = ({
    ref,
    key,
    value,
    isActive,
    className,
  }) => {
    if (value === PaginationItemType.NEXT) {
      return (
        <button
          key={key}
          className={cn(className, "bg-default-200/50 min-w-8 w-8 h-8")}
          onClick={() => {
            if (currPage < Math.ceil(totalImages/30)) {
              handlePageChange(currPage + 1);
            }else{
              toast.error("There is no next page")
            }
          }}
        >
          <ChevronIcon className="rotate-180" />
        </button>
      );
    }

    if (value === PaginationItemType.PREV) {
      return (
        <button
          key={key}
          className={cn(className, "bg-default-200/50 min-w-8 w-8 h-8")}
          onClick={() => {
            if (currPage > Math.ceil(totalImages/30)) {
              handlePageChange(currPage - 1);
            }else{
              toast.error("There is no previous page")
            }
          }}
        >
          <ChevronIcon />
        </button>
      );
    }

    if (value === PaginationItemType.DOTS) {
      return <button key={key} className={className}>...</button>;
    }

    return (
      <button
        key={key}
        ref={ref}
        className={cn(
          className,
          isActive && "text-white bg-gradient-to-br from-indigo-500 to-pink-500 font-bold"
        )}
        onClick={() => handlePageChange(value)}
      >
        {value}
      </button>
    );
  };

  return (
    <Pagination
      disableCursorAnimation
      showControls
      total={Math.ceil(totalImages/30)}
      initialPage={1}
      page={currPage}
      className="gap-4"
      radius="full"
      renderItem={renderItem}
      variant="light"
    />
  );
};

export default PaginationModal;
