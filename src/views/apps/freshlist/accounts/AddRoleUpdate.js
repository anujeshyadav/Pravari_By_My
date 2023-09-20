import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Card, Button, Label, Input, Form } from "reactstrap";
import { Roles } from "./AddRole";
import axios from "axios";
import axiosConfig from "../../../../axiosConfig";
import swal from "sweetalert";
import { BsFillArrowDownCircleFill } from "react-icons/bs";

export default function AddRoleNew() {
  const [Desc, setDesc] = useState("");
  const [Role, setRole] = useState("");
  const [Selected, setSelected] = useState([]);
  const [SelectedIndex, setIndex] = useState("");
  const [show, setShow] = useState(false);

  // const navigate = useNavigate();

  const handleSelectPage = (value, checked, permit, title, ele) => {
    if (checked) {
      const newarrry = Selected.map((val, i) => {
        let x = val?.pagename;
        if (x === title) {
          const newperset = Selected[i].permission.includes(permit);

          if (newperset) {
            // console.log(newperset);
          } else {
            // console.log(newperset);
            let arr = Selected[i].permission.push(permit);
            // console.log(arr);
          }
        } else {
          const found = Selected.find(
            (element, i) => element.pagename === title
          );
          let newfound = found?.pagename === title;
          if (newfound === false) {
            const newarr = Selected.concat({
              pagename: title,
              permission: [permit],
            });
            setSelected(newarr);
          }
        }
      });
      if (Selected.length < 1) {
        const newarr = Selected.concat({
          pagename: title,
          permission: [permit],
        });
        setSelected(newarr);
      }
    } else {
      let remove = Selected?.map((ele, i) => {
        let y = ele?.pagename;
        if (title === y) {
          ele?.permission.splice(ele?.permission.indexOf(permit), 1);
        }
        if (ele?.permission.length === 0) {
          Selected.splice(i, 1);
        }
      });
    }
  };
  useEffect(() => {
    console.log(Selected);
  }, [Selected]);

  const handleSumit = (e) => {
    e.preventDefault();
    let userdata = JSON.parse(localStorage.getItem("userData"));

    let formdata = new FormData();

    formdata.append("user_id", userdata?.Userinfo?.id);
    formdata.set("role_name", Role);
    formdata.set("description", Desc);
    formdata.set("selectedarray", JSON.stringify(Selected));

    axiosConfig
      .post(`/addroles`, formdata)
      .then((res) => {
        console.log(res);
        swal("Success", "Role Created");
        setSelected("");
        setDesc("");
        setRole("");
        var checkboxes = document.getElementsByName("check");
        for (var checkbox of checkboxes) {
          checkbox.checked = false;
        }
      })
      .catch((er) => {
        console.log(er);
      });
  };
  const handlesetparent = (value, index) => {
    // console.log(value);
    // console.log(index);
    setShow(value);
    setIndex(index);
  };
  return (
    <>
      <Row className="">
        <Col xl={12}>
          <Card>
            <div className="container" />
            <Form onSubmit={handleSumit}>
              <div className="container mt-5">
                <Row className="mb-3 container">
                  <Col>
                    <Label>Enter Role *</Label>
                    <Input
                      required
                      value={Role}
                      onChange={(e) => setRole(e.target.value)}
                      type="text"
                      placeholder="Enter Role"
                      className="form-control"
                    />
                  </Col>
                  <Col>
                    <Label>Enter Role Description * </Label>
                    <Input
                      required
                      value={Desc}
                      onChange={(e) => setDesc(e.target.value)}
                      type="text"
                      placeholder="Enter Role Desc.."
                      // className="form-control"
                    />
                  </Col>
                </Row>
              </div>
              <section className="mt-5 container">
                <Row className="gy-0 container">
                  {Roles &&
                    Roles?.map((value, index) => (
                      <Col
                        key={index}
                        style={{
                          borderRadius: "12px",
                          // background: "#e5dfdf26",
                          height: `${
                            show && SelectedIndex === index ? "340px" : "40px"
                          }`,
                        }}
                        className="customcol gy-0 mb-2 "
                        lg="12"
                        md="12"
                        sm="12"
                      >
                        <Row
                          style={{
                            lineHeight: "44px",
                            borderRadius: "6px",
                            background: "#f7f7f8",
                          }}
                          className="roleheading"
                        >
                          <Col className="gy-2" lg="4" sm="4" md="4">
                            <div className="align-item-center">
                              <input
                                className="mt-1"
                                name="check"
                                id={`head_${value?.title}`}
                                onClick={(e) => {
                                  handlesetparent(e.target.checked, index);
                                  handleSelectPage(
                                    e.target.value,
                                    e.target.checked,
                                    "parentPermit",
                                    value?.title,
                                    index
                                  );
                                }}
                                style={{
                                  height: "19px",
                                  width: "26px",
                                }}
                                type="checkbox"
                              />

                              <span className="mx-3 gy-0">{value?.title}</span>
                            </div>
                          </Col>
                          <Col className="gy-2">
                            <div className="d-flex justify-content-center">
                              <span className="mx-3"> View</span>
                            </div>
                          </Col>
                          <Col className="gy-2">
                            <div className="d-flex justify-content-center">
                              <span className="mx-3"> Create</span>
                            </div>
                          </Col>
                          <Col className="gy-2">
                            <div className="d-flex justify-content-center">
                              <span className="mx-3"> Edit</span>
                            </div>
                          </Col>
                          <Col className="gy-2">
                            <div className="d-flex justify-content-center">
                              <span className="mx-3"> Delete</span>
                            </div>
                          </Col>
                        </Row>

                        {show && SelectedIndex === index ? (
                          <>
                            <div className="container">
                              <div className="gy-2 mt-2">
                                {value?.TabName?.map((ele, i) => (
                                  <>
                                    <Row key={i} className="">
                                      <Col lg="4" sm="4" md="4">
                                        <h6 className="mt-1"> {ele?.title}</h6>
                                      </Col>
                                      {ele?.permission?.map((permit, ind) => (
                                        <Col key={ind} lg="2" md="2" sm="2">
                                          <div className="d-flex justify-content-center">
                                            <input
                                              name="check"
                                              id={`item_${permit}`}
                                              onClick={(e) => {
                                                handleSelectPage(
                                                  e.target.value,
                                                  e.target.checked,
                                                  permit,
                                                  ele.title,
                                                  ind
                                                );
                                              }}
                                              style={{
                                                height: "19px",
                                                width: "26px",
                                              }}
                                              type="checkbox"
                                            />
                                          </div>
                                        </Col>
                                      ))}
                                    </Row>
                                  </>
                                ))}
                              </div>
                            </div>
                          </>
                        ) : null}
                      </Col>
                    ))}
                </Row>
                <Row>
                  <Col>
                    <div className="d-flex justify-content-center mb-2">
                      <Button
                        type="submit"
                        style={{ cursor: "pointer" }}
                        color="primary"
                      >
                        Submit
                      </Button>
                    </div>
                  </Col>
                </Row>
              </section>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
}
