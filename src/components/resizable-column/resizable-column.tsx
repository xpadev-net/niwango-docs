import { useEffect, useState } from "react";
import Styles from "./resizable-column.module.scss";
import { NiwangoEditor } from "@/components/editor";
import { Render } from "@/components/render/render.tsx";

type props = {
  className?: string;
};

const ResizableColumn = ({ className }: props) => {
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
    <div className={`${className} ${Styles.wrapper}`}>
      <section className={Styles.section}>
        <NiwangoEditor className={Styles.editor} />
      </section>
      <div
        className={Styles.grubber}
        onMouseDown={() => setIsDrugging(true)}
      ></div>
      <aside className={Styles.aside} style={{ width: `${asideWidth}px` }}>
        <Render width={asideWidth} />
        <section className={Styles.meta}></section>
      </aside>
    </div>
  );
};

export { ResizableColumn };
