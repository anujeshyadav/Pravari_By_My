// import React, { Component, useDebugValue } from "react";
import React, { useEffect, useState } from "react";

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
import Multiselect from "multiselect-react-dropdown";
import Select from "react-select";

import swal from "sweetalert";
import "../../../../../src/layouts/assets/scss/pages/users.scss";
import { Route } from "react-router-dom";
import { CloudLightning } from "react-feather";
import { timers } from "jquery";
const selectItem1 = [];
const selectstate2 = [];

const AllunSelectedCity = [];
const Selectedarray = [];

// export class CreateAccount extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       Address: "",
//       Viewpermisson: null,
//       Editpermisson: null,
//       Createpermisson: null,
//       Deletepermisson: null,
//       fullname: "",
//       GSTIN: "",
//       StateList: [],
//       CityList: [],
//       SelectedSCity: [],
//       SelectedState: [],
//       B_City: "",
//       checkbox: "",
//       S_City: "",
//       Mobile_no: "",
//       B_Country: "",
//       S_Country: "",
//       Mobile_no: "",
//       Phone_no: "",
//       Place_of_Supply: "",
//       B_State: "",
//       S_State: "",
//       B_Street: "",
//       S_Street: "",
//       B_PinCode: "",
//       S_PinCode: "",
//       setuserList: false,
//       multiSelect: [],
//       selectedOptions: [],
//       password: "",
//       email: "",
//       status: "",
//       AssignRole: "",
//       CompanyName: "",
//       Companytype: "",
//       Selectuser: "",
//       UserName: "",
//       productName: [],
//     };
//     this.handleMatchaddress = this.handleMatchaddress.bind(this);
//   }
//   changeHandler = (e) => {
//     // console.log(e.target.value);
//     this.setState({ [e.target.name]: e.target.value });
//   };
//   changeHandler1 = (e) => {
//     this.setState({ status: e.target.value });
//   };

//   handleMultiSelectChange = (selectedOptions) => {
//     this.setState({ selectedOptions });
//     console.log(selectedOptions);
//   };

//   async componentDidMount() {
//     let pageparmission = JSON.parse(localStorage.getItem("userData"));
//     let newparmisson = pageparmission?.role?.find(
//       (value) => value?.pageName === "Create Account"
//     );

//     this.setState({ Viewpermisson: newparmisson?.permission.includes("View") });
//     this.setState({
//       Createpermisson: newparmisson?.permission.includes("Create"),
//     });
//     this.setState({
//       Editpermisson: newparmisson?.permission.includes("Edit"),
//     });
//     this.setState({
//       Deletepermisson: newparmisson?.permission.includes("Delete"),
//     });

//     const formdata = new FormData();
//     formdata.append("user_id", pageparmission?.Userinfo?.id);
//     formdata.append("role", pageparmission?.Userinfo?.role);
//     await axiosConfig
//       .post("/getrolelistdropdown", formdata)
//       .then((response) => {
//         // console.log(response);
//         const propertyNames = Object.values(response.data?.data?.roles);

//         // console.log(propertyNames);
//         this.setState({
//           productName: propertyNames,
//         });
//       });
//     // state List
//     await axiosConfig
//       .get("/getallstates")
//       .then((response) => {
//         this.setState({
//           StateList: response.data?.states,
//         });
//       })
//       .catch((error) => {
//         console.log(error.response.data);
//       });
//   }

//   submitHandler = (e) => {
//     e.preventDefault();
//     let pageparmission = JSON.parse(localStorage.getItem("userData"));
//     let uniqueChars = [...new Set(selectItem1)];
//     console.log(uniqueChars);

//     const formdata = new FormData();

//     formdata.append("created_by", pageparmission?.Userinfo?.id);
//     formdata.append("password", this.state.password);
//     formdata.append("full_name", this.state.fullname);
//     formdata.append("gstin_no", this.state.GSTIN);
//     formdata.append("username", this.state.UserName);
//     formdata.append("city", this.state.B_City);
//     formdata.append("mobile", this.state.Mobile_no);
//     formdata.append("email", this.state.email);
//     formdata.append("status", this.state.status);
//     formdata.append("role", this.state.AssignRole);
//     formdata.append("company_name", this.state.CompanyName);
//     formdata.append("company_type", this.state.Companytype);
//     formdata.append("place_supply", this.state.Place_of_Supply);
//     formdata.append("billing_street", this.state.B_Street);
//     formdata.append("billing_city", this.state.B_City);
//     formdata.append("billing_state", this.state.B_State);
//     formdata.append("billing_country", this.state.B_Country);
//     formdata.append("billing_pincode", this.state.B_PinCode);
//     formdata.append("shipping_street", this.state.S_Street);
//     formdata.append("shipping_city", this.state.S_City);
//     formdata.append("shipping_state", this.state.S_State);
//     formdata.append("shipping_country", this.state.S_Country);
//     formdata.append("shipping_pincode", this.state.S_PinCode);
//     formdata.append("phone_no", this.state.Phone_no);
//     formdata.append("state_id", this.state.SelectedState);
//     formdata.append("city_id", uniqueChars);

//     axiosConfig
//       .post("/createuser", formdata)
//       .then((response) => {
//         if (response.data?.success) {
//           swal("Success!", "Submitted SuccessFull!", "success");
//           this.setState({ AssignRole: "" });
//           this.setState({ status: "" });
//           this.setState({ email: "" });
//           this.setState({ City: "" });
//           this.setState({ phone_no: "" });
//           this.setState({ UserName: "" });
//           this.setState({ fullname: "" });
//           this.setState({ password: "" });
//           this.setState({ S_Country: "" });
//           this.setState({ S_State: "" });
//           this.setState({ S_City: "" });
//           this.setState({ S_Street: "" });
//           this.setState({ S_PinCode: "" });
//         }
//         // this.props.history.push("/app/freshlist/order/all");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };
//   handleMatchaddress = (e, value) => {
//     this.setState({ checkbox: value });
//     if (value) {
//       this.setState({ S_Country: this.state.B_Country });
//       this.setState({ S_State: this.state.B_State });
//       this.setState({ S_City: this.state.B_City });
//       this.setState({ S_Street: this.state.B_Street });
//       this.setState({ S_PinCode: this.state.B_PinCode });
//     } else {
//       this.setState({ S_Country: "" });
//       this.setState({ S_State: "" });
//       this.setState({ S_City: "" });
//       this.setState({ S_Street: "" });
//       this.setState({ S_PinCode: "" });
//     }
//   };
//   onSelect(selectedList, selectedItem) {
//     console.log(selectedList);

