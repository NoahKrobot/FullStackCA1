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

            attractions: props.countries,
            rating: props.rating,

            sortDirection: ascending, // Assuming ascending sort
            sortColumn: "name",
            searchQuery: "",
            modalMoreOpened: false,
            modalAddOpened: false,
            modalDeleteOpened: false,
            modalModifyOpened: false,
            selectedAtraction: null,
            dublinDataLength: 0,

            newActivity: [
                {
                    poiID: dublinData.length + 1,
                    name: "",
                    latitude: "",
                    longitude: "",
                    address: "",
                    description: "",
                    contactNumber: "",
                    lastUpdate: "",
                    rating: "",
                    free: null,
                    tags: []
                }
            ]
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
        this.setState({ modalMoreOpened: true, selectedAttraction: attraction });
    }

    closeMoreModal = () => {
        this.setState({ modalMoreOpened: false, selectedAttraction: null });
    }

    //modify modal       [[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]
    toggleModifyModal = (attraction) => () => {
        console.log("test modify modal");
        this.setState({ modalModifyOpened: true, selectedAttraction: attraction });
    }

    closeModifyModal = () => {
        this.setState({ modalModifyOpened: false, selectedAttraction: null });
    }

    handleModify = (editedAttraction) => {
        console.log("table modify open")
        this.props.handleModify(editedAttraction);
    }




    //add modal       [[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]
    toggleAddModal = () => {
        this.setState({ modalAddOpened: true });
    }

    closeAddModal = () => {
        this.setState({ modalAddOpened: false });
    }

    fetchUrl = (length) => {
        this.setState({ dublinDataLength: length }, () => {
            this.createNewAttraction();
        });
    }

    handleSubmit = (newAttraction) => {
        // console.log("handleSubmit in table opens.")
        console.log(newAttraction);
        this.props.handleAddNewActivity(newAttraction);
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
        this.props.handleDelete(poiID);
    }

    //render      [[[[[[[[[[[[[[[[[[[]]]]]]]]]]]]]]]]]]]

    render() {
        const {
            sortColumn, sortDirection, searchQuery, modalMoreOpened,
            selectedAttraction, modalAddOpened, modalDeleteOpened,
            modalModifyOpened,
            name, latitude, longitude, address, description,
            contactNumber, lastUpdate, rating, free, tags } = this.state;

        const filteredAttractions = this.props.attractions.filter(
            attraction => attraction.name.toLowerCase().includes(searchQuery)
        );
        return (

            <div>
                {/* <input type="text" placeholder="Search by name..." /> */}


                <section id="hero" class="text-white tm-font-big tm-parallax">
                    <nav class="navbar navbar-expand-md tm-navbar" id="tmNav">
                        <div class="container">
                            <div class="tm-next">
                                <button onClick={this.toggleAddModal}>Add</button>
                            </div>

                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <i class="fas fa-bars navbar-toggler-icon"></i>
                            </button>



                            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul class="navbar-nav ml-auto">



                                    <div class="container h-100">
                                        <div class="d-flex justify-content-center h-100">
                                            <div class="searchbar">
                                                <input class="search_input" type="text" name="" onChange={this.handleSearch} placeholder="Search..." />
                                                <a href="#" class="search_icon"><i class="fas fa-search"></i></a>
                                            </div>
                                        </div>
                                    </div>



                                </ul>
                            </div>
                        </div>
                    </nav>

                    <div class="text-center tm-hero-text-container">
                        <div class="tm-hero-text-container-inner">
                            <h2 class="tm-hero-title">Dublin Attractions</h2>

                        </div>
                    </div>

                    <div class="tm-next tm-intro-next">
                        <a href="#introduction" class="text-center tm-down-arrow-link">
                            <i class="fas fa-3x fa-caret-down tm-down-arrow"></i>
                        </a>
                    </div>
                </section>

                <section id="introduction" class="tm-section-pad-top">



                    <div id="tableWrapper">

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
                        {modalModifyOpened && <ModalModify
                            attraction={selectedAttraction}
                            closeModifyModal={this.closeModifyModal}
                            handleModify={this.handleModify} // Make sure this method is bound correctly in the constructor
                        />}


                        {modalAddOpened && <ModalAdd closeAddModal={this.closeAddModal} handleSubmit={this.handleSubmit} />}
                        {modalDeleteOpened && <ModalDelete attraction={selectedAttraction} closeDeleteModal={this.closeDeleteModal} handleDelete={this.handleDelete(selectedAttraction.poiID)} />}
                    </div>

                </section>


                <section id="contact" class="tm-section-pad-top tm-parallax-2">
                    <div class="container tm-container-contact">
                        <div class="row">
                            <div class="col-12">
                                <h2 class="mb-4 tm-section-title">GitHub Project Log</h2>
                                <div class="mb-5 tm-underline">
                                    <div class="tm-underline-inner"></div>
                                </div>
                                <p class="mb-5">
                                    You can find all the details on how I created this project on a GitHub link below
                                </p>
                            </div>
                            <a href="https://github.com/NoahKrobot/FullStackCA1" target="_blank" class="github-button btn btn-primary">
                                <i class="fab fa-github"></i> Visit My GitHub
                            </a>

                        </div>
                    </div>
                    <footer class="text-center small tm-footer">
                        <p class="mb-0">
                            Copyright &copy; 2023 Made by Noah Krobot, SD2B

                        </p>
                    </footer>
                </section>
            </div>

        );
    }
}




class DublinAttractionsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            attractions: [],

            attraction: [],
            selectedAttractions: [],
            ratings: [],
            selectedRating: "All Tags",

            newFields: [{
                rating: "",
                free: false,
                tags: []
            }],

            newActivity: [{
                poiID: 0,
                name: "",
                latitude: "",
                longitude: "",
                address: "",
                description: "",
                contactNumber: "",
                lastUpdate: "",
                rating: "",
                free: null,
                tags: []
            }]
        };
    }

    componentDidMount() {
        fetch("json/dublinData.json")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    attractions: data
                });




                let newFields = [
                    { rating: 1, free: true, tags: ["#dark", "#scary", "#horror"] },
                    { rating: 2, free: false, tags: ["#dark", "#scary", "#horror"] },
                    { rating: 3, free: false, tags: ["#dark", "#scary", "#horror"] },
                    { rating: 4, free: false, tags: ["#dark", "#scary", "#horror"] },
                    { rating: 5, free: false, tags: ["#dark", "#scary", "#horror"] },
                    { rating: 6, free: false, tags: ["#dark", "#scary", "#horror"] },
                    { rating: 7, free: false, tags: ["#dark", "#scary", "#horror"] },
                    { rating: 8, free: false, tags: ["#dark", "#scary", "#horror"] },
                    { rating: 9, free: false, tags: ["#dark", "#scary", "#horror"] },
                    { rating: 10, free: false, tags: ["#dark", "#scary", "#horror"] }
                ]

                let newFieldKeys = Object.keys(newFields[0])

                data.forEach((item, index) => {
                    if (index < newFields.length) {
                        newFields.forEach((field, index) => {
                            newFieldKeys.forEach((fieldKey) => {
                                data[index][fieldKey] = newFields[index][fieldKey]
                            })
                        })
                    } else {
                        item.rating = null;
                        item.free = null;
                        item.tags = [];
                    }
                });

                let emptyObjects = { rating: "null", free: null, tags: [null] };
                let dublinDataLength = this.state.attractions.length;
                console.log(dublinDataLength);



                // get the list of unique regions
                let ratings = attractions.map(attraction => attraction.rating)
                let uniqueRatings = [...new Set(ratings)].sort()
                uniqueRatings.unshift("All Ratings") // add "All Regions" to the front of the array
                uniqueRatings[uniqueRatings.indexOf("")] = "None" // replace empty region (i.e. "") with "None"  
                this.setState({ countries: countries, selectedCountries: countries, ratings: uniqueRegions })
            });
    }


    handleRegionsChange = e => {
        if (e.target.value === "All Ratings") // all countries
        {
            this.setState({ selectedRating: e.target.value, selectedAttractions: this.state.attractions })
        }
        else if (e.target.value === "None") // Deal with the two regions Bouvet Island and Heard Island and McDonald Islands that have an empty country.region in the JSON file 
        {
            this.setState({ selectedRating: e.target.value, selectedAttractions: this.state.attractions.filter(attraction => attraction.rating === "") })
        }
        else  // countries from one region
        {
            this.setState({ selectedRating: e.target.value, selectedAttractions: this.state.attractions.filter(attraction => attraction.rating === e.target.value) })
        }
    }


    handleDelete = (poiID) => {

        //go thru the array -> forEach, filter
        //if the poiID == passed poiID -> cut it out

        //test 1 -> forEach - doesn't work
        // this.state.attractions.forEach((attraction) => {
        //     console.log(" ")
        //     console.log("attraction: ")
        //     console.log(attraction.poiID);
        //     console.log("poiId: ")
        //     console.log(poiID);
        //     if (attraction.poiID === poiID) {
        //         this.state.attractions.splice(attraction, 1);
        //         console.log("delete this")
        //     }else{
        //         console.log("do not delete")    
        //     }
        // });

        //test 2 -> filter - works   
        let deleteFilterAttracitons = this.state.attractions.filter(attraction =>
            attraction.poiID !== poiID);
        this.setState({ attractions: deleteFilterAttracitons });
    }

    handleAddNewActivity = (newActivity) => {
        // console.log(this.state.attractions.length)
        let newPoiID = this.state.attractions.length + 1;
        newActivity.poiID = newPoiID;
        // console.log(newActivity.poiID);
        this.state.attractions.push(newActivity);
    }


    handleModify = (editedAttraciton) => {
        console.log("**************************************")
        console.log("attraction form")
        console.log(editedAttraciton)
        console.log("**************************************")

        this.state.attractions.map(attraction => {
            if (attraction.poiID === editedAttraciton.poiID) {
                attraction.latitude = editedAttraciton.latitude
                attraction.longitude = editedAttraciton.longitude
                attraction.address = editedAttraciton.address
                attraction.description = editedAttraciton.description
                attraction.contactNumber = editedAttraciton.contactNumber
                attraction.tags = editedAttraciton.tags
                attraction.rating = editedAttraciton.rating

                if (editedAttraciton.free == "Yes") {
                    attraction.free = true
                } else {
                    attraction.free = false
                }
                // console.log("attraction free")
                // console.log(attraction.free)
                // console.log("ed attraction free")
                // console.log(editedAttraciton.free  )
            }
        })
    }



    render() {
        return (
            <div id="dublinPOIDiv">
                {/* <DropDownRatingList ratings={this.state.ratings} handleRatingChange={this.handleRatingChange}/> */}
                <DublinAttractionsTable attractions={this.state.attractions} handleDelete={this.handleDelete} handleAddNewActivity={this.handleAddNewActivity} handleModify={this.handleModify} />
            </div>
        );
    }
}


