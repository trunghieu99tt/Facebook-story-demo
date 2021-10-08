import classes from "./textStory.module.css";

interface Props {
    data: any;
}

const TextStoryViewer = ({ data }: Props) => {
    const { background, text } = data;
    return (
        <div
            className={classes.root}
            style={{
                background: `${background}`,
            }}
        >
            <div className={classes.text}>{text}</div>
        </div>
    );
};

export default TextStoryViewer;