//     if (selectedList.length) {
//       for (var i = 0; i < selectedList.length; i++) {
//         selectItem1.push(selectedList[i].id);
//       }
//     }
//   }
//   onSelect1(selectedList, selectedItem) {
//     console.log(selectedList);

//     if (selectedList.length) {
//       for (var i = 0; i < selectedList.length; i++) {
//         selectstate2.push(selectedList[i].id);
//       }
//     }
//     let uniqueChars = [...new Set(selectstate2)];
//     // console.log(uniqueChars);

//     // const formdata = new FormData();
//     // this.setState({ SelectedState: e.target.value });
//     // formdata.append("state_id", e.target.value);
//     // axiosConfig
//     //   .post(`/getcity`, formdata)
//     //   .then((res) => {
//     //     this.setState({ CityList: res?.data?.cities });
//     //   })
//     //   .catch((err) => {
//     //     console.log(err);
//     //   });
//   }
//   setcity = (data, value) => {
//     debugger;
//     this.setState({ CityList: data });
//     this.setState({ SelectedState: value });
//   };

//   onRemove = (selectedList, removedItem) => {
//     // selectItem1 = [];
//     console.log(selectedList);
//     // if (selectedList.length) {
//     //   for (var i = 0; i < selectedList.length; i++) {

//     //     selectItem1.push(selectedList[i].id);
//     //   }
//     // }
//     console.log(removedItem);

//     // let arr1 = selectItem1.includes(removedItem?.id);
//     // let newarr = selectItem1.filter((val) => {
//     //   console.log(((val = removedItem?.id), i));
//     //   debugger;
//     //   if (val === removedItem?.id) {
//     //     return null;
//     //   } else {
//     //     return val;
//     //   }
//     // });
//     // console.log(newarr);
//     // console.log(arr1);
//   };
//   onRemove1 = (selectedList, removedItem) => {
//     // selectItem1 = [];
//     console.log(selectedList);
//     // if (selectedList.length) {
//     //   for (var i = 0; i < selectedList.length; i++) {

//     //     selectItem1.push(selectedList[i].id);
//     //   }
//     // }
//     console.log(removedItem);

//     // let arr1 = selectItem1.includes(removedItem?.id);
//     // let newarr = selectItem1.filter((val) => {
//     //   console.log(((val = removedItem?.id), i));
//     //   debugger;
//     //   if (val === removedItem?.id) {
//     //     return null;
//     //   } else {
//     //     return val;
//     //   }
//     // });
//     // console.log(newarr);
//     // console.log(arr1);
//   };
//   handleOnBlurUsername(event) {
//     console.log(event);
//     //   var username        = event.target.value;
//     //   var messageUsername = "";

//     //   if(!username) {
//     //     messageUsername = "Username required";
//     //   }

//     //   this.setState({
//     //     username: username,
//     //     messageUsername: messageUsername
//     //   });
//   }
//   render() {
//     const { selectedOptions } = this.state;
//     return (
//       <div>
//         <Card>
//           <Row className="m-2">
//             <Col>
//               <h1 className="float-left">Add here</h1>
//             </Col>
//           </Row>
//           <div className="container ">
//             {/* <h4 className="py-2">Select User Type :-</h4> */}
//             {/* <Row>
//               <Col lg="2" md="2">
//                 <FormGroup>
//                   <h3>
//                     Client{" "}
//                     <span>
//                       <Input
//                         required
//                         className="mx-2"
//                         type="radio"
//                         name="City"
//                         value="Client"
//                         onChange={(e) => {
//                           this.setState({ setuserList: false });
//                           this.setState({ AssignRole: "Client" });
//                         }}
//                       />
//                     </span>
//                   </h3>
//                 </FormGroup>
//               </Col>

//               <Col lg="2" md="2">
//                 <FormGroup>
//                   <h3>
//                     User{" "}
//                     <span>
//                       <Input
//                         required
//                         height="21px"
//                         width="41px"
//                         className="mx-2"
//                         type="radio"
//                         name="City"
//                         value="User"
//                         onChange={(e) => {
//                           this.setState({ setuserList: true });
//                           this.setState({ AssignRole: "User" });
//                         }}
//                       />
//                     </span>
//                   </h3>
//                 </FormGroup>
//               </Col>
//             </Row> */}
//           </div>

//           <CardBody>
//             <Form className="m-1" onSubmit={this.submitHandler}>
//               <Row className="mb-2">
//                 <Col lg="6" md="6">
//                   <FormGroup>
//                     <Label> Select Role*</Label>
//                     <CustomInput
//                       required
//                       id="AssignRole"
//                       type="select"
//                       name="AssignRole"
//                       value={this.state.AssignRole}
//                       onChange={this.changeHandler}
//                     >
//                       <option value={"Admin"}>--Select Role--</option>

//                       {this.state.productName &&
//                         this.state.productName?.map((value, index) => (
//                           <option key={index} value={value}>
//                             {value}
//                           </option>
//                         ))}
//                     </CustomInput>
//                   </FormGroup>
//                 </Col>
//                 <Col lg="6" md="6" sm="12">
//                   <FormGroup>
//                     <Label>Name *</Label>
//                     <Input
//                       required
//                       type="text"
//                       placeholder="Enter Your Name"
//                       name="fullname"
//                       value={this.state.fullname}
//                       onChange={this.changeHandler}
//                     />
//                   </FormGroup>
//                 </Col>
//                 <Col lg="6" md="6">
//                   <FormGroup>
//                     <Label>Display Code *</Label>
//                     <Input
//                       required
//                       type="text"
//                       placeholder="Enter Your Name"
//                       name="UserName"
//                       value={this.state.UserName}
//                       onChange={this.changeHandler}
//                     />
//                   </FormGroup>
//                 </Col>

