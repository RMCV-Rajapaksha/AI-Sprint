import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

const AlertBox = ({ alert }: { alert: string }) => {
  const alertRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    gsap.from(alertRef.current, {
      width: "0%",
      transformOrigin: "top",
      duration: 1,
      ease: "power2.inOut",
    });
    gsap.from(textRef.current, { opacity: 0, delay: 1 });
  }, [alert]);

  return (
    <div
      ref={alertRef}
      className="bg-red-600 bg-opacity-50 backdrop-blur-sm rounded-3xl font-bold py-2 w-[60%] flex items-center justify-center text-white absolute top-[10vh] left-1/2 translate-x-[-50%] text-lg border border-slate-100 origin-center"
    >
      <p ref={textRef}>{alert}</p>
    </div>
  );
};

export default AlertBox;
