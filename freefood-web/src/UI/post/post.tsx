import React, {useState} from "react";
import classes from "./post.module.scss";
import {Button, Dropdown, Form, Input} from "semantic-ui-react";
import {FoodTypes} from "../../utils/food";
import {TimeInput} from "semantic-ui-calendar-react";
import {addEvent} from "../../api";


export const Post:React.FC = ()=>{

    const[type,setType] = useState<string>("");
    const[title,setTitle] = useState<string>("");
    const[date,setDate] = useState<string>("");
    const[timeStart,setTimeStart] = useState<string>("");
    const[timeEnd,setTimeEnd] = useState<string>("");
    const[place,setPlace] = useState<string>("");
    const[openTo,setOpenTo] = useState<string>("");
    const[description,setDescription] = useState<string>("");



    function handleTimeStart(event:any,data:any){
        setTimeStart(data.value);
    }

    function handleTimeEnd(event:any,data:any){
        setTimeEnd(data.value);
    }

    async function handleSubmit(){
        let event =
            {"Etype":type, "Etitle":title,"Eyear":date.slice(0,4),"Emonth":date.slice(5,7),"Eday":date.slice(8,10),
               "Estarthour":timeStart.slice(0,2), "Estartmin":timeStart.slice(3,5),
               "Eendhour":timeEnd.slice(0,2), "Eendmin":timeEnd.slice(3,5),
                "Eplace":place,"Edescription":description,"Ersvps":0,"Eopen":openTo
                   };
        let response = await addEvent(event);
        if(response.status === 0) alert('successfully create event!');
        else{
            alert('create event failed!')
        }
    }


    let decodeFoodType = FoodTypes.map(
        (obj)=> {
            obj.value = obj.value.replace(/_/g," ");
            obj.key = obj.key.replace(/_/g," ");
            obj.text = obj.text.replace(/_/g," ");
            return obj
        }
    );
    return(
            <article className={classes.HomeMiddle}>
                <div className={classes.Pin}>
                    <label className={classes.PinIntro}>Post a New Free Food Event:</label>
                    <Form className={classes.PinForm} onSubmit={handleSubmit}>
                        <Form.Field inline className={classes.PinField}>
                            <label>Food Type:</label>
                            <Dropdown
                                placeholder='Food Type'
                                selection
                                options={decodeFoodType}
                                className={classes.PinDropdown}
                                name={type}
                                onChange={(event,data:any)=>{setType(data.value)}}
                            />
                        </Form.Field>
                        <Form.Field inline className={classes.PinField}>
                            <label>Title:</label>
                            <Input size="mini"
                                   placeholder='Title'
                                   onChange={(event)=>{setTitle(event.target.value)}}
                                   className={classes.PinInput}
                            />
                        </Form.Field>
                        <Form.Field inline className={classes.PinField}>
                            <label>Date:</label>
                            <Input size="mini"
                                   type='date'
                                   onChange={(event)=>{setDate(event.target.value)}}
                                   className={classes.PinInput}
                            />
                        </Form.Field>
                        <Form.Field inline className={classes.PinField}>
                            <label>Time:</label>
                            <TimeInput
                                name="timeStart"
                                placeholder="Start"
                                value={timeStart}
                                iconPosition="left"
                                onChange={handleTimeStart}
                                closable
                                className={classes.PinTime}
                            />
                            <label>To</label>
                            <TimeInput
                                name="timeEnd"
                                placeholder="End"
                                value={timeEnd}
                                iconPosition="left"
                                onChange={handleTimeEnd}
                                closable
                                className={classes.PinTime}
                            />
                        </Form.Field>
                        <Form.Field inline className={classes.PinField}>
                            <label>Place:</label>
                            <Input size="mini"
                                   placeholder='Place'
                                   onChange={(event)=>{setPlace(event.target.value)}}
                                   className={classes.PinInput}
                            />
                        </Form.Field>
                        <Form.Field inline className={classes.PinField}>
                            <label>Open To:</label>
                            <Input size="mini"
                                   placeholder='Open To'
                                   onChange={(event)=>{setOpenTo(event.target.value)}}
                                   className={classes.PinInput}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Description:</label>
                            <Form.TextArea rows="3"
                                           placeholder="Description"
                                           onChange={(event,data:any)=>{
                                           setDescription(data.value)
                                           }}
                            />
                        </Form.Field>
                        <Button color='orange' className={classes.PinSubmit} type='submit'>Submit</Button>
                    </Form>
                </div>
            </article>
    )
};
