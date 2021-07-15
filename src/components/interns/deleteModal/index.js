import React, {Component} from "react";
import { API_URL } from "../../../core/url";
import { END_POINT } from "../../interns/";
import "./index.css";

class DeleteModal extends Component {
    onDelete = () => {
        fetch(`${API_URL}/${END_POINT.prefix}/${this.props.intern.id}`, { 
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        }).then(() => {
            this.props.handleDeleteModal();
            this.props.fetchInterns();
        });
    }

    render () {
        return (
            <div className="modal-container">
                <div className="modal-content">
                    <h2>{this.props.title}</h2>
                    <span className="close" onClick={() => this.props.handleDeleteModal()}>X</span>
                    <p>Are You sure delete {this.props.intern.firstName} ?</p>
                    <div className="btn-container">
                        <button onClick={this.onDelete}>Delete</button>
                        <button onClick={() => this.props.handleDeleteModal()}>Cancel</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default DeleteModal;