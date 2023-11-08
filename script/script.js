"use strict";

//Github repository link:
//https://github.com/NoahKrobot/FullStackCA1




let dublinData = [];
let dublinDataCopy = [...dublinData]


const ascending = 1
class DublinAttractionsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortDirection: ascending, // Assuming ascending sort
            sortColumn: "name",
            searchQuery: "",
            modalMoreOpened: false,
            modalAddOpened: false,
            modalDeleteOpened: false,
            selectedAtraction: null,

            name: "",
            latitude: "",
            longitude: "",
            address: "",
            description: "",
            contactNumber: "",
            lastUpdate: "",
            rating: "",
            free: "",
            tags: []
        
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




    /************************* MODALS *************************/


    //more modal       [[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]
    toggleMoreModal = (attraction) => () => {
        // console.log("test modal");
        this.setState({ modalMoreOpened: true, selectedAttraction: attraction });
    }

    closeMoreModal = () => {
        this.setState({ modalMoreOpened: false, selectedAttraction: null });
    }

    //add modal       [[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]
    toggleAddModal = () => {
        this.setState({ modalAddOpened: true });
    }

    closeAddModal = () => {
        this.setState({ modalAddOpened: false });
    }

    addNewActivity = (name, latitude, longitude, address, description, contactNumber, lastUpdate, rating, free, tags) => {
        let newActivity = {
            poiID: dublinData.length + 1, // Assuming you're using the length to generate a new ID
            name: name,
            latitude: latitude,
            longitude: longitude,
            address: address,
            description: description,
            contactNumber: contactNumber,
            lastUpdate: lastUpdate,
            rating: rating,
            free: free,
            tags: tags,
        };
        // Update the state with the new attraction list
        this.setState(prevState => ({
            dublinData: [...prevState.dublinData, newActivity],
            modalAddOpened: false // You might want to close the add modal on adding a new activity
        }));
    }


    //delete modal       [[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]

    toggleDeleteModal = (attraction) => () => {
        this.setState({ modalDeleteOpened: true, selectedAttraction: attraction });
    }

    closeDeleteModal = () => {
        this.setState({ modalDeleteOpened: false, selectedAtraction: null });
    }


    handleDelete = (poiID) => () => {
        // console.log("test delete");
        this.props.onDelete(poiID);
    }




    //render      [[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]

    render() {
        const { 
            sortColumn, sortDirection, searchQuery, modalMoreOpened, 
            selectedAttraction, modalAddOpened, modalDeleteOpened,
            name, latitude, longitude, address, description, 
            contactNumber, lastUpdate, rating, free, tags} = this.state;

        const filteredAttractions = this.props.attractions.filter(
            attraction => attraction.name.toLowerCase().includes(searchQuery)
        );
        return (
            <div>
                <input type="text" placeholder="Search by name..." onChange={this.handleSearch} />
                <button onClick={this.toggleAddModal}>Add</button>
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
                                    <button onClick={this.toggleMoreModal(attraction)}>More</button>
                                    {/* <button onClick={this.handleDelete(attraction.poiID)}>Delete</button> */}
                                    <button onClick={this.toggleDeleteModal(attraction)}>Delete</button>
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
                {modalMoreOpened && <ModalMore attraction={selectedAttraction} closeMoreModal={this.closeMoreModal} />}
                {modalAddOpened && <ModalAdd closeAddModal={this.closeAddModal} addNewActivity={this.addNewActivity} />}
                {modalDeleteOpened && <ModalDelete attraction={selectedAttraction} closeDeleteModal={this.closeDeleteModal} handleDelete={this.handleDelete(selectedAttraction.poiID)} />}
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

                let newFields = [
                    { rating: 1, free: "No", tags: ["#dark", "#scary", "#horror"] },
                    { rating: 2, free: "No", tags: ["#dark", "#scary", "#horror"] },
                    { rating: 3, free: "No", tags: ["#dark", "#scary", "#horror"] },
                    { rating: 4, free: "No", tags: ["#dark", "#scary", "#horror"] },
                    { rating: 5, free: "No", tags: ["#dark", "#scary", "#horror"] },
                    { rating: 6, free: "No", tags: ["#dark", "#scary", "#horror"] },
                    { rating: 7, free: "No", tags: ["#dark", "#scary", "#horror"] },
                    { rating: 8, free: "No", tags: ["#dark", "#scary", "#horror"] },
                    { rating: 9, free: "No", tags: ["#dark", "#scary", "#horror"] },
                    { rating: 10, free: "No", tags: ["#dark", "#scary", "#horror"] }
                ]

                let newFieldKeys = Object.keys(newFields[0])
                newFields.forEach((field, index) => {
                    newFieldKeys.forEach((fieldKey) => {
                        data[index][fieldKey] = newFields[index][fieldKey]
                    }
                    )
                }
                )
                let emptyObjects = { rating: "null", free: null, tags: [null] };
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


class ModalMore extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            rating: props.attraction.rating || "Unknown", // default to "Unknown" if not present
            free: props.attraction.free || "Unknown", // default to "Unknown" if not present
            tags: props.attraction.tags ? props.attraction.tags.join(", ") : "Unknown" // default to "Unknown" if not present
        };

    }

    static propTypes = {
        attraction: PropTypes.object,
        closeMoreModal: PropTypes.func
    }

    componentDidMount() {
        console.log("More modal opens")
    }

    closeMoreModal = () => () => {
        // console.log("test close modal");
        this.props.closeMoreModal();
    }

    // renderTagSection =(attraction) =>()=>{

    //     if (!attraction.tags || attraction.tags.length === 0 || attraction.tags[0] === null) {
    //         attraction.tags = "Unknown";
    //     }
    //     attraction.tags = attraction.tags.join(", ");
    // }

    // renderRateSection=(attraction) =>()=>{
    //     if (!attraction.rating) {
    //         attraction.rating = "Unknown"
    //     }
    // }

    // renderFreeSection=(attraction) =>()=>{
    //     if (!attraction.free) {
    //         attraction.free = "Unknown"
    //     }
    // }

    render() {
        const { attraction } = this.props;  // don't delete this

        return (
            <div className="modal">
                <div className="modalContent">
                    <h1>{attraction.name}</h1>
                    {/* <div>
                        <p>Latitude: {attraction.latitude}</p>
                        <p>Longitude: {attraction.longitude}</p>
                        <p>Address: {attraction.address}</p>
                        <p>Description: {attraction.description}</p>
                        <p>Contact Number: {attraction.contactNumber}</p>
                    </div> */}

                    <div>
                        <br></br>
                        <p>Tags: {this.state.tags}</p>
                        <p>Rating: {this.state.rating}</p>
                        <p>Free Entry: {this.state.free}</p>
                    </div>


                    <button id="exitButton" onClick={this.closeMoreModal()}>Close</button>
                </div>
            </div>
        );
    }
}





