import React from "react";

export const Announcement = ({ image, address, description, price, size }) => {
    return (
        <section>
            <picture>
                <img src={image.url} alt="house" />
            </picture>
            <p>address: {address}</p>
            <p>description: {description}</p>
            <p>price: {price}</p>
            <p>size: {size}</p>
        </section>
    );
}

export default Announcement;