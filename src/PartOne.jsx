import { useState } from "react";

const Anecdotes = ({ selected, votes, handleVotes, getRandomAnecdote }) => {
    const anecdoteList = [
      'If it hurts, do it more often.',
      'Adding manpower to a late software project makes it later!',
      'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      'Premature optimization is the root of all evil.',
      'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
      'The only way to go fast, is to go well.'
    ];

    const maxVotes = Math.max(...votes);
    const maxVotesIndex = votes.indexOf(maxVotes);

    return (
    <div>
        <div>
        <h1>Anecdote of the Day</h1>
        <p>{anecdoteList[selected]}</p>
        <p>has {votes[selected]} votes</p>
        <div>
            <button onClick={() => handleVotes(selected)}>vote</button>
            <button onClick={getRandomAnecdote}>next anecdote</button>
        </div>
        </div>
        <div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdoteList[maxVotesIndex]}</p>
        <p>has {maxVotes} votes</p>
        </div>
    </div>
    );
}

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
    const anecdoteListLength = 8;
    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState(Array(anecdoteListLength).fill(0));
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

    const handleVotes = (selected) => {
        const newVotes = [...votes];
        newVotes[selected] += 1;
        setVotes(newVotes);
    }

    const getRandomAnecdote = () => {
        setSelected(Math.floor(Math.random() * anecdoteListLength));
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
            <Anecdotes 
                selected={selected} 
                votes={votes} 
                handleVotes={handleVotes} 
                getRandomAnecdote={getRandomAnecdote}
            />
        </div>
    );
};

export default PartOne;