//                 <Col lg="6" md="6">
//                   <FormGroup>
//                     <Label>Mobile Number *</Label>
//                     <Input
//                       required
//                       type="number"
//                       maxLength={12}
//                       onKeyDown={(e) =>
//                         ["e", "E", "+", "-"].includes(e.key) &&
//                         e.preventDefault()
//                       }
//                       size={10}
//                       min={0}
//                       placeholder="0123456789"
//                       name="Mobile_no"
//                       value={this.state.Mobile_no}
//                       onChange={this.changeHandler.bind(this)}
//                     />
//                   </FormGroup>
//                 </Col>

//                 <Col lg="6" md="6">
//                   <FormGroup>
//                     <Label>Email *</Label>
//                     <Input
//                       required
//                       type="email"
//                       placeholder="abcd@gmail.com..."
//                       name="email"
//                       value={this.state.email}
//                       onChange={this.changeHandler}
//                     />
//                   </FormGroup>
//                 </Col>
//                 <Col lg="6" md="6">
//                   <FormGroup>
//                     <Label>Password</Label>
//                     <Input
//                       required
//                       type="password"
//                       placeholder="Enter password"
//                       name="password"
//                       value={this.state.password}
//                       onChange={this.changeHandler}
//                     />
//                   </FormGroup>
//                 </Col>
//                 <Col lg="6" md="6">
//                   <FormGroup>
//                     <Label>Company Name</Label>
//                     <Input
//                       required
//                       type="text"
//                       placeholder="Enter CompanyName"
//                       name="CompanyName"
//                       value={this.state.CompanyName}
//                       onChange={this.changeHandler}
//                     />
//                   </FormGroup>
//                 </Col>
//                 <Col lg="6" md="6">
//                   <FormGroup>
//                     <Label>Phone Number </Label>
//                     <Input
//                       required
//                       type="number"
//                       onKeyDown={(e) =>
//                         ["e", "E", "+", "-"].includes(e.key) &&
//                         e.preventDefault()
//                       }
//                       min={0}
//                       maxLength={12}
//                       size={10}
//                       placeholder="0123456789"
//                       name="Phone_no"
//                       value={this.state.Phone_no}
//                       onChange={this.changeHandler.bind(this)}
//                     />
//                   </FormGroup>
//                 </Col>
//                 <Col lg="6" md="6">
//                   <FormGroup>
//                     <Label>Company Type</Label>
//                     <Input
//                       required
//                       type="text"
//                       placeholder="Enter Companytype"
//                       name="Companytype"
//                       value={this.state.Companytype}
//                       onChange={this.changeHandler}
//                     />
//                   </FormGroup>
//                 </Col>
//                 <Col lg="6" md="6">
//                   <FormGroup>
//                     <Label>GSTIN</Label>
//                     <Input
//                       required
//                       type="text"
//                       placeholder="Enter GSTIN No."
//                       name="GSTIN"
//                       value={this.state.GSTIN}
//                       onChange={this.changeHandler}
//                     />
//                   </FormGroup>
//                 </Col>
//                 <Col lg="6" md="6">
//                   <FormGroup>
//                     <Row></Row>
//                     <Label for="cars"> State *</Label>
//                     {this.state.AssignRole === "supplier" ? (
//                       <>
//                         <Multiselect
//                           required
//                           showCheckbox="true"
//                           isObject="false"
//                           options={this.state.StateList} // Options to display in the dropdown
//                           selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
//                           onSelect={this.onSelect1} // Function will trigger on select event
//                           onRemove={this.onRemove1} // Function will trigger on remove event
//                           displayValue="state_title" // Property name to display in the dropdown options
//                         />
//                       </>
//                     ) : (
//                       <>
//                         <select
//                           required
//                           name="SelectedState"
//                           value={this.state.SelectedState}
//                           onChange={(e) => {
//                             const formdata = new FormData();
//                             this.setState({ SelectedState: e.target.value });
//                             formdata.append("state_id", e.target.value);
//                             axiosConfig
//                               .post(`/getcity`, formdata)
//                               .then((res) => {
//                                 this.setState({ CityList: res?.data?.cities });
//                               })
//                               .catch((err) => {
//                                 console.log(err);
//                               });
//                           }}
//                           // onChange={this.changeHandler}
//                           className="form-control"
//                         >
//                           <option value="volvo">--Select State--</option>
//                           {this.state.StateList &&
//                             this.state.StateList?.map((ele, i) => (
//                               <option key={i} value={ele?.id}>
//                                 {ele?.state_title}
//                               </option>
//                             ))}
//                         </select>
//                       </>
//                     )}
//                   </FormGroup>
//                 </Col>
//                 <Col lg="6" md="6">
//                   <Label for="cars">City * </Label>
//                   <Multiselect
//                     required
//                     options={this.state.CityList} // Options to display in the dropdown
//                     selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
//                     onSelect={this.onSelect} // Function will trigger on select event
//                     onRemove={this.onRemove} // Function will trigger on remove event
//                     displayValue="name" // Property name to display in the dropdown options
//                   />
//                 </Col>

//                 {this.state.AssignRole === "supplier" ? (
//                   <>
//                     <Col lg="6" md="6">
//                       <FormGroup>
//                         <Label>Place of Supply</Label>
//                         <Input
//                           required
//                           type="text"
//                           placeholder="Enter Place_of_Supply"
//                           name="Place_of_Supply"
//                           value={this.state.Place_of_Supply}
//                           onChange={this.changeHandler}
//                         />
//                       </FormGroup>
//                     </Col>
//                   </>
//                 ) : null}
//               </Row>
//               <hr />
//               <Row>
//                 <Col className="mt-2" lg="6" md="6" sm="12">
//                   <h4 className="mt-5 pb-2">Billing Address :</h4>

