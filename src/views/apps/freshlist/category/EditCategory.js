import React, { Component } from "react";
import {
  Card,
  CardBody,
  Col,
  Form,
  Row,
  Input,
  Label,
  Button,
  FormGroup,
  CustomInput,
} from "reactstrap";
import { history } from "../../../../history";
import axiosConfig from "../../../../axiosConfig";
import { Route } from "react-router-dom";
import swal from "sweetalert";
import { CloudLightning } from "react-feather";

export class EditCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category_name: "",
      type: "",
      feature: "",
      status: "",
      selectedFile1: null,
      selectedName1: "",
      selectedFile2: null,
      selectedName2: "",
      selectedFile3: null,
      selectedName3: "",
      selectedFile4: null,
      selectedName4: "",
    };
  }

  onChangeHandler1 = (event) => {
    this.setState({ selectedFile1: event.target.files[0] });
    this.setState({ selectedName1: event.target.files[0].name });
    console.log(event.target.files[0]);
  };
  onChangeHandler2 = (event) => {
    this.setState({ selectedFile2: event.target.files[0] });
    this.setState({ selectedName2: event.target.files[0].name });
    console.log(event.target.files[0]);
  };
  onChangeHandler3 = (event) => {
    this.setState({ selectedFile3: event.target.files[0] });
    this.setState({ selectedName3: event.target.files[0].name });
    console.log(event.target.files[0]);
  };
  onChangeHandler4 = (event) => {
    this.setState({ selectedFile4: event.target.files[0] });
    this.setState({ selectedName4: event.target.files[0].name });
    console.log(event.target.files[0]);
  };

  changeHandler1 = (e) => {
    this.setState({ status: e.target.value });
  };
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    let { id } = this.props.match.params;
    console.log(id);
    let pageparmission = JSON.parse(localStorage.getItem("userData"));
    const data = new FormData();
    data.append("user_id", pageparmission?.Userinfo?.id);
    data.append("role", pageparmission?.Userinfo?.role);
    data.append("cat_id", id);
    axiosConfig
      .post(`/getcategoryview`, data)
      .then((response) => {
        console.log(response.data.data?.category);
        this.setState({
          data: response.data.data?.category,
        });
        this.setState({
          category_name: response.data.data?.category?.category_name,
          status: response.data.data?.category?.status,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  submitHandler = (e) => {
    e.preventDefault();
    let { id } = this.props.match.params;
    let pageparmission = JSON.parse(localStorage.getItem("userData"));

    const data = new FormData();
    data.append("user_id", pageparmission?.Userinfo?.id);
    data.append("role", pageparmission?.Userinfo?.role);
    data.append("cat_id", id);
    data.append("category_name", this.state.category_name);
    data.append("status", this.state.status);

    // for (var value of data.values()) {
    //   console.log(value);
    // }

    axiosConfig
      .post(`/categoryeditsubmit`, data)
      .then((response) => {
        // console.log(response?.data.success);
        if (response?.data.success) {
          swal("Success!", "You Data iS been Submitted", "success");
          this.props.history.push("/app/freshlist/category/categoryList");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <div>
        <Card>
          <Row className="m-2">
            <Col>
              <h1 col-sm-6 className="float-left">
                Edit category
              </h1>
            </Col>
            <Col>
              <Route
                render={({ history }) => (
                  <Button
                    className=" btn btn-danger float-right"
                    onClick={() =>
                      history.push("/app/freshlist/category/categoryList")
                    }
                  >
                    Back
                  </Button>
                )}
              />
            </Col>
          </Row>
          <CardBody>
            <Form className="m-1" onSubmit={this.submitHandler}>
              <Row className="mb-2">
                <Col lg="6" md="6">
                  <FormGroup>
                    <Label>Category Name</Label>
                    <Input
                      type="text"
                      placeholder="Category Name"
                      name="category_name"
                      value={this.state.category_name}
                      onChange={this.changeHandler}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6" md="6" sm="6" className="mb-2 mt-1">
                  <Label className="mb-0 mx-1">Status</Label>
                  <div
                    className="form-label-group"
                    onChange={this.changeHandler1}
                  >
                    <input
                      checked={this.state.status === "Active" ? true : false}
                      style={{ marginRight: "3px" }}
                      type="radio"
                      name="status"
                      value="Active"
                    />
                    <span style={{ marginRight: "20px" }}>Active</span>

                    <input
                      checked={this.state.status == "Deactive" ? true : false}
                      style={{ marginRight: "3px" }}
                      type="radio"
                      name="status"
                      value="Deactive"
                    />
                    <span style={{ marginRight: "3px" }}>Deactive</span>
                  </div>
                </Col>
                {/* <Col lg="6" md="6" className="mb-2">
                  <Label>Type</Label>
                  <CustomInput
                    type="select"
                    placeholder="Select Type"
                    name="type"
                    value={this.state.type}
                    onChange={this.changeHandler}
                  >
                    <option>---Select---</option>
                    <option value="veg">Veg</option>
                    <option value="nonveg">Non-Veg</option>
                    <option value="egg">Egg only</option>
                  </CustomInput>
                </Col> */}

                {/* <Col lg="6" md="6">
                  <FormGroup>
                    <Label>Category Image </Label>
                    <CustomInput type="file" onChange={this.onChangeHandler1} />
                  </FormGroup>
                </Col> */}

                {/* <Col lg="6" md="6">
                  <FormGroup>
                    <Label>Thumbnail</Label>
                    <CustomInput type="file" onChange={this.onChangeHandler2} />
                  </FormGroup>
                </Col> */}

                {/* <Col lg="6" md="6">
                  <FormGroup>
                    <Label>Web Banner </Label>
                    <CustomInput type="file" onChange={this.onChangeHandler3} />
                  </FormGroup>
                </Col>
                <Col lg="6" md="6">
                  <FormGroup>
                    <Label>App Banner</Label>
                    <CustomInput type="file" onChange={this.onChangeHandler4} />
                  </FormGroup>
                </Col>

                <Col lg="6" md="6" className="mb-2">
                  <Label>Feature</Label>
                  <CustomInput
                    type="select"
                    placeholder="Select Type"
                    name="feature"
                    value={this.state.feature}
                    onChange={this.changeHandler}
                  >
                    <option>Select Feature</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </CustomInput>
                </Col>

                <Col lg="6" md="6" sm="6" className="mb-2 mt-1">
                  <Label className="mb-0">Status</Label>
                  <div
                    className="form-label-group"
                    onChange={this.handleChange}
                  >
                    <input
                      style={{ marginRight: "3px" }}
                      type="radio"
                      name="status"
                      value="Active"
                    />
                    <span style={{ marginRight: "20px" }}>Active</span>

                    <input
                      style={{ marginRight: "3px" }}
                      type="radio"
                      name="status"
                      value="Deactive"
                    />
                    <span style={{ marginRight: "3px" }}>Deactive</span>
                  </div>
                </Col> */}
              </Row>

              <Row>
                <Button.Ripple
                  color="primary"
                  type="submit"
                  className="mr-1 mb-1"
                >
                  Update
                </Button.Ripple>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}
export default EditCategory;
