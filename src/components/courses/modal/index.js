import React, { Component } from "react";
import "./index.css";
import {API_URL} from "../../../core/url";
import { END_POINT } from "../../interns";


class Modal extends Component {
    constructor(props) {
      super(props);
      this.state = {
        courses: [],
        checkedCourses: [],
      };
    }

    componentDidMount () {
      this.setState ({
          isLoading: true,
      });

      fetch (`${API_URL}/${END_POINT.COURSES}`)
      .then(resp => resp.json())
      .then(data => {
          this.setState ({
              courses: data,
              isLoading: false,
          })
      })
    }

    handleCheck = id => {
      let newCheckedCourses = this.state.checkedCourses;
      if (this.state.checkedCourses.indexOf(id) === -1) {
        newCheckedCourses.push(id);
      } else {
        newCheckedCourses = newCheckedCourses.filter(i => i !== id);
      }
      this.setState({
        checkedCourses: newCheckedCourses,
      })
    }
  
    handleChangeCourse = (evt) => {
      const { name, value } = evt.target;
      this.setState({
        [name]: value,
      });
    };
  
    render() {
        const {handleIsOpenCoursesModal} = this.props;
        return (
          <div className="modal-container">
            <div className="modal-content">
                <span className="close" onClick={handleIsOpenCoursesModal}>
                X
                </span>
                <h2>Courses</h2>
                <table width="100%" border = "1">
                  <thead>
                    <tr>
                      <th>V</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Title</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.courses.map(course => (
                        <tr key={course.id}>
                            <td><input type="checkbox" onClick={() => this.handleCheck(course.id)}/></td>
                            <td>{course.firstName}</td>
                            <td>{course.lastName}</td>
                            <td>{course.title}</td>
                            <td>{`${course.price} $`}</td>
                        </tr>
                    ))}
                  </tbody>
                </table>
                
                <div className="footer">
                    <p>You add {this.state.checkedCourses.length}/{this.state.courses.length} courses</p>
                    <button onClick={handleIsOpenCoursesModal}>Done</button>
                </div>
    
            </div>
          </div>
        );
      }
    }
    
    export default Modal;