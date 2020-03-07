import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle } from 'reactstrap';

 

    function RenderDish({dish}) {
        if (dish != null)
            return (
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return (
                <div></div>
            );
    }

    function RenderComments({comments}) {
        if (comments) {
            return (
                <div>
                    <h4>Comments</h4>
                    <ul className={"list-unstyled comments-list"}>

                        {comments.map(({ author, date, comment, id }) => {

                            return (
                                <li className={"comment"} key={id}>
                                    <p className={"mt-1"}>{comment}</p>
                                    <div className={"mt-1"}>
                                        <span>-- {author}</span>
                                        <span>, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(date)))}</span>
                                    </div>
                                </li>
                            )
                        }
                        )}

                    </ul>
                </div>
            )
        } else {
            return <div></div>
        }
    }

    const  DishDetail = (props) => {

        const { dish } = this.props;
        const { comments } = dish || [];

        return (
            <div className={"row"}>
                <div className={"col-12 col-md-5 m-1"}>
                    {this.renderDish(dish)}
                </div>
                <div className={"col-12 col-md-5 m-1"}>
                    {this.renderComments(comments)}
                </div>
            </div>
        )
    }

export default DishDetail;