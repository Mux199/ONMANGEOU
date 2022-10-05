import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            course: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitCourse = this.handleSubmitCourse.bind(this);
    }

    handleSubmitCourse(event) {
        alert("Your selected value is: " + this.state.course);
        event.preventDefault();
    }

    handleChange = event => {
        this.setState({ value: event.target.value });
    };

    handleChangeCourse = event => {
        this.setState({ course: event.target.value });
    };

    getUnique(arr, comp) {
        const unique = arr
            //store the comparison values in array
            .map(e => e[comp])

            // store the keys of the unique objects
            .map((e, i, final) => final.indexOf(e) === i && i)

            // eliminate the dead keys & store unique objects
            .filter(e => arr[e])

            .map(e => arr[e]);

        return unique;
    }

    componentDidMount() {
        const courses = require("./courses.json");
        this.setState({ courses: courses });
    }

    render() {
        const uniqueCourse = this.getUnique(this.state.courses, "tag");

        const courses = this.state.courses;
        const course = this.state.course;

        const filterDropdown = courses.filter(function(result) {
            return result.tag === course;
        });

        return (
            <div>
                <form onSubmit={this.handleSubmitCourse}>
                    <br />
                    <br />
                    <label>
                        Looping through Courses tag from Json File
                        <select
                            value={this.state.course}
                            onChange={this.handleChangeCourse}
                        >
                            {uniqueCourse.map(course => (
                                <option key={course.id} value={course.tag}>
                                    {course.tag}
                                </option>
                            ))}
                        </select>
                    </label>
                    <input type="submit" value="Submit" />
                    <div>
                        {filterDropdown.map(course => (
                            <div key={course.id} style={{ margin: "10px" }}>
                                {course.course}
                                <br />
                            </div>
                        ))}
                    </div>
                </form>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector("#root"));