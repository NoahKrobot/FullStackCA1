"use strict";

let dublinData = [];

class DublinPOITable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortDirection: 1, // Assuming ascending sort
            sortColumn: "name",
        };
    }

    componentDidMount() {
        this.props.poiData.sort((a, b) => a["name"].localeCompare(b["name"]));
        this.setState({ sortColumn: "name" });
    }

    handleHeaderClick = (e) => {
        const sortColumn = e.target.id;
        let sortDirection = this.state.sortDirection;
        if (this.state.sortColumn === sortColumn) {
            sortDirection = -sortDirection;
        } else {
            sortDirection = 1;
        }

        this.props.poiData.sort((a, b) =>
            a[sortColumn].localeCompare(b[sortColumn]) * sortDirection
        );
        this.setState({ sortDirection: sortDirection, sortColumn: sortColumn });
    };

    render() {
        const { sortColumn, sortDirection } = this.state;
        
        return (
            <div>
                <input type="text" placeholder="Search..."/>
                <table id="dublinPOITable">
                    <thead>
                        <tr>
                            {["action","name", "latitude", "longitude", "address", "description", "contactNumber"].map((column) => (
                                <th 
                                    key={column} 
                                    id={column} 
                                    onClick={this.handleHeaderClick}
                                    className={
                                        sortColumn === column ? 
                                        (sortDirection === 1 ? "ascending" : "descending") : 
                                        ""
                                    }
                                >
                                    {column.charAt(0).toUpperCase() + column.slice(1)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.poiData.map(poi => (
                            <tr key={poi.poiID}>
                                <td>
                                    <button>More</button>
                                    <button>Modify</button>
                                    <button>Delete</button>
                                </td>
                                <td>{poi.name}</td>
                                <td>{poi.latitude}</td>
                                <td>{poi.longitude}</td>
                                <td>{poi.address}</td>
                                <td>{poi.description}</td>
                                <td>{poi.contactNumber}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

}

class DublinPOIForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { poiData: [] };
    }

    componentDidMount() {
        fetch("json/dublinData.json")
            .then(response => response.json())
            .then(data => {
                this.setState({ poiData: data });
            });
    }

    render() {
        return (
            <div id="dublinPOIDiv">
                <h1>Dublin Attractions</h1>
                <DublinPOITable poiData={this.state.poiData} />
            </div>
        );
    }
}

ReactDOM.render(<DublinPOIForm />, document.getElementById("listContainer"));
