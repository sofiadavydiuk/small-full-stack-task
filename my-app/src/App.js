import React from 'react';
import axios from 'axios';
import "./App.css";

export default class App extends React.Component {
    state = {
        users: [],
        calculations: {},
        isFiltered: false,
        sortType: "newest",
    }

    componentDidMount() {
        axios.get(`/users`)
            .then(res => {
            this.setState({
                users: res.data.users,
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

    filterTickets = (user) => {
        return this.state.isFiltered ? user.ticketsCreated.length >= 5 : user.ticketsCreated.length < 5;
    }

    sortByDate = (userA, userB) => {
        let a = new Date(userA.joinDate.replace(' ',''));
        let b = new Date(userB.joinDate.replace(' ',''));

        if(this.state.sortType === "newest") {
            console.log([a,b, a>b ? -1 : a<b ? 1 : 0])
            return  a>b ? -1 : a<b ? 1 : 0;
        }
        else {
            return  a>b ? 1 : a<b ? -1 : 0;
        }

    }

    onSort = sortType => {
        this.setState({sortType})
    }

    render() {
        return (
            <div className="App">
                <h1 className="heading">Full Stack Task</h1>
                <div className="top-section">
                    <div>
                        <button className="buttonSort" onClick={() => this.onSort("newest")}>Sort By Newest</button>
                        <button className="buttonSort" onClick={() => this.onSort("oldest")}>Sort By Oldest</button>
                    </div>
                    <div className="checkboxes">
                        <label className="checkboxContainer" htmlFor="filterby5">
                           <input type="checkbox" id="filterby5" name="vehicle1" value={this.state.isFiltered} onChange={this.handleFilterChange}/>
                           More then 5 tickets created
                          <span className="checkmark"></span>
                        </label>
                    </div>
                </div>
                <div className="flex-grid">
                    {this.state.users.sort(this.sortByDate).filter(this.filterTickets).map((user) =>
                        <div className="col card" key={user.id}>
                            <div className="title"><span className="cardFieldDescription">User Name:</span> {user.name}</div>
                            <div className="userCompany"><span className="cardFieldDescription">Company:</span> {user.company}</div>
                            <div className="userEmail"><span className="cardFieldDescription">Email:</span> {user.email}</div>
                            <div className="userData"><span className="cardFieldDescription">Join date:</span> {user.joinDate}</div>
                        </div>
                    )}
                </div>
                 <div className="calculation">
                     <h2>Statistics</h2>
                    <li><span className="cardFieldDescription">Average Ticket Created:</span>{this.state.calculations.averageTicketCreated}</li>
                    <li><span className="cardFieldDescription">Average Backups Created:</span>{this.state.calculations.averageBackupsCreated}</li>
                 </div>
            </div>
        )
    }
}
