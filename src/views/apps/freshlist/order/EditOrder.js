import React from "react";
import { Tabs, Tab } from "react-bootstrap-tabs";
import { Container } from "reactstrap";
import CustomerDetails from "./EditOrder/CustomerDetails";
import Products from "./EditOrder/Products";
import PaymentDetails from "./EditOrder/PaymentDetails";
import ShippingDetails from "./EditOrder/ShippingDetails";
import Totals from "./EditOrder/Totals";
function EditOrder() {
  return (
    <div>
      <Container>
        <Tabs onSelect={(index, label) => console.log(label + " selected")}>
          <Tab label="Customer Details">
            <CustomerDetails />
          </Tab>
          <Tab label="Products">
            <Products />
          </Tab>
          <Tab label="Payment Details">
            <PaymentDetails />
          </Tab>
          <Tab label="Shipping Details">
            <ShippingDetails />
          </Tab>
          <Tab label="Totals">
            <Totals />
          </Tab>
        </Tabs>
        <hr />
      </Container>
    </div>
  );
}

export default EditOrder;

// import React, { Component } from "react";
// import {
//   Card,
//   CardBody,
//   Col,
//   Form,
//   Row,
//   Input,
//   Label,
//   Table,
//   Button,
//   FormGroup,
//   CustomInput,
// } from "reactstrap";
// import { Route } from "react-router-dom";
// import { history } from "../../../../history";
// import axiosConfig from "../../../../axiosConfig";

// export class EditOrder extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       order_zone: "",
//       phone_no: "",
//       delivery_add: "",
//       email: "",
//       delivery_slot: "",
//       time_slot: "",
//       assing_drive: "",
//       status: "",
//       name: "",
//       orderId: "",
//       // product: "",
//       // attribute: "",
//       // quantity: "",
//       // orderd_from: "",
//       // billing_add: "",
//       // order_date: "",
//       // items: "",
//       // data: "",
//     };
//     this.handleChange = this.handleChange.bind(this);
//   }
//   handleChange(e) {
//     this.setState({ [e.target.name]: e.target.value });
//   }

//   changeHandler = (e) => {
//     this.setState({ [e.target.name]: e.target.value });
//   };

//   submitHandler = (e) => {
//     e.preventDefault();
//     console.log(this.state.email);
//     let { id } = this.props.match.params;
//     console.log(id);
//     axiosConfig
//       .post(`/admin/edit_order/${id}`, this.state)
//       .then((response) => {
//         console.log(response);
//         this.props.history.push("/app/freshlist/order/all");
//       })
//       .catch((error) => {
//         console.log(error.response.data);
//       });
//   };

//   componentDidMount() {
//     console.log(this.props.match.params);
//     let { id } = this.props.match.params;

//     axiosConfig
//       .get(`/admin/viewone_order/${id}`)
//       .then((response) => {
//         console.log("viewdata", response.data.data);
//         this.setState({
//           email: response.data.data.email,
//           phone_no: response.data.data.phone_no,
//           order_zone: response.data.data.order_zone,
//           orderId: response.data.data.orderId,
//           delivery_add: response.data.data.delivery_add,
//           delivery_slot: response.data.data.delivery_slot,
//           time_slot: response.data.data.time_slot,
//           name: response.data.data.name,
//           status: response.data.data.status,
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }
//   render() {
//     return (
//       <div>
//         <Card>
//           <Row className="m-2">
//             <Col>
//               <h1 col-sm-6 className="float-left">
//                 Edit Order
//               </h1>
//             </Col>
//             <Col>
//               <Route
//                 render={({ history }) => (
//                   <Button
//                     className=" btn btn-danger float-right"
//                     onClick={() => history.push("/app/freshlist/order/all")}
//                   >
//                     Back
//                   </Button>
//                 )}
//               />
//             </Col>
//           </Row>
//           <CardBody>
//             <Form className="m-1" onSubmit={this.submitHandler}>
//               <Row className="mb-2">
//                 <Col lg="6" md="6">
//                   <FormGroup>
//                     <Label>Order ID</Label>
//                     <Input
//                       type="text"
//                       disabled={true}
//                       name=" orderId"
//                       value={this.state.orderId}
//                       onChange={this.changeHandler}
//                     />
//                   </FormGroup>
//                 </Col>