class ModalAdd extends React.Component {

    //Tutorial read value from user input:
    //https://legacy.reactjs.org/docs/forms.html
    constructor(props) {
        super(props);

        this.state = {
            poiID: dublinData.length + 1,
            name: '',
            latitude: '',
            longitude: '',
            address: '',
            description: '',
            contactNumber: '',
            lastUpdate: '',
            rating: '',
            free: '',
            tags: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static propTypes = {
        attraction: PropTypes.object,
        closeAddModal: PropTypes.func,
        addNewActivity: PropTypes.func
    }

    componentDidMount() {
        console.log("Add modal opens")
    }

    closeAddModal = () => {
        this.props.closeAddModal();
    }


    addNewActivity = (name, latitude, longitude, address, description, contactNumber, lastUpdate, rating, free, tags) => {
        this.props.addNewActivity( name, latitude, longitude, address, description, 
            contactNumber, lastUpdate, rating, free, tags);
    }



    handleChange(event) {
        // this.setState({value: event.target.value})

        let name = event.target.name;
        let value = event.target.value;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        console.log('A submission happened with the following state:');
        // console.log(
        //     "poiID:",
        //     this.state.poiID,
        //     "name:",
        //     this.state.name,
        //     "latitude:",
        //     this.state.latitude,
        //     "longitude:",
        //     this.state.longitude,
        //     "address:",
        //     this.state.address,
        //     "description:",
        //     this.state.description,
        //     "contactNumber:",
        //     this.state.contactNumber,
        //     "lastUpdate:",
        //     this.state.lastUpdate,
        //     "rating:",
        //     this.state.rating,
        //     "free:",
        //     this.state.free,
        //     "tags:",
        //     this.state.tags);

        this.addNewActivity(
            this.state.name,
            this.state.latitude,
            this.state.longitude,
            this.state.address,
            this.state.description,
            this.state.contactNumber,
            this.state.lastUpdate,
            this.state.rating,
            this.state.free,
            this.state.tags
        );



        event.preventDefault();  // solved - submitting refresing the page => don't delete 

    }

    render() {

        // const { attraction } = this.props; 

        return (
            <div className="modal">
                <div className="modalContent">
                    <h1>Add new</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <label htmlFor="addName">Name: </label>
                            <input type="text" id="addName" name="name" value={this.state.name} onChange={this.handleChange} />
                        </div>
                        <div>
                            <label htmlFor="addLatitude">Latitude: </label>
                            <input type="text" id="addLatitude" name="latitude" value={this.state.latitude} onChange={this.handleChange} />
                        </div>
                        <div>
                            <label htmlFor="addLongitude">Longitude: </label>
                            <input type="text" id="addLongitude" name="longitude" value={this.state.longitude} onChange={this.handleChange} />
                        </div>
                        <div>
                            <label htmlFor="addAddress">Address: </label>
                            <input type="text" id="addAddress" name="address" value={this.state.address} onChange={this.handleChange} />
                        </div>
                        <div>
                            <label htmlFor="addDescription">Description: </label>
                            <input type="text" id="addDescription" name="description" value={this.state.description} onChange={this.handleChange} />
                        </div>
                        <div>
                            <label htmlFor="addContactNumber">Contact Number: </label>
                            <input type="text" id="addContactNumber" name="contactNumber" value={this.state.contactNumber} onChange={this.handleChange} />
                        </div>
                        <div>
                            <label htmlFor="addLastUpdate">Last Update: </label>
                            <input type="text" id="addLastUpdate" name="lastUpdate" value={this.state.lastUpdate} onChange={this.handleChange} />
                        </div>

                        
                        <div>
                            <label htmlFor="addRating">Rating: </label>
                            <input type="text" id="addRating" name="rating" value={this.state.rating} onChange={this.handleChange} />
                        </div>

                        <div>
                            <label htmlFor="addFree">Free: </label>
                            <input type="text" id="addRating" name="free" value={this.state.free} onChange={this.handleChange} />
                        </div>
                       
                        <div>
                            <label htmlFor="addTags">Tags: </label>
                            <input type="text" id="addTags" name="tags" value={this.state.tags} onChange={this.handleChange} />
                        </div>

                        <input type="submit" value="Submit" />
                    </form>
                    <button id="exitButton" onClick={this.closeAddModal}>Close</button>
                    <button id="confirmAddButton" onClick={this.addNewActivity}>Confirm Add</button>
                </div>
            </div>
        );
    }
}

class ModalDelete extends React.Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        attraction: PropTypes.object,
        closeDeleteModal: PropTypes.func
    }

    componentDidMount() {
        console.log("Delete modal opens")
    }

    closeDeleteModal = () => () => {
        // console.log("test close modal");
        this.props.closeDeleteModal();
    }



    handleDelete = (poiID) => () => {
        // console.log("test delete");
        this.props.handleDelete(poiID);
        this.props.closeDeleteModal();
    }



    render() {
        const { attraction } = this.props;  //don't delete this

        //in return, divs don't appear if the className is replaced with ID
        return (
            <div className="modal">
                <div className="modalContent">
                    <h1>Are you sure you want to delete {attraction.name}?</h1>
                    <button id="exitButton" onClick={this.handleDelete(attraction.poiID)}>Yes</button>
                    <button id="exitButton" onClick={this.closeDeleteModal()}>No</button>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<DublinAttractionsForm />, document.getElementById("listContainer"));