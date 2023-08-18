import "./App.module.scss";
import { NiwangoEditor } from "@/components/editor";
import { ResizableColumn } from "@/components/resizable-column";
import Styles from "./App.module.scss";

function App() {
  return (
    <ResizableColumn
      className={Styles.wrapper}
      left={<NiwangoEditor className={Styles.editor} />}
      right={
        <aside>
          <section></section>
          <section></section>
        </aside>
      }
    />
  );
}

export default App;
