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
  CardTitle,
  CardText,
  Label,
  FormGroup,
} from "reactstrap";
import axios from "axios";
import axiosConfig from "../../../../axiosConfig";
import ReactHtmlParser from "react-html-parser";
import { ContextLayout } from "../../../../utility/context/Layout";
import { AgGridReact } from "ag-grid-react";
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
// import { timers } from "jquery";
import swal from "sweetalert";

class AssignedCLientlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      rowData: [],
      Typelist: [],
      SelectedProduct: [],
      Supplier: [],
      SelectedData: [],
      Type: "",
      total: "",
      SelectedSupplier: "",
      Addedbtn: false,
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
        rowSelection: "multiple",
        suppressMenu: true,
      },
      columnDefs: [
        {
          headerName: "UID",
          valueGetter: "node.rowIndex + 1",
          field: "node.rowIndex + 1",
          // checkboxSelection: true,
          width: 80,
          filter: true,
          // cellRendererFramework: (params) => {
          //   return (
          //     <div className="d-flex align-items-center cursor-pointer">
          //       <div className="">
          //         <input
          //           className="addinarray"
          //           onClick={(e) => {
          //             console.log(e.target.checked);
          //             if (e.target.checked) {
          //               console.log(this.state.SelectedProduct);
          //               this.setState({
          //                 SelectedProduct: this.state.SelectedProduct.concat(
          //                   params?.data
          //                 ),
          //               });
          //             } else {
          //               let data = this.state.SelectedProduct.filter((ele, i) => {
          //                 if (ele?.id === params?.data?.id) {
          //                   this.state.SelectedProduct.splice(i, 1);
          //                 }
          //               });
          //             }
          //           }}
          //           type="checkbox"
          //         />
          //       </div>
          //     </div>
          //   );
          // },
        },

        {
          headerName: "PRODUCT Image",
          field: "product_images",
          filter: "agSetColumnFilter",
          width: 200,
          cellRendererFramework: (params) => {
            // console.log(params.data);
            return (
              <div className="d-flex align-items-center cursor-pointer">
                <div className="">
                  {/* <span>{params.data?.title}</span> */}
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
        // {
        //   headerName: "Products",
        //   field: "products",
        //   filter: "agSetColumnFilter",
        //   width: 500,
        //   cellRendererFramework: (params) => {
        //     return (
        //       <div className="d-flex flex-wrap">
        //         {params?.data?.products &&
        //           params?.data?.products?.map((ele, i) => {
        //             if (params.data?.products.length > 1) {
        //               return <span key={i}>{ele?.title}, &nbsp;</span>;
        //             } else {
        //               return <span key={i}>{ele?.title}</span>;
        //             }
        //           })}
        //       </div>
        //     );
        //   },
        // },
        {
          headerName: "Product Name",
          field: "title",
          filter: "agSetColumnFilter",
          width: 200,
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
          headerName: "Assign To",
          field: "assign_full_name",
          filter: "agSetColumnFilter",
          width: 150,
          cellRendererFramework: (params) => {
            return (
              <div className="d-flex align-items-center cursor-pointer">
                <div className="">
                  <span>{params.data?.assign_full_name}</span>
                </div>
              </div>
            );
          },
        },
        {
          headerName: "Assigned By",
          field: "user_full_name",
          filter: "agSetColumnFilter",
          width: 180,
          cellRendererFramework: (params) => {
            return (
              <div className="d-flex align-items-center cursor-pointer">
                <div className="">
                  <span>{params.data?.user_full_name}</span>
                </div>
              </div>
            );
          },
        },
        // {
        //   headerName: "Product",
        //   field: "title",
        //   filter: "agSetColumnFilter",
        //   width: 150,
        //   cellRendererFramework: (params) => {
        //     return (
        //       <div className="d-flex align-items-center cursor-pointer">
        //         <div className="">
        //           <span>{params.data?.title}</span>
        //         </div>
        //       </div>
        //     );
        //   },
        // },
        // {
        //   headerName: "Assigned User",
        //   field: "qty",
        //   filter: "agSetColumnFilter",
        //   width: 180,
        //   cellRendererFramework: (params) => {
        //     return (
        //       <div className="d-flex align-items-center cursor-pointer">
        //         <div className="">
        //           <span>{params?.data?.assign_full_name}</span>
        //         </div>
        //       </div>
        //     );
        //   },
        // },
        // {
        //   headerName: "CATEGORY",
        //   field: "category_name",
        //   filter: "agSetColumnFilter",
        //   width: 150,
        //   cellRendererFramework: (params) => {
        //     return (
        //       <div className="d-flex align-items-center cursor-pointer">
        //         <div className="">
        //           <span>{params.data?.category_name}</span>
        //         </div>
        //       </div>
        //     );
        //   },
        // },
        // {
        //   headerName: "Description",
        //   field: "description",
        //   filter: "agSetColumnFilter",
        //   width: 120,
        //   cellRendererFramework: (params) => {
        //     return (
        //       <div className="d-flex align-items-center cursor-pointer">
        //         <div className="">
        //           <span>{ReactHtmlParser(params.data?.description)}</span>
        //         </div>
        //       </div>
        //     );
        //   },
        // },
        // {
        //   headerName: "PRICE",
        //   field: "price",
        //   filter: "agSetColumnFilter",
        //   width: 120,
        //   cellRendererFramework: (params) => {
        //     return (
        //       <div className="d-flex align-items-center cursor-pointer">
        //         <div className="">
        //           <span>{params?.data?.price}</span>
        //         </div>
        //       </div>
        //     );
        //   },
        // },
        // {
        //   headerName: "DiscountPrice",
        //   field: "discountprice",
        //   filter: "agSetColumnFilter",
        //   width: 120,
        //   cellRendererFramework: (params) => {
        //     return (
        //       <div className="d-flex align-items-center cursor-pointer">
        //         <div className="">
        //           <span>{params.data?.discountprice}</span>
        //         </div>
        //       </div>
        //     );
        //   },
        // },
        // {
        //   headerName: "Shipping Fee",
        //   field: "shipping_fee",
        //   filter: "agSetColumnFilter",
        //   width: 120,
        //   cellRendererFramework: (params) => {
        //     return (
        //       <div className="d-flex align-items-center cursor-pointer">
        //         <div className="">
        //           <span>{params.data?.shipping_fee}</span>
        //         </div>
        //       </div>
        //     );
        //   },
        // },
        // {
        //   headerName: "Tax Rate",
        //   field: "tax_rate",
        //   filter: "agSetColumnFilter",
        //   width: 120,
        //   cellRendererFramework: (params) => {
        //     return (
        //       <div className="d-flex align-items-center cursor-pointer">
        //         <div className="">
        //           <span>{params.data?.tax_rate}</span>
        //         </div>
        //       </div>
        //     );
        //   },
        // },
        // {
        //   headerName: "Tags",
        //   field: "tags",
        //   filter: "agSetColumnFilter",
        //   width: 120,
        //   cellRendererFramework: (params) => {
        //     return (
        //       <div className="d-flex align-items-center cursor-pointer">
        //         <div className="">
        //           <span>{params.data?.tags}</span>
        //         </div>
        //       </div>
        //     );
        //   },
        // },
        // {
        //   headerName: "STOCK",
        //   field: "stock",

        //   filter: "agSetColumnFilter",
        //   width: 150,
        //   cellRendererFramework: (params) => {
        //     return (
        //       <div className="d-flex align-items-center cursor-pointer">
        //         <div className="">
        //           <span>{ReactHtmlParser(params.data?.stock)}</span>
        //         </div>
        //       </div>
        //     );
        //   },
        // },
        // {
        //   headerName: "Created ",
        //   field: "created_date",
        //   filter: "agSetColumnFilter",
        //   width: 120,
        //   cellRendererFramework: (params) => {
        //     return (
        //       <div className="d-flex align-items-center cursor-pointer">
        //         <div className="">
        //           <span>
        //             {ReactHtmlParser(params.data?.created_date?.split(" ")[0])}
        //           </span>
        //         </div>
        //       </div>
        //     );
        //   },
        // },
        // {
        //   headerName: "SALES",
        //   field: "pisces",
        //   filter: "agSetColumnFilter",
        //   width: 120,
        //   cellRendererFramework: (params) => {
        //     return (
        //       <div className="d-flex align-items-center cursor-pointer">
        //         <div className="">
        //           <span>{ReactHtmlParser(params.data.pisces)}</span>
        //         </div>
        //       </div>
        //     );
        //   },
        // },
        {
          headerName: "Actions",
          field: "transactions",
          width: 180,
          cellRendererFramework: (params) => {
            return (
              <div className="actions cursor-pointer">
                {/* {this.state.Viewpermisson && (
                    <Eye
                      className="mr-50"
                      size="25px"
                      color="green"
                      onClick={() =>
                        history.push(
                          `/app/freshlist/order/viewAll/${params.data.id}`
                        )
                      }
                    />
                  )} */}
                {/* {this.state.Editpermisson && (
                    <Edit
                      className="mr-50"
                      size="25px"
                      color="blue"
                      onClick={() =>
                        this.props.history.push({
                          pathname: `/app/freshlist/house/editmyproduct/${params.data?.id}`,
                          state: params.data,
                        })
                      }
                    />
                  )} */}
                {this.state.Deletepermisson && (
                  <Trash2
                    className="mr-50"
                    size="25px"
                    color="Red"
                    onClick={() => {
                      this.runthisfunction(
                        params?.data?.assign_user_id,
                        params?.data?.product_id
                      );
                    }}
                  />
                )}
              </div>
            );
          },
        },
      ],
    };
  }

  //   handleviewcart = () => {
  //     let pageparmission = JSON.parse(localStorage.getItem("userData"));
  //     const data = new FormData();
  //     data.append("user_id", pageparmission?.Userinfo?.id);
  //     axiosConfig
  //       .post(`/viewcart`, data)
  //       .then((res) => {
  //         console.log(res.data);
  //         this.setState({ total: res?.data?.total });
  //         this.setState({ rowData: res?.data?.data });
  //       })
  //       .catch((err) => {
  //         // console.log(err.response);
  //       });
  //   };

  async componentDidMount() {
    // let SelectedProduct = JSON.parse(localStorage.getItem("SelectedProduct"));
    let pageparmission = JSON.parse(localStorage.getItem("userData"));

    // this.handleviewcart();
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
      .post(`/getUserAssignproductList`, formdata)
      .then((res) => {
        console.log(res?.data?.data);
        let totalprodut = [];
        if (res?.data.data.length) {
          res?.data?.data?.map((ele, i) => {
            console.log(ele?.products);
            totalprodut.push(ele?.products);
          });
          console.log(totalprodut.flat());
          this.setState({ rowData: totalprodut.flat() });
        }
      })
      .catch((err) => {
        // debugger;
        console.log(err.response);
      });
  }

  async runthisfunction(id, pid) {
    let selectedData = this.gridApi.getSelectedRows();
    let pageparmission = JSON.parse(localStorage.getItem("userData"));

    swal("Warning", "Sure You Want to Delete it", {
      buttons: {
        cancel: "cancel",
        catch: { text: "Delete ", value: "delete" },
      },
    }).then((value) => {
      switch (value) {
        case "delete":
          // this.gridApi.updateRowData({ remove: selectedData });
          const data = new FormData();
          data.append("user_id", pageparmission?.Userinfo?.id);
          data.append("assign_user_id", id);
          data.append("product_id", pid);

          axiosConfig
            .post("/deleteUserAssignproductList", data)
            .then((resp) => {
              // console.log(resp.data);
              this.gridApi.updateRowData({ remove: selectedData });
              this.componentDidMount();
              if (resp?.data?.success) {
                toast.success(`Product Deleted Successfully`);
                //   this.handleviewcart();
                // swal("Deleted Successfully");
              }
            })
            .catch((err) => {
              console.log(err);
              let msg = resp?.data?.success;
              if (!msg) {
                //   this.handleviewcart();
                swal("something went wrong");
              }
            });

          break;
        default:
      }
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

  filterSize = (val) => {
    if (this.gridApi) {
      this.gridApi.paginationSetPageSize(Number(val));
      this.setState({
        currenPageSize: val,
        getPageSize: val,
      });
    }
  };
  //   handleSubmit = (e) => {
  //     e.preventDefault();

  //     let arr = this.state.rowData.map((value, index) => {
  //       this.state.SelectedData?.push({
  //         product_id: value?.product_id,
  //         qty: value?.qty,
  //         price: value?.price,
  //       });
  //     });
  //     console.log(this.state.SelectedData);

  //     let pageparmission = JSON.parse(localStorage.getItem("userData"));
  //     const formdata = new FormData();
  //     formdata.append("user_id", pageparmission?.Userinfo?.id);
  //     formdata.append("subtotal", this.state.total);
  //     formdata.append("total", this.state.total);
  //     formdata.append("supplier_id", this.state.SelectedSupplier);
  //     // formdata.append("order_trans", "JSON.stringify(this.state.SelectedData)");
  //     formdata.append("order_trans", JSON.stringify(this.state.SelectedData));
  //     if (this.state.SelectedSupplier) {
  //       axiosConfig
  //         .post(`/create_order`, formdata)
  //         .then((res) => {
  //           console.log(res.data?.success);
  //           if (res.data?.success) {
  //             toast.success(`Product Assigned`);
  //             swal("Order Created Succesfully");
  //             this.setState({ SelectedData: [] });
  //             this.props.history.push("/app/freshlist/order/all");
  //           }
  //         })
  //         .catch((err) => {
  //           // console.log(err.response?.data?.message);
  //           if (err.response?.data?.message) {
  //             swal("Error", `${err.response?.data?.message}`);
  //           }
  //           this.setState({ SelectedData: [] });
  //         });
  //     } else {
  //       toast.error("No Supplier Selected");
  //     }
  //   };
  render() {
    const { rowData, columnDefs, defaultColDef } = this.state;
    return (
      <>
        <ToastContainer />
        <Row className="app-user-list">
          <Col sm="12">
            <Card>
              <Row className="m-2">
                <Col>
                  <h1 col-sm-6 className="float-left">
                    Assigned Client List
                  </h1>
                </Col>
              </Row>
              <CardBody>
                {this.state.rowData === null ? null : (
                  <>
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
                          {/* <div className=" mr-1">
                          <FormGroup>
                            <label className=""> Choose Type *</label>
                          </FormGroup>
                        </div>
                        <div className=" mr-1">
                          <FormGroup>
                            <select
                              onChange={(e) => {
                                this.setState({ Type: e.target.value });
                                this.updateSearchQuery(e.target.value);
                              }}
                              className="form-control"
                              name="Select"
                              id="Select"
                            >
                              <option value="">--Select Type--</option>
                              {this.state.Typelist &&
                                this.state.Typelist?.map((val, i) => (
                                  <option key={i} value={val?.product_type}>
                                    {val?.product_type}
                                  </option>
                                ))}
                            </select>
                          </FormGroup>
                        </div> */}
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
                            // rowSelection="multiple"
                            defaultColDef={defaultColDef}
                            columnDefs={columnDefs}
                            rowData={rowData}
                            onGridReady={this.onGridReady}
                            colResizeDefault={"shift"}
                            animateRows={true}
                            floatingFilter={false}
                            pagination={true}
                            enableRangeSelection={true}
                            rowSelection={true}
                            paginationPageSize={this.state.paginationPageSize}
                            pivotPanelShow="always"
                            enableRtl={context.state.direction === "rtl"}
                          />
                        )}
                      </ContextLayout.Consumer>
                    </div>
                  </>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    );
  }
}
export default AssignedCLientlist;
