import { ChangeEvent, useEffect, useState } from "react";

import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";

import classes from "./textStory.module.css";
import { Object } from "fabric/fabric-impl";

interface Props {}

const TextStory = (props: Props) => {
    const { editor, onReady } = useFabricJSEditor();

    const onChangeText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        const textObject: any = editor?.canvas._objects.find(
            (o) => o.type === "textbox"
        );
        if (textObject) {
            textObject.set("text", text);
            editor?.canvas.renderAll();
        }
    };

    useEffect(() => {
        if (editor) {
            editor.canvas.add(
                new fabric.Textbox("Type something!", {
                    fill: "red",
                    fontSize: 20,
                    fontFamily: "Arial",
                    fontWeight: "bold",
                    textAlign: "center",
                    name: "my-text",
                    splitByGrapheme: true,
                    width: 150,
                })
            );
        }
    }, [editor]);

    return (
        <div className={classes.root}>
            <aside className={classes.aside}>
                <textarea
                    className={classes.textarea}
                    onChange={onChangeText}
                    rows={7}
                />
            </aside>
            <FabricJSCanvas className={classes.main} onReady={onReady} />
        </div>
    );
};

export default TextStory;
