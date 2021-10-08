import React, { ChangeEvent, useState } from "react";

import { fabric } from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "fabricjs-react";
import TextStory from "./components/TextStory";
import ImageStory from "./components/ImageStory";

const App = () => {
    const [storyType, setStoryType] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [submittedImage, setSubmittedImage] = useState<boolean>(false);

    const { editor, onReady } = useFabricJSEditor();

    const onAddText = () => {
        // add a white text
        try {
            console.log("Go add text");
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

    const saveStates = () => {
        const objects = editor?.canvas.toJSON();
        if (objects) {
            localStorage.setItem("json", JSON.stringify(objects));
        }
    };

    const deleteSelections = () => {
        editor?.canvas.getActiveObjects().forEach((object) => {
            editor?.canvas.remove(object);
        });
    };

    const reset = () => {
        editor?.canvas.clear();
        editor?.canvas.renderAll();
        setStoryType(null);
    };

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e);
        const { value } = e.target;
        console.log(`value`, value);
        setImageUrl(value);
    };

    const submitImage = () => {
        if (imageUrl && imageUrl.startsWith("http")) {
            fabric.Image.fromURL(imageUrl, function (img) {
                console.log(`editor`, editor);
                const canvasWidth = editor?.canvas.getWidth();
                const canvasHeight = editor?.canvas.getHeight();
                editor?.canvas.setWidth(500);
                editor?.canvas.setHeight(500);
                editor?.canvas.add(img);
                const obj = editor?.canvas.getObjects();
                obj?.forEach((o) => {
                    console.log(`type`, o.type);
                    if (o.type === "image") {
                        o.scaleToHeight(canvasWidth || 100);
                        o.scaleToHeight(canvasHeight || 100);
                    }
                });

                editor?.canvas.centerObject(img);
                setSubmittedImage(true);
            });
        }
    };

    const getRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const changeTextColor = () => {
        const activeObject = editor?.canvas.getActiveObject();
        if (activeObject?.type === "textbox") {
            activeObject.set("fill", getRandomColor());
            editor?.canvas.renderAll();
        }
    };

    const showResultFromServer = () => {
        reset();
        const json = localStorage.getItem("json");
        if (json) {
            const objects = JSON.parse(json);
            editor?.canvas.loadFromJSON(
                objects,
                editor?.canvas.renderAll.bind(editor?.canvas)
            );
        }
    };

    return (
        <div>
            {/* {!storyType && (
                <React.Fragment>
                    <button onClick={() => setStoryType("text")}>
                        Text story
                    </button>
                    <button onClick={() => setStoryType("image")}>
                        {" "}
                        Image story{" "}
                    </button>
                </React.Fragment>
            )}
            <button onClick={onAddText}>Add Text</button>
            <button onClick={changeTextColor}>Change color of text!</button>
            <button onClick={saveStates}> Save </button>
            <button onClick={deleteSelections}> Delete </button>
            <button onClick={reset}> Reset </button>
            <button onClick={showResultFromServer}>
                Load data from server
            </button>
            {storyType === "image" && !submittedImage && (
                <div
                    className="sample-canvas"
                    style={{
                        zIndex: 1,
                    }}
                >
                    <input type="text" onChange={onChange} />
                    <button onClick={submitImage}>Use Image</button>
                </div>
            )}
            <FabricJSCanvas className="sample-canvas" onReady={onReady} /> */}
            {/* <TextStory /> */}
            <ImageStory />
        </div>
    );
};

export default App;
