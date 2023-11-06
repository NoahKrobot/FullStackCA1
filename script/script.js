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
            modalMoreOpened: false,
            modalAddOpened: false,
            modalModifyOpened: false,
            modalDeleteOpened: false,
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

    addNewAttraction = (dublinData, name, latitude, longitude, address, description, contactNumber, lastUpdate) => () => {
        let attraction = {
            poiID: dublinData.length++,
            name: name,
            latitude: latitude,
            longitude: longitude,
            address: address,
            description: description,
            contactNumber: contactNumber,
            // "imageFileName": "Abbey_Theatre_Dublin_Ireland_Photo_Ros_Kavanagh.jpg",
            lastUpdate: lastUpdate
        }
        attraction.push(newAttraction)
    }

    //modify modal       [[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]
    toggleModifyModal = (attraction) => () => {
        this.setState({ modalModifyOpened: true, selectedAttraction: attraction });
    }

    closeModifyModal = () => {
        this.setState({ modalModifyOpened: false, selectedAtraction: null });
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
        const { sortColumn, sortDirection, searchQuery, modalMoreOpened, selectedAttraction, modalAddOpened, modalModifyOpened, modalDeleteOpened } = this.state;
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
                                    <button onClick={this.toggleModifyModal(attraction)}>Modify</button>
                                    {/* <button onClick={this.handleDelete(attraction.poiID)}>Delete</button> */}
                                    <button onClick={this.toggleDeleteModal(attraction)}>OpenDel</button>
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
                {modalAddOpened && <ModalAdd closeAddModal={this.closeAddModal} />}
                {modalModifyOpened && <ModalModify attraction={selectedAttraction} closeModifyModal={this.closeModifyModal} addNewAttraction={this.addNewAttraction(dublinData)}/>}
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
    }

    static propTypes = {
        attraction: PropTypes.object,
        closeMoreModal: PropTypes.func
    }

    componentDidMount() {
        console.log("More modal opens")

    }
    // closeModal = () => {
    //   
    // }

    closeMoreModal = () => () => {
        // console.log("test close modal");
        this.props.closeMoreModal();
    }

    renderTagSection(attraction) {
        if (!attraction.tags || attraction.tags.length === 0 || attraction.tags[0] === null) {
            return "Unknown";
        }
        return attraction.tags.join(", ");
    }

  
    renderRateSection(attraction) {
        if (!attraction.rating) {
            return "Unknown"
        }
        return attraction.rating;

    }


    renderFreeSection(attraction) {
        if (!attraction.free) {
            return "Unknown"
        }
        return attraction.free;
    }

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
                        <p>Tags: {this.renderTagSection(attraction)}</p>
                        <p>Rating: {this.renderRateSection(attraction)}</p>
                        <p>Free Entry: {this.renderRateSection(attraction)}</p>
                    </div>


                    <button id="exitButton" onClick={this.closeMoreModal()}>Close</button>
                </div>
            </div>
        );
    }
}




class ModalAdd extends React.Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        attraction: PropTypes.object,
        closeAddModal: PropTypes.func
    }

    componentDidMount() {
        console.log("Add modal opens")

    }

    closeAddModal = () => () => {
        // console.log("test close modal");
        this.props.closeAddModal();
    }

    addNewAttraction = () => () => {
        // console.log("test close modal");
        this.props.addNewAttraction(dublinData, name, latitude, longitude, address, description, contactNumber, lastUpdate);
    }

    render() {
        const { attraction } = this.props;  //don't delete this


        //in return, divs don't appear if the className is replaced with ID
        return (
            <div className="modal">
                <div className="modalContent">
                    <h1>Add new</h1>

                    <form>
                        <div>
                            <label for="addName">Name: </label>
                            <input type="text" id="addName" name="AttractionName"></input>
                        </div>

                        <div>
                            <label for="addLatitude">Latitude: </label>
                            <input type="text" id="addLatitude" name="AttractionLatitude"></input>
                        </div>

                        <div>
                            <label for="addLongitude">Longitude: </label>
                            <input type="text" id="addLongitude" name="AttractionLongitude"></input>
                        </div>

                        <div>
                            <label for="addAddress">Address: </label>
                            <input type="text" id="addAddress" name="AttractionAddress"></input>
                        </div>

                        <div>
                            <label for="addDescription">Description: </label>
                            <input type="text" id="addDescription" name="AttractionDescription"></input>
                        </div>

                        <div>
                            <label for="addContactNumber">Contact Number: </label>
                            <input type="text" id="addContactNumber" name="AttractionContactNumber"></input>
                        </div>

                        <div>
                            <label for="addLastUpdate">Last Update: </label>
                            <input type="text" id="addLastUpdate" name="AttractionLastUpdate"></input>
                        </div>
                    </form>

                    <button id="addButton" onClick={this.addNewAttraction(
                        addName.value, 
                        addLatitude.value,
                        addLongitude.value,
                        addAddress.value,
                        addDescription.value,
                        addContactNumber.value,
                        addLastUpdate.value
                        )}>Confirm Add</button>



                    <button id="exitButton" onClick={this.closeAddModal()}>Close</button>
                </div>
            </div>
        );
    }
}





class ModalModify extends React.Component {
    constructor(props) {
        super(props)
    }

    static propTypes = {
        attraction: PropTypes.object,
        closeModifyModal: PropTypes.func
    }

    componentDidMount() {
        console.log("Modify modal opens")

    }

    closeModifyModal = () => () => {
        // console.log("test close modal");
        this.props.closeModifyModal();
    }

    render() {
        const { attraction } = this.props;  //don't delete this


        //in return, divs don't appear if the className is replaced with ID
        return (
            <div className="modal">
                <div className="modalContent">
                    <h1>{attraction.name}</h1>
                    <p>{attraction.description}</p>
                    <button id="exitButton" onClick={this.closeModifyModal()}>Close</button>
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
