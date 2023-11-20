import React from "react";
import {
  Card,
  CardBody,
  Input,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Button,
  FormGroup,
} from "reactstrap";
import axiosConfig from "../../../../axiosConfig";
import ReactHtmlParser from "react-html-parser";
import { ContextLayout } from "../../../../utility/context/Layout";
// import { AgGridReact } from "ag-grid-react";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import { Eye, Trash2, ChevronDown, Edit, CloudLightning } from "react-feather";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { history } from "../../../../history";
import "../../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import "../../../../assets/scss/pages/users.scss";
import { FaWallet, Facart, FaCartArrowDown, FaBoxOpen } from "react-icons/fa";
import "moment-timezone";
import { Route } from "react-router-dom";
import { timers } from "jquery";
import swal from "sweetalert";
import { BsFillCartCheckFill } from "react-icons/bs";
import { Placeorderfunction } from "./Placeorderfunction";

class Placeorder extends React.Component {
  state = {
    ProductQuantity: 0,
    product: [],
    rowData: [],
    rowData1: [],
    Typelist: [],
    SelectedProduct: [],
    Type: "",
    productlength: "",
    Addedbtn: false,
    show: false,
    Viewpermisson: null,
    Editpermisson: null,
    Createpermisson: null,
    Deletepermisson: null,
    paginationPageSize: 20,
    currenPageSize: "",
    getPageSize: "",
    defaultColDef: {
      sortable: true,
      // editable: true,
      resizable: true,
      // rowSelection: "multiple",
      suppressMenu: true,
    },
    columnDefs: [
      {
        headerName: "UID",
        valueGetter: "node.rowIndex + 1",
        field: "node.rowIndex + 1",
        width: 80,
        filter: true,
      },

      {
        headerName: "PRODUCT Image",
        field: "product",
        filter: "agSetColumnFilter",
        width: 150,
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <div className="">
                {params?.data?.product_images ? (
                  <img
                    style={{ borderRadius: "12px" }}
                    width="60px"
                    height="40px"
                    src={params?.data?.product_images[0]}
                    alt="image"
                  />
                ) : (
                  "No Image "
                )}
              </div>
            </div>
          );
        },
      },
      {
        headerName: "PRODUCT",
        field: "title",
        filter: "agSetColumnFilter",
        width: 150,
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <div className="">
                <span>{params.data?.title}</span>
              </div>
            </div>
          );
        },
      },
      {
        headerName: "brand_name",
        field: "brand_name",
        filter: "agSetColumnFilter",
        width: 150,
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <div className="">
                <span>{params.data?.brand_name}</span>
              </div>
            </div>
          );
        },
      },
      {
        headerName: "product_type",
        field: "product_type",
        filter: "agSetColumnFilter",
        width: 150,
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <div className="">
                <span>{params.data?.product_type}</span>
              </div>
            </div>
          );
        },
      },

      {
        headerName: "Quantity",
        field: "",
        filter: "agSetColumnFilter",
        width: 260,

        cellRendererFramework: (params) => {
          console.log(params);
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <div className="d-flex">
                <input
                  id="inputvalue"
                  style={{ position: "relative" }}
                  // value={this.state.ProductQuantity}
                  onChange={(e) => {
                    this.setState({ ProductQuantity: e.target.value });
                  }}
                  type="number"
                  className="form-control"
                />

                <Button
                  onClick={(e) => {
                    this.handleAddToCart(e, params?.data);
                  }}
                  size="sm"
                  color="primary"
                  className="mx-1 addbutton"
                  style={{
                    position: "absolute",
                    right: "24px",
                    padding: "12px",
                  }}
                >
                  Add
                  {/* {this.state.ProductQuantity && this.state.ProductQuantity} */}
                </Button>
              </div>
            </div>
          );
        },
      },
      // {
      //   headerName: "Value",
      //   field: "value",
      //   cellRendererFramework: CustomInputRenderer,
      //   cellRendererParams: {
      //     onValueChange: this.handleChange,
      //   },
      // },
      {
        headerName: "PRICE",
        field: "price",
        filter: "agSetColumnFilter",
        width: 120,
        cellRendererFramework: (params) => {
          return (
            <div className="d-flex align-items-center cursor-pointer">
              <div className="">
                <span>{params.data?.price}</span>
              </div>
            </div>
          );
        },
      },

      // {
      //   headerName: "Actions",
      //   field: "transactions",
      //   width: 150,
      //   cellRendererFramework: (params) => {
      //     return (
      //       <div className="actions cursor-pointer">
      //         {/* {this.state.Viewpermisson && (
      //           <Eye
      //             className="mr-50"
      //             size="25px"
      //             color="green"
      //             onClick={() =>
      //               history.push(
      //                 `/app/freshlist/order/viewAll/${params.data.id}`
      //               )
      //             }
      //           />
      //         )} */}
      //         {/* {this.state.Editpermisson && (
      //           <Edit
      //             className="mr-50"
      //             size="25px"
      //             color="blue"
      //             onClick={() =>
      //               this.props.history.push({
      //                 pathname: `/app/freshlist/house/editmyproduct/${params.data?.id}`,
      //                 state: params.data,
      //               })
      //             }
      //           />
      //         )} */}
      //         {/* {this.state.Deletepermisson && (
      //           <Trash2
      //             className="mr-50"
      //             size="25px"
      //             color="Red"
      //             onClick={() => {
      //               let selectedData = this.gridApi.getSelectedRows();

      //               this.runthisfunction(params.data?.id);
      //               this.gridApi.updateRowData({ remove: selectedData });
      //             }}
      //           />
      //         )} */}
      //       </div>
      //     );
      //   },
      // },
    ],
  };
  componentDidUpdate() {
    console.log(this.state.SelectedProduct);
  }
  async componentDidMount() {
    let pageparmission = JSON.parse(localStorage.getItem("userData"));

    let newparmisson = pageparmission?.role?.find(
      (value) => value?.pageName === "Place Order"
    );

    this.setState({ Viewpermisson: newparmisson?.permission.includes("View") });
    this.setState({
      Createpermisson: newparmisson?.permission.includes("Create"),
    });
    this.setState({
      Editpermisson: newparmisson?.permission.includes("Edit"),
    });
    this.setState({
      Deletepermisson: newparmisson?.permission.includes("Delete"),
    });

    const formdata = new FormData();
    formdata.append("user_id", pageparmission?.Userinfo?.id);
    formdata.append("role", pageparmission?.Userinfo?.role);
    await axiosConfig
      .post(`/viewcart`, formdata)
      .then((res) => {
        this.setState({ productlength: res?.data?.data?.length });
      })
      .catch((err) => {
        console.log(err.response);
      });
    await axiosConfig
      // .post("/productlistapi", formdata)
      .post("/getUserAssignproductList", formdata)
      .then((response) => {
        console.log(response);
        // debugger;
        console.log(response?.data.data[0].products);
        this.setState({ rowData: response?.data.data[0].products });
        this.setState({ rowData1: response?.data.data[0].products });
        // console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error.response);
      });

    axiosConfig.post("/producttypelistview", formdata).then((response) => {
      let Typelist = response.data.data;
      console.log(response);
      this.setState({ Typelist });
    });
  }

  handleAddToCart = (e, data) => {
    e.preventDefault();
    let value = document.getElementById("inputvalue").value;

    let pageparmission = JSON.parse(localStorage.getItem("userData"));
    const formdata = new FormData();
    formdata.append("qty", this.state.ProductQuantity);
    formdata.append("user_id", pageparmission?.Userinfo?.id);
    formdata.append("product_id", data?.product_id);
    formdata.append("price", data?.price);
    if (this.state.ProductQuantity > 0) {
      axiosConfig
        .post(`/add_to_cart`, formdata)
        .then((res) => {
          this.setState({ ProductQuantity: "" });

          this.setState({ rowData: this.state.rowData });

          let newvalue = (document.getElementById("inputvalue").value = 0);
          toast.success(`${this.state.ProductQuantity} Product Added`);
          axiosConfig
            .post(`/viewcart`, formdata)
            .then((res) => {
              this.setState({ productlength: res?.data?.data?.length });
            })
            .catch((err) => {
              console.log(err);
              swal("Something Went wrong with Cart");
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // swal("Add Quantity first");
    }
  };

  async runthisfunction(id) {
    // console.log(id);
    let data = new FormData();
    data.append("id", id);
    await axiosConfig
      .post("/deleteproduct", data)
      .then((resp) => {
        console.log(resp);
      })
      .then((response) => {
        console.log(response);
      });
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.setState({
      currenPageSize: this.gridApi.paginationGetCurrentPage() + 1,
      getPageSize: this.gridApi.paginationGetPageSize(),
      totalPages: this.gridApi.paginationGetTotalPages(),
    });
  };

  updateSearchQuery = (val) => {
    this.gridApi.setQuickFilter(val);
  };
  handleChange = (id, newValue) => {
    const updatedRowData = this.state.rowData.map((item) =>
      item.id === id ? { ...item, value: newValue } : item
    );

    this.setState({ rowData: updatedRowData });
  };
  filterSize = (val) => {
    if (this.gridApi) {
      this.gridApi.paginationSetPageSize(Number(val));
      this.setState({
        currenPageSize: val,
        getPageSize: val,
      });
    }
  };
  render() {
    const { rowData, rowData1, columnDefs, defaultColDef, show } = this.state;
    return (
      <>
        <ToastContainer />

        <Row className="app-user-list">
          <Col sm="12">
            <Card>
              <Row>
                <Col>{/* <Placeorderfunction /> */}</Col>
              </Row>
              <Row className="m-2">
                <Col>
                  <h1 col-sm-6 className="float-left">
                    Place Order
                  </h1>
                </Col>

                <Col lg="3">
                  {this.state.productlength && this.state.productlength > 0 ? (
                    <>
                      <Route
                        render={({ history }) => (
                          <Button
                            className="float-right mt-2 mx-2"
                            color="primary"
                            // size="sm"
                            onClick={() => {
                              // localStorage.setItem(
                              //   "SelectedProduct",
                              //   JSON.stringify(this.state.productlength)
                              // );
                              history.push(
                                "/app/freshlist/order/Selectedorder"
                              );
                            }}
                          >
                            View Cart
                            <sup>{this.state.productlength}</sup>
                          </Button>
                        )}
                      />
                    </>
                  ) : null}

                  <Route
                    render={({ history }) => (
                      <Button
                        className="float-right mt-2 "
                        color="primary"
                        onClick={() => history.push("/app/freshlist/order/all")}
                      >
                        Back
                      </Button>
                    )}
                  />
                </Col>
                <Col lg="3" md="3" sm="6" xs="12">
                  <div className=" mr-1">
                    <FormGroup>
                      <label className=""> Choose Type *</label>
                      <select
                        onChange={(e) => {
                          console.log(rowData);
                          let mydata = rowData1?.filter(
                            (ele, i) => ele?.product_type == e.target.value
                          );
                          this.setState({ rowData: mydata });
                          if (e.target.value == "NA") {
                            this.setState({ show: false });
                          } else {
                            this.setState({ show: true });
                          }
                          this.setState({ Type: e.target.value });
                        }}
                        className="form-control"
                        name="Select"
                        id="Select"
                        value={this.state.Type}
                      >
                        <option value="NA">--Select Type--</option>
                        {this.state.Typelist &&
                          this.state.Typelist?.map((val, i) => (
                            <option key={i} value={val?.product_type}>
                              {val?.product_type}
                            </option>
                          ))}
                      </select>
                    </FormGroup>
                  </div>
                </Col>
              </Row>
              {show ? (
                <>
                  <CardBody>
                    {this.state.rowData === null ? null : (
                      <div className="ag-theme-material w-100 my-2 ag-grid-table">
                        <div className="d-flex flex-wrap justify-content-between align-items-center">
                          <div className="mb-1">
                            <UncontrolledDropdown className="p-1 ag-dropdown">
                              <DropdownToggle tag="div">
                                {this.gridApi
                                  ? this.state.currenPageSize
                                  : "" * this.state.getPageSize -
                                    (this.state.getPageSize - 1)}{" "}
                                -{" "}
                                {this.state.rowData.length -
                                  this.state.currenPageSize *
                                    this.state.getPageSize >
                                0
                                  ? this.state.currenPageSize *
                                    this.state.getPageSize
                                  : this.state.rowData.length}{" "}
                                of {this.state.rowData.length}
                                <ChevronDown className="ml-50" size={15} />
                              </DropdownToggle>
                              <DropdownMenu right>
                                <DropdownItem
                                  tag="div"
                                  onClick={() => this.filterSize(20)}
                                >
                                  20
                                </DropdownItem>
                                <DropdownItem
                                  tag="div"
                                  onClick={() => this.filterSize(50)}
                                >
                                  50
                                </DropdownItem>
                                <DropdownItem
                                  tag="div"
                                  onClick={() => this.filterSize(100)}
                                >
                                  100
                                </DropdownItem>
                                <DropdownItem
                                  tag="div"
                                  onClick={() => this.filterSize(134)}
                                >
                                  134
                                </DropdownItem>
                              </DropdownMenu>
                            </UncontrolledDropdown>
                          </div>
                          <div className="d-flex flex-wrap justify-content-between mb-1">
                            <div className="table-input mr-1">
                              <Input
                                placeholder="search..."
                                onChange={(e) =>
                                  this.updateSearchQuery(e.target.value)
                                }
                                value={this.state.value}
                              />
                            </div>
                            <div className="export-btn">
                              <Button.Ripple
                                color="primary"
                                onClick={() => this.gridApi.exportDataAsCsv()}
                              >
                                Export as CSV
                              </Button.Ripple>
                            </div>
                          </div>
                        </div>
                        <ContextLayout.Consumer>
                          {(context) => (
                            <AgGridReact
                              gridOptions={{}}
                              rowSelection="multiple"
                              defaultColDef={defaultColDef}
                              columnDefs={columnDefs}
                              rowData={rowData}
                              onGridReady={this.onGridReady}
                              colResizeDefault={"shift"}
                              animateRows={true}
                              floatingFilter={false}
                              pagination={true}
                              paginationPageSize={this.state.paginationPageSize}
                              pivotPanelShow="always"
                              enableRtl={context.state.direction === "rtl"}
                            />
                          )}
                        </ContextLayout.Consumer>
                      </div>
                    )}
                  </CardBody>
                </>
              ) : null}
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}
class CustomInputRenderer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  handleChange = (e) => {
    const newValue = e.target.value;
    this.setState({ value: newValue });

    // If you want to update the state in the parent component, you can pass a callback function as a prop and call it here.
    this.props.api.setValue(newValue); // Update the value directly in the grid
    this.props.onValueChange(this.props.data.id, newValue);
  };

  render() {
    return (
      <>
        <input
          type="number"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <Button onClick={this.handleclick} color="primary">
          add
        </Button>
      </>
    );
  }
}
export default Placeorder;
