import React from "react";

const AlertBox = ({ alert }: { alert: string }) => {
  return (
    <div className="bg-red-600 bg-opacity-50 backdrop-blur-sm rounded-3xl font-bold py-2 w-[60%] flex items-center justify-center text-white absolute top-[10vh] left-1/2 translate-x-[-50%] text-lg border border-slate-100">
      {alert}
    </div>
  );
};

export default AlertBox;