class DropDownRatingList extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <select name="rating" onChange={this.props.handleRatingChange}>
                {this.props.attractions.map(rating => <option key={rating} value={rating}>{rating}</option>)}
            </select>
        )
    }
}























class ModalModify extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

            validLatitude: false,
            validLongitude: false,
            validContactNumber: false,
            validRating: false,

            latitudeMessage: "",
            longitudeMessage: "",
            ratingMessage: "",
            contactNumberMessage: "",



            singleTag: "",
            modalConfirmModOpened: false,
            tagsExternalArray: props.attraction.tags || [''],
            message: "",
            editedAttraction: [{
                poiID: "",
                name: "",
                latitude: "",
                longitude: "",
                address: "",
                description: "",
                contactNumber: "",
                lastUpdate: props.attraction.lastUpdate,
                rating: props.attraction.rating || "Unknown",
                free: props.attraction.free ? "Yes" : "No" || "Unknown",
                tags: props.attraction.tags ? props.attraction.tags.join(", ") : "Unknown"
            }],
        };
    }


    static propTypes = {
        attraction: PropTypes.object,
        closeModifyModal: PropTypes.func,
        closeConfModifyModal: PropTypes.func,
        handleModify: PropTypes.func,
        handleChangeLatitude: PropTypes.func
    }
    componentDidMount() {
        // console.log("More modal opens")
        // console.log(this.props.attraction)
        // console.log(this.props.attraction.tags)
        // console.log(this.props.attraction.tags)
        // console.log(this.state.tagsExternalArray)

        this.state.tagsExternalArray = this.props.attraction.tags

        // const tagList = this.state.tagsExternalArray.map((tag, index) => (
        //     <p key={index}>{tag}</p>));
        // console.log("tag list: ",tagList)    
        // console.log("external array: ")
        // console.log(this.state.tagsExternalArray)

    }
    closeModifyModal = () => () => {
        // console.log("test close modal");
        this.props.closeModifyModal();
    }


    editLatitude = () => {
        // console.log(this.props.attraction.latitude)
    }

    handleModify = (event) => {

        event.preventDefault();
        // console.log("modify submit works");

        //latidude
        let valueLatitudeCheck = this.state.latitude;
        // console.log(valueLatitudeCheck)
        let booleanLatitude = this.state.validLatitude

        if (valueLatitudeCheck == null) {
            // console.log("oh no")
            this.state.latitude = this.props.attraction.latitude
            // this.setState({latitude: this.props.attraction.latitude})
            booleanLatitude = true;
            let errorMessage = "";
            this.setState({
                latitudeMessage: errorMessage
            });
        } else if (valueLatitudeCheck > -90 && valueLatitudeCheck < 90) {
            booleanLatitude = true;
            let errorMessage = "";
            this.setState({
                latitudeMessage: errorMessage
            });
        } else {
            let errorMessage = "Error: Latitude can be between -90 and 90.";
            this.setState({
                latitudeMessage: errorMessage
            });
        }



        //longitude
        let valueLongitudeCheck = this.state.longitude;
        let booleanLongitude = this.state.validLongitude

        if (valueLongitudeCheck == null) {
            this.state.longitude = this.props.attraction.latitude
            booleanLongitude = true;
            let errorMessage = "";
            this.setState({
                longitudeMessage: errorMessage
            });
        } else if (valueLongitudeCheck > -180 && valueLongitudeCheck < 180) {
            booleanLongitude = true;
            let errorMessage = "";
            this.setState({
                longitudeMessage: errorMessage
            });
        } else {
            let errorMessage = "Error: Longitude can be between -180 and 180.";
            this.setState({
                longitudeMessage: errorMessage
            });
        }


        //rating
        let valueRatingCheck = this.state.rating;
        let booleanRating = this.state.validRating

        if (valueRatingCheck == null) {
            this.state.rating = this.props.attraction.rating
            booleanRating = true;
            let errorMessage = "";
            this.setState({
                ratingMessage: errorMessage
            });
        } else if (valueRatingCheck > 0 && valueRatingCheck < 4) {
            booleanRating = true;
            let errorMessage = "";
            this.setState({
                ratingMessage: errorMessage
            });
        } else {
            let errorMessage = "Error: Rating can be 1, 2 or 3.";
            this.setState({
                ratingMessage: errorMessage
            });
        }

        //contact
        //tutorial for startsWith: https://www.w3schools.com/jsref/jsref_startswith.asp
        let valueContactNumCheck = this.state.contactNumber;
        let booleanContactNumber = this.state.validContactNumber;

        if (!valueContactNumCheck) {
            booleanContactNumber = true;
            let errorMessage = "";
            this.setState({
                contactNumberMessage: errorMessage
            });
        } else if (valueContactNumCheck.startsWith('+353')) {
            booleanContactNumber = true;
            let errorMessage = "";
            this.setState({
                contactNumberMessage: errorMessage
            });
        } else {
            let errorMessage = "Error: Invalid contact number. Don't forget to add +353 at the start.";
            this.setState({
                contactNumberMessage: errorMessage
            });
            booleanContactNumber = false;
        }










        //longitude
        if (this.state.longitude == null) {
            this.state.longitude = this.props.attraction.longitude
        }

        //address
        if (this.state.address == null) {
            this.state.address = this.props.attraction.address
        }

        //description
        if (this.state.description == null) {
            this.state.description = this.props.attraction.description
        }

        //contactNumber
        if (this.state.contactNumber == null) {
            this.state.contactNumber = this.props.attraction.contactNumber
        }

        //rating
        if (this.state.rating == null) {
            this.state.rating = this.props.attraction.rating
        }

        if (this.state.tagsExternalArray.length === 0) {
            this.state.tagsExternalArray = this.props.attraction.tags
        }
        if (this.state.free == null) {
            this.state.free = "No";
            // console.log("free is null")
        }
        if (this.state.free == undefined) {
            this.state.free = "No";
            // console.log("free is undefined")
        }




        if (booleanLatitude && booleanLongitude && booleanRating && booleanContactNumber) {
            console.log(" works")
            let editedAttraction = {
                poiID: this.props.attraction.poiID,

                name: this.props.attraction.name,
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                address: this.state.address,
                description: this.state.description,
                contactNumber: this.state.contactNumber,
                lastUpdate: this.props.attraction.lastUpdate,
                rating: this.state.rating,
                free: this.state.free,
                tags: this.state.tagsExternalArray
            };
            // console.log("Undedited attraction: ", this.props.attraction)
            // console.log("Edited attraction: ", editedAttraction)
            // console.log(this.state.tagsExternalArray.length)
            this.props.handleModify(editedAttraction);
            this.props.closeModifyModal();
        }
    }



    handleChangeLatitude = (event) => {
        let endValue = this.setState({ latitude: event.target.value });
    }

    handleChangeLongitude = (event) => {
        let endValue = this.setState({ longitude: event.target.value });
    }

    handleChangeAddress = (event) => {
        let endValue = this.setState({ address: event.target.value });
    }

    handleChangeDescription = (event) => {
        let endValue = this.setState({ description: event.target.value });
    }

    handleChangeContactNumber = (event) => {
        let endValue = this.setState({ contactNumber: event.target.value });
    }

    handleChangeRating = (event) => {
        let endValue = this.setState({ rating: event.target.value });
    }

    handleChangeFree = (event) => {
        let endValue = this.setState({ free: event.target.checked ? "Yes" : "No" });
    }


    handleChangeTags = (event) => {
        // this.setState({ singleTag: event.target.value });
        // console.log(this.state.singleTag)
        let endSingleTag = this.setState({ singleTag: event.target.value });
        // console.log(endSingleTag)
    }

    addTag = () => {
        let tagArray = this.state.tagsExternalArray
        tagArray.push(this.state.singleTag);
        // console.log("single tag: ", tagArray)
        // console.log("tag array: ")
        // console.log(tagArray);
        // console.log(this.state.singleTag);
        this.setState({ singleTag: "" });
        // return (
        //     <div>
        //         <h1>Addded Tags</h1>
        //         <p>{this.state.singleTag}</p>
        //     </div>
        // )
    }

    cutTags = (passedTag, index) => () => {
        // console.log('passedTag: ', passedTag)
        // console.log('index: ', index)
        if (this.state.tagsExternalArray.length != 1) {
            const newTags = [...this.state.tagsExternalArray];
            newTags.splice(index, 1);
            // console.log('index: ', index)
            this.setState({ tagsExternalArray: newTags });
        } else {
            this.setState({ message: 'There has to be at least one tag left.' })
        }

    }


    render() {
        // const { attraction } = this.props;  // don't delete this
        let tagList = [];
        let message = "";
        let ratingMessage = "";
        let latitudeMessage = "";
        let longitudeMessage = "";
        let contactNumberMessage = "";

        if (this.state.tagsExternalArray != undefined) {
            tagList = this.state.tagsExternalArray.map((tag, index) => (
                <p key={index} onClick={this.cutTags(tag, index)}>{tag}
                </p>
            ));
        }








        if (this.state.message) {
            message = <div className="error-message">{this.state.message}</div>;
        }

        if (this.state.ratingMessage) {
            ratingMessage = <div className="error-message">{this.state.ratingMessage}</div>;
        }


        if (this.state.latitudeMessage) {
            latitudeMessage = <div className="error-message">{this.state.latitudeMessage}</div>;
        }
        if (this.state.longitudeMessage) {
            longitudeMessage = <div className="error-message">{this.state.longitudeMessage}</div>;
        }
        if (this.state.contactNumberMessage) {
            contactNumberMessage = <div className="error-message">{this.state.contactNumberMessage}</div>;
        }


        let modalConfirmModOpened = this.state;

        return (


            <div className="modalModify">
                <div className="modalModifyContent" >
                    <button id="exitButton" className="closeModalButtonAdd" onClick={this.closeModifyModal()}> <i class="material-icons">close</i></button>



                    <h1>{this.props.attraction.name}</h1>
                    <div>
                        {/* <p>poiID: {attraction.poiID}</p> */}
                        {/* <p>Latitude: {this.props.attraction.latitude}</p> */}
                        <div>
                            <label htmlFor="editLatitude" className="labelText">Edit Latitude: </label>
                            <input type="text" id="editLatitude" className="userInputFields" name="latitude" value={this.props.value} placeholder={"CURRENT VALUE: " +this.props.attraction.latitude} onChange={this.handleChangeLatitude} />
                            {latitudeMessage}
                        </div>

                        {/* <p>Longitude: {this.props.attraction.longitude}</p> */}
                        <div>
                            <label htmlFor="editLongitude">Edit Longitude: </label>
                            <input type="text" id="editLongitude" className="userInputFields" name="longitude" value={this.props.value} placeholder={"CURRENT VALUE: " +this.props.attraction.longitude} onChange={this.handleChangeLongitude} />
                            {longitudeMessage}
                        </div>

                        {/* <p>Address: {this.props.attraction.address}</p> */}
                        <label htmlFor="editAddress">Edit Address: </label>
                        <input type="text" id="editAddress" className="userInputFields" name="address" value={this.props.value} placeholder={"CURRENT VALUE: " +this.props.attraction.address} onChange={this.handleChangeAddress} />

                        {/* <p>Description: {this.props.attraction.description}</p> */}
                        <label htmlFor="editDescription">Edit Description: </label>
                        <textarea type="text" className="userInputFields" name="description" value={this.props.value} placeholder={"CURRENT VALUE: " +this.props.attraction.description} onChange={this.handleChangeDescription} />

                        {/* <p>Contact Number: {this.props.attraction.contactNumber}</p> */}
                        <div>
                            <label htmlFor="editContactNumber">Edit Contact Number: </label>
                            <input type="text" id="editContactNumber" className="userInputFields" name="contactNumber" value={this.props.value} placeholder={"CURRENT VALUE: " + this.props.attraction.contactNumber} onChange={this.handleChangeContactNumber} />
                            {contactNumberMessage}
                        </div>

                    </div>
                    <div>
                        <br></br>

                        <div>

                            {/* <p>Rating: {this.props.attraction.rating}</p> */}
                            <label htmlFor="editRating">Edit Rating: </label>
                            <input type="text" id="editRating" className="userInputFields" name="rating" value={this.props.value} placeholder={"CURRENT VALUE: " +this.props.attraction.rating} onChange={this.handleChangeRating} />
                            {ratingMessage}
                        </div>



                        {/* <p>Free Entry:{this.props.attraction.free}</p> */}
                        <label htmlFor="editFree">Free: </label>
                        <input type="checkbox" id="editFree" name="free" defaultChecked={this.props.attraction.free} value={this.state.value} onChange={this.handleChangeFree} />
                        <br></br>


                        <div id="tagContainer">

                            <label htmlFor="addTags">Tags: </label>
                            <div className="tag-input-container">
                                <input type="text" id="addTags" className="tag-input" name="singleTag" value={this.state.singleTag} onChange={this.handleChangeTags} />
                                <button type="button" className="tag-add-btn" onClick={this.addTag}>+</button>
                            </div>


                            <div className="tag-list">
                                {this.state.tagsExternalArray.map((tag, index) => (
                                    <span key={index} className="tag" onClick={this.cutTags(tag, index)}>{tag}</span>
                                ))}
                                <div>
                                    {message}
                                </div>
                            </div>
                        </div>



                        <img id="imageBox"></img>
                    </div>
                    <div>
                    </div>
                    {/* <button id="editButton" onClick={this.editAttraction()}>Edit</button> */}

                    <input type="submit" className="submitAddAttraction" value="Submit" onClick={this.handleModify} />
                </div>
            </div>
        );
    }
}