//                 <Col lg="6" md="6">
//                   <FormGroup>
//                     <Label>Email</Label>
//                     <Input
//                       type="email"
//                       placeholder="Enter Email"
//                       name="email"
//                       value={this.state.email}
//                       onChange={this.changeHandler}
//                     />
//                   </FormGroup>
//                 </Col>
//                 <Col lg="6" md="6">
//                   <FormGroup>
//                     <Label>Mobile No</Label>
//                     <Input
//                       type="Number"
//                       placeholder="Enter No."
//                       name="phone_no"
//                       size={10}
//                       value={this.state.phone_no}
//                       onChange={this.changeHandler}
//                     />
//                   </FormGroup>
//                 </Col>
//                 <Col lg="6" md="6">
//                   <FormGroup>
//                     <Label>Order Zone</Label>
//                     <Input
//                       type="text"
//                       placeholder="Order Zone"
//                       name="order_zone"
//                       value={this.state.order_zone}
//                       onChange={this.changeHandler}
//                     />
//                   </FormGroup>
//                 </Col>
//                 <Col lg="6" md="6">
//                   <FormGroup>
//                     <Label>delivery_add</Label>
//                     <Input
//                       type="text"
//                       placeholder="Delivery Address"
//                       name="delivery_add"
//                       value={this.state.delivery_add}
//                       onChange={this.changeHandler}
//                     />
//                   </FormGroup>
//                 </Col>
//                 <Col lg="6" md="6">
//                   <FormGroup>
//                     <Label>Delivery Slot</Label>
//                     <Input
//                       type="text"
//                       placeholder="Delivery Slot"
//                       name="delivery_slot"
//                       value={this.state.delivery_slot}
//                       onChange={this.changeHandler}
//                     />
//                   </FormGroup>
//                 </Col>
//                 <Col lg="6" md="6">
//                   <FormGroup>
//                     <Label>Time Slot</Label>
//                     <Input
//                       type="time"
//                       placeholder="Time Slot"
//                       name="time_slot"
//                       value={this.state.time_slot}
//                       onChange={this.changeHandler}
//                     />
//                   </FormGroup>
//                 </Col>
//                 <Col lg="6" md="6">
//                   <FormGroup>
//                     <Label>Name</Label>
//                     <Input
//                       type="text"
//                       placeholder="Name"
//                       // disabled={true}
//                       name="name"
//                       value={this.state.name}
//                       onChange={this.changeHandler}
//                     />
//                   </FormGroup>
//                 </Col>
//                 <Col lg="6" md="6">
//                   <Label>Order Status</Label>
//                   <CustomInput
//                     type="select"
//                     placeholder=""
//                     name="status"
//                     value={this.state.status}
//                     onChange={this.changeHandler}
//                   >
//                     <option>--Select--</option>
//                     <option value="pending">Pending</option>
//                     <option value="complete">Completed</option>
//                     <option value="delivery">Delivery</option>
//                     <option value="canceled">Canceled</option>
//                   </CustomInput>
//                 </Col>
//               </Row>
//               <Row className="my-2">
//                 <Table>
//                   <thead>
//                     <tr>
//                       <th>SNo.</th>
//                       <th>Quantity</th>
//                       <th>Attribute</th>
//                       <th>Name</th>
//                       <th>U.Price</th>
//                       <th>GST</th>
//                       <th>Total</th>
//                       <th>Sub Total</th>
//                       <th>Donation</th>
//                       <th>Tips</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <th scope="row">1</th>
//                       <td>2</td>
//                       <td>1Kg</td>
//                       <td>Onion</td>
//                       <td>40</td>
//                       <td>10%</td>
//                       <td>Rs.80</td>
//                       <td>Rs.80</td>
//                       <td>Rs.80</td>
//                       <td>Rs.80</td>
//                     </tr>
//                     <tr>
//                       <th scope="row">1</th>
//                       <td>2</td>
//                       <td>1Kg</td>
//                       <td>Onion</td>
//                       <td>40</td>
//                       <td>10%</td>
//                       <td>Rs.80</td>
//                       <td>Rs.80</td>
//                       <td>Rs.80</td>
//                       <td>Rs.80</td>
//                     </tr>
//                     <tr>
//                       <th scope="row">1</th>
//                       <td>2</td>
//                       <td>1Kg</td>
//                       <td>Onion</td>
//                       <td>40</td>
//                       <td>10%</td>
//                       <td>Rs.80</td>
//                       <td>Rs.80</td>
//                       <td>Rs.80</td>
//                       <td>Rs.80</td>
//                     </tr>
//                     <tr>
//                       <th scope="row">1</th>
//                       <td>2</td>
//                       <td>1Kg</td>
//                       <td>Onion</td>
//                       <td>40</td>
//                       <td>10%</td>
//                       <td>Rs.80</td>
//                       <td>Rs.80</td>
//                       <td>Rs.80</td>
//                       <td>Rs.80</td>
//                     </tr>
//                   </tbody>
//                 </Table>
//               </Row>

//               <Row>
//                 <Button.Ripple
//                   color="danger"
//                   type="submit"
//                   className="mr-1 mb-1"
//                 >
//                   Update
//                 </Button.Ripple>
//               </Row>
//             </Form>
//           </CardBody>
//         </Card>
//       </div>
//     );
//   }
// }
// export default EditOrder;
