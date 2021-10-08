import React, { ChangeEvent, useState } from "react";

import TextStory from "./components/StoryForm/Text";
import ImageStory from "./components/StoryForm/Image";
import ImageStoryViewer from "./components/StoryViewer/Image";
import TextStoryViewer from "./components/StoryViewer/Text";

import "./App.css";

const App = () => {
    const [storyType, setStoryType] = useState<string | null>(null);
    const [data, setData] = useState<any>(null);

    const showResultFromServer = () => {
        const json = localStorage.getItem("data");
        if (json) {
            const objects = JSON.parse(json);
            console.log(`objects`, objects);
            setData(objects);
        }
    };

    const reset = () => {
        setStoryType(null);
        setData(null);
        localStorage.setItem("data", "");
    };

    const storyView =
        data &&
        ((!data.type && <ImageStoryViewer data={data} />) ||
            (data?.type === "text" && <TextStoryViewer data={data} />));

    return (
        <div className="root">
            <button onClick={showResultFromServer}>
                Show result from server
            </button>
            <button onClick={reset}>Reset</button>
            {!storyType && (
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
            <div className="main">
                {(storyType === "text" && <TextStory />) ||
                    (storyType === "image" && <ImageStory />)}
                {storyView}
            </div>
        </div>
    );
};

export default App;
