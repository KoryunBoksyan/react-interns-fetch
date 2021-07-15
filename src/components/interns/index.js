import React, {Component} from "react";
import {API_URL} from "../../core/url";
import AddModal from "./addModal";
import DeleteModal from "./deleteModal";
import Modal from "../courses/modal";


export const END_POINT = {
    prefix : 'interns',
    COURSES: "courses",
}

class Interns extends Component {
    constructor () {
        super();
        this.state = {
            interns: [],
            courses: [],
            isLoading: false,
            error: null,
            isAddModal: false,
            isModal: false,
            activeInternID: null,
            deleteInternId: null,
            selectedID: null,
        }
        this.handleIsOpenAddModal = this.handleIsOpenAddModal.bind(this);
        this.handleDeleteModal = this.handleDeleteModal.bind(this);
        this.handleIsOpenCoursesModal = this.handleIsOpenCoursesModal.bind(this);
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

    handleIsOpenAddModal (id = null) {
        this.setState({
            isAddModal: !this.state.isAddModal,
            activeInternID: id,
        })
    }

    handleDeleteModal (id = null) {
        this.setState({
            deleteInternId: id,
        })
    }

    handleIsOpenCoursesModal (id = null) {
        this.setState({
            isModal: !this.state.isModal,
            selectedID: id,
        })
    }

    render () {
        const {interns, isAddModal, isModal, courses} = this.state;
        return (
            <div>
                <button onClick={this.handleIsOpenAddModal}>Add Intern</button>
                <button onClick={this.handleIsOpenCoursesModal} className="courses_btn">Courses</button>
                <hr />
                {isAddModal && (
                    <AddModal
                        title="ADD_MODAL"
                        handleIsOpenAddModal={this.handleIsOpenAddModal}
                        intern={interns.find(intern => intern.id === this.state.activeInternID)}
                        fetchInterns={this.fetchInterns}
                    />
                )}


                {isModal && (
                    <Modal
                        handleIsOpenCoursesModal={this.handleIsOpenCoursesModal}
                        course={courses.find(course => course.id === this.state.selectedID)}
                    />
                )}

                

                {!!this.state.deleteInternId && (
                    <DeleteModal
                        title="DELETE_MODAL"
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