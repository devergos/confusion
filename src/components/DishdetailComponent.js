import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem, Button, Row, Col, Label, Modal, ModalHeader, ModalBody
} from 'reactstrap';
import { Loading } from './LoadingComponent';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class Form extends Component {

    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleSubmit(values) {
        this.props.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }


    render() {
        return (
            <div className="container">
                <div className="row row-content">
                    <div className="col-12 col-md-12">
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={2}>Rating</Label>
                                <Col md={10}>
                                    <Control.select model=".rating" id="rating" className={"form-control    "}>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Control.select>
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="author" md={2}>Author</Label>
                                <Col md={10}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Author"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Label htmlFor="comment" md={2}>Comment</Label>
                                <Col md={10}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        placeholder="Comment"
                                        className="form-control"

                                    />
                                </Col>
                            </Row>

                            <Row className="form-group">
                                <Col md={{ size: 10, offset: 2 }}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </div>
                </div>
            </div>
        );
    }
}


function RenderDish({ dish, }) {
    if (dish != null) {
        return (
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        );
    } else {
        return (
            <div></div>
        );
    }
}

function RenderComments({ comments, toggleModal, toggle, postComment, dishId }) {
    if (comments) {
        return (
            <div>
                <h4>Comments</h4>
                <ul className={"list-unstyled comments-list"}>
                    <Stagger in>
                        {comments.map(({ author, date, comment, id }) => {

                            return (
                                <Fade in>
                                    <li className={"comment"} key={id}>
                                        <p className={"mt-1"}>{comment}</p>
                                        <div className={"mt-1"}>
                                            <span>-- {author}</span>
                                            <span>, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(date)))}</span>
                                        </div>
                                    </li>
                                </Fade>
                            )
                        }
                        )}
                    </Stagger>

                </ul>
                <Button onClick={toggleModal} color="secondary"><span className={"fa fa-edit"}> Submit Comment</span></Button>

                <Modal isOpen={toggle} toggle={toggleModal}>
                    <ModalHeader toggle={toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <Form dishId={dishId} postComment={postComment} toggleModal={toggleModal} />
                    </ModalBody>
                </Modal>
            </div>
        )
    } else {
        return <div></div>
    }
}

class DishDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {

            toggle: false

        }
    }

    toggleModal = () => {

        this.setState({ toggle: !this.state.toggle })

    }


    render() {

        const { toggle } = this.state
        const { isLoading, errMess } = this.props;
        if (isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <h4>{errMess}</h4>
                    </div>
                </div>
            );
        }
        else
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>

                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{this.props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <RenderDish dish={this.props.dish} />
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <RenderComments
                                toggle={toggle}
                                toggleModal={this.toggleModal}
                                comments={this.props.comments}
                                postComment={this.props.postComment}
                                dishId={this.props.dish.id}
                            />
                        </div>
                    </div>

                </div>
            );
    }

}

export default DishDetail;