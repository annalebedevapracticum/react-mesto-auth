import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";

function Card({ link, name, likes, owner, onImageClick, onCardLike, onCardDelete }) {
    const { currentUser } = React.useContext(CurrentUserContext);
    const getIsLiked = () => likes.some((item) => {
        return item._id === currentUser._id;
    })

    const isOwner = owner._id === currentUser._id;
    return (
        <div className="card">
            <img className="card__image" alt="Картинка" src={link} onClick={() => onImageClick({ link, name })} />
            {isOwner && <button type="button" onClick={onCardDelete} className="card__delete"></button>}
            <div className="card__description">
                <p className="card__title">{name}</p>
                <div className="card__like-wraper">
                    <button type="button" onClick={onCardLike} className={`card__like ${getIsLiked() ? 'card__like_active' : ''}`}></button>
                    <div className="card__like-count">{likes.length}</div>
                </div>
            </div>
        </div>
    )
}

export default Card;