//                   <Col className="" lg="12" md="12" sm="12">
//                     <FormGroup>
//                       <Label for="cars">Choose Country</Label>
//                       <select
//                         placeholder="Enter City"
//                         name="B_Country"
//                         value={this.state.B_Country}
//                         onChange={this.changeHandler}
//                         className="form-control"
//                       >
//                         <option value="volvo">--Select Country--</option>
//                         <option value="India">India</option>
//                       </select>
//                     </FormGroup>
//                   </Col>
//                   <Col lg="12" md="12" sm="12">
//                     <FormGroup>
//                       <Label for="cars">Choose State</Label>
//                       <select
//                         name="B_State"
//                         value={this.state.B_State}
//                         onChange={(e) => {
//                           console.log(e.target.value);
//                           this.setState({ B_State: e.target.value });
//                           const formdata = new FormData();
//                           formdata.append("state_id", e.target.value);
//                           axiosConfig
//                             .post(`/getcity`, formdata)
//                             .then((res) => {
//                               this.setState({ CityList: res?.data?.cities });
//                             })
//                             .catch((err) => {
//                               console.log(err);
//                             });
//                         }}
//                         // onChange={this.changeHandler}
//                         className="form-control"
//                       >
//                         <option value="volvo">--Select State--</option>
//                         {this.state.StateList &&
//                           this.state.StateList?.map((ele, i) => (
//                             <option key={i} value={ele?.id}>
//                               {ele?.state_title}
//                             </option>
//                           ))}
//                       </select>
//                     </FormGroup>
//                   </Col>
//                   <Col lg="12" md="12" sm="12">
//                     <FormGroup>
//                       <FormGroup>
//                         <Label for="cars">Choose City</Label>
//                         <select
//                           placeholder="Enter City"
//                           name="B_City"
//                           value={this.state.B_City}
//                           onChange={this.changeHandler}
//                           className="form-control"
//                         >
//                           <option value="volvo">--Select City--</option>
//                           {this.state.CityList &&
//                             this.state.CityList?.map((value, index) => (
//                               <option key={index} value={value?.id}>
//                                 {value?.name}
//                               </option>
//                             ))}
//                         </select>
//                       </FormGroup>
//                     </FormGroup>
//                   </Col>
//                   <Col lg="12" md="12" sm="12">
//                     <FormGroup>
//                       <Label>Street</Label>
//                       <Input
//                         required
//                         type="text"
//                         placeholder="Enter Street"
//                         name="B_Street"
//                         value={this.state.B_Street}
//                         onChange={this.changeHandler}
//                       />
//                     </FormGroup>
//                   </Col>
//                   <Col lg="12" md="12" sm="12">
//                     <FormGroup>
//                       <Label>PinCode</Label>
//                       <Input
//                         required
//                         type="number"
//                         onKeyDown={(e) =>
//                           ["e", "E", "+", "-"].includes(e.key) &&
//                           e.preventDefault()
//                         }
//                         min={0}
//                         placeholder="Enter PinCode"
//                         name="B_PinCode"
//                         value={this.state.B_PinCode}
//                         onChange={this.changeHandler}
//                       />
//                     </FormGroup>
//                   </Col>
//                 </Col>
//                 <Col lg="6" md="6" sm="12">
//                   <hr />
//                   <Row>
//                     <Col className="ml-2" lg="6" md="6" sm="12">
//                       <Input
//                         name="check"
//                         onChange={(e) => {
//                           this.handleMatchaddress(e, e.target.checked);
//                         }}
//                         style={{
//                           height: "15px",
//                           width: "20px",
//                         }}
//                         type="checkbox"
//                       />
//                     </Col>
//                     <Col lg="6" md="6" sm="6" className="ml-3">
//                       <h5> Same as Billing Address </h5>
//                     </Col>
//                   </Row>
//                   <h4 className="py-2">Shipping Address :</h4>

//                   <Col lg="12" md="12" sm="12">
//                     <FormGroup>
//                       <Label for="cars">Choose Country</Label>
//                       <select
//                         placeholder="Enter City"
//                         name="S_Country"
//                         disabled={this.state.checkbox ? true : false}
//                         value={this.state.S_Country}
//                         onChange={this.changeHandler}
//                         className="form-control"
//                       >
//                         <option value="volvo">--Select Country--</option>
//                         <option value="India">India</option>
//                       </select>
//                     </FormGroup>
//                   </Col>
//                   <Col lg="12" md="12" sm="12">
//                     <FormGroup>
//                       <Label for="cars">Choose State</Label>
//                       <select
//                         name="S_State"
//                         value={this.state.S_State}
//                         onChange={(e) => {
//                           // console.log(e.target.value);
//                           this.setState({ S_State: e.target.value });
//                           const formdata = new FormData();
//                           formdata.append("state_id", e.target.value);
//                           axiosConfig
//                             .post(`/getcity`, formdata)
//                             .then((res) => {
//                               console.log(res?.data?.cities);
//                               this.setState({ CityList: res?.data?.cities });
//                             })
//                             .catch((err) => {
//                               console.log(err);
//                             });
//                         }}
//                         // onChange={this.changeHandler}
//                         className="form-control"
//                       >
//                         <option value="volvo">--Select State--</option>
//                         {this.state.StateList &&
//                           this.state.StateList?.map((ele, i) => (
//                             <option key={i} value={ele?.id}>
//                               {ele?.state_title}
//                             </option>
//                           ))}
//                       </select>
//                       {/* <select
//                         name="S_State"
//                         disabled={this.state.checkbox ? true : false}
//                         value={this.state.S_State}
//                         onChange={this.changeHandler}
//                         className="form-control"
//                       >
//                         <option value="volvo">--Select State--</option>
//                         <option value="Madhya Pradesh">Madhya Pradesh</option>
//                         <option value="Uttar Pradesh">Uttar Pradesh</option>
//                         <option value="Maharastra">Maharastra</option>
//                       </select> */}
//                     </FormGroup>
//                   </Col>
//                   <Col lg="12" md="12" sm="12">
//                     <Label for="cars">Choose City</Label>

