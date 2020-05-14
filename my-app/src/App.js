import React from 'react';
import axios from 'axios';
import "./App.css";

export default class App extends React.Component {
    state = {
        users: [],
        originalUsers: [],
        calculations: {},
        isFiltered: false,
    }

    componentDidMount() {
        let users = '';
        axios.get(`/users`)
            .then(res => {
            this.setState({
                users: res.data.users,
                originalUsers: res.data.users,
                calculations: res.data.calculations
            });
        })
    }

    handleFilterChange = (e) => {
        console.log(e.target);
        this.setState({
            isFiltered: e.target.checked,
        })
    }

    handleSortChange = (e) => {
        console.log(e.target);
        this.setState({
            isSorted: e.target.checked,
        })
    }

    filterTickets = (user) => {
        return this.state.isFiltered ? user.ticketsCreated.length >= 5 : user.ticketsCreated.length < 5;
    }

    sortByDate = (userA, userB) => {
        let a = new Date(userA.joinDate.replace(' ',''));
        let b = new Date(userB.joinDate.replace(' ',''));
        return  a>b ? 1 : a<b ? -1 : 0;
    }


    render() {
        if (this.state.isSorted) {
            this.state.users.sort(this.sortByDate);
        }

        return (
            <div className="App">
                <div className="checkboxes">
                    <input type="checkbox" id="sortByDate"  value={this.state.isSorted} onChange={this.handleSortChange}/>
                    <label htmlFor="sortByDate">Sort by date</label><br/>

                   <input type="checkbox" id="filterby5" name="vehicle1" value={this.state.isFiltered} onChange={this.handleFilterChange}/>
                   <label htmlFor="filterby5">More then 5 tickets created</label><br/>
                </div>
                <div className="grid">
                    {this.state.users.filter(this.filterTickets).map((user) =>
                        <ul key={user.id}>
                            <div>{user.name}</div>
                            <div>{user.company}</div>
                            <div>{user.email}</div>
                            <div>{user.joinDate}</div>
                        </ul>
                    )}
                </div>
                 <div className="calculation">
                    <li>{this.state.calculations.averageTicketCreated}</li>
                    <li>{this.state.calculations.averageBackupsCreated}</li>
                 </div>
            </div>
        )
    }
}
