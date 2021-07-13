import React, {Component} from "react";
import {API_URL} from "../../core/url";
import AddModal from "./addModal";
import DeleteModal from "./deleteModal";

export const END_POINT = {
    prefix : 'interns',
}

class Interns extends Component {
    constructor () {
        super();
        this.state = {
            interns: [],
            isLoading: false,
            error: null,
            isAddModal: false,
            activeInternID: null,
            deleteInternId: null,
        }
        this.handleIsOpenAddModal = this.handleIsOpenAddModal.bind(this);
        this.handleDeleteModal = this.handleDeleteModal.bind(this);
        this.fetchInterns = this.fetchInterns.bind(this);
    };

    componentDidMount () {
        this.setState ({
            isLoading: true,
        });

        this.fetchInterns();
    }

    fetchInterns () {
        fetch (`${API_URL}/${END_POINT.prefix}`)
        .then(resp => resp.json())
        .then(data => {
            this.setState ({
                interns: data,
                isLoading: false,
            })
        })
    }

    handleIsOpenAddModal (id) {
        this.setState({
            isAddModal: !this.state.isAddModal,
            activeInternID: id ? id : null,
        })
    }

    handleDeleteModal (id) {
        this.setState({
            deleteInternId: id ? id : null,
        })
    }

    render () {
        const {interns, isAddModal} = this.state;
        return (
            <div>
                <button onClick={this.handleIsOpenAddModal}>Add Intern</button>
                <hr />
                {isAddModal && (
                    <AddModal
                        handleIsOpenAddModal={this.handleIsOpenAddModal}
                        intern={interns.find(intern => intern.id === this.state.activeInternID)}
                        fetchInterns={this.fetchInterns}
                    />
                )}
                {!!this.state.deleteInternId && (
                    <DeleteModal
                        handleDeleteModal={this.handleDeleteModal}
                        intern={interns.find(intern => intern.id === this.state.deleteInternId)}
                        fetchInterns={this.fetchInterns}
                    />
                )}
                <table width="100%" border = "1">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            interns.map(intern => (
                                <tr key={intern.id}>
                                    <td>{intern.firstName}</td>
                                    <td>{intern.lastName}</td>
                                    <td>{intern.email}</td>
                                    <th>
                                        <button onClick={() => this.handleIsOpenAddModal(intern.id)}>
                                            Edit
                                        </button>
                                        <button onClick={() => this.handleDeleteModal(intern.id)}>
                                            Delete
                                        </button>
                                    </th>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Interns;