import React from "react";
import {
  Card,
  Row,
  Col,
  Table,
  Label,
  Input,
  Container,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardHeader,
  CardBody,
  CardTitle,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

import { Trash2, Edit } from "react-feather";
import axiosConfig from "../../../../axiosConfig";
import { FaBeer } from "react-icons/fa";
import { history } from "../../../../history";
import { Route } from "react-router-dom";
import imagecal from "../../../../assets/img/svg/imagecal.png";
import "../../../../layouts/assets/scss/pages/users.scss";
import ModalBasic from "./ModalBasic";
import EditProductModal from "./EditProductModal";

class ViewAll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      drivername: [],
    };
  }
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  componentDidMount() {
    let { id } = this.props.match.params;
    axiosConfig
      .get(`/admin/viewone_order/${id}`)
      .then((response) => {
        console.log(response.data.data);
        this.setState({ data: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    axiosConfig
      .get(`/admin/getall_drive`)
      .then((response) => {
        // let drivername = response.data.data;
        console.log("DriverList", response.data.data);
        this.setState({ drivername: response.data.data });
      })
      .catch((error) => {
        console.log("Err145", error);
      });
  }
  render() {
    return (
      <React.Fragment>
        <Container>
          <Row>
            <Col sm="9">
              <Card>
                <Row className="m-2">
                  <Col sm="6">
                    <h4>
                      <b>Order ID</b>
                      <span> {this.state.data.orderId}</span>
                    </h4>
                    <p className="my-1">
                      <img src={imagecal} alt="cl" width={15} /> 05 Jan 2023
                      01:33:44
                    </p>
                    <p>Total KM: 20KM</p>
                    <p>Total Time :27MIN</p>
                    <p>
                      Driver Will Get (RS) :<b>40</b> Rs
                    </p>
                  </Col>
                  <Col sm="6" style={{ textAlign: "right" }}>
                    <Route
                      render={() => (
                        <Button
                          className=""
                          color="primary"
                          onClick={() => print()}
                        >
                          Hub Invoice
                        </Button>
                      )}
                    />

                    <p className="my-1">
                      Status:
                      <span
                        style={{
                          color: "#ff9f43",
                        }}
                      >
                        Pending
                      </span>
                    </p>
                    <p className="text-capitalize">
                      Payment Method :<b>Cash On Delivery</b>
                    </p>
                    {/* <p>Reference Code :#RC25</p> */}

                    <p>
                      Payment Status:
                      <span
                        style={{
                          color: "#ff9f43",
                        }}
                      >
                        Paid
                      </span>
                    </p>
                  </Col>
                </Row>
                <div
                  style={{
                    justifyContent: "right",
                    marginTop: "0px",
                    marginBottom: "0px",
                  }}
                  className="d-flex"
                >
                  <Row className="m-2 addorder">
                    {/* <Route
                      render={({ history }) => (
                        <Button
                          // className=" float-right"
                          color="primary"
                          onClick={() =>
                            history.push("/app/freshlist/order/addexorder")
                          }
                        >
                          Add Product
                        </Button>
                      )}
                    /> */}
                    <ModalBasic />
                  </Row>
                </div>
                {/* <ModalBasic /> */}
                <Container>
                  <Row className="">
                    <Table className="table-responsive">
                      <thead>
                        <tr>
                          <th>SN</th>
                          <th>Product</th>
                          {/* <th>Model</th> */}
                          <th>Rack Number</th>
                          <th>Unit Price</th>
                          <th>Tax</th>
                          <th>Total Quantity</th>
                          <th>Total Price</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>Onion</td>
                          <td>29</td>
                          <td>Rs27</td>
                          <td>Rs2</td>
                          <td>18</td>
                          <td>Rs2800</td>
                          <td
                            style={{
                              color: "#ff9f43",
                            }}
                          >
                            Pending
                          </td>

                          {/* <ModalBasic /> */}

                          <td className="">
                            {/* <Route
                              render={({ history }) => (
                                <Edit
                                  className="mr-50"
                                  size="25px"
                                  color="blue"
                                  onClick={() =>
                                    history.push(
                                      `/app/freshlist/order/editOrder/${params.data._id}`
                                    )
                                  }
                                  // onClick={() =>
                                  //   history.push(
                                  //     `/app/freshlist/order/editOrder/${params.data._id}`
                                  //   )
                                  // }
                                />
                              )}
                            /> */}

                            <EditProductModal />
                          </td>
                          <td>
                            <span>
                              <Route
                                render={() => (
                                  <Trash2
                                    className=""
                                    size="25px"
                                    color="red"
                                    // onClick={() => {
                                    //   let selectedData =
                                    //     this.gridApi.getSelectedRows();
                                    //   this.runthisfunction(params.data._id);
                                    //   this.gridApi.updateRowData({
                                    //     remove: selectedData,
                                    //   });
                                    // }}
                                  />
                                )}
                              />
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>T-shirt</td>
                          <td>2</td>
                          <td>Rs70</td>
                          <td>Rs1</td>
                          <td>19</td>
                          <td>Rs3500</td>
                          <td
                            style={{
                              color: "#ff9f43",
                            }}
                          >
                            Pending
                          </td>
                          <td className="">
                            {/* <Route
                              render={({ history }) => (
                                <Edit
                                  className="mr-50"
                                  size="25px"
                                  color="blue"
                                  onClick={() =>
                                    history.push(
                                      `/app/freshlist/order/editOrder/${params.data._id}`
                                    )
                                  }
                                  // onClick={() =>
                                  //   history.push(
                                  //     `/app/freshlist/order/editOrder/${params.data._id}`
                                  //   )
                                  // }
                                />
                              )}
                            /> */}

                            <EditProductModal className="" />
                          </td>
                          <td>
                            <span>
                              <Route
                                render={() => (
                                  <Trash2
                                    className=""
                                    size="25px"
                                    color="red"
                                    // onClick={() => {
                                    //   let selectedData =
                                    //     this.gridApi.getSelectedRows();
                                    //   this.runthisfunction(params.data._id);
                                    //   this.gridApi.updateRowData({
                                    //     remove: selectedData,
                                    //   });
                                    // }}
                                  />
                                )}
                              />
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Row>
                </Container>
                <Container>
                  <Row>
                    <Col sm="6"></Col>
                    <Col sm="6">
                      <ul>
                        <li
                          className="billingdetails mb-1 mt-1"
                          style={{ listStyle: "none" }}
                        >
                          Sub Total:{" "}
                          <span className="float-right"> Rs6300</span>
                        </li>
                        <li
                          className="billingdetails mb-1 mt-1"
                          style={{ listStyle: "none" }}
                        >
                          Shipping: <span className="float-right"> Rs500</span>
                        </li>
                        <li
                          className="billingdetails mb-1 mt-1"
                          style={{ listStyle: "none" }}
                        >
                          Coupon Discount:
                          <span className="float-right">-Rs0.0</span>
                        </li>
                        <li
                          className="billingdetails mb-1"
                          style={{ listStyle: "none" }}
                        >
                          Total: <span className="float-right"> Rs6800</span>
                        </li>
                      </ul>
                    </Col>
                  </Row>
                </Container>
              </Card>
            </Col>
            <Col lg="3" sm="4">
              <Card>
                <Row className="m-2">
                  <h5 className="fw-bold">Order & Shipping Info</h5>
                  <Col sm="12" className="my-1">
                    <Label>Order Status</Label>
                    <Input
                      required
                      type="select"
                      name="status"
                      placeholder=""
                      value={this.state.status}
                      onChange={this.changeHandler}
                    >
                      {/* <option value="select">--Select--</option> */}
                      {/* <option value="All">All</option> */}
                      <option value="Painding">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="in_process">In Process</option>
                      <option value="out_for_delivery">Out for Delivery</option>
                      <option value="delivered">Delivered</option>
                      <option value="returned">Returned</option>
                      <option value="failed_to_deliver">
                        Failed to Deliver
                      </option>
                    </Input>
                  </Col>
                  <Col sm="12" className="my-1">
                    <Label>Payment Status</Label>
                    <Input
                      required
                      type="select"
                      name="bannertype"
                      placeholder=""
                      value={this.state.bannertype}
                      onChange={this.changeHandler}
                    >
                      <option value="Paid">Paid</option>
                      <option value="UnPaid">UnPaid</option>
                    </Input>
                  </Col>

                  <Col sm="12" className="my-1">
                    <Label>Shipping Type(Category Wise) </Label>
                    <Input
                      required
                      type="select"
                      name="bannertype"
                      placeholder=""
                      value={this.state.bannertype}
                      onChange={this.changeHandler}
                    >
                      <option value="driver">Choose Driver Type</option>
                      <option value="self">By Self Driver </option>
                    </Input>
                  </Col>
                  <Col sm="12" className="my-1">
                    <Label>Choose Driver </Label>
                    <Input
                      required
                      type="select"
                      name="driver"
                      placeholder="Driver Name"
                      value={this.state.driver}
                      onChange={this.changeHandler}
                    >
                      {this.state.drivername?.map((driname) => (
                        <option value={driname?.firstname}>
                          {driname?.firstname}
                        </option>
                      ))}
                    </Input>
                  </Col>

                  {/* <Col sm="12" className="my-1">
                    <Label>Driver Will Get (RS) </Label>
                    <Input
                      required
                      type="number"
                      name="rupees"
                      placeholder=""
                      value="40"
                      onChange={this.changeHandler}
                    />
                  </Col> */}
                  <Col sm="12" className="">
                    <Label>Expected Delivery Date </Label>
                    <Input
                      required
                      type="date"
                      name="bannertype"
                      placeholder=""
                      value=""
                      onChange={this.changeHandler}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          <Row sm="3">
            <Col sm="3" lg="3">
              <Card>
                <Label className="mx-3 mt-2 mb-2">Customer Information</Label>
                <Row className="mx-1">
                  <h6>
                    <b>Name :</b> <b>Rahul Sharma</b>
                  </h6>
                </Row>
                <Row className="mx-1">
                  <span>Order</span> <span>11</span>Orders
                </Row>
                <Row className="mx-1">
                  <span>id</span>: <span>#100210</span>
                </Row>
                <Row className="mx-1 mb-2">
                  {" "}
                  <span>mail</span> :<span>customer@customer.com</span>
                </Row>
              </Card>
            </Col>

            <Col sm="3" lg="3">
              <Card>
                <Row className="m-2">
                  <h5 className="fw-bold mx-2">Shipping Address</h5>
                  <Col sm="12" className="my-1">
                    <Label>Name: 201 Near South Mumbai</Label>
                    <p>Contact: +918884152574</p>
                    <p>City: Mumbai</p>
                    <p>Zip code: 111</p>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col sm="3" lg="3">
              <Card>
                <Row className="m-2">
                  <h5 className="fw-bold mx-2">Billing Address</h5>
                  <Col sm="12" className="my-1">
                    <Label>Name: 201 Near South Mumbai</Label>
                    <p>Contact: +918884152574</p>
                    <p>City: Mumbai</p>
                    <p>Zip code 111</p>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col sm="3" lg="3">
              <Card>
                <Row className="m-2">
                  <h5 className="fw-bold mx-2">Hub Information</h5>
                  <Col sm="12" className="my-1">
                    <Label>Name: xyz</Label>
                    <p>Mobile: +91147852652</p>
                    <p>Email: hub@gmail.com</p>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}
export default ViewAll;
