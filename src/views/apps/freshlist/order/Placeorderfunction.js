import React, { useState, useEffect } from "react";
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
import { timers } from "jquery";
import swal from "sweetalert";
import { BsFillCartCheckFill } from "react-icons/bs";
import { de } from "date-fns/locale";
export const Placeorderfunction = () => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [ProductQuantity, setProductQuantity] = useState("0");
  const [product, setProduct] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [Typelist, setTypelist] = useState([]);
  const [SelectedProduct, setSelectedProduct] = useState([]);
  const [Type, setType] = useState("");
  const [productlength, setProductLength] = useState("");
  const [Addedbtn, setAddedBtn] = useState(false);
  const [Viewpermisson, setViewPermission] = useState(null);
  const [Editpermisson, setEditPermission] = useState(null);
  const [Createpermisson, setCreatePermission] = useState(null);
  const [Deletepermisson, setDeletePermission] = useState(null);
  const [paginationPageSize, setPaginationPageSize] = useState(20);
  const [currenPageSize, setCurrenPageSize] = useState("");
  const [getPageSize, setGetPageSize] = useState("");
  const [value, setValue] = useState(""); // This is not mentioned in your initial code

  const defaultColDef = {
    sortable: true,
    resizable: true,
    suppressMenu: true,
  };

  const columnDefs = [
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
      field: "myQuantity",
      width: 260,
      cellRendererFramework: (params) => {
        const currentQuantity = (params?.myQuantity && params?.myQuantity) || 0;
        console.log(currentQuantity);
        console.log(params.myQuantity);
        return (
          <div className="d-flex align-items-center cursor-pointer">
            <div className="d-flex">
              <input
                style={{ position: "relative" }}
                // value={currentQuantity}
                onChange={(e) =>
                  handleQuantityChange(
                    params.data ? params.data.id : null,
                    e.target.value
                  )
                }
                // onChange={(e) => {
                //   handleQuantityChange(e);

                //   //   setProductQuantity(e.target.value);
                // }}
                type="number"
                className="form-control"
              />

              <Button
                // disabled={
                //   ProductQuantity && state.ProductQuantity > 0
                //     ? false
                //     : true
                // }
                onClick={(e) => {
                  handleAddToCart(e, params?.data);
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
                Add {ProductQuantity && ProductQuantity}
              </Button>
            </div>
          </div>
        );
      },
    },
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
  ];

  const handleQuantityChange = (id, newQuantity) => {
    debugger;
    let produtlist = JSON.parse(localStorage.getItem("Productlist"));
    console.log(produtlist);
    const updatedRowData = produtlist?.map((row) => {
      if (row?.id == id) {
        return { ...row, myQuantity: newQuantity };
      }
      return row;
    });
    console.log(updatedRowData);
    localStorage.setItem("Productlist", JSON.stringify(updatedRowData));

    // setProductQuantity(newQuantity);
    // setRowData(updatedRowData);
  };

  useEffect(() => {
    async function fetchData() {
      let pageparmission = JSON.parse(localStorage.getItem("userData"));

      let newparmisson = pageparmission?.role?.find(
        (value) => value?.pageName === "Place Order"
      );

      setViewPermission(newparmisson?.permission.includes("View"));
      setCreatePermission(newparmisson?.permission.includes("Create"));
      setEditPermission(newparmisson?.permission.includes("Edit"));
      setDeletePermission(newparmisson?.permission.includes("Delete"));

      const formdata = new FormData();
      formdata.append("user_id", pageparmission?.Userinfo?.id);
      formdata.append("role", pageparmission?.Userinfo?.role);

      const [cartResponse, productResponse, typeResponse] = await Promise.all([
        axiosConfig.post(`/viewcart`, formdata),
        axiosConfig.post("/getUserAssignproductList", formdata),
        axiosConfig.post("/producttypelistview", formdata),
      ]);

      setProductLength(cartResponse.data?.data?.length);

      localStorage.setItem(
        "Productlist",
        JSON.stringify(productResponse.data?.data[0]?.products)
      );
      setRowData(productResponse.data?.data[0]?.products);
      setTypelist(typeResponse?.data?.data);
    }

    fetchData();
  }, []);

  useEffect(() => {
    console.log(rowData);
  }, [ProductQuantity]);

  const handleAddToCart = (e, data) => {
    e.preventDefault();
    let pageparmission = JSON.parse(localStorage.getItem("userData"));
    const formdata = new FormData();
    formdata.append("qty", ProductQuantity);
    formdata.append("user_id", pageparmission?.Userinfo?.id);
    formdata.append("product_id", data?.id);
    formdata.append("price", data?.price);
    if (ProductQuantity > 0) {
      axiosConfig
        .post(`/add_to_cart`, formdata)
        .then((res) => {
          setProductQuantity("");
          toast.success(`${ProductQuantity} Product Added`);
          // fetchData();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // swal("Add Quantity first");
    }
  };
  const runthisfunction = async (id) => {
    console.log(id);
    let data = new FormData();
    data.append("id", id);
    await axiosConfig
      .post("/deleteproduct", data)
      .then((resp) => {
        console.log(resp);
        fetchData(); // Assuming you have a fetchData function to refresh the data.
      })
      .then((response) => {
        console.log(response);
      });
  };
  const onGridReady = (params) => {
    // gridApi = params.api;
    setGridApi(params.api);
    // gridColumnApi = params.columnApi;
    setGridColumnApi(params.columnApi);
    // setCurrenPageSize(gridApi.paginationGetCurrentPage() + 1);
    // setGetPageSize(gridApi.paginationGetPageSize());
  };
  const updateSearchQuery = (val) => {
    setValue(val);
    gridApi.setQuickFilter(val);
  };
  const filterSize = (val) => {
    if (gridApi) {
      gridApi.paginationSetPageSize(Number(val));
      setCurrenPageSize(val);
      setGetPageSize(val);
    }
  };
  return (
    <div>
      <>
        <ToastContainer />

        <Row className="app-user-list">
          <Col sm="12">
            <Card>
              <Row className="m-2">
                <Col>
                  <h1 col-sm-6 className="float-left">
                    Place Order
                  </h1>
                </Col>

                <Col lg="3">
                  {productlength && productlength > 0 ? (
                    <>
                      <Route
                        render={({ history }) => (
                          <Button
                            className="float-right mt-1 mx-2"
                            color="primary"
                            // size="sm"
                            onClick={() => {
                              // localStorage.setItem(
                              //   "SelectedProduct",
                              //   JSON.stringify(productlength)
                              // );
                              history.push(
                                "/app/freshlist/order/Selectedorder"
                              );
                            }}
                          >
                            View Cart
                            <sup>{productlength}</sup>
                          </Button>
                        )}
                      />
                    </>
                  ) : null}

                  <Route
                    render={({ history }) => (
                      <Button
                        className="float-right mt-1 "
                        color="primary"
                        onClick={() => history.push("/app/freshlist/order/all")}
                      >
                        Back
                      </Button>
                    )}
                  />
                </Col>
              </Row>
              <CardBody>
                {rowData === null ? null : (
                  <div className="ag-theme-material w-100 my-2 ag-grid-table">
                    <div className="d-flex flex-wrap justify-content-between align-items-center">
                      <div className="mb-1">
                        <UncontrolledDropdown className="p-1 ag-dropdown">
                          <DropdownToggle tag="div">
                            {gridApi
                              ? currenPageSize
                              : "" * getPageSize - (getPageSize - 1)}{" "}
                            -{" "}
                            {rowData?.length - currenPageSize * getPageSize > 0
                              ? currenPageSize * getPageSize
                              : rowData?.length}
                            of {rowData?.length}
                            <ChevronDown className="ml-50" size={15} />
                          </DropdownToggle>
                          <DropdownMenu right>
                            <DropdownItem
                              tag="div"
                              onClick={() => filterSize(20)}
                            >
                              20
                            </DropdownItem>
                            <DropdownItem
                              tag="div"
                              onClick={() => filterSize(10)}
                            >
                              10
                            </DropdownItem>
                            <DropdownItem
                              tag="div"
                              onClick={() => filterSize(50)}
                            >
                              50
                            </DropdownItem>
                            <DropdownItem
                              tag="div"
                              onClick={() => filterSize(100)}
                            >
                              100
                            </DropdownItem>
                            <DropdownItem
                              tag="div"
                              onClick={() => filterSize(134)}
                            >
                              134
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </div>
                      <div className="d-flex flex-wrap justify-content-between mb-1">
                        <div className=" mr-1">
                          <FormGroup>
                            <label className=""> Choose Type *</label>
                          </FormGroup>
                        </div>
                        <div className=" mr-1">
                          <FormGroup>
                            <select
                              onChange={(e) => {
                                setType(e.target.value);
                                updateSearchQuery(e.target.value);
                              }}
                              className="form-control"
                              name="Select"
                              id="Select"
                            >
                              <option value="">--Select Type--</option>
                              {Typelist &&
                                Typelist?.map((val, i) => (
                                  <option key={i} value={val?.product_type}>
                                    {val?.product_type}
                                  </option>
                                ))}
                            </select>
                          </FormGroup>
                        </div>
                        <div className="table-input mr-1">
                          <Input
                            placeholder="search..."
                            onChange={(e) => updateSearchQuery(e.target.value)}
                            value={value}
                          />
                        </div>
                        <div className="export-btn">
                          <Button.Ripple
                            color="primary"
                            onClick={() => gridApi.exportDataAsCsv()}
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
                          onGridReady={onGridReady}
                          colResizeDefault={"shift"}
                          animateRows={true}
                          floatingFilter={false}
                          pagination={true}
                          paginationPageSize={paginationPageSize}
                          pivotPanelShow="always"
                          enableRtl={context.state.direction === "rtl"}
                        />
                      )}
                    </ContextLayout.Consumer>
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    </div>
  );
};
