import React, { Component } from "react";
import Axios from "axios";
import { API_URL } from "./API";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap";
import "./App.css";

class App extends Component {
  state = {
    data: [],
    modalAdd: false,
    modalEdit: false,
    AddData: {
      name: "",
    },
    EditData: {
      name: "",
    },
    id: 0,
  };

  componentDidMount() {
    Axios.get(`${API_URL}/insurance`)
      .then((res) => {
        this.setState({
          data: res.data,
        });
        console.log(this.state.data, "18");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  onAddDataClick = () => {
    const { name } = this.state.AddData;
    let data = { name: name };
    if (name) {
      Axios.post(`${API_URL}/insurance`, data)
        .then((res) => {
          this.setState({
            data: res.data,
            AddData: {
              name: "",
            },
            modalAdd: false,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("data harus diisi");
    }
  };

  onEditClick = (index) => {
    let EditData = this.state.EditData;
    let data = this.state.data[index];
    EditData = {
      ...EditData,
      id: data.id,
      name: data.name,
    };
    this.setState({ EditData: EditData, modalEdit: true });
  };

  onEditDataClick = () => {
    const { name, id } = this.state.EditData;
    let data = { name: name, id: id };
    if (name) {
      Axios.put(`${API_URL}/insurance/${data.id}`, data)
        .then((res) => {
          this.setState({
            data: res.data,
            EditData: {
              name: "",
            },
            modalEdit: false,
          });
          alert("sukses");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("input harus diiisi");
    }
  };

  onDeleteClick = (index) => {
    let id = this.state.id;
    id = this.state.data[index].id;
    // let data = { id: id };
    console.log(id);
    Axios.delete(`${API_URL}/insurance`, {
      params: { id: id },
    })
      .then((res) => {
        this.setState({
          data: res.data,
          id: 0,
        });
        alert("berhasil dihapus");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  toggleAdd = () => {
    this.setState({ modalAdd: !this.state.modalAdd });
  };

  toggleEdit = () => {
    this.setState({ modalEdit: !this.state.modalEdit });
  };

  onAddDataChange = (e) => {
    let AddData = this.state.AddData;
    AddData[e.target.name] = e.target.value;
    this.setState({ AddData: AddData });
  };

  onEditDataChange = (e) => {
    let EditData = this.state.EditData;
    EditData[e.target.name] = e.target.value;
    this.setState({ EditData: EditData });
  };

  renderData = () => {
    return this.state.data.map((val, index) => {
      return (
        <tr key={index}>
          <th>{index + 1}</th>
          <th style={{ color: "green" }}>{val.name}</th>
          <td>{val.created}</td>
          <td>{val.updated}</td>
          <td>
            <Button
              onClick={() => this.onDeleteClick(index)}
              color="danger"
              style={{ marginRight: "10px" }}
            >
              Delete
            </Button>
            <Button onClick={() => this.onEditClick(index)}>Update</Button>
          </td>
        </tr>
      );
    });
  };

  render() {
    return (
      <div className="jumbotron">
        {/* Modal Add */}
        <Modal isOpen={this.state.modalAdd} toggle={this.toggleAdd}>
          <ModalHeader className="color" toggle={this.toggleAdd}>
            Add Data
          </ModalHeader>
          <ModalBody>
            <input
              className="form-control my-1"
              type="text"
              name="name"
              value={this.state.AddData.name}
              placeholder="Name"
              onChange={this.onAddDataChange}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.onAddDataClick}>Add Data</Button>
          </ModalFooter>
        </Modal>
        {/* Modal Update */}
        <Modal isOpen={this.state.modalEdit} toggle={this.toggleEdit}>
          <ModalHeader className="color" toggle={this.toggleEdit}>
            Add Data
          </ModalHeader>
          <ModalBody>
            <input
              className="form-control my-1"
              type="text"
              name="name"
              value={this.state.EditData.name}
              placeholder="Name"
              onChange={this.onEditDataChange}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.onEditDataClick}>Update</Button>
          </ModalFooter>
        </Modal>
        <div style={{ marginBottom: "10px" }}>
          <Button
            color="success"
            onClick={() => this.setState({ modalAdd: true })}
          >
            Add Data
          </Button>
        </div>
        <Table hover bordered>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Created</th>
              <th>Updated</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.renderData()}</tbody>
        </Table>
      </div>
    );
  }
}

export default App;
