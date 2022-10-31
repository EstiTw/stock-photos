import React from "react";

const Photo = ({ id, likes, links, user, urls }) => {
  const { first_name, last_name, profile_image, alt_description } = user;

  return (
    <article className="photo">
      <img src={urls.full} alt={alt_description} />
      <div className="photo-info">
        <div>
          <h4>
            {first_name} {last_name}
          </h4>
          <p>{likes} likes</p>
        </div>
        <a href={links.download}>
          <img src={profile_image.medium} alt="" className="user-img" />
        </a>
      </div>
    </article>
  );
};

export default Photo;
