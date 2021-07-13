import React, {Component} from "react";
import { API_URL } from "../../../core/url";
import { END_POINT } from "../../interns/";
import "./index.css";


class AddModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
        }
    }

    componentDidMount() {
        if (this.props.intern) {
            this.setState({
                firstName: this.props.intern.firstName,
                lastName: this.props.intern.lastName,
                email: this.props.intern.email,
            })
        }
    }
    

    handleChangeInput = evt => {
        const {name, value} = evt.target;
        this.setState({
            [name]: value,
        })
    }

    handleSave = evt => {
        evt.preventDefault();

        if (this.props.intern) {
            fetch(`${API_URL}/${END_POINT.prefix}/${this.props.intern.id}`, { 
                method: "PUT",
                body: JSON.stringify(this.state),
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(() => {
                this.props.handleIsOpenAddModal();
                this.props.fetchInterns();
            });
        } else {
            fetch(`${API_URL}/${END_POINT.prefix}`, { 
                method: "POST",
                body: JSON.stringify(this.state),
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(() => {
                this.props.handleIsOpenAddModal();
                this.props.fetchInterns();
            });
        }
    }

    render() {


        const {handleIsOpenAddModal} = this.props;
        return (
            <div className="modal-container">
                <div className="modal-content">
                    <span className="close" onClick={handleIsOpenAddModal}>X</span>
                    <form onSubmit={this.handleSave}>
                        <h2>Add Modal</h2>
                        <input 
                            type = "text"
                            name = "firstName"
                            placeholder= "First Name"
                            onChange = {this.handleChangeInput}
                            value={this.state.firstName}
                        />

                        <input 
                            type = "text"
                            name = "lastName"
                            placeholder= "Last Name"  
                            onChange = {this.handleChangeInput}    
                            value={this.state.lastName}      
                        />

                        <input 
                            type = "email"
                            name = "email"
                            placeholder= "Email"
                            onChange = {this.handleChangeInput}
                            value={this.state.email}
                        />

                        <button>Save</button>
                    </form>
                </div>
                
            </div>
        )
    }
}

export default AddModal;