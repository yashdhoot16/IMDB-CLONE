import React from "react";

const Pagination = ({handlePrev, handleNext, pageNo}) => {
  return (
    <div className="bg-gray-900/60 mt-8 mb-4 flex justify-center">
      <div onClick={handlePrev} className="px-8 hover:cursor-pointer">
        <i class="fa-solid fa-backward-step"></i>
      </div>
      <div className="font-semibold">
        {pageNo}
      </div>
      <div onClick={handleNext} className="px-8 hover:cursor-pointer">
        <i class="fa-solid fa-forward-step"></i>
      </div>
    </div>
  );
};

export default Pagination;
