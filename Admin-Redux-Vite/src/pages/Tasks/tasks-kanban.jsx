import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container } from "reactstrap";
import { withRouter } from "react-router-dom";
import { isEmpty, map } from "lodash";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";

//Import Task Cards
import UncontrolledBoard from "./UncontrolledBoard";

import "/src/assets/scss/tasks.scss";
import { getTasks } from "/src/store/tasks/actions";

class TasksKanban extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { onGetTasks } = this.props;
    onGetTasks();
  }

  render() {
    //meta title
    document.title =
      "Kanban Board | Skote - Vite React Admin & Dashboard Template";

    const { tasks } = this.props;
    const data = map(tasks, task => ({ ...task, cards: task.tasks }));
    data.length = Math.min(data.length, 3);

    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumbs */}
            <Breadcrumbs title="Tasks" breadcrumbItem="Kanban Board" />
            {!isEmpty(data) && (
              <UncontrolledBoard board={{ columns: data }} content={tasks} />
            )}
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

TasksKanban.propTypes = {
  tasks: PropTypes.array,
  onGetTasks: PropTypes.func,
};

const mapStateToProps = ({ tasks }) => ({
  tasks: tasks.tasks,
});

const mapDispatchToProps = dispatch => ({
  onGetTasks: () => dispatch(getTasks()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TasksKanban));
