import React from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';
import LoggedInBanner from '../../Layout/Banner/LoggedInBanner.jsx';
import { LoggedInNavigation } from '../../Layout/LoggedInNavigation.jsx';
import { JobSummaryCard } from './JobSummaryCard.jsx';
import { BodyWrapper, loaderData } from '../../Layout/BodyWrapper.jsx';
import JobPost from './JobPost.jsx';
import { Pagination } from 'semantic-ui-react';
import  JobFilterDropdown  from './JobFilterDropdown.jsx';

export default class ManageJob extends React.Component {
    constructor(props) {
        super(props);
        let loader = loaderData
        loader.allowedUsers.push("Employer");
        loader.allowedUsers.push("Recruiter");
        //console.log(loader)
        this.state = {
            currentPosts: [],
            postsPerPage: 4,
            loadJobs: [],
            loaderData: loader,
            activePage: 1,
            sortBy: {
                date: "desc"
            },
            filter: {
                showActive: true,
                showClosed: false,
                showDraft: true,
                showExpired: true,
                showUnexpired: true
            },
            totalPages: 1,
            activeIndex: "",
            emptyJobData: "",
            checkConnection: ""
        }
        this.loadData = this.loadData.bind(this);
        this.init = this.init.bind(this);
        this.loadNewData = this.loadNewData.bind(this);
        //your functions go here
    };


    init() {
        let loaderData = TalentUtil.deepCopy(this.state.loaderData)
        loaderData.isLoading = false;
        this.setState({ loaderData });//comment this

        //set loaderData.isLoading to false after getting data
        //this.loadData(() =>
        //    this.setState({ loaderData })
        //)
        
        //console.log(this.state.loaderData)
    }

    componentDidMount() {
        this.init();
        this.loadData();
    };

    loadData() {
        var link = 'http://talent-competition-talent.azurewebsites.net/listing/listing/getSortedEmployerJobs';
        var cookies = Cookies.get('talentAuthToken');

        //your ajax call to get the data of the job posted by an employer
        $.ajax({
            url: link,
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            // data: {
            //     activePage: this.state.activePage,
            //     sortByDate: this.state.sortBy.date,
            //     showActive: this.state.showActive,
            //     showClosed: this.state.showClosed,
            //     showDraft: this.state.showDraft,
            //     showExpired: this.state.showExpired,
            //     showUnexpired: this.state.showUnexpired
            // }
            // ,
            contentType: "application/json",
            dataType: "json",
            success: function (res) {   
                if(res.myJobs.length == 0){
                    this.setState({
                        emptyJobData: "No Jobs Found!"
                    })
                }else{ 
                    this.setState({
                        loadJobs: res.myJobs,
                        totalPages: res.myJobs.length
                    });
                }     
            }.bind(this),
            error: function (res) {
                this.setState({
                    emptyJobData: "No Jobs Found!"
                });
            }.bind(this)
        })
               
    }

    loadNewData(data) {
        var loader = this.state.loaderData;
        loader.isLoading = true;
        data[loaderData] = loader;
        this.setState(data, () => {
            this.loadData(() => {
                loader.isLoading = false;
                this.setState({
                    loadData: loader
                })
            })
        });
    }

    //setting the states while clicking on the pagination number buttons including next and previous buttons
    paginate(paginationInnerText, paginationInnerType){   
        var prevItem='prevItem', nextItem='nextItem';
  
        if(paginationInnerType != prevItem && paginationInnerType != nextItem){
            this.setState({
                activePage: Number(paginationInnerText)
            })            
        }else{
            switch (paginationInnerType)
            {
                case prevItem:
                    if(this.state.activePage<2){
                    }else{
                        this.setState({
                            activePage: this.state.activePage - 1
                        })       
                    }
                break;

                case nextItem:
                    if(this.state.activePage>(this.state.totalPages/this.state.postsPerPage)){
                    }else{
                        this.setState({
                            activePage: this.state.activePage + 1
                        })
                    }            
                break;

                default:
            }                          
        }            
    } 
    
  
    render() {

        //Getting current Post
        var indexOfLastPost = this.state.activePage * this.state.postsPerPage ; 
        var indexOfFirstPost = indexOfLastPost - this.state.postsPerPage; 
        var currentPosts = this.state.loadJobs.slice(indexOfFirstPost, indexOfLastPost);

        //Rounding up the value for the last number of pages
        var last = Math.round(this.state.totalPages/this.state.postsPerPage);

        return (
            <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
                <div className ="ui container"><h1>List of Jobs</h1>
                    <JobFilterDropdown />                        
                    <div><h5 style={{margin: "20px 0px 1px 20px"}}>{this.state.emptyJobData}</h5></div>
                    <JobPost posts={currentPosts} />
                    <Pagination onClick={(e)=> this.paginate(e.target.innerHTML, e.target.type)} 
                    firstItem={null} lastItem={null} defaultActivePage={this.state.activePage} 
                    totalPages={last} /> 
                </div>
            </BodyWrapper>
        )
    }
}









 





