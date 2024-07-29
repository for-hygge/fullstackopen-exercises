import { useState } from "react";

const History = (props) => {
    if(props.allClicks.length === 0) {
        return (
            <div>the app is used by pressing the buttons</div>
        )
    }
    return (
        <div>button press history: {props.allClicks.join(' ')}</div>
    )
}

const Button = (props) => {
    // const { handleClick, text } = props;
    console.log('props value is', props);
    return (
        <button onClick={props.handleClick}>
        {props.text}
        </button>
    )
}

const Hello = (text) => {
    const handler = () => {
        console.log('Hello ', text);
    }
    return handler;
}

const TestHooks = () => {
    // const [left, setLeft] = useState(0);
    // const [right, setRight] = useState(0);

    // return (
    //     <div>
    //         {left}
    //         <button onClick={() => setLeft(left+1)}>left</button>
    //         {right}
    //         <button onClick={() => setRight(right+1)}>right</button>
    //     </div>
    // )
    const [clicks, setClicks] = useState({ left: 0, right: 0 });
    const [allClicks, setAllClicks] = useState([]);
    const [totalClicks, setTotalClicks] = useState(0);

    const handleLeftClicks = () => {
        const newClicks = {
            ...clicks,
            left: clicks.left + 1
        }
        setClicks(newClicks);
        setAllClicks(allClicks.concat('L'));
        setTotalClicks(newClicks.left + newClicks.right);
    }

    const handleRightClicks = () => {
        const newClicks = {
            ...clicks,
            right: clicks.right + 1
        }
        setClicks(newClicks);
        setAllClicks(allClicks.concat('R'));
        setTotalClicks(newClicks.left + newClicks.right);
    }

    const reset = () => {
        const newClicks = {
            left: 0,
            right: 0
        }
        setClicks(newClicks);
        setAllClicks([]);
        setTotalClicks(0);
    }

    return (
        // <div>
        //     {clicks.left}
        //     <button onClick={handleLeftClicks}>Left</button>
        //     {clicks.right}
        //     <button onClick={handleRightClicks}>Right</button>
        //     <button onClick={reset}>Reset</button>
        //     <p>clicks memory: {allClicks.join(' ')}</p>
        //     <p>total clicks: {totalClicks}</p>
        // </div>
        <div>
            <Button handleClick={Hello('World')} text='Hello' />
            <br/>
            {clicks.left}
            <Button handleClick={handleLeftClicks} text='Left' />
            {clicks.right}
            <Button handleClick={handleRightClicks} text='Right' />
            <Button handleClick={reset} text='Reset' />
            <History allClicks={allClicks}/>
            <p>total clicks: {totalClicks}</p>
        </div>
    )
}

export default TestHooks;