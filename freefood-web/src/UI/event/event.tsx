import React, {useState, useEffect, useRef} from "react";
import classes from "./event.module.scss";
import {Search} from "semantic-ui-react";
import {showEvents} from '../../api';
import {eventInterface} from '../../interface';
import {EventItem} from '../eventItem/eventItem';
import Trie from './Trie'

export const Event:React.FC = ()=>{

    const [query,setQuery] = useState("");
    const [userEvent,setUserEvent] = useState([]);
    const [source,setSource] = useState<object[]>([]);
    let prefix = useRef(new Trie());

    useEffect(()=>{
        const abortController = new AbortController();
        async function fetchData(){
            const data:any = await showEvents();
            console.log(data);
            setUserEvent(data.data);
            for(let i=0;i<data.data.length;i++){
                prefix.current.insert(data.data[i]['Etitle']);
            }
        }
        fetchData();
        return function cleanup() {
            abortController.abort();
        };
    },[]);

    function handleInput(event:any):void{
        setQuery(event.target.value);
        let data = prefix.current.get_start(event.target.value);
        let res:object[]=[];
        for(let i=0;i<data.length;i++){
            res[i] = {"title":data[i]}
        }
        setSource(res);
    }

    function debounce(event:any, fun:any, time:any) {
        let timer:any = null;
        return function () {
            clearTimeout(timer);
            timer = setTimeout(fun(event), time)
        }
    }

    function eventsDisplay(userEvent:eventInterface[]){
        return userEvent.map((dataSource)=>{
            return(
            <EventItem data={dataSource} key={dataSource.id} page="event"/>
        );
        })
    }
    return(
                <article className={classes.HomeMiddle}>
                    <div className={classes.SearchBar}>
                        <form noValidate autoComplete="off">
                            <Search
                                onSearchChange={event=>debounce(event, handleInput,5000)()}
                                results={source}
                                type='text'
                                value={query}
                                size='huge'
                                placeholder=' Search...'/>
                        </form>
                    </div>
                    <div className={classes.PostsEvent} >
                    {eventsDisplay(userEvent)}
                    </div>
                </article>
        )
};
