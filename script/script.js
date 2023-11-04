"use strict";

let dublinData = [];

const ascending = 1
class DublinAttractionsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortDirection: ascending, // Assuming ascending sort
            sortColumn: "name",
            searchQuery: "",
            modalOpened: false,
            selectedAtraction: null
        };
    }

    static propTypes =
        {
            dublinData: PropTypes.array,
        }

    componentDidMount() {
        this.props.attractions.sort((a, b) => a["name"] < b["name"] ? -1 : 1);
        this.setState({ sortColumn: "name" });
    }

    handleHeaderClick = (e) => {
        const sortColumn = e.target.id;
        let sortDirection = this.state.sortDirection;
        if (this.state.sortColumn === sortColumn) {
            sortDirection = -sortDirection;
        } else {
            sortDirection = ascending;
        }

        this.props.attractions.sort((a, b) =>
            a[sortColumn] < b[sortColumn] ? -sortDirection : sortDirection)
        this.setState({ sortDirection: sortDirection, sortColumn: sortColumn });
    };

    handleSearch = (e) => {
        // console.log("test search");
        // this.props.setState({ searchQuery: e.target.value.toLowerCase() }); 

        //for some reason doesn't work with props 
        this.setState({ searchQuery: e.target.value.toLowerCase() });

    }

    handleDelete = (poiID) => () => {
        // console.log("test delete");
        this.props.onDelete(poiID);
    }

    toggleModal =(attraction) => () => {
        // console.log("test modal");
        this.setState({ modalOpened: true, selectedAttraction: attraction });
    }
   

    render() {
        const { sortColumn, sortDirection, searchQuery, deleteQuery, modalOpened, selectedAttraction } = this.state;
        const filteredAttractions = this.props.attractions.filter(
            attraction => attraction.name.toLowerCase().includes(searchQuery)
        );
        return (
            <div>
                <input type="text" placeholder="Search by name..." onChange={this.handleSearch} />
                <table id="dublinTable">
                    <thead>
                        <tr>
                            <th id="action">Action</th>
                            <th id="name" onClick={this.handleHeaderClick}>Name
                                {(this.state.sortColumn === "name" && this.state.sortDirection === ascending) ? "▲" : null} {(this.state.sortColumn === "name" && this.state.sortDirection === -ascending) ? "▼" : null}</th>
                            <th id="latitude">Latitude</th>
                            <th id="longitude">Longitude</th>
                            <th id="address" onClick={this.handleHeaderClick}>Address
                                {(this.state.sortColumn === "address" && this.state.sortDirection === ascending) ? "▲" : null} {(this.state.sortColumn === "address" && this.state.sortDirection === -ascending) ? "▼" : null}</th>
                            <th id="description">Description</th>
                            <th id="contactNumber">Contact Number</th>
                        </tr>
                    </thead>
                    <tbody>

                        {filteredAttractions.map(attraction => (
                            <tr key={attraction.poiID}>
                                <td>
                                    <button onClick={this.toggleModal(attraction)}>More</button>
                                    <button>Modify</button>
                                    <button onClick={this.handleDelete(attraction.poiID)}>Delete</button>
                                    {/* <button onClick={() => this.handleDelete(attraction.poiID)}>Delete</button> */}
                                </td>
                                <td>{attraction.name}</td>
                                <td>{attraction.latitude}</td>
                                <td>{attraction.longitude}</td>
                                <td>{attraction.address}</td>
                                <td>{attraction.description}</td>
                                <td>{attraction.contactNumber}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {modalOpened && <Modal attraction={selectedAttraction}/>}
              
            </div>
        );
    }

}




class DublinAttractionsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { attractions: [] };
    }

    componentDidMount() {
        fetch("json/dublinData.json")
            .then(response => response.json())
            .then(data => {
                this.setState({ attractions: data });
            });
    }

    deleteAttraction = (poiID) => {
        this.setState(prevState => ({
            attractions: prevState.attractions.filter(attraction => attraction.poiID !== poiID)

        }));
    }

    render() {
        return (
            <div id="dublinPOIDiv">
                <DublinAttractionsTable attractions={this.state.attractions} onDelete={this.deleteAttraction} />
            </div>
        );
    }
}


class Modal extends React.Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        attraction: PropTypes.object,
    }

    componentDidMount(){
        console.log("modal opens")
    }
    render() {
        const { attraction} = this.props;  //don't delete this


        //in return, divs don't appear if the className is replaced with ID
        return (
            <div className="modal"> 
                <div className="modalContent">
                    <h1>{attraction.name}</h1>
                    <p>{attraction.description}</p>
                    <button>Close</button>
                </div>
            </div>
        );
    }
}









ReactDOM.render(<DublinAttractionsForm />, document.getElementById("listContainer"));
