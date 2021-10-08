import React, { ChangeEvent, useState } from "react";
import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";

import classes from "./imageStory.module.css";
import { getRandomColor } from "../../../utils";

interface Props {}

const ImageStory = (props: Props) => {
    const [image, setImage] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const { editor, onReady } = useFabricJSEditor();

    const deleteSelections = () => {
        editor?.canvas.getActiveObjects().forEach((object) => {
            editor?.canvas.remove(object);
        });
    };

    const changeTextColor = () => {
        const activeObject = editor?.canvas.getActiveObject();
        if (activeObject?.type === "textbox") {
            activeObject.set("fill", getRandomColor());
            editor?.canvas.renderAll();
        }
    };

    const onAddText = () => {
        try {
            editor?.canvas.add(
                new fabric.Textbox("Type something...", {
                    fill: "red",
                    fontSize: 20,
                    fontFamily: "Arial",
                    fontWeight: "bold",
                    textAlign: "center",
                    name: "my-text",
                })
            );
            editor?.canvas.renderAll();
        } catch (error) {
            console.log(error);
        }
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e);
        const { value } = e.target;
        setImage(value);
    };

    const submitImage = () => {
        if (image && image.startsWith("http")) {
            fabric.Image.fromURL(image, function (img) {
                const canvasWidth = editor?.canvas.getWidth();
                const canvasHeight = editor?.canvas.getHeight();
                editor?.canvas.setWidth(500);
                editor?.canvas.setHeight(500);
                editor?.canvas.add(img);
                const obj = editor?.canvas.getObjects();
                obj?.forEach((o) => {
                    if (o.type === "image") {
                        o.scaleToHeight(canvasWidth || 100);
                        o.scaleToHeight(canvasHeight || 100);
                    }
                });

                editor?.canvas.centerObject(img);
                setIsSubmitted(true);
            });
        }
    };

    const saveToServer = () => {
        const objects = editor?.canvas.toJSON();
        if (objects) {
            localStorage.setItem("data", JSON.stringify(objects));
        }
    };

    return (
        <div className={classes.root}>
            {isSubmitted && (
                <aside className={classes.aside}>
                    <button onClick={onAddText}>Add Text</button>
                    <button onClick={changeTextColor}>Change Text Color</button>
                    <button onClick={saveToServer}>Save</button>
                </aside>
            )}

            <div className={classes.main}>
                {!isSubmitted && (
                    <div className={classes.imageForm}>
                        <input type="text" onChange={onChange} />
                        <button onClick={submitImage}>Submit</button>
                    </div>
                )}
                <FabricJSCanvas className={classes.canvas} onReady={onReady} />
            </div>
        </div>
    );
};

export default ImageStory;