//                     <FormGroup>
//                       <select
//                         placeholder="Enter City"
//                         name="S_City"
//                         value={this.state.S_City}
//                         onChange={this.changeHandler}
//                         className="form-control"
//                       >
//                         <option value="volvo">--Select City--</option>
//                         {this.state.CityList &&
//                           this.state.CityList?.map((value, index) => (
//                             <option key={index} value={value?.id}>
//                               {value?.name}
//                             </option>
//                           ))}
//                       </select>
//                       {/* <FormGroup>
//                         <select
//                           disabled={this.state.checkbox ? true : false}
//                           placeholder="Enter City"
//                           name="S_City"
//                           value={this.state.S_City}
//                           onChange={this.changeHandler}
//                           className="form-control"
//                         >
//                           <option value="volvo">--Select City--</option>
//                           <option value="Indore">Indore</option>
//                           <option value="Panvel">Panvel</option>
//                           <option value="khandwa">khandwa</option>
//                         </select>
//                       </FormGroup> */}
//                     </FormGroup>
//                   </Col>
//                   <Col lg="12" md="12" sm="12">
//                     <FormGroup>
//                       <Label>Street</Label>
//                       <Input
//                         required
//                         disabled={this.state.checkbox ? true : false}
//                         type="text"
//                         placeholder="Enter Street"
//                         name="S_Street"
//                         value={this.state.S_Street}
//                         onChange={this.changeHandler}
//                       />
//                     </FormGroup>
//                   </Col>
//                   <Col lg="12" md="12" sm="12">
//                     <FormGroup>
//                       <Label>PinCode</Label>
//                       <Input
//                         required
//                         disabled={this.state.checkbox ? true : false}
//                         type="number"
//                         placeholder="Enter PinCode"
//                         onKeyDown={(e) =>
//                           ["e", "E", "+", "-"].includes(e.key) &&
//                           e.preventDefault()
//                         }
//                         min={0}
//                         name="S_PinCode"
//                         value={this.state.S_PinCode}
//                         onChange={this.changeHandler}
//                       />
//                     </FormGroup>
//                   </Col>
//                 </Col>
//               </Row>

//               {/* {this.state.setuserList && ( */}
//               <Row className="mt-2">
//                 <Col lg="6" md="6" sm="6" className="mb-2">
//                   <Label className="">
//                     <h4>Status</h4>
//                   </Label>
//                   <div
//                     className="form-label-group"
//                     onChange={this.changeHandler1}
//                   >
//                     <input
//                       style={{ marginRight: "3px" }}
//                       type="radio"
//                       name="status"
//                       value="Active"
//                     />
//                     <span style={{ marginRight: "20px" }}>Active</span>

//                     <input
//                       style={{ marginRight: "3px" }}
//                       type="radio"
//                       name="status"
//                       value="Deactive"
//                     />
//                     <span style={{ marginRight: "3px" }}>Deactive</span>
//                   </div>
//                 </Col>
//                 {/* <Col lg="6" md="6">
//                   <Label className="mt-2  mb-2"> Select User</Label>

//                   <CustomInput
//                     type="select"
//                     placeholder=""
//                     name="Selectuser"
//                     value={this.state.Selectuser}
//                     onChange={this.changeHandler}
//                   >
//                     <option value="user1">user 1</option>
//                     <option value="user2">user2</option>
//                     <option value="user2">UPI</option>
//                     <option value="user2">Other</option>
//                   </CustomInput>
//                 </Col> */}
//               </Row>
//               {/* )} */}

//               <Row>
//                 <Button.Ripple
//                   color="primary"
//                   type="submit"
//                   className="mr-1 mt-2 mx-2"
//                 >
//                   Submit
//                 </Button.Ripple>
//               </Row>
//             </Form>
//           </CardBody>
//         </Card>
//       </div>
//     );
//   }
// }
// export default CreateAccount;