class ModalAdd extends React.Component {

    //Tutorial read value from user input:
    // https://legacy.reactjs.org/docs/forms.html
    //Tutorial split user input into array:
    // https://www.w3schools.com/jsref/jsref_from.asp   
    // https://www.freecodecamp.org/news/javascript-split-how-to-split-a-string-into-an-array-in-js/ 
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            latitude: "",
            longitude: "",
            address: "",
            description: "",
            contactNumber: "",
            lastUpdate: "",
            rating: "",
            free: false,
            tags: [],
            singleTag: "",

            validName: false,
            validAddress: false,
            validLatitude: false,
            validLongitude: false,
            validContactNumber: false,
            validRating: false,

            nameMessage: "",
            latitudeMessage: "",
            longitudeMessage: "",
            addressMessage: "",
            contactNumberMessage: "",
            tagsMessage: ""
        };
    }

    static propTypes = {
        attraction: PropTypes.object,
        closeAddModal: PropTypes.func,
        handleSubmit: PropTypes.func,
    }

    componentDidMount() {
        console.log("Add modal opens")
    }
    closeAddModal = () => {
        this.props.closeAddModal();
    }
    handleChangeName = (event) => {
        this.setState({ name: event.target.value });
    }
    handleChangeLatitude = (event) => {
        this.setState({ latitude: event.target.value });
    }
    handleChangeLongitude = (event) => {
        this.setState({ longitude: event.target.value });
    }
    handleChangeAddress = (event) => {
        this.setState({ address: event.target.value });
    }
    handleChangeDescription = (event) => {
        this.setState({ description: event.target.value });
    }
    handleChangeContactNumber = (event) => {
        this.setState({ contactNumber: event.target.value });
    }
    handleChangeLastUpdate = (event) => {
        this.setState({ lastUpdate: event.target.value });
    }
    handleChangeRating = (event) => {
        this.setState({ rating: event.target.value });
    }
    handleChangeFree = (event) => {
        this.setState({ free: event.target.checked });
    }
    // handleChangeTags = (event) => {
    //     this.setState({tags: event.target.value});
    // }

    handleChangeTags = (event) => {
        this.setState({ singleTag: event.target.value });
    }

    addTag = () => {
        let tagArray = this.state.tags
        tagArray.push(this.state.singleTag);
        // console.log(tagArray);
        console.log(this.state.singleTag);
        this.setState({ singleTag: "" });
        return (
            <div>
                <h1>Addded Tags</h1>
                <p>{this.state.singleTag}</p>
            </div>
        )
    }


    handleSubmit = (event) => {

        event.preventDefault();
        console.log('  ');


        console.log("this.state.validLatitude ", this.state.validLatitude);
        console.log("this.props.attraction.latitude ", this.state.latitude);

        //latitude
        let valueLatitudeCheck = this.state.latitude;
        let booleanLatitude = this.state.validLatitude
        if (valueLatitudeCheck == null || valueLatitudeCheck == "") {
            let errorMessage = "Error: Latitude can't be empty.";
            this.setState({
                latitudeMessage: errorMessage
            });
        } else if (valueLatitudeCheck > -89 && valueLatitudeCheck < 91) {
            booleanLatitude = true;
            let errorMessage = "";
            this.setState({
                latitudeMessage: errorMessage
            });
        } else {
            let errorMessage = "Error: Latitude can be between -90 and 90.";
            this.setState({
                latitudeMessage: errorMessage
            });
        }



        //rating
        let valueRatingCheck = this.state.rating;
        let booleanRating = this.state.validLatitude
        if (valueRatingCheck == null || valueRatingCheck == "") {
            let errorMessage = "Error: Rating can be 1, 2 or 3.";
            this.setState({
                ratingMessage: errorMessage
            });
        } else if (valueRatingCheck == 1 || valueRatingCheck == 2 || valueRatingCheck == 3) {
            booleanRating = true;
            let errorMessage = "";
            this.setState({
                ratingMessage: errorMessage
            });
        } else {
            let errorMessage = "Error: Rating can be 1, 2 or 3.";
            this.setState({
                ratingMessage: errorMessage
            });
        }

        //longitude
        let valueLongitudeCheck = this.state.longitude;
        let booleanLongitude = this.state.validLongitude;
        if (valueLongitudeCheck == null || valueLongitudeCheck == "") {
            let errorMessage = "Error: Longitude can't be empty.";
            this.setState({
                longitudeMessage: errorMessage
            });
        } else if (valueLongitudeCheck > -181 && valueLongitudeCheck < 181) {
            booleanLongitude = true;
            let errorMessage = "";
            this.setState({
                longitudeMessage: errorMessage
            });
        } else {
            let errorMessage = "Error: Longitude can be between -180 and 180.";
            this.setState({
                longitudeMessage: errorMessage
            });
        }


        //contact
        //tutorial for startsWith: https://www.w3schools.com/jsref/jsref_startswith.asp


        let valueContactNumCheck = this.state.contactNumber;
        let booleanContactNumber = this.state.validContactNumber;

        if (valueContactNumCheck.startsWith('+353')) {
            booleanContactNumber = true;
            let errorMessage = "";
            this.setState({
                contactNumberMessage: errorMessage
            });
        } else {
            let errorMessage = "Error: Invalid contact number. Don't forget to add +353 at the start.";
            this.setState({
                contactNumberMessage: errorMessage
            });
            booleanContactNumber = false;
        }





        //name
        let valueNameCheck = this.state.name;
        let booleanName = this.state.validName;
        if (valueNameCheck == null || valueNameCheck == "") {
            let errorMessage = "Error: Name can't be empty.";
            this.setState({
                nameMessage: errorMessage
            });
        } else {
            let errorMessage = "";
            this.setState({
                nameMessage: errorMessage
            });
            booleanName = true;
        }


        let valueAddressCheck = this.state.address;
        let booleanAddress = this.state.validAddress;
        if (valueAddressCheck == null || valueAddressCheck == "") {
            let errorMessage = "Error: Address can't be empty.";
            this.setState({
                addressMessage: errorMessage
            });
        } else {
            let errorMessage = "";
            this.setState({
                addressMessage: errorMessage
            });
            booleanAddress = true;
        }









        if (
            booleanLatitude &&
            booleanLongitude &&
            booleanContactNumber &&
            booleanName &&
            booleanAddress &&
            booleanRating
        ) {
            console.log("add works")
          

            let newAttraction = {
                name: this.state.name,
                latitude: this.state.latitude,
                longitude: this.state.longitude,
                address: this.state.address,
                description: this.state.description,
                contactNumber: this.state.contactNumber,
                lastUpdate: this.state.lastUpdate,
                rating: this.state.rating,
                free: this.state.free,
                tags: this.state.tags
            };

            this.props.handleSubmit(newAttraction);
           
            this.props.closeAddModal();
        } else {
            console.log("add doesnt work")
        }

    }



    cutTags = (passedTag, index) => () => {
        this.setState({ tagsMessage: '' })
        if (this.state.tags.length > 1) {
            const newTags = [...this.state.tags];
            newTags.splice(index, 1);
            this.setState({ tags: newTags });
        } else {
            this.setState({ tagsMessage: 'At least one tag is required' });
        }
    };



    render() {

        // const tagList = this.state.props.tag.map((tags[], tag) => (
        //     <p key={tag.index}>{tag}</p>));
        // const { attraction } = this.props; 

        let latitudeMessage = "";
        let longitudeMessage = "";
        let contactNumberMessage = "";
        let nameMessage = "";
        let addressMessage = "";
        let ratingMessage = "";
        let tagsMessage = "";

        if (this.state.tagsMessage) {
            tagsMessage = <div className="error-message">{this.state.tagsMessage}</div>;
        }
        if (this.state.latitudeMessage) {
            latitudeMessage = <div className="error-message">{this.state.latitudeMessage}</div>;
        }
        if (this.state.longitudeMessage) {
            longitudeMessage = <div className="error-message">{this.state.longitudeMessage}</div>;
        }
        if (this.state.contactNumberMessage) {
            contactNumberMessage = <div className="error-message">{this.state.contactNumberMessage}</div>;
        }
        if (this.state.nameMessage) {
            nameMessage = <div className="error-message">{this.state.nameMessage}</div>;
        }
        if (this.state.addressMessage) {
            addressMessage = <div className="error-message">{this.state.addressMessage}</div>;
        }
        if (this.state.ratingMessage) {
            ratingMessage = <div className="error-message">{this.state.ratingMessage}</div>;
        }




        return (
            <div className="modalAdd">


                <div className="modalAddContent">

                    <button className="closeModalButtonAdd" onClick={this.closeAddModal}>X</button>
                    <h1>Add new</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <label htmlFor="addName">Name: </label>
                            <input type="text" id="addName"
                                placeholder="e.g. Abbey Theatre"
                                name="name" className="userInputFields" value={this.state.value} onChange={this.handleChangeName} />
                            {nameMessage}
                        </div>
                        <div>
                            <label htmlFor="addLatitude">Latitude: </label>
                            <input type="text" id="addLatitude" placeholder="e.g. 22"
                                name="latitude" className="userInputFields" value={this.state.value} onChange={this.handleChangeLatitude} />
                            {latitudeMessage}
                        </div>
                        <div>
                            <label htmlFor="addLongitude">Longitude: </label>
                            <input type="text" id="addLongitude" name="longitude" placeholder="e.g. 22"
                                className="userInputFields" value={this.state.value} onChange={this.handleChangeLongitude} />
                            {longitudeMessage}
                        </div>
                        <div>
                            <label htmlFor="addAddress">Address: </label>
                            <input type="text" id="addAddress" name="address" placeholder="e.g. Lower Abbey Street, Dublin 1."
                                className="userInputFields" value={this.state.value} onChange={this.handleChangeAddress} />
                            {addressMessage}
                        </div>
                        <div>
                            <label htmlFor="addDescription">Description: </label>

                            <textarea type="text" id="addDescription" name="description"
                                placeholder="e.g. The Abbey Theatre was founded in 1903 by W. B. Yeats and Lady Augusta Gregory..."
                                className="userInputFields" value={this.state.value} onChange={this.handleChangeDescription} />



                        </div>
                        <div>
                            <label htmlFor="addContactNumber">Contact Number: </label>
                            <input type="text" id="addContactNumber" name="contactNumber"
                                placeholder="e.g. +35318787222"
                                className="userInputFields" value={this.state.value} onChange={this.handleChangeContactNumber} />
                            {contactNumberMessage}
                        </div>
                        <div>
                            <label htmlFor="addRating">Rating: </label>
                            <input type="text" id="addRating" name="rating"
                                placeholder="e.g. 2"
                                className="userInputFields" value={this.state.value} onChange={this.handleChangeRating} />
                            {ratingMessage}
                        </div>
                        <div>
                            <label htmlFor="addFree">Free: </label>
                            <input type="checkbox" id="addFree" name="free" defaultChecked={false} value={this.state.value} onChange={this.handleChangeFree} />
                        </div>
                        <div id="tagContainer">
                            <label htmlFor="addTags">Tags: </label>
                            <div className="tag-input-container">
                                <input
                                    type="text" className="tag-input" id="addTags" name="singleTag"
                                    value={this.state.singleTag} onChange={this.handleChangeTags} />
                                <button type="button" className="tag-add-btn" onClick={this.addTag}>+</button>
                            </div>
                            <div className="tag-list">
                                {this.state.tags.map((tag, index) => (
                                    <span key={index} className="tag" onClick={this.cutTags(tag, index)}>{tag}</span>
                                ))}
                                <div>
                                    {tagsMessage}
                                </div>
                            </div>
                        </div>
                        <input type="submit" className="submitAddAttraction" value="Submit" />

                        {/* <button type="button" onClick={this.props.addNewActivity()}>Add</button> */}
                    </form>
                    {/* <button id="confirmAddButton" onClick={this.addNewActivity}>Confirm Add</button> */}
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

        //Note: in return, divs don't appear if the className is replaced with ID
        return (
            <div className="modalDelete">
                <div className="modalDeleteContent">
                    <h3>Are you sure you want to delete {attraction.name}?</h3>
                    <button id="exitButton" className="closeModalButton" onClick={this.closeDeleteModal()}> <i class="material-icons">close</i></button>

                    {/* <button onClick={this.handleDelete(attraction.poiID)}>Yes</button> */}

                    <a href="#" class="btnYes" onClick={this.handleDelete(attraction.poiID)}>
                        <span>Yes</span>
                    </a>

                    <a href="#" class="btnNo" onClick={this.closeDeleteModal()}>
                        <span>No</span>
                    </a>
                    {/* <button id="exitButton" onClick={this.closeDeleteModal()}>No</button> */}
                </div>
            </div>
        );
    }
}




















class ModalMore extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            rating: props.attraction.rating || "Unknown",
            free: props.attraction.free || "Unknown",
            tags: props.attraction.tags ? props.attraction.tags.join(", ") : "Unknown"
        };
        if (this.state.free === true) {
            this.state.free = "Yes"
        } else {
            this.state.free = "No"
        }
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

    editRating = () => {
        console.log()
    }


    render() {
        const { attraction } = this.props;  // don't delete this

        return (
            <div className="modalMore">
                <div className="modalMoreContent">
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
                        <p>Free Entry:{this.state.free}</p>
                        <img id="imageBox"></img>
                    </div>
                    <div>
                    </div>
                    <button id="exitButton" className="closeModalButtonAdd" onClick={this.closeMoreModal()}> <i class="material-icons">close</i></button>

                </div>
            </div>
        );
    }
}










ReactDOM.render(<DublinAttractionsForm />, document.getElementById("listContainer"));