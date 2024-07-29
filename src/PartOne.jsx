import { useState } from "react";

const Button = ({ desc, handleClicks}) => {
    return (
        <button onClick={() => handleClicks(desc)}>{desc}</button>
    );
}

const StatisticLine = (props) => {
    if(props.text==='all') {
        return (
            <tr><td>{props.text}</td><td>{props.totalClicks}</td></tr>
        );
    } else if(props.text==='average') {
        return (
            <tr><td>{props.text}</td><td>{(Number(props.clicks.good-props.clicks.bad)/3).toFixed(1)}</td></tr>
        );
    } else if(props.text==='positive') {
        return (
            <tr><td>{props.text}</td><td>{Number(props.totalClicks===0? 0: props.clicks.good / props.totalClicks).toFixed(1)}%</td></tr>
        );
    } else {
        return (
            <tr><td>{props.text}</td><td>{props.clicks[props.text]}</td></tr>
        );
    }
}

const Statistics = (props) => {
    if(props.totalClicks===0) {
        return (
            <p>No feedback given</p>
        );
    } else {
        return (
            <table>
                <StatisticLine text='good' clicks={props.clicks} />
                <StatisticLine text='neutral' clicks={props.clicks} />
                <StatisticLine text='bad' clicks={props.clicks} />
                <StatisticLine text='all' totalClicks={props.totalClicks} />
                <StatisticLine text='average' clicks={props.clicks} />
                <StatisticLine text='positive' clicks={props.clicks} totalClicks={props.totalClicks} />
            </table>
        );
    }
    
}

const PartOne = () => {
    const [clicks, setClicks] = useState({ good: 0, neutral: 0, bad: 0 });
    const [totalClicks, setTotalClicks] = useState(0);

    const handleClicks = (desc) => {
        const newClicks = {
            ...clicks,
            [desc]: clicks[desc] + 1   // `obj[variable]` access a var. can't use attr:obj.attr here since desc is not an attr of clicks
        }
        setClicks(newClicks);
        setTotalClicks(newClicks.good + newClicks.neutral + newClicks.bad);
    }

    const reset = () => {
        setClicks({ good: 0, neutral: 0, bad: 0 });
        setTotalClicks(0);
    }

    return (
        <div>
            <h1>give feedback</h1>
            <Button desc='good' handleClicks={handleClicks}/>
            <Button desc='neutral' handleClicks={handleClicks}/>
            <Button desc='bad' handleClicks={handleClicks}/>
            <button onClick={reset} style={{ background:"red"  }}>reset</button>
            <br/>
            {/* <h1>statistics</h1>
            <p>good {clicks.good}</p>
            <p>neutral {clicks.neutral}</p>
            <p>bad {clicks.bad}</p>
            <p>all {totalClicks}</p>
            <p>average {(clicks.good-clicks.bad)/3}</p>
            <p>positive {totalClicks===0? 0: clicks.good / (clicks.good + clicks.neutral + clicks.bad)}%</p> */}
            <h1>statistics</h1>
            <Statistics clicks={clicks} totalClicks={totalClicks}/>
        </div>
    );
}

export default PartOne;