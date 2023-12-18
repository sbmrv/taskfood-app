import PropTypes from "prop-types"
import React, { useEffect, useState } from "react"
import axios from "axios"
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardImg,
  CardBody,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  CardText,
  CardTitle,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  CardSubtitle,
  TabPane,
  Form,
  Label,
} from "reactstrap"

import card1 from "../../assets/images/_cards/card1.jpg"
import card2 from "../../assets/images/_cards/card2.jpg"
import card3 from "../../assets/images/_cards/card3.jpg"
import card4 from "../../assets/images/_cards/card4.jpg"

import img3 from "../../assets/images/small/img-3.jpg"
import { Link } from "react-router-dom"

import classnames from "classnames"
//import Charts
import StackedColumnChart from "./StackedColumnChart"

//import action
import { getChartsData as onGetChartsData } from "../../store/actions"

import modalimage1 from "../../assets/images/product/img-7.png"
import modalimage2 from "../../assets/images/product/img-4.png"

// Pages Components
import WelcomeComp from "./WelcomeComp"
import MonthlyEarning from "./MonthlyEarning"
import SocialSource from "./SocialSource"
import ActivityComp from "./ActivityComp"
import TopCities from "./TopCities"
import LatestTranaction from "./LatestTranaction"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"

//i18n
import { withTranslation } from "react-i18next"

//redux
import { useSelector, useDispatch } from "react-redux"
import Dropzone from "react-dropzone"

