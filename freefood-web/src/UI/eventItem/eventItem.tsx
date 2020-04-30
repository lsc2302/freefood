import React, {useState} from "react";
import {Card} from "semantic-ui-react";
import classes from "./eventItem.module.scss";
import {PostStar} from "../postStar/postStar";
import {months} from "../../utils/month";
import {Message} from "semantic-ui-react";

export const EventItem:React.FC<{data:any|undefined,page:string}> = (props)=>{

    const [rsvps,setRsvps] = useState(props.data.Ersvps);
    const [visible, setVisible] = useState(false);

    let starActive=false;
    if(props.page === 'favorite'){
        starActive= true;
    }else{
        starActive= props.data.star;
    }

    function handleClick(){
        setVisible(true);
    }

    function handleDismiss(){
        setVisible(false);
    }

    return(
        <Card className={classes.Post} >
            {visible?
                <Message warning className={classes.message}
                         onDismiss={handleDismiss}
                >
                    <Message.Header>Description:{props.data.Edescription}</Message.Header>
                </Message> :<></>}
            <Card.Content onClick={handleClick}>
                <Card.Header className={classes.PostHeader}>
                    {props.data.Etitle}
                    <PostStar active={starActive} eventId={props.data.id} setRsvps={setRsvps} rsvps={rsvps}/>
                </Card.Header>
                <img src={'/images/'+props.data.Etype.replace(/ /g,'_')+'.png'}
                     className={classes.PostImage}
                     alt={props.data.Etype}/>
                <div>
                    <Card.Meta>
                            <span><img src='/images/calendar.png' className={classes.PostIcon} alt="date"/>
                            Date: {months[parseInt(props.data.Estart.slice(5,7))-1]}
                                {props.data.Estart.slice(8,10)}, {props.data.Estart.slice(0,4)}
                            </span>
                        <br/>
                        <span><img src='/images/place.png' className={classes.PostIcon} alt="place"/>
                            Place: {props.data.Eplace}</span>
                        <br/>
                        <span><img src='/images/user.png' className={classes.PostIcon} alt="open to"/>
                            Open to: {props.data.Eopen}</span>
                    </Card.Meta>
                </div>
            </Card.Content>
            <Card.Content extra>
                <img src='/images/users.png' className={classes.PostIcon} alt="RSVPs"/>
                {rsvps} Registered
            </Card.Content>
        </Card>
        // </div>
    )
};
