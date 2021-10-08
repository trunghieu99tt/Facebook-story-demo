import React, { useEffect } from "react";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";

import classes from "./imageStoryViewer.module.css";

interface Props {
    data: any | null;
}

const ImageStoryViewer = ({ data }: Props) => {
    const { editor, onReady } = useFabricJSEditor();

    useEffect(() => {
        console.log(`data`, data);
        if (data && editor) {
            editor.canvas.loadFromJSON(
                data,
                editor.canvas.renderAll.bind(editor.canvas)
            );
        }
    }, [editor, data]);

    return (
        <div
            style={{
                display: data ? "block" : "none",
            }}
        >
            <FabricJSCanvas className={classes.canvas} onReady={onReady} />
        </div>
    );
};

export default ImageStoryViewer;
