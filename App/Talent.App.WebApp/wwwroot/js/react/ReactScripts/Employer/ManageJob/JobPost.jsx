import React from 'react';
import { Pagination, Icon, Dropdown, Checkbox, Accordion, Form, Segment,  Button, Card, Image, Container} from 'semantic-ui-react';
import { useState } from 'react';

const JobPost = (props) => {
    const {posts} = props;

    return(
        <Card.Group  itemsPerRow={2} style={{marginBottom: "20px"}}>
            {posts.map(p => 
                <Card>
                    <Card.Content>
                        <Card.Header>{p.title}</Card.Header>
                        <Card.Meta>{p.jobDetails.location.city}, {p.jobDetails.location.country}</Card.Meta>
                        <Card.Description style={{minHeight: "150px"}}>
                            {p.description.slice(3, p.description.length - 5).replace(/&nbsp;/g, '')}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Button negative floated='left'>Expired</Button>
                        <Container textAlign='right'>
                            <Button basic color='blue'><Icon name='remove circle'/>Close</Button>
                            <Button basic color='blue'><Icon name='edit outline'/>Edit</Button>
                            <Button basic color='blue'><Icon name='copy outline'/>Copy</Button>
                        </Container>
                    </Card.Content>
                </Card>
                ) 
            }            
        </Card.Group>
    )    
}

export default JobPost;