const Dashboard = props => {
  const [modal, setmodal] = useState(false)
  const [subscribemodal, setSubscribemodal] = useState(false)

  const { chartsData } = useSelector(state => ({
    chartsData: state.Dashboard.chartsData,
  }))

  const reports = [
    { title: "Orders", iconClass: "bx-copy-alt", description: "1,235" },
    { title: "Revenue", iconClass: "bx-archive-in", description: "$35, 723" },
    {
      title: "Average Price",
      iconClass: "bx-purchase-tag-alt",
      description: "$16.2",
    },
  ]

  useEffect(() => {
    getAllDishes()
  }, [])

  // useEffect(() => {
  //   setTimeout(() => {
  //     getAllDishes()
  //   }, 2000)
  // }, [])

  const [periodData, setPeriodData] = useState([])
  const [periodType, setPeriodType] = useState("yearly")

  // const [isEnableScroll, setIsEnableScroll] = useState(false)

  useEffect(() => {
    setPeriodData(chartsData)
  }, [chartsData])
  // custom tabs
  const [customActiveTab, setcustomActiveTab] = useState("1")
  const toggleCustom = tab => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab)
    }
  }
  // custom tabs
  const onChangeChartPeriod = pType => {
    setPeriodType(pType)
    dispatch(onGetChartsData(pType))
  }

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(onGetChartsData("yearly"))
  }, [dispatch])

  // add dish apicall
  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState("")
  const [selectedType, setSelectedType] = useState("")

  const handleTypeChange = event => {
    setSelectedType(event.target.value)
  }

  const [base64Image, setBase64Image] = useState("")
  const [dishes, setDishes] = useState([])
  //search functionality:
  const [isSearch, setSearch] = useState(false)
  const [filteredDishes, setFilteredDishes] = useState(dishes)
  const [menuItem, setMenuItem] = useState("")
  const [showPopup, setShowPopup] = useState(false)

  const searchMenuItem = value => {
    setMenuItem(value)

    // Perform the search logic here
    const filteredItems = dishes.filter(dish =>
      dish.name.toLowerCase().includes(value.toLowerCase())
    )

    setFilteredDishes(filteredItems)

    // Log details of filtered dishes to console
    console.log("Filtered Dishes:", filteredItems)
    setShowPopup(value !== "" && filteredItems.length > 0)
  }

  const handleFileChange = async event => {
    const file = event.target.files[0]
    const base = await convertImageToBase64(file)
    console.log(base)
    setBase64Image(base)
  }
  function convertImageToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = () => {
        resolve(reader.result)
      }

      reader.onerror = error => {
        reject(error)
      }

      reader.readAsDataURL(file)
    })
  }
  const handleSubmit = async e => {
    e.preventDefault()
    const formData = {
      name,
      price,
      selectedType,
      description,
      base64Image,
    }
    console.log("hahaha", formData)

    try {
      const response = await axios.post(
        "http://localhost:8000/users/addNewDish",
        formData,
        {
          headers: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTc2ZjZiNDRmNmE2MTMyYzQyOTU4YWMiLCJpYXQiOjE3MDI1MzYwMDksImV4cCI6MTcwMzE0MDgwOX0.8RTMu3DbjeXwXyWYed_Lv1TheAJMKJI2QwaDyfQnAUc",
          },
        }
      )

      if (response) {
        setmodal(false)

        console.log("Dish created successfully!", response)
        getAllDishes()
      } else {
        console.error("Error creating dish", response.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  // get all dish items
  const getAllDishes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/users/getAllDish`,
        {
          headers: {
            token:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTc2ZjZiNDRmNmE2MTMyYzQyOTU4YWMiLCJpYXQiOjE3MDI1MzYwMDksImV4cCI6MTcwMzE0MDgwOX0.8RTMu3DbjeXwXyWYed_Lv1TheAJMKJI2QwaDyfQnAUc",
          },
        }
      )
      setDishes(response.data)
      console.log("all the dishes", dishes)
    } catch (err) {
      console.error("error in fetching dishes", err)
    }
  }
  document.title = "Dashboard | Skote - React Admin & Dashboard Template"

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Card>
            <CardBody>
              <div
                className="font-size-15 d-flex justify-content-center"
                style={{ height: "100px", marginTop:"-20px" }}
              >
                <h3>MENU</h3>
              </div>
              {/* addmenu modal */}
              <Card>
                <CardBody
                  className="d-flex justify-content-between"
                  style={{
                    alignItems: "center",
                    height: "120px",
                    width: "100%",
                    position: "absolute",
                    zIndex: "2",
                    paddingTop: "-50px",
                    marginTop: "-80px",
                  }}
                >
                  {/* add dish */}
                  <div className="d-flex justify-content-between p-4 gap-2">
                    <h4>Add Dish Here{". . ."} </h4>
                    <button
                      onClick={() => {
                        setmodal(!modal)
                      }}
                      href="#"
                      className="popup-form btn"
                      style={{
                        backgroundColor: "#A97959",
                        color: "white",
                      }}
                    >
                      <i className="bx bx-add-to-queue"></i> Add Dish
                    </button>
                  </div>
                  {/* searchbar */}
                  <div style={{ zIndex: "10", margin: "auto 20px" }}>
                    <form className="app-search d-none d-lg-block">
                      <div
                        className="position-relative"
                        style={{
                          border: "1px solid grey",
                          borderRadius: "30px",
                        }}
                      >
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search..."
                          value={menuItem}
                          onChange={e => searchMenuItem(e.target.value)}
                        />
                        <span className="bx bx-search-alt" />
                      </div>
                      {showPopup && (
                        <div
                          className="popup-card"
                          style={{
                            filter: "blur 4px",
                            backgroundColor: "#ccc",
                            padding: "20px",
                            translate: "0px -20px",
                            zIndex: -1,
                            width: "100%",
                            borderRadius: "0 0 30px 30px",
                            display: "flex",
                            justifyContent: "center",
                            margin: "auto",
                            position: "relative",
                          }}
                        >
                          <div className="popup-content">
                            <button
                              onClick={() => setShowPopup(false)}
                              style={{
                                color: "red",
                                backgroundColor: "#dadada",
                                margin: "5px 0 0 220px",
                                border: "none",
                              }}
                            >
                              X
                            </button>
                            <h5>Search Results</h5>
                            <ul style={{ listStyle: "none", margin: "auto" }}>
                              {filteredDishes.map(dish => (
                                <Card
                                  key={dish.id}
                                  style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    padding: "10px",
                                  }}
                                >
                                  <div>
                                    <CardImg
                                      className="img-fluid rounded-circle"
                                      src={dish.base64Image}
                                      style={{
                                        height: "50px",
                                        width: "50px",
                                      }}
                                      alt="Skote"
                                    />
                                  </div>
                                  <div
                                    style={{
                                      width: "60%",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    {dish.name}...${dish.price}
                                  </div>
                                </Card>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </form>
                    <div className="dropdown d-inline-block d-lg-none ms-2">
                      <button
                        type="button"
                        className="btn header-item noti-icon "
                        id="page-header-search-dropdown"
                        onClick={() => setSearch(!isSearch)}
                      >
                        <i className="mdi mdi-magnify" />
                      </button>
                      <div
                        className={
                          isSearch
                            ? "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 show"
                            : "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                        }
                        aria-labelledby="page-header-search-dropdown"
                      >
                        <form className="p-3">
                          <div className="form-group m-0">
                            <div className="input-group">
                              <input
                                type="text"
                                className="form-control"
                                placeholder={props.t("Search") + "..."}
                                aria-label="Recipient's username"
                              />
                              <div className="input-group-append">
                                <button
                                  className="btn btn-success"
                                  type="submit"
                                >
                                  <i className="mdi mdi-magnify" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <Modal
                    size="md"
                    isOpen={modal}
                    toggle={() => {
                      setmodal(!modal)
                    }}
                  >
                    <ModalHeader
                      toggle={() => {
                        setmodal(!modal)
                      }}
                    >
                      Add Dish
                    </ModalHeader>
                    <ModalBody>
                      <form onSubmit={handleSubmit}>
                        <Row>
                          <input type="file" onChange={handleFileChange} />
                        </Row>
                        <Row>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label htmlFor="name">Dish </label>
                              <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                id="name"
                                placeholder="Enter dish name"
                              />
                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label htmlFor="name">price</label>
                              <input
                                type="number"
                                value={price}
                                onChange={event => setPrice(event.target.value)}
                                className="form-control"
                                id="price"
                                placeholder="Enter dish price"
                              />
                            </div>
                          </Col>
                        </Row>

                        <Row>
                          <Col xl={3} sm={6}>
                            <div className="mt-4">
                              <h5 className="font-size-14 mb-4">type course</h5>
                              <div className="form-check mb-3">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="exampleRadios"
                                  id="exampleRadios1"
                                  value="main course"
                                  onChange={handleTypeChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="exampleRadios1"
                                >
                                  Main Course
                                </label>
                              </div>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="exampleRadios"
                                  id="exampleRadios2"
                                  value="side dishes"
                                  onChange={handleTypeChange}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="exampleRadios2"
                                >
                                  Side Dishes
                                </label>
                              </div>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={12}>
                            <div className="mb-3">
                              <label htmlFor="subject">Description</label>
                              <textarea
                                className="form-control"
                                id="subject"
                                rows="3"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                              />
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg={12}>
                            <div className="text-end">
                              <button type="submit" className="btn btn-primary">
                                ADD
                              </button>
                            </div>
                          </Col>
                        </Row>
                      </form>
                    </ModalBody>
                  </Modal>
                </CardBody>
              </Card>
              {/* addmenu modal end */}
              <div style={{ position: "relative" }}>
                <Nav tabs className="nav-tabs-custom nav-justified">
                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: customActiveTab === "1",
                      })}
                      onClick={() => {
                        toggleCustom("1")
                      }}
                    >
                      <span className="d-block d-sm-none">
                        <i className="bx bx-dish"></i>
                      </span>
                      <span className="d-none d-sm-block">Main Courses</span>
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className={classnames({
                        active: customActiveTab === "2",
                      })}
                      onClick={() => {
                        toggleCustom("2")
                      }}
                    >
                      <span className="d-block d-sm-none">
                        <i className="bx bxs-drink"></i>
                      </span>
                      <span className="d-none d-sm-block">Side Dishes</span>
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent
                  activeTab={customActiveTab}
                  className="p-3 text-mute"
                >
                  <TabPane tabId="1" className="mt-2">
                    <Row className="d-flex">
                      {dishes
                        .filter(dish => dish.selectedType === "main course")
                        .map(dish => (
                          <Col md={6} sm="6" key={dish._id}>
                            <CardText>
                              <Row>
                                <Col lg={12}>
                                  <Card className="p-2">
                                    <Row className="no-gutters align-items-center">
                                      <Col md={4}>
                                        <CardImg
                                          className="img-fluid rounded-circle"
                                          rounded-circle
                                          src={dish.base64Image}
                                          alt="Skote"
                                        />
                                      </Col>
                                      <Col md={8}>
                                        <CardBody>
                                          <CardTitle className="d-flex justify-content-between">
                                            {dish.name}
                                            <span className="">
                                              ...${dish.price}
                                            </span>
                                          </CardTitle>
                                          <CardText>
                                            {dish.description}
                                          </CardText>
                                        </CardBody>
                                      </Col>
                                    </Row>
                                  </Card>
                                </Col>
                                <br />
                                {/* <Col lg={6}>
                              <Card>
                                <Row className="no-gutters align-items-center">
                                  <Col md={4}>
                                    <CardImg
                                      className="img-fluid rounded-circle"
                                      rounded-circle
                                      src={card3}
                                      alt="Skote"
                                    />
                                  </Col>
                                  <Col md={8}>
                                    <CardBody>
                                      <CardTitle>{dish.name}</CardTitle>
                                      <CardText>
                                        This is a wider card with supporting
                                        text below as a natural lead-in to
                                        additional content.
                                      </CardText>
                                    </CardBody>
                                  </Col>
                                </Row>
                              </Card>
                            </Col> */}
                              </Row>
                            </CardText>
                          </Col>
                        ))}
                    </Row>
                  </TabPane>

                  <TabPane tabId="2" className="mt-2">
                    <Row className="d-flex">
                      {dishes
                        .filter(dish => dish.selectedType === "side dishes")
                        .map(dish => (
                          <Col key={dish._id} md={6} sm="6">
                            <CardText>
                              <Row>
                                <Col lg={12}>
                                  <Card className="p-2">
                                    <Row className="no-gutters align-items-center">
                                      <Col md={4}>
                                        <CardImg
                                          className="img-fluid rounded-circle"
                                          rounded-circle
                                          src={dish.base64Image}
                                          alt="Skote"
                                        />
                                      </Col>
                                      <Col md={8}>
                                        <CardBody>
                                          <CardTitle className="d-flex justify-content-between">
                                            {dish.name}
                                            <span className="">
                                              ...${dish.price}
                                            </span>
                                          </CardTitle>
                                          <CardText>
                                            {dish.description}
                                          </CardText>
                                        </CardBody>
                                      </Col>
                                    </Row>
                                  </Card>
                                </Col>
                                <br />
                                {/* <Col lg={6}>
                              <Card>
                                <Row className="no-gutters align-items-center">
                                  <Col md={4}>
                                    <CardImg
                                      className="img-fluid rounded-circle"
                                      rounded-circle
                                      src={card3}
                                      alt="Skote"
                                    />
                                  </Col>
                                  <Col md={8}>
                                    <CardBody>
                                      <CardTitle>{dish.name}</CardTitle>
                                      <CardText>
                                        This is a wider card with supporting
                                        text below as a natural lead-in to
                                        additional content.
                                      </CardText>
                                    </CardBody>
                                  </Col>
                                </Row>
                              </Card>
                            </Col> */}
                              </Row>
                            </CardText>
                          </Col>
                        ))}
                    </Row>
                  </TabPane>
                </TabContent>
              </div>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  )
}

Dashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
}

export default withTranslation()(Dashboard)
