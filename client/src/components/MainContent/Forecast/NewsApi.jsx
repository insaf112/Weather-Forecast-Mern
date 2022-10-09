import React from "react";
import { Link } from "react-router-dom";

import "./NewsApi.css";
import "../MergeStyles.css";

function News({ newsData }) {
  const news = newsData.slice(0, 8);
  return (
    <div className="news-dashboard">
      <Link to="/news">
        <p className="heading">
          News
          <span style={{ fontSize: ".7rem", marginLeft: ".7rem" }}>More</span>
        </p>
      </Link>

      <div className="news-box-dashboard">
        {news.map((article, index) => (
          <div className="news-item-dashboard" key={index}>
            <a href={article.link} rel="noreferrer" target="_blank">
              <img
                src={
                  article.media
                    ? article.media
                    : "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png"
                }
                alt="news img"
                onError={(e) => {
                  e.target.src =
                    "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png";
                }}
              />
              {/* <h1 className="news-title">{article.title.slice(0, 70)}...</h1> */}
              <h1 className="news-title">{article.title}...</h1>
              <p className="news-desc">{article.excerpt.slice(0, 110)}...</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default News;
