import { ReactNode, useEffect, useState } from "react";
import Styles from "./resizable-column.module.scss";

type props = {
  left: ReactNode;
  right: ReactNode;
};

const ResizableColumn = ({ left, right }: props) => {
  const [asideWidth, setAsideWidth] = useState<number>(400);
  const [isDrugging, setIsDrugging] = useState<boolean>(false);
  useEffect(() => {
    if (!isDrugging) return;
    const onMouseMoveHandler = (e: MouseEvent) => {
      setAsideWidth(
        Math.max(
          Math.min(
            document.body.clientWidth - e.x,
            document.body.clientWidth - 300
          ),
          200
        )
      );
    };
    const onMouseUpHandler = () => {
      setIsDrugging(false);
    };
    window.addEventListener("mousemove", onMouseMoveHandler);
    window.addEventListener("mouseup", onMouseUpHandler);
    return () => {
      window.removeEventListener("mousemove", onMouseMoveHandler);
      window.removeEventListener("mouseup", onMouseUpHandler);
    };
  }, [isDrugging]);
  return (
    <div className={Styles.wrapper}>
      <section className={Styles.section}>{left}</section>
      <div
        className={Styles.grubber}
        onMouseDown={() => setIsDrugging(true)}
      ></div>
      <aside style={{ width: `${asideWidth}px` }}>{right}</aside>
    </div>
  );
};

export { ResizableColumn };
