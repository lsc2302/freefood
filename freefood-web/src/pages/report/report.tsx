import * as React from 'react'
import classes from "./report.module.scss";
import {connect} from 'react-redux'
import {Component} from "react";
import {Redirect} from "react-router";
import PieClass from "./pieClass";
import {showEventUser} from '../../api'

class Report extends Component<{user:any}> {

    state={
        back:false,
        data:[],
    };

    async componentDidMount(): Promise<any> {
        const userEvent = await showEventUser({username:this.props.user.get('username')});
        let resSet=new Map<string, number>();
        let cateSet=new Set();
        let res = [];
        for(let i=0;i<userEvent.data.length;i++){
            let cate = userEvent.data[i].Etype;
            if (cateSet.has(cate)){
                resSet.set(cate, (resSet.get(cate)||0)+1);
            }else{
                resSet.set(cate,1);
            }
        }
        for(let key of Array.from(resSet.keys())){
            res.push({cate:key, value:(resSet.get(key) || 0)/userEvent.data.length})
        }
        this.setState({data:res})
    }

    onBack =()=>{
        this.setState({back:true})
    };

    render(){
        if(this.state.back){
            return <Redirect to='/' />
        }
        return(
            <div className={classes.Report}>
                <header className={classes.ReportHeader}>
                    <img src="/images/back.png" alt="back" className={classes.ReportBack} onClick={this.onBack}/>
                    <span className={classes.ProfilePageName}>Report</span>
                </header>
                <article className={classes.ReportMiddle}>
                    <div>
                        <span className={classes.title}>Favorite Food Distribution</span>
                        <PieClass
                            data={this.state.data}
                            width={200}
                            height={300}
                            innerRadius={60}
                            outerRadius={100}
                        />
                    </div>
                </article>
            </div>
        )
    }

}
export default connect((state:any) => ({user: state.user}))(Report);
