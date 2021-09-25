// import React, { useState } from 'react';
// import {  Icon, Button, Card, Container} from 'semantic-ui-react';
// import Cookies from 'js-cookie';
// import { Popup } from 'semantic-ui-react';
// import { render } from 'react-dom';

// const JobPost = (props) => {
//     const {posts, reloadData} = props;

//     const closeJob = (id)=> {
//         var cookies = Cookies.get('talentAuthToken');
//         $.ajax({
//             url: 'http://talent-competition-talent.azurewebsites.net/listing/listing/closeJob',
//             headers: {
//                 'Authorization': 'Bearer ' + cookies,
//                 'Content-Type': 'application/json'
//             },
//             dataType: 'json',
//             type: "post",
//             data: JSON.stringify(id),
//             success: function (res) {
//                 if (res.success == true) {
//                     reloadData();
//                     TalentUtil.notification.show(res.message, "success", null, null)
//                 } else {
//                     TalentUtil.notification.show(res.message, "error", null, null)
//                 }
//             }.bind(this)
//         })
//     }
  
//         return(
//             <Card.Group  itemsPerRow={2} style={{marginBottom: "20px"}}>
//                 {posts.map(p => 
//                     <Card key={p.id}>
//                         <Card.Content>
//                             <Card.Header>{p.title}</Card.Header>
//                             <Card.Meta>{p.jobDetails.location.city}, {p.jobDetails.location.country}</Card.Meta>
//                             <Card.Description style={{minHeight: "150px"}}>
//                                 {p.description.slice(3, p.description.length - 5).replace(/&nbsp;/g, '')}
//                             </Card.Description>
//                         </Card.Content>
//                         <Card.Content extra>
//                             {p.status = 1 ?
//                                 <React.Fragment>
//                                     <Button negative floated='left'>Expired</Button>
//                                     <Container textAlign='right'>
//                                         <Button basic color='blue' onClick={() => { closeJob(p.id) }}><Icon name='remove circle'/>Close</Button>
//                                         <Button basic color='blue' onClick={() => { window.location = "/EditJob/" + p.id }}><Icon name='edit outline'/>Edit</Button>
//                                         <Button basic color='blue' onClick={() => { window.location = "/PostJob/" + p.id }}><Icon name='copy outline'/>Copy</Button>
//                                     </Container>
//                                 </React.Fragment> 
//                                 :
//                                 <React.Fragment>
//                                     <Button negative floated='left'>Job Closed</Button>
//                                     <Container textAlign='right'>         
//                                         <Button basic color='blue' onClick={() => { window.location = "/PostJob/" + p.id }}><Icon name='copy outline'/>Copy This Job</Button>
//                                     </Container>
//                                 </React.Fragment>     
//                             }    
//                         </Card.Content>
//                     </Card>
//                     ) 
//                 }            
//             </Card.Group>
//         )
   
// }

// export default JobPost;













import React from 'react';
import Cookies from 'js-cookie';
import { Popup } from 'semantic-ui-react';
import moment from 'moment';

export class JobSummaryCard extends React.Component {
    constructor(props) {
        super(props);
        this.selectJob = this.selectJob.bind(this)
    }

    selectJob(id) {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'https://talent-competition-talent.azurewebsites.net/listing/listing/closeJob',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            dataType: 'json',
            type: "post",
            data: JSON.stringify(id),
            success: function (res) {
                if (res.success == true) {
                    this.props.reloadData();
                    TalentUtil.notification.show(res.message, "success", null, null)
                } else {
                    TalentUtil.notification.show(res.message, "error", null, null)
                }
            }.bind(this)
        })
    }

    render() {
        var data = this.props.data
        var buttonSwitch = undefined;
        if (data.status == 0) {
            buttonSwitch =
                <div className="ui right floated mini buttons">
                    <button
                        className="right floated ui mini basic blue button"
                        onClick={() => this.selectJob(data.id)}
                    >
                        <i className="ban icon" />Close
                    </button>
                    <button
                        className="right floated ui mini basic blue button"
                        onClick={() => { window.location = "/EditJob/" + data.id }}
                    >
                        <i className="edit icon" />Edit
                    </button>
                    <button
                        className="right floated ui mini basic blue button"
                        onClick={() => { window.location = "/PostJob/" + data.id }}>
                        <i className="copy icon" />Copy
                    </button>
                </div>
        }
        else {
            buttonSwitch =
                <span>
                    <button
                        className="right floated ui mini basic blue button"
                        onClick={() => { window.location = "/PostJob/" + data.id }}>
                        Copy This Job
                    </button>
                    <label className="ui black left floated label">
                        <i className="ban icon" />Job closed
                    </label>
                </span>;
        }

        return (
            <div className="card manage-job">
                <div className="content">
                    <div className="header">{data.title} </div>
                    <Popup trigger={
                        <a className="ui black right ribbon label">
                            <i className="user icon"></i>{data.noOfSuggestions}
                        </a>
                    }>
                        <span>Suggested Talents</span>
                    </Popup>

                    <div className="meta"> {data.location.city}, {data.location.country}</div>

                    <div className="description job-summary">
                        {data.summary}
                    </div>
                </div>
                <div className="extra content">
                    {buttonSwitch != undefined ? buttonSwitch : null}
                    {
                        moment(data.expiryDate) < moment() ?
                            <label className="ui red left floated label">
                                Expired
                    </label> : null}
                </div>
            </div>
        )
    }
}