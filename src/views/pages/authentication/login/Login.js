import React from "react";
import {
  Container,
  CardTitle,
  FormGroup,
  Input,
  Label,
  Button,
  CardHeader,
  Card,
  Col,
  Row,
  Form,
  TabContent,
  TabPane,
} from "reactstrap";
// import classnames from "classnames";
// import logo from "../../../../assets/img/logo/logo.ico";
import logo from "../../../../assets/img/logo/paravilogo.jpeg";
//import loginImg from "../../../../assets/img/pages/login.png";
import "../../../../assets/scss/pages/authentication.scss";
import { history } from "../../../../history";
import LoginAuth0 from "./LoginAuth0";
import LoginFirebase from "./LoginFirebase";
import LoginJWT from "./LoginJWT";
import { connect } from "react-redux";
// import UserContext from "../../../../context/Context";

import swal from "sweetalert";
import axiosConfig from "../../../../axiosConfig";

class Login extends React.Component {
  // static contextType = UserContext;

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      resetpassword: false,
      // rowData: {},
    };
  }
  handlechange = (e) => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  loginHandler = (e) => {
    e.preventDefault();
    const fromdata = new FormData();
    fromdata.append("username", this.state.email);
    fromdata.append("password", this.state.password);
    // console.log(this.state.email);
    // console.log(this.state.password);
    axiosConfig
      .post("/usersign", fromdata)
      .then((response) => {
        let msg = response.data?.success;
        if (msg) {
          localStorage.setItem("userData", JSON.stringify(response.data?.data));
          setTimeout(() => {
            this.props.history.push("/dashboard");
          }, 2000);
          swal(
            "Sucessfully login",
            "You are LoggedIn!",
            "Success",

            {
              buttons: {
                ok: { text: "Ok", value: "ok" },
                // catch: { text: "Cancel ", value: "catch" },
              },
            }
          ).then((value) => {
            switch (value) {
              case "ok":
                // window.location.reload();
                break;
              default:
            }
          });
        }
      })
      .catch((error) => {
        // console.log(error.response?.data.success);
        let msg = error.response?.data.success;

        if (!msg) {
          swal("Error", "Invalid Username or Password");
        }
        // swal("Error!", "Invalid! Email or Password ", "error");
      });
  };
  changepassword = (e) => {
    e.preventDefault();
    debugger;
    let formdata = new FormData();
    formdata.append("email", this.state.email);
    formdata.append("base_url", "this.state.password");
    // console.log(this.state.email);
    // console.log(this.state.password);
    axiosConfig
      .post("/forgetPasswordEmailVerify", formdata)
      .then((res) => {
        console.log(res);
        this.setState({ resetpassword: false });
        swal("Email has been sent to Your Mail id", "Please Check and verify");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <Container>
        <Row className="m-0 justify-content-center">
          <Col
            sm="5"
            xl="5"
            lg="5"
            md="5"
            className="d-flex justify-content-center"
          >
            <Card className="bg-authentication login-card rounded-0 mb-0 w-100">
              <Row className="m-0">
                <Col lg="12" md="12" className="p-1">
                  <Card className="rounded-0 mb-0 px-2 login-tabs-container">
                    <div className="logo-box text-center p-2">
                      <img
                        src={logo}
                        alt="loginImg"
                        width="210px"
                        height="150px"
                      />
                    </div>

                    {this.state.resetpassword ? (
                      <>
                        <CardHeader className="pb-1">
                          <CardTitle>
                            <h4 className="mb-0">
                              <strong>Email Verification</strong>
                            </h4>
                          </CardTitle>
                        </CardHeader>
                        <p className="px-2 auth-title mb-2">
                          Welcome , Please Enter details.
                        </p>
                        <Form onSubmit={this.changepassword}>
                          <Label>Email</Label>
                          <FormGroup className="form-label-group position-relative has-icon-left">
                            <Input
                              type="email"
                              name="email"
                              placeholder="Username"
                              value={this.state.email}
                              onChange={this.handlechange}
                              // required
                            />
                          </FormGroup>
                          <div className="d-flex justify-content-center">
                            <Button.Ripple color="primary" type="submit">
                              Submit
                            </Button.Ripple>
                          </div>
                        </Form>
                      </>
                    ) : (
                      <>
                        <CardHeader className="pb-1">
                          <CardTitle>
                            <h4 className="mb-0">
                              <strong>Login</strong>
                            </h4>
                          </CardTitle>
                        </CardHeader>
                        <p className="px-2 auth-title mb-2">
                          Welcome back, Please login to your account.
                        </p>
                        <Form onSubmit={this.loginHandler}>
                          <Label>UserName</Label>
                          <FormGroup className="form-label-group position-relative has-icon-left">
                            <Input
                              type="text"
                              name="email"
                              placeholder="Username"
                              value={this.state.email}
                              onChange={this.handlechange}
                              // required
                            />
                          </FormGroup>

                          <Label>Password</Label>
                          <FormGroup className="form-label-group position-relative has-icon-left">
                            <Input
                              type="password"
                              name="password"
                              placeholder="Password"
                              value={this.state.password}
                              onChange={this.handlechange}
                              // required
                            />
                          </FormGroup>

                          <div className="d-flex justify-content-between">
                            <Button.Ripple
                              color="primary"
                              outline
                              onClick={(e) => {
                                e.preventDefault();
                                this.setState({ resetpassword: true });
                              }}
                              // onClick={() => {
                              //   history.push("/pages/reset-password");
                              // }}
                            >
                              Forget Password
                            </Button.Ripple>
                            <Button.Ripple color="primary" type="submit">
                              Login
                            </Button.Ripple>
                            <TabContent activeTab={this.state.activeTab}>
                              <TabPane tabId="1">
                                <LoginJWT />
                              </TabPane>
                              <TabPane tabId="2">
                                <LoginFirebase />
                              </TabPane>
                            </TabContent>
                          </div>
                        </Form>
                      </>
                    )}
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    values: state.auth.login,
  };
};
export default connect(mapStateToProps)(Login);