const CreateAccount = () => {
  // const [Address, setAddress] = useState("");
  const [Viewpermisson, setViewpermisson] = useState(null);
  const [Editpermisson, setEditpermisson] = useState(null);
  const [Createpermisson, setCreatepermisson] = useState(null);
  const [Deletepermisson, setDeletepermisson] = useState(null);
  const [fullname, setfullname] = useState("");
  const [GSTIN, setGSTIN] = useState("");
  const [StateList, setStateList] = useState([]);
  const [CityList, setCityList] = useState([]);
  const [SelectedSCity, setSelectedSCity] = useState([]);
  const [SelectedState, setSelectedState] = useState([]);
  const [B_City, setB_City] = useState("");
  const [checkbox, setcheckbox] = useState("");
  const [S_City, setS_City] = useState("");
  const [Mobile_no, setMobile_no] = useState("");
  const [B_Country, setB_Country] = useState("");
  const [S_Country, setS_Country] = useState("");
  const [Phone_no, setPhone_no] = useState("");
  const [Place_of_Supply, setPlace_of_Supply] = useState("");
  const [B_State, setB_State] = useState("");
  const [S_State, setS_State] = useState("");
  const [B_Street, setB_Street] = useState("");
  const [S_Street, setS_Street] = useState("");
  const [B_PinCode, setB_PinCode] = useState("");
  const [S_PinCode, setS_PinCode] = useState("");
  const [setuserList, setsetuserList] = useState(false);
  const [multiSelect, setmultiSelect] = useState([]);
  const [selectedOptions, setselectedOptions] = useState([]);
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [status, setstatus] = useState("");
  const [AssignRole, setAssignRole] = useState("");
  const [CompanyName, setCompanyName] = useState("");
  const [Companytype, setCompanytype] = useState("");
  const [Selectuser, setSelectuser] = useState("");
  const [UserName, setUserName] = useState("");
  const [productName, setproductName] = useState([]);
  const [City, setCity] = useState("");

  useEffect(() => {
    let pageparmission = JSON.parse(localStorage.getItem("userData"));
    let newparmisson = pageparmission?.role?.find(
      (value) => value?.pageName === "Create Account"
    );
    setViewpermisson(newparmisson?.permission.includes("View"));
    setCreatepermisson(newparmisson?.permission.includes("Create"));
    setEditpermisson(newparmisson?.permission.includes("Edit"));

    setDeletepermisson(newparmisson?.permission.includes("Delete"));

    const formdata = new FormData();
    formdata.append("user_id", pageparmission?.Userinfo?.id);
    formdata.append("role", pageparmission?.Userinfo?.role);
    axiosConfig.post("/getrolelistdropdown", formdata).then((response) => {
      // console.log(response);
      const propertyNames = Object.values(response.data?.data?.roles);

      // console.log(propertyNames);
      setproductName(propertyNames);
    });
    // state List
    axiosConfig
      .get("/getallstates")
      .then((response) => {
        setStateList(response.data?.states);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    let pageparmission = JSON.parse(localStorage.getItem("userData"));
    let uniqueChars = [...new Set(selectItem1)];
    let selectedOption = [...new Set(selectedOptions)];

    const formdata = new FormData();

    formdata.append("created_by", pageparmission?.Userinfo?.id);
    formdata.append("password", password);
    formdata.append("full_name", fullname);
    formdata.append("gstin_no", GSTIN);
    formdata.append("username", UserName);
    formdata.append("city", B_City);
    formdata.append("mobile", Mobile_no);
    formdata.append("email", email);
    formdata.append("status", status);
    formdata.append("role", AssignRole);
    formdata.append("company_name", CompanyName);
    formdata.append("company_type", Companytype);
    formdata.append("place_supply", Place_of_Supply);
    formdata.append("billing_street", B_Street);
    formdata.append("billing_city", B_City);
    formdata.append("billing_state", B_State);
    formdata.append("billing_country", B_Country);
    formdata.append("billing_pincode", B_PinCode);
    formdata.append("shipping_street", S_Street);
    formdata.append("shipping_city", S_City);
    formdata.append("shipping_state", S_State);
    formdata.append("shipping_country", S_Country);
    formdata.append("shipping_pincode", S_PinCode);
    formdata.append("phone_no", Phone_no);
    if (selectedOption.length > 0) {
      formdata.append("state_id", multiSelect.toString());
    } else {
      formdata.append("state_id", SelectedState);
    }

    formdata.append("city_id", uniqueChars);

    axiosConfig
      .post("/createuser", formdata)
      .then((response) => {
        if (response.data?.success) {
          swal("Success!", "Submitted SuccessFull!", "success");
          setAssignRole("");
          setstatus("");
          setemail("");
          setCity("");
          setPhone_no("");
          setUserName("");
          setfullname("");
          setpassword("");
          setS_Country("");
          setS_State("");
          setS_City("");
          setS_Street("");
          setS_PinCode("");
        }
        // this.props.history.push("/app/freshlist/order/all");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleMatchaddress = (e, value) => {
    setcheckbox(value);
    if (value) {
      setS_Country(B_Country);
      setS_State(B_State);
      setS_City(B_City);
      setS_Street(B_Street);
      setS_PinCode(B_PinCode);
    } else {
      setS_Country("");
      setS_State("");
      setS_City("");
      setS_Street("");
      setS_PinCode("");
    }
  };
  const onSelect = (selectedList, selectedItem) => {
    console.log(selectedList);

    if (selectedList.length) {
      for (var i = 0; i < selectedList.length; i++) {
        selectItem1.push(selectedList[i].id);
      }
    }
  };
  const onSelect1 = (selectedList, selectedItem) => {
    if (selectedList.length) {
      for (var i = 0; i < selectedList.length; i++) {
        selectedOptions.push(selectedList[i].id);
      }
    }

    let arr = selectedList.map((ele) => ele.id);
    setmultiSelect(arr);
    // console.log(multiSelect);

    let uniqueChars = [...new Set(selectedOptions)];

    if (uniqueChars.length === 1) {
      let value = uniqueChars[0];
      const formdata = new FormData();
      formdata.append("state_id", value);
      axiosConfig
        .post(`/getcity`, formdata)
        .then((res) => {
          setCityList(res?.data?.cities);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setCityList([]);
    }
  };
  const onRemove1 = (selectedList, removedItem) => {
    // debugger;
    // setselectedOptions("");
    // console.log(selectedList);
    // setmultiSelect(selectedList);

    let arr = selectedList.map((ele) => ele.id);
    // console.log(arr);
    setmultiSelect(arr);
    // console.log(multiSelect);
    // if (selectedList.length) {
    //   for (var i = 0; i < selectedList.length; i++) {
    //     selectedOptions.push(selectedList[i].id);
    //   }
    // }
    // let uniqueChars = [...new Set(selectedOptions)];
    // console.log(uniqueChars);
  };

  const onRemove = (selectedList, removedItem) => {
    console.log(selectedList);
    console.log(removedItem);
  };

  return (
    <div>
      <div>
        <Card>
          <Row className="m-2">
            <Col>
              <h1 className="float-left">Add here</h1>
            </Col>
          </Row>
          <div className="container ">
            {/* <h4 className="py-2">Select User Type :-</h4> */}
            {/* <Row>
              <Col lg="2" md="2">
                <FormGroup>
                  <h3>
                    Client{" "}
                    <span>
                      <Input
                        required
                        className="mx-2"
                        type="radio"
                        name="City"
                        value="Client"
                        onChange={(e) => {
                          this.setState({ setuserList: false });
                          this.setState({ AssignRole: "Client" });
                        }}
                      />
                    </span>
                  </h3>
                </FormGroup>
              </Col>

              <Col lg="2" md="2">
                <FormGroup>
                  <h3>
                    User{" "}
                    <span>
                      <Input
                        required
                        height="21px"
                        width="41px"
                        className="mx-2"
                        type="radio"
                        name="City"
                        value="User"
                        onChange={(e) => {
                          this.setState({ setuserList: true });
                          this.setState({ AssignRole: "User" });
                        }}
                      />
                    </span>
                  </h3>
                </FormGroup>
              </Col>
            </Row> */}
          </div>

          <CardBody>
            <Form className="m-1" onSubmit={submitHandler}>
              <Row className="mb-2">
                <Col lg="6" md="6">
                  <FormGroup>
                    <Label> Select Role*</Label>
                    <CustomInput
                      required
                      id="AssignRole"
                      type="select"
                      name="AssignRole"
                      value={AssignRole}
                      // onChange={changeHandler}
                      onChange={(e) => setAssignRole(e.target.value)}
                    >
                      <option value="">--Select Role--</option>

                      {productName &&
                        productName?.map((value, index) => (
                          <option key={index} value={value}>
                            {value}
                          </option>
                        ))}
                    </CustomInput>
                  </FormGroup>
                </Col>
                <Col lg="6" md="6" sm="12">
                  <FormGroup>
                    <Label>Name *</Label>
                    <Input
                      required
                      type="text"
                      placeholder="Enter Your Name"
                      name="fullname"
                      value={fullname}
                      onChange={(e) => setfullname(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6" md="6">
                  <FormGroup>
                    <Label>Display Code *</Label>
                    <Input
                      required
                      type="text"
                      placeholder="Enter Your Name"
                      name="UserName"
                      value={UserName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </FormGroup>
                </Col>

                <Col lg="6" md="6">
                  <FormGroup>
                    <Label>Mobile Number *</Label>
                    <Input
                      required
                      type="number"
                      maxLength={12}
                      onKeyDown={(e) =>
                        ["e", "E", "+", "-"].includes(e.key) &&
                        e.preventDefault()
                      }
                      size={10}
                      min={0}
                      placeholder="0123456789"
                      name="Mobile_no"
                      value={Mobile_no}
                      onChange={(e) => setMobile_no(e.target.value)}
                    />
                  </FormGroup>
                </Col>

                <Col lg="6" md="6">
                  <FormGroup>
                    <Label>Email *</Label>
                    <Input
                      required
                      type="email"
                      placeholder="abcd@gmail.com..."
                      name="email"
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6" md="6">
                  <FormGroup>
                    <Label>Password</Label>
                    <Input
                      required
                      type="password"
                      placeholder="Enter password"
                      name="password"
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6" md="6">
                  <FormGroup>
                    <Label>Company Name</Label>
                    <Input
                      required
                      type="text"
                      placeholder="Enter CompanyName"
                      name="CompanyName"
                      value={CompanyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6" md="6">
                  <FormGroup>
                    <Label>Phone Number </Label>
                    <Input
                      required
                      type="number"
                      onKeyDown={(e) =>
                        ["e", "E", "+", "-"].includes(e.key) &&
                        e.preventDefault()
                      }
                      min={0}
                      maxLength={12}
                      size={10}
                      placeholder="0123456789"
                      name="Phone_no"
                      value={Phone_no}
                      onChange={(e) => setPhone_no(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6" md="6">
                  <FormGroup>
                    <Label>Company Type</Label>
                    <Input
                      required
                      type="text"
                      placeholder="Enter Companytype"
                      name="Companytype"
                      value={Companytype}
                      onChange={(e) => setCompanytype(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6" md="6">
                  <FormGroup>
                    <Label>GSTIN</Label>
                    <Input
                      required
                      type="text"
                      placeholder="Enter GSTIN No."
                      name="GSTIN"
                      value={GSTIN}
                      onChange={(e) => setGSTIN(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col lg="6" md="6">
                  <FormGroup>
                    <Row></Row>
                    <Label for="cars"> State *</Label>
                    {AssignRole === "supplier" ? (
                      <>
                        <Multiselect
                          required
                          showCheckbox="true"
                          isObject="false"
                          options={StateList} // Options to display in the dropdown
                          // selectedValues={selectedValue}   // Preselected value to persist in dropdown
                          onSelect={onSelect1} // Function will trigger on select event
                          onRemove={onRemove1} // Function will trigger on remove event
                          displayValue="state_title" // Property name to display in the dropdown options
                        />
                      </>
                    ) : (
                      <>
                        <select
                          required
                          name="SelectedState"
                          value={SelectedState}
                          onChange={(e) => {
                            const formdata = new FormData();
                            setSelectedState(e.target.value);
                            // this.setState({ SelectedState: e.target.value });
                            formdata.append("state_id", e.target.value);
                            axiosConfig
                              .post(`/getcity`, formdata)
                              .then((res) => {
                                setCityList(res?.data?.cities);
                                // this.setState({ CityList: res?.data?.cities });
                              })
                              .catch((err) => {
                                console.log(err);
                              });
                          }}
                          // onChange={this.changeHandler}
                          className="form-control"
                        >
                          <option value="volvo">--Select State--</option>
                          {StateList &&
                            StateList?.map((ele, i) => (
                              <option key={i} value={ele?.id}>
                                {ele?.state_title}
                              </option>
                            ))}
                        </select>
                      </>
                    )}
                  </FormGroup>
                </Col>
                <Col lg="6" md="6">
                  <Label for="cars">City * </Label>
                  <Multiselect
                    required
                    options={CityList} // Options to display in the dropdown
                    // selectedValues={selectedValue} // Preselected value to persist in dropdown
                    onSelect={onSelect} // Function will trigger on select event
                    onRemove={onRemove} // Function will trigger on remove event
                    displayValue="name" // Property name to display in the dropdown options
                  />
                </Col>

                {AssignRole === "supplier" ? (
                  <>
                    <Col lg="6" md="6">
                      <FormGroup>
                        <Label>Place of Supply</Label>
                        <Input
                          required
                          type="text"
                          placeholder="Enter Place_of_Supply"
                          name="Place_of_Supply"
                          value={Place_of_Supply}
                          onChange={(e) => setPlace_of_Supply(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                  </>
                ) : null}
              </Row>
              <hr />
              <Row>
                <Col className="mt-2" lg="6" md="6" sm="12">
                  <h4 className="mt-5 pb-2">Billing Address :</h4>

                  <Col className="" lg="12" md="12" sm="12">
                    <FormGroup>
                      <Label for="cars">Choose Country</Label>
                      <select
                        placeholder="Enter City"
                        name="B_Country"
                        value={B_Country}
                        onChange={(e) => setB_Country(e.target.value)}
                        className="form-control"
                      >
                        <option value="volvo">--Select Country--</option>
                        <option value="India">India</option>
                      </select>
                    </FormGroup>
                  </Col>
                  <Col lg="12" md="12" sm="12">
                    <FormGroup>
                      <Label for="cars">Choose State</Label>
                      <select
                        name="B_State"
                        value={B_State}
                        onChange={(e) => {
                          console.log(e.target.value);
                          setB_State(e.target.value);
                          // this.setState({ B_State: e.target.value });
                          const formdata = new FormData();
                          formdata.append("state_id", e.target.value);
                          axiosConfig
                            .post(`/getcity`, formdata)
                            .then((res) => {
                              setCityList(res?.data?.cities);
                              // this.setState({ CityList: res?.data?.cities });
                            })
                            .catch((err) => {
                              console.log(err);
                            });
                        }}
                        // onChange={this.changeHandler}
                        className="form-control"
                      >
                        <option value="volvo">--Select State--</option>
                        {StateList &&
                          StateList?.map((ele, i) => (
                            <option key={i} value={ele?.id}>
                              {ele?.state_title}
                            </option>
                          ))}
                      </select>
                    </FormGroup>
                  </Col>
                  <Col lg="12" md="12" sm="12">
                    <FormGroup>
                      <FormGroup>
                        <Label for="cars">Choose City</Label>
                        <select
                          placeholder="Enter City"
                          name="B_City"
                          value={B_City}
                          onChange={(e) => setB_City(e.target.value)}
                          className="form-control"
                        >
                          <option value="volvo">--Select City--</option>
                          {CityList &&
                            CityList?.map((value, index) => (
                              <option key={index} value={value?.id}>
                                {value?.name}
                              </option>
                            ))}
                        </select>
                      </FormGroup>
                    </FormGroup>
                  </Col>
                  <Col lg="12" md="12" sm="12">
                    <FormGroup>
                      <Label>Street</Label>
                      <Input
                        required
                        type="text"
                        placeholder="Enter Street"
                        name="B_Street"
                        value={B_Street}
                        onChange={(e) => setB_Street(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="12" md="12" sm="12">
                    <FormGroup>
                      <Label>PinCode</Label>
                      <Input
                        required
                        type="number"
                        onKeyDown={(e) =>
                          ["e", "E", "+", "-"].includes(e.key) &&
                          e.preventDefault()
                        }
                        min={0}
                        placeholder="Enter PinCode"
                        name="B_PinCode"
                        value={B_PinCode}
                        onChange={(e) => setB_PinCode(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Col>
                <Col lg="6" md="6" sm="12">
                  <hr />
                  <Row>
                    <Col className="ml-2" lg="6" md="6" sm="12">
                      <Input
                        name="check"
                        onChange={(e) => {
                          handleMatchaddress(e, e.target.checked);
                        }}
                        style={{
                          height: "15px",
                          width: "20px",
                        }}
                        type="checkbox"
                      />
                    </Col>
                    <Col lg="6" md="6" sm="6" className="ml-3">
                      <h5> Same as Billing Address </h5>
                    </Col>
                  </Row>
                  <h4 className="py-2">Shipping Address :</h4>

                  <Col lg="12" md="12" sm="12">
                    <FormGroup>
                      <Label for="cars">Choose Country</Label>
                      <select
                        placeholder="Enter City"
                        name="S_Country"
                        disabled={checkbox ? true : false}
                        value={S_Country}
                        onChange={(e) => setS_Country(e.target.value)}
                        className="form-control"
                      >
                        <option value="volvo">--Select Country--</option>
                        <option value="India">India</option>
                      </select>
                    </FormGroup>
                  </Col>
                  <Col lg="12" md="12" sm="12">
                    <FormGroup>
                      <Label for="cars">Choose State</Label>
                      <select
                        name="S_State"
                        value={S_State}
                        onChange={(e) => {
                          // console.log(e.target.value);
                          setS_State(e.target.value);
                          // this.setState({ S_State: e.target.value });
                          const formdata = new FormData();
                          formdata.append("state_id", e.target.value);
                          axiosConfig
                            .post(`/getcity`, formdata)
                            .then((res) => {
                              console.log(res?.data?.cities);
                              setCityList(res?.data?.cities);
                              // this.setState({ CityList: res?.data?.cities });
                            })
                            .catch((err) => {
                              console.log(err);
                            });
                        }}
                        // onChange={this.changeHandler}
                        className="form-control"
                      >
                        <option value="volvo">--Select State--</option>
                        {StateList &&
                          StateList?.map((ele, i) => (
                            <option key={i} value={ele?.id}>
                              {ele?.state_title}
                            </option>
                          ))}
                      </select>
                      {/* <select
                        name="S_State"
                        disabled={this.state.checkbox ? true : false}
                        value={this.state.S_State}
                        onChange={this.changeHandler}
                        className="form-control"
                      >
                        <option value="volvo">--Select State--</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Maharastra">Maharastra</option>
                      </select> */}
                    </FormGroup>
                  </Col>
                  <Col lg="12" md="12" sm="12">
                    <Label for="cars">Choose City</Label>

                    <FormGroup>
                      <select
                        placeholder="Enter City"
                        name="S_City"
                        value={S_City}
                        onChange={(e) => setS_City(e.target.value)}
                        className="form-control"
                      >
                        <option value="volvo">--Select City--</option>
                        {CityList &&
                          CityList?.map((value, index) => (
                            <option key={index} value={value?.id}>
                              {value?.name}
                            </option>
                          ))}
                      </select>
                      {/* <FormGroup>
                        <select
                          disabled={this.state.checkbox ? true : false}
                          placeholder="Enter City"
                          name="S_City"
                          value={this.state.S_City}
                          onChange={this.changeHandler}
                          className="form-control"
                        >
                          <option value="volvo">--Select City--</option>
                          <option value="Indore">Indore</option>
                          <option value="Panvel">Panvel</option>
                          <option value="khandwa">khandwa</option>
                        </select>
                      </FormGroup> */}
                    </FormGroup>
                  </Col>
                  <Col lg="12" md="12" sm="12">
                    <FormGroup>
                      <Label>Street</Label>
                      <Input
                        required
                        disabled={checkbox ? true : false}
                        type="text"
                        placeholder="Enter Street"
                        name="S_Street"
                        value={S_Street}
                        onChange={(e) => setS_Street(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="12" md="12" sm="12">
                    <FormGroup>
                      <Label>PinCode</Label>
                      <Input
                        required
                        disabled={checkbox ? true : false}
                        type="number"
                        placeholder="Enter PinCode"
                        onKeyDown={(e) =>
                          ["e", "E", "+", "-"].includes(e.key) &&
                          e.preventDefault()
                        }
                        min={0}
                        name="S_PinCode"
                        value={S_PinCode}
                        onChange={(e) => setS_PinCode(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Col>
              </Row>

              {/* {this.state.setuserList && ( */}
              <Row className="mt-2">
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label className="">
                    <h4>Status</h4>
                  </Label>
                  <div
                    className="form-label-group"
                    onChange={(e) => setstatus(e.target.value)}
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
                </Col>
                {/* <Col lg="6" md="6">
                  <Label className="mt-2  mb-2"> Select User</Label>

                  <CustomInput
                    type="select"
                    placeholder=""
                    name="Selectuser"
                    value={this.state.Selectuser}
                    onChange={this.changeHandler}
                  >
                    <option value="user1">user 1</option>
                    <option value="user2">user2</option>
                    <option value="user2">UPI</option>
                    <option value="user2">Other</option>
                  </CustomInput>
                </Col> */}
              </Row>
              {/* )} */}

              <Row>
                <Button.Ripple
                  color="primary"
                  type="submit"
                  className="mr-1 mt-2 mx-2"
                >
                  Submit
                </Button.Ripple>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};
export default CreateAccount;
